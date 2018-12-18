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

app.get('/game', getgame);
function getgame(req, res){
  res.render('../views/pages/game');
}


var textgroup=['Thanks so much!','how are you','Good Morning!','Good afternoon!','where are you from','what is going on?','can you help me?','where is restroom?','do you know...?','That\'s awesome!','sorry i cannot..','what is your name?','what language you speak?','do you want a drink?'];
var languages=[['af','Afrikaans'],['sq','Albanian'],['ar','Arabic'],['zh-CN','Chinese Simplified'],['nl','Dutch'],['de','German'],['it','Italian'],['hi','Hindi'],['pt','Portugese'],['ru','Russian'],['es','Spanish'],['ja','Japanese'],['ms','Malay'],['ko','Korean'],['fr','French'],['el','Greek'],['tr','Turkish'],['sw','Swahili'],['sv','Swedish']];
app.get('/phrases',getphrases);
function getphrases(req,res){

  res.render('../views/pages/phrase',{textarr:textgroup,langs:languages});
}











app.get('*', (req, res) => {
  res.redirect('/error');
});
app.listen(PORT, () => {
  console.log(`listening port ${PORT}.`);
});
