export function prepareRollDialog(sheet, testName,  attributeDefault, skillDefault, bonusDefault, damageDefault, attName = "Attribute", skName = "Skill"){
    let attributeHtml = buildHtmlDialog(attName, attributeDefault, "attribute");
    let skillHtml = buildHtmlDialog(skName, skillDefault, "skill");
    let bonusHtml = buildInputHtmlDialog("Bonus Dice", bonusDefault, "bonus");
    let damageHtml = buildInputHtmlDialog("Damage", damageDefault, "damage");
   

    let d = new Dialog({
        title: "Test : " + testName,
        content: buildDivHtmlDialog(`
            <div class="roll-fields">
            <h2 class="title"> Test: ` + testName + `
            </h2>
            <div class="flex column grow align-center heavy-border" style="width:200px;">
           `+ attributeHtml + skillHtml + ` 
        <div align-center style="flex-basis:33%;"> <strong>Base Dice Pool: </strong> `+ (attributeDefault+skillDefault) + `</div>
        
        </div><div class="flex column grow align-center light-border" style="width:200px; margin:auto; padding:5px; margin-bottom: 3px;">` + bonusHtml + damageHtml + `</div></div>`),
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
    },
    { width: "230" }
    );
    d.render(true);

}


export function roll(sheet, testName, attribute, skill, bonus, damage) {
    sheet.dices = [];
    sheet.lastTestName = testName;
    sheet.lastDamage = damage;
    let numberOfDice = attribute + skill + bonus;
    rollDice(sheet, numberOfDice);
    showDice(sheet, false);
}

export function push(sheet) {
    let numberOfDiceToPush = sheet.dices.filter(dice => dice !== 6).length;
    sheet.dices = sheet.dices.filter(dice => dice === 6);
    rollDice(sheet, numberOfDiceToPush);
    showDice(sheet, true);
}

function showDice(sheet, isPushed) {
    if (game.dice3d) {
        // DiceSoNice module is installed
        const dice = sheet.dices.map(r => {
            return {
                result: r,
                resultLabel: r,
                type: "d6",
                vectors: [],
                options: {}
            };
        });
        const data = { throws:[{ dice }] };
        // send the roll to chat once the DSN roll is finished
        game.dice3d.show(data).then(displayed => { sendRollToChat(sheet, isPushed); });
    } else {
        // DiceSoNice not installed, so just send the roll to chat
        sendRollToChat(sheet, isPushed);
    }
}

function sendRollToChat(sheet, isPushed) {
    sheet.dices.sort(function(a, b){return b - a});
    let numberOfSuccess = countSuccess(sheet);
    let resultMessage;
    let damageMessage;
    if (isPushed) {
        if (numberOfSuccess > 0) {
            resultMessage = "<b style='color:green; text-align: center;'>" + sheet.lastTestName + "</b> (PUSHED)</br>";
        } else {
            resultMessage = "<b style='color:red; text-align: center;'>" + sheet.lastTestName + "</b> (PUSHED)</br>";
        }
    } else {
        if (numberOfSuccess > 0) {
            resultMessage = "<b style='color:green; text-align: center;'>" + sheet.lastTestName + "</b></br>";
        } else {
            resultMessage = "<b style='color:red; text-align: center;'>" + sheet.lastTestName + "</b></br>";
        }
    }
    let successMessage = "<b> Success:</b> " + numberOfSuccess + "</br>";
    let diceMessage = printDices(sheet) + "</br>";
    let chatData;
    if(sheet.lastDamage > 0){
    damageMessage = "<b> Damage:</b> " + sheet.lastDamage + "</br>";
    chatData = {
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: resultMessage + successMessage + damageMessage + diceMessage
    };
    } else {
        chatData = {
            user: game.user.id,
            rollMode: game.settings.get("core", "rollMode"),
            content: resultMessage + successMessage  + diceMessage
        };
    }
    
    
   
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

function buildInputHtmlDialog(diceName, diceValue, type) {
    return `
    <div class="flex row" style="flex-basis: 35%; justify-content: space-between;">
    <p style="text-transform: capitalize; white-space:nowrap;">` + diceName + 
    `: </p>
    <input id="` + type + `" style="text-align: center" type="text" value="` + diceValue + `"/></div>`;
    
}

function buildHtmlDialog(diceName, diceValue, type) {
    return `
    <div class="flex row" style="flex-basis: 35%; justify-content: space-between;">
    <p style="text-transform: capitalize; white-space:nowrap;">` + diceName + 
    `: </p>
    <input id="` + type + `" style="text-align: center" type="text" value="` + diceValue + `" readonly/></div>`;
    
}

function buildDivHtmlDialog(divContent) {
    return "<div class='vaesen roll-dialog '>" + divContent + "</div>";
}