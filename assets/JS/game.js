    let answer ='';
    let maxWrong = 0;
    let mistakes = 0;
    let guessed = [];
    let currWord = null;
    let totalRight = 0;

    let game = {
        

        instructions: function(){
            let getExpositionText = document.querySelector("#expositionText");
            getExpositionText.innerHTML = '<h3>How to Play:</h3><p>Try to guess the name of the fear before it gets you.</p><p>A description of the fear can be found in the bottom left-hand column. In the bottom right, you can see the word that needs to be guessed.</p><p>Press any key to guess whether the word has that letter in it. If you guess wrong, the fear will begin to manifest. Different fears take differing number of turns to manifest. The number of guesses you have left will be displayed in the lower right.</p><p>Your goal is to get <span class="sName">Shiver</span> to the other side of the map.</p><h4>Good luck!</h4></p><br><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.hideInstr(); game.main()">Play Game</button>';
        },

        setGameUp: function(){
            this.hideInstr();
            this.selectSetting();
            this.wordSetUp();
            this.main();
        },

        hideInstr: function(){
            let getExposition = document.querySelector("#exposition");
            getExposition.style.display = 'none';
        },

        selectSetting: function(){
            let getDungeonBox = document.querySelector("#dungeonBox");
            let getPlaceTitle = document.querySelector("#placeTitle");

            setting = Math.floor(Math.random() * 4);

            switch(setting) {
                case 0:
                    getDungeonBox.style.backgroundImage = 'assets/images/Settings/set-city.jpg';
                    getPlaceTitle.innerHTML = "<h4>Abandonned Street</h4>";
                    break;
                case 1:
                    getDungeonBox.style.backgroundImage = 'assets/images/Settings/set-forest.jpg';
                    getPlaceTitle.innerHTML = "<h4>Forgotten Forest</h4>";
                    break;
                case 2:
                    getDungeonBox.style.backgroundImage = 'assets/images/Settings/set-hospital.jpg';
                    getPlaceTitle.innerHTML = "<h4>Twisted Hospital</h4>";
                    break;
                case 3:
                    getDungeonBox.style.backgroundImage = 'assets/images/Settings/set-house.jpg';
                    getPlaceTitle.innerHTML = "<h4>Living Mansion</h4>";
                    break;
                case 4:
                    getDungeonBox.style.backgroundImage = 'assets/images/Settings/set-village.jpg';
                    getPlaceTitle.innerHTML = "<h4>Fishing Village</h4>";
                    break;
              }
        },

        wordSetUp: function(){
            let getFearPic = document.querySelector("#fearPic");
            let getfearBox = document.querySelector("#fearBox");
            let getNameBox = document.querySelector("#Name Box");
            let getRemGuess = document.querySelector("#remGuessBox");
            
            var indexNum = Math.floor(Math.random() * dictionary.length);

            answer = dictionary[indexNum];
            lives = dictionary[indexNum][error];

            getFearPic.innerHTML = '<img alt="fear" src="assets/Fears/'+ indexNum +'0>';
            getfearBox.innerHTML = '<h5>' + dictionary[indexNum][desc].toUpperCase + '</h5>'
            getNameBox.innerHTML = '<h4>' + this.printHangLines() + '</h4>';
            getRemGuess.innerHTML = lifeBar(lives);
        },

        printHangLines: function(){
            currWord = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
        },

        printRemGuess: function(lives){
            var lifeBar = '<h5>GUESSES LEFT:</h5> <span id="livesRem">'; 
            
            for(var i = 0; i <= lives; i++){
                lifeBar += '👻';
            }

            lifeBar += '</span>';

            return lifeBar;
        },

        main: function() {
            document.onkeyup = function(event) {

                var letter = event.key.toLowerCase();
        
                console.log(letter);

            };
        },
    }