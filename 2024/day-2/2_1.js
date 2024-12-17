
let reports = document.querySelector("pre").textContent.split("\n");
reports.pop(); // get rid of empty line #1001

let safeReportCount = 0;

for (report of reports) {
	let safe = true;

	let increasing = null;

	let parsedReport = report.split(" ");

	console.log(parsedReport);
	for (let i = 0; i < parsedReport.length-1; i++) {
		let currLevel = parseInt(parsedReport[i]);
		let nextLevel = parseInt(parsedReport[i+1]);

		if (increasing === null) {
			increasing = currLevel < nextLevel;
		}

		if ((currLevel === nextLevel) ||
			(increasing && currLevel > nextLevel) ||
			(!increasing && currLevel < nextLevel)) {
			safe = false;

			console.log(`currLevel: ${currLevel} nextLevel: ${nextLevel} increasing: ${increasing}`);
			console.log(currLevel === nextLevel);
			console.log(increasing && currLevel > nextLevel);
			console.log(!increasing && currLevel < nextLevel);
		}

		if (Math.abs(currLevel - nextLevel) > 3) {
			safe = false;
		}
	}

	if (safe) {
		safeReportCount++;
	}
}

console.log(safeReportCount); // 