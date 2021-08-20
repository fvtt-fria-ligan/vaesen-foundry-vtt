import { prepareRollDialog } from "../util/roll.js";

export class VaesenCharacterSheet extends ActorSheet {

    dices = [];
    lastTestName = "";
    lastDamage = 0;

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "actor"],
            template: "systems/vaesen/model/vaesen.html",
            width: 700,
            height: 748,
            resizable: false,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}]
        });
    }

    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        if (this.actor.isOwner) {
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

        html.find('.attribute b').click(ev => {
            const div = $(ev.currentTarget).parents(".attribute");
            const attributeName = div.data("key");
            const attribute = this.actor.data.data.attribute[attributeName];
            const testName = game.i18n.localize(attribute.label);
            let bonus = this.computeBonusFromConditions();
            prepareRollDialog(this, testName, attribute.value, 0, bonus, 0)
        });
        /****** 
         * 
         * really not sure what this is all about
         * notning in RAW that would ahve a roll on a conditon for a vaesen...
        html.find('.condition .icon').click(ev => { this.onConditionRoll(ev); });
        html.find('.condition .name').click(ev => { this.onConditionRoll(ev); });
        html.find('.condition .bonus').click(ev => { this.onConditionRoll(ev); });
        html.find('.condition .description').click(ev => { this.onConditionRoll(ev); });
        ******/

        html.find('.armor .icon').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .name').click(ev => { this.onItemSummary(ev, "armor"); });
        html.find('.armor .protection').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .agility').click(ev => { this.onArmorRoll(ev); });

        html.find('.attack .icon').click(ev => { this.onWeaponRoll(ev); });
        html.find('.attack .name').click(ev => { this.onItemSummary(ev, "attack"); });
        html.find('.attack .damage').click(ev => { this.onWeaponRoll(ev); });
        html.find('.attack .range').click(ev => { this.onWeaponRoll(ev); });
        html.find('.attack .description').click(ev => { this.onWeaponRoll(ev); });

        html.find('.magic .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.magic .name').click(ev => { this.onItemSummary(ev, "magic"); });
        html.find('.magic .fatal').click(ev => { this.onItemUpdate(ev); });
        html.find('.magic .time-limit').click(ev => { this.onItemUpdate(ev); });
        html.find('.magic .effect').click(ev => { this.onItemUpdate(ev); });

        html.find('.gear .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .name').click(ev => { this.onItemSummary(ev, "gear"); });
        html.find('.gear .bonus').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .effect').click(ev => { this.onItemUpdate(ev); });

        html.find('.condition .selected').change(ev => {this.onToggleActive(ev);});
        html.find('.condition .name').click(ev => {this.onItemSummary(ev, "condition");})
        html.find('.condition .bonus').click(ev => {this.onItemSummary(ev, "condition");})
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

    async onToggleActive(event){
        
        let element = event.currentTarget;
        let itemID = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemID);
        if(item.data.data.active){
            await this.actor.updateEmbeddedDocuments("Item", [{_id: itemID, "data.active": false}]);
        } else {
            await this.actor.updateEmbeddedDocuments("Item", [{_id: itemID, "data.active": true}]);
        }
        
    }

    /****** Toggle the roll-down of expanded item information.  */
    onItemSummary(event, type){
        let div=$(event.currentTarget).parents(".item"),
        item = this.actor.items.get(div.data("itemId")),
        chatData = '';

        switch (type){
            
            case "condition":
                let itemDesc = item.data.data.description;
                chatData =  "<p class='item-desc'><b>" + game.i18n.localize("CONDITION.DESCRIPTION") + 
                            ":</b> " + itemDesc + "</br></p>" ;
                break;
           case "attack":
                chatData =  "<p class='item-desc'><b>" + game.i18n.localize("WEAPON.DAMAGE") + 
                ":</b> " + item.data.data.damage +" | <b>" + game.i18n.localize("WEAPON.RANGE") + 
                ":</b> " + item.data.data.range +"</br></p>";
                break;
            case "gear":
                chatData =  "<p class='item-desc'><b>" + game.i18n.localize("GEAR.BONUS") + 
                ":</b> " + item.data.data.bonus +"</br><b>" + game.i18n.localize("GEAR.EFFECT") + 
                ":</b> " + item.data.data.effect +"</br><b>" + game.i18n.localize("GEAR.DESCRIPTION") + 
                ":</b> " + item.data.data.description +"</br></p>";
                break;
            case "magic":
                chatData =  "<p class='item-desc'><b>" + game.i18n.localize("MAGIC.CATEGORY") + 
                ":</b> " + item.data.data.category +" | <b>" +  game.i18n.localize("MAGIC.DESCRIPTION") + 
                ":</b> " + item.data.data.description +"</br></p>";
                break;
            case "armor":
                chatData =  "<p class='item-desc'><b>" + game.i18n.localize("ARMOR.PROTECTION") + 
                            ":</b> " + item.data.data.protection +" | <b>" + game.i18n.localize("ARMOR.AGILITY") + 
                            ":</b> " + item.data.data.agility +"</br></p>";
                break;
        }

        

        if(chatData === null){
            return;
        } else if (div.hasClass("expanded")){
            let sum = div.children(".item-summary");
            sum.slideUp(200, () => sum.remove());
        } else {
            let sum = $(`<div class="item-summary">${chatData}</div>`);
            div.append(sum.hide());
            sum.slideDown(200);
        }
        div.toggleClass("expanded");
    }

    onItemCreate(event) {
        event.preventDefault();
        let header = event.currentTarget;
        let data = duplicate(header.dataset);
        data["name"] = `New ${data.type.capitalize()}`;
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

    onArmorRoll(event) {
        const div = $(event.currentTarget).parents(".armor");
        const item = this.actor.items.get(div.data("itemId"));
        const testName = item.name;
        prepareRollDialog(this, testName, 0, 0, item.data.data.protection, 0)
    }

    onWeaponRoll(event) {
        const div = $(event.currentTarget).parents(".attack");
        const item = this.actor.items.get(div.data("itemId"));
        const testName = item.name;
        let bonus = this.computeBonusFromConditions();
        let attribute = this.actor.data.data.attribute[item.data.data.attribute].value;
        prepareRollDialog(this, testName, attribute, 0, bonus, item.data.data.damage)
    }

    async onConditionRoll(event) {
        const div = $(event.currentTarget).parents(".condition");
        const selectedCondition = this.actor.items.get(div.data("itemId"));
        for (let item of Object.values(this.actor.data.items)) {
            if (item.type === 'condition' && item._id === selectedCondition._id) {
                await this.actor.updateEmbeddedDocuments("Item", [{_id: item._id, "data.active": !item.data.active}]);
            } else if (item.type === 'condition') {
                await this.actor.updateEmbeddedDocuments("Item", [{_id: item._id, "data.active": false}]);
            }
        }
        this._render();
    }

    /****** determing current dice pool modifier from the last active condition */
    computeBonusFromConditions() {
        let items = Array.from(this.actor.data.items);
        let lastBonus = 0;
        for(let i = 0; i<items.length; i++){
            if(items[i].data.type === 'condition' && items[i].data.data.active){
                lastBonus = items[i].data.data.bonus;
            }
        }
        return lastBonus;
    }
}
