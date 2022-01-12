export class VaesenActor extends Actor {

    prepareData(){
        super.prepareData();
        const actorData = this.data;

        this.data.exp = actorData.data.experience;
		
		
    }

   /* -------------------------------------------- */
   findStatusEffectById(id) {
    return Array.from(this.effects?.values())
        .find(it => it.data.flags.core?.statusId === id);
    }

    /* -------------------------------------------- */
    async deleteStatusEffectById(id, options = {renderSheet: true}) {
        console.log("delete by id: " + id);
        const effects = Array.from(this.effects?.values())
            .filter(it => it.data.flags.core?.statusId === id);
        await this._deleteStatusEffects(effects, options);
    }

    /* -------------------------------------------- */
    async _deleteStatusEffects(effects, options) {
        console.log(effects);
        console.log(effects.map(it => it.id));
        console.log(options);
        const ids = Array.from(effects.map(it => it.id));
        await this.deleteEmbeddedDocuments('ActiveEffect', ids, options);
        //await this._deleteStatusEffectsByIds(effects.map(it => it.id), options);
        
    }

    /* -------------------------------------------- */
    async _deleteStatusEffectsByIds(effectIds, options) {
        await this.deleteEmbeddedDocuments('ActiveEffect', effectIds, options);
    }

    /* -------------------------------------------- */
    async addStatusEffectById(id, options = {renderSheet: false, unique: true}) {
        if (this.hasStatusEffectById(id) && options.unique === true) {
            return;
        }
        const statusEffect = CONFIG.statusEffects.find(it => it.id === id);
        await this.addStatusEffect(statusEffect, options);
    }

    /* -------------------------------------------- */
    async addStatusEffect(statusEffect, options = {renderSheet: false, overlay: false}) {
        //await this.deleteStatusEffectById(statusEffect.id, options);
        const effect = duplicate(statusEffect);
        console.log(effect.label);
        console.log(effect.id);
        await this.createEmbeddedDocuments("ActiveEffect", [{
            "flags.core.statusId": effect.id,
            "flags.core.overlay": options.overlay,
            label: effect.label,
            icon: effect.icon,
            origin: this.uuid,
        }], options);
    }

    /* -------------------------------------------- */
    hasStatusEffectById(id) {
        const effects = this.findStatusEffectById(id);
        return (effects !== undefined);
    }

    async toggleStatusEffectById(id, options = {renderSheet: true}) {
        console.log("over to the character for toggeling");
        
        const effect = this.findStatusEffectById(id);
        
        if (effect) {
            await this.deleteStatusEffectById(id);
        } else {
            await this.addStatusEffectById(id, options)
        }
    }

    static async create(data, options={}) {
        data.token = data.token || {};
        mergeObject(data.token, {
            vision: true,
            dimSight: 30,
            brightSight: 30,
            actorLink: true,
            disposition: 1
        }, {overwrite: false});
        return super.create(data, options);
    }
}
