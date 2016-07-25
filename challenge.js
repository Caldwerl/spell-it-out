'use strict';

// If all the integers between 1 and 123 are spelled out in English with no spaces or conjunctions and compiled into a single string,
// answer these questions once:
// 1) what is the total length of the string
// 2) if a letter was selected at random from the string, what is the empirical probability it will be letter 'e'. ?

var firstDigitNumberMap = {
    '0': '',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine'
};

var secondDigitNumberMap = {
    '0': '',
    '1': 'ten',
    '2': 'twenty',
    '3': 'thirty',
    '4': 'forty',
    '5': 'fifty',
    '6': 'sixty',
    '7': 'seventy',
    '8': 'eighty',
    '9': 'ninety'
}

var teenNumberMap = {
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen'
};

function createNumberString(start, end) {
    var finalString = '';
    var stringOfNum = '';
    var mapInputString = '';

    for (var i = start; i <= end; i++) {

        stringOfNum = i.toString();

        switch (stringOfNum.length) {
            case 3:
                mapInputString = stringOfNum.charAt(0);
                stringOfNum = stringOfNum.slice(-(stringOfNum.length - 1));
                finalString += firstDigitNumberMap[mapInputString] + 'hundred';
            case 2:
                 if (parseInt(stringOfNum) > 10 && parseInt(stringOfNum) < 20) {
                    finalString += teenNumberMap[stringOfNum];
                    break;
                } else {
                    mapInputString = stringOfNum.charAt(0);
                    stringOfNum = stringOfNum.slice(-(stringOfNum.length - 1));
                    finalString += secondDigitNumberMap[mapInputString];
                }
            case 1:
                mapInputString = stringOfNum.charAt(stringOfNum.length - 1);
                finalString += firstDigitNumberMap[mapInputString];
                break;
        }
    }

    return finalString;
}

function findProbability(selectedChar, string) {
    var occurenceMap = {};
    occurenceMap[selectedChar] = 0;

    for (var i = 0; i < string.length; i++) {
        if (string[i] === selectedChar) {
            occurenceMap[selectedChar] += 1;
        }
    }

    return occurenceMap[selectedChar] / string.length;
}

var startNum = 1;
var endNum = 123;
var selectChar = ''
var theString = createNumberString(startNum, endNum);
var occurences = findProbability(selectChar, theString);

var stringElem = $('#stringElem');
var lengthElem = $('#lengthElem');
var probabilityElem = $('#probabilityElem');
var probabilityInputElem = $('#probabilityInput');

stringElem.text(theString);
lengthElem.text('The length of this string is ' + theString.length + ' characters.');
probabilityElem.parent().hide();

function handleInputChange() {
    selectChar = probabilityInputElem.val();
    console.log('It changed!', selectChar);
    if (!!selectChar) {
        probabilityElem.text('The probability of selecting the letter ' + selectChar + ' at random is ' + findProbability(selectChar, theString) * 100 + '%');
        probabilityElem.parent().show();
    } else {
        probabilityElem.parent().hide();
    }
};
