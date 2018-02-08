var consoleWidth = 300;

$('#console-hide').click(function()
{if(isConsoleOpen())
    hideConsolePanel();
else
    showConsolePanel();});

function isConsoleOpen(){return $('#console-hide img').hasClass('rotateRight');}
function showConsolePanel(){if(!isConsoleOpen()){$('#console-hide img').removeClass('rotateLeft').addClass('rotateRight');$('#console').animate({width:"+="+ consoleWidth,});}}
function hideConsolePanel(){if(isConsoleOpen()){$('#console-hide img').removeClass('rotateRight').addClass('rotateLeft');$('#console').animate({width:"-="+ consoleWidth,});}}

$('#status').bind("DOMSubtreeModified",function(){
    $('#console').append($('#status').html());
});

function clearConsole(callback) {
    $('#console').html('');
}