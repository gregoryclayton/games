const TILE_KEY = {
    ' ': null,
    'G': { type: 'grass',    health: 6, maxHealth: 6, ricochetChance: 0, color: '#6A9E49' },
    'D': { type: 'dirt',     health: 6, maxHealth: 6, ricochetChance: 0, color: '#966A4A' },
    'X': { type: 'dirt',     health: 18, maxHealth: 18, ricochetChance: 0, color: '#6e4f37' },
    'P': { type: 'platform', health: 4, maxHealth: 4, ricochetChance: 0.1, color: '#C2B280' },
    'L': { type: 'glass',    health: 1, maxHealth: 1, ricochetChance: 0.05, color: 'lightblue' },
    'W': { type: 'wood',     health: 8, maxHealth: 8, ricochetChance: 0.1, color: '#A0522D' },
    'C': { type: 'concrete', health: 25, maxHealth: 25, ricochetChance: 0.4, color: '#808080' },
    'M': { type: 'metal',    health: 50, maxHealth: 50, ricochetChance: 0.8, color: '#A9A9A9' },
    'B': { type: 'beam',     health: 10, maxHealth: 10, ricochetChance: 0.1, color: '#736f6e' },
    'F': { type: 'gascan',   health: 2, maxHealth: 2, ricochetChance: 0.5, color: '#c00' },
};

const LEVEL_DATA = [
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "      S                                                                                                                                                                                                                                                         ",
    "                                                                                                                                                                                                                                                              ",
    "        3                                                                                                                                                                                                                                                       ",
    "                                                                                                                                                                                                                                                              ",
    "          4                                                                                                                                                                                                                                                     ",
    "                                                                                                                                                                                                                                                              ",
    "            5                                                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                                                              ",
    "   6                                                                                                                                                                                                                                                            ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "                                                                                                                                                                                                                                                              ",
    "      X                                                                                                                                                                                                                                                       ",
    "      X                                                                                                                                                                                                                                                       ",
    "      X         PP                                                                                                                                                                                                                                              ",
    "      X                                                                                                                                                                                                                                                       ",
    "      X                                   C                                                                                                                                                                   XXXXXXXXXXXXXXXXX                           ",
    "      X           PP                        C C                                                                                                                                                               X             X                           ",
    "      X                                                                                     XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                                                 X        R    X                           ",
    "      X                                                                                     X                               X                                                                                 X       R     X                           ",
    "      X             PP                                                                      X                               X                                                                                 X      R H    X                           ",
    "      X                                                                                     X              V                X                                                                                 X             X                           ",
    "      X                                   1    2                                            X                               X                                                                                 X      S      X                           ",
    "      X               PP                                                                    X                               X                                                                                 X             X                           ",
    "      X                                                                                     X                               X                                                                                 X             X                           ",
    "      X                                                                                     X                               X                                                                                 X             X                           ",
    "      X                 PP                                                                  X                               X                                                                                 XXXXXXXXXXXXXXXXX                           ",
    "GGGGGGXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
];

// This function creates the ENTITY_KEY object, which maps level characters to spawn functions.
// It requires the game's context (class definitions, state variables) to be passed in.
function getEntityKey(context) {
    const { TILE_SIZE, gameDifficulty, playerTeam, cops, criminals, chairs, pickups } = context;
    
    // These functions need to modify the game's state (e.g., push to the 'cops' array).
    return {
        'C': (x, y) => {
            const p = new Player(x, y, TILE_SIZE, 'green', true, false, false, gameDifficulty);
            // Check if this should be the player character.
            if (playerTeam === 'cops' && !context.player) {
                p.isPlayer = true; p.color = 'darkblue'; context.player = p;
            }
            cops.push(p);
        },
        'R': (x, y) => {
            const p = new Player(x, y, TILE_SIZE, 'red', false, true, false, gameDifficulty);
            if (playerTeam === 'criminals' && !context.player) {
                p.isPlayer = true; p.color = 'darkred'; context.player = p;
            }
            criminals.push(p);
        },
        'H': (x, y) => { context.hostage = new Player(x, y, TILE_SIZE, 'yellow', false, false, true); },
        'V': (x, y) => { context.vehicle = new Vehicle(x, y, TILE_SIZE); },
        'S': (x, y) => { chairs.push(new Chair(x, y, TILE_SIZE)); },
        '1': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("Grenade", "ranged", 12, 70, 1, 0, 'grenade', 4, 4, 2), TILE_SIZE)),
        '2': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("Shotgun", "ranged", 2, 40, 3, 0.2, 'bullet', 8, 16, 6), TILE_SIZE)),
        '3': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("SMG", "ranged", 1, 5, 1, 0.1, 'bullet', 30, 60, 4), TILE_SIZE)),
        '4': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("Toaster", "throwable", 5, 50, 1, 0, 'toaster', 1, 1, 4), TILE_SIZE)),
        '5': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("Stun Grenade", "ranged", 0, 70, 1, 0, 'stun', 2, 2, 2), TILE_SIZE)),
        '6': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("Explosive Charge", "explosive", 15, 20, 1, 0, 'charge', 1, 1, 5), TILE_SIZE)),
        '7': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("Shield", "defense", 0, 0, 0, 0, 'none', 1, 1, 10), TILE_SIZE)),
        '8': (x, y) => pickups.push(new Pickup(x, y, 'weapon', new Weapon("Sniper", "ranged", 10, 120, 1, 0, 'bullet', 5, 10, 8), TILE_SIZE)),
        '9': (x, y) => pickups.push(new Pickup(x, y, 'ammo', 10, TILE_SIZE)),
    };
}
