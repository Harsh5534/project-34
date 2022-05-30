const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,candy,ground;
var candy_con;
var candy_con_2;
var candy_con_3;
var rope3;

var bg_img;
var candy;
var monster_img;

var button,button2,button3;
var monster;
var blink,eat,sad;
var mute_btn;
var star_img,star;
var blower;
var ground;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var bubble,bubble_img;

function preload()
{
  bg_img = loadImage('bg_img.jpg');
  candy = loadImage('candy.jpg');
  monster_img = loadImage('cut-the-rope-feedme.gif');
  ground = loadImage('')
  star_img = loadImage('star.png');
  empty_star = loadImage('empty.png');
  one_star = loadImage('one_star.png');
  two_star = loadImage('stars.png');
  
  bk_song = loadSound('penguinmusic-modern-chillout-12641.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('chewing.mp3');
  air = loadSound('air.wav');

  eat = loadImage("eat.gif");
  sad = loadImage('sad.gif');

  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(windowHeight,windowWidth);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(120,70);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(410,200);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);
  eat.frameDelay = 20;

  monster = createImg('monster.jpg');
  monster.position(width-200,500);
  monster.size(80,80);

  star = createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale = 0.02;

  star2 = createSprite(50,370,20,20);
  star2.addImage(star_img)
  star2.scale = 0.02;
   
  blower = createImg('baloon2.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);

  monster.addAnimation('feedme')
  monster.addAnimation('eating',eat);
  monster.addAnimation('crying',sad);
  monster.changeAnimation('feedme');

  star_display = createSprite(50,20,30,30); 
  star_display.scale = 0.2;
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('one',one_star); 
  star_display.addAnimation('two',two_star); 
  star_display.changeAnimation('empty');
  
  candy = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,candy);

  candy_con = new Link(rope,candy);
  candy_con_2 = new Link(rope2,candy);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(candy!=null){
    image(food,candy.position.x,candy.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(candy,monster,80)==true)
  {
    World.remove(engine.world,candy);
    candy = null;
    monster.changeAnimation('eating');
    eating_sound.play();
  }

  if(candy!=null && candy.position.y>=650)
  {
    monster.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    candy=null;
   }
  
if(collide(candy,star,20)==true) {
  star.visible = false;
  star_display.changeAnimation('one');
 }
  if(collide(candy,star2,40)==true) {
  star2.visible= false;
  star_display.changeAnimation('two');
  } 

}

function drop()
{
  cut_sound.play();
  rope.break();
  candy_con.dettach();
  candy_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  candy_con_2.dettach();
  candy_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow(){
  Matter.Body.applyForce(candy,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}

