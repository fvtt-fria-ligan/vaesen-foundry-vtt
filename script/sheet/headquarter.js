import { buildChatCard } from "../util/chat.js";

export class HeadquarterCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vaesen", "sheet", "actor"],
      template: "systems/vaesen/model/headquarter.hbs",
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

  getData() {
    const superData = super.getData();
    this.computeItems(superData);
    return superData;
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

  computeItems(data) {
    console.log(data);
    for (let item of Object.values(data.items)) {
      item.isFacility =
        item.type === "upgrade" && item.system.category === "facility";
      item.isContact =
        item.type === "upgrade" && item.system.category === "contact";
      item.isPersonnel =
        item.type === "upgrade" && item.system.category === "personnel";
    }
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
    let div = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(div.data("itemId"));

    let chatData =
      "<p class='item-desc'><b>" +
      game.i18n.localize("UPGRADE.DESCRIPTION") +
      ": </b>" +
      item.data.data.description +
      "</br><b>" +
      game.i18n.localize("UPGRADE.FUNCTION") +
      ": </b>" +
      item.data.data.function +
      " </br><b>" +
      game.i18n.localize("UPGRADE.ASSET") +
      ": </b>" +
      item.data.data.asset +
      "</br></p>";

    if (item.data.data.description.value === null) {
      return;
    } else if (div.hasClass("expanded")) {
      let summary = div.children(".item-summary");
      summary.slideUp(200, () => summary.remove());
    } else {
      let sum = $(`<div class="item-summary">${chatData}</div>`);
      div.append(sum.hide());
      sum.slideDown(200);
    }
    div.toggleClass("expanded");
  }
}
