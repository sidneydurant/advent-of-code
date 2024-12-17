list1 = [];
list2 = [];
document.querySelector("pre").textContent.split("\n").map((element) => {let [ele1, ele2] = element.split("   "); list1.push(Number(ele1)); list2.push(Number(ele2))});

list1.pop(); // because my parsing is wrong
list2.pop(); // ^^

list1.sort((a, b) => {return a-b});
list2.sort((a, b) => {return a-b});

let distance = 0;

for (let i = 0; i < list1.length; i++) {
	distance += Math.abs(list1[i]-list2[i]);
}

console.log(distance); // 1722302