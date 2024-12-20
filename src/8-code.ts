interface Coord {
    row: number;
    col: number;
}

export function solve(input: string[][]): number {
    // step 1 - build map from each antenna type to list of locations of that antenna type
    let antennaRegistry: Map<string, Coord[]> = new Map();

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            const coord:Coord = {
                col: col,
                row: row
            };
            const antennaType = input[row][col];

            if (antennaType != '.') {
                let antennaListOfType:Coord[] | undefined = antennaRegistry.get(antennaType);
                if (antennaListOfType) {
                    antennaListOfType.push(coord)
                } else {
                    antennaRegistry.set(antennaType, [coord]);
                }
            }            
        }
    }

    // step 2 - iterate through registry, and for every pair of antennas of a type, add to antinodes array
    let antinodes: number[][] = input.map(row => new Array(row.length).fill(0)); // number array in case part 2 involves total number of antinodes

    for (const [type, antennaListOfType] of antennaRegistry.entries()) {
        // for every combination of antennas
        for (let i = 0; i < antennaListOfType.length; i++) {
            for (let j = i+1; j < antennaListOfType.length; j++) {

                const antenna1:Coord = antennaListOfType[i];
                const antenna2:Coord = antennaListOfType[j];

                //antinodes = addAntinodes_part1(antinodes, antenna1, antenna2);

                antinodes = addAntinodes_part2(antinodes, antenna1, antenna2);
            }
        }
    }

    console.log(JSON.stringify(antinodes).split(',').reduce((accumulator, current) => {return accumulator + current;}).split('][').reduce((accumulator, current) => {return accumulator+'\n'+current}).slice(2, -2));

    return antinodes.reduce((outerAcc, row) => outerAcc + row.reduce((innerAcc, cell) => innerAcc + cell, 0), 0);
}

function addAntinodes_part1(antinodes:number[][], antenna1:Coord, antenna2:Coord) {

    const d_row = antenna1.row - antenna2.row;
    const d_col = antenna1.col - antenna2.col;

    const antinode1:Coord = {
        row: antenna1.row + d_row,
        col: antenna1.col + d_col
    };
    const antinode2:Coord = {
        row: antenna2.row - d_row,
        col: antenna2.col - d_col
    };

    antinodes = addAntinode(antinodes, antinode1);
    antinodes = addAntinode(antinodes, antinode2);

    return antinodes;
}

function addAntinode(antinodes: number[][], antinode:Coord): number[][] {
    if (antinode.row >= 0 && antinode.col >= 0 && antinode.row < antinodes.length && antinode.col < antinodes[antinode.row].length) {
        antinodes[antinode.row][antinode.col] = 1;
    }
    return antinodes;
}

// adds all antinodes along the line (note: NOT line segment) created by connecting antenna1 and antenna2
function addAntinodes_part2(antinodes:number[][], antenna1:Coord, antenna2:Coord) {
        
    let d_row = antenna1.row - antenna2.row;
    let d_col = antenna1.col - antenna2.col;

    console.log(`antenna1: ${JSON.stringify(antenna1)}`);
    console.log(`antenna2: ${JSON.stringify(antenna2)}`);

    // d_row = 2 > 1
    // d_col = 1 > .5

    // turns out that the vectors are shortened already :facepalm:
    // loooots of unecessary rounding below
    // let original_d_row = d_row;

    // d_row = d_row/Math.abs(original_d_row);
    // d_col = d_col/Math.abs(original_d_row);

    antinodes = addAllAntinodes(antinodes, antenna1, d_row, d_col);
    antinodes = addAllAntinodes(antinodes, antenna1, -d_row, -d_col);

    return antinodes;
}

function addAllAntinodes(antinodes: number[][], antenna:Coord, d_row:number, d_col:number): number[][] {
    
    let row = antenna.row;
    let col = antenna.col;
    //console.log(`\nstart: row: ${row} col: ${col} d_row: ${d_row} d_col: ${d_col}`);

    while (Math.round(row) >= 0 && Math.round(col) >= 0 && row < antinodes.length && col < Math.round(antinodes[Math.round(row)].length)) {
        antinodes[Math.round(row)][Math.round(col)] = 1;
        do {
            row += d_row;
            col += d_col;
            //console.log(`the row: ${row} the col: ${col} rowmod: ${row%1} colmod: ${col%1} expr: ${!(isIntIsh(col) && isIntIsh(row))}`);
        } while (!(isIntIsh(col) && isIntIsh(row)));

        //console.log(`row: ${row} col: ${col}`);
    }
    return antinodes;
}

function isIntIsh(num:number):boolean {
    return num % 1 < .0001 || num % 1 > .9999;
}