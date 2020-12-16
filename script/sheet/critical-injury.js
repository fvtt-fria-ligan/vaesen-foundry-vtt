export class CriticalInjuryCharacterSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "item"],
            template: "systems/vaesen/model/critical-injury.html",
            width: 400,
            height: 178,
            resizable: false
        });
    }

    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
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

    getData() {
        const data = super.getData();
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input").focusin(ev => this.onFocusIn(ev));
    }

    onFocusIn(event) {
        $(event.currentTarget).select();
    }

    sendToChat(data) {
        let message = "<b>" + data.name.toUpperCase() + "</b></br>" +
            "<b>" + game.i18n.localize("CRITICAL_INJURY.TYPE") + ": </b>" + data.data.type + "</br>" +
            "<b>" + game.i18n.localize("CRITICAL_INJURY.FATAL") + ": </b>" + data.data.fatal + "</br>" +
            "<b>" + game.i18n.localize("CRITICAL_INJURY.TIME_LIMIT") + ": </b>" + data.data.timeLimit + "</br>" +
            "<b>" + game.i18n.localize("CRITICAL_INJURY.EFFECT") + ": </b>" + data.data.effect + "</br>";
        let chatData = {
            user: game.user._id,
            content: message
        };
        ChatMessage.create(chatData, {});
    }
}
