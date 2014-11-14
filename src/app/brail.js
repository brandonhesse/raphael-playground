/**
 * Created by bhesse on 11/10/14.
 */

var braille = {
    "A": "1",
    "B": "1-2",
    "C": "1-4",
    "D": "1-4-5",
    "E": "1-5",
    "F": "1-2-4",
    "G": "1-2-4-5",
    "H": "1-2-5",
    "I": "2-4",
    "J": "2-4-5",
    "K": "1-3",
    "L": "1-2-3",
    "M": "1-3-4",
    "N": "1-3-4-5",
    "O": "1-3-5",
    "P": "1-2-3-4",
    "Q": "1-2-3-4-5",
    "R": "1-2-3-5",
    "S": "2-3-4",
    "T": "2-3-4-5",
    "U": "1-3-6",
    "V": "1-2-3-6",
    "W": "2-4-5-6",
    "X": "1-3-4-6",
    "Y": "1-3-4-5-6",
    "Z": "1-3-5-6"
};

 var paper = Raphael(0,0, 500, 500),
     SPACING = 14,
     RADIUS = 2;

function makeDot(number) {
    number -= 1; // Normalize to 0->Max
    if (number < 0 || number > 5) {
        console.log('Invalid number.');
        return null;
    }

    // What column is it in?
    var x = Math.floor(number / 3);
    var y = number % 3;
    var dot = paper.circle(x * SPACING, y * SPACING, RADIUS).attr('fill', 'black');
    return dot;
}

function makeCell(dots) {
    // if we get a string, make it an array
    if (typeof dots === 'string') {
        dots = dots.split('-');
    }

    var cell = paper.set();

    for (var c = 0; c < dots.length; c+=1) {
        cell.push(makeDot(dots[c]));
    }

    return cell;
}

function makeWord(word, pos) {
    pos = pos || {x: 10, y: 10};
    word = word.toUpperCase();
    var myword = paper.set();
    for (var c=0; c < word.length; c+=1) {
        // Braille object
        if (braille[word[c]]) {
            var letter = makeCell(braille[word[c]]);
            myword.push(letter);
            letter.transform('T'+pos.x+','+pos.y);
            // Move a word over 3 spaces
            pos.x += SPACING * 3;
        }
    }

    return myword;
}

function makeWords(message) {
    var pos = { x: 10, y: 10},
        words = message.toUpperCase().split(' '),
        mySet = paper.set();

    for (var c = 0; c <  words.length; c+=1) {
        // Check if we should start a new line
        mySet.push(makeWord(words[c], pos));
        if (pos.x > 10 && (pos.x + SPACING * 3 * words[c].length) > paper.width) {
            pos.x = 10;
            pos.y += SPACING * 5;
        } else {
            pos.x += SPACING * 3;
        }
    }

    return mySet;
}
makeWords('Brandon is cool');
