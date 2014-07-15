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
                        var video = document.querySelector('video');
                        video.src = window.URL.createObjectURL(localMediaStream);                      
                    },
                    function(err) {
                        alert("Erro: " + err);
                    }
            );
        } else {
            alert("getUserMedia not supported");
        }
    }
};

document.addEventListener("DOMContentLoaded", function(){
    EDress.enableCamera();
});



