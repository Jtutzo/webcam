# WebcamJs

> Webcam module for use this in browser

## Build Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build
```
## Get start

With EJ6
```js
import Webcam from 'webcam'
```

or 

```js
<script src="./webcam/dist/webcam.min.js"></script>
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

### Webcam.init(config, callback)
Init webcam stream

| Property       | Type  | Description  |
| -------------- |:-----:|:-------------|
| config	     |`object`|	Object to config webcam stream			|
| callback	     |`function(err)`| When the webcam is init				|

### Webcam.start()
Start webcam stream

### Webcam.stop()
Stop and delete webcam stream

### Webcam.takePicture(callback)
Take picture with webcam

| Property       | Type  | Description  |
| -------------- |:-----:|:-------------|
| callback	     |`function(err, src)`|When a picture is taked|

## config
It's object to configure webcam stream

| Property       | Type  | Description  |
| -------------- |:-----:|:-------------|
| name	     |`string`|Name of webcam|
| width	     |`number`|Width of webcam container|
| heght	     |`number`|Height of webcam container|
| selector	     |`string` or `$selector`|Selector or container webcam|
| media.video	     |`boolean`|Active video|
| media.audio	     |`boolean`|Active audio|