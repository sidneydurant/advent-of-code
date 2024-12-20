interface Location {
    x: number;
    y: number;
}

export function solve(input:number[][]):number {

    let trailheadCounter = 0;
    let sumOfTrailheadScores = 0;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === 0) {
                trailheadCounter++;
                sumOfTrailheadScores += trailheadRating(input, {x, y});
                console.log(trailheadRating(input, {x, y}));
            }
        }
    }

    return sumOfTrailheadScores;
}

// part 1
// do a BFS from each trailhead, keeping track of
// how many peaks you found along the way
function trailheadScore(map:number[][], trailhead:Location): number {

    // for current node, add all adjacent nodes that are exactly +1 from current height
    
    let location = JSON.parse(JSON.stringify(trailhead));
    let stack = [location];
    let visited: Location[] = [];
    let score = 0;

    while (stack.length > 0) {

        location = stack.pop();

        if (visited.some(loc => {return loc.x === location.x && loc.y === location.y})) {
            // we have already visited this location, continue
        } else {

            visited.push(location);

            if (map[location.y][location.x] === 9) {
                score++;
            } else {

                let candidates = [
                    {x: location.x+1, y:location.y},
                    {x: location.x, y:location.y+1},
                    {x: location.x-1, y:location.y},
                    {x: location.x, y:location.y-1}
                ];

                for (let candidate of candidates) {
                    // if within map bounds
                    if (candidate.y >= 0 && candidate.x >= 0 && candidate.y < map.length && candidate.x < map[candidate.y].length) {
                        // if trail is correct steepness
                        if (map[location.y][location.x]+1 === map[candidate.y][candidate.x]) {
                            stack.push(candidate);
                        }
                    }
                }
            }
        }
    }

    return score;
}

// part 2 - basically same just ignore if we've already visited a place
function trailheadRating(map:number[][], trailhead:Location): number {

    // for current node, add all adjacent nodes that are exactly +1 from current height
    
    let location = JSON.parse(JSON.stringify(trailhead));
    let stack = [location];
    let score = 0;

    while (stack.length > 0) {

        location = stack.pop();

        if (map[location.y][location.x] === 9) {
            score++;
        } else {

            let candidates = [
                {x: location.x+1, y:location.y},
                {x: location.x, y:location.y+1},
                {x: location.x-1, y:location.y},
                {x: location.x, y:location.y-1}
            ];

            for (let candidate of candidates) {
                // if within map bounds
                if (candidate.y >= 0 && candidate.x >= 0 && candidate.y < map.length && candidate.x < map[candidate.y].length) {
                    // if trail is correct steepness
                    if (map[location.y][location.x]+1 === map[candidate.y][candidate.x]) {
                        stack.push(candidate);
                    }
                }
            }
        }
    }

    return score;
}