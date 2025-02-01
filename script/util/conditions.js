
export class conditions{


    static EXHAUSTED = "exhausted";
    static BATTERED = "battered";
    static WOUNDED = "wounded";
    static P_BROKEN = "physical";
    static ANGRY = "angry";
    static FRIGHTENED = "frightened";
    static HOPELESS = "hopeless";
    static M_BROKEN = "mental";
    
    static conditionPath = "systems/vaesen/asset/status/";
   
    static vasenConditions = [
          {
            id: "exhausted",
            label: "CONDITION.EXHAUSTED",
            icon: `${this.conditionPath}oppression.svg`,
            changes: [
              {
                key: "system.condition.physical.states.exhausted.isChecked",
                mode: 5,
                value: true
              }
            ],
            statuses: ["exhausted"]
          },
          {
            id: "battered",
            label: "CONDITION.BATTERED",
            icon: `${this.conditionPath}pummeled.svg`,
            changes: [
              {
                key: "system.condition.physical.states.battered.isChecked",
                mode: 5,
                value: true
              }
            ],
            statuses: ["battered"]
          },
          {
            id: "wounded",
            label: "CONDITION.WOUNDED",
            icon: `${this.conditionPath}arm-sling.svg`,
            changes: [
              {
                key: "system.condition.physical.states.wounded.isChecked",
                mode: 5,
                value: true
              }
            ],
            statuses: ["wounded"]
          },
          {
            id: "physical",
            label: "CONDITION.PHYSICALLYBROKEN",
            icon: `${this.conditionPath}broken-bone.svg`,
            changes: [
              {
                key: "system.condition.physical.isBroken",
                mode: 5,
                value: true
              }
            ],
            statuses: ["physical"]
          },
          {
            id: "angry",
            label: "CONDITION.ANGRY",
            icon: `${this.conditionPath}revolt.svg`,
            changes: [
              {
                key: "system.condition.mental.states.angry.isChecked",
                mode: 5,
                value: true
              }
            ],
            statuses: ["angry"]
          },
          {
            id: "frightened",
            label: "CONDITION.FRIGHTENED",
            icon: `${this.conditionPath}terror.svg`,
            changes: [
              {
                key: "system.condition.mental.states.frightened.isChecked",
                mode: 5,
                value: true
              }
            ],
            statuses: ["frightened"]
          },
          {
            id: "hopeless",
            label: "CONDITION.HOPELESS",
            icon: `${this.conditionPath}despair.svg`,
            changes: [
              {
                key: "system.condition.mental.states.hopeless.isChecked",
                mode: 5,
                value: true
              }
            ],
            statuses: ["hopeless"]
          },
          {
            id: "mental",
            label: "CONDITION.MENTALLYBROKEN",
            icon: `${this.conditionPath}shattered-heart.svg`,
            changes: [
              {
                key: "system.condition.mental.isBroken",
                mode: 5,
                value: true
              }
            ],
            statuses: ["mental"]
          }
    ];
      

    static allConditions = conditions.vasenConditions;
      
    static onReady() {
       // console.log(game.i18n.lang );
      //console.log("Vaesen | Conditions: ", conditions.vasenConditions);
        CONFIG.vaesen.allConditions = this.allConditions;
        CONFIG.statusEffects = conditions.vasenConditions;
    }


    static getStatusEffectBy(id){
        return this.allStatusEffects.find(effect => effect.id === id);
    }

    static async onActionCondition(data) {
      const condition = await CONFIG.statusEffects.find(it => it.id == data.property);
      if (!condition) return;

      const token = await Array.from(game.scenes.current.tokens).find(it => it._id == data.combatant.tokenId);
      const tokenCondition = token.actor.effects.find(it => it.icon == condition.icon);
      const conditionStatus = data.combatant.flags["yze-combat"][data.property];

      if (conditionStatus && tokenCondition) return;
      
      await token.toggleActiveEffect(condition);
    }

    static async onActionUpdate(tokenId, combatant, turn, preparation) {
      console.log("Vasen | YZE Combat | onActionUpdate", CONFIG.hasYZECombatActive);
      if(CONFIG.hasYZECombatActive){
        console.log("YZE Combat is active - skipping conditions");
        return;
      }
      if (!preparation && this.combatPreparation) return;

      const token = await Array.from(game.scenes.current.tokens).find(it => it._id == tokenId);

      const fastCondition = await CONFIG.statusEffects.find(it => it.id =="fastAction");
      const slowCondition = await CONFIG.statusEffects.find(it => it.id =="slowAction");

      const slowAction = await token.actor.effects.find(it => it.icon == slowCondition.icon);
      const fastAction = await token.actor.effects.find(it => it.icon == fastCondition.icon);

      console.log("CUSSA _ UPDATE", token, slowAction, fastAction);

      if (turn == 0) {
        if (slowAction) await token.toggleActiveEffect(slowCondition);
        if (fastAction) await token.toggleActiveEffect(fastCondition);
        return;
      }
      
      if ((combatant.flags["yze-combat"].fastAction && !fastAction) || 
          (!combatant.flags["yze-combat"].fastAction && fastAction)) {
        await token.toggleActiveEffect(fastCondition);
      }

      if ((combatant.flags["yze-combat"].slowAction && !slowAction) || 
          (!combatant.flags["yze-combat"].slowAction && slowAction)) {
        await token.toggleActiveEffect(slowCondition);
      }

    }

    static combatPreparation = false;
    static async onCombatStartEnd(data) {
      this.combatPreparation = true;
      for (const turn of data.turns) {
        console.log("CUSSA _ COMBAT", turn);
        await this.onActionUpdate(turn.tokenId, null, 0, true);
      }
      this.combatPreparation = false;
    }

    static async onVaesenCondition(actor, conditionId) {
      let condition = Array.from(actor.items?.values()).find(x => x.type == "condition" && x._id == conditionId);
   

      await actor.updateEmbeddedDocuments("Item", [
        { _id: condition._id, "system.active": !condition.system.active, name: condition.name },
      ]);


  
      const statusEffect = {
        name: condition.name,
        label: condition.name,
        icon: condition.img,
        id: condition.name,
        statuses: [condition.name],
        flags: {
          core: {
            statusId: condition.name
          }
        }
      };
  
      const currentEffect = Array.from(actor.effects?.values()).find(it => it.icon === statusEffect.icon);
      if (currentEffect) {
        await actor.deleteEmbeddedDocuments('ActiveEffect', [currentEffect.id]);
      }
      else {
        await actor.createEmbeddedDocuments("ActiveEffect", [statusEffect]);
      }

      return condition.system.active;
    }

}

conditions.eventsProcessing = {
    "onToggleEffect": async function (event) {
		
		
        event.preventDefault();
        //let element = event.currentTarget;
        let actor = this.actor;
        let conditionName = $(event.currentTarget).data("key");
        //let effectId = element.dataset.effectId;
        console.log(conditionName);
        console.log(actor);
        
        await actor.toggleStatusEffectById(conditionName)
       
    }
}