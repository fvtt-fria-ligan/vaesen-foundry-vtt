import { linkUnlinkActorData } from "./migrator.js";

export const registerSystemSettings = function () {
    game.settings.register("vaesen", "swag", {
        name: "SETTINGS.SWAG_NAME",
        hint: "SETTINGS.SWAG",
        scope: "world",
        config: true,
        restricted: true,
        default: true,
        type: Boolean 
    });

    game.settings.register("vaesen", "initiativeDeck", {
        
        name: "SETTINGS.INITIATIVE_DECK",
        hint: "SETTINGS.INITIATIVE_DECK_HINT",
        scope: "world",
        config: false,
        type: String,
        default: ""
        });

    game.settings.register("vaesen", "portrait", {
        name: "SETTINGS.PORTRAIT",
        hint: "SETTINGS.PORTRAIT_HINT",
        scope: "client",
        config: true,
        restricted: false,
        type: String,
        choices: {
            "round": "SETTINGS.PORTRAIT_ROUND",
            "portrait": "SETTINGS.PORTRAIT_PORTRAIT",
            "landscape": "SETTINGS.PORTRAIT_LANDSCAPE"
        },
        default: "round"
    });

    game.settings.register("vaesen", "systemMigrationVersion", {
        config: false,
        scope: "world",
        type: String,
        default: ""
    });
    
    game.settings.register("vaesen", "npcLink", {
        name: "SETTINGS.NPC_LINK_NAME",
        hint: "SETTINGS.NPC_LINK",
        scope: "world",
        config: true,
        restricted: true,
        default: false,
        type: Boolean,
        onChange: value => linkUnlinkActorData(value, "NPC")
    });
    
    game.settings.register("vaesen", "vaesenLink", {
        name: "SETTINGS.VAESEN_LINK_NAME",
        hint: "SETTINGS.VAESEN_LINK",
        scope: "world",
        config: true,
        restricted: true,
        default: false,
        type: Boolean,
        onChange: value => linkUnlinkActorData(value, "Vaesen")
    });

    game.settings.register("vaesen", "conditionAlternativeRule", {
        name: "SETTINGS.CONDITION_ALTERNATIVE_RULE_NAME",
        hint: "SETTINGS.CONDITION_ALTERNATIVE_RULE",
        scope: "world",
        config: true,
        restricted: true,
        default: false,
        type: Boolean,
    });
}