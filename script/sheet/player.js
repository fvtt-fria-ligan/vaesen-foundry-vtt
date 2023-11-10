import { prepareRollDialog } from "../util/roll.js";
import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";
import { commonListeners } from "../util/common.js";

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
      prepareRollDialog(
        this,
        game.i18n.localize("RESOURCES"),
        0,
        0,
        this.actor.system.resources || 0,
        0
      );
    });

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
        let brokenEffect = new ActiveEffectConfig();

        //brokenEffect.label = game.i18n.localize("CONDITION.PHYSICALLYBROKEN");
        console.log("brokenEffect: ", brokenEffect);
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
      console.log(div);
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
        console.log(data);
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
    event.preventDefault();
    let actor = this.actor;
    let data = actor.system;
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
}
