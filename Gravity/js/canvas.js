import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['yellow', 'orange', 'beige', 'maroon']

function generateRandomColor(){
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click',function(){
  init()
})


var friction=0.99; 
var gravity=1
var counter=0;

function Particle(x,y,radius,color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color=color;
  this.radians=Math.random() * Math.PI *6;
  this.velocity=0.05;

  this.update= function() {
    this.radians +=this.velocity;
    this.x= x+ Math.cos(this.radians)*100
    this.draw();
  }

  this.draw= function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}

// Objects
function Ball(x, y,dx,dy, radius, color) {
   
    this.x = x;
    this.y = y;
    this.dy=dy;
    this.dx=dx;
    this.radius = radius;
    this.color = color;
    
  

  this.draw=function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.beginPath();
    c.rect(canvas.width/2,canvas.height/2,30,30,false)
    c.fill();
    c.closePath();
  };

  this.update= function() {
    if(this.y+radius + this.dy>canvas.height){
      this.dy= -this.dy * friction;
    }else{
      this.dy+=gravity;
    }
    if(this.x+this.radius+ this.dx>canvas.width || this.x - this.radius<= 0){
      this.dx=-this.dx;
    }
    this.x+=this.dx;
    this.y+=this.dy;

    this.draw()
  };
}

var ball;
var ballArray;
// Implementation
let objects
let particles
function init() {
  
  objects = []
  ballArray=[];
  particles=[];
  
  var color=generateRandomColor();
  for (var i = 0; i < mouse.x; i++) {
  
    var radius=randomIntFromRange(8,20);
    var x = randomIntFromRange(radius,canvas.width-radius);
    var y = randomIntFromRange(0,canvas.height-radius);
    var dx=randomIntFromRange(-2,2);
    var dy=randomIntFromRange(-2,2);
    // var color=randomColor(colors);
    
    ballArray.push(new Ball(x,y,dx,dy,radius,color));
    
  }
  for (var i = 0; i <2; i++) {
  

        particles.push(new Particle(canvas.width/2,canvas.height/2,10,"blue"))
    
  }

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  
  c.clearRect(0, 0, canvas.width, canvas.height)
  for(var i=0;i<ballArray.length;i++){
    ballArray[i].update();
  }

  particles.forEach(particles=>{
    particles.update();
  })

  c.fillText('CLICK TO CHANGE COLOR', mouse.x, mouse.y)

}

init()
animate()
