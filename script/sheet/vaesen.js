import { prepareRollNewDialog } from "../util/roll.js";
import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";

export class VaesenCharacterSheet extends VaesenActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
      width: 950,
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

    html.find(".attack .icon").click((ev) => {
      this.onWeaponRoll(ev);
    });
    html.find(".attack .name").click((ev) => {
      this.onItemSummary(ev, "attack");
    });
    html.find(".attack .damage").click((ev) => {
      this.onWeaponRoll(ev);
    });
    html.find(".attack .range").click((ev) => {
      this.onWeaponRoll(ev);
    });
    html.find(".attack .description").click((ev) => {
      this.onWeaponRoll(ev);
    });

    html.find(".magic .fatal").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".magic .time-limit").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".magic .effect").click((ev) => {
      this.onItemUpdate(ev);
    });

    html.find(".gear .name").click((ev) => {
      this.onItemSummary(ev, "gear");
    });

    html.find(".condition .selected").change((ev) => {
      this.onToggleActive(ev);
    });
    html.find(".condition .name").click((ev) => {
      this.onItemSummary(ev, "condition");
    });
    html.find(".condition .bonus").click((ev) => {
      this.onItemSummary(ev, "condition");
    });
  }

  async onToggleActive(event) {
    let element = event.currentTarget;
    let itemID = element.closest(".item").dataset.itemId;
    let item = this.actor.items.get(itemID);
    if (item.system.active) {
      await this.actor.updateEmbeddedDocuments("Item", [
        { _id: itemID, "data.active": false },
      ]);
    } else {
      await this.actor.updateEmbeddedDocuments("Item", [
        { _id: itemID, "data.active": true },
      ]);
    }
  }

  onWeaponRoll(event) {
    const div = $(event.currentTarget).parents(".attack");
    const item = this.actor.items.get(div.data("itemId"));
    const testName = item.name;
    let bonus = this.computeInfoFromConditions();
    let attribute = this.actor.system.attribute[item.system.attribute];

    let info = [
      { name: game.i18n.localize(attribute.label + "_ROLL"), value: attribute.value },
      this.computeInfoFromConditions()
    ];

    prepareRollNewDialog(this, testName, info, item.system.damage, null, null);
  }

  /****** determing current dice pool modifier from the last active condition */
  computeInfoFromConditions() {
    let items = Array.from(this.actor.items);
    let lastBonus = 0;
    let lastCondition = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === "condition" && items[i].system.active) {
        lastBonus = items[i].system.bonus;
        lastCondition = items[i].name;
      }
    }
    if (lastBonus == 0)
      return null;
    const conditionLabel = game.i18n.localize("HEADER.CONDITIONS").toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase());
    return { name: conditionLabel, value: lastBonus, tooltip: lastCondition };
  }
}
