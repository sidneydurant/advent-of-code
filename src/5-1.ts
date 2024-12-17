import { rules, updates, type Rule } from './5-data';

// Calculate and display the result
const result = part2();
console.log(result);

/**
 * Builds a map of invalid page orderings based on rules.
 * For example, if rule is "45|19", then page 19 cannot appear before page 45
 * in a valid update sequence.
 * 
 * @param rules - List of rules defining invalid page orderings
 * @returns Map where key is a page number and value is list of pages that cannot appear before it
 */
function buildDisallowedPrevPages(rules: Rule[]): Map<number, number[]> {
    const disallowedPrevPages: Map<number, number[]> = new Map();
    for (const rule of rules) {
        disallowedPrevPages.set(
            rule.from, 
            [...(disallowedPrevPages.get(rule.from) ?? []), rule.to]
        );
    }

    return disallowedPrevPages;
}

/**
 * Processes all updates and calculates the sum of valid middle page numbers.
 * An update is valid if it doesn't violate any page ordering rules.
 * 
 * @returns Sum of middle page numbers from valid updates
 */
function calculateSumOfMiddlePageNumbers() {

    const disallowedOrders = buildDisallowedPrevPages(rules);

    return updates
        .filter(update => isValidUpdate(update, disallowedOrders)) // filter out invalid updates
        .map(update => update[(update.length-1)/2]) // map to middle value
        .reduce((accumulator, value) => accumulator + value, 0); // reduce to sum
}

/**
 * Processes all invalid updates and reorders them to match the page ordering rules,
 * and then returns the sum of the middle page numbers.
 * 
 * @returns Sum of middle page numbers from reordered updates
 */
function part2() {
    const disallowedOrders = buildDisallowedPrevPages(rules);
    const invalidUpdates = updates.filter(update => !isValidUpdate(update, disallowedOrders));
    
    // For each invalid update, create a valid ordering using topological sort
    const reorderedUpdates = invalidUpdates.map(update => {
        // Build adjacency list for topological sort
        // If A must come after B, then B -> A in our graph
        const graph = new Map<number, number[]>();
        const inDegree = new Map<number, number>();
        
        // Initialize graph and in-degree for all pages in this particular update
        update.forEach(page => {
            graph.set(page, []);
            inDegree.set(page, 0);
        });
        
        // Build the graph based on rules
        rules.forEach(({from, to}) => {
            if (update.includes(from) && update.includes(to)) {
                graph.get(from)?.push(to);
                inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
            }
        });

        // Perform topological sort using Kahn's algorithm
        const validOrder: number[] = [];
        const queue: number[] = [];
        
        // Start with all nodes that have no dependencies
        update.forEach(page => {
            if ((inDegree.get(page) ?? 0) === 0) {
                queue.push(page);
            }
        });
        
        while (queue.length > 0) {
            const page = queue.shift()!;
            validOrder.push(page);
            
            graph.get(page)?.forEach(nextPage => {
                inDegree.set(nextPage, (inDegree.get(nextPage) ?? 1) - 1);
                if ((inDegree.get(nextPage) ?? 0) === 0) {
                    queue.push(nextPage);
                }
            });
        }

        if (validOrder.length != update.length) {
            throw Error("Not able to create valid ordering for this update.");
        }
        
        return validOrder;
    });

    //console.log("Reordered updates:", JSON.stringify(reorderedUpdates));
    
    // Calculate sum of middle numbers from reordered updates
    return reorderedUpdates
        .map(update => update[(update.length-1)/2])
        .reduce((accumulator, value) => accumulator + value, 0);
}

/**
 * Verifies whether a given update/page sequence is valid
 * @param update 
 * @param disallowedOrders 
 * @returns 
 */
function isValidUpdate(update: number[], disallowedOrders: Map<number, number[]>): boolean {

    const prevPages: number[] = [];

    for (const page of update) {
        const disallowedPrevPages = disallowedOrders.get(page) ?? [];
        if (prevPages.some(prevPage => disallowedPrevPages.includes(prevPage))) {
            return false;
        }

        prevPages.push(page);
    }

    return true;
}