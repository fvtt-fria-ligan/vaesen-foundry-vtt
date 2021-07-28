import { prepareRollDialog, push, roll } from "../util/roll.js";

export class PlayerCharacterSheet extends ActorSheet {

    dices = [];
    lastTestName = "";
    lastDamage = 0;

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["vaesen", "sheet", "actor"],
            template: "systems/vaesen/model/player.html",
            width: 750,
            height: 900,
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
                },
                {
                    label: "Push",
                    class: "push-roll",
                    icon: "fas fa-skull",
                    onclick: (ev) => push(this),
                }
            ].concat(buttons);
        }
        return buttons;
    }

    getData() {
        const superData = super.getData();
        this.setSwag(superData.data);
        this.computeSkills(superData.data);
        this.computeItems(superData.data);
        return superData;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('.item-create').click(ev => { this.onItemCreate(ev); });
        html.find('.item-edit').click(ev => { this.onItemUpdate(ev); });
        html.find('.item-delete').click(ev => { this.onItemDelete(ev); });
        html.find('.fav-togle').click(ev => {this.onFavTogle(ev);});
        html.find('.roll-recovery').click(ev => {this.onRecovery(ev);});
        html.find("input").focusin(ev => this.onFocusIn(ev));

        html.find('.resources b').click(ev => {
            prepareRollDialog(this, "Resources", 0, 0, this.actor.data.data.resources, 0)
        });

        html.find('.physical .condition').click(ev => {
            const conditionName = $(ev.currentTarget).data("key");
            let conditionValue;
            if (conditionName === "physical") {
                conditionValue = this.actor.data.data.condition.physical.isBroken;
                this.actor.update({"data.condition.physical.isBroken": !conditionValue});
            } else {
                conditionValue = this.actor.data.data.condition.physical.states[conditionName].isChecked;
                if (conditionName === "exhausted") {
                    this.actor.update({"data.condition.physical.states.exhausted.isChecked": !conditionValue});
                } else if (conditionName === "battered") {
                    this.actor.update({"data.condition.physical.states.battered.isChecked": !conditionValue});
                } else if (conditionName === "wounded") {
                    this.actor.update({"data.condition.physical.states.wounded.isChecked": !conditionValue});
                }
            }
            this._render();
        });
        html.find('.mental .condition').click(ev => {
            const conditionName = $(ev.currentTarget).data("key");
            let conditionValue;
            if (conditionName === "mental") {
                conditionValue = this.actor.data.data.condition.mental.isBroken;
                this.actor.update({"data.condition.mental.isBroken": !conditionValue});
            } else {
                conditionValue = this.actor.data.data.condition.mental.states[conditionName].isChecked;
                if (conditionName === "angry") {
                    this.actor.update({"data.condition.mental.states.angry.isChecked": !conditionValue});
                } else if (conditionName === "frightened") {
                    this.actor.update({"data.condition.mental.states.frightened.isChecked": !conditionValue});
                } else if (conditionName === "hopeless") {
                    this.actor.update({"data.condition.mental.states.hopeless.isChecked": !conditionValue});
                }
            }
            this._render();
        });

        html.find('.attribute b').click(ev => {
            const div = $(ev.currentTarget).parents(".attribute");
            const attributeName = div.data("key");
            const attribute = this.actor.data.data.attribute[attributeName];
            const testName = game.i18n.localize(attribute.label + "_ROLL");
            let bonus = this.computeBonusFromConditions(attributeName);
            prepareRollDialog(this, testName, attribute.value, 0, bonus, 0)
        });
        html.find('.skill b').click(ev => {
            const div = $(ev.currentTarget).parents(".skill");
            const skillName = div.data("key");
            const skill = this.actor.data.data.skill[skillName];
            const attribute = this.actor.data.data.attribute[skill.attribute];
            let bonusConditions = this.computeBonusFromConditions(skill.attribute);
            let bonusArmor = this.computeBonusFromArmor(skillName);
            const testName = game.i18n.localize(skill.label);
            prepareRollDialog(this, testName, attribute.value, skill.value, bonusConditions + bonusArmor, 0)
        });

        html.find('.armor .icon').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .name').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .protection').click(ev => { this.onArmorRoll(ev); });
        html.find('.armor .agility').click(ev => { this.onArmorRoll(ev); });

        html.find('.weapon .icon').click(ev => { this.onWeaponRoll(ev); });
        html.find('.weapon .name').click(ev => { this.onWeaponRoll(ev); });
        html.find('.weapon .damage').click(ev => { this.onWeaponRoll(ev); });
        html.find('.weapon .range').click(ev => { this.onWeaponRoll(ev); });
        html.find('.weapon .bonus').click(ev => { this.onWeaponRoll(ev); });

        html.find('.critical-injury .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.critical-injury .name').click(ev => { this.onItemUpdate(ev); });
        html.find('.critical-injury .fatal').click(ev => { this.onItemUpdate(ev); });
        html.find('.critical-injury .time-limit').click(ev => { this.onItemUpdate(ev); });
        html.find('.critical-injury .effect').click(ev => { this.onItemUpdate(ev); });

        html.find('.talent .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.talent .name').click(ev => { this.onItemUpdate(ev); });
        html.find('.talent .description').click(ev => { this.onItemUpdate(ev); });

        html.find('.gear .icon').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .name').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .bonus').click(ev => { this.onItemUpdate(ev); });
        html.find('.gear .effect').click(ev => { this.onItemUpdate(ev); });
    }

    computeSkills(data) {
        for (let skill of Object.values(data.data.skill)) {
            skill.hasPhysique = skill.attribute === 'physique';
            skill.hasPrecision = skill.attribute === 'precision';
            skill.hasLogic = skill.attribute === 'logic';
            skill.hasEmpathy = skill.attribute === 'empathy';
        }
    }

    computeItems(data) {
        for (let item of Object.values(data.items)) {
            item.isCriticalInjury = item.type === 'criticalInjury';
            item.isWeapon = item.type === 'weapon';
            item.isArmor = item.type === 'armor';
            item.isTalent = item.type === 'talent';
            item.isGear = item.type === 'gear';
        }
    }
	
	setSwag(data) {
		data.swag = game.settings.get("vaesen", "swag") ? true : false;
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

    onFavTogle(event) {
			
		const div = $(event.currentTarget).parents(".item");
        const item = this.actor.items.get(div.data("itemId"));
			
		let fav = item.data.data.isFav;
		if(fav){
			item.data.data.isFav = false;
			item.update({ "data.isFav" : false});
		} else {
			item.data.data.isFav = true;
			item.update({ "data.isFav" : true});
		}
			 
		item.update();
			
	}
    onRecovery(event) {
        event.preventDefault();
        let actor = this.actor;
        let data = actor.data.data;
        let physique = data.attribute.physique.value;
        let precision = data.attribute.precision.value;
        let logic = data.attribute.logic.value;
        let empathy = data.attribute.empathy.value;
        const element = $(event.currentTarget).parents(".conditions");
        const type = element[0].dataset.key;

        if(type==="physical"){
            
            let pool = physique+precision;
            roll(this, "Physical Recovery", 0, 0, pool, 0);
        } else {
            
            let pool = logic+empathy;
            roll(this, "Mental Recovery", 0, 0, pool, 0);
        }

        
    }

    onArmorRoll(event) {
        const div = $(event.currentTarget).parents(".armor");
        const item = this.actor.items.get(div.data("itemId"));
        const testName = item.name;
        prepareRollDialog(this, testName, 0, 0, item.data.data.protection, 0)
    }

    onWeaponRoll(event) {
        const div = $(event.currentTarget).parents(".weapon");
        const item = this.actor.data.items.get(div.data("itemId"));
        const testName = item.name;
        let attribute = 0;
        let skill = 0;
        let bonusFromCondition = 0;
        let bonusFromWeapon = parseInt(item.data.data.bonus, 10);
        if (item.data.data.skill === "force") {
            attribute = this.actor.data.data.attribute.physique.value;
            skill = this.actor.data.data.skill.force.value;
            bonusFromCondition = this.computeBonusFromConditions("physique");
        } else if (item.data.data.skill === "closeCombat") {
            attribute = this.actor.data.data.attribute.physique.value;
            skill = this.actor.data.data.skill.closeCombat.value;
            bonusFromCondition = this.computeBonusFromConditions("physique");
        }
        else if (item.data.data.skill === "rangedCombat") {
            attribute = this.actor.data.data.attribute.precision.value;
            skill = this.actor.data.data.skill.rangedCombat.value;
            bonusFromCondition = this.computeBonusFromConditions("precision");
        }
        prepareRollDialog(this, testName, attribute, skill, bonusFromWeapon + bonusFromCondition, item.data.data.damage)
    }

    computeBonusFromConditions(attributeName) {
        let bonus = 0;
        let datas;
        if (attributeName === "physique" || attributeName === "precision") {
            datas = this.actor.data.data.condition.physical.states;
        } else {
            datas = this.actor.data.data.condition.mental.states;
        }
        for (let condition of Object.values(datas)) {
            if (condition.isChecked) {
                bonus = bonus - 1;
            }
        }
        return parseInt(bonus, 10);
    }

    computeBonusFromArmor(skillName) {
        let bonus = 0;
        if (skillName === "agility") {
            
            for (let item of Object.values(this.actor.data.items.contents)) {
                if (item.type === "armor" && bonus >= item.data.data.agility) {
                    bonus =  item.data.data.agility;
                }
            }
        }
        return parseInt(bonus, 10);
    }
}
