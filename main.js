function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    // vertex shadeer
    var vertexShaderCode = 
    "void main(){" +
    "}";
    var vertexShaderObject = fl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);

    // fragment shader
    var fragmentShaderCode = `
    void main(){

    }`;
    var fragmentShaderObject = fl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);

    var shaderProgram = gl.createProgram(); // wadah executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0, 0.0, 0.0, 1.0); //merah hijau biru, transparansi
    gl.claer(gl.COLOR_BUFFER_BIT);
}