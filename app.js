
CubeView = (function() {
	// the array of images to display on the cubs
	var imgs = [];

	// rotate left decrements this and rotate right
	// increments this. then it is used to set
	// the rotation of the cube.
	var ticks = 0;
	
	// the number of degrees to change the rotation
	var inc = 90;
	var sides = 4;
 	
	// represents the current state of the cube.  
	// it is rotated to start so that photo changes
	// happen on the back image
	var cube = [3,0,1,2];
	
	/*
	 * Initializes the CubeView with a list of 
	 * of images
	 */
	function init(images) {
		imgs = images;	
		swapImages();
	};

	/*
	 * rotates the cube right
	 */
	function rotateRight() {
		cube = rotLeft(cube);
		imgs = rotLeft(imgs);
		setRotation(++ticks);
		swapImages();
	};
	
	/*
	 * rotates the cube left 
	 */
	function rotateLeft() {
		cube = rotRight(cube);
		imgs = rotRight(imgs);
		setRotation(--ticks);
		swapImages();
	};
	
	/*
	 * sets the images on the correct
	 * sides of the cube
	 */
	function swapImages() {
		for (var i = 0; i < sides; i++) {
			var imgEl = getImg(cube[i]);
			imgEl.src = imgs[i];
		}
	};

	/*
	 * utility function that rotates an array to the right.
	 * the array is shallow copied
	 */
	function rotRight(arr) {
		return arr.slice(1).concat([arr[0]]);
	};

	/*
	 * utility function that rotates an array to the left.
	 * the array is shallow copied
	 */
	function rotLeft(arr) {
		return ([arr[arr.length - 1]]).concat(arr.slice(0, arr.length - 1));
	};

	/*
	 * sets the rotation of the cube in ticks or the number
	 * of ticks to turn it right or left (negative for left).
	 */
	function setRotation(ticks) {
		var val = 'rotateY(' + (ticks * inc) + 'deg)';
		var cube = select('#cube');

		cube.style.webkitTransform = val; 
		cube.style.transform = val;
	};

	/*
	 * returns the img element of a side of the cube
	 */
	function getImg(num) {
		return select('#img-' + num);
	};

	/*
	 * returns the first element in the dom
	 * that matches the passed css selector
	 */
	function select(selector) {
		return document.querySelector(selector);
	};
	
	//return public functions
	return {
		init: init,
		rotateLeft: rotateLeft,
		rotateRight: rotateRight
	}
})();

window.addEventListener('load', function load(e) {
	window.removeEventListener('load', load, false);
	
	//setup keyboard listener on the arrow keys
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 37) {
			//left arrow key
			CubeView.rotateLeft();	
		} else if (e.keyCode == 39) {
			//right arrow key
			CubeView.rotateRight();
		}
	}, false);
	
	//initialize the view with a list of images
	CubeView.init([
		'img/charlie-brown.jpg',
		'img/coltrane.jpg',
		'img/incubus.jpg',
		'img/brubeck.jpg',
		'img/jazz.png',
		'img/static.jpg',
		'img/up.jpg'
	]);
	
}, false);

