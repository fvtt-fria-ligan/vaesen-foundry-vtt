import { prepareRollNewDialog } from "../util/roll.js";
import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";

export class PlayerCharacterSheet extends VaesenActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
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

  async affirmConditions(actor) {
    let currentConditions = [];
    actor.effects.forEach(function (value, key) {
      currentConditions.push(value.data.flags.core?.statusId);
    });

    console.log("current conditions: ", currentConditions);

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
    
    html.find(".fav-togle").click((ev) => {
      this.onFavTogle(ev);
    });
    html.find(".roll-recovery").click((ev) => {
      this.onRecovery(ev);
    });

    html.find(".resources b").click((ev) => {
      var testName = game.i18n.localize("RESOURCES");
      let info = [
        { name: testName, value: this.actor.system.resources || 0 }
      ];
      prepareRollNewDialog(this, testName, info);
    });

    html.find(".condition").click((ev) => {
      ev.preventDefault();
      const conditionName = $(ev.currentTarget).data("key");
      this.updateCondition(conditionName);
    });

    html.find(".armor .name").click((ev) => {
      this.onArmorRoll(ev);
    });

    html.find(".weapon .name").click((ev) => {
      this.onWeaponRoll(ev);
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

    html.find(".relationship .name").click((ev) => {
      this.onItemSummary(ev, "relationship");
    });
    html.find(".relationship .description").click((ev) => {
      this.onItemSummary(ev, "relationship");
    });

    html.find(".gear .name").click((ev) => {
      this.onItemUpdate(ev);
    });

    // DRAG TO MACRO HANDLERS
    html.find('.skill b').each((i, item) => {
      const div = $(item).parents(".skill");
      const skillKey = div.data("key");
      const skillName = $(item).text();
      const data = {
        type: "skill",
        skillKey: skillKey,
        text: `${game.i18n.localize("ROLL.ROLL")} ${skillName}`
      };

      item.setAttribute("data-item-id", this.actor.id);
      item.setAttribute("draggable", true);
      item.addEventListener("dragstart", ev => {
        ev.dataTransfer.setData("text/plain", JSON.stringify(data));
      }, false);
    });

    html.find('.attribute b').each((i, item) => {
      const div = $(item).parents(".attribute");
      const attributeKey = div.data("key");
      const attributeName = $(item).text();
      const data = {
        type: "attribute",
        attributeKey: attributeKey,
        text: `${game.i18n.localize("ROLL.ROLL")} ${attributeName}`
      };

      item.setAttribute("data-item-id", this.actor.id);
      item.setAttribute("draggable", true);
      item.addEventListener("dragstart", ev => {
        ev.dataTransfer.setData("text/plain", JSON.stringify(data));
      }, false);
    });

    html.find('.roll-fear img').each((i, item) => {
      const div = $(item).parents(".roll-fear");
      const key = div.data("key");
      const attribute = this.actor.system.attribute[key];
      const testName = game.i18n.localize( attribute.label + "_ROLL") + " " + game.i18n.localize("FEAR_ROLL");
      
      const data = {
        type: "fear",
        attributeKey: key,
        img: item.src.replace(".svg", "-white.svg"),
        text: testName
      };

      item.setAttribute("data-item-id", this.actor.id);
      item.setAttribute("draggable", true);
      item.addEventListener("dragstart", ev => {
        ev.dataTransfer.setData("text/plain", JSON.stringify(data));
      }, false);
    });

    html.find('.weapon .name').each((i, item) => {
      const div = $(item).parents(".weapon");
      const itemId = div.data("itemId");
      const itemName = $(item).text();
      const img = $(div).children(".icon").attr("src");
      const testName = `${itemName} ${game.i18n.localize("ROLL.ROLL")}`;
      
      const data = {
        type: "weapon",
        itemId: itemId,
        actorId: this.actor.id,
        img: img,
        text: testName
      };

      item.setAttribute("data-item-id", this.actor.id);
      item.setAttribute("draggable", true);
      item.addEventListener("dragstart", ev => {
        ev.dataTransfer.setData("text/plain", JSON.stringify(data));
      }, false);
    });
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

  onFavTogle(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));

    let fav = item.system.isFav;
    if (fav) {
      item.system.isFav = false;
      item.update({ "data.isFav": false });
    } else {
      item.system.isFav = true;
      item.update({ "data.isFav": true });
    }

    item.update();
  }

  onRecovery(event) {
    const element = $(event.currentTarget).parents(".conditions");
    const type = element[0].dataset.key;

    let testName;
    let info;

    if (type == "physical") {
      testName = game.i18n.localize("ROLL.PREC");
      info = [
        { name: game.i18n.localize("ATTRIBUTE.PHYSIQUE_ROLL"), value: this.actor.system.attribute.physique.value },
        { name: game.i18n.localize("ATTRIBUTE.PRECISION_ROLL"), value: this.actor.system.attribute.precision.value }
      ];
    }
    else {
      testName = game.i18n.localize("ROLL.MREC");
      info = [
        { name: game.i18n.localize("ATTRIBUTE.LOGIC_ROLL"), value: this.actor.system.attribute.logic.value },
        { name: game.i18n.localize("ATTRIBUTE.EMPATHY_ROLL"), value: this.actor.system.attribute.empathy.value }
      ];
    }

    prepareRollNewDialog(this, testName, info);
  }

  computeInfoFromConditions(attributeName) {
    let datas;
    let info = [];
    let bonus = 0;
    if (attributeName === "physique" || attributeName === "precision") {
      datas = this.actor.system.condition.physical.states;
    } else {
      datas = this.actor.system.condition.mental.states;
    }
    for (let condition of Object.values(datas)) {
      if (condition.isChecked) {
        bonus = bonus - 1;
        info.push(`${game.i18n.localize(condition.label)} (-1)`);
      }
    }
    if (bonus === 0)
      return null;
    const conditionLabel = game.i18n.localize("HEADER.CONDITIONS").toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase());
    return { name:conditionLabel, value: bonus, tooltip: info.join("\n"), type:"conditions"};
  }

  updateCondition(conditionName) {
    let actor = this.actor;

    const currentEffect = Array.from(actor.effects?.values()).find(it => it.statuses.has(conditionName));
    if (currentEffect) {
      actor.updateEmbeddedDocuments("ActiveEffect", [{"_id": currentEffect.id, "disabled" : !currentEffect.disabled}]);
    }
    else {
      const statusEffect = CONFIG.statusEffects.find(it => it.id === conditionName);
      actor.createEmbeddedDocuments("ActiveEffect", [{
        label: game.i18n.localize(statusEffect.label),
        icon: statusEffect.icon,
        changes: statusEffect.changes,
        id: this.uuid,
        statuses: statusEffect.statuses
      }]);
    }
  }
}
