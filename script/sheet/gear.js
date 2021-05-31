export class GearCharacterSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "item"],
            template: "systems/vaesen/model/gear.html",
            width: 400,
            height: 586,
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
        const superData = super.getData();
        return superData;
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
            "<b>" + game.i18n.localize("GEAR.BONUS") + ": </b>" + data.data.bonus + "</br>" +
            "<b>" + game.i18n.localize("GEAR.AVAILABILITY") + ": </b>" + data.data.availability + "</br>" +
            "<b>" + game.i18n.localize("GEAR.EFFECT") + ": </b>" + data.data.effect + "</br>" +
            "<b>" + game.i18n.localize("GEAR.DESCRIPTION") + ": </b>" + data.data.description + "</br>" +
            "<b>" + game.i18n.localize("GEAR.RISK") + ": </b>" + data.data.risk + "</br>";
        let chatData = {
            user: game.user._id,
            content: message
        };
        ChatMessage.create(chatData, {});
    }
}
