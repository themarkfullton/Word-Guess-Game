    var answer ='';
    var maxWrong = 0;
    var mistakes = 0;
    var guessed = [];
    var numDefeat = 0;
    var currWord = [];
    var gameEnd = false;

    let game = {
        
        instructions: function(){
            let getExpositionText = document.querySelector("#expositionText");
            getExpositionText.innerHTML = '<h3>How to Play:</h3><p>Try to guess the name of the fear before it gets you.</p><p>A description of the fear can be found in the bottom left-hand column. In the bottom right, you can see the word that needs to be guessed.</p><p>Press any key to guess whether the word has that letter in it. If you guess wrong, the fear will begin to manifest. Different fears take differing number of turns to manifest. The number of guesses you have left will be displayed in the lower right.</p><p>Your goal is to get <span class="sName">Shiver</span> to the other side of the map.</p><h4>Good luck!</h4></p><br><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Play Game</button>';
        },

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

        hideInstr: function(){
            let getExposition = document.querySelector("#exposition");
            let getInterface = document.querySelector("#interface");
            getExposition.style.display = 'none';
            getInterface.style.display = 'visible';
        },

        writeScore: function(){
            let getScoreBox = document.querySelector("#scoreBox");
            getScoreBox.innerHTML = "<h4>Defeated " + numDefeat + " of 10</h4>";
        },

        wordSetUp: function(){
            let getFearBox = document.querySelector("#fearBox");
            var indexNum = Math.floor(Math.random() * dictionary.length);

            answer = dictionary[indexNum];
            lives = dictionary[indexNum].error;

            getFearBox.innerHTML = '<h5>' + answer.desc + '</h5>'
            this.selectSetting(answer.badge, answer.dia);
            this.printHangLines();
            this.printRemGuess(lives);
        },

        selectSetting: function(badge, dia){
            let getDungeonBox = document.querySelector("#dungeonBox");
            let getDialogue = document.querySelector("#dialogue");

            getDialogue.style.backgroundColor = "black";
            getDialogue.style.borderRadius = "0 0 25px 25px";

            getDungeonBox.style.backgroundImage = "url('assets/Images/Backgrounds/" + badge + ".png')";
            getDungeonBox.style.backgroundSize = "cover";

            getDialogue.innerHTML = '<p>' + dia + '</p>';
            
        },

        printHangLines: function(){
            let getHashBox = document.querySelector("#hashBox");
            
            currWord = [];

            for (var i = 0; i < answer.word.length; i++){
                currWord.push("_");   
            }

            var hashString = currWord.join(" ");

            getHashBox.innerHTML = "<h1>" + hashString + "phobia</h1>";
        },

        printRemGuess: function(lives){
            let getRemGuessBox = document.querySelector("#remGuessBox");
            var lifeBar = "<h5>Guesses Left: ";

            for (var i = 0; i < lives; i++){
                lifeBar += " 👻 ";   
            }
            
            getRemGuessBox.innerHTML = lifeBar + "</h5>";
        },

        isAlph: function(letter) {
            return /^[a-zA-Z]+$/.test(letter);
        },

        checkGuess: function(letter){
            let getDialogue = document.querySelector("#dialogue");
            let getHashBox = document.querySelector("#hashBox");
            console.log(currWord);
            console.log(answer.word);

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
                    console.log(lives);
                    this.printRemGuess(lives);
                    var newDiv = document.createElement("p");
                    newDiv.textContent = "Unfortunately '" + letter.toUpperCase() + "' is not the name! The fear begins to manifest.";
                    getDialogue.prepend(newDiv); 
                }
                guessed.push(letter);
                this.printGuessWord(letter);
                
                
                var hashString = currWord.join(" ");

                getHashBox.innerHTML = "<h1>" + hashString + "phobia</h1>";
            }
            else {
                console.log("Key was not a letter; did not run checkGuess");
            }
        },

        checkIfAlreadyGuessed: function(letter){
            for (var i = 0; i < guessed.length; i++){

                if (guessed[i] == letter){
                    console.log("Found letter in guessed");
                    return true;
                }
            } 
            console.log("Did not find letter in guessed");
            return false;
        },

        printGuessWord: function(letter){
            let getPastGuess = document.querySelector("#pastGuessBox");

            getPastGuess.append(letter);
        },

        checkScores: function(){
            let getDialogue = document.querySelector("#dialogue");

            if (lives <= 0){
                var newDiv = document.createElement("div");
                newDiv.innerHTML = '<p>The fear cackles as it fully manifests--You lose!</p><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Click here to play again!</button>';
                getDialogue.prepend(newDiv);
                numDefeat = 0;
                getBadge.innerHTML = "";
                gameEnd = true;
            }

            var y = 0;

            for (var i = 0; i < currWord.length; i++ ){
                if (currWord[i] == answer.word[i]){
                    y++;
                }
            }

            if (y == currWord.length){
                numDefeat++;
                var newDiv = document.createElement("div");
                newDiv.innerHTML = '<p>The fear lets loose a warbly scream as it dissapates--You win!</p><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Click here to play again!</button>';
                getDialogue.prepend(newDiv);
                this.addBadge();
                gameEnd = true;
            }

            if (numDefeat >= 10){
                getDialogue.innerHTML = '<h3>Congratulations! You win!</h3><p><span class="sName">Shiver</span> thanks you--they\'re safe for now... That is, unless someone puts a new curse on them... </p><br><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Put a new curse on Shiver and start again!</button>';
                getBadge.innerHTML = "";
                gameEnd = true;
                numDefeat = 0;
            }
        },

        addBadge(){
            let getBadge = document.querySelector("#badges");
            var newDiv = document.createElement("div");
            newDiv.classList.add("badgeBut");
            newDiv.style.backgroundImage = "url('assets/Images/Icons/" + answer.badge + ".png')";
            getBadge.append(newDiv);
        },

        main: function() {

            document.onkeyup = function(event) {

                var letter = event.key.toLowerCase();
                if (!gameEnd){
                    console.log(letter);
                    game.checkGuess(letter);
                    game.checkScores();
                }

            };
        },
    }