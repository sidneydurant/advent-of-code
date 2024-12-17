
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

// cell is a better term than point...
function checkAllPoints() {
	let sum = 0;
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			sum += checkPoint(i, j);
		}
	}
	return sum;
}

function checkPoint(x, y) {

	let directions = [
		{dx: -1, dy: -1}, {dx: 0, dy: -1}, {dx: 1, dy: -1},
		{dx: -1, dy:  0},				   {dx: 1, dy:  0},
		{dx: -1, dy:  1}, {dx: 0, dy:  1}, {dx: 1, dy:  1}
	];

	const initialValue = 0;
	return directions.reduce((accumulator, currentValue) => {return accumulator + checkDirectionAtPoint(x, y, currentValue)}, initialValue);
}

// return 1 if XMAS can be read by starting 
// at the specified point and moving in the
// specified direction, otherwise 0
function checkDirectionAtPoint(x, y, direction) {

	const searchStringArray = ['X', 'M', 'A', 'S'];

	for (i in searchStringArray) {
		// return if outside of array bounds
		if (!data[y] || !data[y][x]) {
			return 0;
		}

		// debug logs
		console.log(`data: ${data[x][y]} x: ${x}, y: ${x}, dx: ${direction.dx}, dy: ${direction.dy}`);

		// exit if we do not match
		if (data[y][x] !== searchStringArray[i]) {
			return 0;
		}
		
		// continue search
		x += direction.dx;
		y += direction.dy;
	}

	return 1;
}

console.log(`res: ${checkAllPoints()}`);