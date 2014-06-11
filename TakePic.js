;(function (window, document) {

    'use strict';

    var nextTick, localMediaStream;

    nextTick = window.requestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               function (callback) {
                   window.setTimeout(callback, 1000 / 60);
               };

    localMediaStream = null;

    function TakePic() {
        this.video = document.querySelector('video');
        this.canvas = document.querySelector('canvas');
        this.context = canvas.getContext('2d');
        this.captureBtn = document.querySelector('button');

        nextTick(function() {
            this.init();
        }.bind(this));
    }

    TakePic.prototype.init = function() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                video: true
            }, this.successStream, this.errorStream);
            
            this.captureBtn.addEventListener('click', function () {
                this.screenshot();
            }.bind(this));
        } else {
            alert('Unsupported browser');
        }
    };

    TakePic.prototype.errorStream = function (err) {
        console.log('Error: ', err);
    },

    TakePic.prototype.successStream = function (stream) {
        if (window.URL) {
            video.src = window.URL.createObjectURL(stream);
        } else {
            video.src = stream; // Opera support.
        }
        
        localMediaStream = stream;
    },
    
    TakePic.prototype.screenshot = function () {
        if (localMediaStream) {
            this.context.drawImage(this.video, 0, 0);
         }
    }

    /* global module, exports: true, define */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS, just export
        module.exports = exports = TakePic;
    } else if (typeof define === 'function' && define.amd) {
        // AMD support
        define(function () { return TakePic; });
    } else if (typeof window === 'object') {
        // If no AMD and we are in the browser, attach to window
        window.TakePic = TakePic;
    }
    /* global -module, -exports, -define */

}(window, document));
