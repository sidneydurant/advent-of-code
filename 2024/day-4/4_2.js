
const input = document.querySelector("pre").textContent;
const rows = input.split("\n");
rows.pop(); // pop to remove empty final line
const data = rows.map((row) => row.split(""));

/* for every point, check for the following:
reverse order will be caught by checking in opposite direction later
S     S     S
  A   A   A
    M M M 
S A M X M A S 
    M M M 
  A   A   A
S     S     S
*/

function checkAllPoints() {
	let sum = 0;
	for (let i = 1; i < data.length-1; i++) {
		for (let j = 1; j < data[i].length-1; j++) {
			sum += checkPoint(i, j);
		}
	}
	return sum;
}

// this function does not check for out of bounds
function checkPoint(x, y) {

	if (data[x][y] === "A") {
		let set = new Set();
		set.add(data[x-1][y-1]);
		set.add(data[x+1][y+1]);

		let set2 = new Set();
		set2.add(data[x-1][y+1]);
		set2.add(data[x+1][y-1]);

		if (set.has("M") && set.has("S") && set2.has("M") && set2.has("S")) {
			return 1;
		}
	}

	return 0;
}

console.log(`res: ${checkAllPoints()}`);