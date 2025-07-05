
public class Solution {

    private static final int ALPHABET_SIZE = 26;

    private int repeatLimit;
    private final int[] frequency = new int[ALPHABET_SIZE];

    public String repeatLimitedString(String input, int repeatLimit) {
        this.repeatLimit = repeatLimit;
        for (char letter : input.toCharArray()) {
            ++frequency[letter - 'a'];
        }

        int largest = ALPHABET_SIZE - 1;
        int secondLargest = largest - 1;

        boolean isLargest = true;
        StringBuilder stringWithRepeatLimit = new StringBuilder();

        while (largest >= 0 && secondLargest >= 0) {
            largest = addToStringWithRepeatLimit(isLargest, largest, stringWithRepeatLimit);
            secondLargest = addToStringWithRepeatLimit(!isLargest, largest - 1, stringWithRepeatLimit);
        }

        return stringWithRepeatLimit.toString();
    }

    private int addToStringWithRepeatLimit(boolean isLargest, int index, StringBuilder stringWithRepeatLimit) {
        int countRepetition = 0;

        while (countRepetition < repeatLimit && index >= 0) {
            if (frequency[index] > 0) {
                ++countRepetition;
                --frequency[index];
                stringWithRepeatLimit.append((char) ('a' + index));
                if (!isLargest) {
                    break;
                }
            }

            if (frequency[index] > 0) {
                continue;
            }
            --index;
            countRepetition = 0;
        }
        return index;
    }
}
