export const hideChatActionButtons = function (message, html, data) {
  console.log("Hiding chat action buttons", message, html, data);
  // get the div in the html that has the class vaesen.chat-card the html is a raw html string that is passed to the chat
  for (let i = 0; i < html.length; i++) {
   
    if (html[i].classList.contains("vaesen.chat-card")) {
      let card = html[i];
      let user = game.actors.get(card.getAttribute("data-owner-id"));
      // hide the buttons in the chat card unless the user is the owner of the actor
      const buttons = html[i].querySelectorAll(".push");
      if (user && !user.isOwner) {
        buttons.forEach((btn) => {
          btn.style.display = "none";
        });
      }
      
    }
  }

  // if (card.length > 0) {
  //   let user = game.actors.get(card.attr("data-owner-id"));

  //   if (user && !user.isOwner) {
  //     const buttons = card.find(".push");
  //     buttons.each((_i, btn) => {
  //       btn.style.display = "none";
  //     });
  //   }
  // }
};

export const buildChatCard = function (type, data) {
  console.log("Building chat card", type, data);
  let message = "";
  let chatData = {};
  let token = "";
  const actor = game.actors.get(ChatMessage.getSpeaker().actor);
  if (actor) {
    token = actor.img;
  } else {
    token = "systems/vaesen/asset/info.png";
  }
  switch (type) {
    case "armor":
      message =
        `<div class="card-holder" style="position: relative;">
                <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
                <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<div><b>" +
        game.i18n.localize("ARMOR.PROTECTION") +
        ": </b>" +
        data.system.protection +
        "</div>" +
        "<div><b>" +
        game.i18n.localize("ARMOR.AGILITY") +
        ": </b>" +
        data.system.agility +
        "</div>" +
        "<div><b>" +
        game.i18n.localize("ARMOR.AVAILABILITY") +
        ": </b>" +
        data.system.availability +
        "</div>" +
        `</div></div>`;
      chatData = {
        token: token,
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      break;
    case "attack":
      let desc = "";
      let attr = data.system.attribute;
      let label = "";
      if (attr == "bodyControl") {
        label = "ATTRIBUTE.BODY_CONTROL_ROLL";
      } else {
        label = "ATTRIBUTE." + attr.toUpperCase() + "_ROLL";
      }
      let testName = game.i18n.localize(label);
      if (data.system.description != "") {
        desc =
          "<b>" +
          game.i18n.localize("ATTACK.DESCRIPTION") +
          ": </b>" +
          data.system.description +
          "</br>";
      }
      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("ATTACK.ATTRIBUTE") +
        ": </b>" +
        testName +
        "</br>" +
        "<b>" +
        game.i18n.localize("ATTACK.DAMAGE") +
        ": </b>" +
        data.system.damage +
        "</br>" +
        "<b>" +
        game.i18n.localize("ATTACK.RANGE") +
        ": </b>" +
        data.system.range +
        "</br>" +
        desc +
        `</div></div>`;
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      break;
    case "condition":
      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("CONDITION.BONUS") +
        ": </b>" +
        data.system.bonus +
        "</br>" +
        "<b>" +
        game.i18n.localize("CONDITION.DESCRIPTION") +
        ": </b>" +
        data.system.description +
        "</br>" +
        `</div></div>`;
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      break;
    case "criticalInjury":
      let timeLimit = "";
      if (data.system.timeLimit != "") {
        timeLimit =
          "<b>" +
          game.i18n.localize("CRITICAL_INJURY.TIME_LIMIT") +
          ": </b>" +
          data.system.timeLimit +
          "</br>";
      }

      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        game.i18n.localize("CRITICAL_INJURY.NAME") +
        ": " +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("CRITICAL_INJURY.TYPE") +
        `: </b><span class="title-case">` +
        data.system.type +
        "</span></br>" +
        "<b>" +
        game.i18n.localize("CRITICAL_INJURY.FATAL") +
        ": </b>" +
        data.system.fatal +
        "</br>" +
        timeLimit +
        "<b>" +
        game.i18n.localize("CRITICAL_INJURY.EFFECT") +
        ": </b>" +
        data.system.effect +
        "</br>" +
        `</div></div>`;
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      break;
    case "gear":
      let description = "";
      let risk = "";

      if (data.system.description != "") {
        description =
          "<b>" +
          game.i18n.localize("GEAR.DESCRIPTION") +
          ": </b>" +
          data.system.description +
          "</br>";
      }
      if (data.system.risk != "") {
        risk =
          "<b>" +
          game.i18n.localize("GEAR.RISK") +
          ": </b>" +
          data.system.risk +
          "</br>";
      }

      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("GEAR.BONUS") +
        ": </b>" +
        data.system.bonus +
        "</br>" +
        "<b>" +
        game.i18n.localize("GEAR.AVAILABILITY") +
        ": </b>" +
        data.system.availability +
        "</br>" +
        "<b>" +
        game.i18n.localize("GEAR.EFFECT") +
        ": </b>" +
        data.system.effect +
        "</br>" +
        description +
        risk +
        `</div></div>`;
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      break;
    case "magic":
      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("MAGIC.CATEGORY") +
        ": </b>" +
        data.system.category +
        "</br>" +
        "<b>" +
        game.i18n.localize("MAGIC.DESCRIPTION") +
        ": </b>" +
        data.system.description +
        "</br>" +
        `</div></div>`;
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      break;
    case "talent":
      
      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("TALENT.DESCRIPTION") +
        ": </b>" +
        data.system.description +
        "</br>" +
        `</div></div>`;
        //TODO add bonus and other data to the chat card          
        
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };

      break;
    
    case "upgrade":
      let prereq = "";
      let asset = "";
      if (data.system.prerequisite != "") {
        prereq =
          "<b>" +
          game.i18n.localize("UPGRADE.PREREQUISITE") +
          ": </b>" +
          data.system.prerequisite +
          "</br>";
      }
      if (data.system.asset != "") {
        asset =
          "<b>" +
          game.i18n.localize("UPGRADE.ASSET") +
          ": </b>" +
          data.system.asset +
          "</br>";
      }

      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("UPGRADE.COST") +
        ": </b>" +
        data.system.cost +
        "</br>" +
        prereq +
        "<b>" +
        game.i18n.localize("UPGRADE.FUNCTION") +
        ": </b>" +
        data.system.function +
        "</br>" +
        asset +
        "<b>" +
        game.i18n.localize("TALENT.DESCRIPTION") +
        ": </b>" +
        data.system.description +
        "</br>" +
        `</div></div>`;
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      
      break;
    case "weapon":
    
      let skill = "";
      if (data.system.skill == "closeCombat") {
        skill = game.i18n.localize("SKILL.CLOSE_COMBAT");
      } else if (data.system.skill == "rangedCombat") {
        skill = game.i18n.localize("SKILL.RANGED_COMBAT");
      } else {
        skill = game.i18n.localize("SKILL.FORCE");
      }
      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("WEAPON.DAMAGE") +
        ": </b>" +
        data.system.damage +
        "</br>" +
        "<b>" +
        game.i18n.localize("WEAPON.RANGE") +
        ": </b>" +
        data.system.range +
        "</br>" +
        "<b>" +
        game.i18n.localize("WEAPON.BONUS") +
        ": </b>" +
        data.system.bonus +
        "</br>" +
        "<b>" +
        game.i18n.localize("WEAPON.AVAILABILITY") +
        ": </b>" +
        data.system.availability +
        "</br>" +
        "<b>" +
        game.i18n.localize("WEAPON.SKILL") +
        ": </b>" +
        skill +
        "</br>" +
        `</div></div>`;
      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
      break;
    case "relationship":
      message =
        `<div class="card-holder" style="position: relative;">
            <img src="` +
        token +
        `" width="45" height="45" class="roll-token" />
            <div class='chat-flavor'>` +
        data.name.toUpperCase() +
        "</div>" +
        "<div class='row center'><img src='" +
        data.img +
        "' width=50 height=50/></div>" +
        "<div class='chat-item-info column'>" +
        "<b>" +
        game.i18n.localize("BIO.RELATIONSHIP") +
        ": </b>" +
        data.system.description +
        "</br>" +
        "<b>" +
        game.i18n.localize("NOTES") +
        ": </b>" +
        data.system.notes +
        "</br>" +
        `</div></div>`;

      chatData = {
        speaker: ChatMessage.getSpeaker(),
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: message,
      };
  }

  return chatData;
};
