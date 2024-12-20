
export function solve(input:string):number {
    return calculateChecksum(moveBlocks(expandDiskMap(input)));
}

// 2333133121414131402 > 00...111...2...333.44.5555.6666.777.888899
// > [0,0,-1,-1,-1,1,1,1,-1,-1,-1,2,-1,-1,-1,3,3,3,-1,4,4,-1,5,5,5,5,-1,6,6,6,6,-1,7,7,7,-1,8,8,8,8,9,9]
function expandDiskMap(input:string):number[] {
    return input.split('').reduce((accumulator, value, index) => {
        let stringToRepeat:number = (index % 2 === 1 ? -1 : (index/2));
        for (let i = 0; i < parseInt(value); i++) {
            accumulator.push(stringToRepeat);
        }
        return accumulator;
    }, new Array<number>());
}

// part 1
function moveBlocks(input:number[]):number[] {
    // have two pointers and move them inwards

    let emptyBlockIndex = 0;
    let fileBlockIndex = input.length-1;

    while (emptyBlockIndex < fileBlockIndex) {

        while (input[emptyBlockIndex] != -1) {
            emptyBlockIndex++;
        }

        while (input[fileBlockIndex] == -1) {
            fileBlockIndex--;
        }

        if (emptyBlockIndex < fileBlockIndex) { // on last iteration they will go past each other before outer while loop exits
            input[emptyBlockIndex] = input[fileBlockIndex];
            input[fileBlockIndex] = -1;
        }
    }

    return input;
}

function moveFiles(input:number[]):number[] {
    return [];
}

function calculateChecksum(input:number[]):number {
    return input.reduce((accumulator, value, index) => {return value !== -1 ? accumulator + value*index : accumulator}, 0)
}