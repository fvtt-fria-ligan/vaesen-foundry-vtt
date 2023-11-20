import { buildChatCard } from "../util/chat.js";
import { VaesenActorSheet } from "../actor/vaesen-actor-sheet.js";

export class HeadquarterCharacterSheet extends VaesenActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
      width: 900,
      height: 750,
      resizable: true,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "upgrades",
        },
      ],
    });
  }

  

  activateListeners(html) {
    super.activateListeners(html);
    
    html.find(".upgrade .icon").click((ev) => {
      this.onItemUpdate(ev);
    });
    html.find(".upgrade .name").click((ev) => {
      this.onItemSummary(ev);
    });
    html.find(".upgrade .function").click((ev) => {
      this.onItemSummary(ev);
    });
    html.find(".upgrade .asset").click((ev) => {
      this.onItemSummary(ev);
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

  onItemCreate(event) {
    event.preventDefault();
    let header = event.currentTarget;
    let data = duplicate(header.dataset);
    data["name"] = `New ${data.type.capitalize()}`;
    data["data.category"] = data["category"];
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

  onItemSummary(event) {
    event.preventDefault();
    let div = $(event.currentTarget).parents(".list-item");
    const item = this.actor.items.get(div.data("itemId"));
   
    let chatData =
      "<p class='item-desc'><b>" +
      game.i18n.localize("UPGRADE.DESCRIPTION") +
      ": </b>" +
      item.system.description +
      "</br><b>" +
      game.i18n.localize("UPGRADE.FUNCTION") +
      ": </b>" +
      item.system.function +
      " </br><b>" +
      game.i18n.localize("UPGRADE.ASSET") +
      ": </b>" +
      item.system.asset +
      "</br></p>";

    if (item.system.description.value === null) {
      return;
    } else if (div.hasClass("expanded")) {
      let summary = div.children("#item-summary");
      summary.slideUp(200, () => summary.remove());
    } else {
      let sum = $(`<div class="item-summary grid-span-3" id="item-summary">${chatData}</div>`);
      div.append(sum.hide());
      sum.slideDown(200);
    }
    div.toggleClass("expanded");
  }
}
