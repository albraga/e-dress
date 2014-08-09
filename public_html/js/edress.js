
var EDress = (function() {
    var video = document.createElement('video'),
        canvas = document.querySelector('#main_canvas'),
        button = document.querySelector('button'),
        img1 = document.querySelector('#img1'),
        img2 = document.querySelector('#img2'),
        img3 = document.querySelector('#img3'),
        canvasMouseX,
        canvasMouseY,
        dresses = new Array(),
        dressIndex = 0;
    video.autoplay = true;
    
    button.addEventListener('click', shoot);
    img1.addEventListener('click', function() {
       dressIndex = 1; 
    });
    img2.addEventListener('click', function() {
       dressIndex = 2; 
    });
    img3.addEventListener('click', function() {
       dressIndex = 3; 
    });
    
    
    function shoot() {
        window.setTimeout(takePicture, 3000);
    };
    
    takePicture = function() {
        var picURL = canvas.toDataURL();
        var pic = new Image();
        pic.src = picURL;
        document.body.appendChild(pic);
    };
    
    preloadDresses = function() {
        for (var i = 0; i < preloadDresses.arguments.length; i++) {
            dresses[i] = new Image();
            dresses[i].src = preloadDresses.arguments[i];
        }
    };

    draw = function(v, c, w, h) {
        c.drawImage(v, 0, 0, w, h);
        c.drawImage(dresses[dressIndex], 100, 30);
        window.setTimeout(draw, 20, v, c, w, h);
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
                        alert('Erro: ' + err);
                    }
            );
        } else {
            alert('getUserMedia not supported');
        }
    };
    
    videoToCanvas = function() {
        var context = canvas.getContext('2d');
        draw(video, context, canvas.width, canvas.height);
    };
    
    init = function() {
        this.preloadDresses('img/0.png', 'img/1.png', 'img/2.png','img/3.png');
        this.enableCamera();
        this.videoToCanvas();
    };

init();
}());

$(document).ready(function() {
    $('#Carousel').carousel({
        interval: 5000
    });
});