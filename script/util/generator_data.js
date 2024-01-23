export class generator_data {
  static startingResources = {
    "Poor": 1,
    "Worker": 2,
    "Burgher": 3,
    "Aristocrat": 5,
  };

  static attributeList = [
    "physique",
    "precision",
    "logic",
    "empathy"
  ];

  static changeList = {
    "Poor": {
      "Sickly": {
        "system.attribute.physique.value": 2,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 5,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 1,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 2,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Gang Member": {
        "system.attribute.physique.value": 4,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 1,
        "system.skill.closeCombat.value": 2,
        "system.skill.force.value": 1,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 2,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 0,
        "system.skill.vigilance.value": 0,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Hard Work": {
        "system.attribute.physique.value": 5,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 2,
        "system.skill.closeCombat.value": 1,
        "system.skill.force.value": 2,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 0,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Servant": {
        "system.attribute.physique.value": 4,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 0,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 2,
        "system.skill.observation.value": 2,
      },
      "Crofter": {
        "system.attribute.physique.value": 5,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 1,
        "system.skill.closeCombat.value": 1,
        "system.skill.force.value": 2,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 0,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Underground": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 5,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 2,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 1,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 0,
        "system.skill.vigilance.value": 2,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
    },
    "Worker": {
      "Sickly": {
        "system.attribute.physique.value": 2,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 5,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 1,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 2,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Sent Away": {
        "system.attribute.physique.value": 4,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 3,
        "system.skill.agility.value": 1,
        "system.skill.closeCombat.value": 1,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 1,
        "system.skill.observation.value": 1,
      },
      "Bookish": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 5,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 1,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 2,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "In the Factory": {
        "system.attribute.physique.value": 5,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 2,
        "system.skill.closeCombat.value": 1,
        "system.skill.force.value": 2,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 0,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Religious": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 5,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 1,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 0,
        "system.skill.inspiration.value": 2,
        "system.skill.manipulation.value": 1,
        "system.skill.observation.value": 0,
      },
      "Underground": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 5,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 2,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 1,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 0,
        "system.skill.vigilance.value": 2,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
    },
    "Burgher": {
      "Sickly": {
        "system.attribute.physique.value": 2,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 5,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 1,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Boarding School": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 1,
        "system.skill.closeCombat.value": 1,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 1,
      },
      "Upstart": {
        "system.attribute.physique.value": 4,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 3,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 2,
        "system.skill.observation.value": 1,
      },
      "In Father's/Mother's Footsteps": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 5,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 2,
        "system.skill.observation.value": 1,
      },
      "Party Animal": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 5,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 1,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 0,
        "system.skill.inspiration.value": 1,
        "system.skill.manipulation.value": 2,
        "system.skill.observation.value": 0,
      },
      "In Corridors of Power": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 5,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 0,
        "system.skill.inspiration.value": 1,
        "system.skill.manipulation.value": 2,
        "system.skill.observation.value": 1,
      },
    },
    "Aristocrat": {
      "Sickly": {
        "system.attribute.physique.value": 2,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 5,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 1,
      },
      "Dreamer": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 5,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 1,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 1,
        "system.skill.inspiration.value": 1,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Rebel": {
        "system.attribute.physique.value": 4,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 3,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 1,
        "system.skill.vigilance.value": 2,
        "system.skill.inspiration.value": 2,
        "system.skill.manipulation.value": 1,
        "system.skill.observation.value": 1,
      },
      "Spoiled": {
        "system.attribute.physique.value": 4,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 3,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 1,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 0,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 2,
        "system.skill.observation.value": 0,
      },
      "Ruined": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 4,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 4,
        "system.skill.agility.value": 0,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 1,
        "system.skill.stealth.value": 1,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 2,
        "system.skill.inspiration.value": 0,
        "system.skill.manipulation.value": 0,
        "system.skill.observation.value": 0,
      },
      "Traveled Europe": {
        "system.attribute.physique.value": 3,
        "system.attribute.precision.value": 3,
        "system.attribute.logic.value": 4,
        "system.attribute.empathy.value": 5,
        "system.skill.agility.value": 1,
        "system.skill.closeCombat.value": 0,
        "system.skill.force.value": 0,
        "system.skill.medicine.value": 0,
        "system.skill.rangedCombat.value": 0,
        "system.skill.stealth.value": 0,
        "system.skill.investigation.value": 0,
        "system.skill.learning.value": 2,
        "system.skill.vigilance.value": 0,
        "system.skill.inspiration.value": 1,
        "system.skill.manipulation.value": 1,
        "system.skill.observation.value": 1,
      }
    },
  };

  static professionsList = {
    Vagabond: {
      archetype: "Vagabond",
      resources: 0
    },
    Thief: {
      archetype: "Vagabond",
      resources: 1
    },
    Enforcer: {
      archetype: "Servant",
      resources: 2
    },
    Magician: {
      archetype: "Occultist",
      resources: 1
    },
    "Day Laborer": {
      archetype: "Vagabond",
      resources: 1
    },
    Sailor: {
      archetype: "Officer",
      resources: 2
    },
    Preacher: {
      archetype: "Priest",
      resources: 1
    },
    Soldier: {
      archetype: "Officer",
      resources: 2
    },
    Butler: {
      archetype: "Servant",
      resources: 2
    },
    Chef: {
      archetype: "Servant",
      resources: 2
    },
    Psychic: {
      archetype: "Occultist",
      resources: 2
    },
    "Police Officer": {
      archetype: "Private Detective",
      resources: 2
    },
    Hunter: {
      archetype: "Hunter",
      resources: 2
    },
    "Forest Ranger": {
      archetype: "Hunter",
      resources: 2
    },
    Explorer: {
      archetype: "Hunter",
      resources: 3
    },
    Illusionist: {
      archetype: "Occultist",
      resources: 2
    },
    Surgeon: {
      archetype: "Doctor",
      resources: 2
    },
    Vicar: {
      archetype: "Priest",
      resources: 2
    },
    Detective: {
      archetype: "Private Detective",
      resources: 2
    },
    Lawyer: {
      archetype: "Private Detective",
      resources: 3
    },
    Author: {
      archetype: "Writer",
      resources: 1
    },
    Journalist: {
      archetype: "Writer",
      resources: 2
    },
    Poet: {
      archetype: "Writer",
      resources: 1
    },
    Psychiatrist: {
      archetype: "Doctor",
      resources: 2
    },
    Academic: {
      archetype: "Academic",
      resources: 3
    },
    "Public Servant": {
      archetype: "Academic",
      resources: 3
    },
    Doctor: {
      archetype: "Doctor",
      resources: 3
    },
    Bohemian: {
      archetype: "Academic",
      resources: 1
    },
    Dean: {
      archetype: "Priest",
      resources: 3
    },
    "Military Officer": {
      archetype: "Officer",
      resources: 3
    },
  };

  static professionTable = {
    "Poor": [
      "Vagabond", //11
      "Vagabond", //12
      "Vagabond", //13
      "Vagabond", //14
      "Vagabond", //15
      "Vagabond", //16
      "Thief", //21
      "Thief", //22
      "Thief", //23
      "Thief", //24
      "Enforcer", //25
      "Enforcer", //26
      "Enforcer", //31
      "Enforcer", //32
      "Magician", //33
      "Magician", //34
      "Day Laborer", //35
      "Day Laborer", //36
      "Day Laborer", //41
      "Day Laborer", //42
      "Day Laborer", //43
      "Sailor", //44
      "Sailor", //45
      "Sailor", //46
      "Preacher", //51
      "Preacher", //52
      "Soldier", //53
      "Soldier", //54
      "Soldier", //55
      "Soldier", //56
      "Butler", //61
      "Butler", //62
      "Chef", //63
      "Psychic", //64
      "Hunter", //65,
      "Hunter", //66
    ],
    "Worker": [
      "Thief", //11
      "Enforcer", //12
      "Enforcer",
      "Enforcer",
      "Enforcer",
      "Enforcer", //16
      "Magician", //21
      "Magician",
      "Magician", //23
      "Day Laborer", //24
      "Day Laborer",
      "Day Laborer",
      "Day Laborer",
      "Day Laborer", //32
      "Sailor", //33
      "Sailor",
      "Sailor", //35
      "Preacher", //36
      "Preacher", //41
      "Soldier", //42
      "Soldier",
      "Soldier", //44
      "Butler", //45
      "Butler", //46
      "Chef", //51
      "Chef",
      "Chef", //53
      "Psychic", //54
      "Psychic",
      "Psychic", //56
      "Police Officer", //61
      "Police Officer", //62
      "Hunter", //63
      "Hunter", //64
      "Forest Ranger", //65
      "Forest Ranger", //66
    ],
    "Burgher": [
      "Soldier", //11
      "Soldier", //12
      "Police Officer", //13
      "Police Officer", //14
      "Forest Ranger", //15
      "Explorer", //16
      "Explorer", //21
      "Illusionist", //22
      "Surgeon", //23
      "Surgeon", //24
      "Vicar", //25
      "Vicar", //26
      "Detective", //31
      "Detective", //32
      "Lawyer", //33
      "Lawyer", //34
      "Author", //35
      "Author", //36
      "Journalist", //41
      "Journalist", //42
      "Poet", //43
      "Psychiatrist", //44
      "Academic", //45
      "Academic", //46
      "Public Servant", //51
      "Public Servant",
      "Public Servant",
      "Public Servant", //54
      "Doctor", //55
      "Doctor",
      "Doctor",
      "Doctor", //62
      "Bohemian", //63
      "Bohemian", //64
      "Military Officer", //65
      "Military Officer", //66
    ],
    "Aristocrat": [
      "Explorer", //11
      "Explorer",
      "Explorer",
      "Explorer", //14
      "Illusionist", //15
      "Illusionist", //16
      "Author", //21
      "Author",
      "Author",
      "Author",
      "Author", //25
      "Poet", //26
      "Poet", //31
      "Academic", //32
      "Academic", //33
      "Public Servant", //34
      "Public Servant",
      "Public Servant", //36
      "Doctor", //41
      "Doctor",
      "Doctor", //43
      "Bohemian", //44
      "Bohemian",
      "Bohemian",
      "Bohemian",
      "Bohemian", //52
      "Dean", //53
      "Dean",
      "Dean", //55
      "Military Officer", //56
      "Military Officer",
      "Military Officer",
      "Military Officer",
      "Military Officer",
      "Military Officer",
      "Military Officer", //66
    ]
  };

  static ageInfo = [
    {
      min: 17,
      max: 25,
      name: "Young",
      events: 1,
      reducedAttribute: 0
    },
    {
      min: 26,
      max: 50,
      name: "Middle Age",
      events: 2,
      reducedAttribute: 1
    },
    {
      min: 51,
      max: 70,
      name: "Old",
      events: 3,
      reducedAttribute: 2
    },
  ];

  static archetypeInfo = {
    Vagabond: {
      motivation: [
        "Avenging my family",
        "Exposing supernatural secrets",
        "Being liked",
      ],
      trauma: [
        "Saw a revenant rise from its grave",
        "Forever in love with a wood wife",
        "Survived a week inside a troll bag",
      ],
      darkSecret: [
        "Stolen identity",
        "Terminal illness",
        "A vaesen kills anyone I love",
      ],
      talents: [
        "Hobo Tricks",
        "Suspicious",
        "Well-traveled"
      ],
      equipment: [
        "Quarterstaff",
        "Knife or Dagger",
        "Crowbar",
        "Liquor",
        "Pet dog"
      ],
      events: [
        {
          eventName: "Prison",
          skills: {
            "system.skill.closeCombat.value": 1,
            "system.skill.force.value": 1,
          },
          item: "Lockpicks"
        },
        {
          eventName: "Hard Work",
          skills: {
            "system.skill.force.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Axe"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Knuckle duster"
        },
        {
          eventName: "Accident",
          skills: {
            "system.skill.medicine.value": 1,
            "system.skill.learning.value": 1,
          },
          item: "Simple bandages"
        },
        {
          eventName: "Forbidden Love",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Writing utensils and paper"
        },
        {
          eventName: "Four-legged friend",
          skills: {
            "system.skill.investigation.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Guard dog"
        }
      ]
    },
    Servant: {
      motivation: [
        "Protecting my master",
        "Curiosity",
        "An urge to help humans and vaesen alike",
      ],
      trauma: [
        "Bitten by a brook horse",
        "Lost a master to the alluring song of the Neck",
        "Served a household plagued by a changeling",
      ],
      darkSecret: [
        "I murdered someone",
        "Persecuted for my religion",
        "Spying for a foreign power",
      ],
      talents: [
        "Loyal",
        "Robust",
        "Tough as Nails"
      ],
      equipment: [
        "Revolver",
        "Hurricane lamp",
        "Make-up",
        "Field kitchen",
        "Simple bandages"
      ],
      events: [
        {
          eventName: "Accused",
          skills: {
            "system.skill.vigilance.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Aquavit"
        },
        {
          eventName: "Important Service",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Fancy disguise"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Strong poison"
        },
        {
          eventName: "Accomplishment",
          skills: {
            "system.skill.inspiration.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Fine wines"
        },
        {
          eventName: "Secret relationship",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Opera glasses"
        },
        {
          eventName: "Self-employed",
          skills: {
            "system.skill.inspiration.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Slipstick"
        }
      ]
    },
    Hunter: {
      motivation: [
        "The thing that attacked my family must be destroyed",
        "Live in tune with nature",
        "Wants to bag some fantastic game",
      ],
      trauma: [
        "Attacked by the branches of an ash tree wife",
        "Broke your leg in the forest, but was guided home by a will o' the wisp",
        "Captured at dawn by a mountain troll and was stuck in its petrified arms",
      ],
      darkSecret: [
        "I sold my soul",
        "I cannot control my fits of rage",
        "Has children with a vaesen",
      ],
      talents: [
        "Bloodhound",
        "Herbalist",
        "Marksman"
      ],
      equipment: [
        "Rifle",
        "knife or Dagger",
        "Hunting dog",
        "Hunting trap",
        "Hunting equipment",
      ],
      events: [
        {
          eventName: "Injured",
          skills: {
            "system.skill.medicine.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Hunting equipment"
        },
        {
          eventName: "Faraway Lands",
          skills: {
            "system.skill.learning.value": 1,
            "system.skill.inspiration.value": 1,
          },
          item: "Compass"
        },
        {
          eventName: "Border Trouble",
          skills: {
            "system.skill.agility.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Rifle"
        },
        {
          eventName: "Great Find",
          skills: {
            "system.skill.investigation.value": 1,
            "system.skill.learning.value": 1,
          },
          item: "Field kitchen"
        },
        {
          eventName: "Sweetheart",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.inspiration.value": 1,
          },
          item: "Writing utensils and paper"
        },
        {
          eventName: "Your own expedition",
          skills: {
            "system.skill.investigation.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Strong horse"
        }
      ]
    },
    Occultist: {
      motivation: [
        "Learning about vaesen",
        "Understanding myself",
        "Power",
      ],
      trauma: [
        "Was hit by corrosive venom while trying to steal a lindworm egg",
        "The family farm is being run by a grumpy house nisse",
        "Was attacked by a night raven who infected you with a febrile disease",
      ],
      darkSecret: [
        "Guilty of a heinous crime",
        "My powers control me",
        "Changeling",
      ],
      talents: [
        "Magic tricks",
        "Medium",
        "Striking Fear"
      ],
      equipment: [
        "Crystal ball",
        "Powdered stag's horn",
        "Tinder box",
        "Knife or Dagger",
        "Cooking pot",
      ],
      events: [
        {
          eventName: "Encounter with Vaesen",
          skills: {
            "system.skill.learning.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Hurricane lantern"
        },
        {
          eventName: "Distinguish employer",
          skills: {
            "system.skill.manipulation.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Fancy disguise"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Strong poison"
        },
        {
          eventName: "Renowned",
          skills: {
            "system.skill.inspiration.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Musical instrument"
        },
        {
          eventName: "Grief",
          skills: {
            "system.skill.medicine.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Liquor"
        },
        {
          eventName: "Put on a show",
          skills: {
            "system.skill.inspiration.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Fancy disguise"
        }
      ]
    },
    Officer: {
      motivation: [
        "Make my father proud",
        "My friends need me",
        "Seek out danger and death",
      ],
      trauma: [
        "Almost drowned when your ship was dragged down by a sea monster",
        "Lost all your men to an angry giant",
        "Saw dead warriors rise again on the battlefield",
      ],
      darkSecret: [
        "Deserter",
        "Cannot cope with filth and disorder",
        "Killed a defenseless enemy",
      ],
      talents: [
        "Battle-hardened",
        "Gentleman",
        "Tactician"
      ],
      equipment: [
        "Rifle",
        "Pistol or Revolver",
        "Compass",
        "Bayonet",
        "Map book",
        "Saber",
      ],
      events: [
        {
          eventName: "Injured",
          skills: {
            "system.skill.force.value": 1,
            "system.skill.medicine.value": 1,
          },
          item: "Field kitchen"
        },
        {
          eventName: "Expedition",
          skills: {
            "system.skill.force.value": 1,
            "system.skill.rangedCombat.value": 1,
          },
          item: "Rifle"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.closeCombat.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Knuckle duster"
        },
        {
          eventName: "Rescued",
          skills: {
            "system.skill.agility.value": 1,
            "system.skill.stealth.value": 1,
          },
          item: "Bayonet"
        },
        {
          eventName: "Sweetheart",
          skills: {
            "system.skill.inspiration.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Binoculars"
        },
        {
          eventName: "Valor",
          skills: {
            "system.skill.force.value": 1,
            "system.skill.rangedCombat.value": 1,
          },
          item: "Pistol or Revolver"
        }
      ]
    },
    "Private Detective": {
      motivation: [
        "Getting away from my family",
        "Uncovering the truth",
        "Thrill-seeking",
      ],
      trauma: [
        "Heard the cry of a myling during your search for a missing child",
        "Had nightmares and woke up breathless and mare-ridden",
        "Came face-to-face with a werewolf",
      ],
      darkSecret: [
        "There is a price on my head",
        "Constant adulterer",
        "Drug addict",
      ],
      talents: [
        "Eagle Eye",
        "Elementary",
        "Focused"
      ],
      equipment: [
        "Magnifying glass",
        "Lockpicks",
        "Revolver",
        "Knuckle duster",
        "Binoculars",
      ],
      events: [
        {
          eventName: "Failed Case",
          skills: {
            "system.skill.investigation.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Liquor"
        },
        {
          eventName: "Secret Client",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Pistol or Revolver"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.closeCombat.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Knuckle duster"
        },
        {
          eventName: "High-profile Case",
          skills: {
            "system.skill.invetigation.value": 1,
            "system.skill.inspiration.value": 1,
          },
          item: "Book collection"
        },
        {
          eventName: "Sweetheart",
          skills: {
            "system.skill.learning.value": 1,
            "system.skill.inspiration.value": 1,
          },
          item: "Musical instrument"
        },
        {
          eventName: "Your own agency",
          skills: {
            "system.skill.investigation.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Chemical equipment"
        }
      ]
    },
    Writer: {
      motivation: [
        "Finding a certain vaesen",
        "Researching a book",
        "Revenge",
      ],
      trauma: [
        "Angered fairies who put you to sleep and sucked your blood",
        "Cursed by a homeless vaettir to write a book in your own blood",
        "Heard the song of the Neck, but failed to write down the lyrics",
      ],
      darkSecret: [
        "I record and use the secrets and weaknesses of my friends",
        "Wanted for revolutionary ideas",
        "My life's work is a lie"
      ],
      talents: [
        "Automatic Writing",
        "Journalist",
        "Wordsmith",
      ],
      equipment: [
        "Writing utensils and paper",
        "Camera",
        "Opera glasses",
        "Pet dog",
        "Book collection",
      ],
      events: [
        {
          eventName: "Addiction",
          skills: {
            "system.skill.medicine.value": 1,
            "system.skill.stealth.value": 1,
          },
          item: "Liquor"
        },
        {
          eventName: "Patron",
          skills: {
            "system.skill.manipulation.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Pet dog"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.closeCombat.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Pistol or Revolver"
        },
        {
          eventName: "Unexpected success",
          skills: {
            "system.skill.manipulation.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Book collection"
        },
        {
          eventName: "Sweetheart",
          skills: {
            "system.skill.inspiration.value": 2,
          },
          item: "Writing utensils and paper"
        },
        {
          eventName: "Created a masterpiece",
          skills: {
            "system.skill.learning.value": 1,
            "system.skill.inspiration.value": 1,
          },
          item: "Fine wines"
        }
      ]
    },
    Academic: {
      motivation: [
        "Charting the unknown",
        "Proving my critics wrong",
        "Becoming famous",
      ],
      trauma: [
        "Vaettir turned you into a rat",
        "Aged by the magic of a mermaid",
        "Watched your partner being torn apart by a giant",
      ],
      darkSecret: [
        "Addicted to drugs",
        "Stole or falsified documents to get research results",
        "Hunted by a vaesen"
      ],
      talents: [
        "Bookworm",
        "Erudite",
        "Knowledge is Reassuring",
      ],
      equipment: [
        "Book collection",
        "Map book",
        "Writing utensils and paper",
        "Liquor",
        "Slide rule",
      ],
      events: [
        {
          eventName: "Scandal",
          skills: {
            "system.skill.vigilance.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Fine wines"
        },
        {
          eventName: "Distinguished employer",
          skills: {
            "system.skill.learning.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Writing utensils and paper"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.learning.value": 1,
          },
          item: "Strong poison"
        },
        {
          eventName: "Socialite",
          skills: {
            "system.skill.inspiration.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Musical instrument"
        },
        {
          eventName: "Sweetheart",
          skills: {
            "system.skill.learning.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Opera glasses"
        },
        {
          eventName: "Influential work",
          skills: {
            "system.skill.learning.value": 1,
            "system.skill.inspiration.value": 1,
          },
          item: "Book collection"
        }
      ]
    },
    Doctor: {
      motivation: [
        "Exploring and describing the world",
        "Aiding the weak and afflicted",
        "Strengthening the Society and becoming its leader",
      ],
      trauma: [
        "A corpse came back to life during an autopsy",
        "Operated on a person with donkey's ears and hooves",
        "Saw your destiny in the eyes of a dying mermaid",
      ],
      darkSecret: [
        "Has two separate personalities",
        "Involved in illicit affairs",
        "Unnatural lust",
      ],
      talents: [
        "Army Medic",
        "Chief Physician",
        "Emergency Medicine",
      ],
      equipment: [
        "Medical equipment",
        "Liquor",
        "Fine wine",
        "Weak horse",
        "Strong poison",
      ],
      events: [
        {
          eventName: "Addiction",
          skills: {
            "system.skill.manipulation.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Chemical equipment"
        },
        {
          eventName: "Complex case",
          skills: {
            "system.skill.medicine.value": 1,
            "system.skill.learning.value": 1,
          },
          item: "Medical equipment"
        },
        {
          eventName: "Rival",
          skills: {
            "system.skill.medicine.value": 1,
            "system.skill.stealth.value": 1,
          },
          item: "Extremely strong poison"
        },
        {
          eventName: "Socialite",
          skills: {
            "system.skill.inspiration.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Fine wines"
        },
        {
          eventName: "Sweetheart",
          skills: {
            "system.skill.medicine.value": 1,
            "system.skill.learning.value": 1,
          },
          item: "Opera glasses"
        },
        {
          eventName: "Opened a pratice",
          skills: {
            "system.skill.manipulation.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Book collection"
        }
      ]
    },
    Priest: {
      motivation: [
        "Performing a sacred mission",
        "Cleansing my tarnished soul",
        "Understanding God's creation",
      ],
      trauma: [
        "Hurt someone after being enthralled by a witch",
        "Watched a church grim tear apart some thieves trying to steal the church silver",
        "The third owner of a spertus, serving the church to avoid being twisted",
      ],
      darkSecret: [
        "The Devil speaks to me",
        "I have stolen my identity",
        "Ensnared by a vaesen"
      ],
      talents: [
        "Absolution",
        "Blessing",
        "Confessor",
      ],
      equipment: [
        "Musical instrument",
        "Fine wines",
        "Writing utensils and paper",
        "Holy water",
        "Old bible",
      ],
      events: [
        {
          eventName: "Doubt",
          skills: {
            "system.skill.vigilance.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Liquor"
        },
        {
          eventName: "Popular",
          skills: {
            "system.skill.inspiration.value": 2,
          },
          item: "Musical instrument"
        },
        {
          eventName: "Enemy in the Church",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.vigilance.value": 1,
          },
          item: "Fancy disguise"
        },
        {
          eventName: "Theological discovery",
          skills: {
            "system.skill.learning.value": 2,
          },
          item: "Book collection"
        },
        {
          eventName: "Forbidden Love",
          skills: {
            "system.skill.stealth.value": 1,
            "system.skill.manipulation.value": 1,
          },
          item: "Writing utensils and paper"
        },
        {
          eventName: "In God's Service",
          skills: {
            "system.skill.manipulation.value": 1,
            "system.skill.observation.value": 1,
          },
          item: "Horse and carriage"
        }
      ]
    },
  };

  static weaponList = [
    "kick or punch",
    "knuckle duster",
    "chair",
    "sledgehammer",
    "flail",
    "rifle butt",
    "knife or dagger",
    "rapier",
    "sword",
    "saber",
    "crowbar",
    "axe",
    "quarterstaff",
    "halberd",
    "bayonet",
    "whip",
    "spear",
    "bow",
    "longbow",
    "crossbow",
    "pistol or revolver",
    "revolver",
    "musket",
    "rifle",
    "canon"
  ];
};