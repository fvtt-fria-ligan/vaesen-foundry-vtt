import { YearZeroRoll } from "../lib/yzur.js";

export function prepareRollNewDialog(
  sheet,
  testName,
  baseDiceLines = [],
  damageDefault = null,
  gearBonus = null,
  talentBonus = null,
  recoveryBonus = null
) {
  let baseLines = [];
  let baseLinesDice = 0;
  let conditionsPenalties = 0;
  let breakdown = [];

  baseDiceLines.forEach((element) => {
    if (element == null) return;

    let tooltip = element.tooltip ?? "";
    baseLines.push(
      `
<div class="flex row" style="flex-basis: 35%; justify-content: space-between; width: 100%;">
<p style="text-transform: capitalize; white-space:nowrap;">` +
        element.name +
        `: </p>
<input style="text-align: center" type="text" value="` +
        element.value +
        `" readonly data-tooltip="` +
        tooltip +
        `" data-tooltip-direction="RIGHT" data-tooltip-class="vaesen-tooltip"/></div>`
    );

    baseLinesDice += parseInt(element.value, 10);
    var moreInfo = tooltip
      ? `<ul><li>${tooltip.replaceAll("<br>", "</li><li>")}</li></ul>`
      : "";
    breakdown.push(
      `${element.name}: ${adjustBonusText(element.value)}${moreInfo}`
    );
    if (element.type === "conditions")
      conditionsPenalties = parseInt(element.value, 10);
  });

  let bonusHtml = buildInputHtmlDialog(
    game.i18n.localize("ROLL.BONUS"),
    0,
    "bonus"
  );
  let damageHtml =
    damageDefault === null
      ? ""
      : buildInputHtmlDialog(
          game.i18n.localize("ROLL.DAMAGE"),
          damageDefault,
          "damage"
        );

  let gearHtml = buildGearSelectHtmlDialog(gearBonus);
  let talentHtml = buildSelectMultipleHtmlDialog(
    talentBonus,
    "TALENT.NAME",
    "talent"
  );
  let upgradeHtml = buildSelectMultipleHtmlDialog(
    recoveryBonus,
    "UPGRADE.NAME",
    "upgrade"
  );

  let extraLines = [];
  extraLines.push(gearHtml);
  extraLines.push(talentHtml);
  extraLines.push(upgradeHtml);
  extraLines.push(bonusHtml);
  extraLines.push(damageHtml);
  const extraLinesHtml = extraLines.join("");
  const baseLinesHtml = baseLines.join("");

  let d = new Dialog(
    {
      title: "Test : " + testName,
      content: buildDivHtmlNewDialog(
        testName,
        baseLinesHtml,
        baseLinesDice,
        extraLinesHtml
      ),
      buttons: {
        roll: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("ROLL.ROLL"),
          callback: (html) => {
            let bonus = parseInt(html.find("#bonus")[0].value, 10);
            let gear = 0;
            var talent = 0;
            var upgrades = 0;
            var damage = 0;
            let gearSelect = html.find("#gear")[0];
            let talentSelect = html.find("#talent")[0];
            let upgradeSelect = html.find("#upgrade")[0];
            let damageInput = html.find("#damage")[0];
            if (gearSelect) {
              if (gearSelect.value != 0) {
                breakdown.push(gearSelect.selectedOptions[0].text);
                gear = parseInt(gearSelect.value, 10);
              }
            }
            if (talentSelect) {
              let conditionsIgnored = false;
              let options = talentSelect.selectedOptions;
              Array.from(options).map(({ text, value }) => {
                let selectedTalent = talentBonus.find((x) => x.name == value);
                breakdown.push(text);
                if (
                  selectedTalent.bonusType == "skill" ||
                  selectedTalent.bonusType == "fear"
                )
                  talent += parseInt(selectedTalent.bonus, 10);
                else if (selectedTalent.bonusType === "damage")
                  damage += parseInt(selectedTalent.bonus, 10);
                else if (
                  selectedTalent.bonusType.startsWith("ignoreCondition") &&
                  !conditionsIgnored
                ) {
                  talent += -conditionsPenalties;
                  conditionsIgnored = true;
                }
              });
            }
            if (upgradeSelect) {
              let options = upgradeSelect.selectedOptions;
              Array.from(options).map(({ text, value }) => {
                let selectedUpgrade = recoveryBonus.find((x) => x.name == value);
                if (!selectedUpgrade)
                  return;
                breakdown.push(text);
                upgrades += parseInt(selectedUpgrade.bonus, 10);
              });
            }
            if (damageInput) damage += parseInt(damageInput.value, 10);
            if (bonus > 0)
              breakdown.push(
                `${game.i18n.localize("ROLL.BONUS")}: ${adjustBonusText(bonus)}`
              );
            roll(
              sheet,
              testName,
              baseLinesDice,
              0,
              bonus + gear + talent + upgrades,
              damage,
              breakdown
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

export function roll(
  sheet,
  testName,
  attribute,
  skill,
  bonus,
  damage,
  breakdown
) {
  sheet.dices = new YearZeroRoll();
  sheet.lastTestName = testName;
  sheet.lastDamage = damage;
  let numberOfDice = attribute + skill + bonus;

  rollDice(sheet, numberOfDice, breakdown);
  //sendRollToChat(sheet, false);
}

export async function push(sheet) {
  console.log("push", sheet);
  await sheet.dices.push({ async: true });
  await sheet.dices.toMessage();
  // sendRollToChat(sheet, true);
}

async function rollDice(sheet, numberOfDice, breakdown) {
  let actor = game.actors.get(sheet.object._id);
  let token = actor.prototypeToken.texture.src;
  console.log("actor", actor);
  console.log("token", token);
  console.log("sheet", sheet);

  if (numberOfDice <= 0) {
    numberOfDice = 1;
  }

  let dice = {
    term: "s",
    number: numberOfDice,
  };

  let options = {
    name: sheet.lastTestName,
    token: token,
    damage: sheet.lastDamage,
    breakdown: breakdown,
  };

  let r = YearZeroRoll.forge(
    dice,
    {
      owner: actor.id,
      token: token,
      name: sheet.lastTestName,
      damage: sheet.lastDamage,
    },
    options
  );
  console.log("roll dice roll:", r);

// Execute the roll
await r.evaluate();



  await r.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor, token: token }),
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
  if (options == null || options.length == 0) return "";

  var html = [];
  html.push(
    `<div class="flex row" style="flex-basis: 35%; justify-content: space-between;">`
  );
  html.push(
    `<p style="text-transform: capitalize; white-space:nowrap; margin-top: 4px;">` +
      game.i18n.localize("GEAR.NAME") +
      `: </p></div>`
  );
  html.push(`<div class="flex row" style="width: 100%;">`);
  html.push(`<select id="gear" style="width: 100%;" data-tooltip-direction="RIGHT" data-tooltip-class="vaesen-tooltip">`);
  html.push(`<option value="0">None (0)</option>`);
  options.forEach((element) => {
    let bonusValue = adjustBonusText(element.bonus);
    var descriptionWithoutTags = $("<p>").html(element.description).text();
    html.push(
      `<option value="` +
        element.bonus +
        `" data-tooltip="` +
        descriptionWithoutTags +
        `">` +
        element.name +
        ` (` +
        bonusValue +
        `)` +
        `</option>`
    );
  });
  html.push(`</select></div>`);
  return html.join("");
}

function buildSelectMultipleHtmlDialog(options, name, id) {

  if (options == null || options.length == 0) return "";

  let html = [];
  html.push(
    `<div class="flex row" style="flex-basis: 35%; justify-content: space-between;">`
  );
  html.push(
    `<p style="text-transform: capitalize; white-space:nowrap; margin-top: 4px;">${game.i18n.localize(name)}: </p></div>`
  );
  html.push(`<div class="flex row" style="width: 100%;">`);
  html.push(`<select id="${id}" style="width: 100%;" multiple data-tooltip-direction="RIGHT" data-tooltip-class="vaesen-tooltip">`);
  options.forEach((element) => {
    let descriptionWithoutTags = $("<p>").html(element.description).text();
    let requiresBonus =
      CONFIG.vaesen.bonusTypeRequiresBonus.indexOf(element.bonusType) > -1;
    let bonusValue = requiresBonus ? parseInt(element.bonus, 10) : null;
    if (bonusValue) bonusValue = `: ${adjustBonusText(bonusValue)}`;
    let bonusInfo =
      (element.bonusType
        ? game.i18n.localize(CONFIG.vaesen.bonusType[element.bonusType])
        : "") + (bonusValue ?? "");
    const fullDescription = `${element.name}<br>${bonusInfo}<br>${element.description}`;
    html.push(
      `<option value="${element.name}" data-tooltip="${fullDescription}">${element.name} (${bonusInfo})</option>`
    );
  });
  html.push(`</select></div>`);
  return html.join("");
}

function buildHtmlDialog(diceName, diceValue, type) {
  if (diceName === "") return ``;

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

function buildDivHtmlNewDialog(
  testName,
  baseDiceHtml,
  baseDiceValue,
  extraLinesHtml
) {
  let dialogHtmlContent = [];
  dialogHtmlContent.push("<div class='vaesen roll-dialog'>");
  dialogHtmlContent.push(`<div class="roll-fields">`);
  dialogHtmlContent.push(
    `<h2 class="title" style="width: 97%; margin: auto;"> ` +
      game.i18n.localize("ROLL.TEST") +
      `: ` +
      testName +
      `</h2>`
  );
  dialogHtmlContent.push(
    `<div class="flex column grow align-center heavy-border" style="width:300px;">` +
      baseDiceHtml +
      ` 
<div align-center style="flex-basis:33%;"> <strong>` +
      game.i18n.localize("ROLL.BASE.POOL") +
      `:</strong> ` +
      baseDiceValue +
      `</div></div>`
  );
  dialogHtmlContent.push(
    `<div class="flex column grow align-center light-border" style="width:300px; margin:auto; padding:5px; margin-bottom: 3px;">` +
      extraLinesHtml +
      `</div></div>`
  );
  dialogHtmlContent.push("</div></div>");
  return dialogHtmlContent.join("");
}

export function adjustBonusText(bonus) {
  bonus = parseInt(bonus, 10);
  return bonus > 0 ? "+" + bonus : bonus;
}

export function totalRoll(messageText, chatData) {
  const pattern = /^\/r ((\d*)d(\d+).*$)/g;
  const matches = [...messageText.toLowerCase().matchAll(pattern)];
  const customRolls = {
    "66" : "1d6*10+1d6", 
    "666": "1d6*100+1d6*10+1d6",
    "6666": "1d6*1000+1d6*100+1d6*10+1d6"
  };
  if (matches.length == 0)
    return true;
    
  let actor = undefined;
  if (chatData.speaker.actor)
    actor = game.actors.get(chatData.speaker.actor);

  const diceSide = matches[0][3];
  const formula = matches[0][1];
  const numberDice = parseInt(matches[0][2] ? matches[0][2] : "1");

  if (Object.keys(customRolls).indexOf(diceSide) == -1)
  {
    createCustomRoll(actor, formula, formula);
    return false;
  }

  for (let index = 0; index < numberDice; index++) {
    createCustomRoll(actor, customRolls[diceSide], `D${diceSide}`);
  }
  return false;
}

async function createCustomRoll(actor, formula, name) {
  let options = { 
    token: actor?.img
  };
  
  let templateData = { 
    flavor: `${name} ${game.i18n.localize("ROLL.ROLL")}`,
    type: "total"
  };
  
  const roll = Roll.create(formula, options);
  
  let messageData = {
    content: await roll.render(templateData),
  };
  let rollMode = game.settings.get("core", "rollMode");
  
  await roll.toMessage(messageData, { rollMode });
}

export function registerGearSelectTooltip() {
  $("body").on("change", "#gear", function(e) {
    var optionSelected = $("option:selected", this);
    var tooltip = optionSelected.attr("data-tooltip") ?? "";
    $(this).attr("data-tooltip", tooltip);
  });
}