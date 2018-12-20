const express=require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const app=express();
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
const PORT=process.env.PORT||3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:'ssshhhhh'}));

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


var sess;
//very first page wait for log in/ signup
app.get('/',(req,res)=>{
  sess=req.session;
  sess.name;
  sess.phrasegoup;
  res.render('../views/pages/index');
});



//if new user, create an count, pwd hast to be '123'
var race=['white/Caucasian','African Americans','Mongoloid/Asian','Australoid','other'];
app.get('/signup',dosignup);
function dosignup(req,res){
  res.render('../views/pages/signup',{race:race});

}

//after fill out form store the user to the databse and get the user id ,we want to generate the phrases user saved later in the garden page
app.post('/signup',filloutform);
function filloutform(req,res){
  var name=req.body.user;
  var pwd=req.body.pw;
  let SQL = 'INSERT INTO users (username,pw) values ($1,$2)';
  let values = [name,pwd];
  client.query(SQL, values,(err,result)=>{
    if (err) {
      console.error(err);
      res.redirect('/error');
    }

    else{
      res.render('../views/pages/index');
    }
  });

}



//ok now user has an accnout in our app, go ahead log in should get the user to his own page showing his name at the corner

app.post('/login',(req,res)=>{
  var name=req.body.username;
  var pwd=req.body.password;
  var phrasegoup=[];

  sess=req.session;
  sess.name=name;

  return client.query('SELECT * FROM users,phrases WHERE users.id=phrases.users_id;',function(err,result){
    result.rows.forEach(item=>{
      if(name===item.username&& pwd===item.pw&&item.phrase){
        phrasegoup.push(item.phrase);
      } }
    );
    sess.phrasegoup=phrasegoup;
    res.render('../views/pages/garden',{data:name,phrasegoup:phrasegoup});
  });

});




app.get('/logout',(req,res)=>{
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }

  });
});

app.get('/game', getgame);
function getgame(req, res){
  res.render('../views/pages/game');
}

var textgroup=['Hello, how are you?', 'What\'s your name?', 'Where are you from?'];
var languages=[['af','Afrikaans'],['sq','Albanian'],['ar','Arabic'],['zh-CN','Chinese Simplified'],['nl','Dutch'],['de','German'],['it','Italian'],['hi','Hindi'],['pt','Portugese'],['ru','Russian'],['es','Spanish'],['ja','Japanese'],['ms','Malay'],['ko','Korean'],['fr','French'],['el','Greek'],['tr','Turkish'],['sw','Swahili'],['sv','Swedish']];

app.get('/phrases',getphrases);
function getphrases(req,res){
  sess=req.session;
  if(sess.name){
    res.render('../views/pages/phrase',{data:sess.name,textarr:textgroup,langs:languages});
  }
  else{
    res.render('../views/pages/index');
  }
}


//use can choose the phraes he/she likes saving it to the database

app.get('/savephrases',savethephrase);
function savethephrase(req,res){
  sess=req.session;
  console.log( req.query);
  sess.phrasegoup.push(req.query.phrase);
  client.query(`SELECT id from users WHERE username='${sess.name}';`,(err,result)=>{
    if (err) {
      console.error(err);
      res.redirect('/error');
    }

    else{
      let SQL= 'INSERT INTO phrases (phrase,users_id) values ($1,$2)';
      let values=[req.query.phrase,result.rows[0].id];

      return client.query(SQL, values,(err,result)=>{
        if (err) {
          console.error(err);
          res.redirect('/error');
        }

        else{
          res.render('../views/pages/phrase',{data:sess.name,textarr:textgroup,langs:languages});
        }
      });
    }
  });
}

app.get('/staylogin',stay);
function stay(req,res){
  
  sess=req.session;
 
  res.render('../views/pages/garden',{data:sess.name,phrasegoup:sess.phrasegoup});

}

var textdialoguegroup =['Greetings','Food','Weather'];
var change =[['af','Afrikaans'],['sq','Albanian'],['ar','Arabic'],['zh-CN','Chinese Simplified'],['es','Spanish'],['it','Italian'],['hi','Hindi'],['bn','Bengali'],['pt','Portugese'],['ru','Russian'],['ja','Japanese'],['ms','Malay'],['ko','Korean'],['fa','Persian'],['fr','French'],['el','Greek'],['tr','Turkish'],['uk','Ukranian'],['ur','Urdu'],['sw','Swahili']];
app.get('/dialogue',getdialogue);
function getdialogue(req,res){
  sess=req.session;
  res.render('../views/pages/dialogue',{data:sess.name,textarr:textdialoguegroup,langs:change});
}









app.get('*', (req, res) => {
  res.redirect('/error');
});

app.listen(PORT, () => {
  console.log(`listening port ${PORT}.`);
});
