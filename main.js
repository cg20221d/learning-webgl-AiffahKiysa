function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    var vertices = [
        // angka 0
        -0.8, 0.6,
        -0.7, 0.7,
        -0.4, 0.7,
        -0.3, 0.6,
        -0.3, 0.2,
        -0.4, 0.1,
        -0.7, 0.1,
        -0.8, 0.2,

        -0.7, 0.6,
        -0.4, 0.6,
        -0.4, 0.2,
        -0.7, 0.2,

        // angka 2
        0.0, 0.22,
        0.0, 0.1,
        0.5, 0.1,
        0.5, 0.2,
        0.15, 0.2,
        0.5, 0.4,
        0.5, 0.6,
        0.4, 0.7,
        0.1, 0.7,
        0.0, 0.6,
        0.0, 0.45,
        0.12, 0.45,
        0.12, 0.6,
        0.4, 0.6,
        0.4, 0.47
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex shader
    var vertexShaderCode = `
    attribute vec2 aPosition;
    // attribute vec3 aColor;
    // varying vec3 fragColor;
    void main(){
        // fragColor = aColor;
        gl_Position = vec4(aPosition.xy, 0.0, 1.0);
        gl_PointSize = 10.0;
    }
    `;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); 

    // Fragment shader
    var fragmentShaderCode = `
    precision mediump float;
    // varying vec3 fragColor;
    void main() {
        float r = 1.0;
        float g = 0.0;
        float b = 0.0;
        gl_FragColor = vec4(r, g, b, 1.0);
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
    // var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    // gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aPosition);
    // gl.enableVertexAttribArray(aColor);

    gl.clearColor(0.75, 0.75, 0.8, 1.0); // Merah, Hijau, Biru, Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.drawArrays(gl.LINE_LOOP, 0, 8);
    gl.drawArrays(gl.LINE_LOOP, 8, 4);

    gl.drawArrays(gl.LINE_LOOP, 12, 15);
}