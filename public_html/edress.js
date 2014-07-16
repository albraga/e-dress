var video = document.querySelector('video');
var canvas = document.querySelector('canvas');

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
        video.addEventListener('play', function() {
            draw(this, context, canvas.width, canvas.height);
        }, false);
    }
};

function draw(v, c, w, h) {
    c.drawImage(v, 0, 0, w, h);
    setTimeout(draw, 20, v, c, w, h);
}

document.addEventListener("DOMContentLoaded", function() {
    EDress.enableCamera();
    EDress.videoToCanvas();
});



