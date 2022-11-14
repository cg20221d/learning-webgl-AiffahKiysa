function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    var vertices = [
        // 0.1, 0.5,  1.0, 1.0, 0.0,
        // -0.25, 0.5,  0.7, 0.0, 1.0,
        // -0.25, 0.2, 0.1, 1.0, 0.6,
        // 0.0, 0.2

        0.5, 0.0, 0.0, 1.0, 1.0,
        0.0, -0.5, 1.0, 0.0, 1.0,
        -0.5, 0.0, 1.0, 1.0, 0.0,
        0.0, 0.5, 1.0, 1.0, 1.0
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex shader
    var vertexShaderCode = `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    varying vec3 fragColor;
    uniform float uTheta;
    uniform float uUp;
    uniform float uDown;
    uniform float uRight;
    uniform float uLeft;
    void main(){
        fragColor = aColor;
        float x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y + uRight + uLeft;
        float y = sin(uTheta) * aPosition.y + cos(uTheta) * aPosition.x + uUp + uDown;
        gl_Position = vec4(x, y, 0.0, 1.0);
    }
    `;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); 

    // Fragment shader
    var fragmentShaderCode = `
    precision mediump float;
    varying vec3 fragColor;
    void main() {
        gl_FragColor = vec4(fragColor, 1.0);
    }
    `;
    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject); 

    var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // mengajari GPU bagaimana cara mengoleksi nilai posisi dari ARRAY_BUFFER
    // untuk setiap vertex yang sedang diproses
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);

    // Variabel lokal
    var theta = 0.0;
    var up = 0.0;
    var down = 0.0;
    var right = 0.0;
    var left = 0.0;

    // Variabel pointer ke GLSL
    var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");
    var uUp = gl.getUniformLocation(shaderProgram, "uUp");
    var uDown = gl.getUniformLocation(shaderProgram, "uDown");
    var uRight = gl.getUniformLocation(shaderProgram, "uRight");
    var uLeft = gl.getUniformLocation(shaderProgram, "uLeft");

    // grafik ai nteraktif
    var freeze = false;
    function onMouseClick(event){
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick, false);

    var funUp = false;
    var funDown = false;
    var funRight = false;
    var funLeft = false;
    function onKeyUp(event){
        if (event.keyCode == 32) freeze = false;
        if (event.keyCode == 87) funUp = false;
        if (event.keyCode == 83) funDown = false;
        if (event.keyCode == 68) funRight = false;
        if (event.keyCode == 65) funLeft = false;
    }
    document.addEventListener("keyup", onKeyUp, false);

    function onKeyDown(event){
        if (event.keyCode == 32) freeze = true;
        if (event.keyCode == 87) funUp = true;
        if (event.keyCode == 83) funDown = true;
        if (event.keyCode == 68) funRight = true;
        if (event.keyCode == 65) funLeft = true;
    }
    document.addEventListener("keydown", onKeyDown, false);

    function render(){
        gl.clearColor(0.75, 0.75, 0.8, 1.0); // Merah, Hijau, Biru, Transparansi
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (!freeze) {
            theta += 0.01;
            gl.uniform1f(uTheta, theta);
        }
        if (funUp) {
            up += 0.01;
            gl.uniform1f(uUp, up);
        }
        if (funDown) {
            down -= 0.01;
            gl.uniform1f(uDown, down);
        }
        if (funRight) {
            right += 0.01;
            gl.uniform1f(uRight, right);
        }
        if (funLeft) {
            left -= 0.01;
            gl.uniform1f(uLeft, left);
        }
        // var vektor2D = [x, y];
        // gl.uniform2f(uTheta, vektor2D[0], vektor2D[1]);
        // gl.uniform2fv(uTheta, vektor2D);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        requestAnimationFrame(render);
    }
    // setInterval(render, 1000/60)
    // render()
    requestAnimationFrame(render);
}