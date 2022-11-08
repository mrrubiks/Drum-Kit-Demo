var buttonLookupTable = { j: "crash", k: "kick-bass", l: "snare", w: "tom-1", a: "tom-2", s: "tom-3", d: "tom-4" };

var buttonAudioElements = {};
for (var key in buttonLookupTable) { 
    //pre load the audio elements
    var audio = new Audio('sounds/' + buttonLookupTable[key] + '.mp3');
    buttonAudioElements[key] = audio;
}

var buttons = document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', mouseDownHandler);
    button.addEventListener('mouseup', mouseUpHandler);
});

document.addEventListener('keydown', function (event) {
    if (buttonLookupTable.hasOwnProperty(event.key)) {
        //reuse the click handler by assigning the button as this and then calling the function
        mouseDownHandler.call(document.querySelector('.' + event.key));

        //or by creating a fake click event
        //document.querySelector('button.' + event.key).dispatchEvent(new Event('click'));
    }
});

document.addEventListener('keyup', function (event) {
    if (buttonLookupTable.hasOwnProperty(event.key)) {
        mouseUpHandler.call(document.querySelector('.' + event.key));
    }
});

function mouseDownHandler() {
    //add animation
    this.classList.add('pressed');
}

function mouseUpHandler() {
    this.classList.remove('pressed');
    buttonAudioElements[this.innerHTML].currentTime = 0;
    buttonAudioElements[this.innerHTML].play();
}