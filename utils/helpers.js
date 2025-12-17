/**
 * Generates random uuid
 * @return { string } returns uuid
 * */
export const uuid = function () {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};

/**
 * Creates aribtrary wait time based on miliseconds
 * @param { integer } milliseconds
 * @return { promise } resolves once time has been reached
 * */
export const asyncTimeout = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates random number between two intergers
 * @param { number } min - minium number
 * @param { number } max - maximum number
 * @param { boolean } wholenum - prevents floats
 * @return { number|float } returns random number
 * */
export const randomInt = function (min, max, wholenum) {
	if (wholenum) return Math.floor(Math.random() * (max - min + 1) + min);
	return Math.random() * (max - min + 1) + min;
};
