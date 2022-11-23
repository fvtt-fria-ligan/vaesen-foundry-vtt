import { VaesenActor } from "./actor/vaesen.js";
import { PlayerCharacterSheet } from "./sheet/player.js";
import { NpcCharacterSheet } from "./sheet/npc.js";
import { VaesenCharacterSheet } from "./sheet/vaesen.js";
import { HeadquarterCharacterSheet } from "./sheet/headquarter.js";
import { prepareRollDialog, push } from "./util/roll.js";
import { registerSystemSettings } from "./util/settings.js";
import {vaesen} from "./config.js";
import {conditions} from "./util/conditions.js";
import { YearZeroRollManager } from './lib/yzur.js';
import * as Chat from "./util/chat.js";
import { vaesenItemSheet }  from "./sheet/itemSheet.js";

Hooks.once("ready", function(){
    conditions.onReady();
});


Hooks.on("renderChatMessage", (app, html, data) => {
  Chat.hideChatActionButtons(app, html, data);
})
Hooks.on('renderChatLog', (app, html, data) => {
  
  html.on('click', '.dice-button.push', _onPush);
  
  
});

Hooks.once("init", () => {
  console.log("Vaesen | Initializing Vaesen System");
    CONFIG.vaesen = vaesen;
    CONFIG.Combat.initiative = { formula: "1d10", decimals: 0 };
    CONFIG.Actor.documentClass = VaesenActor;
    CONFIG.anonymousSheet = {};
    CONFIG.roll = prepareRollDialog;
    CONFIG.push = push;
   
    CONFIG.TextEditor.enrichers = CONFIG.TextEditor.enrichers.concat([
      {
          pattern : /@RAW\[(.+?)\]/gm,
          enricher : async (match, options) => {
              const myData = await $.ajax({
                  url: match[1],
                  type: 'GET',
              });
              const doc = document.createElement("span");
              doc.innerHTML = myData;
              return doc;
          }
      }]);

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("vaesen", PlayerCharacterSheet, { types: ["player"], makeDefault: true });
    Actors.registerSheet("vaesen", NpcCharacterSheet, { types: ["npc"], makeDefault: true });
    Actors.registerSheet("vaesen", VaesenCharacterSheet, { types: ["vaesen"], makeDefault: true });
    Actors.registerSheet("vaesen", HeadquarterCharacterSheet, { types: ["headquarter"], makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("vaesen", vaesenItemSheet, {makeDefault: true});
    preloadHandlebarsTemplates();

    Handlebars.registerHelper('enrichHtmlHelper', function (rawText) {
      return TextEditor.enrichHTML(rawText, { async: false })
  })
   

    // Register System Settings
    registerSystemSettings();
    YearZeroRollManager.register('vae', {
      'ROLL.baseTemplate': 'systems/vaesen/model/templates/dice/broll.hbs',
      'ROLL.chatTemplate': 'systems/vaesen/model/templates/dice/roll.hbs',
      'ROLL.tooltipTemplate': 'systems/vaesen/model/templates/dice/tooltip.hbs',
      'ROLL.infosTemplate': 'systems/vaesen/model/templates/dice/infos.hbs'
    });
   
});

Hooks.once('diceSoNiceReady', (dice3d) => {
  dice3d.addSystem({ id: "vaesen", name: "Vaesen" }, "true");
  dice3d.addColorset({
    name: 'vaesen',
    description: 'Vaesen Dice',
    category: 'Vaesen',
    foreground: "#2D1A00",
    background: "#e2c8b6",
    outline: '#402117',
    material: 'wood',
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
      "systems/vaesen/asset/dsn/dsn-d6-1-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-2-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-3-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-4-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-5-bump.png",
      "systems/vaesen/asset/dsn/dsn-d6-6-bump.png",
    ],
    colorset: "vaesen",
    system: "vaesen"
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
    system: "vaesen"
    }, 
    "d6",
     );
});


async function _onPush(event) {
  event.preventDefault();

  // Get the message.
  let chatCard = event.currentTarget.closest('.chat-message');
  let messageId = chatCard.dataset.messageId;
  let message = game.messages.get(messageId);

  // Copy the roll.
  let roll = message.roll.duplicate();

  // Delete the previous message.
  await message.delete();

  // Push the roll and send it.
  await roll.push({ async: true });
  await roll.toMessage();
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
        "systems/vaesen/model/items/relationship.hbs"
    ];
    return loadTemplates(templatePaths);
}


