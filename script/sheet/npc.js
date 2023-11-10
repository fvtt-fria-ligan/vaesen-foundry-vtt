import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";

export class NpcCharacterSheet extends VaesenActorSheet {

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

  activateListeners(html) {
    super.activateListeners(html);
   
    html.find(".armor .name").click((ev) => {
      this.onItemSummary(ev, "armor");
    });
    html.find(".weapon .name").click((ev) => {
      this.onItemSummary(ev, "weapon");
    });
    html.find(".gear .name").click((ev) => {
      this.onItemSummary(ev, "gear");
    });
  }

  computeBonusFromConditions(attributeName) {
    let bonus;
    if (attributeName === "physique" || attributeName === "precision") {
      let current = this.actor.system.condition.physical.value;
      let max = this.actor.system.condition.physical.max;
      bonus = current - max;
    } else {
      let current = this.actor.system.condition.mental.value;
      let max = this.actor.system.condition.mental.max;
      bonus = current - max;
    }
    return parseInt(bonus, 10);
  }

  computeInfoFromConditions(attributeName) {
    return null;
  }
}
