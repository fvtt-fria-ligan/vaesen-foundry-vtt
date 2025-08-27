import { adjustBonusText, prepareRollNewDialog, push } from "../util/roll.js";
import { YearZeroRoll } from "../lib/yzur.js";
import ChatMessageVaesen, { buildChatCard } from "../util/chat.js";

/**
 * Extend the default actor sheet to allow for text enrichment etc.
 *
 * @type {ActorSheet}
 *
 */
export class VaesenActorSheet extends foundry.appv1.sheets.ActorSheet {
  //TODO convert dices[] to a YZUR roll object to pass rolls and allow pushes
  dices = new YearZeroRoll();
  lastTestName = "";
  lastDamage = 0;

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
      width: 750,
      height: "auto", // 'auto
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
    if (!game.user.isGM && this.actor.limited)
      return `systems/vaesen/model/limited-sheet.hbs`;
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
            prepareRollNewDialog(this, game.i18n.localize("ROLL.ROLL")),
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
      blockCondition: !this.actor.prototypeToken.actorLink && !this.actor.isToken
    };
    context.effects = this.actor.getEmbeddedCollection("ActiveEffect").contents;



    if (context.isNpc) {
      // enchich html for notes and description
      context.informationHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        context.system.information,
        {
          secrets: this.actor.isOwner,
          rollData: context.rollData,
          async: true,
          relativeTo: this.actor
        }
      );
      context.noteHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(context.system.note, {
        secrets: this.actor.owner,
        async: true,
      });
    }

    if (context.isCharacter || context.isVaesen || context.isHeadquarter) {
      context.noteHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(context.system.note, {
        secrets: this.actor.owner,
        async: true,
      });
    }


    if (!context.isVaesen && !context.isHeadquarter) {
      this.computeSkills(context);
    }
    this.computeItems(context);
    this.setSwag(context);
    this.setPortrait(context);

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (this.actor.limited)
      return;

    html.find(".item-create").click((ev) => {
      this.onItemCreate(ev);
    });
    html.find(".item-edit").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".item-delete").click((ev) => {
      this.onItemDelete(ev);
    });
    html.find(".to-chat").click((ev) => {
      this.sendToChat(ev);
    });
    html.find("input").focusin((ev) => this.onFocusIn(ev));

    html.find(".attribute b").click((ev) => {
      const div = $(ev.currentTarget).parents(".attribute");
      const attributeName = div.data("key");
      this.rollAttribute(attributeName);
    });
    html.find(".skill b").click((ev) => {
      const div = $(ev.currentTarget).parents(".skill");
      const skillName = div.data("key");
      this.rollSkill(skillName);
    });

    html.find(".armor-roll").click((ev) => {
      this.onArmorRoll(ev);
    });

    html.find(".weapon-roll").click((ev) => {
      this.onWeaponRoll(ev);
    });


    html.find(".critical-injury .icon").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".critical-injury .name").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".critical-injury .fatal").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".critical-injury .time-limit").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".critical-injury .effect").click((ev) => {
      this.onItemUpdate(ev);
    });

    html.find(".magic .icon").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".magic .name").click((ev) => {
      this.onItemSummary(ev, "magic");
    });
    html.find(".magic .description").click((ev) => {
      this.onItemUpdate(ev);
    });

    html.find(".gear .icon").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".gear .bonus").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".gear .effect").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".roll-fear").click((ev) => {
      const key = ev.currentTarget.dataset.key;
      this.rollFear(key);
    });
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

  onItemCreate(event) {
    event.preventDefault();
    let header = event.currentTarget;
    let data = duplicate(header.dataset);

    data["name"] = `New ${data.type.capitalize()}`;
    if (data.type == "condition") {
      var count = this.actor.items.filter(x => x.type == "condition").length;
      data["img"] = `systems/vaesen/asset/counter_tokens/${count + 1}.png`;
    }
    this.actor.createEmbeddedDocuments("Item", [data]);
    console.log("actor data after creating vaesen conditions: ", this.actor);
  }

  onItemUpdate(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));
    item.sheet.render(true);
  }

  onItemDelete(event) {
    const div = $(event.currentTarget).parents(".item");
    let item = this.actor.items.get(div.data("itemId"));

    if (!item.system.starting) {
      this.onItemDeleteAction(div, item.id);
      return;
    }

    Dialog.confirm({
      title: game.i18n.localize("STARTING_EQUIP.TITLE"),
      content: game.i18n.localize("STARTING_EQUIP.CONTENT"),
      yes: () => this.onItemDeleteAction(div, item.id),
      defaultYes: false
    });
  }

  onItemDeleteAction(div, item) {
    this.actor.deleteEmbeddedDocuments("Item", [item]);
    div.slideUp(200, () => this.render(false));
  }

  onFocusIn(event) {
    $(event.currentTarget).select();
  }

  /****** Toggle the roll-down of expanded item information.  */
  onItemSummary(event, type) {
    let div = $(event.currentTarget).parents(".item"),
      item = this.actor.items.get(div.data("itemId")),
      chatData = "";

    switch (type) {
      case "armor":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("ARMOR.PROTECTION") +
          ":</b> " +
          item.system.protection +
          " | <b>" +
          game.i18n.localize("ARMOR.AGILITY") +
          ":</b> " +
          item.system.agility +
          "</br></p>";
        break;
      case "attack":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("WEAPON.DAMAGE") +
          ":</b> " +
          item.system.damage +
          " | <b>" +
          game.i18n.localize("WEAPON.RANGE") +
          ":</b> " +
          item.system.range +
          "</br></p>";
        break;

      case "condition":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("CONDITION.DESCRIPTION") +
          ":</b> " +
          item.system.description +
          "</br></p>";
        break;

      case "gear":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("GEAR.BONUS") +
          ":</b> " +
          item.system.bonus +
          "</br><b>" +
          game.i18n.localize("GEAR.EFFECT") +
          ":</b> " +
          item.system.effect +
          "</br><b>" +
          game.i18n.localize("GEAR.DESCRIPTION") +
          ":</b> " +
          item.system.description +
          "</br></p>";
        break;
      case "magic":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("MAGIC.CATEGORY") +
          ":</b> " +
          item.system.category +
          " </br><b>" +
          game.i18n.localize("MAGIC.DESCRIPTION") +
          ":</b> " +
          item.system.description +
          "</br></p>";
        break;
      case "relationship":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("NOTES") +
          ":</b> " +
          item.system.notes +
          "</br></p>";
        break;
      case "weapon":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("WEAPON.SKILL") +
          ":</b> " +
          item.system.skill +
          " | <b>" +
          game.i18n.localize("WEAPON.AVAILABILITY") +
          ":</b> " +
          item.system.availability +
          "</br></p>";
        break;
    }

    if (chatData === null) {
      return;
    } else if (div.hasClass("expanded")) {
      let sum = div.children(".item-summary");
      sum.slideUp(200, () => sum.remove());
    } else {
      let sum = $(`<div class="item-summary">${chatData}</div>`);
      div.append(sum.hide());
      sum.slideDown(200);
    }
    div.toggleClass("expanded");
  }

  onArmorRoll(event) {
    const div = $(event.currentTarget).parents(".armor");
    const item = this.actor.items.get(div.data("itemId"));
    const testName = item.name;

    let info = [{ name: testName, value: item.system.protection }];

    prepareRollNewDialog(this, testName, info);
  }

  onWeaponRoll(event) {
    const div = $(event.currentTarget).parents(".weapon");
    const itemId = div.data("itemId");
    this.rollWeapon(itemId);
  }

  async sendToChat(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));
    const data = item.system;
    let type = item.type;
    let chatData = await buildChatCard(type, item);
    ChatMessageVaesen.create(chatData, {});
  }

  computeBonusFromArmor(skillName) {
    let bonus = 0;
    if (skillName === "agility") {
      for (let item of Object.values(this.actor.items.contents)) {
        if (item.type === "armor" && bonus >= item.system.agility) {
          bonus = item.system.agility;
        }
      }
    }
    return parseInt(bonus, 10);
  }

  computePossibleBonusFromGear(skillName) {
    let gearArray = [];

    for (let item of Object.values(this.actor.items.contents)) {
      if (
        item.type === "gear" &&
        item.system.bonus > 0 &&
        item.system.skill.indexOf(skillName) > -1
      ) {
        let gear = {
          name: item.name,
          bonus: item.system.bonus,
          description: item.system.effect,
        };
        gearArray.push(gear);
      }
    }

    return gearArray;
  }

  computePossibleBonusFromTalent(skillName, attribute) {
    let talentArray = [];

    for (let item of Object.values(this.actor.items.contents)) {
      if (
        item.type === "talent" &&
        skillName !== "fear" &&
        ((item.system.bonusType === "skill" &&
          item.system.skill.indexOf(skillName) > -1 &&
          skillName !== "fear") ||
          (item.system.bonusType === "ignoreConditionSkill" &&
            item.system.skill.indexOf(skillName) > -1) ||
          (item.system.bonusType === "ignoreConditionPhysical" &&
            (attribute === "physique" || attribute === "precision")) ||
          (item.system.bonusType === "ignoreConditionMental" &&
            skillName !== "fear" &&
            (attribute === "logic" || attribute === "empathy")) ||
          (item.system.bonusType === "damage" &&
            item.system.skill.indexOf(skillName) > -1))
      ) {
        let talent = {
          name: item.name,
          bonus: item.system.bonus,
          description: item.system.description,
          bonusType: item.system.bonusType,
        };
        talentArray.push(talent);
      }
      // if the skillName is fear only allow fear talents
      if (
        item.type === "talent" &&
        skillName === "fear" &&
        item.system.bonusType === "fear"
      ) {
        let talent = {
          name: item.name,
          bonus: item.system.bonus,
          description: item.system.description,
          bonusType: item.system.bonusType,
        };
        talentArray.push(talent);
      }
    }
    return talentArray;
  }

  computePossibleBonusFromCriticalInjuries(skillName) {
    let criticalInjuryArray = [];

    for (let item of Object.values(this.actor.items.contents)) {
      if (
        item.type === "criticalInjury" &&
        item.system.skill === skillName
      ) {
        let criticalInjury = {
          name: item.name,
          bonus: item.system.bonus,
          bonusType: skillName === "fear" ? "fear" : "skill",
          description: item.system.effect,
        };
        criticalInjuryArray.push(criticalInjury);
      }
    }

    return criticalInjuryArray;
  }

  computeInfoFromCriticalInjuries(skillName) {
    let bonus = 0;
    let tooltip = [];
    for (let item of Object.values(this.actor.items.contents)) {
      if (item.type === "criticalInjury" && item.system.skill === skillName) {
        tooltip.push(`${item.name} (${adjustBonusText(item.system.bonus)})`);
        bonus += parseInt(item.system.bonus);
      }
    }

    if (bonus == 0) return null;
    const label = game.i18n
      .localize("HEADER.CRITICAL_INJURIES")
      .toLowerCase()
      .replace(/\b(\w)/g, (x) => x.toUpperCase());
    return { name: label, value: bonus, tooltip: tooltip.join("<br>") };
  }

  computeInfoFromArmor(skillName) {
    let bonus = 0;
    let armor = null;
    if (skillName === "agility") {
      for (let item of Object.values(this.actor.items.contents)) {
        if (item.type === "armor" && bonus >= item.system.agility) {
          bonus = item.system.agility;
          armor = item.name;
        }
      }
    }
    if (bonus == 0) return null;
    const label = game.i18n.localize("ARMOR.NAME");
    return { name: label, value: bonus };
  }

  rollAttribute(attributeName) {
    const attribute = this.actor.system.attribute[attributeName];
    const testName = game.i18n.localize(attribute.label + "_ROLL");
    let info = [
      { name: testName, value: attribute.value },
      this.computeInfoFromConditions(attributeName),
    ];
    prepareRollNewDialog(this, testName, info, null, null, null);
  }

  rollFear(key) {
    const attribute = this.actor.system.attribute[key];
    const testName =
      game.i18n.localize(attribute.label + "_ROLL") +
      " " +
      game.i18n.localize("FEAR_ROLL");
    let bonusTalent = this.computePossibleBonusFromTalent("fear", key);
    let bonusCriticalInjuries = this.computePossibleBonusFromCriticalInjuries("fear");

    let info = [
      { name: testName, value: attribute.value },
      this.computeInfoFromConditions(attribute),
    ];
    prepareRollNewDialog(this, testName, info, null, null, bonusTalent, null, bonusCriticalInjuries);
  }

  rollSkill(skillName) {
    const skill = this.actor.system.skill[skillName];
    const attribute = this.actor.system.attribute[skill.attribute];

    let bonusGear = this.computePossibleBonusFromGear(skillName);
    let bonusTalent = this.computePossibleBonusFromTalent(
      skillName,
      skill.attribute
    );
    let bonusCriticalInjuries = this.computePossibleBonusFromCriticalInjuries(skillName);

    const testName = game.i18n.localize(skill.label);

    let info = [
      {
        name: game.i18n.localize(attribute.label + "_ROLL"),
        value: attribute.value,
      },
      { name: testName, value: skill.value },
      this.computeInfoFromConditions(skill.attribute),
      this.computeInfoFromArmor(skillName),
    ];

    var damage = skillName == "force" ? 1 : null;

    prepareRollNewDialog(this, testName, info, damage, bonusGear, bonusTalent, null, bonusCriticalInjuries);
  }

  rollWeapon(itemId) {
    const item = this.actor.items.get(itemId);
    const testName = item.name;
    const skill = this.actor.system.skill[item.system.skill];
    const attribute = this.actor.system.attribute[skill.attribute];
    const bonusFromWeapon = parseInt(item.system.bonus, 10);

    let bonusGear = this.computePossibleBonusFromGear(item.system.skill);
    let bonusTalent = this.computePossibleBonusFromTalent(item.system.skill);

    let info = [
      {
        name: game.i18n.localize(attribute.label + "_ROLL"),
        value: attribute.value,
      },
      { name: game.i18n.localize(skill.label), value: skill.value },
      { name: item.name, value: bonusFromWeapon },
      this.computeInfoFromConditions(skill.attribute),
      this.computeInfoFromCriticalInjuries(item.system.skill),
    ];

    prepareRollNewDialog(
      this,
      testName,
      info,
      item.system.damage,
      bonusGear,
      bonusTalent
    );
  }
}
