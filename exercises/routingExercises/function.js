const mean = (arr) => {
	if (arr.length === 0){
		return 0;
	} else {
		return arr.reduce((a, b) => a + b) / arr.length;
	}
}

const median = (arr) => {
	const mid = Math.floor(arr.length / 2),
		numbers = [ ...arr ].sort((a, b) => a - b);
	return numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
};

const mode = (arr) => {
	nums = arr.slice().sort((x, y) => x - y);

	var bestStreak = 1;
	var bestElem = nums[0];
	var currentStreak = 1;
	var currentElem = nums[0];

	for (let i = 1; i < nums.length; i++) {
		if (nums[i - 1] !== nums[i]) {
			if (currentStreak > bestStreak) {
				bestStreak = currentStreak;
				bestElem = currentElem;
			}

			currentStreak = 0;
			currentElem = nums[i];
		}

		currentStreak++;
	}

	return currentStreak > bestStreak ? currentElem : bestElem;
};


/**
 * Attempt to convert an array of strings to an array of numbers
 * @param {Array} numsAsStrings array of strings
 * @returns {Array|Error} an array or an error object
 */
function convertAndValidateNumsArray(numsAsStrings) {
	let result = [];

	for (let i = 0; i < numsAsStrings.length; i++) {
		let valToNumber = Number(numsAsStrings[i]);

		if (Number.isNaN(valToNumber)) {
			return new Error(`The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`);
		}

		result.push(valToNumber);
	}
	return result;
}

module.exports = { mean, median, mode, convertAndValidateNumsArray };
