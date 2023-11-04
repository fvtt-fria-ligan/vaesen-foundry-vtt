import { prepareRollDialog, push } from "../util/roll.js";
import { YearZeroRoll } from "../lib/yzur.js";
import { buildChatCard } from "../util/chat.js";

/**
 * Extend the default actor sheet to allow for text enrichment etc.
 *
 * @type {ActorSheet}
 *
 */
export class VaesenActorSheet extends ActorSheet {
  //TODO convert dices[] to a YZUR roll object to pass rolls and allow pushes
  dices = new YearZeroRoll();
  lastTestName = "";
  lastDamage = 0;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
      width: 750,
      height: 800,
      resizable: true,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main",
        },
      ],
    });
  }

  get template() {
    return `systems/vaesen/model/${this.actor.type}.hbs`;
  }



  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();
    if (this.actor.isOwner) {
      buttons = [
        {
          label: game.i18n.localize("ROLL.ROLL"),
          class: "custom-roll",
          icon: "fas fa-dice",
          onclick: (ev) =>
            prepareRollDialog(
              this,
              game.i18n.localize("ROLL.ROLL"),
              0,
              0,
              0,
              0
            ),
        },
        {
          label: game.i18n.localize("ROLL.PUSH"),
          class: "push-roll",
          icon: "fas fa-skull",
          onclick: (ev) => push(this),
        },
      ].concat(buttons);
    }
    return buttons;
  }


  async getData() {
    const source = this.actor.toObject();
    const actorData = this.actor.toObject(false);
    console.log("Vaesen | Actor data: ", actorData);

    //"player", "npc", "vaesen", "headquarter"
    const context = {
      actor: actorData,
      source: source.system,
      system: actorData.system,
      items: actorData.items,
      effects: actorData.effects,
      owner: this.actor.isOwner,
      limited: this.actor.limited,
      options: this.options,
      editable: this.isEditable,
      ritual: actorData.system.ritual,
      type: this.actor.type,
      isCharacter: this.actor.type === "player",
      isNpc: this.actor.type === "npc",
      isVaesen: this.actor.type === "vaesen",
      isHeadquarter: this.actor.type === "headquarter",
      // rollData: this.actor.getRollData().bind(this.actor),
    };
    context.effects = this.actor.getEmbeddedCollection("ActiveEffect").contents;

    console.log("context", context);

    if (context.isNpc) {
      // enchich html for notes and description
      context.informationHTML = await TextEditor.enrichHTML(
        context.system.information,
        {
          secrets: this.actor.owner,
          async: true,
        }
      );
      context.noteHTML = await TextEditor.enrichHTML(context.system.note, {
        secrets: this.actor.owner,
        async: true,
      });
    }

    if (context.isCharacter || context.isVaesen || context.isHeadquarter) {
      context.noteHTML = await TextEditor.enrichHTML(context.system.note, {
        secrets: this.actor.owner,
        async: true,
      });
    }

    console.log(source);
    if (!context.isVaesen && !context.isHeadquarter) {
      this.computeSkills(context);
    }
    this.computeItems(context);
    this.setSwag(context);
    this.setPortrait(context);

    return context;
  }

  computeSkills(context) {
    for (let skill of Object.values(context.system.skill)) {
      skill.hasPhysique = skill.attribute === "physique";
      skill.hasPrecision = skill.attribute === "precision";
      skill.hasLogic = skill.attribute === "logic";
      skill.hasEmpathy = skill.attribute === "empathy";
    }
  }

  computeItems(data) {
    for (let item of Object.values(data.items)) {
      item.isCriticalInjury = item.type === "criticalInjury";
      item.isTalent = item.type === "talent";
      item.isWeapon = item.type === "weapon";
      item.isCondition = item.type === "condition";
      item.isMagic = item.type === "magic";
      item.isArmor = item.type === "armor";
      item.isAttack = item.type === "attack";
      item.isGear = item.type === "gear";
      item.isFacility =
        item.type === "upgrade" && item.system.category === "facility";
      item.isContact =
        item.type === "upgrade" && item.system.category === "contact";
      item.isPersonnel =
        item.type === "upgrade" && item.system.category === "personnel";
    }
  }

  setSwag(data) {
    data.swag = game.settings.get("vaesen", "swag") ? true : false;
  }

  setPortrait(data) {
    data.portrait = game.settings.get("vaesen", "portrait");
  }
}
