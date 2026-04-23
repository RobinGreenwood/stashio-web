"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_scale;
  uniform float u_intensity;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    // Sphere ray-march
    float r = 0.42;
    float dist = length(uv);

    if (dist > r + 0.005) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }

    // Soft edge
    float edge = smoothstep(r, r - 0.02, dist);

    // Sphere normal from UV
    float z = sqrt(max(0.0, r * r - dot(uv, uv)));
    vec3 normal = normalize(vec3(uv, z));

    // Rotate the sphere (spinning)
    float angle = u_time * 0.4;
    float ca = cos(angle);
    float sa = sin(angle);
    vec3 rotNormal = vec3(
      normal.x * ca - normal.z * sa,
      normal.y,
      normal.x * sa + normal.z * ca
    );

    // Secondary slow rotation on another axis
    float angle2 = u_time * 0.15;
    float ca2 = cos(angle2);
    float sa2 = sin(angle2);
    rotNormal = vec3(
      rotNormal.x,
      rotNormal.y * ca2 - rotNormal.z * sa2,
      rotNormal.y * sa2 + rotNormal.z * ca2
    );

    // Morphing noise on sphere surface
    float scale = u_scale;
    float n1 = fbm(rotNormal * scale + u_time * 0.3);
    float n2 = fbm(rotNormal * scale * 0.7 + vec3(5.2, 1.3, 2.8) + u_time * 0.2);
    float n3 = fbm(rotNormal * scale * 1.3 + vec3(9.1, 4.7, 3.2) - u_time * 0.25);

    // Domain warping for organic feel
    float warp = fbm(rotNormal * scale * 0.5 + n1 * u_intensity);

    // Color mixing
    float mix1 = smoothstep(-0.3, 0.6, n1 + warp * 0.5);
    float mix2 = smoothstep(-0.2, 0.7, n2 + warp * 0.3);
    float mix3 = smoothstep(-0.1, 0.8, n3);

    vec3 color = u_color1;
    color = mix(color, u_color2, mix1);
    color = mix(color, u_color3, mix2 * 0.6);
    color = mix(color, u_color1 * 1.3, mix3 * 0.3);

    // Subtle lighting
    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
    float diffuse = max(dot(normal, lightDir), 0.0);
    float ambient = 0.4;
    float lighting = ambient + diffuse * 0.6;

    // Fresnel rim glow
    float fresnel = pow(1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    color += fresnel * u_color2 * 0.4;

    color *= lighting;

    // Subtle specular highlight
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
    color += spec * 0.15;

    gl_FragColor = vec4(color, edge);
  }
`;

interface WaveGlobeProps {
  size?: number;
  color1?: [number, number, number];
  color2?: [number, number, number];
  color3?: [number, number, number];
  scale?: number;
  intensity?: number;
  speed?: number;
  className?: string;
}

export default function WaveGlobe({
  size = 256,
  color1 = [0.98, 0.98, 0.98],
  color2 = [0.35, 0.65, 0.95],
  color3 = [0.22, 0.13, 0.84],
  scale = 0.2,
  intensity = 1.0,
  speed = 0.2,
  className,
}: WaveGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) return;

    // Compile shaders
    function createShader(
      gl: WebGLRenderingContext,
      type: number,
      source: string,
    ) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uScale = gl.getUniformLocation(program, "u_scale");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");
    const uColor1 = gl.getUniformLocation(program, "u_color1");
    const uColor2 = gl.getUniformLocation(program, "u_color2");
    const uColor3 = gl.getUniformLocation(program, "u_color3");

    gl.useProgram(program);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Handle DPR
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();

    function render() {
      const elapsed = (performance.now() - startTime) / 1000.0;
      const t = elapsed * speed;

      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uScale, scale);
      gl!.uniform1f(uIntensity, intensity);
      gl!.uniform3f(uColor1, color1[0], color1[1], color1[2]);
      gl!.uniform3f(uColor2, color2[0], color2[1], color2[2]);
      gl!.uniform3f(uColor3, color3[0], color3[1], color3[2]);

      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [size, color1, color2, color3, scale, intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
