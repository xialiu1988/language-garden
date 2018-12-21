console.log('running');
$(document).ready(function(){

  $('.formbutton').click(function(){

    var $toggle=$(this);
    var textid='#text-'+$toggle.data('id');
    var tarid='#phrases-'+$toggle.data('id');

    console.log($(tarid).val());
    var url = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCu_L955TWKLiDJdqI61-3xf5M_Ankyh44';

    url += '&source=' + 'en';
    url += '&target=' + $(tarid).val();
    url += '&q=' + escape($(textid).val());

    $.get(url, function (data, status) {
      $('#textq-'+$toggle.data('id')).val(data.data.translations[0].translatedText);
      u.lang=$(tarid).val();
      speak($('#textq-'+$toggle.data('id')).val(),u.lang);
    });

  });
});


var u = new SpeechSynthesisUtterance();
function speak(textToSpeak,uu) {
  var synth = window.speechSynthesis;
  u.lang = uu;
  u.rate = 1;
  u.text = textToSpeak;
  synth.speak(u);
}



$('.deletebutton').click(function(){

  var $toggle=$(this);
  var textclass='#delete-'+$toggle.data('id');
  var data=$(textclass).text();
console.log(data);
  $.ajax({
    type: 'GET',
    data: {phrase:data},
    
    contentType:'application/json',
    url: '/deletephrases',
    success: function(data) {
      console.log('success');
      console.log(JSON.stringify(data));
    }
  });
});
//save button
$('.savebutton').click(function(){

  var $toggle=$(this);
  var textclass='.save-'+$toggle.data('id');
  var data=$(textclass).val();
console.log(data);
  $.ajax({
    type: 'GET',
    data: {phrase:data},
    
    contentType:'application/json',
    url: '/savephrases',
    success: function(data) {
      console.log('success');
      console.log(JSON.stringify(data));
    }
  });
});


