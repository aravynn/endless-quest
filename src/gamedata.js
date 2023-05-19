// dice as {fa}

// magic weapons, come in lesser and greater
// lesser add 1 cross sword, greater adds 2
// other special magic items have individual effects.

const dice = {
    faces : ["Black Shield", "Shield", "Shield", "Sword", "Sword", "Cross Swords"],
    icon : [], // for later use.
    playerAttVal : ["*", 0, 0, 1, 1, 2], // * is a point of damage to weapon.
    playerDefVal : ["*", 1, 1, 0, 0, 0], // * is a point of damage to armor
    enemyAttVal :  [  0, 0, 0, 1, 1, 2], // enemies get no bonuses or penalties on attack.
    enemyDefVal :  [  1, 0, 0, 0, 0, 0]  
};



const weapons = {
    Close : ["Dagger", "Warhammer", "Flail", "Longsword", "Greataxe"],
    Medium : ["Whip", "Staff", "Spear", "Halberd", "Glaive"], 
    Long : ["Sling", "Shortbow", "Longbow", "Crossbow", "Arbalest"],
    Ammo : ["Stones", "Arrows", "Arrows", "Bolts", "Bolts"],
    defaultDice : [1,2,3,4,5],   //  defined explicitly.
    bodyScore : [1,2,4,6,8] // min body required to use an item.
};

const armors = {
    type : ["Shield", "Robe", "Leather", "Chainmail", "Scalemail", "Platemail"],
    defaultDice : [1,2,3,4,5,6],
    bodyScore : [5,3,4,5,6,7]
};

const furniture = {
    // furniture for display on the main app. 
    wallSquare : {w: 1, h: 1, blockMove : true},
    wallRect : {w: 2, h: 1, blockMove : true},
    bookShelf : {w: 3, h: 1, blockMove : true},
    cabinet : {w: 3, h: 1, blockMove : true},
    firePlace : {w: 3, h: 1, blockMove : true},
    chest : {w: 1, h: 1, blockMove : true},
    table : {w: 3, h: 2, blockMove : true},
    desk : {w: 3, h: 2, blockMove : true},
    tortureTable : {w: 3, h: 2, blockMove : true},
    alchemyBench : {w: 3, h: 2, blockMove : true},
    crypt : {w: 3, h: 2, blockMove : true},
    throne : {w: 1, h: 1, blockMove : true},
    weaponRack : {w: 3, h: 1, blockMove : true}, 
    rocks : {w : 1, h : 1, blockMove : true},
    barrel : {w : 1, h : 1, blockMove : true},
    box : {w : 1, h : 1, blockMove : true},
    armorStand : {w : 1, h : 1, blockMove : true},
    statue : {w : 1, h : 1, blockMove : true},
    bed : {w : 2, h : 3, blockMove : true},
    brazier : {w : 1, h : 1, blockMove : true},
    
    stairs : {w : 2, h: 2, blockMove : false},
    pit : {w : 1, h: 1, blockMove : false, showDefault: false}
    // pit, secretdoor

    // can add:
    // barrel, box, armorStand, statue, bed/cot, brazier

};



const classes = [
    {name : "Fighter",  body : 6, mind : 2, armor : 2, speed: 2, weapon : {distance : "Close", level : 2}},   
        // +1 in close melee combat
    {name : "Mage",     body : 3, mind : 5, armor : 2, speed: 1, weapon : {distance : "Close", level : 1}},
        // large spell list, starts with 3 schools, recovers 3 per level
    {name : "Cleric",   body : 4, mind : 4, armor : 3, speed: 0, weapon : {distance : "Close", level : 2}},
        // healer/protection spell list, starts with heal school and abjuration school, recovers 2 per level
    {name : "Thief",    body : 5, mind : 3, armor : 2, speed: 4, weapon : {distance : "Long", level : 2}},
        // unlock locked doors or disarm traps 5/6
];

const races = [
    {name : "Human",    body : 1, mind : 1, speed : 7},
        // Versatile, act as +1 to mind and body when using equipment or learning spells 
    {name : "Elf",      body : 0, mind : 2, speed : 7},
        // small starting spell list, starts with nature list, recovers 1 / level
    {name : "Dwarf",    body : 2, mind : 0, speed : 5},
        // smithwork : weapons and armor ignore 1 point of wear from black shields
    {name : "Halfling", body : 1, mind : 1, speed : 9} 
        // draw extra "search" card
];

const monsters = {
    Beasts : [
        {name : "Goblin", speed : 10, attack: 2, defend : 1, body : 1, mind : 1},
        {name : "Orc",    speed : 8,  attack: 3, defend : 2, body : 1, mind : 2},
        {name : "Ogre",   speed : 6,  attack: 3, defend : 3, body : 2, mind : 3},
        {name : "Troll",  speed : 6,  attack: 5, defend : 3, body : 3, mind : 2},
        {name : "Giant",  speed : 5,  attack: 6, defend : 3, body : 4, mind : 4},
    ],
    Undead : [
        {name : "Skeleton", speed : 6, attack: 2, defend : 2, body : 1, mind : 0},
        {name : "Zombie",   speed : 5, attack: 2, defend : 3, body : 1, mind : 0},
        {name : "Mummy",    speed : 4, attack: 3, defend : 4, body : 2, mind : 0},
        {name : "Wraith",   speed : 7, attack: 3, defend : 5, body : 3, mind : 0},
        {name : "Lich",     speed : 6, attack: 3, defend : 6, body : 4, mind : 8},
    ],
    Chaos : [
        {name : "Cultist",  speed : 8, attack: 2, defend : 2, body : 1, mind : 4},
        {name : "Mage",     speed : 6, attack: 1, defend : 3, body : 2, mind : 7},
        {name : "Knight",   speed : 7, attack: 4, defend : 4, body : 3, mind : 3},
        {name : "Gargoyle", speed : 6, attack: 4, defend : 5, body : 3, mind : 4},
        {name : "Drake",    speed : 8, attack: 6, defend : 6, body : 4, mind : 6},
    ],
    Boss : [    // specialty monsters, seen only once. 
        {name : "Lich King", speed: 6, attack : 6, defend : 6, body : 6, mind: 10},
        {name : "Stone Golem", speed: 4, attack : 5, defend : 8, body : 7, mind: 0},
        {name : "Dragon", speed: 10, attack : 8, defend : 5, body : 6, mind: 6},
        {name : "Demon", speed: 8, attack : 7, defend : 7, body : 8, mind: 4},
    ]
};

const spells = {
    // each grouping will have 10 spells, 1 for each possible mind point. 
    // heros may not be able to get access to all spells, and the 
    // starting list is based on class for how high level they get.
    player : {
        Conjuration : [
            {name: "Teleport", effect : {}},    // within known areas
            {name: "Wall of Stone", effect : {}},   // 2 spaces
            {name: "Magic Ammo", effect : {}},    // 1 ranged weapon no ammo use for rest of level
        ],
        Evocation : [
            {name: "Fireball", effect : {}},    // 1 damage 3x3
            {name: "Lightning", effect : {}},   // 1 damage, all in line
            {name: "firebolt", effect : {}},    // 2 damage
        ],
        Divination : [
            {name: "Foresight", effect : {}},   // reroll rols for 1 turn, use best result
            {name: "Scrying", effect : {}},     // see contents of room 
            {name: "Locate", effect : {}},      // draw 3 treasure cards in room
        ],
        Illusion : [
            {name: "Invisibility", effect : {}},    // as spell
            {name: "Displacement", effect : {}},    // 50% miss chance
            {name: "False Hero", effect : {}},      // create 2 false heros, 1BP, 0MP, monsters perceve threat
        ],
        Transmutation : [
            {name: "Courage", effect : {}},         // as per spell
            {name: "Passwall", effect : {}},       // pass through walls, if no room in move your dead.
            {name: "Magic Weapon", effect : {}},    // +1 for level until damaged
        ],
        Necromancy : [
            {name: "Create Undead", effect : {}},  // target body, swords, skeleton, shields, zombie, black shield mummy
            {name: "Summon Wraith", effect : {}},  // attack a creature, raise a zombie, or clear all traps in room
            {name: "Steal Life", effect : {}},     // deal 1 damage, heal 3. 
        ],
        Enchantment : [
            {name: "Charm", effect : {}},   // target controlled for thier turn
            {name: "Sleep", effect : {}},   // target falls asleep until attacked
            {name: "Confuse", effect : {}}, // target randomly targets one of 6 nearest creatures
        ],
        Abjuration : [
            {name: "Magic Armor", effect : {}},    // +2 armor
            {name: "Fear", effect : {}},           // creature targeted only has 1 attack dice
            {name: "Dispell", effect : {}},        // as spell, or reaction to casting
        ],
        Healing : [
            {name: "Cure Wounds", effect : {}}, // heal 4
            {name: "Resurrect", effect : {}},   // 1 hero gains 2 life, back from dead
            {name: "Mass Heal", effect : {}},   // all heros gain 1 life
        ],
        Nature : [
            {name: "Water Of Life", effect : {}},   // as spell
            {name: "Entangle", effect : {}},   // Creature cannot move while in sight 
            {name: "Genie", effect : {}},       // as spell
        ],
        Chaos : [
            {name: "Summon Undead", effect : {}},
            {name: "Summon Beasts", effect : {}},
            {name: "Escape", effect : {}},
            {name: "Tempest", effect : {}},
            {name: "Command", effect : {}},
            {name: "Fear", effect : {}},
            {name: "Sleep", effect : {}},
            {name: "Firestorm", effect : {}},
            {name: "Ball of Flame", effect : {}},
            {name: "Rust", effect : {}},
            {name: "Cloud Of Chaos", effect : {}},
            {name: "Lightning Bolt", effect : {}},
            {name: "Dominate", effect : {}},
            {name: "Mind Blast", effect : {}},
            {name: "Mind Lock", effect : {}},
            // custom spells:
            
        ], 


    },
    monster : []
}

export {dice, weapons, armors, classes, races, monsters, spells, furniture};