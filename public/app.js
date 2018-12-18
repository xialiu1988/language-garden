console.log('running');
$(document).ready(function(){

  $('.formbutton').click(function(){

    var $toggle=$(this);

    var textid='#text-'+$toggle.data('id');
    var tarid='#phrases-'+$toggle.data('id');
    var url = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyATyAPRLeJ6PjtZ0E7i1ZrB-ymt9t1kWpQ';
    url += '&source=' + 'en';
    url += '&target=' + $(tarid).val();
    url += '&q=' + escape($(textid).val());

    $.get(url, function (data, status) {
      $('#textq-'+$toggle.data('id')).val(data.data.translations[0].translatedText);
    });

  });
});
