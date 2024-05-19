import { generator_data } from "./generator_data.js";

export class generator {
  static async _getRoll(max) {
    const currentRoll = await new Roll(`1d${max}`);
    await currentRoll.evaluate();
    return currentRoll.total - 1;
  }

  static async generateCharacter(actor) {
    const classKeys = Object.keys(generator_data.changeList);
    const classIndex = await this._getRoll(classKeys.length);
    const classSelected = classKeys[classIndex];
    console.log("Vaesen | Generator | Class", classSelected);

    let resources = generator_data.startingResources[classSelected];
    console.log("Vaesen | Generator | Innitial Resources", resources);

    const upbringingKeys = Object.keys(generator_data.changeList[classSelected]);
    const upbrindingIndex = await this._getRoll(upbringingKeys.length);
    const upbringingSelected = upbringingKeys[upbrindingIndex];
    console.log("Vaesen | Generator | Upbringing", upbringingSelected);
    console.log("Vaesen | Generator | Changes Before mod", generator_data.changeList[classSelected][upbringingSelected]);

    let changes = generator_data.changeList[classSelected][upbringingSelected];

    const professionKeys = Object.keys(generator_data.professionTable[classSelected]);
    const professionRoll = await this._getRoll(professionKeys.length);
    const professionName = generator_data.professionTable[classSelected][professionRoll];
    const professionSelected = generator_data.professionsList[professionName];
    const archetytpePageLink = game.journal.getName("Chapter 2 - Your Player Character")?.pages.getName(professionSelected.archetype)?.uuid;
    console.log("Vaesen | Generator | Profession", professionRoll, professionSelected);

    resources += professionSelected.resources;

    const age = await this._getRoll(50) + 17;
    const ageInfo = generator_data.ageInfo.find(it => it.min <= age && it.max >= age);
    console.log("Vaesen | Generator | Age Info", age, ageInfo);

    const archetypeInfo = generator_data.archetypeInfo[professionSelected.archetype];
    console.log("Vaesen | Generator | Archetype", archetypeInfo);

    const motivationRoll = await this._getRoll(archetypeInfo.motivation.length);
    const motivation = archetypeInfo.motivation[motivationRoll];

    const traumaRoll = await this._getRoll(archetypeInfo.trauma.length);
    const trauma = archetypeInfo.trauma[traumaRoll];

    const darkSecretRoll = await this._getRoll(archetypeInfo.darkSecret.length);
    const darkSecret = archetypeInfo.darkSecret[darkSecretRoll];

    let itemsToCreate = [];

    const talentRoll = await this._getRoll(archetypeInfo.talents.length);
    const talent = archetypeInfo.talents[talentRoll];
    let talentItem = getItemInfo(talent, "talent");
    itemsToCreate.push(talentItem);

    const equipmentRoll = await this._getRoll(archetypeInfo.equipment.length);
    const equipment = "Crowbar"; // archetypeInfo.equipment[equipmentRoll];

    let gearItem = getItemInfo(equipment, "gear");
    itemsToCreate.push(toStartingObject(gearItem));

    let equipmentsHtml = `<li>@UUID[Item.${gearItem.id}]{${equipment}}</li>`;

    let eventsHtml = "";
    let eventsIndex = [];

    for (let index = 0; index < ageInfo.events; index++) {
      let currentEventIndex = 0;
      do {
        currentEventIndex = await this._getRoll(archetypeInfo.events.length);
      } while (eventsIndex.includes(currentEventIndex))
      eventsIndex.push(currentEventIndex);
      const currentEvent = archetypeInfo.events[currentEventIndex];
      eventsHtml += `<li>${currentEvent.eventName}</li>`;

      gearItem = getItemInfo(currentEvent.item, "gear");
      itemsToCreate.push(toStartingObject(gearItem));

      equipmentsHtml += `<li>@UUID[Item.${gearItem.id}]{${gearItem.name}}</li>`;

      console.log("Vaesen | Generator | Adding Life Event", currentEvent);

      for (const key in currentEvent.skills) {
        const element = currentEvent.skills[key];
        changes[key] += element;
        console.log("Vaesen | Generator | Upgrading skill", key);
      }
    }
    if (itemsToCreate.filter(it => it.name.toLowerCase() == "crowbar").length == 1) {
      itemsToCreate.push(toStartingObject(getItemInfo("Crowbar - Gear", "gear")));
    }

    let attributeReduced = -1;
    for (let index = 0; index < ageInfo.reducedAttribute; index++) {
      let attributeReducedRoll = -1;
      do {
        attributeReducedRoll = await this._getRoll(4);
      } while (attributeReducedRoll == attributeReduced)

      console.log("Vaesen | Generator | Reducing attribute", generator_data.attributeList[attributeReducedRoll]);

      changes[`system.attribute.${generator_data.attributeList[attributeReducedRoll]}.value`] -= 1;
      attributeReduced = attributeReducedRoll;
    }

    changes["system.bio.archetype"] = `${professionSelected.archetype} (${professionName})`;
    changes["system.resources"] = resources;
    changes["system.bio.age"] = age;
    changes["system.bio.darkSecret"] = darkSecret;
    changes["system.bio.motivation"] = motivation;
    changes["system.bio.trauma"] = trauma;
    changes["system.note"] = `
    <div class="flex-col heavy-border m-3 margin-b-lg">
    <b class="title">${game.i18n.localize("GENERATOR.LIFE")}</b>
    <ul>
        <li><b>${game.i18n.localize("GENERATOR.CLASS")}:</b> ${classSelected}</li>
        <li><b>${game.i18n.localize("GENERATOR.UPBRINGING")}:</b> ${upbringingSelected}</li>
        <li><b>${game.i18n.localize("BIO.ARCHETYPE")}:</b> @UUID[${archetytpePageLink}]{${professionSelected.archetype}}</li>
        <li><b>${game.i18n.localize("GENERATOR.PROFESSION")}:</b> ${professionName}</li>
        <li><b>${game.i18n.localize("RESOURCES")}:</b> ${resources}</li>
        <li><b>${game.i18n.localize("BIO.AGE")}:</b> ${age} (${ageInfo.name})</li>
        <li><b>${game.i18n.localize("BIO.MOTIVATION")}:</b> ${motivation}</li>
        <li><b>${game.i18n.localize("BIO.TRAUMA")}:</b> ${trauma}</li>
        <li><b>${game.i18n.localize("BIO.DARK_SECRET")}:</b> ${darkSecret}</li>
        <li><b>${game.i18n.localize("HEADER.TALENTS").toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase())}:</b> @UUID[Item.${talentItem.id}]{${talent}}</li>
        <li><b>${game.i18n.localize("GENERATOR.LIFE_TIME_EVENTS")}:</b>
          <ul>${eventsHtml}
          </ul>
        </li>
        <li><b>${game.i18n.localize("GENERATOR.EQUIPMENTS")}:</b>
          <ul>${equipmentsHtml}
          </ul>
        </li>
    </ul>
    </div>`;
    changes["system.changelog"] = [];
    changes["system.starting"] = false;

    let dialogHtml = [];
    dialogHtml.push(' <div class="vaesen char-gen m-1 pi-1 flex-col">');
    dialogHtml.push(`<div class="info-box flex row fancy-border"><img class="icon pi-1" src="systems/vaesen/asset/hazard-sign.svg" width=64> <p>${game.i18n.localize("GENERATOR.MESSAGE")}</p></div>`);
    dialogHtml.push(changes["system.note"]);
    dialogHtml.push(`
        <div class="flex column player" style="margin: 0">
        <b class="title">${game.i18n.localize("HEADER.ATTRIBUTES")} & ${game.i18n.localize("HEADER.SKILLS")}</b>
        <div class="flex row wrap">
        <div class="skills flex column physique">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.PHYSIQUE")}: ${changes["system.attribute.physique.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.AGILITY")}:</b><p class="pi-3">${changes["system.skill.agility.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.CLOSE_COMBAT")}:</b> <p class="pi-3">${changes["system.skill.closeCombat.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.FORCE")}:</b> <p class="pi-3">${changes["system.skill.force.value"]}</p></div>
          </div>
        </div>
        
        <div class="skills flex column logic">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.LOGIC")}: ${changes["system.attribute.logic.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.INVESTIGATION")}:</b><p class="pi-3">${changes["system.skill.investigation.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.LEARNING")}:</b> <p class="pi-3">${changes["system.skill.learning.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.VIGILANCE")}:</b> <p class="pi-3">${changes["system.skill.vigilance.value"]}</p></div>
          </div>
        </div>
       </div>

       <div class="flex row wrap">
       <div class="skills flex column precision">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.PRECISION")}: ${changes["system.attribute.precision.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.MEDICINE")}:</b><p class="pi-3">${changes["system.skill.medicine.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.RANGED_COMBAT")}:</b> <p class="pi-3">${changes["system.skill.rangedCombat.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.STEALTH")}:</b> <p class="pi-3">${changes["system.skill.stealth.value"]}</p></div>
          </div>
        </div>

        <div class="skills flex column empathy">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.EMPATHY")}: ${changes["system.attribute.empathy.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.INSPIRATION")}:</b><p class="pi-3">${changes["system.skill.inspiration.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.MANIPULATION")}:</b> <p class="pi-3">${changes["system.skill.manipulation.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.OBSERVATION")}:</b> <p class="pi-3">${changes["system.skill.observation.value"]}</p></div>
          </div>
        </div>

        </div>
        </div>
        `);
    dialogHtml.push("</div>");
    const dialogHtmlRender = await TextEditor.enrichHTML(dialogHtml.join(""));

    let chatHTML = [];
    chatHTML.push(changes["system.note"]);
    chatHTML.push(`
        <div class="flex column player" style="margin: 0">
        <b class="title">${game.i18n.localize("HEADER.ATTRIBUTES")} & ${game.i18n.localize("HEADER.SKILLS")}</b>
        <div class="grid">
        
        <div class="skills flex column physique">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.PHYSIQUE")}: ${changes["system.attribute.physique.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.AGILITY")}:</b><p class="pi-3">${changes["system.skill.agility.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.CLOSE_COMBAT")}:</b> <p class="pi-3">${changes["system.skill.closeCombat.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.FORCE")}:</b> <p class="pi-3">${changes["system.skill.force.value"]}</p></div>
          </div>
        </div>
        
        <div class="skills flex column logic">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.LOGIC")}: ${changes["system.attribute.logic.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.INVESTIGATION")}:</b><p class="pi-3">${changes["system.skill.investigation.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.LEARNING")}:</b> <p class="pi-3">${changes["system.skill.learning.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.VIGILANCE")}:</b> <p class="pi-3">${changes["system.skill.vigilance.value"]}</p></div>
          </div>
        </div>
       </div>

       <div class="grid">
       <div class="skills flex column precision">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.PRECISION")}: ${changes["system.attribute.precision.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.MEDICINE")}:</b><p class="pi-3">${changes["system.skill.medicine.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.RANGED_COMBAT")}:</b> <p class="pi-3">${changes["system.skill.rangedCombat.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.STEALTH")}:</b> <p class="pi-3">${changes["system.skill.stealth.value"]}</p></div>
          </div>
        </div>

        <div class="skills flex column empathy">
        <b class="header"> ${game.i18n.localize("ATTRIBUTE.EMPATHY")}: ${changes["system.attribute.empathy.value"]}</b>
          <div class="skill-group">
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.INSPIRATION")}:</b><p class="pi-3">${changes["system.skill.inspiration.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.MANIPULATION")}:</b> <p class="pi-3">${changes["system.skill.manipulation.value"]}</p></div>
            <div class="skill flex row align-center"><b>${game.i18n.localize("SKILL.OBSERVATION")}:</b> <p class="pi-3">${changes["system.skill.observation.value"]}</p></div>
          </div>
        </div>

        </div>
        </div>
        `);
        chatHTML.push("</div>");

    console.log("Vaesen | Generator | Changes After mod", changes);

    $(".char-gen").hide();

    let reroll = false;
    let accepted = false;
    let generatorDialog = new Dialog({
      title: game.i18n.localize("GENERATOR.TITLE"),
      content: dialogHtmlRender,
      buttons: {
        update: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("YES"),
          callback: async () => {
            accepted = true;
            console.log("Vaesen | Generate", classSelected, upbringingSelected, changes);
            await actor.deleteEmbeddedDocuments("Item", actor.items.map(function (item) { return item.id; }));
            await actor.createEmbeddedDocuments("Item", itemsToCreate);
            await actor.update(changes);

            ChatMessage.create({
              content: `<h3>${game.i18n.localize("GENERATOR.GENERATION")} ${game.i18n.localize("GENERATOR.APPLIED")}:</h3><div class="vaesen" >${chatHTML[0]} ${chatHTML[1]}</div>`,
              blind: true,
              type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
              whisper: $(game.users.find(it => it.role === 4)).map(function () { return this._id; })
            });
          }
        },
        cancel: {
          icon: '<i class="fas fa-ban"></i>',
          label: game.i18n.localize("NO"),
        },
        reroll: {
          icon: '<i class="fas fa-dice"></i>',
          label: game.i18n.localize("GENERATOR.REROLL"),
          callback: async () => {
            reroll = true;
            await generator.generateCharacter(actor);
          }
        }
      },
      close: async () => {
        if (!accepted) {
          ChatMessage.create({
            content: `<h3>${game.i18n.localize("GENERATOR.GENERATION")} ${game.i18n.localize("GENERATOR.DISCARDED")}:</h3><div class="vaesen">${chatHTML[0]} ${chatHTML[1]}</div>`,
            blind: true,
            type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
            whisper: $(game.users.find(it => it.role === 4)).map(function () { return this._id; })
          });
        }
        if (reroll) {
          generatorDialog.render(true);
          reroll = false;
        }
        else {
          $(".char-gen").show();
        }
      }
    }, {
      id: "generator-dialog",
      width: 600
    }).render(true);
  }
}

function getItemInfo(itemName, type){
  let item = game.items.find(it => it.name.toLowerCase() === itemName.toLowerCase());
  if (item == undefined) {
    let itemType = generator_data.weaponList.includes(itemName.toLowerCase()) ? "weapon" : type;
    item = { type: itemType, name: itemName };
  }
  else
    item = item.toObject();
  return item;
}

function toStartingObject(item) {
  console.log("Vaesen | Generator | Starting Item", item);
  foundry.utils.setProperty(item, "system.starting", true);
  return item;
}