export class VaesenTokenHUD extends TokenHUD {
  constructor(...args) {
    super(...args);
  }
  // static get defaultOptions() {
  //   return foundry.utils.mergeObject(super.defaultOptions, {
  //     template: "systems/mysystem/src/extensions/templates/token-hud.html"
  //   });
  // }

  _getStatusEffectChoices(params) {
    var actor = this.object.document.actor;

    if (actor.type === "player") {
      let ret = super._getStatusEffectChoices();
      console.log(ret);
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
        console.log(item);
        vaesenActions[item.img] = {
          cssClass: item.system.active ? "active" : "",
          id: item.id,
          src: item.img,
          title: `${item.name} (${item.system.bonus})`
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
    let condition = Array.from(actor.items?.values()).find(x => x.type == "condition" && x.id == img.dataset.statusId);

    await actor.updateEmbeddedDocuments("Item", [
      { _id: condition.id, "data.active": !condition.system.active },
    ]);

    if ( this.hasActiveHUD ) canvas.tokens.hud.refreshStatusIcons();
    return condition.system.active;
  }
}