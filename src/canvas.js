var canvas = document.querySelector('canvas');


var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;

var cxt = canvas.getContext('2d');

var mousePos = {
    x: undefined,
    y: undefined
}
var colors = [
    "#E37B40",
    "#46B29D",
    "#DE5B49",
    "#693A5B",
    "#F0CA4D",
]
var pixelData = [];
setPixels();
function setPixels(){
    var image = document.querySelector('img')
        
    var canvas = document.createElement('canvas')
        canvas.width = 230;
        canvas.height = 145;
        var cxt = canvas.getContext('2d');
            cxt.drawImage(image, 0, 0, 115, 72.5);
        setTimeout(function(){
            for(var y = 0; y<canvas.height; y++){
                pixelData[y] = []
                for(var x = 0; x<canvas.width; x++){
                    pixelData[y].push(['rgba(', cxt.getImageData(x, y, 1, 1).data, ')'].join(''));
                }
            }
            init();
        }, 4)
        
        
}
window.addEventListener('mousemove', function(e){
    mousePos.x = e.x;
    mousePos.y = e.y;
    animate();
})
window.addEventListener('resize', function(e){
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    //init();
})
function Circle(x, y, dx, dy, rad, c){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    var minRad = 30;
    var color = c || 'transparent';
    this.fill = 'transparent'
    this.draw = function(){
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false)
        cxt.fillStyle = this.fill;
        cxt.fill()
    }
    this.show = function(){
        if(mousePos.x - this.x < minRad && mousePos.x - this.x > -minRad
            && mousePos.y - this.y < minRad && mousePos.y - this.y > -minRad){
            this.fill = color;
        }
        this.draw()
    }
    
}
var circles;
function init(){
    circles = [];
    var rad = 5;
    var xCount = Math.ceil(innerWidth/rad);
    var yCount = Math.ceil(innerHeight/rad);
    var pixels = xCount*yCount;
    console.log(xCount,yCount)
    for(let iy = 0; iy<yCount; iy++){
        for(let ix = 0; ix<xCount; ix++){
            
            var x = ix * (rad*2) + rad + ix;
            var y = iy * (rad*2) + rad + iy;
            var dx = (Math.random() - 0.5) * 2;
            var dy = (Math.random() - 0.5) * 2;
            var c = new Circle(x, y, dx, dy, rad, pixelData[iy][ix]);
            circles.push(c);
            //c.draw();
        }
    }
   // 
}
function animate(){
    cxt.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(function(){
        circles.forEach(function(c){
            c.show();
        })
    });
   
}

