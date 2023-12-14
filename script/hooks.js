import { VaesenActor } from "./actor/vaesen.js";
import { PlayerCharacterSheet } from "./sheet/player.js";
import { NpcCharacterSheet } from "./sheet/npc.js";
import { VaesenCharacterSheet } from "./sheet/vaesen.js";
import { HeadquarterCharacterSheet } from "./sheet/headquarter.js";
import { prepareRollNewDialog, push } from "./util/roll.js";
import { registerSystemSettings } from "./util/settings.js";
import { vaesen } from "./config.js";
import { conditions } from "./util/conditions.js";
import { YearZeroRollManager } from "./lib/yzur.js";
import * as Chat from "./util/chat.js";
import { vaesenItemSheet } from "./sheet/itemSheet.js";
import { migrate } from "./util/migrator.js";
import { VaesenTokenHUD } from "./util/token.js";

Hooks.on("renderChatMessage", (app, html, data) => {
  Chat.hideChatActionButtons(app, html, data);
});
Hooks.on("renderChatLog", (app, html, data) => {
  html.on("click", ".dice-button.push", _onPush);
});

Hooks.once("init", () => {
  console.log("Vaesen | Initializing Vaesen System");
  CONFIG.vaesen = vaesen;
  CONFIG.Combat.initiative = { formula: "1d10", decimals: 0 };
  CONFIG.Actor.documentClass = VaesenActor;
  CONFIG.anonymousSheet = {};
  CONFIG.roll = prepareRollNewDialog;
  CONFIG.push = push;
  CONFIG.Cards.presets = {
    initiative: {
      label: 'Initiative Deck',
      src: 'systems/vaesen/asset/cards/initiative-deck.json',
      type: 'deck',
    },
  };

  console.log("Vaesen | CONFIG.vaesen: ", CONFIG.vaesen);

  CONFIG.TextEditor.enrichers = CONFIG.TextEditor.enrichers.concat([
    {
      pattern: /@RAW\[(.+?)\]/gm,
      enricher: async (match, options) => {
        const myData = await $.ajax({
          url: match[1],
          type: "GET",
        });
        const doc = document.createElement("span");
        doc.innerHTML = myData;
        return doc;
      },
    },
  ]);

  Actors.unregisterSheet("core", ActorSheet);

  Actors.registerSheet("vaesen", PlayerCharacterSheet, {
    types: ["player"],
    makeDefault: true,
  });
  Actors.registerSheet("vaesen", NpcCharacterSheet, {
    types: ["npc"],
    makeDefault: true,
  });
  Actors.registerSheet("vaesen", VaesenCharacterSheet, {
    types: ["vaesen"],
    makeDefault: true,
  });
  Actors.registerSheet("vaesen", HeadquarterCharacterSheet, {
    types: ["headquarter"],
    makeDefault: true,
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("vaesen", vaesenItemSheet, { makeDefault: true });
  registerSystemSettings();
  preloadHandlebarsTemplates();

  

  Handlebars.registerHelper("enrichHtmlHelper", function (rawText) {
    return TextEditor.enrichHTML(rawText, { async: false });
  });

  Handlebars.registerHelper('ifIn', function(elem, list, options) {
    if(list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // Register System Settings

  YearZeroRollManager.register("vae", {
    "ROLL.baseTemplate": "systems/vaesen/model/templates/dice/broll.hbs",
    "ROLL.chatTemplate": "systems/vaesen/model/templates/dice/roll.hbs",
    "ROLL.tooltipTemplate": "systems/vaesen/model/templates/dice/tooltip.hbs",
    "ROLL.infosTemplate": "systems/vaesen/model/templates/dice/infos.hbs",
  });
});

Hooks.once("ready", async function () {
 
  setupCards();
  conditions.onReady();
  Hooks.on("hotbarDrop", (bar, data, slot) => createRollMacro(data, slot));
  migrate();
  
});

Hooks.on('canvasReady', () => {
  canvas.hud.token = new VaesenTokenHUD();
});

Hooks.on("updateActor", (actor,changes,diff,userId) => {
  game.scenes.current.tokens.forEach(x => {
    if (x.actorId !== actor._id)
      return;
    if (changes.name !== undefined) {
      actor.update({"token.name": actor.name});
      x.update({"name": actor.name});
    }
  });
});

Hooks.on('dropActorSheetData', async (actor, sheet, data) => {
  if (actor.type !== 'player' || data.type !== "Actor")
    return;

  let headquarter = await fromUuid(data.uuid);
  if (headquarter.type === "headquarter")
    sheet._dropHeadquarter(headquarter);
});

Hooks.on("yze-combat.fast-action-button-clicked", async function(data) {
  await conditions.onActionCondition(data);
});

Hooks.on("yze-combat.slow-action-button-clicked", async function(data) {
  await conditions.onActionCondition(data);
});

Hooks.on('updateCombat', async function (e) {
  if (!game.user.isGM) return;
  await conditions.onActionUpdate(e.current.tokenId, e.combatant, e.turn);
});

Hooks.on('deleteCombat', async function (e) {
  if (!game.user.isGM) return;
  await conditions.onCombatStartEnd(e);
});

Hooks.on('combatStart', async function (e) {
  if (!game.user.isGM) return;
  await conditions.onCombatStartEnd(e);
});

Hooks.on('combatRound', async function (e) {
  if (!game.user.isGM) return;
  await conditions.onCombatStartEnd(e);
});

Hooks.once("diceSoNiceReady", (dice3d) => {
  dice3d.addSystem({ id: "vaesen", name: "Vaesen" }, "true");
  dice3d.addColorset({
    name: "vaesen",
    description: "Vaesen Dice",
    category: "Vaesen",
    foreground: "#2D1A00",
    background: "#e2c8b6",
    outline: "#402117",
    material: "wood",
    default: true,
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
      "systems/vaesen/asset/dsn/dsn-d6-1-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-2-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-3-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-4-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-5-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-6-bump.png",
    ],
    colorset: "vaesen",
    system: "vaesen",
  });
  dice3d.addDicePreset(
    {
      type: "ds",
      labels: [
        "systems/vaesen/asset/dsn/dsn-d6-1.png",
        "systems/vaesen/asset/dsn/dsn-d6-2.png",
        "systems/vaesen/asset/dsn/dsn-d6-3.png",
        "systems/vaesen/asset/dsn/dsn-d6-4.png",
        "systems/vaesen/asset/dsn/dsn-d6-5.png",
        "systems/vaesen/asset/dsn/dsn-d6-6.png",
      ],
      bumpMaps: [
        "systems/vaesen/asset/dsn/dsn-d6-1-bump.png",
        "systems/vaesen/asset/dsn/dsn-d6-2-bump.png",
        "systems/vaesen/asset/dsn/dsn-d6-3-bump.png",
        "systems/vaesen/asset/dsn/dsn-d6-4-bump.png",
        "systems/vaesen/asset/dsn/dsn-d6-5-bump.png",
        "systems/vaesen/asset/dsn/dsn-d6-6-bump.png",
      ],
      colorset: "vaesen",
      system: "vaesen",
    },
    "d6"
  );
});

async function _onPush(event) {
  event.preventDefault();

  // Get the message.
  let chatCard = event.currentTarget.closest('.chat-message');
  let messageId = chatCard.dataset.messageId;
  let message = game.messages.get(messageId);

  // Copy the roll.
  let roll = message.rolls[0].duplicate();

  // Delete the previous message.
  await message.delete();

  // Push the roll and send it.
  await roll.push({ async: true });
  await roll.toMessage();
}

async function setupCards() {
  const initiativeDeckId = game.settings.get('vaesen', 'initiativeDeck');
  const initiativeDeck = game.cards?.get(initiativeDeckId);
  //return early if both the deck and the ID exist in the world
  if (initiativeDeckId && initiativeDeck)
      return;
  ui.notifications.info('UI.NoInitiativeDeckFound', { localize: true });
  const preset = CONFIG.Cards.presets.initiative;
  const data = await foundry.utils.fetchJsonWithTimeout(preset.src);
  const cardsCls = getDocumentClass('Cards');
  const newDeck = await cardsCls.create(data);
  await game.settings.set('vaesen', 'initiativeDeck', newDeck?.id);
  await newDeck?.shuffle({ chatNotification: false });
}

function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/vaesen/model/player.hbs",
    "systems/vaesen/model/tab/player-main.hbs",
    "systems/vaesen/model/tab/player-combat.hbs",
    "systems/vaesen/model/tab/player-favorites.hbs",
    "systems/vaesen/model/tab/player-talent.hbs",
    "systems/vaesen/model/tab/player-gear.hbs",
    "systems/vaesen/model/tab/player-note.hbs",
    "systems/vaesen/model/npc.hbs",
    "systems/vaesen/model/tab/npc-main.hbs",
    "systems/vaesen/model/tab/npc-note.hbs",
    "systems/vaesen/model/vaesen.hbs",
    "systems/vaesen/model/tab/vaesen-main.hbs",
    "systems/vaesen/model/tab/vaesen-note.hbs",
    "systems/vaesen/model/headquarter.hbs",
    "systems/vaesen/model/tab/headquarter-history.hbs",
    "systems/vaesen/model/tab/headquarter-upgrades.hbs",
    "systems/vaesen/model/items/criticalInjury.hbs",
    "systems/vaesen/model/items/weapon.hbs",
    "systems/vaesen/model/items/armor.hbs",
    "systems/vaesen/model/items/talent.hbs",
    "systems/vaesen/model/items/gear.hbs",
    "systems/vaesen/model/items/magic.hbs",
    "systems/vaesen/model/items/condition.hbs",
    "systems/vaesen/model/items/attack.hbs",
    "systems/vaesen/model/items/relationship.hbs",
  ];
  return loadTemplates(templatePaths);
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createRollMacro(data, slot) {

  let command = "";
  if (data.type === "skill") {
    command = `
if (actor == null || actor.type !== "player")
  return;
   
actor.sheet.rollSkill("${data.skillKey}");`;
  }
  else if (data.type === "attribute") {
    command = `
if (actor == null || actor.type !== "player")
  return;
   
actor.sheet.rollAttribute("${data.attributeKey}");`;
  }
  else if (data.type === "fear") {
    command = `
if (actor == null || actor.type !== "player")
  return;
   
actor.sheet.rollFear("${data.attributeKey}");`;
  }
  else if (data.type === "weapon") {
    command = `
if (actor == null || actor.id != "${data.actorId}")
  return;
   
actor.sheet.rollWeapon("${data.itemId}");`;
  }

  if (command === "")
    return;

  let macro = game.macros.find(m => (m.name === data.text));
  console.log(macro);
  if (!macro) {
    macro = await Macro.create({
      name: data.text,
      type: "script",
      img: data.img,
      command: command,
      flags: { "vaesen.skillRoll": true }
    });
  }
  
  game.user.assignHotbarMacro(macro, slot);
  return false;
}