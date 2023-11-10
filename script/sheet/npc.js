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

  computeInfoFromConditions(attributeName) {
    let bonus, current, max;
    if (attributeName === "physique" || attributeName === "precision") {
      current = this.actor.system.condition.physical.value;
      max = this.actor.system.condition.physical.max;
      bonus = current - max;
    } else {
      current = this.actor.system.condition.mental.value;
      max = this.actor.system.condition.mental.max;
      bonus = current - max;
    }

    if (bonus === 0)
      return null;
    const conditionLabel = game.i18n.localize("HEADER.CONDITIONS").toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase());
    return { name:conditionLabel, value: bonus, tooltip: current + `/` + max};
  }
}
