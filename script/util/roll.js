import { YearZeroRoll } from "../lib/yzur.js";

export function prepareRollDialog(
  sheet,
  testName,
  attributeDefault,
  skillDefault,
  bonusDefault,
  damageDefault,
  attName = game.i18n.localize("ATTACK.ATTRIBUTE"),
  skName = game.i18n.localize("ROLL.SKILL"),
  gearBonus = null,
  talentBonus = null
) {
  let attributeHtml = buildHtmlDialog(attName, attributeDefault, "attribute");
  let skillHtml = buildHtmlDialog(skName, skillDefault, "skill");
  let bonusHtml = buildInputHtmlDialog(
    game.i18n.localize("ROLL.BONUS"),
    bonusDefault,
    "bonus"
  );
  let damageHtml = buildInputHtmlDialog(
    game.i18n.localize("ROLL.DAMAGE"),
    damageDefault,
    "damage"
  );

  let gearHtml = buildSelectHtmlDialog(gearBonus, "GEAR.NAME", "gear");
  let talentHtml = buildSelectHtmlDialog(talentBonus, "TALENT.NAME", "talent");

  let d = new Dialog(
    {
      title: "Test : " + testName,
      content: buildDivHtmlDialog(
        `
            <div class="roll-fields">
            <h2 class="title" style="width: 97%; margin: auto;"> ` +
          game.i18n.localize("ROLL.TEST") +
          `: ` +
          testName +
          `
            </h2>
            <div class="flex column grow align-center heavy-border" style="width:200px;">
           ` +
          attributeHtml +
          skillHtml +
          ` 
        <div align-center style="flex-basis:33%;"> <strong>` +
          game.i18n.localize("ROLL.BASE.POOL") +
          `:</strong> ` +
          (attributeDefault + skillDefault) +
          `</div>
        </div><div class="flex column grow align-center light-border" style="width:200px; margin:auto; padding:5px; margin-bottom: 3px;">` +
          bonusHtml +
          damageHtml +
          gearHtml +
          talentHtml +
          `</div></div>`
      ),
      buttons: {
        roll: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("ROLL.ROLL"),
          callback: (html) => {
            let attribute = html.find("#attribute")[0].value;
            let skill = html.find("#skill")[0].value;
            let bonus = html.find("#bonus")[0].value;
            let damage = html.find("#damage")[0].value;
            let gear = 0;
            var talent = 0;
            let gearSelect = html.find("#gear")[0];
            let talentSelect = html.find("#talent")[0];
            if (gearSelect)
              gear = gearSelect.value;
            if (talentSelect)
              talent = talentSelect.value;
            roll(
              sheet,
              testName,
              parseInt(attribute, 10),
              parseInt(skill, 10),
              parseInt(bonus, 10) + parseInt(gear, 10) + parseInt(talent, 10),
              parseInt(damage, 10)
            );
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize("ROLL.CANCEL"),
          callback: () => {},
        },
      },
      default: "roll",
      close: () => {},
    },
    { width: "230" }
  );
  d.render(true);
}

export function roll(sheet, testName, attribute, skill, bonus, damage) {
  sheet.dices = new YearZeroRoll();
  sheet.lastTestName = testName;
  sheet.lastDamage = damage;
  let numberOfDice = attribute + skill + bonus;

  rollDice(sheet, numberOfDice);
  //sendRollToChat(sheet, false);
}

export async function push(sheet) {
  console.log("push", sheet);
  await sheet.dices.push({ async: true });
  await sheet.dices.toMessage();
  // sendRollToChat(sheet, true);
}

async function rollDice(sheet, numberOfDice) {
  let actor = game.actors.get(sheet.object._id);
  let token = actor.prototypeToken.texture.src;
  console.log("actor", actor);
  console.log("token", token);
  console.log("sheet", sheet);

  if (numberOfDice <= 0) {
    numberOfDice = 1;
  }

  let dice = {
    term: 's',
    number: numberOfDice,
  };

  let options = {
    name: sheet.lastTestName,
    token: token,
    damage: sheet.lastDamage,
  };

  let r = YearZeroRoll.forge(dice, {owner: actor.id, token: token, name:sheet.lastTestName, damage: sheet.lastDamage}, options);
  console.log(r);
  // let r = YearZeroRoll.createFromDiceQuantities(dice, {
  //   title: sheet.lastTestName,
  //   damage: sheet.lastDamage,
  //   owner: actor.id,
  // });

  //async toMessage(messageData = {}, { rollMode = null, create = true } = {})

  // r.evaluate();
  await r.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor, token: actor.img }),
  });
  //await r.render({speaker: ChatMessage.getSpeaker({actor: actor, token: actor.img}),  type: CONST.CHAT_MESSAGE_TYPES.ROLL, owner: actor.id}); // define the messageData to give the info we need to pass for our sheet etc
  console.log(r.getTerms("skill"));
  sheet.dices = r.duplicate();
}

function printDices(sheet) {
  let message = "";
  sheet.dices.forEach((dice) => {
    message =
      message +
      "<img width='25px' height='25px' style='border:none;margin-right:2px;margin-top:2px' src='systems/vaesen/asset/dice-" +
      dice +
      ".png'/>";
  });
  return message;
}

function buildInputHtmlDialog(diceName, diceValue, type) {
  return (
    `
    <div class="flex row" style="flex-basis: 35%; justify-content: space-between;">
    <p style="text-transform: capitalize; white-space:nowrap;">` +
    diceName +
    `: </p>
    <input id="` +
    type +
    `" style="text-align: center" type="text" value="` +
    diceValue +
    `"/></div>`
  );
}

function buildSelectHtmlDialog(options, name, id) {
  if (options == null || options.length == 0)
    return "";

  var html = [];
  html.push(`<div class="flex row" style="flex-basis: 35%; justify-content: space-between;">`);
  html.push(`<p style="text-transform: capitalize; white-space:nowrap; margin-top: 4px;">`+ game.i18n.localize(name) +`: </p></div>`);
  html.push(`<div class="flex row" style="width: 100%;">`);
  html.push(`<select id="`+id+`" style="width: 100%;">`);
  html.push(`<option value="0">None (0)</option>`);
  options.forEach(element => {
    html.push(`<option value="`+element.bonus+`">`+element.name +` (`+element.bonus+`)`+`</option>`)
  });
  html.push(`</select></div>`);
  return html.join("");
}

function buildHtmlDialog(diceName, diceValue, type) {
  if (diceName === "")
    return ``;

  return (
    `
    <div class="flex row" style="flex-basis: 35%; justify-content: space-between;">
    <p style="text-transform: capitalize; white-space:nowrap;">` +
    diceName +
    `: </p>
    <input id="` +
    type +
    `" style="text-align: center" type="text" value="` +
    diceValue +
    `" readonly/></div>`
  );
}

function buildDivHtmlDialog(divContent) {
  return "<div class='vaesen roll-dialog '>" + divContent + "</div>";
}
