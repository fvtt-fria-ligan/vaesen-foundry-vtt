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
    CONFIG.Actor.documentClass = VaesenActor;
    CONFIG.anonymousSheet = {};
    CONFIG.roll = prepareRollDialog;
    CONFIG.push = push;
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("vaesen", PlayerCharacterSheet, { types: ["player"], makeDefault: true });
    Actors.registerSheet("vaesen", NpcCharacterSheet, { types: ["npc"], makeDefault: true });
    Actors.registerSheet("vaesen", VaesenCharacterSheet, { types: ["vaesen"], makeDefault: true });
    Actors.registerSheet("vaesen", HeadquarterCharacterSheet, { types: ["headquarter"], makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("vaesen", CriticalInjuryCharacterSheet, {types: ["criticalInjury"], makeDefault: true});
    Items.registerSheet("vaesen", WeaponCharacterSheet, {types: ["weapon"], makeDefault: true});
    Items.registerSheet("vaesen", ArmorCharacterSheet, {types: ["armor"], makeDefault: true});
    Items.registerSheet("vaesen", TalentCharacterSheet, {types: ["talent"], makeDefault: true});
    Items.registerSheet("vaesen", GearCharacterSheet, {types: ["gear"], makeDefault: true});
    Items.registerSheet("vaesen", MagicCharacterSheet, {types: ["magic"], makeDefault: true});
    Items.registerSheet("vaesen", ConditionCharacterSheet, {types: ["condition"], makeDefault: true});
    Items.registerSheet("vaesen", AttackCharacterSheet, {types: ["attack"], makeDefault: true});
    Items.registerSheet("vaesen", UpgradeCharacterSheet, {types: ["upgrade"], makeDefault: true});
    preloadHandlebarsTemplates();
});

Hooks.once('diceSoNiceReady', (dice3d) => {
  dice3d.addSystem({ id: "vaesen", name: "Vaesen" }, "default");
  dice3d.addColorset({
    name: 'vaesen',
    description: 'Vaesen',
    category: 'Colors',
    foreground: "#2D1A00",
    background: "#F5F4F1",
    outline: 'black',
    texture: 'wood',
    default: true
  });
  dice3d.addDicePreset({
    type: "d6",
    labels: [
      "systems/vaesen/asset/dsn/dsn-d6-1.png",
      "systems/vaesen/asset/dsn/dsn-d6-2.png",
      "systems/vaesen/asset/dsn/dsn-d6-3.png",
      "systems/vaesen/asset/dsn/dsn-d6-4.png",
      "systems/vaesen/asset/dsn/dsn-d6-5.png",
      "systems/vaesen/asset/dsn/dsn-d6-6.png",
    ],
    bumpMaps: [
      "systems/vaesen/asset/dsn/dsn-d6-1.png",
      "systems/vaesen/asset/dsn/dsn-d6-2.png",
      "systems/vaesen/asset/dsn/dsn-d6-3.png",
      "systems/vaesen/asset/dsn/dsn-d6-4.png",
      "systems/vaesen/asset/dsn/dsn-d6-5.png",
      "systems/vaesen/asset/dsn/dsn-d6-6.png",
    ],
    colorset: "vaesen",
    system: "vaesen",
    default: true
  });
});

function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/vaesen/model/player.html",
        "systems/vaesen/model/tab/player-main.html",
        "systems/vaesen/model/tab/player-combat.html",
        "systems/vaesen/model/tab/player-talent.html",
        "systems/vaesen/model/tab/player-gear.html",
        "systems/vaesen/model/tab/player-note.html",
        "systems/vaesen/model/npc.html",
        "systems/vaesen/model/tab/npc-main.html",
        "systems/vaesen/model/tab/npc-combat.html",
        "systems/vaesen/model/tab/npc-talent.html",
        "systems/vaesen/model/tab/npc-gear.html",
        "systems/vaesen/model/tab/npc-note.html",
        "systems/vaesen/model/vaesen.html",
        "systems/vaesen/model/tab/vaesen-main.html",
        "systems/vaesen/model/tab/vaesen-combat.html",
        "systems/vaesen/model/tab/vaesen-gear.html",
        "systems/vaesen/model/tab/vaesen-note.html",
        "systems/vaesen/model/headquarter.html",
        "systems/vaesen/model/tab/headquarter-history.html",
        "systems/vaesen/model/tab/headquarter-facilities.html",
        "systems/vaesen/model/tab/headquarter-contact.html",
        "systems/vaesen/model/tab/headquarter-personnel.html",
        "systems/vaesen/model/critical-injury.html",
        "systems/vaesen/model/weapon.html",
        "systems/vaesen/model/armor.html",
        "systems/vaesen/model/talent.html",
        "systems/vaesen/model/gear.html",
        "systems/vaesen/model/magic.html",
        "systems/vaesen/model/condition.html",
        "systems/vaesen/model/attack.html"
    ];
    return loadTemplates(templatePaths);
}
