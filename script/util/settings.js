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

}