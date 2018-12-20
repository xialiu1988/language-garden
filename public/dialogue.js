'use strict';




$(document).ready(function() {
  $('#add-0').on('click', function(e) {
    console.log('hey');
    $('.dialoguebox').hide();
    $('#textq-0').val($('#greeting').text());
    // $('#greeting').show();
    e.preventDefault();

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

  

   
    $('.form').on('click', function(){
      console.log("I'm alive");


      var $toggle=$(this);
      var textid='#textq-'+$toggle.data('id');
      var tarid='#dialogue-'+$toggle.data('id');
      console.log(textid+'hey');
      console.log(tarid);
      console.log($(textid).val());
      console.log($(tarid).val());

      var url = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCu_L955TWKLiDJdqI61-3xf5M_Ankyh44';
      url += '&source=' + 'en';
      url += '&target=' + $(tarid).val();
      url += '&q=' + escape($(textid).val());
  
      $.get(url, function (data, status) {
        $('#text-'+$toggle.data('id')).val(data.data.translations[0].translatedText);
      });
  
    });

});
