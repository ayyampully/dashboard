var canvas = document.querySelector('canvas');


var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;
var pixelData = [];
var c = canvas.getContext('2d');


var mousePos = {
    x: undefined,
    y: undefined
}
var colors = [
    "#E37B40",
    "#46B29D",
    "#DE5B49",
    "#324D5C",
    "#F0CA4D",
]
window.addEventListener('mousemove', function(e){
    mousePos.x = e.x;
    mousePos.y = e.y;
})
window.addEventListener('resize', function(e){
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    //init();
})
function Circle(x, y, dx, dy, rad){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.minRad = rad;
    var color = colors[Math.round(Math.random() * 4)]
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false)
        c.fillStyle = color;
        c.fill()
    }
    this.update = function(){
        if((this.x + this.rad) > innerWidth || (this.x - this.rad) < 0){
            this.dx = -this.dx;
        }
        if((this.y + this.rad) > innerHeight || (this.y - this.rad) < 0){
            this.dy = -this.dy;
        }
        this.x+=this.dx
        this.y+=this.dy
        if(mousePos.x - this.x < 50 && mousePos.x - this.x > -50
            && mousePos.y - this.y < 50 && mousePos.y - this.y > -50){
            if(this.rad < 40) this.rad+=1;
        } else if(this.rad > this.minRad){
            this.rad--;
        }
        this.draw()
    }
}
var circles;
function init(){
    circles = [];
    for(let i = 0; i<200; i++){
        var rad = Math.ceil(Math.random() * 15);
        var x = Math.random() * (innerWidth - rad*2) + rad;
        var y = Math.random() * (innerHeight - rad*2) + rad;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circles[i] = new Circle(x, y, dx, dy, rad);
    }
   // 
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circles.forEach(function(c){
        c.update();
    })
   
}
init();
animate();