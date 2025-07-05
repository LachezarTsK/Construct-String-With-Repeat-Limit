
function repeatLimitedString(input: string, repeatLimit: number): string {
    const util = new Util(input, repeatLimit)
    let largest = Util.ALPHABET_SIZE - 1;
    let secondLargest = largest - 1;

    const isLargest = true;
    const stringWithRepeatLimit: string[] = new Array();

    while (largest >= 0 && secondLargest >= 0) {
        largest = addToStringWithRepeatLimit(isLargest, largest, stringWithRepeatLimit, util);
        secondLargest = addToStringWithRepeatLimit(!isLargest, largest - 1, stringWithRepeatLimit, util);
    }

    return stringWithRepeatLimit.join('');
};

function addToStringWithRepeatLimit(isLargest: boolean, index: number, stringWithRepeatLimit: string[], util: Util): number {
    let countRepetition = 0;

    while (countRepetition < util.repeatLimit && index >= 0) {
        if (util.frequency[index] > 0) {
            ++countRepetition;
            --util.frequency[index];
            stringWithRepeatLimit.push(String.fromCodePoint(Util.ASCII_SMALL_CASE_A + index));
            if (!isLargest) {
                break;
            }
        }

        if (util.frequency[index] > 0) {
            continue;
        }
        --index;
        countRepetition = 0;
    }
    return index;
}

class Util {

    static ALPHABET_SIZE = 26;
    static ASCII_SMALL_CASE_A = 97;

    repeatLimit: number;
    frequency: number[]

    constructor(input: string, repeatLimit: number) {
        this.repeatLimit = repeatLimit;
        this.frequency = new Array(Util.ALPHABET_SIZE).fill(0);
        for (let i = 0; i < input.length; ++i) {
            ++this.frequency[input.codePointAt(i) - Util.ASCII_SMALL_CASE_A];
        }
    }
}
