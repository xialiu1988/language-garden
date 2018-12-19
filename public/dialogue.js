'use strict';




$(document).ready(function() {
  $('#add-0').on('click', function() {
     $('.dialoguebox').hide();
     $('#greeting').show();
    
    //   var $toggle=$(this);
    // var id = 'toggle' + $toggle.data(id);
    // $('id').toggle();

  });
  $('#add-1').on('click', function() {
    $('.dialoguebox').hide();
    $('#sports').show();
  });
  $('#add-2').on('click', function() {
    $('.dialoguebox').hide();
    $('#food').show();
  });
  $('#add-3').on('click', function() {
    $('.dialoguebox').hide();
    $('#weather').show();
  });

});



