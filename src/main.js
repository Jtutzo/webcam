import $ from 'jquery';
import _ from 'underscore';

import Config from "./config.js"

var _config = null;

export default {
	
	/**
	* Init webcam module
	* @param config: {
	* 	name: String,
	*	width: Number,
	*	height: Number,
	*	selector: selector,
	* 	media: {
	* 		video: Boolean,
	*		audio: Boolean
	* 	}
	*}
	* @param callback: function(err)
	*/
	init(config, callback) {
		
		_config = Config;
		
		_.each(config, (value, key) => {
			_config[key] = value;
		});
		
		console.log(_config)
		
		$(_config.selector).empty();
		var video$ = $("<video></video>");
		video$.attr("id", "video-"+_config.name);
		
		var canvas$ = $("<canvas></canvas>")
		canvas$.attr("id", "canvas-"+_config.name);
		canvas$.hide();
		
		$(_config.selector).append(video$);
		$(_config.selector).append(canvas$);
		
		typeof callback === 'function'?callback(null):null
		
	},
	
	/**
	* Start webcam
	*/
	start() {
		
		$(this.getVideo()).one('canplay', (e) => {
			_config.height = this.getVideo().videoHeight / (this.getVideo().videoWidth/_config.width);
			this.getCanvas().width = this.getVideo().width;
			this.getCanvas().height = this.getVideo().height;
      		this.getCanvas().setAttribute('width', _config.width);
      		this.getCanvas().setAttribute('height', _config.height);
			this.getVideo().play();
		});
		
		navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
		
		navigator.getMedia(_config.media, (stream) => {
			
			if (navigator.mozGetUserMedia) {
				this.getVideo().mozSrcObject = stream;
			} else {
				var vendorURL = window.URL || window.webkitURL;
				this.getVideo().stream = stream;
				this.getVideo().src = vendorURL.createObjectURL(stream);
			}
			
		}, (err) => {
			throw new Error("Cannot start webcam : " + err);
		});
	},
	
	/**
	* Stop webcam
	*/
	stop() {
		
		var stream = this.getVideo().mozSrcObject?this.getVideo().mozSrcObject:null;
		stream = !stream && this.getVideo().stream?this.getVideo().stream:null;
		
		if (stream && stream.getTracks() && stream.getTracks()[0]) {
			stream.getTracks()[0].stop();
			this.getVideo().src = null;
			this.getVideo().stream = null;
			this.getVideo().mozSrcObject = null;
		} else {
			throw new Error("Cannot stop webcam.");
		}
	},

	/**
	* Take picture with webcam
	* @param callback: function(err, src)
	*/
	takePicture(callback) {
		this.getCanvas().getContext('2d').drawImage(this.getVideo(), 0, 0, _config.width, _config.height);
		typeof callback === 'function'?callback(null, this.getCanvas().toDataURL('image/png')):null;
	},
	
	/**
	* get video selector
	* @return video
	*/
	getVideo() {
		return $(_config.selector).find("video")[0];
	},
	
	/**
	* get canvas selector
	* @return canvas
	*/
	getCanvas() {
		return $(_config.selector).find("canvas")[0];
	}
}