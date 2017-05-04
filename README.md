# WebcamJs

> WebcamJs is module for use webcam in browser

## Build Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build
```

## Exemple
```js
Webcam.init({
	
	name: 'defaultName',
	width: 220,
	height: 220,
	selector: "#video",
	media: {
		video: true,
		audio: false
	}
}, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	Webcam.start();
});
```

## Methods

List of shortcut methods:

 * `init(config, callback)`
 * `start()`
 * `stop()`
 * `takePicture(callback)`
