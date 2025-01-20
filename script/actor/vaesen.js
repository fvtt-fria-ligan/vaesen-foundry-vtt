import { conditions } from "../util/conditions.js";

export class VaesenActor extends Actor {
  prepareData() {
    super.prepareData();
    const actorData = this.system;
    this.system.exp = actorData.experience;
  }

  /* -------------------------------------------- */
  findStatusEffectById(id) {
    console.log("find by id: " + id);
    return Array.from(this.effects?.values()).find(
      (it) => it.data.flags.core?.statusId === id
    );
  }

  /* -------------------------------------------- */
  async deleteStatusEffectById(id, options = { renderSheet: true }) {
    console.log("delete by id: " + id);
    const effects = Array.from(this.effects?.values()).filter(
      (it) => it.data.flags.core?.statusId === id
    );
    await this._deleteStatusEffects(effects, options);
  }

  /* -------------------------------------------- */
  async _deleteStatusEffects(effects, options) {
    console.log(effects);
    console.log(effects.map((it) => it.id));
    console.log(options);
    const ids = Array.from(effects.map((it) => it.id));
    await this.deleteEmbeddedDocuments("ActiveEffect", ids, options);
    //await this._deleteStatusEffectsByIds(effects.map(it => it.id), options);
  }

  /* -------------------------------------------- */
  async _deleteStatusEffectsByIds(effectIds, options) {
    await this.deleteEmbeddedDocuments("ActiveEffect", effectIds, options);
  }

  /* -------------------------------------------- */
  async addStatusEffectById(
    id,
    options = { renderSheet: false, unique: true }
  ) {
    if (this.hasStatusEffectById(id) && options.unique === true) {
      return;
    }
    const statusEffect = CONFIG.statusEffects.find((it) => it.id === id);
    await this.addStatusEffect(statusEffect, options);
  }

  /* -------------------------------------------- */
  async addStatusEffect(
    statusEffect,
    options = { renderSheet: false, overlay: false }
  ) {
    //await this.deleteStatusEffectById(statusEffect.id, options);
    const effect = duplicate(statusEffect);
    console.log(effect.label);
    console.log(effect.id);
    await this.createEmbeddedDocuments(
      "ActiveEffect",
      [
        {
          name: effect.label,
          "flags.core.statusId": effect.id,
          "flags.core.overlay": options.overlay,
          label: effect.label,
          icon: effect.icon,
          origin: this.uuid,
         
        },
      ],
      options
    );
  }

  /* -------------------------------------------- */
  hasStatusEffectById(id) {
    const effects = this.findStatusEffectById(id);
    return effects !== undefined;
  }

  async toggleStatusEffectById(id, options = { renderSheet: true }) {
    console.log("over to the character for toggeling");

    const effect = this.findStatusEffectById(id);

    if (effect) {
      await this.deleteStatusEffectById(id);
    } else {
      await this.addStatusEffectById(id, options);
    }
  }

  async toggleStatusEffect(statusId, options) {
    if (this.type != "vaesen")
      return await super.toggleStatusEffect(statusId, options);

    await conditions.onVaesenCondition(this, statusId);
  }

  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    const link =
      data.type == "player" ||
      data.type == "headquarter" ||
      (data.type == "npc" && (await game.settings.get("vaesen", "npcLink"))) ||
      (data.type == "vaesen" &&
        (await game.settings.get("vaesen", "vaesenLink")));

    const displayName = link
      ? CONST.TOKEN_DISPLAY_MODES.HOVER
      : CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER;
    const isNpc = data.type == "npc";
    const displayBars = isNpc
      ? CONST.TOKEN_DISPLAY_MODES.OWNER
      : CONST.TOKEN_DISPLAY_MODES.NONE;
    const bar1 = isNpc ? "condition.physical" : null;
    const bar2 = isNpc ? "condition.mental" : null;
    let actorDefaults = {
      "prototypeToken.displayName": displayName,
      "prototypeToken.displayBars": displayBars,
      "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.NEUTRAL,
      "prototypeToken.name": `${data.name}`,
      "prototypeToken.actorLink": link,
      "prototypeToken.sight.enabled": "true",
      "prototypeToken.sight.range": "30",
      "prototypeToken.bar1.attribute": bar1,
      "prototypeToken.bar2.attribute": bar2,
      "system.starting": true,
    };
    var headquarters = game.actors.contents.filter(
      (x) => x.type === "headquarter"
    );
    if (headquarters.length === 1)
      actorDefaults["system.headquarter"] = headquarters[0].id;
    this.updateSource(actorDefaults);
  }

  async _preUpdate(changed, options, user) {
    const actor = this;
    if (actor.type != "player" && actor.type != "headquarter") return true;

    if (changed.ownership) {
      return true;
    }

    const flattenChanges = flattenObject(changed);
    const changedText = game.i18n.localize("CHANGELOG.CHANGED");
    const toText = game.i18n.localize("CHANGELOG.TO");
    const byText = game.i18n.localize("CHANGELOG.BY");
    const atText = game.i18n.localize("CHANGELOG.AT");
    const dateChanged = new Date().toLocaleString();

    let changelogArray = actor.system.changelog ?? [];

    Object.keys(flattenChanges).forEach((current) => {
      if (current == "_id" || current.startsWith("flags")) return;

      if (current == "system.changelog") {
        changelogArray = current
          .split(".")
          .reduce((p, c) => (p && p[c]) || null, changed);
        return;
      }

      const originalValue =
        current.split(".").reduce((p, c) => (p && p[c]) || null, actor) ?? 0;
      const newValue =
        current.split(".").reduce((p, c) => (p && p[c]) || null, changed) ?? 0;
      const itemChanged = game.i18n.localize(
        current
          .replace("system.", "")
          .replace(".value", "")
          .toUpperCase()
          .replace("COMBAT", "_COMBAT")
          .replace("POINT", "POINTS")
          .replace("DARKSECRET", "DARK_SECRET")
      );

      if (originalValue == newValue) return;

      const log = {
        name: itemChanged,
        change: `${originalValue} => ${newValue}`,
        by: user.name,
        at: dateChanged,
      };
      changelogArray.push(log);
    });

    foundry.utils.setProperty(changed, "system.changelog", changelogArray);

    super._preUpdate(changed, options, user);
  }

  async _handleItem(document, userId, textType) {
    const actorChanged = this;
    // if we are not dealing with a player or headquarter, we don't want to log the changes
    if (actorChanged.type != "player" && actorChanged.type != "headquarter") return;
    const byText = game.i18n.localize("CHANGELOG.BY");
    const atText = game.i18n.localize("CHANGELOG.AT");
    const dateChanged = new Date().toLocaleString();
    const userName = game.users.get(userId)?.name;
    let changelogArray = this.system.changelog;
    let documentType = document.type;
    if (document.statuses)
      documentType = "condition";

    const log = {
      name: document.name,
      change: `${documentType} ${textType}`,
      by: userName,
      at: dateChanged,
    };

    changelogArray.push(log);

    await this.update({ "system.changelog": changelogArray });
  }

  async _onCreateDescendantDocuments(
    parent,
    collection,
    documents,
    data,
    options,
    userId
  ) {
    if (!this.isOwner) return;

    const addedText = game.i18n.localize("CHANGELOG.ADDED");
    await this._handleItem(documents[0], userId, addedText);

    super._onCreateDescendantDocuments(
      parent,
      collection,
      documents,
      data,
      options,
      userId
    );
  }

  async _onDeleteDescendantDocuments(
    parent,
    collection,
    documents,
    data,
    options,
    userId
  ) {
    if (!this.isOwner) return;

    const removedText = game.i18n.localize("CHANGELOG.REMOVED");
    await this._handleItem(documents[0], userId, removedText);

    super._onCreateDescendantDocuments(
      parent,
      collection,
      documents,
      data,
      options,
      userId
    );
  }
}
