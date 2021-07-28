export class UpgradeCharacterSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "item"],
            template: "systems/vaesen/model/upgrade.html",
            width: 400,
            height: 530,
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

    getChatData(){
        data = this.item.data;
        let description = "<b>" + game.i18n.localize("UPGRADE.DESCRIPTION") + 
            ": </b>" + data.data.description + "</br>" +
            "<b>" + game.i18n.localize("UPGRADE.FUNCTION") + ": </b>" + data.data.function + "</br>";
        return description;
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
