import { YearZeroRoll } from "../lib/yzur.js";

export function prepareRollNewDialog(
  sheet,
  testName,
  baseDiceLines = [],
  damageDefault = null,
  gearBonus = null,
  talentBonus = null
) {

  let baseLines = [];
  let baseLinesDice = 0;
  let conditionsPenalties = 0;

  baseDiceLines.forEach(element => {
    
    if (element == null)
      return;

    let tooltip = element.tooltip ?? "";
    console.log(tooltip);
    baseLines.push(`
<div class="flex row" style="flex-basis: 35%; justify-content: space-between; width: 100%;">
<p style="text-transform: capitalize; white-space:nowrap;">` +
element.name +
`: </p>
<input style="text-align: center" type="text" value="` +
element.value +
`" readonly title="` + tooltip + `"/></div>`);
    
    baseLinesDice += parseInt(element.value, 10);
    if (element.type === "conditions")
      conditionsPenalties = parseInt(element.value, 10);
  });

  let bonusHtml = buildInputHtmlDialog(
    game.i18n.localize("ROLL.BONUS"),
    0,
    "bonus"
  );
  let damageHtml = damageDefault === null ? "" : buildInputHtmlDialog(
    game.i18n.localize("ROLL.DAMAGE"),
    damageDefault,
    "damage"
  );

  let gearHtml = buildGearSelectHtmlDialog(gearBonus);
  let talentHtml = buildTalentSelectHtmlDialog(talentBonus, "TALENT.NAME", "talent");

  let extraLines = [];
  extraLines.push(gearHtml);
  extraLines.push(talentHtml);
  extraLines.push(bonusHtml);
  extraLines.push(damageHtml);
  const extraLinesHtml = extraLines.join("");
  const baseLinesHtml = baseLines.join("");

  let d = new Dialog(
    {
      title: "Test : " + testName,
      content: buildDivHtmlNewDialog(testName, baseLinesHtml, baseLinesDice, extraLinesHtml),
      buttons: {
        roll: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("ROLL.ROLL"),
          callback: (html) => {
            let bonus = parseInt(html.find("#bonus")[0].value, 10);
            let gear = 0;
            var talent = 0;
            var damage = 0;
            let gearSelect = html.find("#gear")[0];
            let talentSelect = html.find("#talent")[0];
            let damageInput = html.find("#damage")[0];
            if (gearSelect)
              gear = parseInt(gearSelect.value, 10);
            if (talentSelect)
            {
              var conditionsIgnored = false;
              var options = talentSelect.selectedOptions;
              Array.from(options).map(({ value }) => {
                let selectedTalent = talentBonus.find(x=> x.name == value);
                if (selectedTalent.bonusType == "skill")
                  talent += parseInt(selectedTalent.bonus, 10);
                else if (selectedTalent.bonusType === "damage")
                  damage += parseInt(selectedTalent.bonus, 10);
                else if (selectedTalent.bonusType.startsWith("ignoreCondition") && !conditionsIgnored) {
                  talent += -conditionsPenalties;
                  conditionsIgnored = true;
                }
              });
            }
            if (damageInput)
              damage += parseInt(damageInput.value, 10);
            roll(
              sheet,
              testName,
              baseLinesDice,
              0,
              bonus + gear + talent,
              damage
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
    { width: "330" }
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
    <div class="flex row" style="flex-basis: 35%; justify-content: space-between; width: 100%;">
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

function buildGearSelectHtmlDialog(options) {
  if (options == null || options.length == 0)
    return "";

  var html = [];
  html.push(`<div class="flex row" style="flex-basis: 35%; justify-content: space-between;">`);
  html.push(`<p style="text-transform: capitalize; white-space:nowrap; margin-top: 4px;">`+ game.i18n.localize("GEAR.NAME") +`: </p></div>`);
  html.push(`<div class="flex row" style="width: 100%;">`);
  html.push(`<select id="gear" style="width: 100%;">`);
  html.push(`<option value="0">None (0)</option>`);
  options.forEach(element => {

    let bonusValue = element.bonus > 0 ? "+" + element.bonus : element.bonus;
    var descriptionWithoutTags = $("<p>").html(element.description).text();
    html.push(`<option value="`+element.bonus+`" title="`+ descriptionWithoutTags +`">`+element.name +` (`+bonusValue+`)`+`</option>`)
  });
  html.push(`</select></div>`);
  return html.join("");
}

function buildTalentSelectHtmlDialog(options, name, id) {
  if (options == null || options.length == 0)
    return "";

  let html = [];
  html.push(`<div class="flex row" style="flex-basis: 35%; justify-content: space-between;">`);
  html.push(`<p style="text-transform: capitalize; white-space:nowrap; margin-top: 4px;">${game.i18n.localize("TALENT.NAME")}: </p></div>`);
  html.push(`<div class="flex row" style="width: 100%;">`);
  html.push(`<select id="talent" style="width: 100%;" multiple>`);
  html.push(`<option value="0">None (0)</option>`);
  options.forEach(element => {
    let descriptionWithoutTags = $("<p>").html(element.description).text();
    let requiresBonus = CONFIG.vaesen.bonusTypeRequiresBonus.indexOf(element.bonusType) > -1;
    console.log(requiresBonus);
    let bonusValue = requiresBonus ? parseInt(element.bonus, 10) : null;
    if (bonusValue)
      bonusValue = `: ${bonusValue > 0 && requiresBonus ? "+" + bonusValue : bonusValue}`;
    let bonusInfo = (element.bonusType ? game.i18n.localize(CONFIG.vaesen.bonusType[element.bonusType]) : "") + (bonusValue ?? "");
    const fullDescription = `${element.name}\n${bonusInfo}\n${descriptionWithoutTags}`;
    html.push(`<option value="${element.name}" title="${fullDescription}">${element.name} (${bonusInfo})</option>`)
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

function buildDivHtmlNewDialog(testName, baseDiceHtml, baseDiceValue, extraLinesHtml) {
  let dialogHtmlContent = [];
  dialogHtmlContent.push("<div class='vaesen roll-dialog'>");
  dialogHtmlContent.push(`<div class="roll-fields">`);
  dialogHtmlContent.push(`<h2 class="title" style="width: 97%; margin: auto;"> ` + game.i18n.localize("ROLL.TEST") + `: ` +
  testName +`</h2>`);
  dialogHtmlContent.push(`<div class="flex column grow align-center heavy-border" style="width:300px;">` + baseDiceHtml + ` 
<div align-center style="flex-basis:33%;"> <strong>` + game.i18n.localize("ROLL.BASE.POOL") + `:</strong> ` + baseDiceValue + `</div></div>`);
  dialogHtmlContent.push(`<div class="flex column grow align-center light-border" style="width:300px; margin:auto; padding:5px; margin-bottom: 3px;">` +
extraLinesHtml +`</div></div>`);
  dialogHtmlContent.push("</div></div>");
  return dialogHtmlContent.join("");
}