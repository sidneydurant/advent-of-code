import {input25} from './25-data';

function parseInput(input:string):string[][][] {
    return input.split(`\n\n`).map(schematic => schematic.split('\n').map(row => row.split('')));
}

let schematics = parseInput(input25[1]);

console.log(schematics.length);

let keys = schematics.filter(schematic => schematic[0][0] === '.');
let locks = schematics.filter(schematic => schematic[0][0] === '#');

let keyHeights = keys.map(schematic => getRidgeHeights(schematic));
let lockHeights = locks.map(schematic => getPinHeights(schematic));

console.log(`keyHeights: ${JSON.stringify(keyHeights)}`);
console.log(`lockHeights: ${JSON.stringify(lockHeights)}`);
console.log(`schematics: ${schematics.length} keys: ${keys.length} locks: ${locks.length}`);

let comboCounter = 0;
const maxHeight = 0;

for (let keyHeight of keyHeights) {
    for (let lockHeight of lockHeights) {
        let valid = true;
        for (let i = 0; i < keyHeight.length; i++) {
            if (keyHeight[i] + lockHeight[i] > 5) {
                valid = false;
            }
        }
        if (valid) {
            comboCounter++;
        }
    }
}

console.log(comboCounter);

/* convert
#####
.####
.####
.####
.#.#.
.#...
.....

to pin heights: 0,5,3,4,3
*/
function getPinHeights(lockSchematic:string[][]):number[] {

    let pinHeights = new Array(lockSchematic[0].length).fill(0);

    // for each column
    for (let column = 0; column < lockSchematic[0].length; column++) {
        let pinHeight = 0;
        while(lockSchematic[pinHeight][column] === "#") {
            pinHeight++;
        }
        pinHeights[column] = pinHeight-1; // number of #'s-1 = how they measure pin height in examples
    }

    return pinHeights;
}

/* convert
.....
#....
#....
#...#
#.#.#
#.###
#####

to ridge heights: 5,0,2,1,3
*/
function getRidgeHeights(keySchematic:string[][]) {

    let ridgeHeights = new Array(keySchematic[0].length).fill(0);

    // for each column
    for (let column = 0; column < keySchematic[0].length; column++) {
        let ridgeHeight = 0;
        while(keySchematic[keySchematic[0].length-ridgeHeight][column] === "#") {
            ridgeHeight++;
        }
        ridgeHeights[column] = ridgeHeight; // number of #'s-1 = how they measure pin height in examples
    }

    return ridgeHeights;
}