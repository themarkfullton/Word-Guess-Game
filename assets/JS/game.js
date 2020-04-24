    var answer ='';
    var maxWrong = 0;
    var mistakes = 0;
    var guessed = [];
    var numDefeat = 0;

    let game = {
        
        instructions: function(){
            let getExpositionText = document.querySelector("#expositionText");
            getExpositionText.innerHTML = '<h3>How to Play:</h3><p>Try to guess the name of the fear before it gets you.</p><p>A description of the fear can be found in the bottom left-hand column. In the bottom right, you can see the word that needs to be guessed.</p><p>Press any key to guess whether the word has that letter in it. If you guess wrong, the fear will begin to manifest. Different fears take differing number of turns to manifest. The number of guesses you have left will be displayed in the lower right.</p><p>Your goal is to get <span class="sName">Shiver</span> to the other side of the map.</p><h4>Good luck!</h4></p><br><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.setGameUp()">Play Game</button>';
        },

        setGameUp: function(){
            let getDungeonText = document.querySelector('#dungeonText');
            let getHeader = document.querySelector('#header');
            
            getHeader.style.backgroundColor = "black";
            getHeader.innerHTML = "<h1>THINGS THAT GO BUMP</h1>";
            getDungeonText.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    
            this.hideInstr();
            this.selectSetting();
            this.writeScore();
            this.wordSetUp();
            this.main();
        },

        hideInstr: function(){
            let getExposition = document.querySelector("#exposition");
            let getInterface = document.querySelector("#interface");
            getExposition.style.display = 'none';
            getInterface.style.display = 'visible';

        },

        selectSetting: function(){
            let getDungeonBox = document.querySelector("#dungeonBox");
            let getPlaceTitle = document.querySelector("#placeTitle");
            let getDialogue = document.querySelector("#dialogue");

            setting = Math.floor(Math.random() * 4);

            switch(setting) {
                case 0:
                    getDungeonBox.style.backgroundImage = 'url("assets/images/Settings/set-city.jpg")';
                    getPlaceTitle.innerHTML = "<h4>Abandonned Street</h4>";
                    getDialogue.innerHTML = '<p>On the way home, <span class="sName">Shiver</span> feels someone watching them...</p>';
                    break;
                case 1:
                    getDungeonBox.style.backgroundImage = 'url("assets/images/Settings/set-forest.jpg")';
                    getPlaceTitle.innerHTML = "<h4>Forgotten Forest</h4>";
                    getDialogue.innerHTML = '<p><span class="sName">Shiver</span> awakes from their sleep only time find themselves in a forboding forest...</p>';
                    break;
                case 2:
                    getDungeonBox.style.backgroundImage = 'url("assets/images/Settings/set-hospital.jpg")';
                    getPlaceTitle.innerHTML = "<h4>Twisted Hospital</h4>";
                    getDialogue.innerHTML = '<p>Although they intended to walk home, <span class="sName">Shiver\'s</span> feet took them to this abandonned hospital...</p>';
                    break;
                case 3:
                    getDungeonBox.style.backgroundImage = 'url("assets/images/Settings/set-house.jpg")';
                    getPlaceTitle.innerHTML = "<h4>Living Mansion</h4>";
                    getDialogue.innerHTML = '<p>Who lives here? <span class="sName">Shiver</span> certainly doesn\'t... Though they woke up here all the same...</p>';
                    break;
                case 4:
                    getDungeonBox.style.backgroundImage = 'url("assets/images/Settings/set-village.jpg")';
                    getPlaceTitle.innerHTML = "<h4>Fishing Village</h4>";
                    getDialogue.innerHTML = '<p>While on a cross-country trip, <span class="sName">Shiver</span> found themselves checking out this old, New England town...</p>';
                    break;
              }
        },

        writeScore: function(){
            let getScoreBox = document.querySelector("#scoreBox");
            getScoreBox.innerHTML = "<h5>Defeated " + numDefeat + " of 10</h5>";
        },

        wordSetUp: function(){
            let getFearPic = document.querySelector("#fearPic");
            let getFearBox = document.querySelector("#fearBox");
            var indexNum = Math.floor(Math.random() * dictionary.length);

            answer = dictionary[indexNum];
            lives = dictionary[indexNum].error;

            getFearPic.innerHTML = '<img alt="fear" src="assets/Fears/'+ indexNum +'0>';
            getFearBox.innerHTML = '<h5>' + answer.desc + '</h5>'
            this.printHangLines();
            this.printRemGuess(lives);
        },

        printHangLines: function(){
            let getHashBox = document.querySelector("#hashBox");
            var hashString = "<h1>";

            for (var i = 0; i < answer.word.length; i++){
                hashString += " _ ";   
            }
            
            getHashBox.innerHTML = hashString + "</h1>";
        },

        printRemGuess: function(lives){
            let getRemGuessBox = document.querySelector("#remGuessBox");
            var lifeBar = "<h5>GUESSES LEFT: ";

            var lives = answer.error - mistakes;

            for (var i = 0; i < lives; i++){
                lifeBar += " 👻 ";   
            }
            
            getRemGuessBox.innerHTML = lifeBar + "</h5>";
        },

        main: function() {
            document.onkeyup = function(event) {

                var letter = event.key.toLowerCase();
        
                console.log(letter);

            };
        },
    }