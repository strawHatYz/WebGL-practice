// 第一个版本，初始化
var canvas = document.querySelector("#canvas");
// 设置canvas全屏
resizeCanvas(canvas);
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

//找到顶点着色器中的变量a_Position
var a_Position = gl.getAttribLocation(program, "a_Position");
//找到顶点着色器中的变量a_Screen_Size
var a_Screen_Size = gl.getAttribLocation(program, "a_Screen_Size");
//找到片元着色器中的变量u_Color
var u_Color = gl.getUniformLocation(program, "u_Color");
//为顶点着色器中的 a_Screen_Size 传递 canvas 的宽高信息
gl.vertexAttrib2f(a_Screen_Size, canvas.width, canvas.height);
//存储点击位置的数组。
var points = [];
canvas.addEventListener("click", (e) => {
  var x = e.pageX;
  var y = e.pageY;
  var color = randomColor();
  points.push({ x, y, color });
  gl.clearColor(0, 0, 0, 1.0);
  // 用上一步设置的清空画布颜色清空画布
  gl.clear(gl.COLOR_BUFFER_BIT);
  for (let i = 0; i < points.length; i++) {
    var color = points[i].color;
    // 为片元着色器中的u_Color传递随机颜色
    gl.uniform4f(u_Color, color.r, color.g, color.b, color.a);
    // 为顶点着色器中的a_Position 传递顶点坐标
    gl.vertexAttrib2f(a_Position, points[i].x, points[i].y);
    // 绘制点
    gl.drawArrays(gl.POINTS, 0, 1);
  }
});
// 设置清屏颜色
gl.clearColor(0, 0, 0, 1.0);
// 用上一步设置的清空画布颜色清空画布
gl.clear(gl.COLOR_BUFFER_BIT);
