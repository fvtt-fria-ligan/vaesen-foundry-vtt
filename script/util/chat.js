export const hideChatActionButtons = function (message, html, data) {
    const card = html.find(".vaesen.chat-card");
    
  
    if (card.length > 0){
        let user = game.actors.get(card.attr("data-owner-id"));
        
        if ((user && !user.isOwner)){
            const buttons = card.find(".push");
            buttons.each((_i, btn) => {
                btn.style.display = "none"
            });
        }
    }
}

export const buildChatCard = function(type, data){
    let message = '';
    let chatData = {};
    let token = '';
    const actor = game.actors.get(ChatMessage.getSpeaker().actor);
    if(actor){
     token = actor.data.img;
    } else {
     token = "systems/vaesen/asset/info.png";
    }
    switch(type){
        case 'armor':
            message = 
                `<div class="card-holder" style="position: relative;">
                <img src="`+token + `" width="45" height="45" class="roll-token" />
                <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
                "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
                "<div class='chat-item-info flex column'>"+
                "<div><b>" + game.i18n.localize("ARMOR.PROTECTION") + ": </b>" + data.data.protection + "</div>" +
                "<div><b>" + game.i18n.localize("ARMOR.AGILITY") + ": </b>" + data.data.agility + "</div>" +
                "<div><b>" + game.i18n.localize("ARMOR.AVAILABILITY") + ": </b>" + data.data.availability + "</div>"
                +`</div></div>`;
            chatData = {
                token: token,
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'attack':
            message = 
            `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("ATTACK.DAMAGE") + ": </b>" + data.data.damage + "</br>" +
            "<b>" + game.i18n.localize("ATTACK.RANGE") + ": </b>" + data.data.range + "</br>" +
            "<b>" + game.i18n.localize("ATTACK.DESCRIPTION") + ": </b>" + data.data.bonus + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'condition':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("CONDITION.BONUS") + ": </b>" + data.data.bonus + "</br>" +
            "<b>" + game.i18n.localize("CONDITION.DESCRIPTION") + ": </b>" + data.data.description + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
            user: game.user.id,
            content: message
            };
        break;
        case 'criticalInjury':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("CRITICAL_INJURY.TYPE") + ": </b>" + data.data.type + "</br>" +
            "<b>" + game.i18n.localize("CRITICAL_INJURY.FATAL") + ": </b>" + data.data.fatal + "</br>" +
            "<b>" + game.i18n.localize("CRITICAL_INJURY.TIME_LIMIT") + ": </b>" + data.data.timeLimit + "</br>" +
            "<b>" + game.i18n.localize("CRITICAL_INJURY.EFFECT") + ": </b>" + data.data.effect + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'gear':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("GEAR.BONUS") + ": </b>" + data.data.bonus + "</br>" +
            "<b>" + game.i18n.localize("GEAR.AVAILABILITY") + ": </b>" + data.data.availability + "</br>" +
            "<b>" + game.i18n.localize("GEAR.EFFECT") + ": </b>" + data.data.effect + "</br>" +
            "<b>" + game.i18n.localize("GEAR.DESCRIPTION") + ": </b>" + data.data.description + "</br>" +
            "<b>" + game.i18n.localize("GEAR.RISK") + ": </b>" + data.data.risk + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'magic':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("MAGIC.CATEGORY") + ": </b>" + data.data.category + "</br>" +
            "<b>" + game.i18n.localize("MAGIC.DESCRIPTION") + ": </b>" + data.data.description + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'talent':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("TALENT.DESCRIPTION") + ": </b>" + data.data.description + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'upgrade':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("UPGRADE.COST") + ": </b>" + data.data.cost + "</br>" +
            "<b>" + game.i18n.localize("UPGRADE.PREREQUISITE") + ": </b>" + data.data.prerequisite + "</br>"+
            "<b>" + game.i18n.localize("UPGRADE.FUNCTION") + ": </b>" + data.data.function + "</br>"+
            "<b>" + game.i18n.localize("UPGRADE.ASSET") + ": </b>" + data.data.asset + "</br>"+
            "<b>" + game.i18n.localize("TALENT.DESCRIPTION") + ": </b>" + data.data.description + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'weapon':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("WEAPON.DAMAGE") + ": </b>" + data.data.damage + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.RANGE") + ": </b>" + data.data.range + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.BONUS") + ": </b>" + data.data.bonus + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.AVAILABILITY") + ": </b>" + data.data.availability + "</br>" +
            "<b>" + game.i18n.localize("WEAPON.SKILL") + ": </b>" + data.data.skill + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };
        break;
        case 'relationship':
            message = `<div class="card-holder" style="position: relative;">
            <img src="`+token + `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` + data.name.toUpperCase() + "</div>" +
            "<div class='flex row center'><img src='" + data.img + "' width=50 height=50/></div>"+
            "<div class='chat-item-info flex column'>"+
            "<b>" + game.i18n.localize("BIO.RELATIONSHIP") + ": </b>" + data.data.description + "</br>"+
            "<b>" + game.i18n.localize("NOTES") + ": </b>" + data.data.notes + "</br>"
            +`</div></div>`;
            chatData = {
                speaker: ChatMessage.getSpeaker(),
                user: game.user.id,
                content: message
            };

    }

    return chatData;
} 