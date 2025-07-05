
package main

const ALPHABET_SIZE = 26

var repeatLimit int
var frequency [ALPHABET_SIZE]int

func repeatLimitedString(input string, repetitionLimit int) string {
    repeatLimit = repetitionLimit
    frequency = [ALPHABET_SIZE]int{}
    for _, letter := range input {
        frequency[letter - 'a']++
    }

    largest := ALPHABET_SIZE - 1
    secondLargest := largest - 1

    const isLargest = true
    stringWithRepeatLimit := make([]byte, 0)

    for largest >= 0 && secondLargest >= 0 {
        largest = addToStringWithRepeatLimit(isLargest, largest, &stringWithRepeatLimit)
        secondLargest = addToStringWithRepeatLimit(!isLargest, largest - 1, &stringWithRepeatLimit)
    }

    return string(stringWithRepeatLimit)
}

func addToStringWithRepeatLimit(isLargest bool, index int, stringWithRepeatLimit *[]byte) int {
    countRepetition := 0

    for countRepetition < repeatLimit && index >= 0 {
        if frequency[index] > 0 {
            countRepetition++
            frequency[index]--
            *stringWithRepeatLimit = append(*stringWithRepeatLimit, byte('a' + index))
            if !isLargest {
                break
            }
        }

        if frequency[index] > 0 {
            continue
        }
        index--
        countRepetition = 0
    }
    return index
}
