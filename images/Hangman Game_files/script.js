(function () {
    var saverWord;
    var guessedWord;
    var killerLetters;

    function getRandomWord() {
        var gameWordArray = [
            'apple',
            'mang',
            'grape',
            'lemon',
            'peach',
            'cherry',
            'kiwi',
            'melon'

        ];
        saverWord = Math.floor(Math.random() * gameWordArray.length);
        return gameWordArray[saverWord].toUpperCase();
    }

    function checkIfUserWon () {
        if (saverWord === guessedWord) {
            alert("Aliveee!!!");
            init();
            return true;
        }
        return false;
    }

    function checkIfUserLost () {
        if (killerLetters.length === 6) {
            alert("RIP!");
            init();

            return true;
        }
        return false;
    }

    function findLetter(letter) {
        var letterFound = false;
        for (var i=0; i < saverWord.length; i++){
            if (saverWord.charAt(i)===letter ){
                letterFound = true;
                guessedWord = guessedWord.substr(0, i) + letter + guessedWord.substr(i + letter.length);
            }
        }
        if (!letterFound) {
            killerLetters.push(letter);

        }

        renderGuessedWord();
        renderStrikedLetters();
        checkIfUserWon();
        checkIfUserLost();
    }

    function init() {
        var lettersTable = $("#letters");
        var counter = 0;
        var row;
        var box;
        lettersTable.html("");

        saverWord = getRandomWord();
        guessedWord = "";
        killerLetters = [];
        for (var i=0; i < saverWord.length; i++ ){
            guessedWord += "_";
        }

        for (i=0; i<7; i++) {
            row = $("<tr></tr>");
            for (var j=0; j<4 && counter<26 ; j++, counter++) {
                box = $("<td class='box'><div class =\"boxes\">" + String.fromCharCode(65 + counter)+ "</div></td>");
                box.click(findLetter.bind(null, String.fromCharCode(65 +  counter)));
                row.append(box);
            }
            lettersTable.append(row);
        }

        renderGuessedWord();
        renderStrikedLetters();
    }

    function renderGuessedWord() {
        var guessWordBox  = $("#guessed-word-boxes");
        guessWordBox.html("");

        for (var i=0; i < guessedWord.length; i++ ){
            guessWordBox.append($("<li class=\"guessed-letter\"><div class=\"box\">" + guessedWord.charAt(i) + "</div></li>"));
        }
    }

    function renderStrikedLetters() {
        var strikedLetters = $("#striked-box");
        var counter = 0;

        strikedLetters.html("");

        for (var i=0; i< 3; i++){
            row = $("<tr></tr>");

            for (var j=0; j<2; j++){
                box = $("<td class=\"box\"><div class=\"box\">" + (killerLetters[counter++] || '') + "</div></td>");
                row.append(box);
            }
            strikedLetters.append(row);

        }
    }

    $(document).ready(function () {
        init();
    });
})();
