export function prepareRollDialog(sheet, testName, attributeDefault, skillDefault, bonusDefault, damageDefault) {
    let attributeHtml = buildInputHtmlDialog("Attribute", attributeDefault);
    let skillHtml = buildInputHtmlDialog("Skill", skillDefault);
    let bonusHtml = buildInputHtmlDialog("Bonus", bonusDefault);
    let damageHtml = buildInputHtmlDialog("Damage", damageDefault);
    let d = new Dialog({
        title: "Test : " + testName,
        content: buildDivHtmlDialog(attributeHtml + skillHtml + bonusHtml + damageHtml),
        buttons: {
            roll: {
                icon: '<i class="fas fa-check"></i>',
                label: "Roll",
                callback: (html) => {
                    let attribute = html.find('#attribute')[0].value;
                    let skill = html.find('#skill')[0].value;
                    let bonus = html.find('#bonus')[0].value;
                    let damage = html.find('#damage')[0].value;
                    roll(
                        sheet,
                        testName,
                        parseInt(attribute, 10),
                        parseInt(skill, 10),
                        parseInt(bonus, 10),
                        parseInt(damage, 10)
                    );
                }
            },
            cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",
                callback: () => {}
            }
        },
        default: "roll",
        close: () => {}
    });
    d.render(true);
}

function roll(sheet, testName, attribute, skill, bonus, damage) {
    sheet.dices = [];
    sheet.lastTestName = testName;
    sheet.lastDamage = damage;
    let numberOfDice = attribute + skill + bonus;
    rollDice(sheet, numberOfDice);
    sendRollToChat(sheet, false);
}

export function push(sheet) {
    let numberOfDiceToPush = sheet.dices.filter(dice => dice !== 6).length;
    sheet.dices = sheet.dices.filter(dice => dice === 6);
    rollDice(sheet, numberOfDiceToPush);
    sendRollToChat(sheet, true);
}

function sendRollToChat(sheet, isPushed) {
    sheet.dices.sort(function(a, b){return b - a});
    let numberOfSuccess = countSuccess(sheet);
    let resultMessage;
    if (isPushed) {
        if (numberOfSuccess > 0) {
            resultMessage = "<b style='color:green'>" + sheet.lastTestName + "</b> (PUSHED)</br>";
        } else {
            resultMessage = "<b style='color:red'>" + sheet.lastTestName + "</b> (PUSHED)</br>";
        }
    } else {
        if (numberOfSuccess > 0) {
            resultMessage = "<b style='color:green'>" + sheet.lastTestName + "</b></br>";
        } else {
            resultMessage = "<b style='color:red'>" + sheet.lastTestName + "</b></br>";
        }
    }
    let successMessage = "<b> Success:</b> " + numberOfSuccess + "</br>";
    let damageMessage = "<b> Damage:</b> " + sheet.lastDamage + "</br>";
    let diceMessage = printDices(sheet) + "</br>";
    let chatData = {
        user: game.user._id,
        rollMode: game.settings.get("core", "rollMode"),
        content: resultMessage + successMessage + damageMessage + diceMessage
    };
    if (["gmroll", "blindroll"].includes(chatData.rollMode)) {
        chatData.whisper = ChatMessage.getWhisperRecipients("GM");
    } else if (chatData.rollMode === "selfroll") {
        chatData.whisper = [game.user];
    }
    ChatMessage.create(chatData, {});
}

function rollDice(sheet, numberOfDice) {
    if (numberOfDice <= 0) {
        numberOfDice = 1;
    }
    let die;
    if (DiceTerm !== undefined) {
        die = new Die({ faces: 6, number: numberOfDice });
        die.evaluate();
    } else {
        die = new Die(numberOfFaces);
        die.roll(numberOfDice);
    }
    die.results.forEach(r => {
        sheet.dices.push(r.result);
    });
}

function printDices(sheet) {
    let message = "";
    sheet.dices.forEach(dice => {
        message = message + "<img width='25px' height='25px' style='border:none;margin-right:2px;margin-top:2px' src='systems/vaesen/asset/dice-" + dice + ".png'/>"
    });
    return message;
}

function countSuccess(sheet) {
    return sheet.dices.filter(dice => dice === 6).length;
}

function buildInputHtmlDialog(diceName, diceValue) {
    return "<b style='flex-basis: 25%'>" + diceName + "</b><input id='" + diceName.toLowerCase() + "' style='text-align: center' type='text' value='" + diceValue + "'/>";
}

function buildDivHtmlDialog(divContent) {
    return "<div class='roll-dialog '>" + divContent + "</div>";
}