
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
            icon: `${this.conditionPath}oppression.svg`
          },
          {
            id: "battered",
            label: "CONDITION.BATTERED",
            icon: `${this.conditionPath}pummeled.svg`
          },
          {
            id: "wounded",
            label: "CONDITION.WOUNDED",
            icon: `${this.conditionPath}arm-sling.svg`
          },
          {
            id: "physical",
            label: "CONDITION.PHYSICALLYBROKEN",
            icon: `${this.conditionPath}broken-bone.svg`
          },
          {
            id: "angry",
            label: "CONDITION.ANGRY",
            icon: `${this.conditionPath}revolt.svg`
          },
          {
            id: "frightened",
            label: "CONDITION.FRIGHTENED",
            icon: `${this.conditionPath}terror.svg`
          },
          {
            id: "hopeless",
            label: "CONDITION.HOPELESS",
            icon: `${this.conditionPath}despair.svg`
          },
          {
            id: "mental",
            label: "CONDITION.MENTALLYBROKEN",
            icon: `${this.conditionPath}shattered-heart.svg`
          }
    ];
      

    static allConditions = conditions.vasenConditions;
      
    static onReady() {
        console.log(game.i18n.lang );
        console.log("Vaesen | Conditions: ", conditions.vasenConditions);
        CONFIG.vaesen.allConditions = this.allConditions;
        CONFIG.statusEffects = conditions.vasenConditions;
    }


    static getStatusEffectBy(id){
        return this.allStatusEffects.find(effect => effect.id === id);
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