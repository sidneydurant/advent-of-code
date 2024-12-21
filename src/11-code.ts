
function parseInput(input:string):number[] {
    return input.split(' ').map(Number);
}

console.log(solve(parseInput(`4189 413 82070 61 655813 7478611 0 8`), 75));

function solve(stones:number[], blinkCount:number):number {

    // for (let i = 0; i < blinkCount; i++) {
    //     console.log(`i: ${i}`);
    //     console.log(stones);
    //     stones = splitStones(stones);
    // }

    let stonesMap = new Map<number, number>();

    for (const stone of stones) {
        stonesMap.set(stone, stonesMap.get(stone) ?? 1);
    }

    console.log(stonesMap);

    for (let i = 0; i < blinkCount; i++) {
        stonesMap = splitStonesQuickly(stonesMap);
        console.log(`i: ${i}`);
        console.log(JSON.stringify(stonesMap, (key, value) => (value instanceof Map ? [...value] : value)));
    }

    let total:number = 0;

    for (const value of stonesMap.values()) {
        total += value;
    }

    return total;
}

// 512 72 2024 2 0 2 4 2867 6032

function splitStones(stones:number[]):number[] {

    let newStones = [];

    for (const stone of stones) {
        let stoneString = stone.toString();
        if (stone === 0) {
            newStones.push(1);
        } else if (stoneString.length % 2 === 0) {
            newStones.push(parseInt(stoneString.substring(0, stoneString.length/2)));
            newStones.push(parseInt(stoneString.substring(stoneString.length/2)));
        } else {
            newStones.push(stone * 2024);
        }
    }

    return newStones;
}

function splitStonesQuickly(stones:Map<number, number>):Map<number, number> {

    let newStones = new Map<number, number>();

    for (const [stone, count] of stones) {
        let stoneString = stone.toString();
        if (stone === 0) {
            const newStone = 1;
            newStones.set(newStone, (newStones.get(newStone) ?? 0) + count);
        } else if (stoneString.length % 2 === 0) {
            const newStone1 = parseInt(stoneString.substring(0, stoneString.length/2));
            const newStone2 = parseInt(stoneString.substring(stoneString.length/2));
            newStones.set(newStone1, (newStones.get(newStone1) ?? 0) + count);
            newStones.set(newStone2, (newStones.get(newStone2) ?? 0) + count);
        } else {
            const newStone = stone * 2024;
            newStones.set(newStone, (newStones.get(newStone) ?? 0) + count);
        }
    }

    return newStones;
}