import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";

/* =========================================================
   SCROLL + MOUSE MOTION
========================================================= */

function useSceneMotion() {
  const motion = useRef({
    scroll: 0,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      motion.current.scroll =
        maxScroll > 0
          ? window.scrollY / maxScroll
          : 0;
    };

    const handleMouse = (event) => {
      motion.current.mouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

      motion.current.mouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("mousemove", handleMouse, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return motion;
}

/* =========================================================
   MOUNTAIN
========================================================= */

function Mountain({
  position,
  scale,
  color,
  rotation = [0, 0, 0],
}) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <coneGeometry args={[2.5, 3.2, 7]} />

      <meshStandardMaterial
        color={color}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

/* =========================================================
   CRYSTAL
========================================================= */

function Crystal({
  position,
  scale = 1,
  color = "#71d69a",
  speed = 1,
}) {
  const ref = useRef();
  const baseY = position[1];

  useFrame((state, delta) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;

    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x += delta * 0.12;

    ref.current.position.y =
      baseY + Math.sin(time * speed) * 0.08;
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.35}
      floatIntensity={0.45}
    >
      <mesh
        ref={ref}
        position={position}
        scale={scale}
        castShadow
      >
        <octahedronGeometry args={[0.75, 2]} />

        <meshPhysicalMaterial
          color={color}
          roughness={0.12}
          metalness={0.65}
          transmission={0.15}
          thickness={0.8}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

/* =========================================================
   FLOATING STONE
========================================================= */

function FloatingStone({
  position,
  scale = 1,
  rotation = [0, 0, 0],
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;

    ref.current.rotation.y =
      rotation[1] + Math.sin(time * 0.3) * 0.25;

    ref.current.rotation.z =
      rotation[2] + Math.cos(time * 0.25) * 0.12;
  });

  return (
    <Float
      speed={0.55}
      rotationIntensity={0.2}
      floatIntensity={0.35}
    >
      <mesh
        ref={ref}
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow
      >
        <dodecahedronGeometry args={[0.55, 1]} />

        <meshStandardMaterial
          color="#172a20"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

/* =========================================================
   GLOWING MOON
========================================================= */

function Moon() {
  return (
    <group position={[-4.8, 3.2, -10]}>
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />

        <meshBasicMaterial color="#dfffea" />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.55, 32, 32]} />

        <meshBasicMaterial
          color="#9be9b8"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   DISTANT LIGHT
========================================================= */

function DistantLight() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;

    ref.current.position.x =
      Math.sin(time * 0.12) * 2.5;

    ref.current.position.y =
      2.5 + Math.cos(time * 0.16) * 0.5;
  });

  return (
    <pointLight
      ref={ref}
      position={[1, 2.5, -3]}
      intensity={2.5}
      distance={12}
      color="#71d69a"
    />
  );
}

/* =========================================================
   FANTASY WORLD
========================================================= */

function FantasyWorld() {
  const world = useRef();

  const cameraTarget = useRef(
    new THREE.Vector3(0, 0, 7)
  );

  const motion = useSceneMotion();

  useFrame((state) => {
    if (!world.current) return;

    const time = state.clock.elapsedTime;
    const scroll = motion.current.scroll;

    const mouseX = motion.current.mouseX;
    const mouseY = motion.current.mouseY;

    /* ---------------------------------------------
       WORLD ROTATION
    --------------------------------------------- */

    const targetRotationY =
      Math.sin(time * 0.08) * 0.035 +
      scroll * Math.PI * 0.48;

    const targetRotationX =
      Math.sin(time * 0.1) * 0.02 +
      scroll * 0.1;

    world.current.rotation.y =
      THREE.MathUtils.lerp(
        world.current.rotation.y,
        targetRotationY,
        0.035
      );

    world.current.rotation.x =
      THREE.MathUtils.lerp(
        world.current.rotation.x,
        targetRotationX,
        0.035
      );

    /* ---------------------------------------------
       WORLD TRAVEL
    --------------------------------------------- */

    const targetWorldY =
      -scroll * 2.8 +
      Math.sin(time * 0.25) * 0.06;

    const targetWorldX =
      Math.sin(scroll * Math.PI * 1.5) * 1.05;

    world.current.position.y =
      THREE.MathUtils.lerp(
        world.current.position.y,
        targetWorldY,
        0.045
      );

    world.current.position.x =
      THREE.MathUtils.lerp(
        world.current.position.x,
        targetWorldX,
        0.045
      );

    /* ---------------------------------------------
       MOUSE PARALLAX
    --------------------------------------------- */

    const targetMouseX = mouseX * 0.35;
    const targetMouseY = mouseY * 0.2;

    cameraTarget.current.x =
      THREE.MathUtils.lerp(
        cameraTarget.current.x,
        targetMouseX,
        0.035
      );

    cameraTarget.current.y =
      THREE.MathUtils.lerp(
        cameraTarget.current.y,
        -targetMouseY,
        0.035
      );

    /* ---------------------------------------------
       CAMERA
    --------------------------------------------- */

    state.camera.position.x =
      THREE.MathUtils.lerp(
        state.camera.position.x,
        cameraTarget.current.x,
        0.035
      );

    state.camera.position.y =
      THREE.MathUtils.lerp(
        state.camera.position.y,
        cameraTarget.current.y,
        0.035
      );

    state.camera.position.z =
      THREE.MathUtils.lerp(
        state.camera.position.z,
        7 - scroll * 1.55,
        0.035
      );

    state.camera.lookAt(
      targetMouseX * 0.15,
      -targetMouseY * 0.12,
      0
    );
  });

  return (
    <group ref={world}>

      {/* =========================================
          MOON
      ========================================= */}

      <Moon />

      {/* =========================================
          BACKGROUND MOUNTAINS
      ========================================= */}

      <Mountain
        position={[0, -2.4, -6]}
        scale={[5, 2.8, 1]}
        color="#10231a"
      />

      <Mountain
        position={[-4, -2.5, -7]}
        scale={[3.5, 2.3, 1]}
        color="#0b1913"
      />

      <Mountain
        position={[4.5, -2.6, -8]}
        scale={[4, 2.6, 1]}
        color="#0a1711"
      />

      {/* =========================================
          FAR MOUNTAINS
      ========================================= */}

      <Mountain
        position={[-6, -2.8, -11]}
        scale={[4, 2.4, 1]}
        color="#07110d"
      />

      <Mountain
        position={[7, -2.8, -12]}
        scale={[5, 3, 1]}
        color="#06100c"
      />

      <Mountain
        position={[1, -3, -15]}
        scale={[7, 3.8, 1]}
        color="#040b08"
      />

      {/* =========================================
          MAIN CRYSTALS
      ========================================= */}

      <Crystal
        position={[2.1, 0.4, 0]}
        scale={1.15}
        color="#71d69a"
        speed={1.1}
      />

      <Crystal
        position={[-2.2, 1.3, -1.5]}
        scale={0.58}
        color="#c8f5d8"
        speed={0.8}
      />

      <Crystal
        position={[3.8, -0.4, -3]}
        scale={0.38}
        color="#5bbf82"
        speed={0.7}
      />

      <Crystal
        position={[-3.8, -0.1, -4]}
        scale={0.28}
        color="#9be9b8"
        speed={0.9}
      />

      {/* =========================================
          EXTRA CRYSTALS
      ========================================= */}

      <Crystal
        position={[4.8, 1.4, -5]}
        scale={0.2}
        color="#dfffea"
        speed={0.65}
      />

      <Crystal
        position={[-5.1, 0.7, -5.5]}
        scale={0.24}
        color="#71d69a"
        speed={0.75}
      />

      <Crystal
        position={[1.5, 2.2, -4.5]}
        scale={0.18}
        color="#b8f5cc"
        speed={0.55}
      />

      <Crystal
        position={[-1.1, -0.3, -6]}
        scale={0.16}
        color="#5bbf82"
        speed={0.7}
      />

      {/* =========================================
          FLOATING STONES
      ========================================= */}

      <FloatingStone
        position={[-3.5, 2.1, -3]}
        scale={0.65}
        rotation={[0.2, 0.4, 0.1]}
      />

      <FloatingStone
        position={[4.2, 2.5, -4]}
        scale={0.45}
        rotation={[0.1, 0.8, 0.2]}
      />

      <FloatingStone
        position={[-5.5, 1.8, -6]}
        scale={0.35}
        rotation={[0.4, 0.2, 0.3]}
      />

      <FloatingStone
        position={[5.6, 0.8, -7]}
        scale={0.3}
        rotation={[0.2, 0.6, 0.1]}
      />

      {/* =========================================
          GROUND
      ========================================= */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.1, -1]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />

        <meshStandardMaterial
          color="#050b08"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* =========================================
          PARTICLE FIELD — FAR
      ========================================= */}

      <Sparkles
        count={220}
        scale={[18, 10, 18]}
        size={0.45}
        speed={0.06}
        opacity={0.22}
        color="#ffffff"
      />

      {/* =========================================
          PARTICLE FIELD — MID
      ========================================= */}

      <Sparkles
        count={180}
        scale={[14, 8, 14]}
        size={0.8}
        speed={0.12}
        opacity={0.3}
        color="#b8f5cc"
      />

      {/* =========================================
          PARTICLE FIELD — CLOSE
      ========================================= */}

      <Sparkles
        count={120}
        scale={[10, 6, 10]}
        size={1.25}
        speed={0.22}
        opacity={0.4}
        color="#8ee9ae"
      />

      {/* =========================================
          BRIGHT FIREFLIES
      ========================================= */}

      <Sparkles
        count={70}
        scale={[7, 4.5, 7]}
        size={2.2}
        speed={0.35}
        opacity={0.58}
        color="#71d69a"
      />

      {/* =========================================
          TINY WHITE DUST
      ========================================= */}

      <Sparkles
        count={100}
        scale={[20, 12, 20]}
        size={0.28}
        speed={0.03}
        opacity={0.18}
        color="#ffffff"
      />
    </group>
  );
}

/* =========================================================
   LIGHTING
========================================================= */

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.28} />

      <directionalLight
        position={[5, 8, 6]}
        intensity={2}
        castShadow
      />

      <pointLight
        position={[2, 2, 2]}
        intensity={5}
        distance={12}
        color="#71d69a"
      />

      <pointLight
        position={[-4, 1, -2]}
        intensity={2}
        distance={10}
        color="#dfffea"
      />

      <DistantLight />
    </>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function FantasyHero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.35,
  });

  /* ---------------------------------------------------------
     HERO COPY — scroll driven, reversible in both directions
  --------------------------------------------------------- */
  const contentY = useTransform(progress, [0, 0.8], [0, -95]);
  const contentScale = useTransform(progress, [0, 0.82], [1, 0.94]);
  const contentOpacity = useTransform(
    progress,
    [0, 0.5, 0.82],
    [1, 1, 0]
  );

  const labelY = useTransform(progress, [0, 0.72], [0, -55]);
  const labelOpacity = useTransform(progress, [0, 0.6, 0.78], [1, 1, 0]);

  const learnX = useTransform(progress, [0, 0.72], [0, -170]);
  const learnY = useTransform(progress, [0, 0.72], [0, -20]);
  const learnOpacity = useTransform(progress, [0, 0.48, 0.72], [1, 1, 0]);

  const exploreX = useTransform(progress, [0, 0.72], [0, 170]);
  const exploreY = useTransform(progress, [0, 0.72], [0, 12]);
  const exploreOpacity = useTransform(progress, [0, 0.48, 0.72], [1, 1, 0]);

  const evolveX = useTransform(progress, [0, 0.72], [0, -120]);
  const evolveY = useTransform(progress, [0, 0.72], [0, 35]);
  const evolveOpacity = useTransform(progress, [0, 0.52, 0.76], [1, 1, 0]);

  const descriptionY = useTransform(progress, [0, 0.7], [0, 45]);
  const descriptionOpacity = useTransform(progress, [0, 0.58, 0.78], [1, 1, 0]);

  const statsY = useTransform(progress, [0, 0.72], [0, 65]);
  const statsOpacity = useTransform(progress, [0, 0.58, 0.8], [1, 1, 0]);

  const actionsY = useTransform(progress, [0, 0.72], [0, 80]);
  const actionsOpacity = useTransform(progress, [0, 0.62, 0.82], [1, 1, 0]);

  const scrollOpacity = useTransform(progress, [0, 0.18], [1, 0]);
  const scrollY = useTransform(progress, [0, 0.3], [0, 24]);

  const sideLineScale = useTransform(progress, [0, 0.75], [1, 0]);
  const progressScale = useTransform(progress, [0, 1], [0, 1]);
  const scrollIndicatorScale = useTransform(progress, [0, 0.22], [0.35, 1]);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        contentRef.current.style.willChange = "transform, opacity";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120svh] overflow-hidden bg-[#050b08] text-white"
    >
      {/* =========================================
          3D ENVIRONMENT
      ========================================= */}
      <div className="pointer-events-none absolute inset-0">
        <Canvas
          dpr={[1, 1.5]}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 7]}
            fov={45}
          />

          <fog attach="fog" args={["#050b08", 7, 20]} />
          <Lighting />
          <FantasyWorld />
        </Canvas>
      </div>

      {/* =========================================
          ATMOSPHERIC LAYERS
      ========================================= */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 68% 42%, rgba(113,214,154,0.18), transparent 25%),
            radial-gradient(circle at 32% 58%, rgba(70,160,105,0.08), transparent 30%),
            radial-gradient(circle at 50% 20%, rgba(255,255,255,0.035), transparent 25%),
            linear-gradient(to bottom, rgba(5,11,8,0.02) 0%, rgba(5,11,8,0.08) 40%, rgba(5,11,8,0.88) 100%)
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.58) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,11,8,0.7), transparent)",
        }}
      />

      {/* =========================================
          HERO CONTENT
      ========================================= */}
      <motion.div
        ref={contentRef}
        className="relative z-10 flex min-h-[100svh] items-center"
        style={{
          y: contentY,
          scale: contentScale,
          opacity: contentOpacity,
          transformPerspective: 1200,
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
          <div className="relative max-w-4xl">
            {/* subtle eyebrow */}
            <motion.div
              className="mb-8 flex items-center gap-3"
              style={{ y: labelY, opacity: labelOpacity }}
            >
              <span className="h-px w-10 bg-[#71d69a]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#71d69a] sm:text-xs">
                StudySphere • BCA • Six Semesters
              </p>
            </motion.div>

            {/* TITLE — each word has its own direction */}
            <h1
              className="select-none text-[clamp(4.2rem,11vw,10rem)] font-bold leading-[0.78] tracking-[-0.085em]"
              aria-label="Learn. Explore. Evolve."
            >
              <motion.span
                className="block"
                style={{
                  x: learnX,
                  y: learnY,
                  opacity: learnOpacity,
                }}
              >
                Learn.
              </motion.span>

              <motion.span
                className="block"
                style={{
                  x: exploreX,
                  y: exploreY,
                  opacity: exploreOpacity,
                }}
              >
                Explore.
              </motion.span>

              <motion.span
                className="block text-[#71d69a]"
                style={{
                  x: evolveX,
                  y: evolveY,
                  opacity: evolveOpacity,
                }}
              >
                Evolve.
              </motion.span>
            </h1>

            {/* description */}
            <motion.p
              className="mt-10 max-w-xl text-sm leading-7 text-white/55 sm:text-lg sm:leading-8"
              style={{
                y: descriptionY,
                opacity: descriptionOpacity,
              }}
            >
              A focused digital space for your BCA journey —
              study smarter, find your syllabus, and keep moving
              semester by semester.
            </motion.p>

            {/* stats */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs"
              style={{ y: statsY, opacity: statsOpacity }}
            >
              <span>06 Semesters</span>
              <span className="text-white/15">/</span>
              <span>30 Subjects</span>
              <span className="text-white/15">/</span>
              <span>One Journey</span>
            </motion.div>

            {/* actions */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              style={{ y: actionsY, opacity: actionsOpacity }}
            >
              <a
                href="#continue-learning" onClick={(event) => { event.preventDefault(); const nextSection = event.currentTarget.closest("section")?.nextElementSibling; if (nextSection) { nextSection.scrollIntoView({ behavior: "smooth", block: "start" }); } }}
                className="group inline-flex items-center rounded-full bg-[#71d69a] px-7 py-3.5 text-sm font-semibold text-[#06100a] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(113,214,154,0.22)]"
              >
                Start Exploring
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/syllabus"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                Explore Syllabus
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      /* =========================================
          SIDE SCROLL PROGRESS
      ========================================= */
      <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <div className="relative h-32 w-px bg-white/10">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-[#71d69a]"
            style={{ scaleY: progressScale }}
          />
        </div>
        <div className="mt-3 text-[8px] font-semibold tracking-[0.28em] text-white/30 [writing-mode:vertical-rl]">
          SCROLL
        </div>
      </div>

      {/* =========================================
          SCROLL INDICATOR
      ========================================= */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-center"
        style={{ opacity: scrollOpacity, y: scrollY }}
      >
        <div className="text-[9px] uppercase tracking-[0.35em] text-white/35">
          Scroll to explore
        </div>

        <div className="mx-auto mt-3 h-12 w-px overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-full origin-top bg-[#71d69a]"
            style={{ scaleY: scrollIndicatorScale }}
          />
        </div>
      </motion.div>

      {/* =========================================
          BOTTOM FADE
      ========================================= */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, #050b08, transparent)",
        }}
      />
    </section>
  );
}
