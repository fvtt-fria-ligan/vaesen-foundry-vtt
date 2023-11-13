
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

const migrations = {
  4.0 : migrateTo4_0
}

async function migrateTo4_0() {
  const options = {permanent: true};
  ui.notifications.warn("Migrating your data to version 4.0.0. Please, wait until it finishes.", options);
  console.log("MIGRATING TO 4.0.0");
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

    const currentEffect = Array.from(actor.effects?.values()).find(it => it.statuses.has(condition.id));
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
      statuses: statusEffect.statuses
    }]);
  }
  const actorLink = get(actor, "prototypeToken.actorLink");
  if (!actorLink) {
    updateData["prototypeToken.actorLink"] = true;
    updateData["prototypeToken.disposition"] = 0;
  }
  return updateData;
}