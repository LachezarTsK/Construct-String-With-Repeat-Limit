
class Solution {

    private companion object {
        const val ALPHABET_SIZE = 26
    }

    private var repeatLimit: Int = 0
    private var frequency = IntArray(ALPHABET_SIZE)

    fun repeatLimitedString(input: String, repeatLimit: Int): String {
        this.repeatLimit = repeatLimit
        for (letter in input) {
            ++frequency[letter - 'a']
        }

        var largest = ALPHABET_SIZE - 1
        var secondLargest = largest - 1

        val isLargest = true
        val stringWithRepeatLimit = StringBuilder()

        while (largest >= 0 && secondLargest >= 0) {
            largest = addToStringWithRepeatLimit(isLargest, largest, stringWithRepeatLimit)
            secondLargest = addToStringWithRepeatLimit(!isLargest, largest - 1, stringWithRepeatLimit)
        }

        return stringWithRepeatLimit.toString()
    }

    private fun addToStringWithRepeatLimit(isLargest: Boolean, index: Int, stringWithRepeatLimit: StringBuilder): Int {
        var index = index
        var countRepetition = 0

        while (countRepetition < repeatLimit && index >= 0) {
            if (frequency[index] > 0) {
                ++countRepetition
                --frequency[index]
                stringWithRepeatLimit.append(('a' + index))
                if (!isLargest) {
                    break
                }
            }

            if (frequency[index] > 0) {
                continue
            }
            --index
            countRepetition = 0
        }
        return index
    }
}
