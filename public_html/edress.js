
var EDress = (function() {
    var video = document.createElement('video');
    video.autoplay = true;
    var canvas = document.querySelector('canvas');
    canvas.addEventListener("mousedown", mouseDown);
    var canvasMouseX;
    var canvasMouseY;
    var dresses = new Array();
    var dressIndex;
    
    function mouseDown(event) {
        canvasMouseX = event.clientX - (canvas.offsetLeft - window.pageXOffset);
        canvasMouseY = event.clientY - (canvas.offsetTop - window.pageYOffset);
    };
    
    preloadDresses = function() {
        for (i = 0; i < preloadDresses.arguments.length; i++) {
            dresses[i] = new Image();
            dresses[i].src = preloadDresses.arguments[i];
        }
    };

    draw = function(v, c, w, h) {
        c.drawImage(v, 0, 0, w, h);
        c.drawImage(dresses[dressIndex], canvasMouseX, canvasMouseY);
        setTimeout(draw, 20, v, c, w, h);
    };

    enableCamera = function() {
        navigator.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                    {
                        video: true,
                        audio: false
                    },
            function(localMediaStream) {

                video.src = window.URL.createObjectURL(localMediaStream);
            },
                    function(err) {
                        alert("Erro: " + err);
                    }
            );
        } else {
            alert("getUserMedia not supported");
        }
    };
    
    videoToCanvas = function() {
        var context = canvas.getContext('2d');
        draw(video, context, canvas.width, canvas.height);
    };
    
    init = function() {
        this.preloadDresses('img/1.png', 'img/2.png','img/3.png');
        this.enableCamera();
        this.videoToCanvas();
    };

init();
}());


document.addEventListener("DOMContentLoaded", function() {
    //EDress.init();
});



