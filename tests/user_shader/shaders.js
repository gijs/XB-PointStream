var vertShader = 
"varying vec4 frontColor;" +

"attribute vec3 XBPS_aVertex;" +
"attribute vec3 XBPS_aNormal;" +
"attribute vec4 XBPS_aColor;" +

"uniform float XBPS_pointSize;" +
"uniform vec3 XBPS_attenuation;" +

"uniform vec3 lightPos;" + 

"uniform mat4 XBPS_ModelViewMatrix;" +
"uniform mat4 XBPS_Projection;" +
"uniform mat4 XBPS_NormalMatrix;" +

"float dirLight(in vec3 norm){" +
"  vec3 light = vec3(0.0, 1.0, 0.0);" +
"  return max(dot(light, norm), 0.0);" +
"}" +

"void PointLight(inout vec3 col, in vec3 ecPos, in vec3 vertNormal, in vec3 eye ) {" +
  // Get the vector from the light to the vertex
"  vec3 VP = lightPos - ecPos;" +

// Get the distance from the current vector to the light position
"  float d = length( VP ); " +

// Normalize the light ray so it can be used in the dot product operation.
"  VP = normalize( VP );" +

"  float attenuation = 1.0 / ( 1.0 + ( d ) + ( d * d ));" +
"  float nDotVP = max( 0.0, dot( vertNormal, VP ));" +
"  vec3 halfVector = normalize( VP + eye );" +
"  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));" +
"  col += vec3(1.0, 1.0, 1.0) * nDotVP;" +
"}" +

"void main(void) {" +
"  vec3 transNorm = vec3(XBPS_NormalMatrix * vec4(XBPS_aNormal, 0.0));" + 
 
"  vec4 ecPos4 = XBPS_ModelViewMatrix * vec4(XBPS_aVertex, 1.0);" +
"  vec3 ecPos = (vec3(ecPos4))/ecPos4.w;" +
"  vec3 eye = vec3( 0.0, 0.0, 1.0 );" +

"  vec3 col = vec3(0.0, 0.0, 0.0);" +
"  PointLight(col, ecPos, transNorm, eye);" +

"  frontColor = XBPS_aColor * vec4(col, 1.0);" +

"  float dist = length( ecPos4 );" +
"  float attn = XBPS_attenuation[0] + " +
"              (XBPS_attenuation[1] * dist) + " + 
"              (XBPS_attenuation[2] * dist * dist);" +

"  if(attn > 0.0){" +
"    gl_PointSize = XBPS_pointSize * sqrt(1.0/attn);" +
"  }" +
"  else{" +
"    gl_PointSize = 1.0;" +
"  }"+

"  gl_Position = XBPS_Projection * ecPos4;" +
"}";

var fragShader = 
"#ifdef GL_ES\n" +
"  precision highp float;\n" +
"#endif\n" +

"uniform vec4 uReflection;" +

"varying vec4 frontColor;" +
"void main(void){" +
"  gl_FragColor = frontColor * uReflection;" +
"}";
