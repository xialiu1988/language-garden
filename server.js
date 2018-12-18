const express=require('express');
const app=express();

const PORT=process.env.PORT||3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
require('dotenv').config();
app.set('view engine','ejs');

const pg = require('pg');
const dbaddress = process.env.DATABASE_URL;
const client = new pg.Client(dbaddress);
client.connect();
client.on('error', err => console.log(err));


const {Translate} = require('@google-cloud/translate');
const projectId ='language-garden';
const translate = new Translate({
  projectId: projectId,
});




app.get('/',(req,res)=>{
  res.render('../views/pages/index');

});


app.post('/login',(req,res)=>{
  var name=req.body.username;
  var pwd=req.body.password;

  if(pwd==='123'){
    res.render('../views/pages/garden',{data:name});
  }
  else{
    res.render('../views/pages/error');
  }}
);

app.get('/logout',(req,res)=>{
  res.render('../views/pages/index');

});



// // The text to translate
// const text = 'Hello, world!';
// The target language


// Translates some text into Russian
// translate
//   .translate(text, target)
//   .then(results => {
//     const translation = results[0];

//     console.log(`Text: ${text}`);
//     console.log(`Translation: ${translation}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });



var textgroup=['Thanks so much!','how are you','Good Morning!','Good afternoon!','where are you from','what is going on?','can you help me?','where is restroom?','do you know...?','That\'s awesome!','sorry i cannot..','what is your name?','what language you speak?','do you want a drink?'];
var languages=[['af','Afrikaans'],['sq','Albanian'],['ar','Arabic'],['zh-CN','Chinese Simplified'],['es','Spanish'],['it','Italian'],['hi','Hindi'],['bn','Bengali'],['pt','Portugese'],['ru','Russian'],['ja','Japanese'],['ms','Malay'],['ko','Korean'],['fa','Persian'],['fr','French'],['el','Greek'],['tr','Turkish'],['uk','Ukranian'],['ur','Urdu'],['sw','Swahili']];
app.get('/phrases',getphrases);
function getphrases(req,res){

  res.render('../views/pages/phrase',{textarr:textgroup,langs:languages});
}










var dialoguegroup =['Greetings','sports','Direction','food','weather']
var change =[['af','Afrikaans'],['sq','Albanian'],['ar','Arabic']];
app.get('/dialogue',getdialogue);
function getdialogue(req,res){
  res.render('../views/pages/dialogue',{textarr:dialoguegroup,langs:change});
}








app.get('*', (req, res) => {
  res.redirect('/error');
});
app.listen(PORT, () => {
  console.log(`listening port ${PORT}.`);
});
