    var answer ='';
    var guessed = [];
    var numDefeat = 0;
    var currWord = [];
    var gameEnd = false;

    let game = {
        // Explains game; calls clear intro screen fn
        instructions: function(){
            let getExpositionText = document.querySelector("#expositionText");
            getExpositionText.innerHTML = '<h3>How to Play:</h3><p>Try to guess the name of the fear before it gets you.</p><p>A description of the fear can be found beneath the word to be guessed.</p><p>Press any key to guess whether the word has that letter in it. If you guess wrong, the fear will begin to manifest. Different fears take differing number of turns to manifest. The number of guesses you have left will be displayed in the lower right.</p><p><span class="sName">Shiver\'s</span> family believes that if the fear is bested ten times, it can no longer manifest.</p><h4>Good luck!</h4></p><br><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Play Game</button>';
        },

        // Sets up interface for a new game
        setGameUp: function(){
            gameEnd = false; // Putting this here because this function is also called when gameEnd = true
            let getInterface = document.querySelector("#interface");
            let getDungeonText = document.querySelector('#dungeonText');
            let getGuessBox = document.querySelector('#guessBox');
            let getPastGuess = document.querySelector('#pastGuessBox');
            let getHashBox = document.querySelector("#hashBox");
            
            getInterface.style.backgroundColor = "#174038";
            getHashBox.style.backgroundColor = "#174038";
            getHashBox.style.padding = "30px";
            getDungeonText.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            
            this.hideInstr();
            this.writeScore();
            this.wordSetUp();
            getGuessBox.style.backgroundColor = "#5b8c85";
            getPastGuess.innerHTML = "<h5>Past Guess:<h5>";
            guessed = [];
            this.main();
        },

        // Hides the instruction div
        hideInstr: function(){
            let getExposition = document.querySelector("#exposition");
            let getInterface = document.querySelector("#interface");
            getExposition.style.display = 'none';
            getInterface.style.display = 'visible';
        },

        // Writes the number of rounds the player has won
        writeScore: function(){
            let getScoreBox = document.querySelector("#scoreBox");
            getScoreBox.innerHTML = "<h4>Defeated " + numDefeat + " of 10</h4>";
        },

        // Sets up a new word for the player to guess
        wordSetUp: function(){
            let getFearBox = document.querySelector("#fearBox");
            var indexNum = Math.floor(Math.random() * dictionary.length);

            answer = dictionary[indexNum];
            lives = dictionary[indexNum].error;

            getFearBox.innerHTML = '<h5>' + answer.desc + '</h5>'
            this.setFearBg(answer.badge, answer.dia);
            this.printHangLines();
            this.printRemGuess(lives);
        },

        // Uses the badge property of the fear to change the big picture
        setFearBg: function(badge, dia){
            let getDungeonBox = document.querySelector("#dungeonBox");
            let getDialogue = document.querySelector("#dialogue");

            getDialogue.style.backgroundColor = "black";
            getDialogue.style.borderRadius = "0 0 25px 25px";

            getDungeonBox.style.backgroundImage = "url('assets/Images/Backgrounds/" + badge + ".png')";
            getDungeonBox.style.backgroundSize = "cover";

            getDialogue.innerHTML = '<p>' + dia + '</p>';
            
        },

        // Prints the _ _ _ thing
        printHangLines: function(){
            let getHashBox = document.querySelector("#hashBox");
            
            currWord = [];

            for (var i = 0; i < answer.word.length; i++){
                currWord.push("_");   
            }

            var hashString = currWord.join(" ");

            getHashBox.innerHTML = "<h1>" + hashString + "phobia</h1>";
        },

        // Prints the lives the player has remaining (based on fear property 'error')
        printRemGuess: function(lives){
            let getRemGuessBox = document.querySelector("#remGuessBox");
            var lifeBar = "<h5>Guesses Left: ";

            for (var i = 0; i < lives; i++){
                lifeBar += " 👻 ";   
            }
            
            getRemGuessBox.innerHTML = lifeBar + "</h5>";
        },

        // Super convoluted, but checks to make sure the key pressed is actually a letter
        isAlph: function(letter) {
            if (letter == "a" | letter == "b" | letter == "c" | letter == "d" | letter == "e" | letter == "f" | letter == "g" | letter == "h" | letter == "i" | letter == "j" | letter == "k" | letter == "l" | letter == "m" | letter == "n" | letter == "o" | letter == "p" | letter == "q" | letter == "r" | letter == "s" | letter == "t" | letter == "u" | letter == "v" | letter == "w" | letter == "x" | letter == "y" | letter == "z" ){
                return true;
            }
            else{
                return false;
            }
        },

        // Only runs if key pressed was a letter AND if the letter has not already been guessed; checks the key press to the word; 
        // if the key press is part of the word, it replaces the '_' with the letter. It also returns that the letter was found.
        //  If the letter was not found, the player loses a life. The letter is then pushed to the 'guessed' array, ensuring it can't be checked again.
        checkGuess: function(letter){
            let getDialogue = document.querySelector("#dialogue");
            let getHashBox = document.querySelector("#hashBox");

            var found = false;
            var alreadyGuessed = game.checkIfAlreadyGuessed(letter);

            if (game.isAlph(letter) && !alreadyGuessed){

                for (var i = 0; i < answer.word.length; i++){

                    if (currWord[i] == "_"){
                
                        if (letter == answer.word[i]){
                            currWord[i] = letter;
                            found = true;
                        }
                    }
                }
                if (found){
                    var newDiv = document.createElement("p");
                    newDiv.textContent = "Good job! '" + letter.toUpperCase() + "' is in the name!";
                    getDialogue.prepend(newDiv); 
                }
                else {
                    lives--;
                    this.printRemGuess(lives);
                    var newDiv = document.createElement("p");
                    newDiv.textContent = "Unfortunately '" + letter.toUpperCase() + "' is not the name! The fear begins to manifest.";
                    getDialogue.prepend(newDiv); 
                }
                guessed.push(letter);
                this.printGuessWord(letter);
                
                
                var hashString = currWord.join(" ");

                getHashBox.innerHTML = "<h1>" + hashString + "phobia</h1>";
                console.log("Ran checkGuess fn");
            }
            else {
                console.log("Key was not a letter; did not run checkGuess");
            }
        },

        // Checks if the letter was already guessed
        checkIfAlreadyGuessed: function(letter){
            for (var i = 0; i < guessed.length; i++){

                if (guessed[i] == letter){
                    return true;
                }
            } 
            return false;
        },

        // Adds letters that have been guessed to past guess box
        printGuessWord: function(letter){
            let getPastGuess = document.querySelector("#pastGuessBox");

            getPastGuess.append(letter);
        },

        // Checks for three things:
        checkScores: function(){
            let getDialogue = document.querySelector("#dialogue");
            let getBadges = document.querySelector("#badges");

        // (1) If player has lost
            if (lives <= 0){
                var newDiv = document.createElement("div");
                newDiv.innerHTML = '<p>The fear cackles as it fully manifests--You lose!</p><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Click here to play again!</button>';
                getDialogue.prepend(newDiv);
                numDefeat = 0;
                getBadges.innerHTML = "<h4>Fears Conquered:</h4>";
                gameEnd = true;
            }
        // (2) If player has won
            var y = 0;

            for (var i = 0; i < currWord.length; i++ ){
                if (currWord[i] == answer.word[i]){
                    y++;
                }
            }

            if (y == currWord.length){
                numDefeat++;
                var newDiv = document.createElement("div");
                newDiv.innerHTML = '<p>The fear lets loose a warbly scream as it dissipates--You win!</p><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Click here to play again!</button>';
                getDialogue.prepend(newDiv);
                this.addBadge();
                gameEnd = true;
            }
        // (3) If player beat the whole game
            if (numDefeat >= 10){
                getDialogue.innerHTML = '<h3>Congratulations! You win!</h3><p><span class="sName">Shiver</span> thanks you--they\'re safe for now... That is, unless someone puts a new curse on them... </p><br><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Put a new curse on Shiver and start again!</button>';
                getBadges.innerHTML = "<h4>Fears Conquered:</h4>";
                gameEnd = true;
                numDefeat = 0;
            }
        },

        // Adds little badge to the badges section depending on the fear defeated
        addBadge(){
            let getBadge = document.querySelector("#badges");

            if (numDefeat <= 1){
                getBadge.innerHTML = "<h4>Fears Conquered:</h4><br>"
            }
            var newDiv = document.createElement("div");
            newDiv.classList.add("badgeBut");
            newDiv.style.backgroundImage = "url('assets/Images/Icons/" + answer.badge + ".png')";
            getBadge.append(newDiv);
        },

        main: function() {

            document.onkeyup = function(event) {

                var letter = event.key.toLowerCase();

                if (!gameEnd){
                    game.checkGuess(letter);
                    game.checkScores();
                }

            };
        },
    }