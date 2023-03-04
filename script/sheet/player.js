import { prepareRollDialog, push } from "../util/roll.js";
import { conditions } from "../util/conditions.js";
import { YearZeroRoll } from "../lib/yzur.js";
import { buildChatCard } from "../util/chat.js";
import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";

export class PlayerCharacterSheet extends VaesenActorSheet {
  //TODO convert dices[] to a YZUR roll object to pass rolls and allow pushes
  dices = new YearZeroRoll();
  lastTestName = "";
  lastDamage = 0;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
      template: "systems/vaesen/model/player.hbs",
      width: 750,
      height: 930,
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

  async affirmConditions(actor) {
    let currentConditions = [];
    actor.effects.forEach(function (value, key) {
      currentConditions.push(value.data.flags.core?.statusId);
    });

    // set state of sheet checks for set conditions
    if (currentConditions.indexOf("physical") === -1) {
      actor.update({ "system.condition.physical.isBroken": false });
    } else {
      actor.update({ "system.condition.physical.isBroken": true });
    }
    if (currentConditions.indexOf("exhausted") === -1) {
      actor.update({
        "system.condition.physical.states.exhausted.isChecked": false,
      });
    } else {
      actor.update({
        "system.condition.physical.states.exhausted.isChecked": true,
      });
    }
    if (currentConditions.indexOf("battered") === -1) {
      actor.update({
        "system.condition.physical.states.battered.isChecked": false,
      });
    } else {
      actor.update({
        "system.condition.physical.states.battered.isChecked": true,
      });
    }
    if (currentConditions.indexOf("wounded") === -1) {
      actor.update({
        "system.condition.physical.states.wounded.isChecked": false,
      });
    } else {
      actor.update({
        "system.condition.physical.states.wounded.isChecked": true,
      });
    }
    if (currentConditions.indexOf("angry") === -1) {
      actor.update({ "system.condition.mental.states.angry.isChecked": false });
    } else {
      actor.update({ "system.condition.mental.states.angry.isChecked": true });
    }
    if (currentConditions.indexOf("frightened") === -1) {
      actor.update({
        "system.condition.mental.states.frightened.isChecked": false,
      });
    } else {
      actor.update({
        "system.condition.mental.states.frightened.isChecked": true,
      });
    }
    if (currentConditions.indexOf("hopeless") === -1) {
      actor.update({
        "system.condition.mental.states.hopeless.isChecked": false,
      });
    } else {
      actor.update({
        "system.condition.mental.states.hopeless.isChecked": true,
      });
    }
    if (currentConditions.indexOf("mental") === -1) {
      actor.update({ "system.condition.mental.isBroken": false });
    } else {
      actor.update({ "system.condition.mental.isBroken": true });
    }
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".item-create").click((ev) => {
      this.onItemCreate(ev);
    });
    html.find(".item-edit").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".item-delete").click((ev) => {
      this.onItemDelete(ev);
    });
    html.find(".fav-togle").click((ev) => {
      this.onFavTogle(ev);
    });
    html.find(".to-chat").click((ev) => {
      this.sendToChat(ev);
    });
    html.find(".roll-recovery").click((ev) => {
      this.onRecovery(ev);
    });
    html.find("input").focusin((ev) => this.onFocusIn(ev));

    html.find(".resources b").click((ev) => {
      prepareRollDialog(
        this,
        game.i18n.localize("RESOURCES"),
        0,
        0,
        this.actor.system.resources || 0,
        0
      );
    });
    //html.find(".physical .condition").click(conditions.eventsProcessing.onToggleEffect.bind(this));
    html.find(".physical .condition").click((ev) => {
      let actor = this.actor;
      let data = actor.system;
      ev.preventDefault();
      const conditionName = $(ev.currentTarget).data("key");
      //let actor = this.actor;
      //await actor.toggleStatusEffectByID(conditionName);

      //console.log(conditionName);
      let conditionValue;
      if (conditionName === "physical") {
        conditionValue = data.condition.physical.isBroken;
        actor.update({ "system.condition.physical.isBroken": !conditionValue });
      } else {
        conditionValue =
          data.condition.physical.states[conditionName].isChecked;
        if (conditionName === "exhausted") {
          actor.update({
            "system.condition.physical.states.exhausted.isChecked":
              !conditionValue,
          });
        } else if (conditionName === "battered") {
          actor.update({
            "system.condition.physical.states.battered.isChecked":
              !conditionValue,
          });
        } else if (conditionName === "wounded") {
          actor.update({
            "system.condition.physical.states.wounded.isChecked":
              !conditionValue,
          });
        }
      }
      this._render();
    });

    //html.find(".mental .condition").click(conditions.eventsProcessing.onToggleEffect.bind(this));
    html.find(".mental .condition").click((ev) => {
      let actor = this.actor;
      let data = actor.system;
      const conditionName = $(ev.currentTarget).data("key");
      let conditionValue;
      if (conditionName === "mental") {
        conditionValue = data.condition.mental.isBroken;
        actor.update({ "system.condition.mental.isBroken": !conditionValue });
      } else {
        conditionValue = data.condition.mental.states[conditionName].isChecked;
        if (conditionName === "angry") {
          actor.update({
            "system.condition.mental.states.angry.isChecked": !conditionValue,
          });
        } else if (conditionName === "frightened") {
          actor.update({
            "system.condition.mental.states.frightened.isChecked":
              !conditionValue,
          });
        } else if (conditionName === "hopeless") {
          actor.update({
            "system.condition.mental.states.hopeless.isChecked":
              !conditionValue,
          });
        }
      }
      this._render();
    });

    html.find(".attribute b").click((ev) => {
      const div = $(ev.currentTarget).parents(".attribute");
      const attributeName = div.data("key");
      console.log(attributeName);
      console.log(this.actor);
      const attribute = this.actor.system.attribute[attributeName];
      const testName = game.i18n.localize(attribute.label + "_ROLL");
      let bonus = this.computeBonusFromConditions(attributeName);
      prepareRollDialog(
        this,
        testName,
        attribute.value,
        0,
        bonus,
        0,
        testName,
        ""
      );
    });

    html.find(".skill b").click((ev) => {
      const div = $(ev.currentTarget).parents(".skill");
      const skillName = div.data("key");
      console.log("skill: ", this.actor);
      const skill = this.actor.system.skill[skillName];

      const attribute = this.actor.system.attribute[skill.attribute];

      let bonusConditions = this.computeBonusFromConditions(skill.attribute);
      let bonusArmor = this.computeBonusFromArmor(skillName);
      const testName = game.i18n.localize(skill.label);
      prepareRollDialog(
        this,
        testName,
        attribute.value,
        skill.value,
        bonusConditions + bonusArmor,
        0,
        game.i18n.localize(attribute.label + "_ROLL"),
        testName
      );
      //prepareRollDialog(this, testName, attribute.value, skill.value, bonusConditions + bonusArmor, 0)
    });

    html.find(".armor .icon").click((ev) => {
      this.onArmorRoll(ev);
    });
    html.find(".armor .name").click((ev) => {
      this.onArmorRoll(ev);
    });
    html.find(".armor .protection").click((ev) => {
      this.onArmorRoll(ev);
    });
    html.find(".armor .agility").click((ev) => {
      this.onArmorRoll(ev);
    });

    html.find(".weapon .icon").click((ev) => {
      this.onWeaponRoll(ev);
    });
    html.find(".weapon .name").click((ev) => {
      this.onWeaponRoll(ev);
    });
    html.find(".weapon .damage").click((ev) => {
      this.onWeaponRoll(ev);
    });
    html.find(".weapon .range").click((ev) => {
      this.onWeaponRoll(ev);
    });
    html.find(".weapon .bonus").click((ev) => {
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

    html.find(".talent .icon").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".talent .name").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".talent .description").click((ev) => {
      this.onItemUpdate(ev);
    });

    //html.find('.relationship .name').click(ev => { this.onItemUpdate(ev); });
    html.find(".relationship .name").click((ev) => {
      this.onItemSummary(ev, "relationship");
    });
    html.find(".relationship .description").click((ev) => {
      this.onItemSummary(ev, "relationship");
    });

    html.find(".gear .icon").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".gear .name").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".gear .bonus").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".gear .effect").click((ev) => {
      this.onItemUpdate(ev);
    });
  }

  computeSkills(data) {
    for (let skill of Object.values(data.system.skill)) {
      skill.hasPhysique = skill.attribute === "physique";
      skill.hasPrecision = skill.attribute === "precision";
      skill.hasLogic = skill.attribute === "logic";
      skill.hasEmpathy = skill.attribute === "empathy";
    }
  }

  computeItems(data) {
    for (let item of Object.values(data.items)) {
      item.isCriticalInjury = item.type === "criticalInjury";
      item.isWeapon = item.type === "weapon";
      item.isArmor = item.type === "armor";
      item.isTalent = item.type === "talent";
      item.isGear = item.type === "gear";
      item.isRelationship = item.type === "relationship";
    }
  }

 
  /****** Toggle the roll-down of expanded item information.  */
  onItemSummary(event, type) {
    let div = $(event.currentTarget).parents(".item"),
      item = this.actor.items.get(div.data("itemId")),
      chatData = "";

    switch (type) {
      case "relationship":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("NOTES") +
          ":</b> " +
          item.data.data.notes +
          "</br></p>";
        break;
      case "condition":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("CONDITION.DESCRIPTION") +
          ":</b> " +
          item.data.data.description +
          "</br></p>";
        break;
      case "attack":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("WEAPON.DAMAGE") +
          ":</b> " +
          item.data.data.damage +
          " | <b>" +
          game.i18n.localize("WEAPON.RANGE") +
          ":</b> " +
          item.data.data.range +
          "</br></p>";
        break;
      case "gear":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("GEAR.BONUS") +
          ":</b> " +
          item.data.data.bonus +
          "</br><b>" +
          game.i18n.localize("GEAR.EFFECT") +
          ":</b> " +
          item.data.data.effect +
          "</br><b>" +
          game.i18n.localize("GEAR.DESCRIPTION") +
          ":</b> " +
          item.data.data.description +
          "</br></p>";
        break;
      case "magic":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("MAGIC.CATEGORY") +
          ":</b> " +
          item.data.data.category +
          " </br><b>" +
          game.i18n.localize("MAGIC.DESCRIPTION") +
          ":</b> " +
          item.data.data.description +
          "</br></p>";
        break;
      case "armor":
        chatData =
          "<p class='item-desc'><b>" +
          game.i18n.localize("ARMOR.PROTECTION") +
          ":</b> " +
          item.data.data.protection +
          " | <b>" +
          game.i18n.localize("ARMOR.AGILITY") +
          ":</b> " +
          item.data.data.agility +
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

  onItemCreate(event) {
    event.preventDefault();
    let header = event.currentTarget;
    let data = duplicate(header.dataset);

    data["name"] = `New ${data.type.capitalize()}`;
    this.actor.createEmbeddedDocuments("Item", [data]);
  }

  onItemUpdate(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));
    item.sheet.render(true);
  }

  onItemDelete(event) {
    const div = $(event.currentTarget).parents(".item");
    this.actor.deleteEmbeddedDocuments("Item", [div.data("itemId")]);
    div.slideUp(200, () => this.render(false));
  }

  onFocusIn(event) {
    $(event.currentTarget).select();
  }

  onFavTogle(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));

    let fav = item.data.data.isFav;
    if (fav) {
      item.data.data.isFav = false;
      item.update({ "data.isFav": false });
    } else {
      item.data.data.isFav = true;
      item.update({ "data.isFav": true });
    }

    item.update();
  }

  sendToChat(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));
    const data = item.data;
    let type = data.type;
    let chatData = buildChatCard(type, data);
    ChatMessage.create(chatData, {});
  }

  onRecovery(event) {
    event.preventDefault();
    let actor = this.actor;
    let data = actor.data.data;
    let physique = data.attribute.physique.value;
    let precision = data.attribute.precision.value;
    let logic = data.attribute.logic.value;
    let empathy = data.attribute.empathy.value;
    const element = $(event.currentTarget).parents(".conditions");
    const type = element[0].dataset.key;

    if (type === "physical") {
      let pool = physique + precision;
      prepareRollDialog(
        this,
        game.i18n.localize("ROLL.PREC"),
        pool,
        0,
        0,
        0,
        game.i18n.localize("ATTRIBUTE.PHYSIQUE_ROLL") +
          " + " +
          game.i18n.localize("ATTRIBUTE.PRECISION_ROLL")
      );
    } else {
      let pool = logic + empathy;
      prepareRollDialog(
        this,
        game.i18n.localize("ROLL.MREC"),
        pool,
        0,
        0,
        0,
        game.i18n.localize("ATTRIBUTE.LOGIC_ROLL") +
          " + " +
          game.i18n.localize("ATTRIBUTE.EMPATHY_ROLL")
      );
    }
  }

  onArmorRoll(event) {
    const div = $(event.currentTarget).parents(".armor");
    const item = this.actor.items.get(div.data("itemId"));
    const testName = item.name;
    prepareRollDialog(this, testName, 0, 0, item.data.data.protection, 0);
  }

  onWeaponRoll(event) {
    const div = $(event.currentTarget).parents(".weapon");
    const item = this.actor.items.get(div.data("itemId"));
    const testName = item.name;
    let attribute = 0;
    let skill = 0;
    let bonusFromCondition = 0;
    let bonusFromWeapon = parseInt(item.system.bonus, 10);
    if (item.system.skill === "force") {
      attribute = this.actor.system.attribute.physique.value;
      skill = this.actor.system.skill.force.value;
      bonusFromCondition = this.computeBonusFromConditions("physique");
    } else if (item.system.skill === "closeCombat") {
      attribute = this.actor.system.attribute.physique.value;
      skill = this.actor.system.skill.closeCombat.value;
      bonusFromCondition = this.computeBonusFromConditions("physique");
    } else if (item.system.skill === "rangedCombat") {
      attribute = this.actor.system.attribute.precision.value;
      skill = this.actor.system.skill.rangedCombat.value;
      bonusFromCondition = this.computeBonusFromConditions("precision");
    }
    prepareRollDialog(
      this,
      testName,
      attribute,
      skill,
      bonusFromWeapon + bonusFromCondition,
      item.system.damage
    );
  }

  computeBonusFromConditions(attributeName) {
    let bonus = 0;
    let datas;
    if (attributeName === "physique" || attributeName === "precision") {
      datas = this.actor.system.condition.physical.states;
    } else {
      datas = this.actor.system.condition.mental.states;
    }
    for (let condition of Object.values(datas)) {
      if (condition.isChecked) {
        bonus = bonus - 1;
      }
    }
    return parseInt(bonus, 10);
  }

  computeBonusFromArmor(skillName) {
    let bonus = 0;
    if (skillName === "agility") {
      for (let item of Object.values(this.actor.items.contents)) {
        console.log("item", item);
        if (item.type === "armor" && bonus >= item.system.agility) {
          bonus = item.system.agility;
        }
      }
    }
    return parseInt(bonus, 10);
  }
}
