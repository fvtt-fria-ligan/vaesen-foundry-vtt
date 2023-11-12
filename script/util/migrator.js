
export function migrate(){
  if (!game.user.isGM)
    return;
  
  const currentVersion = game.settings.get("vaesen", "systemMigrationVersion");
  Object.keys(migrations).forEach(function(key) {
    if (!currentVersion || isNewerVersion(key, currentVersion))
      migrations[key]();
  });

}

const migrations = {
  3.9 : migrateTo3_9
}

async function migrateTo3_9() {
  console.log("MIGRATING TO 3.9.0");
  for (let actor of game.actors.contents) {
    const updateData = migrateTo3_9_Actor(actor);
    if (!foundry.utils.isEmpty(updateData)) {
      console.log(`Migrating Actor Entry "${actor.name}" to Version 3.9.0`);
      await actor.update(updateData);
    }
  }
}

function migrateTo3_9_Actor(actor){
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
    updateData["prototypeToken.disposition"] = 1;
  }
  return updateData;
}