import { prepareRollDialog } from "../util/roll.js";

export class VaesenCharacterSheet extends ActorSheet {

    dices = [];
    lastTestName = "";
    lastDamage = 0;

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "actor"],
            template: "systems/vaesen/model/vaesen.html",
            width: 600,
            height: 748,
            resizable: false,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}]
        });
    }

    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        if (this.actor.owner) {
            buttons = [
                {
                    label: "Roll",
                    class: "custom-roll",
                    icon: "fas fa-dice",
                    onclick: (ev) => prepareRollDialog(this, "Roll", 0, 0, 0, 0),
                }
            ].concat(buttons);
        }
        return buttons;
    }

    getData() {
        const data = super.getData();
        this.computeItems(data);
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('.item-create').click(ev => { this.onItemCreate(ev); });
        html.find('.item-edit').click(ev => { this.onItemUpdate(ev); });
        html.find('.item-delete').click(ev => { this.onItemDelete(ev); });
        html.find("input").focusin(ev => this.onFocusIn(ev));

        html.find('.attribute b').click(ev => {
            const div = $(ev.currentTarget).parents(".attribute");
            const attributeName = div.data("key");
            const attribute = this.actor.data.data.attribute[attributeName];
            const testName = game.i18n.localize(attribute.label);
            let bonus = this.computeBonusFromConditions();
            prepareRollDialog(this, testName, attribute.value, 0, bonus, 0)
        });

        html.find('.condition .icon').click(ev => { this.onConditionRoll(ev); });
        html.find('.condition .name').click(ev => { this.onConditionRoll(ev); });
        html.find('.condition .bonus').click(ev => { this.onConditionRoll(ev); });
        html.find('.condition .description').click(ev => { this.onConditionRoll(ev); });

        html.find('.armor .icon').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .name').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .protection').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .agility').click(ev => { this.onArmorRoll(ev); });

        html.find('.attack .icon').click(ev => { this.onWeaponRoll(ev); });
        html.find('.attack .name').click(ev => { this.onWeaponRoll(ev); });
        html.find('.attack .damage').click(ev => { this.onWeaponRoll(ev); });
        html.find('.attack .range').click(ev => { this.onWeaponRoll(ev); });
        html.find('.attack .description').click(ev => { this.onWeaponRoll(ev); });

        html.find('.magic .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.magic .name').click(ev => { this.onItemUpdate(ev); });
        html.find('.magic .fatal').click(ev => { this.onItemUpdate(ev); });
        html.find('.magic .time-limit').click(ev => { this.onItemUpdate(ev); });
        html.find('.magic .effect').click(ev => { this.onItemUpdate(ev); });

        html.find('.gear .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .name').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .bonus').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .effect').click(ev => { this.onItemUpdate(ev); });
    }

    computeItems(data) {
        for (let item of Object.values(data.items)) {
            item.isWeapon = item.type === 'weapon';
            item.isCondition = item.type === 'condition';
            item.isMagic = item.type === 'magic';
            item.isCondition = item.type === 'condition';
            item.isArmor = item.type === 'armor';
            item.isAttack = item.type === 'attack';
            item.isGear = item.type === 'gear';
        }
    }

    onItemCreate(event) {
        event.preventDefault();
        let header = event.currentTarget;
        let data = duplicate(header.dataset);
        data["name"] = `New ${data.type.capitalize()}`;
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

    onArmorRoll(event) {
        const div = $(event.currentTarget).parents(".armor");
        const item = this.actor.getOwnedItem(div.data("itemId"));
        const testName = item.name;
        prepareRollDialog(this, testName, 0, 0, item.data.data.protection, 0)
    }

    onWeaponRoll(event) {
        const div = $(event.currentTarget).parents(".attack");
        const item = this.actor.getOwnedItem(div.data("itemId"));
        const testName = item.name;
        let bonus = this.computeBonusFromConditions();
        let attribute = this.actor.data.data.attribute[item.data.data.attribute].value;
        prepareRollDialog(this, testName, attribute, 0, bonus, item.data.data.damage)
    }

    async onConditionRoll(event) {
        const div = $(event.currentTarget).parents(".condition");
        const selectedCondition = this.actor.getOwnedItem(div.data("itemId"));
        for (let item of Object.values(this.actor.data.items)) {
            if (item.type === 'condition' && item._id === selectedCondition._id) {
                await this.actor.updateOwnedItem({_id: item._id, "data.active": !item.data.active});
            } else if (item.type === 'condition') {
                await this.actor.updateOwnedItem({_id: item._id, "data.active": false});
            }
        }
        this._render();
    }

    computeBonusFromConditions() {
        for (let item of Object.values(this.actor.data.items)) {
            if (item.type === 'condition' && item.data.active) {
                return parseInt(item.data.bonus, 10);
            }
        }
        return 0;
    }
}
