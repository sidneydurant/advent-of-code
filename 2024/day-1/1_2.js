
let input = document.querySelector("pre").textContent.split("\n");
input.pop();

list1 = [];
list2 = [];

input.map((element) => {let [ele1, ele2] = element.split(" "); list1.push(Number(ele1)); list2.push(Number(ele2))});

let occurrences = {};

for (const item of list2) {
	if (occurrences[item]) {
		occurrences[item] += 1;
	} else {
		occurrences[item] = 1;
	}
}

let distance = 0;

for (let i = 0; i < list1.length; i++) {
	if (occurrences[list1[i]]) {
		distance += list1[i]*occurrences[list1[i]];
	}
}

console.log(distance); // 20373490