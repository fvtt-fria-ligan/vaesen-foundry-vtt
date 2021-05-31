export class HeadquarterCharacterSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "actor"],
            template: "systems/vaesen/model/headquarter.html",
            width: 600,
            height: 748,
            resizable: false,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}]
        });
    }

    getData() {
        const superData = super.getData();
        this.computeItems(superData.data);
        return superData;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('.item-create').click(ev => { this.onItemCreate(ev); });
        html.find('.item-edit').click(ev => { this.onItemUpdate(ev); });
        html.find('.item-delete').click(ev => { this.onItemDelete(ev); });
        html.find("input").focusin(ev => this.onFocusIn(ev));

        html.find('.upgrade .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.upgrade .name').click(ev => { this.onItemUpdate(ev); });
        html.find('.upgrade .function').click(ev => { this.onItemUpdate(ev); });
        html.find('.upgrade .asset').click(ev => { this.onItemUpdate(ev); });
    }

    computeItems(data) {
        for (let item of Object.values(data.items)) {
            item.isFacility = item.type === 'upgrade' && item.data.category === "facility";
            item.isContact = item.type === 'upgrade' && item.data.category === "contact";
            item.isPersonnel = item.type === 'upgrade' && item.data.category === "personnel";
        }
    }

    onItemCreate(event) {
        event.preventDefault();
        let header = event.currentTarget;
        let data = duplicate(header.dataset);
        data["name"] = `New ${data.type.capitalize()}`;
        data['data.category'] = data['category'];
        this.actor.createEmbeddedEntity("OwnedItem", data);
    }

    onItemUpdate(event) {
        const div = $(event.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(div.data("itemId"));
        item.sheet.render(true);
    }

    onItemDelete(event) {
        const div = $(event.currentTarget).parents(".item");
        this.actor.deleteOwnedItem(div.data("itemId"));
        div.slideUp(200, () => this.render(false));
    }

    onFocusIn(event) {
        $(event.currentTarget).select();
    }
}
