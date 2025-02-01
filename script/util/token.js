import { conditions } from "../util/conditions.js";

export class VaesenTokenHUD extends TokenHUD {

// export class VaesenTokenHUD extends foundry.applications.hud.TokenHUD {
  constructor(...args) {
    super(...args);
  }

  _getStatusEffectChoices(params) {
    var actor = this.object.document.actor;

    if (actor.type === "player") {  
      return super._getStatusEffectChoices();
    }

    if (actor.type === "npc") {
      let statuses = super._getStatusEffectChoices();
      for (const key of Object.keys(statuses)) {
        if (key.startsWith("systems/vaesen/asset/status/"))
          delete statuses[key];
      }
      return statuses;
    }

    if (actor.type === "vaesen") {
      let vaesenActions = {};
      for (let item of Object.values(actor.items.contents)) {
        if (item.type !== "condition") {
          continue;
        }
        vaesenActions[item.img] = {
          cssClass: item.system.active ? "active" : "",
          id: item.id,
          src: item.img,
          title: `${item.name} (${item.system.bonus})`,
          isActive: item.system.active
        };
      }
      return vaesenActions;
    }
  }

  async _onToggleEffect(effect, {active, overlay=false}={}) {
    var actor = this.object.document.actor;
    let img = effect.currentTarget;
    if (actor.type !== "vaesen" || img.dataset.statusId == "fastAction" || img.dataset.statusId == "slowAction") {
      return super._onToggleEffect(effect, {active, overlay});
    }
    
    effect.preventDefault();
    effect.stopPropagation();
    const result = await conditions.onVaesenCondition(actor, img.dataset.statusId);

    if ( this.hasActiveHUD ) canvas.tokens.hud.refreshStatusIcons();
    return result;
  }
}