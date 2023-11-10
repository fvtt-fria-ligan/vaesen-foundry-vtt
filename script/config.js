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
    fear: "BONUS_TYPE.FEAR"
};

vaesen.bonusTypeRequiresSkill = ["skill", "ignoreConditionSkill", "damage"];
vaesen.bonusTypeRequiresBonus = ["skill", "damage", "fear"];
vaesen.bonusTypeDamageSkills = ["closeCombat", "force", "rangedCombat"];