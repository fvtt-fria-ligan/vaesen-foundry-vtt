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
    CONFIG.vaesen = vaesen;
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
    Items.registerSheet("vaesen", vaesenItemSheet, {makeDefault: true});
    preloadHandlebarsTemplates();
    // Register System Settings
    registerSystemSettings();
    YearZeroRollManager.register('vae', {
      'ROLL.baseTemplate': 'systems/vaesen/model/templates/dice/broll.hbs',
      'ROLL.chatTemplate': 'systems/vaesen/model/templates/dice/roll.hbs',
      'ROLL.tooltipTemplate': 'systems/vaesen/model/templates/dice/tooltip.hbs',
      'ROLL.infosTemplate': 'systems/vaesen/model/templates/dice/infos.hbs'
    });
    // render cutstom effect icons
    if(game.data.version == '0.8.9' || game.data.version == '0.8.8' || game.data.version == '0.8.7' || game.data.version == '0.8.6'){
        Token.prototype._drawEffect = async function(src, i, bg, w, tint) {
          const multiplier = 3;
          const divisor = 3 * this.data.height;
          w = (w / 2) * multiplier;
          let tex = await loadTexture(src);
          
          let icon = this.effects.addChild(new PIXI.Sprite(tex));
          icon.width = icon.height = w;
          icon.y = Math.floor(i / divisor) * w;
          icon.x = (i % divisor) * w;
          if ( tint ) icon.tint = tint;
          this.effects.addChild(icon);
        };
    } else {
      Token.prototype._drawEffect = async function(src, i, bg, w, tint) {
        const multiplier = 3;
        const divisor = 3 * this.data.height;
        w = (w / 2) * multiplier;
        let tex = await loadTexture(src);
        
        let icon = this.hud.effects.addChild(new PIXI.Sprite(tex));
        icon.width = icon.height = w;
        icon.y = Math.floor(i / divisor) * w;
        icon.x = (i % divisor) * w;
        if ( tint ) icon.tint = tint;
        this.hud.effects.addChild(icon);
         
      };
    }
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
        "systems/vaesen/model/player.html",
        "systems/vaesen/model/tab/player-main.html",
        "systems/vaesen/model/tab/player-combat.html",
        "systems/vaesen/model/tab/player-favorites.html",
        "systems/vaesen/model/tab/player-talent.html",
        "systems/vaesen/model/tab/player-gear.html",
        "systems/vaesen/model/tab/player-note.html",
        "systems/vaesen/model/npc.html",
        "systems/vaesen/model/tab/npc-main.html",
        "systems/vaesen/model/tab/npc-note.html",
        "systems/vaesen/model/vaesen.html",
        "systems/vaesen/model/tab/vaesen-main.html",
        "systems/vaesen/model/tab/vaesen-note.html",
        "systems/vaesen/model/headquarter.html",
        "systems/vaesen/model/tab/headquarter-history.html",
        "systems/vaesen/model/tab/headquarter-upgrades.html",
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


