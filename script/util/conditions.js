
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
            label: "Exhausted",
            icon: `${this.conditionPath}oppression.svg`
          },
          {
            id: "battered",
            label: "Battered",
            icon: `${this.conditionPath}pummeled.svg`
          },
          {
            id: "wounded",
            label: "Wounded",
            icon: `${this.conditionPath}arm-sling.svg`
          },
          {
            id: "physical",
            label: "Physically Broken",
            icon: `${this.conditionPath}broken-bone.svg`
          },
          {
            id: "angry",
            label: "Angry",
            icon: `${this.conditionPath}revolt.svg`
          },
          {
            id: "frightened",
            label: "Frightened",
            icon: `${this.conditionPath}terror.svg`
          },
          {
            id: "hopeless",
            label: "Hopeless",
            icon: `${this.conditionPath}despair.svg`
          },
          {
            id: "mental",
            label: "Mentally Broken",
            icon: `${this.conditionPath}shattered-heart.svg`
          }
    ];
      

    static allConditions = conditions.vasenConditions;
      
    static onReady() {
        
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