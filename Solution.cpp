
#include <array>
#include <string>
using namespace std;

class Solution {

    static const int ALPHABET_SIZE = 26;

    int repeatLimit;
    array<int, ALPHABET_SIZE> frequency{};

public:
    string repeatLimitedString(const string& input, int repeatLimit) {
        this->repeatLimit = repeatLimit;
        for (const auto& letter : input) {
            ++frequency[letter - 'a'];
        }

        int largest = ALPHABET_SIZE - 1;
        int secondLargest = largest - 1;

        bool isLargest = true;
        string stringWithRepeatLimit;

        while (largest >= 0 && secondLargest >= 0) {
            largest = addToStringWithRepeatLimit(isLargest, largest, stringWithRepeatLimit);
            secondLargest = addToStringWithRepeatLimit(!isLargest, largest - 1, stringWithRepeatLimit);
        }

        return stringWithRepeatLimit;
    }

private:
    int addToStringWithRepeatLimit(bool isLargest, int index, string& stringWithRepeatLimit) {
        int countRepetition = 0;

        while (countRepetition < repeatLimit && index >= 0) {
            if (frequency[index] > 0) {
                ++countRepetition;
                --frequency[index];
                stringWithRepeatLimit.push_back(static_cast<char>(('a' + index)));
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
};
