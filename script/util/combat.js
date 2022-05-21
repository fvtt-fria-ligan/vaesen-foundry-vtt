
// custom combat tracker for card based init
export default class VaesenCombat extends Combat {
    

     /**
     * @override
     * Roll initiative for one or multiple Combatants within the Combat entity
     * @param ids A Combatant id or Array of ids for which to roll
     * @param formula A non-default initiative formula to roll. Otherwise the system default is used.
     * @param messageOptions  Additional options with which to customize created Chat Messages
     * @returns A promise which resolves to the updated Combat entity once updates are complete.
     */
    async rollInitiative(ids, options){
        ids = typeof ids === 'string' ? [ids] : ids;
        const combatantUpdates = [];
        const initMessages = [];
        let isRedraw = false;
        let skipMessage = false;
        const initiativeDeck = game.cards.get(game.settings.get('vaesen', 'initDeck'), {strict: true});
        if(ids.length > initiativeDeck.availableCards.length){
            Uint16Array.notifications.warn(game.i18n('UI.DECKEMPTY'))
        
        // reshuffle deck then go to draw
        return this;
        }
        // iterate over combatants and draw a card for each

        // TODO vaesen need a property for number of cards to draw 
        // TODO also need to know if it's keep best or act multiple times
        // verify that no talents give this to PC or npc just to be sure.
    }
   

    // sort combatants in the tracker from low to high
    _sortCombatants(a, b){

    }

    // draw a number of cards from the init deck
    async drawCard(count =1){

    }


    // set a card swap from one actor to another
    swapCard (ida, idb){

    }

} 