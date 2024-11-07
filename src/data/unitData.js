// src/data/unitData.js

export const categories = [
  { name: 'Epic Hero', items: [] },
  { name: 'Character', items: [] },
  { name: 'Battleline', items: [] },
  { name: 'Vehicle', items: [] },
  { name: 'Fortification', items: [] },
  { name: 'Allied Units', items: [] },
];

export const sampleUnits = {
  'Epic Hero': [
    { 
      name: 'Baharroth', 
      points: 125,
      abilities: [
        { name: "Cloudstrider", description: "In your Shooting phase, after this model’s unit has shot, it can make a Normal Move up to 7\"." },
        { name: "Cry of the Wind", description: "While leading a unit, add 1 to the Hit roll for that unit's attacks." }
      ],
      stats: {
        movement: "14\"",
        toughness: 3,
        save: "2+",
        wounds: 5,
        leadership: "6+",
        oc: 1
      },
      weapons: {
        melee: [{ name: "The Shining Blade", range: "Melee", attacks: 6, ws: "2+", strength: 5, ap: -2, damage: 2 }],
        ranged: [{ name: "Fury of the Tempest", range: "24\"", attacks: 4, bs: "2+", strength: 6, ap: -1, damage: 2 }]
      }
    },
    { 
      name: 'Fuegan Ra', 
      points: 100,
      abilities: [
        { name: "Burning Lance", description: "While leading a unit, add 1 to the Hit roll for that unit's attacks." }
      ],
      stats: {
        movement: "7\"",
        toughness: 4,
        save: "2+",
        wounds: 5,
        leadership: "6+",
        oc: 1
      },
      weapons: {
        melee: [{ name: "The Fire Axe", range: "Melee", attacks: 6, ws: "2+", strength: 5, ap: -4, damage: 3 }],
        ranged: [{ name: "Searsong", range: "18\"", attacks: 1, bs: "2+", strength: 14, ap: -4, damage: "D6", keywords: ["Melta"] }]
      }
    }
  ],
  'Character': [
    { 
      name: 'Autarch', 
      points: 100,
      abilities: [
        { name: "Path of Command", description: "At the start of your Command phase, if this model is your Warlord, gain 1CP." }
      ],
      stats: {
        movement: "7\"",
        toughness: 3,
        save: "3+",
        wounds: 4,
        leadership: "6+",
        oc: 1
      },
      weapons: {
        melee: [{ name: "Star Glaive", range: "Melee", attacks: 5, ws: "3+", strength: 6, ap: -2, damage: 2 }],
        ranged: [{ name: "Shuriken Pistol", range: "12\"", attacks: 1, bs: "2+", strength: 4, ap: -1, damage: 1 }]
      }
    },
    { 
      name: 'Farseer', 
      points: 120,
      abilities: [
        { name: "Branching Fates", description: "Once per turn, use a Fate dice to substitute a roll made for a model in this unit." }
      ],
      stats: {
        movement: "7\"",
        toughness: 3,
        save: "6+",
        wounds: 4,
        leadership: "6+",
        oc: 1
      },
      weapons: {
        melee: [{ name: "Witchblade", range: "Melee", attacks: 2, ws: "3+", strength: 3, ap: 0, damage: 2, keywords: ["Anti-Infantry 2+"] }],
        ranged: [{ name: "Shuriken Pistol", range: "12\"", attacks: 1, bs: "2+", strength: 4, ap: -1, damage: 1 }]
      }
    }
  ],
  'Battleline': [
    { 
      name: 'Guardian Defenders', 
      points: 100,
      abilities: [
        { name: "Defense Tactics", description: "Guardian Defenders may re-roll failed hit rolls while in cover." }
      ],
      stats: {
        movement: "7\"",
        toughness: 3,
        save: "5+",
        wounds: 1,
        leadership: "7+",
        oc: 1
      },
      weapons: {
        melee: [{ name: "Close Combat Weapon", range: "Melee", attacks: 1, ws: "4+", strength: 3, ap: 0, damage: 1 }],
        ranged: [{ name: "Shuriken Catapult", range: "18\"", attacks: 2, bs: "4+", strength: 4, ap: 0, damage: 1 }]
      }
    },
    { 
      name: 'Storm Guardians', 
      points: 110,
      abilities: [
        { name: "Fury of the Storm", description: "Gain +1 Attack on the charge." }
      ],
      stats: {
        movement: "7\"",
        toughness: 3,
        save: "5+",
        wounds: 1,
        leadership: "7+",
        oc: 1
      },
      weapons: {
        melee: [{ name: "Chainsword", range: "Melee", attacks: 1, ws: "4+", strength: 3, ap: 0, damage: 1 }],
        ranged: [{ name: "Shuriken Pistol", range: "12\"", attacks: 1, bs: "4+", strength: 4, ap: 0, damage: 1 }]
      }
    }
  ],
  'Vehicle': [
    { 
      name: 'Wave Serpent', 
      points: 130,
      abilities: [
        { name: "Serpent Shield", description: "Once per game, Wave Serpent can absorb damage and negate one attack." }
      ],
      stats: {
        movement: "12\"",
        toughness: 7,
        save: "3+",
        wounds: 12,
        leadership: "6+",
        oc: 3
      },
      weapons: {
        ranged: [{ name: "Twin Shuriken Cannon", range: "24\"", attacks: 3, bs: "3+", strength: 6, ap: -1, damage: 2 }]
      }
    },
    { 
      name: 'Fire Prism', 
      points: 140,
      abilities: [
        { name: "Prismatic Cannon", description: "Can fire either a focused lance shot or a dispersed blast." }
      ],
      stats: {
        movement: "12\"",
        toughness: 7,
        save: "3+",
        wounds: 12,
        leadership: "6+",
        oc: 3
      },
      weapons: {
        ranged: [{ name: "Prismatic Cannon", range: "36\"", attacks: 1, bs: "3+", strength: 14, ap: -5, damage: "D6" }]
      }
    }
  ],
  'Fortification': [
    { 
      name: 'Bastion', 
      points: 150,
      abilities: [
        { name: "Defensive Walls", description: "Provides cover and an additional save to units within." }
      ],
      stats: {
        toughness: 8,
        save: "2+",
        wounds: 20,
        oc: 0
      },
      weapons: {
        ranged: [{ name: "Heavy Bolter", range: "36\"", attacks: 3, bs: "4+", strength: 5, ap: -1, damage: 1 }]
      }
    },
    { 
      name: 'Defense Wall', 
      points: 80,
      abilities: [
        { name: "Fortified Position", description: "Units behind the Defense Wall gain +1 to cover saves." }
      ],
      stats: {
        toughness: 8,
        save: "3+",
        wounds: 15,
        oc: 0
      },
      weapons: {
        ranged: [{ name: "Twin Autocannon", range: "48\"", attacks: 4, bs: "4+", strength: 7, ap: -1, damage: 2 }]
      }
    }
  ],
  'Allied Units': [
    { 
      name: 'Ally Unit A', 
      points: 90,
      abilities: [
        { name: "Reinforcement", description: "Can be summoned once per battle as reinforcements." }
      ],
      stats: {
        movement: "6\"",
        toughness: 4,
        save: "4+",
        wounds: 3,
        leadership: "7+",
        oc: 1
      },
      weapons: {
        ranged: [{ name: "Bolter", range: "24\"", attacks: 1, bs: "4+", strength: 4, ap: 0, damage: 1 }]
      }
    },
    { 
      name: 'Ally Unit B', 
      points: 95,
      abilities: [
        { name: "Cover Specialist", description: "This unit gains additional defense when in cover." }
      ],
      stats: {
        movement: "6\"",
        toughness: 4,
        save: "4+",
        wounds: 3,
        leadership: "7+",
        oc: 1
      },
      weapons: {
        ranged: [{ name: "Sniper Rifle", range: "36\"", attacks: 1, bs: "3+", strength: 5, ap: -2, damage: 2 }]
      }
    }
  ]
};
