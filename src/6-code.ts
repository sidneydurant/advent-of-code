import { map, location, Location } from './6-data';

console.log(JSON.stringify(location));
console.log(JSON.stringify(map));

var obstacleMap = JSON.parse(JSON.stringify(map));

// Then, until the guard leaves map:
//      take a step
//      update visitedLocations tracker

let done:boolean = false;

let myLocation = location;
let myMap = map;

while (!done) {
    try {
        myLocation = moveGuard(myMap, myLocation);
    } catch (error) {
        done = true;
    }
}

let visitedLocations = 0;
let obstacleLocations = 0;

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 'x' || map[y][x] === '+') {
            visitedLocations++;
        }
        // if (obstacleMap[y][x] === 'O') {
        //     obstacleLocations++;
        // }
    }
}

// console.log(JSON.stringify(map));
// console.log(visitedLocations);
// console.log(JSON.stringify(obstacleMap));
// console.log(obstacleLocations);


for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {

        console.log("temp");

        let tempLocation = JSON.parse(JSON.stringify(location));
        let tempMap = JSON.parse(JSON.stringify(myMap));
        tempMap[y][x] = "#";

        try {
            let steps = 0;
            while (steps < 16900*3/*16900*2*/) {
                tempLocation = moveGuard(tempMap, tempLocation);
                steps++;
            }
            // we exited loop, meaning we found a loop
            obstacleLocations++;
            //console.log(`x: ${x}, y: ${y}`);
        } catch (error) {
            // we exited map. noop
        }
    }
}

console.log(JSON.stringify(map));
console.log(visitedLocations);
console.log(JSON.stringify(obstacleMap));
console.log(obstacleLocations);


function moveGuard(map: string[][], location: Location): Location {
    
    // move guard to new location. If there is an obstacle, we will backtrack and turn right
    addBreadcrumb(map, location, 'x');
    let newLocation = stepForward(location);

    if (!withinBounds(map, newLocation)) {
        // we ran off the map, and are done
        throw new Error("Guard has left the map");
    }

    // backtrack and turn right if we hit obstacle
    if (map[newLocation.y][newLocation.x] === '#') {
        addBreadcrumb(map, location, '+');
        newLocation = turnRight(location);
    }

   //checkForLoop(map, newLocation); 

    return newLocation;
}

function moveGuardUntracked(map: string[][], location: Location): Location {
    
    // move guard to new location. If there is an obstacle, we will backtrack and turn right
    let newLocation = stepForward(location);

    if (!withinBounds(map, newLocation)) {
        // we ran off the map, and are done
        throw new Error("Guard has left the map");
    }

    // backtrack and turn right if we hit obstacle
    if (map[newLocation.y][newLocation.x] === '#') {
        newLocation = turnRight(location);
    }

    return newLocation;
}

function withinBounds(map:string[][], location:Location): boolean {
    return location.x >= 0 && location.y >= 0 && location.y < map.length && location.x < map[0].length;
}

// If there is ever a + followed by a # to the right of us, 
// then we know that adding an obstacle in front of us would work to create
// a loop. However we cannot simply increment a counter, because it may be 
// a spot that worked from a different direction, so we need to mark things
// in a separate array (easiest) and then reduce it at the end
// function checkForLoop(map: string[][], location: Location) {

//     let tempLocation = JSON.parse(JSON.stringify(location));
//     let tempCounter = 0;
//     let tempMap = JSON.parse(JSON.stringify(myMap));
//     tempMap[tempLocation.y+tempLocation.dy][tempLocation.x+tempLocation.dx] = '#'; // add obstacle

//     while (tempCounter < 16900*2) {
//         try {
//             tempLocation = moveGuardUntracked(tempMap, tempLocation);
//             tempCounter++;
//         } catch (error) {
//             return; // ran off the map, so no loop
//         }
//     }

//     // must be a loop
//     obstacleMap[location.y+location.dy][location.x+location.dx] = 'O';
//     return;
// }

function stepForward(location:Location): Location {
    return {
        x: location.x + location.dx,
        y: location.y + location.dy,
        dx: location.dx,
        dy: location.dy
    };
}

function turnRight(location:Location): Location {
    return {
        x: location.x,
        y: location.y,
        dx: -location.dy,
        dy: location.dx
    };
}

// Mark every place we visit with breadcrumbs (x if we go straight OR + if we turn, without ever overriding the +s).
function addBreadcrumb(map: string[][], location:Location, breadcrumb:string) {
    if (map[location.y][location.x] !== "+") {
        map[location.y][location.x] = breadcrumb;
    }
}
