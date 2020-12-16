import { VaesenActor } from "./actor/vaesen.js";
import { PlayerCharacterSheet } from "./sheet/player.js";
import { NpcCharacterSheet } from "./sheet/npc.js";
import { VaesenCharacterSheet } from "./sheet/vaesen.js";
import { HeadquarterCharacterSheet } from "./sheet/headquarter.js";
import { CriticalInjuryCharacterSheet } from "./sheet/critical-injury.js";
import { WeaponCharacterSheet } from "./sheet/weapon.js";
import { ArmorCharacterSheet } from "./sheet/armor.js";
import { TalentCharacterSheet } from "./sheet/talent.js";
import { GearCharacterSheet } from "./sheet/gear.js";
import { MagicCharacterSheet } from "./sheet/magic.js";
import { ConditionCharacterSheet } from "./sheet/condition.js";
import { AttackCharacterSheet } from "./sheet/attack.js";
import { UpgradeCharacterSheet } from "./sheet/upgrade.js";
import { prepareRollDialog, push } from "./util/roll.js";

Hooks.once("init", () => {
    CONFIG.Combat.initiative = { formula: "1d10", decimals: 0 };
    CONFIG.Actor.entityClass = VaesenActor;
    CONFIG.anonymousSheet = {};
    CONFIG.roll = prepareRollDialog;
    CONFIG.push = push;
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("vaesen-rpg", PlayerCharacterSheet, { types: ["player"], makeDefault: true });
    Actors.registerSheet("vaesen-rpg", NpcCharacterSheet, { types: ["npc"], makeDefault: true });
    Actors.registerSheet("vaesen-rpg", VaesenCharacterSheet, { types: ["vaesen"], makeDefault: true });
    Actors.registerSheet("vaesen-rpg", HeadquarterCharacterSheet, { types: ["headquarter"], makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("vaesen-rpg", CriticalInjuryCharacterSheet, {types: ["criticalInjury"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", WeaponCharacterSheet, {types: ["weapon"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", ArmorCharacterSheet, {types: ["armor"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", TalentCharacterSheet, {types: ["talent"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", GearCharacterSheet, {types: ["gear"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", MagicCharacterSheet, {types: ["magic"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", ConditionCharacterSheet, {types: ["condition"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", AttackCharacterSheet, {types: ["attack"], makeDefault: true});
    Items.registerSheet("vaesen-rpg", UpgradeCharacterSheet, {types: ["upgrade"], makeDefault: true});
    preloadHandlebarsTemplates();
});

function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/vaesen-rpg/model/player.html",
        "systems/vaesen-rpg/model/tab/player-main.html",
        "systems/vaesen-rpg/model/tab/player-combat.html",
        "systems/vaesen-rpg/model/tab/player-talent.html",
        "systems/vaesen-rpg/model/tab/player-gear.html",
        "systems/vaesen-rpg/model/tab/player-note.html",
        "systems/vaesen-rpg/model/npc.html",
        "systems/vaesen-rpg/model/tab/npc-main.html",
        "systems/vaesen-rpg/model/tab/npc-combat.html",
        "systems/vaesen-rpg/model/tab/npc-talent.html",
        "systems/vaesen-rpg/model/tab/npc-gear.html",
        "systems/vaesen-rpg/model/tab/npc-note.html",
        "systems/vaesen-rpg/model/vaesen.html",
        "systems/vaesen-rpg/model/tab/vaesen-main.html",
        "systems/vaesen-rpg/model/tab/vaesen-combat.html",
        "systems/vaesen-rpg/model/tab/vaesen-gear.html",
        "systems/vaesen-rpg/model/tab/vaesen-note.html",
        "systems/vaesen-rpg/model/headquarter.html",
        "systems/vaesen-rpg/model/tab/headquarter-history.html",
        "systems/vaesen-rpg/model/tab/headquarter-facilities.html",
        "systems/vaesen-rpg/model/tab/headquarter-contact.html",
        "systems/vaesen-rpg/model/tab/headquarter-personnel.html",
        "systems/vaesen-rpg/model/critical-injury.html",
        "systems/vaesen-rpg/model/weapon.html",
        "systems/vaesen-rpg/model/armor.html",
        "systems/vaesen-rpg/model/talent.html",
        "systems/vaesen-rpg/model/gear.html",
        "systems/vaesen-rpg/model/magic.html",
        "systems/vaesen-rpg/model/condition.html",
        "systems/vaesen-rpg/model/attack.html"
    ];
    return loadTemplates(templatePaths);
}