
/**
 * @param {string} input
 * @param {number} repeatLimit
 * @return {string}
 */
var repeatLimitedString = function (input, repeatLimit) {
    const ALPHABET_SIZE = 26;
    this.ASCII_SMALL_CASE_A = 97;
    this.repeatLimit = repeatLimit;
    this.frequency = new Array(ALPHABET_SIZE).fill(0);

    for (let i = 0; i < input.length; ++i) {
        ++this.frequency[input.codePointAt(i) - this.ASCII_SMALL_CASE_A];
    }

    let largest = ALPHABET_SIZE - 1;
    let secondLargest = largest - 1;

    const isLargest = true;
    const stringWithRepeatLimit = new Array();

    while (largest >= 0 && secondLargest >= 0) {
        largest = addToStringWithRepeatLimit(isLargest, largest, stringWithRepeatLimit);
        secondLargest = addToStringWithRepeatLimit(!isLargest, largest - 1, stringWithRepeatLimit);
    }

    return stringWithRepeatLimit.join('');
};

/**
 * @param {boolean} isLargest
 * @param {number} index
 * @param {string[]} stringWithRepeatLimit 
 * @return {number}
 */
function addToStringWithRepeatLimit(isLargest, index, stringWithRepeatLimit) {
    let countRepetition = 0;

    while (countRepetition < this.repeatLimit && index >= 0) {
        if (this.frequency[index] > 0) {
            ++countRepetition;
            --this.frequency[index];
            stringWithRepeatLimit.push(String.fromCodePoint(this.ASCII_SMALL_CASE_A + index));
            if (!isLargest) {
                break;
            }
        }

        if (this.frequency[index] > 0) {
            continue;
        }
        --index;
        countRepetition = 0;
    }
    return index;
}
