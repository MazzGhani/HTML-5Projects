var canvas= document.querySelector('canvas');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

var c= canvas.getContext("2d");
// c.fillStyle="red";
// c.fillRect(50,100,50,50);

// console.log(canvas);


// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100)
// c.lineTo(300,300)
// c.strokeStyle= "blue"
// c.stroke();

// for(var i=0;i<1000;i++){
//     var x= Math.random()* window.innerWidth;
//     var y= Math.random()* window.innerHeight;
//     c.beginPath();
//     c.arc(x,y,60,0, Math.PI*2, false);
//     c.strokeStyle= 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
//     c.stroke();

// }
var maxLimit=40;
var mouse={
    x:undefined,
    y: undefined
}

var colorArray=[
"#AFAF90",
'#FFFFE0',
'yellow'
]


window.addEventListener("mousemove",function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})



function Circle(x,y,dx,dy,radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius= radius;
    var color= colorArray[Math.floor(Math.random()* colorArray.length)];
    // var color= getRndColor();
    

    this.draw= function(){
    c.beginPath();

    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);

    c.strokeStyle= "black";
    c.fillStyle = color;
    c.fill();
    c.stroke();
    }

    this.update= function(){
        if(this.x+this.radius>innerWidth || this.x-this.radius<0){
            this.dx=-this.dx;
        }
        if( this.y+this.radius>innerHeight || this.y-this.radius<0){
            this.dy=-this.dy;
            
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
        if (mouse.x- this.x<70 && mouse.x-this.x>-70 && mouse.y-this.y<70 && mouse.y-this.y>-70 && this.radius<maxRadius){
            this.radius += 1;
            // color="#808000";
        }
     
        else if(this.radius>2){
            this.radius-=1;
            // color=colorArray[Math.floor(Math.random()* colorArray.length)];
            
        }
        
    }

}
var circleArray=[];
var triangleArray=[];
for(var i=0;i<1000;i++){
    var x= Math.random() * (innerWidth - radius *2)+ radius;
    var y= Math.random() * (innerHeight -radius *2) +radius;
    var maxRadius  = 120;
    var minRadius  = 30;
    var dx= (Math.random()-0.5)*5;
    var dy= (Math.random()-0.5)*5;
    var radius=minRadius+(Math.random()*(maxRadius-minRadius));
    var radius= 30
    circleArray.push(new Circle(x,y,dx,dy,radius));
}


// function Sphere(){

//     var x = 100,
//         y = 75,
//         // Radii of the white glow.
//         innerRadius = 5,
//         outerRadius = 70,
//         // Radius of the entire circle.
//         radius = 60;
    
//     var gradient = c.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
//     gradient.addColorStop(0, 'white');
//     gradient.addColorStop(1, 'blue');
    
//     c.arc(x, y, radius, 0, 2 * Math.PI);
    
//     c.fillStyle = gradient;
//     c.fill();
// }

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(var i=0; i<circleArray.length;i++){
        circleArray[i].update();
    }
    
}


animate();