var PHP_DOMAIN = "";

// surprise colour!
// Referenced to in  home.js and viz.js also
var colourArray = ["#52bc69", "#d65775"/*"#ed5a7d"*/, "#2ebbd1", "#d9513c", "#fec515", "#4b65ba", "#ff8a27", "#a7d41e"]; // green, pink, blue, red, yellow, indigo, orange, lime

function disableScroll() { $('html').css('overflow', 'hidden'); }

function enableScroll() { $('html').css('overflow', 'visible'); }

function replaceAll(find, replace, str) { return str.replace(new RegExp(find, 'g'), replace); }

function getColours() {
  var generatedColours = new Array();
  while (generatedColours.length < 4) {
    var n = (Math.floor(Math.random() * colourArray.length));
    if ($.inArray(n, generatedColours) == -1)
      generatedColours.push(n);
  }
  return generatedColours;
}

function isOn(value, position) {
  return (value>>position) & 1 === 1;
}

function customAlert(msg) {
  $('#custom-alert p').html(msg);
  var m = -1 * ($('#custom-alert').outerHeight()/2);
  $('#custom-alert').css('margin-top', m+'px');
  $('#dark-overlay').fadeIn(function() {
    $('#custom-alert').fadeIn(function() {
      setTimeout(function() {
        $('#custom-alert').fadeOut(function() {
          $('#dark-overlay').fadeOut();
        });
      }, 1000);
    });
  });
}

function showLoadingScreen() {
  $('#loading-overlay').show();
  $('#loading-message').show();
}

function hideLoadingScreen() {
  $('#loading-overlay').hide();
}

function commonAction(retval, msg) {
  //setTimeout(function() {
    if (retval) { // mode == "exploration" && // now not only for exploration mode, but check if this opens other problems
      $('#current-action').show();
      $('#current-action').html(mode == "exploration" ? msg : ("e-Lecture Example (auto play until done)<br>" + msg));
      $('#progress-bar').slider("option", "max", gw.getTotalIteration()-1);
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

$(function() {
  $('.links').css('background', surpriseColour);
  $('.right-links').css('background', surpriseColour);
  $('#login-go').css('background', surpriseColour);

  $('.colour').css("color", surpriseColour); // name
  $('h4').css("background-color", surpriseColour); // about, contact us etc. button background

  // title
  $('#title a').click(function() {
    $('#title a').removeClass('selected-viz');
    $(this).addClass('selected-viz');
    // temporary quick fix for Google Chrome Aug 2016 issue...
    setTimeout(function(){ document.body.style.zoom = "100.1%"; }, 100); // force resize/redraw...
    setTimeout(function(){ document.body.style.zoom = "100%"; }, 600);
  });

  // overlays stuffs
  $('#trigger-about').click(function() {
    if ($(window).width() > 600) {
      $('#dark-overlay').fadeIn(function() {
        $('#about').fadeIn();
      });
    }
    else
      alert('Sorry, this dialog is too big. Please load it on bigger screen');
  });

  $('#trigger-team').click(function() {
    if ($(window).width() > 600) {
      $('#dark-overlay').fadeIn(function() {
        $('#team').fadeIn();
      });
    }
    else
      alert('Sorry, this dialog is too big. Please load it on bigger screen');
  });

  $('#trigger-terms').click(function() {
    if ($(window).width() > 600) {
      $('#dark-overlay').fadeIn(function() {
        $('#termsofuse').fadeIn();
      });
    }
    else
      alert('Sorry, this dialog is too big. Please load it on bigger screen');
  });

  $('.close-overlay').click(function() {
    $('.overlays').fadeOut(function() {
      $('#dark-overlay').fadeOut();
    });
  });

  $('#dark-overlay').click(function() {
    $('.overlays').fadeOut();
    $('#dark-overlay').fadeOut();
  });

  $.get('/isloggedin', function(data) {
    var isLoggedIn = data['isloggedin'] == '1';
    var element;
    if (isLoggedIn) {
      // element = '<a onclick="verifyLogout()">Logout</a>';
      element = '<a href="https://visualgo.net/profile">Profile</a>'; 
    }
    else {
      element = '<a href="https://visualgo.net/login">Login</a>'
    }
    $('#useraccount').html(element);
  });
});

function verifyLogout() {
  // Steven's remarks: use a better 'confirm' than the default :(
  var doesLogout = confirm('Are you sure to logout?');
  if (doesLogout == true) {
    window.location = "https://visualgo.net/logout";
  }
}

function checkLogin() {
  $.get('/checklogin', function(data) {
    var url = data['url'];
    window.location.href = '/' + url;
  });
}