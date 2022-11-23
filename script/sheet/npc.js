import { prepareRollDialog, push } from "../util/roll.js";
import { buildChatCard } from "../util/chat.js";
import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";

export class NpcCharacterSheet extends VaesenActorSheet {


  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
      template: "systems/vaesen/model/npc.hbs",
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
    html.find(".to-chat").click((ev) => {
      this.sendToChat(ev);
    });
    html.find("input").focusin((ev) => this.onFocusIn(ev));

    html.find(".attribute b").click((ev) => {
      const div = $(ev.currentTarget).parents(".attribute");
      const attributeName = div.data("key");
      const attribute = this.actor.data.data.attribute[attributeName];
      console.log(attribute);
      const testName = game.i18n.localize(attribute.label);
      console.log(testName);
      let bonus = this.computeBonusFromConditions(attributeName);
      prepareRollDialog(this, testName, attribute.value, 0, bonus, 0);
    });
    html.find(".skill b").click((ev) => {
      const div = $(ev.currentTarget).parents(".skill");
      const skillName = div.data("key");
      const skill = this.actor.data.data.skill[skillName];
      const attribute = this.actor.data.data.attribute[skill.attribute];
      let bonusConditions = this.computeBonusFromConditions(skill.attribute);
      let bonusArmor = this.computeBonusFromArmor(skillName);
      const testName = game.i18n.localize(skill.label);
      prepareRollDialog(
        this,
        testName,
        attribute.value,
        skill.value,
        bonusConditions + bonusArmor,
        0
      );
    });

    html.find(".armor .icon").click((ev) => {
      this.onArmorRoll(ev);
    });
    html.find(".armor .name").click((ev) => {
      this.onItemSummary(ev, "armor");
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
      this.onItemSummary(ev, "weapon");
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
    html.find(".gear .name").click((ev) => {
      this.onItemSummary(ev, "gear");
    });
    html.find(".gear .bonus").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".gear .effect").click((ev) => {
      this.onItemUpdate(ev);
    });
  }

  sendToChat(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));
    const data = item.data;
    let type = data.type;
    let chatData = buildChatCard(type, data);
    ChatMessage.create(chatData, {});
  }

  /****** Toggle the roll-down of expanded item information.  */
  onItemSummary(event, type) {
    let div = $(event.currentTarget).parents(".item"),
      item = this.actor.items.get(div.data("itemId"));
    let chatData = "";
    switch (type) {
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
      case "weapon":
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
    console.log(this.actor);
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
    if (item.data.data.skill === "force") {
      attribute = this.actor.data.data.attribute.physique.value;
      skill = this.actor.data.data.skill.force.value;
    } else if (item.data.data.skill === "closeCombat") {
      attribute = this.actor.data.data.attribute.physique.value;
      skill = this.actor.data.data.skill.closeCombat.value;
    } else if (item.data.data.skill === "rangedCombat") {
      attribute = this.actor.data.data.attribute.precision.value;
      skill = this.actor.data.data.skill.rangedCombat.value;
    }
    prepareRollDialog(
      this,
      testName,
      attribute,
      skill,
      item.data.data.bonus,
      item.data.data.damage
    );
  }

  computeBonusFromConditions(attributeName) {
    let bonus;
    if (attributeName === "physique" || attributeName === "precision") {
      let current = this.actor.data.data.condition.physical.value;
      let max = this.actor.data.data.condition.physical.max;
      bonus = current - max;
    } else {
      let current = this.actor.data.data.condition.mental.value;
      let max = this.actor.data.data.condition.mental.max;
      bonus = current - max;
    }
    return parseInt(bonus, 10);
  }

  computeBonusFromArmor(skillName) {
    let bonus = 0;
    if (skillName === "agility") {
      for (let item of Object.values(this.actor.data.items)) {
        if (item.type === "armor" && bonus >= item.data.agility) {
          bonus = item.data.agility;
        }
      }
    }
    return parseInt(bonus, 10);
  }
}
