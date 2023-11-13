
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