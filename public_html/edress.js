var video = document.createElement('video');
video.autoplay = true;
var canvas = document.querySelector('canvas');
canvas.addEventListener("mousedown", mouseDown);
var canvasMouseX;
var canvasMouseY;

var EDress = {
    enableCamera: function() {
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
    },
    videoToCanvas: function() {
        var context = canvas.getContext('2d');
        draw(video, context, canvas.width, canvas.height);
    },
    
    init: function() {
        this.enableCamera();
        this.videoToCanvas();
    }
    
    
};

function draw(v, c, w, h) {
    c.drawImage(v, 0, 0, w, h);
    var dress = new Image();
    dress.src = 'dress.png';
    c.drawImage(dress, canvasMouseX, canvasMouseY);
    setTimeout(draw, 20, v, c, w, h);
}

function mouseDown(event) {
    canvasMouseX = event.clientX - (canvas.offsetLeft - window.pageXOffset);
    canvasMouseY = event.clientY - (canvas.offsetTop - window.pageYOffset);
}

document.addEventListener("DOMContentLoaded", function() {
    EDress.init();
});



