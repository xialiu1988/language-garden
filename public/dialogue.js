'use strict';

$(document).ready(function () {
  $('#add-0').on('click', function (e) {
    console.log('hey');
    $('.dialoguebox').hide();
    $('#textq-0').val($('#greeting').text());
    // $('#greeting').show();
    e.preventDefault();

  });

  // $('#add-1').on('click', function(e) {
  //   $('.dialoguebox').hide();
  //   // $('#sports').show();
  //   $('#textq-1').val($('#sports').text());
  //   e.preventDefault();
  // });
  $('#add-1').on('click', function(e) {
    $('.dialoguebox').hide();
    // $('#food').show();
    $('#textq-1').val($('#food').text());
    e.preventDefault();
  });
  $('#add-2').on('click', function(e) {
    $('.dialoguebox').hide();
    // $('#weather').show();
    $('#textq-2').val($('#weather').text());
    e.preventDefault();
  });
});

  $('.form').on('click', function(){
    console.log('I\'m alive');


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


