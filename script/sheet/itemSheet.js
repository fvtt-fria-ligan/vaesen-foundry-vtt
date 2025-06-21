import ChatMessageVaesen from "../util/chat.js";

export class vaesenItemSheet extends foundry.appv1.sheets.ItemSheet {
  constructor(...args) {
    super(...args);
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 650,
      height: 'auto',
      classes: ["vaesen", "sheet", "item"],
      resizable: true,
    });
  }

  get template() {
    return `systems/vaesen/model/items/${this.item.type}.hbs`;
  }

  async getData() {
    const data = super.getData();
    const source = this.item.toObject();
    data.config = CONFIG.vaesen;
    data.source = source;
    console.log("Vaesen | data: ", data);

    return data;
  }

  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();
    buttons = [
      {
        label: "Display",
        class: "display-chat",
        icon: "fas fa-comment",
        onclick: (ev) => this.sendToChat(this.item),
      },
    ].concat(buttons);
    return buttons;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("input").focusin((ev) => this.onFocusIn(ev));
  }

  onFocusIn(event) {
    $(event.currentTarget).select();
  }

  sendToChat(data) {
    let type = data.type;
    let chatData = ChatMessageVaesen.buildChatCard(type, data);
    ChatMessageVaesen.create(chatData, {});
  }
}
