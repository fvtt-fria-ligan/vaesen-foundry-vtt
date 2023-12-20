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
    console.log("Vaesen | Generator | Profession", professionRoll, professionSelected);

    resources += professionSelected.resources;

    const age = await this._getRoll(50) + 16;
    const ageInfo = generator_data.ageInfo.find(it => it.min <= age && it.max >= age);
    console.log("Vaesen | Generator | Age Info", ageInfo);

    const archetypeInfo = generator_data.archetypeInfo[professionSelected.archetype];
    console.log("Vaesen | Generator | Archetype", archetypeInfo);

    const motivationRoll = await this._getRoll(archetypeInfo.motivation.length);
    const motivation = archetypeInfo.motivation[motivationRoll];

    const traumaRoll = await this._getRoll(archetypeInfo.trauma.length);
    const trauma = archetypeInfo.trauma[traumaRoll];

    const darkSecretRoll = await this._getRoll(archetypeInfo.darkSecret.length);
    const darkSecret = archetypeInfo.darkSecret[darkSecretRoll];

    const talentRoll = await this._getRoll(archetypeInfo.talents.length);
    const talent = archetypeInfo.talents[talentRoll];

    const equipmentRoll = await this._getRoll(archetypeInfo.equipment.length);
    const equipment = archetypeInfo.equipment[equipmentRoll];

    let equipmentsHtml = `<li>${equipment}</li>`;
    let equipmentsList = [equipment];

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
      equipmentsHtml += `<li>${currentEvent.item}</li>`;
      equipmentsList.push(currentEvent.item);

      console.log("Vaesen | Generator | Adding Life Event", currentEvent);

      for (const key in currentEvent.skills) {
        const element = currentEvent.skills[key];
        changes[key] += element;
        console.log("Vaesen | Generator | Upgrading skill", key);
      }
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

    changes["system.bio.archetype"] = `${professionName} (${professionSelected.archetype})`;
    changes["system.resources"] = resources;
    changes["system.bio.age"] = age;
    changes["system.bio.darkSecret"] = darkSecret;
    changes["system.bio.motivation"] = motivation;
    changes["system.bio.trauma"] = trauma;
    changes["system.note"] = `<ul>
        <li>Class: ${classSelected}</li>
        <li>Upbringing: ${upbringingSelected}</li>
        <li>Profession: ${professionName}</li>
        <li>Archetype: ${professionSelected.archetype}</li>
        <li>Resources: ${resources}</li>
        <li>Age: ${age} (${ageInfo.name})</li>
        <li>Motivation: ${motivation}</li>
        <li>Trauma: ${trauma}</li>
        <li>Dark Secret: ${darkSecret}</li>
        <li>Talent: ${talent}</li>
        <li>Events:
          <ul>${eventsHtml}
          </ul>
        </li>
        <li>Equipments:
          <ul>${equipmentsHtml}
          </ul>
        </li>
        </ul>`;

    let dialogHtml = [];
    dialogHtml.push(`<p>This is a destructive operation, that will clean the current character to replace by the default values. Would you like to proceed?</p>`);
    dialogHtml.push(changes["system.note"]);
    dialogHtml.push(`
        <table>
        <tr>
        <td>
        <ul>
        <li>PHYSIQUE: ${changes["system.attribute.physique.value"]}
          <ul>
            <li>AGILITY: ${changes["system.skill.agility.value"]}</li>
            <li>CLOSE COMBAT: ${changes["system.skill.closeCombat.value"]}</li>
            <li>FORCE: ${changes["system.skill.force.value"]}</li>
          </ul>
        </li>
        </ul>
        </td>
        <td>
        <ul>
        <li>LOGIC: ${changes["system.attribute.logic.value"]}
          <ul>
            <li>INVESTIGATION: ${changes["system.skill.investigation.value"]}</li>
            <li>LEARNING: ${changes["system.skill.learning.value"]}</li>
            <li>VIGILANCE: ${changes["system.skill.vigilance.value"]}</li>
          </ul>
        </li>
        </ul>
        </td>
        </tr>
        <tr>
        <td>
        <ul>
        <li>PRECISION: ${changes["system.attribute.precision.value"]}
          <ul>
            <li>MEDICINE: ${changes["system.skill.medicine.value"]}</li>
            <li>RANDGED COMBAT: ${changes["system.skill.rangedCombat.value"]}</li>
            <li>STEALTH: ${changes["system.skill.stealth.value"]}</li>
          </ul>
        </li>
        </ul>
        </td>
        <td>
        <ul>
        <li>EMPATHY: ${changes["system.attribute.empathy.value"]}
          <ul>
            <li>INSPIRATION: ${changes["system.skill.inspiration.value"]}</li>
            <li>MANIPULATION: ${changes["system.skill.manipulation.value"]}</li>
            <li>OBSERVATION: ${changes["system.skill.observation.value"]}</li>
          </ul>
        </li>
        </ul>
        </td>
        </tr>
        </table>`);
    const dialogHtmlRender = dialogHtml.join("");

    console.log("Vaesen | Generator | Changes After mod", changes);

    new Dialog({
      title: `Generate character`,
      content: dialogHtmlRender,
      buttons: {
        update: {
          icon: '<i class="fas fa-check"></i>',
          label: "Yes",
          callback: async () => {
            console.log("Vaesen | Generate", classSelected, upbringingSelected, changes);
            await actor.deleteEmbeddedDocuments("Item", actor.items.map(function (item) { return item.id; }));
            await actor.update(changes);

            let itemsToCreate = [];

            let talentItem = game.items.find(it => it.name.toLowerCase() === talent.toLowerCase());
            if (talentItem == undefined) {
              talentItem = { type: "talent", name: talent };
            }
            itemsToCreate.push(talentItem);

            if (equipmentsList.includes("Crowbar")) {
              equipmentsList.push("Crowbar - Gear");
            }

            for (const gear of equipmentsList) {
              let gearItem = game.items.find(it => it.name.toLowerCase() === gear.toLowerCase());
              if (gearItem == undefined) {
                let gearType = "gear";
                if (generator_data.weaponList.includes(gear.toLowerCase())) {
                  gearType = "weapon";
                }

                gearItem = { type: gearType, name: gear };
              }
              itemsToCreate.push(gearItem);
            }

            actor.createEmbeddedDocuments("Item", itemsToCreate);

            ChatMessage.create({
              content: `<h3>Character GENERATION applied  :</h3><br>${dialogHtml[1]}<br>${dialogHtml[2]}`,
              blind: true,
              type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
              whisper: $(game.users.find(it => it.role === 4)).map(function () { return this._id; })
            });
          }
        },
        cancel: {
          icon: '<i class="fas fa-ban"></i>',
          label: "No",
          callback: async () => {
            ChatMessage.create({
              content: `<h3>Character GENERATION discarded:</h3><br>${dialogHtml[1]}<br>${dialogHtml[2]}`,
              blind: true,
              type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
              whisper: $(game.users.find(it => it.role === 4)).map(function () { return this._id; })
            });
          }
        }
      },
      close: async () => {
        ChatMessage.create({
          content: `<h3>Character GENERATION discarded:</h3><br>${dialogHtml[1]}<br>${dialogHtml[2]}`,
          blind: true,
          type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
          whisper: $(game.users.find(it => it.role === 4)).map(function () { return this._id; })
        });
      }
    }, {
      width: 600
    }).render(true);
  }
}