var vertexShaderText = 

[

'precision mediump float;',

'',

'attribute vec2 vertPosition;',

'attribute vec3 vertColor;',

'varying vec3 fragColor;',

'',

'void main()',

'{',

'  fragColor = vertColor;',

'  gl_Position = vec4(vertPosition, 0.0, 1.0);',

'}'

].join('\n');



var fragmentShaderText =

[

'precision mediump float;',

'',

'varying vec3 fragColor;',

'void main()',

'{',

'  gl_FragColor = vec4(fragColor, 1.0);',

'}'

].join('\n');



var InitDemo = function () {

	console.log('This is working');



	var canvas = document.getElementById('game-surface');

	var gl = canvas.getContext('webgl');



	if (!gl) {

		console.log('WebGL not supported, falling back on experimental-webgl');

		gl = canvas.getContext('experimental-webgl');

	}



	if (!gl) {

		alert('Your browser does not support WebGL');

	}



	gl.clearColor(0.360, 0.498, 0.0, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



	//

	// Create shaders

	// 

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);



	gl.shaderSource(vertexShader, vertexShaderText);

	gl.shaderSource(fragmentShader, fragmentShaderText);



	gl.compileShader(vertexShader);

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {

		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));

		return;

	}



	gl.compileShader(fragmentShader);

	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {

		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));

		return;

	}



	var program = gl.createProgram();

	gl.attachShader(program, vertexShader);

	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

		console.error('ERROR linking program!', gl.getProgramInfoLog(program));

		return;

	}

	gl.validateProgram(program);

	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {

		console.error('ERROR validating program!', gl.getProgramInfoLog(program));

		return;

	}



	//

	// Create buffer

	//

	var triangleVertices = 

	[ // X, Y,       R, G, B


		-0.3, 0.0,    0.83, 0.95, 0.53,

		-0.3, -2.0,  0.83, 0.95, 0.53,

		3.0, 0.0,   0.83, 0.95, 0.53,
		//
		
		-0.30, 0.19,    0.38, 0.26, 0.11,

		-0.30, -1.0,  0.38, 0.26, 0.11,

		-1.0, -1.0,  0.38, 0.26, 0.11,
		//
		
		
		-1.0, -1.0,    0.0, 0.0, 0.0,

		-0.7, -0.5,  0.0, 0.0, 0.0,

		-0.5, -1.0,   0.0, 0.0, 0.0,
		//
		
		-0.7, -0.5,    1.0, 1.0, 1.0,

		-0.5, -1.0,  1.0, 1.0, 1.0,

		-0.4, -1.0,   1.0, 1.0, 1.0,
		//
		
		-0.4, -1.0,    1.0, 1.0, 1.0,

		-0.3, -0.8,  1.0, 1.0, 1.0,

		-0.3, -1.0,   1.0, 1.0, 1.0,
		//

		-0.3, -0.85,    0.0, 0.0, 0.0,

		-0.3, -1.0,  0.0, 0.0, 0.0,

		-0.26, -1.0,   0.0, 0.0, 0.0,
		//
		
		-0.44, -0.95,    0.0, 0.0, 0.0,

		-0.36, -0.95,  0.0, 0.0, 0.0,

		-0.4, -1.3,   0.0, 0.0, 0.0,
		//
		
		-0.6, -0.65,    0.43, 0.30, 0.15,

		-0.5, -0.0,  0.43, 0.30, 0.15,

		-0.75, -0.3,  0.43, 0.30, 0.15,
		//
		
		-0.6, -0.65,    0.40, 0.28, 0.13,

		-0.5, -0.0,  0.40, 0.28, 0.13,

		-0.4, -0.65,  0.40, 0.28, 0.13,
		//
		
		-0.4, -0.65,    0.40, 0.28, 0.13,

		-0.5, -0.0,  0.40, 0.28, 0.13,

		-0.25, -0.3,  0.40, 0.28, 0.13,
		//
		
		-0.25, 0.3,    0.40, 0.28, 0.13,

		-0.5, -0.0,  0.40, 0.28, 0.13,

		-0.25, -0.3,  0.40, 0.28, 0.13,
		//
		
		-0.75, 0.3,    0.43, 0.30, 0.15,

		-0.5, -0.0,  0.43, 0.30, 0.15,

		-0.75, -0.3,  0.43, 0.30, 0.15,
		//
		
		-0.75, 0.3,    0.43, 0.30, 0.15,

		-0.5, -0.0,  0.43, 0.30, 0.15,

		-0.7, 0.8,  0.43, 0.30, 0.15,
		//
		
		-0.25, 0.3,    0.40, 0.28, 0.13,

		-0.5, -0.0,  0.40, 0.28, 0.13,

		-0.3, 0.8,  0.40, 0.28, 0.13,
		//
		
		-0.7, 0.8,    0.40, 0.28, 0.13,

		-0.5, -0.0,  0.40, 0.28, 0.13,

		-0.3, 0.8,  0.40, 0.28, 0.13,
		//
		
		-0.75, 0.2,    0.0, 0.0, 0.0,

		-0.7, 0.8,   0.0, 0.0, 0.0,

		-0.85, 0.8,   0.0, 0.0, 0.0,
		//
		
		-0.25, 0.2,    0.0, 0.0, 0.0,

		-0.3, 0.8,   0.0, 0.0, 0.0,

		-0.15, 0.8,   0.0, 0.0, 0.0,
		//
		
		-0.85, 0.8,    0.0, 0.0, 0.0,

		-0.45, 3.0,   0.0, 0.0, 0.0,

		-0.15, 0.8,   0.0, 0.0, 0.0,
		//
		
		-0.52, -0.45,    0.0, 0.0, 0.0,

		-0.5, -0.55,   0.0, 0.0, 0.0,

		-0.48, -0.45,   0.0, 0.0, 0.0,
		//
		
		-0.5, -0.25,    0.0, 0.0, 0.0,

		-0.505, -0.15,   0.0, 0.0, 0.0,

		-0.6, -0.3,   0.0, 0.0, 0.0,
		//
		
		-0.5, -0.25,    0.0, 0.0, 0.0,

		-0.495, -0.15,   0.0, 0.0, 0.0,

		-0.4, -0.3,   0.0, 0.0, 0.0,
		//
		
		-0.4, -0.7,    0.0, 0.0, 0.0,

		-0.38, -0.5,   0.0, 0.0, 0.0,

		-0.405, -0.28,   0.0, 0.0, 0.0,
		//
		
		-0.595, -0.7,    0.0, 0.0, 0.0,

		-0.62, -0.5,   0.0, 0.0, 0.0,

		-0.595, -0.28,   0.0, 0.0, 0.0
		
		
	];



	var triangleVertexBufferObject = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);



	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');

	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

	gl.vertexAttribPointer(

		positionAttribLocation, // Attribute location

		2, // Number of elements per attribute

		gl.FLOAT, // Type of elements

		gl.FALSE,

		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex

		0 // Offset from the beginning of a single vertex to this attribute

	);

	gl.vertexAttribPointer(

		colorAttribLocation, // Attribute location

		3, // Number of elements per attribute

		gl.FLOAT, // Type of elements

		gl.FALSE,

		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex

		2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute

	);



	gl.enableVertexAttribArray(positionAttribLocation);

	gl.enableVertexAttribArray(colorAttribLocation);



	//

	// Main render loop

	//

	gl.useProgram(program);

	gl.drawArrays(gl.TRIANGLES, 0, 69);

};