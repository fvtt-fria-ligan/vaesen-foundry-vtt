export class TalentCharacterSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "item"],
            template: "systems/vaesen-rpg/model/talent.html",
            width: 400,
            height: 300,
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
            "<b>" + game.i18n.localize("TALENT.DESCRIPTION") + ": </b>" + data.data.description + "</br>";
        let chatData = {
            user: game.user._id,
            content: message
        };
        ChatMessage.create(chatData, {});
    }
}
