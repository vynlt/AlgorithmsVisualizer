var PHP_DOMAIN = "";

// surprise colour!
// Referenced to in  home.js and viz.js also
var colourArray = ["#52bc69", "#d65775"/*"#ed5a7d"*/, "#2ebbd1", "#d9513c", "#fec515", "#4b65ba", "#ff8a27", "#a7d41e"]; // green, pink, blue, red, yellow, indigo, orange, lime



function getColours() {
    var generatedColours = [];
    while (generatedColours.length < 4) {
        var n = (Math.floor(Math.random() * colourArray.length));
        if ($.inArray(n, generatedColours) == -1)
            generatedColours.push(n);
    }
    return generatedColours;
}




function commonAction(retval, msg) {
    //setTimeout(function() {
    if (retval) { // mode == "exploration" && // now not only for exploration mode, but check if this opens other problems
        $('#current-action').show();
        $('#current-action').html(mode == "exploration" ? msg : ("e-Lecture Example (auto play until done)<br>" + msg));
        $('#progress-bar').slider("option", "max", gw.getTotalIteration() - 1);
        triggerRightPanels();
        isPlaying = true;
    }
    //}, 500);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable)
            return decodeURIComponent(pair[1]);
    }
    return "";
}

var generatedColours = getColours();
var surpriseColour = colourArray[generatedColours[0]];
var colourTheSecond = colourArray[generatedColours[1]];
var colourTheThird = colourArray[generatedColours[2]];
var colourTheFourth = colourArray[generatedColours[3]];



