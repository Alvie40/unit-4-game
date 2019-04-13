var game = {
    playerName: ["Supreme Leader", "Kylo Ren", "Phasma", "Key"],
    healthPoints: [200, 180, 150, 120],
    attackPower: [15, 20, 25, 30],
    counterattackPower: [20, 15, 25, 50],
    playerTracker: [0, 0, 0, 0],
    enemyTracker: [0, 0, 0, 0],
    defenderTracker: [0, 0, 0, 0],
    imageLocation: ["./assets/images/supremeleader.jpg",
        "./assets/images/kylorenProfile.jpg",
        "./assets/images/phasma.jpg",
        "./assets/images/key.jpg"],

    resetValues: function () {
        this.healthPoints = [100, 180, 150, 120];
        console.log(this.healthPoints);
        this.playerTracker = [1, 1, 1, 1];
        this.enemyTracker = [0, 0, 0, 0];
        this.defenderTracker = [0, 0, 0, 0];
        this.attackPower = [15, 20, 25, 30];
        chosen = false;
        gameover = false;
        powerBase = 0;
        wins = 0;
        $("#attackButton").text("Attack");
        $("#characterText").text("Your Character");
        $("#fightRow").text("Fight Section");
        this.drawCards();
    },

    drawCards: function () {
        $("#selectionRow").empty();
        $("#enemyRow").empty();
        $("#defenderRow").empty();

        for (var i = 0; i < 4; i++) {

            var playerCard = $("<div>");
            var enemyCard = $("<div>");
            var defenderCard = $("<div>");

            playerCard.addClass("playerCard");
            playerCard.attr("name", this.playerName[i]);
            playerCard.html("<p>" + this.playerName[i] + "</p> <img id='cardImage' src='" + this.imageLocation[i] + "'></br>");
            playerCard.append("HP " +this.healthPoints[i]);

            enemyCard.addClass("enemyCard");
            enemyCard.attr("name", this.playerName[i]);
            enemyCard.html("<p>" + this.playerName[i] + "</p> <img id='cardImage' src='" + this.imageLocation[i] + "'></br>");
            enemyCard.append("HP " +this.healthPoints[i]);

            defenderCard.addClass("defenderCard");
            defenderCard.attr("name", this.playerName[i]);
            defenderCard.html("<p>" + this.playerName[i] + "</p> <img id='cardImage' src='" + this.imageLocation[i] + "'></br>");
            defenderCard.append("HP " +this.healthPoints[i]);

            if (game.playerTracker[i] === 1) {
                $("#selectionRow").append(playerCard);
            };
            if (game.enemyTracker[i] === 1) {
                $("#enemyRow").append(enemyCard);
            };
            if (game.defenderTracker[i] === 1 && game.healthPoints[i] > 0) {
                $("#defenderRow").append(defenderCard);
            };
        }
    }
};

var chosen;
var saberOn = new Audio('https://soundbible.com/grab.php?id=562&type=mp3', 100, true);
var saberClash = new Audio('https://soundbible.com/grab.php?id=18&type=mp3', 100, true);
var playerIndex;
var enemyIndex;
var gameover;
var powerBase;
var wins;

game.resetValues();

// video init
$(document).ready(function() {

    var $videoSrc = " ";  
    $('.video-btn').click(function() {
        $videoSrc = $(this).data( "src" );
    });
    console.warn("point one");
    console.log($videoSrc);
    
      
      
    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function (e) {
        
    $("#video").attr('src',$videoSrc); 
    })
      
    
    
    // stop playing the video when I close the modal
    $('#myModal').on('hide.bs.modal', function (e) {
        $(".intro").empty();
        // $("#video").attr('src',$videoSrc); 
    }) 
        
        
    
    
      
      
    // document ready  
    });


    // video init end
    

$("#selectionRow").on("click", ".playerCard", function () {
    for (var i = 0; i < 4; i++) {
        if ($(this).attr("name") === game.playerName[i]) {
            game.playerTracker[i] = 1;
            playerIndex = i;
            powerBase = game.attackPower[i];
        }
        else {
            game.playerTracker[i] = 0;
            game.enemyTracker[i] = 1;
        }
    }

    saberOn.play();

    $("#attackButton").text("Reset");

    game.drawCards();
});

$("#enemyRow").on("click", ".enemyCard", function () {

    for (var i = 0; i < 4; i++) {
        if (game.enemyTracker[i] === 1 && $(this).attr("name") === game.playerName[i] && !chosen) {

            game.enemyTracker[i] = 0;
            game.defenderTracker[i] = 1;
            game.drawCards();

            enemyIndex = i;
            saberOn.play();
            chosen = true;

            $("#attackButton").text("Attack");
        }
    }
});

$("#attackButton").on("click", function () {
    if (!gameover && chosen) {

        saberClash.play();

        $("#characterText").text("Your Character Power: " + game.attackPower[playerIndex]);
        $("fightRow").empty();

        game.healthPoints[enemyIndex] -= game.attackPower[playerIndex];
        game.healthPoints[playerIndex] -= game.counterattackPower[enemyIndex];

        $("#fightRow").text("You attacked " + game.playerName[enemyIndex] + " for " + game.attackPower[playerIndex] + " damage!");
        $("#fightRow").append(" He countered with " + game.counterattackPower[enemyIndex] + " damage against you!");

        game.attackPower[playerIndex] += powerBase;

        game.drawCards();
        
        if (game.healthPoints[playerIndex] < 1) {

            $("#fightRow").text("You have been defeated by " + game.playerName[enemyIndex] + "! Press Restart to Start Over!");
            $("#attackButton").text("Restart");
            $("#playerCard").text("Defeated!");

            gameover = true;

            return;
        }

        if (game.healthPoints[enemyIndex] < 1) {
            
            $("#fightRow").text("You defeated " + game.playerName[enemyIndex] + "! Choose your next opponent!");
            $("#attackButton").text("Retreat!!");

            chosen = false;

            wins++;

            if (wins === 3) {
                $("#fightRow").text("You have defeated all the Enemies! Press Restart to Start Over!");
                $("#attackButton").text("Restart");
                gameover = true;
            }
        }
    }
    else {
        game.resetValues();
    }
});
