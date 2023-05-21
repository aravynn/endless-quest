import React from 'react';

//global game data.
//import {dice, weapons, armors, classes, races, monsters} from 'gamedata';
import {monsters, furniture, classes, races} from './gamedata';
import {TurnControl} from './turncontrol';

// globally required for the map size.
const mapSquare = 37;



class EndlessApp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            gameStart : true,   // define what screen to load.
            player : [
                {x : 1, y: 14, playerName: '1', Race: 0, Class: 0, action: 1},
                {x : 2, y: 14, playerName: '2', Race: 1, Class: 1, action: 1},
                {x : 1, y: 15, playerName: '3', Race: 2, Class: 2, action: 1},
                {x : 2, y: 15, playerName: '4', Race: 3, Class: 3, action: 1},
                {x:-1,  y: -1, playerName: 'Z'}
            ],
            currentPlayer : 0,
            gameMap : {
                // build as checking right and down for if a space is in a room. 
                //if it is, we'll make a wall.
                width : 26,
                height : 19,
                rooms : [ // defined as x,y,w,h. All assume walls without thickness.
                    {x : 1, y : 1, w: 4, h: 3},
                    {x : 5, y : 1, w: 4, h: 3},
                    {x : 9, y : 1, w: 3, h: 5},
                    {x : 1, y : 4, w: 4, h: 5},
                    {x : 5, y : 4, w: 4, h: 5},
                    
                    {x : 14, y : 1, w: 3, h: 5},
                    {x : 17, y : 1, w: 4, h: 4},
                    {x : 21, y : 1, w: 4, h: 4},
                    {x : 17, y : 5, w: 4, h: 4},
                    {x : 21, y : 5, w: 4, h: 4},

                    {x : 1, y : 10, w: 4, h: 4},
                    {x : 5, y : 10, w: 2, h: 3},
                    {x : 7, y : 10, w: 2, h: 3},
                    {x : 1, y : 14, w: 4, h: 4},
                    {x : 5, y : 13, w: 4, h: 5},
                    {x : 9, y : 13, w: 3, h: 5},

                    {x : 17, y : 10, w: 4, h: 4},
                    {x : 21, y : 10, w: 4, h: 4},
                    {x : 18, y : 14, w: 3, h: 4},
                    {x : 21, y : 14, w: 4, h: 4},
                    {x : 14, y : 13, w: 4, h: 5},

                    {x : 10, y : 7, w: 6, h: 5},


                ],
                furniture : [ // includes traps & secrets
                    {x: 0, y: 1, type: "wallSquare", rotate: "n"},
                    {x: 17, y: 9, type: "wallSquare", rotate: "n"},
                    {x: 14, y: 18, type: "wallSquare", rotate: "n"},
                    {x: 12, y: 5, type: "wallRect", rotate: "n"},
                    {x: 10, y: 1, type: "crypt", rotate: "w"},
                    {x: 1, y: 5, type: "desk", rotate: "e"},
                    {x: 6, y: 5, type: "table", rotate: "n"},
                    {x: 10, y: 5, type: "chest", rotate: "n"},
                    {x: 12, y: 7, type: "firePlace", rotate: "s"},
                    {x: 11, y: 7, type: "chest", rotate: "s"},
                    {x: 10, y: 8, type: "throne", rotate: "e"},
                    {x: 11, y: 9, type: "table", rotate: "n"},
                    {x: 3, y: 10, type: "tortureTable", rotate: "e"},
                    {x: 5, y: 13, type: "bookShelf", rotate: "s"},
                    {x: 15, y: 13, type: "cabinet", rotate: "s"},
                    {x: 1, y: 14, type: "stairs", rotate: "n"},
                    {x: 5, y: 15, type: "alchemyBench", rotate: "e"},
                    {x: 11, y: 15, type: "weaponRack", rotate: "w"},
                    {x: 17, y: 16, type: "chest", rotate: "w"},
                    {x: 15, y: 17, type: "bookShelf", rotate: "n"}, 
                ],
                door : [
                    // as position1, position2
                    {x1: 4, y1: 2, x2: 5, y2: 2},
                    {x1: 8, y1: 2, x2: 9, y2: 2},
                    {x1: 3, y1: 3, x2: 3, y2: 4},
                    {x1: 3, y1: 8, x2: 3, y2: 9},
                    {x1: 7, y1: 8, x2: 7, y2: 9},
                    {x1: 15, y1: 9, x2: 16, y2: 9},
                    {x1: 0, y1: 11, x2: 1, y2: 11},

                    {x1: 10, y1: 12, x2: 10, y2: 13},
                    {x1: 8, y1: 15, x2: 9, y2: 15},
                    {x1: 13, y1: 15, x2: 14, y2: 15},
                    {x1: 3, y1: 17, x2: 3, y2: 18},
                    {x1: 7, y1: 17, x2: 7, y2: 18},



                ],
                creatures : [
                    {group: "Undead", level: 0, x: 2, y: 2 },
                    {group: "Undead", level: 0, x: 3, y: 2},
                    {group: "Undead", level: 1, x: 6, y: 1},
                    {group: "Undead", level: 2, x: 6, y: 2},
                    {group: "Undead", level: 1, x: 6, y: 3},
                    {group: "Undead", level: 0, x: 9, y: 1},
                    {group: "Undead", level: 0, x: 9, y: 3},
                    {group: "Undead", level: 2, x: 9, y: 4},
                    {group: "Beasts", level: 0, x: 3, y: 6},
                    {group: "Beasts", level: 1, x: 4, y: 5},
                    {group: "Beasts", level: 0, x: 6, y: 7},
                    {group: "Beasts", level: 0, x: 7, y: 7},
                    {group: "Chaos",  level: 3, x: 12, y: 8},
                    {group: "Beasts", level: 1, x: 14, y: 8},
                    {group: "Beasts", level: 1, x: 11, y: 11},
                    {group: "Chaos",  level: 2, x: 14, y:11},
                    {group: "Beasts", level: 0, x: 2, y: 11},
                    {group: "Beasts", level: 1, x: 2, y: 12},
                    {group: "Beasts", level: 1, x: 7, y: 14},
                    {group: "Beasts", level: 1, x: 8, y: 15},
                    {group: "Beasts", level: 0, x: 10, y: 14},
                    {group: "Beasts", level: 2, x: 10, y: 16},
                    {group: "Chaos",  level: 2, x: 16, y: 15},
                    {group: "Chaos",  level: 2, x: 15, y: 16},


                ],
                compMap : [
                    // this map quick-defines the room number for every area,
                    // to determine rooms and walls.
                    
                ],
                wallMap : [
                    // this map targets positioning of all walls and doors. 
                    // -1 will indicate wall
                    // +1 indicates door, probably overidden at the oject phase.
                    // each element is an object of up to 8 elements n ne e se s sw w nw
                    // most elements only apply e, se, s, the remainder calculated by other spots.
                    // this map used later for calculating movement
                ],
                imap : [
                    // this map hold all toggles for interaction
                    // includes traps, doors, secret doors etc.
                    // as well as interactive creatures or chests
                ],
                stepmap : [
                    // false or -1 is no move,
                    // 0+ is movable.
                ]

            }
        };

        
    }

    componentDidMount() {
        // compile the map to determine the most effective display. 
        let mapping = this.state.gameMap;

        mapping.compMap = Array(mapping.height);
        mapping.wallMap = Array(mapping.height);

        for(let y = 0; y < mapping.height; y++){
            mapping.compMap[y] = Array(mapping.width).fill(-1); // -1 is nothing.
            mapping.wallMap[y] = Array(mapping.width);
        }
        
        mapping.rooms.forEach((data, index) => {
            
            for(let y = data.y; y < data.y + data.h; y++){
                for(let x = data.x; x < data.x + data.w; x++){
                    if(y < mapping.height && x < mapping.width){
                        mapping.compMap[y][x] = index;
                        // imap has no interaction here, though compmap is used in tandem.
                    }
                }
            }
            
        });

        // wall map

        for(let y = 0; y < mapping.height; y++){
            for(let x = 0; x < mapping.width; x++){
                // for now, only apply walls, we'll figure out corners later -----!
                mapping.wallMap[y][x] = {
                    n: y === 0 ? -1 : 0, //(y-1 !== -1 && mapping.compMap[y-1][x] && !== mapping.compMap[y][x] ? -1 : 0), 
                    e: (x+1 === mapping.width || mapping.compMap[y][x+1] !== mapping.compMap[y][x] ? -1 : 0),  
                    s: (y+1 === mapping.height || mapping.compMap[y+1][x] !== mapping.compMap[y][x] ? -1 : 0), 
                    w: x === 0 ? -1 : 0, //(x-1 !== -1 && mapping.compMap[y][x-1] !== mapping.compMap[y][x] ? -1 : 0), 
                    ne: (y === 0 && x === mapping.width-1) ? -1 : 0,
                    se: (y === mapping.height-1 && x === mapping.width-1) ||
                        (
                            x !== mapping.width-1 && 
                            y !== mapping.height-1 && 
                            this.quadCompare(
                                mapping.compMap[y][x],
                                mapping.compMap[y][x+1],
                                mapping.compMap[y+1][x+1],
                                mapping.compMap[y+1][x]
                            )
                        )
                        ? -1 : 0,
                    sw: (y === mapping.height-1 && x === 0) ? -1 : 0, 
                    nw: (y === 0 && x === 0) ? -1 : 0,
                    f: -1 // reference to furniture #
                };         
            }
        }
        
        // doors
        mapping.door.forEach((d, i) => {
            // assign door after determining Xand Y for WHERE door is.
            
            if(d.x1 < d.x2){
                mapping.wallMap[d.y1][d.x1].e = 1;
            }else if(d.x1 > d.x2){
                mapping.wallMap[d.y2][d.x2].e = 1;
            } else {
                // vertical
                if(d.y1 < d.y2){
                    mapping.wallMap[d.y1][d.x1].s = 1;
                } else {
                    mapping.wallMap[d.y2][d.x2].s = 1;
                }
            }
        });
        
        // map objects
        mapping.furniture.forEach((data, index) => {
            // x, y, type, rotate
            mapping.wallMap[data.y][data.x].f = data;
            
        });

        mapping.imap = this.createIMap();

        this.setPlayerDefaults();

        // clickmap generation, temp for now.
        mapping.stepmap = this.findPath(
                this.state.player[this.state.currentPlayer].y, 
                this.state.player[this.state.currentPlayer].x, 
                this.state.player[this.state.currentPlayer].stepsRemain, 
                mapping.imap, 
                mapping.compMap
            );

        this.setState({
            gameMap : mapping    
        });

        // set the defaults for creature statistics
        this.setMonsterDefaults();
        

    }

    componentDidUpdate() {
        if( this.state.player[this.state.currentPlayer].playerName === 'Z'){
            // monsters turn. 
            
            // move us to the next turn.
            let currentPlayer = this.state.currentPlayer;
            
        //    alert(stepsRemain);

            if(this.state.player[currentPlayer].playerName === 'Z'){
                currentPlayer = 0;
            } else { 
                currentPlayer++;
            }
            this.setState({currentPlayer : currentPlayer});

            let speed = this.state.player[currentPlayer].Speed;

            
            let mapping = this.state.gameMap;

            let players = this.state.player;
            players[currentPlayer].stepsRemain = speed;
            this.setState({player : players});
            

            // clickmap generation, temp for now.
            mapping.stepmap = this.findPath(this.state.player[currentPlayer].y, this.state.player[currentPlayer].x, speed, mapping.imap, mapping.compMap);

            this.setState({
                gameMap : mapping    
            });
        }
    }

    createIMap = () => {
        // NEEDS TO BE FIXED AND IMPLEMENTED----------------------------------------------------------------!!
        // externally generate the iMap we'll use for interaction. updates on each move.
        let mapping = this.state.gameMap;
        let imap = Array(mapping.height);

        for(let y = 0; y < mapping.height; y++){
            imap[y] = Array(mapping.width).fill(0); // 0 is for movable.
        }
        
        // doors
        mapping.door.forEach((d, i) => {
            // assign door after determining Xand Y for WHERE door is.
            imap[d.y1][d.x1] = {type: "door", number: i, used: false, pair: [d.y2, d.x2]};
            imap[d.y2][d.x2] = {type: "door", number: i, used: false, pair: [d.y1, d.x1]};
            
        });
        
        // map objects
        mapping.furniture.forEach((data, index) => {
            // imap more complicated here. for impassible object
            // that have no interaction we need to set as -1
            // everything else is set as array for number etc.
            let f = furniture[data.type];
            let h = f.h;
            let w = f.w;
            if(data.rotate === "e" || data.rotate === "w"){
                // swap width/height
                let d = h;
                h = w;
                w = d;
            }
            for(let y = data.y; y < data.y + h; y++){
                for(let x = data.x; x < data.x + w; x++){
                    if(f.blockMove){
                        imap[y][x] = -1; // inactive, blocked.
                    } else {
                        //interaction
                        imap[y][x] = {type: "furniture", number: index, used: false, pair: false};
                    }
                }
            }

        });

        // map creatures, heros to imap
        mapping.creatures.forEach((d, i) => {
            imap[d.y][d.x] = {type: "monster", number: i, used: false, pair: false};
        });

        // heros
        this.state.player.forEach((d, i) =>{
            if(d.playerName !== 'Z'){
                imap[d.y][d.x] = {type: "hero", number: i, used: false, pair: false};
            }
        });

        return imap;

    }

    setMonsterDefaults = () => {
        let creatures = this.state.gameMap.creatures;

        creatures.forEach((creature, index) => {
            
            let monsterStat;

            switch(creature.group){
                case 'Beasts':
                    monsterStat = monsters.Beasts[creature.level];
                    break;
                case 'Undead':
                    monsterStat = monsters.Undead[creature.level];
                    break;
                case 'Chaos':
                    monsterStat = monsters.Chaos[creature.level];
                    break;
                case 'Boss':
                    monsterStat = monsters.Boss[creature.level];
                    break;
                default:
                    alert("Error: Cannot find monster group " + creature.group);
                    break;
            }

            monsters[index] = {
                group: creature.group, 
                level: creature.level, 
                x: creature.x, 
                y: creature.y,
                visible: false,
                BP: monsterStat.body,
                MP: monsterStat.mind
            }
        });

        this.setState({creatures: creatures});

    }

    // set defaults for body, mind, speed, stepsRemain
    setPlayerDefaults = () => {
        let players = this.state.player;

        players.forEach((player, index) => {
            if(player.playerName === 'Z') {
                players[index] = player;
            } else {
                let raceStat = races[player.Race];
                let classStat = classes[player.Class]; 

                players[index] = {
                    x : player.x, 
                    y: player.y, 
                    playerName: player.playerName, 
                    Race: player.Race, 
                    Class: player.Class,
                    BP: raceStat.body + classStat.body,
                    MP: raceStat.mind + classStat.mind,
                    Speed: raceStat.speed + classStat.speed,
                    stepsRemain: raceStat.speed + classStat.speed,
                    BPRemain: raceStat.body + classStat.body,
                    MPRemain: raceStat.mind + classStat.mind,
                    action: 1
                };
            }
        });

        this.setState({player: players});
    }

    quadCompare = (a,b,c,d) => {
        // check and return a bool for all 4 values, looking for a single odd value.
        const arr = [a,b,c,d];
        for(let i = 0; i < 4; i++){
            if(arr.filter(x => x===arr[i]).length === 1){
                return true;
            }
        }
        return false;
    }

    findPath = (y,x, distance, imap, cmap) => {
        // y,x is origin, distance max manhattan distance 
        //alert(imap);

        let h = this.state.gameMap.height;
        let w = this.state.gameMap.width;
        let checkedSpaces = Array(h);
        for(let i = 0; i < h; i++){
            checkedSpaces[i] = Array(w).fill(false);
        }

        // default(main) space is obviously seen.
        //checkedSpaces[y][x] = 0; // distance from point.
        //let imap = this.state.gameMap.imap.splice(); // copy map for manipulation
        let checkQueue = [
            {y:y,x:x,dist:0}
        ]; // fill with surrounding values.
        while(checkQueue.length > 0){
            const v = checkQueue.shift(); // get first element of array.
            
            if( this.checkBounds(v.y, v.x) ){
                if(checkedSpaces[v.y][v.x] === false){
                    // this space isn't checked, we'll mark it and if below add to the imap.
                    if(v.dist < distance){
                        checkedSpaces[v.y][v.x] = v.dist;

                        const l = [
                            {y:v.y+1, x:v.x},
                            {y:v.y,   x:v.x+1},
                            {y:v.y-1, x:v.x},
                            {y:v.y,   x:v.x-1},
                        ];

                        l.forEach((d,i) => {
                            if(this.checkBounds(d.y,d.x) && 
                            this.checkValidSpace(d.y,d.x, imap[d.y][d.x]) &&
                            (
                                cmap[v.y][v.x] === cmap[d.y][d.x] || 
                                imap[d.y][d.x].type === 'door'
                            )
                            ){
                                checkQueue.push({y:d.y, x:d.x, dist: v.dist+1});
                            }    
                        });
                        
                    } else { 
                        // outside range
                        checkedSpaces[v.y][v.x] = -1; // not to be marked
                    }
                } else {
                    // this space was already checked.
                    if(checkedSpaces[v.y][v.x] !== -1 && checkedSpaces[v.y][v.x] > v.dist){
                        checkedSpaces[v.y][v.x] = v.dist;
                        if(this.checkBounds(v.y+1,v.x) && this.checkValidSpace(v.y+1, v.x, imap[v.y+1][v.x])){
                            checkQueue.push({y:v.y+1, x:v.x, dist: v.dist+1});
                        }
                        if(this.checkBounds(v.y,v.x+1) && this.checkValidSpace(v.y, v.x+1, imap[v.y][v.x+1])){
                            checkQueue.push({y:v.y, x:v.x+1, dist: v.dist+1});
                        }
                        if(this.checkBounds(v.y-1,v.x) && this.checkValidSpace(v.y-1, v.x, imap[v.y-1][v.x])){
                            checkQueue.push({y:v.y-1, x:v.x, dist: v.dist+1});
                        }
                        if(this.checkBounds(v.y,v.x-1) && this.checkValidSpace(v.y, v.x-1, imap[v.y][v.x-1])){
                            checkQueue.push({y:v.y, x:v.x-1, dist: v.dist+1});
                        }
                    }
                }
            }
        }

        return checkedSpaces;
    }

    checkBounds(y,x){
        return y >= 0 && x >= 0 &&
            y < this.state.gameMap.height &&
            x < this.state.gameMap.width;
    }

    checkValidSpace = (y,x, space) => {
        if(this.checkBounds(y,x)){
            if(space === 0){
                return true;
            } else if(space === -1){
                return false;
            } else {
                // more complicated, space is an object, case time.
                switch(space.type){
                    // door hero monster furniture(event)
                    case 'door':
                    case 'hero':
                        return true;
                    default:
                    case 'monster':
                        return false;
                    case 'furniture':
                        // -------------------------------------------------------------!!
                        return false;//!furniture[space.number].blockMove;
                }
            }
        }
        return false;
    }

    spaceClick = (x,y,rem) =>{
    //   alert(x + ' ' + y + ' ' + rem);
        let players = this.state.player;
        let currentPlayer = this.state.currentPlayer;

        //let oldPos = {y: players[currentPlayer].y, x: players[currentPlayer].x}

        // set player position
        players[currentPlayer].x = x;
        players[currentPlayer].y = y;

        this.setState({player : players});

        // set imap position
        let gameMap = this.state.gameMap;

        //gameMap.imap[y][x] = {type: "hero", number: currentPlayer, used: false, pair: false};
        //gameMap.imap[oldPos.y][oldPos.x] = 0;

        gameMap.imap = this.createIMap();

        this.setState({gameMap: gameMap});

        this.nextTurnClick(rem); 

    }
    
    nextTurnClick = (steps) => {
        let currentPlayer = this.state.currentPlayer;
        let stepsRemain = this.state.player[currentPlayer].stepsRemain - steps;
        
        let actionsRemain = this.state.player[currentPlayer].action;

        if(steps < 0){
            stepsRemain = 1;
        }

    //    alert(stepsRemain);

        if((stepsRemain === 1 || isNaN(stepsRemain)) && actionsRemain < 1 ){
            if(this.state.player[currentPlayer].playerName === 'Z'){
                currentPlayer = 0;
            } else { 
                currentPlayer++;
            }
            this.setState({currentPlayer : currentPlayer});
        }
        let mapping = this.state.gameMap;

        let speed = this.state.player[currentPlayer].Speed;

        if(stepsRemain <= 1 && actionsRemain < 1){
            stepsRemain = speed;
            actionsRemain = 1;
        }

        // reset steps left for player.
        if( !isNaN(stepsRemain) ){
            let players = this.state.player;
            players[currentPlayer].stepsRemain = stepsRemain;
            
            // we need to reset actions for next player.
            players[currentPlayer].action = actionsRemain;

            this.setState({player : players});
        }

        // clickmap generation, temp for now.
        mapping.stepmap = this.findPath(this.state.player[currentPlayer].y, this.state.player[currentPlayer].x, stepsRemain, mapping.imap, mapping.compMap);

        this.setState({
            gameMap : mapping    
        });
    }

    attackClick = () => {
        this.useAction();
        alert ("Attack");
    }

    spellClick = () => {
        this.useAction();
        alert ("Cast Spell");
    }

    itemClick = () => {
        this.useAction();
        alert ("Use Item");
    }

    searchRoomClick = () => {
        this.useAction();
        alert ("Search Room");
    }

    moveClick = () => {
        alert ("Moving");
    }

    useAction = () => {
        let players = this.state.player;
        let currentPlayer = this.state.currentPlayer;

        players[currentPlayer].action -= 1;

        this.setState({player: players});

        this.nextTurnClick(0);
    }

    render(){
        return(
            <>
                <div>
                    <Map
                        ground={this.state.gameMap.compMap}
                        walls={this.state.gameMap.wallMap}
                        objects={this.state.gameMap.furniture}
                        creatures={this.state.gameMap.creatures}
                        //spaceCallback={(x,y) => this.spaceClick(x,y)}
                        heros={this.state.player}
                    />
                    <ClickMap 
                        ground={this.state.gameMap.imap}
                        stepMap={this.state.gameMap.stepmap}
                        spaceCallback={(x,y,rem) => this.spaceClick(x,y,rem)}
                    />
                    
                </div>
                <TurnControl 
                    playerID = {this.state.player[this.state.currentPlayer].playerName}
                    EndTurnCallback = {(rem) => this.nextTurnClick(rem)}
                    MoveCallback={() => this.moveClick()}
                    AttackCallback={() => this.attackClick()}
                    SpellCallback={() => this.spellClick()}
                    UseItemCallback={() => this.itemClick()}
                    SearchCallback={() => this.searchRoomClick()}
                    stepsRemain={this.state.player[this.state.currentPlayer].stepsRemain}
                    actionsRemain={this.state.player[this.state.currentPlayer].action} 
                />
            </>
        );
    }
}

function ClickMap(props){
    
    const groundMap = props.ground.map((data, y) =>{
        const row = data.map((d, x) => {
            let c='';
            let steppable = false;
            let dist = 0;
            if(d === 0){
                c = 'white hideColor';
            } else if(d === -1){
                c = 'black';
            } else {
                switch(d.type){
                    case 'monster':
                        c = 'red';
                        break;
                    case 'door':
                        c = 'yellow hideColor';
                        break;
                    case 'hero':
                        c = 'green hideColor';
                        break;
                    case 'furniture':
                        c = 'blue hideColor';
                        break;
                    default: 
                        c = 'grey';
                        break;
                }
            }
            if(props.stepMap[y][x] !== false && props.stepMap[y][x] !== -1 && d.type !== 'hero'){
                c = 'orange';
                steppable = true;
                dist = props.stepMap[y][x];
            }
            return(
                <ClickSquare
                    key={y + '-' + x}
                    className={c}
                    callback={(x,y,rem) => props.spaceCallback(x,y,rem)}
                    steppable = {steppable}
                    x={x}
                    y={y}
                    rem={dist}
                />
            );
        });
        
        return(
            <div 
            key={y}
            className="clickMapRow">
                {row}
            </div>
        );
    });


    return(
        <div className="clickFullMap">{groundMap}</div>
    );
}

function ClickSquare(props){
    if(props.steppable){
        return(
            <div 
                className={"clickSpace " + props.className}
                onClick={(x,y,rem) => props.callback(props.x, props.y, props.rem)}
            />
        );
    }
    else {
        return(
            <div 
                className={"clickSpace " + props.className}
            />
        );
    }

}

function Map(props){
    
    const groundMap = props.ground.map((data, y) =>{
        const row = data.map((d, x) => {
            return(
                <Square
                    key={y + '-' + x}
                    className="space"
                    wall={props.walls[y][x]}
                    //callback={(x,y) => props.spaceCallback(x,y)}
                    val={d}
                    x={x}
                    y={y}
                />
            );
        });
        
        return(
            <div 
            key={y}
            className="mapRow">
                {row}
            </div>
        );
    });

    let creatures = props.creatures.map((d, i) =>{
        const style={
            top: mapSquare * d.y,
            left: mapSquare * d.x,
        };
        
        return(
            <Monster 
                key={"monster" + i}
                name={monsters[d.group][d.level].name}
                style={style}
            />
        );

    });

    props.heros.forEach((d, i) => {
        const style={
            top: mapSquare * d.y,
            left: mapSquare * d.x,
        };

        creatures.push(
            <Hero 
                key={"monster" + i}
                style={style}
                id={i}
            />);
    });

    return(
        <div className="fullMap">{groundMap}{creatures}</div>
    );
}

function Square(props){
    let walls = [];
    if(props.wall.n === -1){
        walls.push(<Wall className={"north"} />);
    }
    if(props.wall.e === -1){
        walls.push(<Wall className={"east"} />);    
    }
    if(props.wall.e === 1){
        walls.push(<Door className={"east"} />);    
    }
    if(props.wall.s === -1){
        walls.push(<Wall className={"south"} />);
    }
    if(props.wall.s === 1){
        walls.push(<Door className={"south"} />);
    }
    if(props.wall.w === -1){
        walls.push(<Wall className={"west"} />);
    }

    if(props.wall.nw === -1){
        walls.push(<WallCorner className={"nw"} />);
    }
    if(props.wall.sw === -1){
        walls.push(<WallCorner className={"sw"} />);
    }
    if(props.wall.ne === -1){
        walls.push(<WallCorner className={"ne"} />);
    }
    if(props.wall.se === -1){
        walls.push(<WallCorner className={"se"} />);
    }

    if(props.wall.f !== -1){
        const data = props.wall.f;

        walls.push(<Furniture 
            className={
                data.rotate + 
                " w" + furniture[data.type].w + 
                " h" + furniture[data.type].h
            } 
            x={data.x}
            y={data.y}
            />
        );
    }

    return(
        <div 
            className={"space " + props.className}
            //onClick={(x,y) => props.callback(props.x, props.y)}
        >
            {props.val}
            {walls}
        </div>
    );
}

function Wall(props){
    return(
        <div 
            className={"wall " + props.className}
        />
    )
}

function WallCorner(props){
    return(
        <div 
            className={"wallCorner " + props.className}
        />
    )
}

function Door(props){
    return(
        <div 
            className={"door " + props.className}
        />
    )
}

function Furniture(props){
    // TEMP FUNCTION
    return(
        <div 
            className={"furniture " + props.className}
        />
    )
}

function Monster(props){
    // TEMP FUNCTION
    return(
        <div 
            className={"monster " + props.className}
            style={props.style}
        >
            {props.name.substring(0,2)}
        </div>
    )
}

function Hero(props){
    // TEMP FUNCTION
    return(
        <div 
            className={"hero " + props.className}
            style={props.style}
        >
            {props.id +1}
        </div>
    )
}

export {EndlessApp};