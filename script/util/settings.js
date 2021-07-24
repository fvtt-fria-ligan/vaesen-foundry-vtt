export const registerSystemSettings = function () {
    game.settings.register("vaesen", "swag", {
        name: "SETTINGS.SWAG",
        scope: "world",
        config: true,
        restricted: true,
        default: true,
        type: Boolean 
    });



}