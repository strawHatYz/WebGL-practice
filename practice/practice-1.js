var canvas = document.querySelector("#canvas");
// 设置canvas全屏
resizeCanvas(canvas);

// 创建一个WebGLRenderingContext 三维渲染上下文对象
// var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

// 步骤写法
// 1. 创建顶点着色器对象
// 获取顶点着色器源码
// var vertexShaderSource = document.querySelector('#vertexShader').innerHTML;
// 创建顶点着色器对象
// var vertexShader = gl.createShader(gl.VERTEX_SHADER);
// 将源码分配给顶点着色器对象
// gl.shaderSource(vertexShader, vertexShaderSource);
// 编译顶点着色器程序
// gl.compileShader(vertexShader);

// 2. 创建元片着色器
// 获取片元着色器源码
// var fragmentShaderSource = document.querySelector('#fragmentShader').innerHTML;
// 创建片元着色器程序
// var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// 将源码分配给片元着色器对象
// gl.shaderSource(fragmentShader, fragmentShaderSource);
// 编译片元着色器
// gl.compileShader(fragmentShader);

// 3. 创建着色器程序
//创建着色器程序
// var program = gl.createProgram();
//将顶点着色器挂载在着色器程序上。
// gl.attachShader(program, vertexShader);
//将片元着色器挂载在着色器程序上。
// gl.attachShader(program, fragmentShader);
//链接着色器程序
// gl.linkProgram(program);



// 简写
let gl = getContext(canvas);
// createShaderFromScript为引入webgl-helper.js内部方法
//创建定点着色器
let vertexShader = createShaderFromScript(gl, gl.VERTEX_SHADER, "vertexShader");
//创建片元着色器
let fragmentShader = createShaderFromScript(
  gl,
  gl.FRAGMENT_SHADER,
  "fragmentShader" 
);
//创建着色器程序
let program = createSimpleProgram(gl, vertexShader, fragmentShader);


// 4. 使用刚创建好的着色器程序
// 有时候WebGL应用包含多个program,所以在使用某个program绘制之前，要先启用。
gl.useProgram(program);

// 下面开始绘制
// 设置清空画布颜色为黑色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 用上一步设置的清空画布颜色清空画布
gl.clear(gl.COLOR_BUFFER_BIT);
// 绘制点（执行绘制）
gl.drawArrays(gl.POINTS, 0, 1);
// void gl.drawArrays(mode, first, count);
// model: 代表图元类型 first: 代表从第几个点开始绘制 count: 代表绘制点的数量
