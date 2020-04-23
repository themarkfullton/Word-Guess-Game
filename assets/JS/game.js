    let game = {
    
        instructions: function(){
            let getExpositionText = document.querySelector("#expositionText");
            getExpositionText.innerHTML = '<h3>How to Play:</h3><p>Try to guess the name of the fear before it gets you.</p><p>A description of the fear can be found in the bottom left-hand column. In the bottom right, you can see the word that needs to be guessed.</p><p>Press any key to guess whether the word has that letter in it. If you guess wrong, the fear will begin to manifest. Different fears take differing number of turns to manifest. The number of guesses you have left will be displayed in the lower right.</p><p>Your goal is to get <span class="sName">Shiver</span> to the other side of the map.</p><h4>Good luck!</h4></p><br><button type="button" class="btn btn-success  btn-lg btn-block" onclick="game.hideInstr(); game.main()">Play Game</button>';
        },

        setGameUp: function(){
            this.hideInstr();
            this.main();
        },

        hideInstr: function(){
            let getExposition = document.querySelector("#exposition");
            getExposition.style.display = 'none';
        },

        main: function() {
            document.onkeyup = function(event) {

                var letter = event.key.toLowerCase();
        
                console.log(letter);

            };
        },
    }