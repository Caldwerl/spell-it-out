$(function () {

    'use strict';

    // If all the integers between 1 and 123 are spelled out in English with no spaces or conjunctions and compiled into a single string,
    // answer these questions once:
    // 1) what is the total length of the string
    // 2) if a letter was selected at random from the string, what is the empirical probability it will be letter 'e'. ?

    function createNumberString(start, end) {
        var finalString = '';
        var stringOfNum = '';
        var mapInputString = '';
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

        return ((occurenceMap[selectedChar] / string.length) * 100).toFixed(2);
    }

    // I took 'between 1 and 123' to mean 'from 1 to 123'
    var startNum = 1;
    var endNum = 123;
    var selectChar = '';
    var probability = 0;
    var probabilityString = 'Enter a letter to find the probability of randomly selecting it from the string.';
    var theString = createNumberString(startNum, endNum);
    var occurences = findProbability(selectChar, theString);

    var stringTab = $('#stringTab');
    var lengthTab = $('#lengthTab');
    var probabilityTab = $('#probabilityTab');
    var contentElem = $('#contentElem');
    var probabilityInputElem = $('#probabilityInput');
    var buttonElem = $('button');

    function handleInputChange(e) {
        e.preventDefault();
        selectChar = probabilityInputElem.val();
        probability = findProbability(selectChar, theString);
        probabilityInputElem.val('');

        probabilityString = !!selectChar ?
            'The probability of selecting the letter \'' + selectChar + '\' at random is ' + probability + '%' :
            'Enter a letter to find the probability of randomly selecting it from the string.'

        selectProbabilityTab();
    };

    function selectProbabilityTab() {
        probabilityTab.addClass('active').siblings().removeClass('active');
        contentElem.stop().text(probabilityString).addClass('notString').removeClass('counter').append('<div class="progress"><div class="progress-bar" style="width:' + probability + '%;">' + probability + '%</div></div>');
    }

    function selectLengthTab() {
        lengthTab.addClass('active').siblings().removeClass('active');
        contentElem.addClass('notString counter').prop('Counter',0)
            .animate({
                Counter: theString.length
            },
            {
                duration: 1500,
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
    }

    function selectStringTab() {
        stringTab.addClass('active').siblings().removeClass('active');
        contentElem.stop().text(theString).removeClass('notString counter');
    }

    contentElem.text(theString);

    stringTab.click(selectStringTab);

    lengthTab.click(selectLengthTab);

    probabilityTab.click(selectProbabilityTab);

    buttonElem.click(handleInputChange);
});
