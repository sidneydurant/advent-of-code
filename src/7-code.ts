/**
 * Solves a mathematical puzzle where each line contains a target result and a sequence of operands.
 * The function tries to find valid combinations of operators that can be placed between the operands
 * to achieve the target result.
 * 
 * For each line:
 * 1. Creates all possible permutations using the provided operators array
 *    Example operators: ["+", "*", "||"]
 * 
 * 2. For n operands, generates operators.length^(n-1) different combinations
 *    Example with 3 operands and operators ["+", "*"]: [++, +*, *+, **]
 * 
 * 3. Tests each combination by:
 *    - Converting the permutation index to a string in base operators.length
 *    - Applying operators left-to-right between operands
 *    - Checking if the result matches the expected value
 * 
 * 4. If a valid combination is found, adds the target result to the running sum
 * 
 * @param input - String containing lines of "result: operand1 operand2 ..."
 * @param operators - Array of operator strings to use (e.g. ["+", "*", "||"])
 * @returns Sum of all target results that have valid operator combinations
 */
export function solve(input:string, operators:string[]):number {

    const parsedInput = parseInput(input);
    let sum = 0;

    for (const line of parsedInput) {
        const expectedResult = line.result;
        const operands = line.operands;
        const permutations = Array.from({length: operators.length**(operands.length-1)}, (_, i) => i);

        //console.log(JSON.stringify(parsedInput));
        //console.log(`BEFORE operands.length ${operands.length}, permutations: ${JSON.stringify(permutations)}`);

        // if there are 32 permutations, we need to check each one to see which works, if any
        const valid = permutations.some((_, i) => {
            const permutationString = i.toString(operators.length).padStart(operands.length-1, "0");
            const permutation = permutationString.split('');
            const initial:number = operands[0];
            const result = permutation.reduce((accumulator, operatorIndex, i) => {
                const operand = operands[i+1];
                const operator = operators[parseInt(operatorIndex)];
                
                switch(operator) {
                    case "+":
                        return accumulator + operand;
                    case "*":
                        return accumulator * operand;
                    case "||":
                        return parseInt(accumulator.toString() + operand.toString());
                    default:
                        throw new Error(`Unknown operator: ${operator}`);
                }
            }, initial);

            return result === expectedResult;
        });
        //console.log(`AFTER: valid: ${valid}, expectedResult: ${expectedResult}`);
        
        if (valid) {
            //console.log(`valid: ${valid}, expectedResult: ${expectedResult}`);
            sum += expectedResult;
        }
    }

    return sum;
}

interface inputLine {
    result: number;
    operands: number[];
}

function parseInput(input:string): inputLine[] {
    return input.split('\n').map(line => {
        return { 
            result: parseInt(line.split(': ')[0]),
            operands: line.split(': ')[1].split(' ').map(Number)
        }
    });
}