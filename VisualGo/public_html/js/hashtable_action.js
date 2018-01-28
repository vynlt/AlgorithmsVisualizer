var actionsWidth = 150;
var statusCodetraceWidth = 420;

var isCreateOpen = false;
var isSearchOpen = false;
var isInsertOpen = false;
var isRemoveOpen = false;

function openCreate() {
  $(".create").css("bottom", "146px");
  $('#createfixedsize-input').hide();
  $('#createuserdefined-input').hide();
  if (!isCreateOpen) {
    $('.create').fadeIn('fast');
    isCreateOpen = true;
  }
}

function closeCreate() {
  if (isCreateOpen) {
    $('.create').fadeOut('fast');
    $('#create-err').html("");
    isCreateOpen = false;
  }
}

function openSearch() {
  if (!isSearchOpen) {
    $('.search').fadeIn('fast');
    isSearchOpen = true;
  }
}

function closeSearch() {
  if (isSearchOpen) {
    $('.search').fadeOut('fast');
    $('#search-err').html("");
    isSearchOpen = false;
  }
}

function openInsert() {
  $(".insert").css("bottom", "92px");
  $('#insertkth-input').hide();
  $('#inserthead-input').hide();
  $('#inserttail-input').hide();
  if (!isInsertOpen) {
    $('.insert').fadeIn('fast');
    isInsertOpen = true;
  }
}

function closeInsert() {
  if (isInsertOpen) {
    $('.insert').fadeOut('fast');
    $('#insert-err').html("");
    isInsertOpen = false;
  }
}

function openRemove() {
  $(".remove").css("bottom", "65px");
  $('#removekth-input').hide();
  if (!isRemoveOpen) {
    $('.remove').fadeIn('fast');
    isRemoveOpen = true;
  }
}

function closeRemove() {
  if (isRemoveOpen) {
    $('.remove').fadeOut('fast');
    $('#remove-err').html("");
    isRemoveOpen = false;
  }
}

function hideEntireActionsPanel() {
  closeCreate();
  closeSearch();
  closeInsert();
  closeRemove();
  hideActionsPanel();
}

$('#play').hide();
var htw = new HashTable();
var gw = htw.getGraphWidget();

$(function() {


  var hashMode = getQueryVariable("mode");
  if (hashMode.length > 0) {
    $('#title-'+hashMode).click();
  }
  var createHT = getQueryVariable("create");
  if (createHT.length > 0) {
    var newHT = createHT.split(",");
    if (newHT.length == 1)
      htw.createTable(createHT);
    else
      htw.generate(newHT);
  }
  var insert = getQueryVariable("insert");
  if (insert.length > 0) {
    $('#v-insert').val(insert);
    openInsert();
  }
  var remove = getQueryVariable("remove");
  if (remove.length > 0) {
    $('#v-remove').val(remove);
    openRemove();
  }

  $('#create').click(function() {
    closeSearch();
    closeInsert();
    closeRemove();
    openCreate();
  });
  $('#search').click(function() {
    closeCreate();
    closeInsert();
    closeRemove();
    openSearch();
  });
  $('#insert').click(function() {
    closeCreate();
    closeSearch();
    closeRemove();
    openInsert();
  });
  $('#remove').click(function() {
    closeCreate();
    closeSearch();
    closeInsert();
    openRemove();
  });
});


function createTable() {
  if (isPlaying) stop();
  var input = parseInt($('#v-create').val());
  if (htw.createTable(input)) {
    $('#progress-bar').slider("option", "max", 0);
    closeCreate();
    isPlaying = false;
  }
  hideStatusPanel();
  hideCodetracePanel();
}

function createTableSpecial(_HT) {
  if (isPlaying) stop();
  htw.createTableSpecial(_HT);
  $('#progress-bar').slider("option", "max", 0);
  closeCreate();
  isPlaying = false;
  
}

function insertInteger(callback) {
  if (isPlaying) stop();
  var input = $('#v-insert').val();
  commonAction(htw.insert(input, callback), "Insert " + input);

}

function searchInteger(callback) {
  if (isPlaying) stop();
  var input = parseInt($('#v-search').val());
  commonAction(htw.search(input, callback), "Search " + input);
}

function removeInteger(callback) {
  if (isPlaying) stop();
  var input = parseInt($('#v-remove').val());
  commonAction(htw.remove(input, callback), "Remove " + input);
}


