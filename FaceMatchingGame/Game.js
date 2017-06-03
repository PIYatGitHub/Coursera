/**
 * Created by Peter on 25.5.2017
 */
var elements = document.getElementsByClassName("gameStarter"),
    len= elements.length,
    i=0,
    emoji,
    currentLevel=1;
for (i; i < len; i+=1) {
    elements[i].addEventListener('click',getSource,false);
}
function getSource() {
    emoji = this.src;
    // WORKS!!! console.log(emoji)
    unloader();
}
function unloader() {
    var parent = document.getElementsByTagName("body")[0],
        child = document.getElementById("emojiContainer"),
        child2 = document.getElementById("emojiPicker");
    parent.removeChild(child);
    parent.removeChild(child2);
    loader();
}
function loader() {
    // load the line
    var line = document.getElementById('myLine'),
        lefttext= document.getElementById('leftText'),
        rightText= document.getElementById('rightText'),
        leftDiv= document.getElementById('leftSide'),
        rightDiv= document.getElementById('rightSide');
    line.style.visibility="visible";
    var count = 0;
    var interval = window.setInterval(function() {
        line.setAttribute('y2', 20 + +line.getAttribute('y2'));
        line.setAttribute('y1', line.getAttribute('y1') - 20);
        if (count++ > 200)
            window.clearInterval(interval);
    }, 50);
    // load some visual stuff
    lefttext.className = "animated fadeInLeftBig";
    lefttext.style.visibility="visible";
    rightText.className = "animated fadeInLeftBig";
    rightText.style.visibility="visible";
    leftDiv.style.visibility="visible";
    rightDiv.style.visibility="visible";
    gameOn();

}

var onStartClick = function() {
    var startMe = document.getElementById("start");
    startMe.style.visibility="hidden";
    document.getElementById("emojiContainer").style.visibility="visible";

    var par1 = document.getElementById("emojiPicker");
    par1.innerHTML = "Pick up your favorite emoji and roll!";
    //par1.classList.add('animated%20tada');
    par1.className = "animated tada";
    document.getElementById("emojiContainer").style.visibility="visible";
    currentLevel = 1;
};
var onAboutClick = function() {
    swal({
        title: "About this game:",
        text: "1. Pick your favorite face and let the fun roll!!!" + "\n\n\r"+
        "2. Be careful you  have only one try to guess which is the extra face on the left hand side and every error is fatal."+ "\n\n\r"+
        "3. Once you guess, you go to the next level of even tougher guessing." + "\n\n\r" +
        "4. Have fun and try not to break the mouse :D!",
        type: "info",
        showCancelButton: false,
        confirmButtonColor: "#032E37",
        confirmButtonText: "OK, got it!",
        closeOnConfirm: false,
        closeOnCancel: false
    });

};
var onCreditsClick = function() {
    swal({
        title: "I am thankful to:",
        text: "1. Background: http://www.hdwallpapers.in/walls" + "\n\n\r"+
        "2. Emoji 1: https://vignette1.wikia.nocookie.net" + "\n\n\r"+
        "3. Emoji 2: http://www.hey.fr/fun" + "\n\n\r" +
        "4. Emoji 3: http://rs631.pbsrc.com/albums" + "\n\n\r" +
        "5. Emoji 4: http://cliparts.co/cliparts" + "\n\n\r" +
        "6. Emoji 5: https://vignette4.wikia.nocookie.net" + "\n\n\r" +
        "7. Huge thanks to: Animate.css; Swal.js and Font Awesome.css - you make things awesome!",
        type: "info",
        showCancelButton: false,
        confirmButtonColor: "#032E37",
        confirmButtonText: "OK, great!",
        closeOnConfirm: false,
        closeOnCancel: false
    });

};
var about = document.getElementById("clickableAwesomeFont");
about.addEventListener('click', onAboutClick , false);
var element = document.getElementById("start");
element.addEventListener('click', onStartClick , false);
var credits = document.getElementById("clickableCredits");
credits.addEventListener('click', onCreditsClick , false);

function gameOn() {
    if (currentLevel>1) {
        deleteOldFaces();

    }
    for (i=0; i<currentLevel*5; i+=1) {

        if(i==((currentLevel*5)-1)) {
            loadFace(true)
        } else {
            loadFace();
        }
    }
}
function deleteOldFaces() {
    var deletable1 = document.getElementById("leftSide"),
        deletable2=document.getElementById("rightSide");
    deletable1.innerHTML="";
    deletable2.innerHTML="";
}
function loadFace(param1) {
    var rigtDiv= document.getElementById("rightSide"),
        leftDiv= document.getElementById("leftSide"),
        child,
        childClone;

    child=document.createElement("IMG");
    child.src=emoji;
    child.style.position="absolute";
    child.style.marginTop=(Math.floor(Math.random()*75)).toString() + "%";
    child.style.marginLeft=(Math.floor(Math.random()*50) + 15).toString() + "%";
    child.style.width="75px";
    child.style.height = "auto";
    child.style.padding="10px";
    child.style.cursor="pointer";
    if (param1) {
        child.addEventListener('click', function () {

            currentLevel+=1; // goes currentLevel up
            gameOn();
            return true
        } , false);
    } else {
        child.addEventListener('click', onFaceClicked , false);
        childClone = child.cloneNode(true);
        childClone.style.marginTop = child.style.marginTop + 50 + "%";
        childClone.style.marginLeft = child.style.marginLeft + 50+ "%";
        rigtDiv.appendChild(childClone);
    }

    leftDiv.appendChild(child);

}
function onFaceClicked() {

    deleteOldFaces();
    clearScreen();
    swal({
        title: "Game Over!",
        text: "You reached level "+ currentLevel + "! Awesome!",
        type: "info",
        showCancelButton: false,
        confirmButtonColor: "#032E37",
        confirmButtonText: "Epic!",
        closeOnConfirm: false,
        closeOnCancel: false

    }, function () {
        window.location.reload();
    });
    currentLevel=1;

}
function clearScreen() {
    document.getElementById("rightSide").style.visibility="hidden";
    document.getElementById("leftSide").style.visibility="hidden";
    document.getElementsByClassName("svg-container")[0].style.display="none";
    document.getElementById("leftText").style.visibility="hidden";
    document.getElementById("rightText").style.visibility="hidden";
}
