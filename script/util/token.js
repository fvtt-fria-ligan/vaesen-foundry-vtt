import { conditions } from "../util/conditions.js";

export class VaesenTokenHUD extends TokenHUD {
  constructor(...args) {
    super(...args);
  }

  _getStatusEffectChoices(params) {
    var actor = this.object.document.actor;

    if (actor.type === "player") {
      let ret = super._getStatusEffectChoices();
      return ret;
    }

    let yzurActions = {
      "modules/yze-combat/assets/icons/fast-action.svg" : {
        cssClass: "",
        id: "fastAction",
        isActive: false,
        isOverlay: false,
        src: "modules/yze-combat/assets/icons/fast-action.svg",
        title: "Fast Action"
      },
      "modules/yze-combat/assets/icons/slow-action.svg" : {
        cssClass: "",
        id: "slowAction",
        isActive: false,
        isOverlay: false,
        src: "modules/yze-combat/assets/icons/slow-action.svg",
        title: "Slow Action"
      }
    };

    if (actor.type === "npc") {
      return yzurActions;
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
      vaesenActions["modules/yze-combat/assets/icons/fast-action.svg"] = yzurActions["modules/yze-combat/assets/icons/fast-action.svg"];
      vaesenActions["modules/yze-combat/assets/icons/slow-action.svg"] = yzurActions["modules/yze-combat/assets/icons/slow-action.svg"];
      return vaesenActions;
    }
  }

  async _onToggleEffect(effect, {active, overlay=false}={}) {
    var actor = this.object.document.actor;
    if (actor.type !== "vaesen") {
      return super._onToggleEffect(effect, {active, overlay});
    }
    
    effect.preventDefault();
    effect.stopPropagation();
    let img = effect.currentTarget;
    const result = await conditions.onVaesenCondition(actor, img.dataset.statusId);

    if ( this.hasActiveHUD ) canvas.tokens.hud.refreshStatusIcons();
    return result;
  }
}