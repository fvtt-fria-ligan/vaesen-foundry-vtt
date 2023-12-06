
export function migrate(){
  if (!game.user.isGM)
    return;
  
  const currentVersion = game.settings.get("vaesen", "systemMigrationVersion");
  console.log("Vaesen Data CurrentVersion", currentVersion);
  Object.keys(migrations).forEach(function(key) {
    if (!currentVersion || isNewerVersion(key, currentVersion))
      migrations[key]();
  });
}

export async function linkUnlinkActorData(link, type){
  new Dialog({
    title: `Link/Unlink ${type}`,
    content: `<p>${game.i18n.localize(link ? "MIGRATOR.LINK_ACTOR" : "MIGRATOR.UNLINK_ACTOR")}<strong>${type}</strong></p><p>${game.i18n.localize("MIGRATOR.LINK_ACTOR_CONFIRMATION")}</p>`,
    buttons: {
      update: {
       icon: '<i class="fas fa-check"></i>',
       label: "Update",
       callback: () => {
        var actors = game.actors.contents.filter(x => x.type == type.toLowerCase());
        for (let actor of actors) {
          actor.update({"prototypeToken.actorLink": link});
          console.log("Vaesen | Link/Unlink", actor);
        }
       }
      },
      cancel: {
       icon: '<i class="fas fa-ban"></i>',
       label: "Cancel"
      }
     },
  }).render(true);
}

const migrations = {
  "4.0.0" : migrateTo4_0_0,
  "4.1.0" : migrateTo4_1_0
}

async function migrateTo4_0_0() {
  const options = {permanent: true};
  ui.notifications.warn("Migrating your data to version 4.0.0. Please, wait until it finishes.", options);
  for (let actor of game.actors.contents) {
    const updateData = migrateTo4_0_Actor(actor);
    if (!foundry.utils.isEmpty(updateData)) {
      console.log("Vaesen Migration",{actor: actor, changes: updateData});
      await actor.update(updateData);
    }
  }

  await game.settings.set("vaesen", "systemMigrationVersion", game.system.data.version);
  ui.notifications.info("Data migrated to version 4.0.0. If you have players' tokens, please, remove them from the scene and drag them to the scene back from the Actor's tab.", options);
}

function migrateTo4_0_Actor(actor){
  let updateData = {};

  if (actor.type != "player")
    return updateData;

  const get = (t, path) => path.split(".").reduce((r, k) => r?.[k], t);
  for (var conditionKey in CONFIG.vaesen.allConditions) {
    let condition = CONFIG.vaesen.allConditions[conditionKey];
    if (condition.changes === undefined)
      continue;

    const key = condition.changes[0].key;
    const checked = get(actor, condition.changes[0].key);
    if (!checked)
      continue;

    const currentEffect = Array.from(actor.effects?.values()).find(it => it.icon === condition.icon);
    if (currentEffect)
      continue;

    updateData[key] = false;
    const statusEffect = CONFIG.statusEffects.find(it => it.id === condition.id);
    console.log(statusEffect);
    actor.createEmbeddedDocuments("ActiveEffect", [{
      label: statusEffect.label,
      icon: statusEffect.icon,
      changes: statusEffect.changes,
      id: actor.uuid,
      statuses: statusEffect.statuses,
      flags: {
        core: {
          statusId: condition.id
        }
      }
    }]);
  }
  const actorLink = get(actor, "prototypeToken.actorLink");
  if (!actorLink) {
    updateData["prototypeToken.actorLink"] = true;
    updateData["prototypeToken.disposition"] = 0;
  }
  return updateData;
}

async function migrateTo4_1_0() {
  const options = {permanent: true};
  ui.notifications.warn("Migrating your data to version 4.1.0. Please, wait until it finishes.", options);

  var headquarters = game.actors.contents.filter(x => x.type === "headquarter");
  if (headquarters.length !== 1) {
    ui.notifications.warn(`You have ${headquarters.length} headquarter${headquarters.length > 1 ? "s" : "" } on the world. In this case, you will need to configure the headquarte manually for each player character.`, options);
  }
  else {
    var actors = game.actors.contents.filter(x => x.type === "player");
    for (let actor of actors) {
      console.log("Vaesen Migration", actor);
      await actor.update({ "system.headquarter": headquarters[0].id });
    }
  }

  await game.settings.set("vaesen", "systemMigrationVersion", game.system.data.version);
  ui.notifications.info("Data migrated to version 4.1.0.", options);
}