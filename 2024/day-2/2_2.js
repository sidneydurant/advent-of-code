

function safetyCheck(report, enableProblemDampener) {

	console.log(`report: ${report} enableProblemDampener ${enableProblemDampener}`);
	
	let increasing = null;
	
	for (let i = 0; i < report.length-1; i++) {
		let currLevel = parseInt(report[i]);
		let nextLevel = parseInt(report[i+1]);

		if (increasing === null) {
			increasing = currLevel < nextLevel;
		}

		if ((currLevel === nextLevel) ||
			(increasing && currLevel > nextLevel) ||
			(!increasing && currLevel < nextLevel) ||
			(Math.abs(currLevel - nextLevel) > 3)) {
			
			if (enableProblemDampener) {

				modifiedReport0 = report.slice();
				modifiedReport1 = report.slice();
				modifiedReport2 = report.slice();

				modifiedReport0.splice(i-1, 1);
				modifiedReport1.splice(i, 1);
				modifiedReport2.splice(i+1, 1);

				return safetyCheck(modifiedReport0, false) ||
					   safetyCheck(modifiedReport1, false) || 
					   safetyCheck(modifiedReport2, false);
			} else {
				return false;
			}
		}
	}

	return true;
}

//console.log(safetyCheck([1, 2, 7, 8], true ));


let reports = document.querySelector("pre").textContent.split("\n");
reports.pop(); // get rid of empty line #1001

let safeReportCount = 0;

for (report of reports) {
	let parsedReport = report.split(" ");
	console.log(parsedReport);

	if (safetyCheck(parsedReport, true)) {
		safeReportCount++;
		console.log(`safeReportCount: ${safeReportCount}`);
	} else {
		console.log("unsafe");
	}
}

console.log(safeReportCount); // 
