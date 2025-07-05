
using System;

public class Solution
{
    private static readonly int ALPHABET_SIZE = 26;

    private int repeatLimit;
    private int[] frequency = new int[ALPHABET_SIZE];

    public string RepeatLimitedString(string input, int repeatLimit)
    {
        this.repeatLimit = repeatLimit;
        foreach (char letter in input)
        {
            ++frequency[letter - 'a'];
        }

        int largest = ALPHABET_SIZE - 1;
        int secondLargest = largest - 1;

        bool isLargest = true;
        StringBuilder stringWithRepeatLimit = new StringBuilder();

        while (largest >= 0 && secondLargest >= 0)
        {
            largest = AddToStringWithRepeatLimit(isLargest, largest, stringWithRepeatLimit);
            secondLargest = AddToStringWithRepeatLimit(!isLargest, largest - 1, stringWithRepeatLimit);
        }

        return stringWithRepeatLimit.ToString();
    }

    private int AddToStringWithRepeatLimit(bool isLargest, int index, StringBuilder stringWithRepeatLimit)
    {
        int countRepetition = 0;

        while (countRepetition < repeatLimit && index >= 0)
        {
            if (frequency[index] > 0)
            {
                ++countRepetition;
                --frequency[index];
                stringWithRepeatLimit.Append((char)('a' + index));
                if (!isLargest)
                {
                    break;
                }
            }

            if (frequency[index] > 0)
            {
                continue;
            }
            --index;
            countRepetition = 0;
        }
        return index;
    }
}
