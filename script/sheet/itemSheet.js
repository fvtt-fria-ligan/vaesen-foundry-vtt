import {buildChatCard} from '../util/chat.js';

export class vaesenItemSheet extends ItemSheet {
    constructor(...args) {
        super(...args);
    }


    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width : 650, 
            height: 350,
            classes: ["vaesen", "sheet", "item"],
            resizable: true, 
        });
    }


    get template() {
        return `systems/vaesen/model/items/${this.item.data.type}.hbs`;
    }


    getData() {
        const data = super.getData();
        
        
        return data;
    }


    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        console.log(this.item.data);
        buttons = [
            {
                label: "Display",
                class: "display-chat",
                icon: "fas fa-comment",
                onclick: (ev) => this.sendToChat(this.item.data),
            }
        ].concat(buttons);
        return buttons;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input").focusin(ev => this.onFocusIn(ev));
    }

    onFocusIn(event) {
        $(event.currentTarget).select();
    }

    sendToChat(data) {
        
        let type = data.type;
        let chatData = buildChatCard(type, data);
        
        ChatMessage.create(chatData, {});
    }
}
