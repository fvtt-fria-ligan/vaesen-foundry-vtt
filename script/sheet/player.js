import { prepareRollNewDialog } from "../util/roll.js";
import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";
import { generator } from "../util/generator.js";

export class PlayerCharacterSheet extends VaesenActorSheet {
  async getData() {
    this.actor.system.startingEquipClass = this.actor.system.starting ? "fa-unlock" : "fa-lock";
    const headquarter = game.actors.get(this.actor.system.headquarter);
    if (headquarter)
      this.actor.setFlag("vaesen", "headquarterName", headquarter.name);
    return super.getData();
  }

  async affirmConditions(actor) {
    console.log("affirmConditions");
    let currentConditions = [];
    actor.effects.forEach(function (value, key) {
      console.log("value: ", value);
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

  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();
    if (this.actor.isOwner) {
      buttons = [
        {
          label: "Chargen",
          class: "char-gen",
          icon: "fas fa-leaf",
          onclick: async (_) =>
            await generator.generateCharacter(this.actor)
        },
      ].concat(buttons);
    }
    return buttons;
  }

  activateListeners(html) {
    super.activateListeners(html);

    if (this.actor.limited)
      return;

    html.find(".fav-togle").click((ev) => {
      this.onFavTogle(ev);
    });
    html.find(".starting-equip-toggle").click((ev) =>  {
      this.onStartingEquipToggle();
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

    html.find(".talent-edit").click((ev) => {
      this.onItemUpdate(ev);
    });
   

    html.find(".relationship .name").click((ev) => {
      this.onItemSummary(ev, "relationship");
    });
    html.find(".relationship .description").click((ev) => {
      this.onItemSummary(ev, "relationship");
    });

    html.find(".gear-edit").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".actor-edit").click(this._onShowActor.bind(this));

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
      const testName = game.i18n.localize(attribute.label + "_ROLL") + " " + game.i18n.localize("FEAR_ROLL");

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
      const img = $(div).find(".icon").attr("src");
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

  onItemCreate(event) {
    event.preventDefault();
    let header = event.currentTarget;
    let data = duplicate(header.dataset);

    if (data.type != "gear" && data.type != "weapon")
    {
      super.onItemCreate(event);
      return;
    }

    data["name"] = `New ${data.type.capitalize()}`;
    if (data.type == "weapon") {
      data["system.starting"] = this.actor.system.starting;
    }
    else if (data.type == "gear") {
      data["system.starting"] = data.starting ? true : false;
      delete data.starting;
    }
    console.log("CUSSA", data);
    this.actor.createEmbeddedDocuments("Item", [data]);
  }

  computeItems(data) {
    for (let item of Object.values(data.items)) {
      item.isCriticalInjury = item.type === "criticalInjury";
      item.isWeapon = item.type === "weapon";
      item.isArmor = item.type === "armor";
      item.isTalent = item.type === "talent";
      item.isGear = item.type === "gear";
      item.isRelationship = item.type === "relationship";
      item.cssClass = item.isWeapon && item.system.starting ? "fa-check-square" : "fa-square";
    }
  }

  onFavTogle(event) {
    const div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));
    console.log("onFavTogle", item);

    let fav = item.system.isFav;
    if (fav) {
      item.system.isFav = false;
      item.update({ "system.isFav": false });
    } else {
      item.system.isFav = true;
      item.update({ "system.isFav": true });
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
    const upgrades = this.computePossibleBonusFromUpgrades(type);

    prepareRollNewDialog(this, testName, info, null, null, null, upgrades);
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
    return { name: conditionLabel, value: bonus, tooltip: info.join("<br>"), type: "conditions" };
  }

  computePossibleBonusFromUpgrades(recoveryType) {
    let upgradeArray = [];

    var headquarter = game.actors.get(this.actor.system.headquarter);
    if (!headquarter)
      return upgradeArray;

    for (let item of Object.values(headquarter.items.contents)) {
      if (
        item.type === "upgrade" &&
        ((item.system.bonusType == "bonusPhysicalRecovery" && recoveryType == "physical") ||
          (item.system.bonusType == "bonusMentalRecovery" && recoveryType == "mental"))
      ) {
        let upgrade = {
          name: item.name,
          bonus: item.system.bonus,
          description: item.system.function,
          bonusType: item.system.bonusType,
        };
        upgradeArray.push(upgrade);
      }
    }
    return upgradeArray;
  }

  updateCondition(conditionName) {
    let actor = this.actor;

    const statusEffect = CONFIG.statusEffects.find(it => it.id === conditionName);

    const currentEffect = Array.from(actor.effects?.values()).find(it => it.icon === statusEffect.icon);
    if (currentEffect) {
      actor.deleteEmbeddedDocuments('ActiveEffect', [currentEffect.id]);
    }
    else {
      actor.createEmbeddedDocuments("ActiveEffect", [{
        label: game.i18n.localize(statusEffect.label),
        icon: statusEffect.icon,
        changes: statusEffect.changes,
        id: this.uuid,
        statuses: statusEffect.statuses,
        flags: {
          core: {
            statusId: statusEffect.id
          }
        },
      }]);
    }
  }

  _dropHeadquarter(headquarter) {
    console.log("_dropHeadquarter", headquarter);
    if (!headquarter) return;
    this.actor.update({ "system.headquarter": headquarter.id });
    return this.actor;
  }

  _onShowActor(event) {
    event.preventDefault();
    const actorID = event.currentTarget.dataset.actorId;
    const actor = game.actors.get(actorID);
    actor.sheet.render(true);
  }

  onStartingEquipToggle() {
    this.actor.update({"system.starting": !this.actor.system.starting});
  }

  _onDropItemCreate(item) {
    item.system.starting = this.actor.system.starting;
    super._onDropItemCreate(item);
  }
}
