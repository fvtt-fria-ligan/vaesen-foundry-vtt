export const vaesen = {};

vaesen.skills = {
    agility: "SKILL.AGILITY",
    closeCombat: "SKILL.CLOSE_COMBAT",
    force: "SKILL.FORCE",
    medicine: "SKILL.MEDICINE",
    rangedCombat: "SKILL.RANGED_COMBAT",
    stealth: "SKILL.STEALTH",
    investigation: "SKILL.INVESTIGATION",
    learning: "SKILL.LEARNING",
    vigilance: "SKILL.VIGILANCE",
    inspiration: "SKILL.INSPIRATION",
    manipulation: "SKILL.MANIPULATION",
    observation: "SKILL.OBSERVATION",
};

vaesen.bonusType = {
    none: "BONUS_TYPE.NONE",
    skill: "BONUS_TYPE.SKILL",
    ignoreConditionSkill: "BONUS_TYPE.IGNORE_CONDITIONS_SKILL",
    ignoreConditionPhysical: "BONUS_TYPE.IGNORE_CONDITIONS_PHYSICAL",
    ignoreConditionMental: "BONUS_TYPE.IGNORE_CONDITIONS_MENTAL",
    damage: "BONUS_TYPE.DAMAGE",
    fear: "BONUS_TYPE.FEAR",
    bonusMentalRecovery: "BONUS_TYPE.MENTAL_RECOVERY",
    bonusPhysicalRecovery: "BONUS_TYPE.PHYSICAL_RECOVERY",
};
vaesen.upgradeBonusType = {
    none: "BONUS_TYPE.NONE",
    bonusMentalRecovery: "BONUS_TYPE.MENTAL_RECOVERY",
    bonusPhysicalRecovery: "BONUS_TYPE.PHYSICAL_RECOVERY",
};

vaesen.bonusTypeRequiresSkill = ["skill", "ignoreConditionSkill", "damage"];
vaesen.bonusTypeRequiresBonus = ["skill", "damage", "fear", "bonusMentalRecovery", "bonusPhysicalRecovery"];
vaesen.bonusTypeDamageSkills = ["closeCombat", "force", "rangedCombat"];