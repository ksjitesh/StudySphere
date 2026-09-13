import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Home, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const GAME_WIDTH = 760;
const GAME_HEIGHT = 240;
const GROUND_Y = 205;

function NotFound() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() =>
    Number(localStorage.getItem("studysphere-dino-best") || 0)
  );

  const [gameState, setGameState] = useState("idle");

  const jump = useCallback(() => {
    const game = gameRef.current;

    if (!game) return;

    // First interaction starts the game
    if (game.state === "idle") {
      game.start();
      return;
    }

    // Game over -> restart + jump
    if (game.state === "gameover") {
      game.reset();
      game.start();
      game.dino.velocityY = -11.5;
      game.dino.jumping = true;
      return;
    }

    // Normal jump
    if (
      game.state === "playing" &&
      !game.dino.jumping
    ) {
      game.dino.velocityY = -11.5;
      game.dino.jumping = true;
    }
  }, []);

  const restart = useCallback(() => {
    const game = gameRef.current;

    if (!game) return;

    game.reset();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width = GAME_WIDTH * dpr;
    canvas.height = GAME_HEIGHT * dpr;

    ctx.scale(dpr, dpr);

    const game = {
      state: "idle",

      score: 0,
      speed: 5.2,

      spawnTimer: 90,
      animation: 0,

      dino: {
        x: 75,
        y: GROUND_Y - 42,
        width: 38,
        height: 42,
        velocityY: 0,
        jumping: false,
      },

      obstacles: [],

      clouds: [
        {
          x: 150,
          y: 45,
          speed: 0.25,
          size: 1,
        },
        {
          x: 480,
          y: 75,
          speed: 0.18,
          size: 0.75,
        },
        {
          x: 680,
          y: 35,
          speed: 0.22,
          size: 0.9,
        },
      ],

      start() {
        if (this.state === "playing") return;

        this.state = "playing";
        setGameState("playing");
      },

      reset() {
        this.state = "idle";

        this.score = 0;
        this.speed = 5.2;
        this.spawnTimer = 90;
        this.animation = 0;

        this.dino.x = 75;
        this.dino.y =
          GROUND_Y - this.dino.height;

        this.dino.velocityY = 0;
        this.dino.jumping = false;

        this.obstacles = [];

        setScore(0);
        setGameState("idle");
      },

      gameOver() {
        this.state = "gameover";

        const finalScore = Math.floor(
          this.score / 10
        );

        setScore(finalScore);
        setGameState("gameover");

        setBest((currentBest) => {
          const newBest = Math.max(
            currentBest,
            finalScore
          );

          localStorage.setItem(
            "studysphere-dino-best",
            newBest
          );

          return newBest;
        });
      },
    };

    gameRef.current = game;

    const getColors = () => {
      const styles =
        getComputedStyle(
          document.documentElement
        );

      return {
        text:
          styles
            .getPropertyValue("--text")
            .trim() || "#111",

        secondary:
          styles
            .getPropertyValue(
              "--text-secondary"
            )
            .trim() || "#777",

        primary:
          styles
            .getPropertyValue("--primary")
            .trim() || "#22c55e",

        border:
          styles
            .getPropertyValue("--border")
            .trim() || "#ddd",

        surface:
          styles
            .getPropertyValue("--surface")
            .trim() || "#fff",
      };
    };

    /* ─────────────────────────
       CLOUD
    ───────────────────────── */

    const drawCloud = (cloud, colors) => {
      ctx.save();

      ctx.globalAlpha = 0.15;
      ctx.fillStyle = colors.secondary;

      const x = cloud.x;
      const y = cloud.y;
      const s = cloud.size;

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        13 * s,
        0,
        Math.PI * 2
      );

      ctx.arc(
        x + 15 * s,
        y - 6 * s,
        17 * s,
        0,
        Math.PI * 2
      );

      ctx.arc(
        x + 34 * s,
        y,
        12 * s,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();
    };

    /* ─────────────────────────
       DINO
    ───────────────────────── */

    const drawDino = (colors) => {
      const d = game.dino;

      ctx.save();

      ctx.translate(d.x, d.y);

      ctx.fillStyle = colors.primary;

      // Body
      ctx.beginPath();

      ctx.roundRect(
        7,
        12,
        27,
        23,
        5
      );

      ctx.fill();

      // Head
      ctx.beginPath();

      ctx.roundRect(
        19,
        3,
        18,
        19,
        4
      );

      ctx.fill();

      // Snout
      ctx.fillRect(
        31,
        10,
        10,
        8
      );

      // Tail
      ctx.beginPath();

      ctx.moveTo(8, 17);
      ctx.lineTo(0, 12);
      ctx.lineTo(0, 22);

      ctx.closePath();

      ctx.fill();

      // Running animation
      const leg =
        Math.floor(
          game.animation / 7
        ) % 2 === 0
          ? 0
          : 4;

      // Legs
      ctx.fillRect(
        11,
        31,
        6,
        11 + leg
      );

      ctx.fillRect(
        27,
        31,
        6,
        11 - leg
      );

      // Eye
      ctx.fillStyle = "#ffffff";

      ctx.fillRect(
        30,
        7,
        4,
        4
      );

      ctx.fillStyle = "#111";

      ctx.fillRect(
        32,
        8,
        2,
        2
      );

      ctx.restore();
    };

    /* ─────────────────────────
       CACTUS
    ───────────────────────── */

    const drawCactus = (
      obstacle,
      colors
    ) => {
      ctx.save();

      ctx.translate(
        obstacle.x,
        obstacle.y
      );

      ctx.fillStyle =
        colors.text;

      const middle =
        obstacle.width / 2;

      // Main stem
      ctx.fillRect(
        middle - 4,
        0,
        8,
        obstacle.height
      );

      // Left branch
      if (
        obstacle.type === "double" ||
        obstacle.type === "triple"
      ) {
        ctx.fillRect(
          middle - 13,
          10,
          8,
          19
        );

        ctx.fillRect(
          middle - 13,
          10,
          14,
          7
        );
      }

      // Right branch
      if (
        obstacle.type === "triple"
      ) {
        ctx.fillRect(
          middle + 5,
          17,
          8,
          17
        );

        ctx.fillRect(
          middle - 1,
          17,
          14,
          7
        );
      }

      ctx.restore();
    };

    /* ─────────────────────────
       FLYING ENEMY
    ───────────────────────── */

    const drawBird = (
      obstacle,
      colors
    ) => {
      ctx.save();

      ctx.translate(
        obstacle.x,
        obstacle.y
      );

      ctx.fillStyle =
        colors.text;

      // Body
      ctx.beginPath();

      ctx.ellipse(
        16,
        10,
        13,
        7,
        0,
        0,
        Math.PI * 2
      );

      ctx.fill();

      // Wings animation
      const flap =
        Math.sin(
          game.animation * 0.25
        ) * 5;

      ctx.beginPath();

      ctx.moveTo(13, 9);

      ctx.lineTo(
        4,
        2 + flap
      );

      ctx.lineTo(
        10,
        11
      );

      ctx.closePath();

      ctx.fill();

      ctx.beginPath();

      ctx.moveTo(20, 9);

      ctx.lineTo(
        29,
        2 - flap
      );

      ctx.lineTo(
        24,
        11
      );

      ctx.closePath();

      ctx.fill();

      // Beak
      ctx.beginPath();

      ctx.moveTo(28, 9);
      ctx.lineTo(36, 12);
      ctx.lineTo(28, 15);

      ctx.closePath();

      ctx.fill();

      ctx.restore();
    };

    /* ─────────────────────────
       COLLISION
    ───────────────────────── */

    const collision = (
      a,
      b
    ) => {
      return (
        a.x + 8 <
          b.x +
            b.width -
            5 &&
        a.x +
          a.width -
          7 >
          b.x + 5 &&
        a.y + 7 <
          b.y +
            b.height &&
        a.y +
          a.height -
          3 >
          b.y + 3
      );
    };

    /* ─────────────────────────
       SPAWN OBSTACLES
    ───────────────────────── */

    const spawnObstacle = () => {
      const random =
        Math.random();

      // Flying obstacle
      if (random < 0.27) {
        const heights = [
          65,
          92,
          118,
        ];

        const y =
          heights[
            Math.floor(
              Math.random() *
                heights.length
            )
          ];

        game.obstacles.push({
          x: GAME_WIDTH + 30,
          y,
          width: 38,
          height: 20,
          type: "bird",
          air: true,
        });

        return;
      }

      // Ground obstacles
      const types = [
        "single",
        "double",
        "triple",
      ];

      const type =
        types[
          Math.floor(
            Math.random() *
              types.length
          )
        ];

      const height =
        type === "single"
          ? 34
          : type === "double"
            ? 42
            : 49;

      const width =
        type === "single"
          ? 18
          : 31;

      game.obstacles.push({
        x: GAME_WIDTH + 30,
        y:
          GROUND_Y -
          height,
        width,
        height,
        type,
        air: false,
      });
    };

    /* ─────────────────────────
       UPDATE
    ───────────────────────── */

    const update = () => {
      if (
        game.state !==
        "playing"
      ) {
        return;
      }

      game.animation++;

      /* Dino physics */

      game.dino.velocityY +=
        0.58;

      game.dino.y +=
        game.dino.velocityY;

      if (
        game.dino.y >=
        GROUND_Y -
          game.dino.height
      ) {
        game.dino.y =
          GROUND_Y -
          game.dino.height;

        game.dino.velocityY = 0;

        game.dino.jumping = false;
      }

      /* Increasing difficulty */

      game.speed =
        Math.min(
          10,
          5.2 +
            game.score /
              900
        );

      /* Spawn */

      game.spawnTimer--;

      if (
        game.spawnTimer <= 0
      ) {
        spawnObstacle();

        /*
         * Smaller gap as speed increases.
         * This makes the game progressively harder.
         */

        const minimum =
          Math.max(
            48,
            82 -
              game.speed *
                2
          );

        game.spawnTimer =
          minimum +
          Math.random() *
            65;
      }

      /* Move obstacles */

      game.obstacles.forEach(
        (obstacle) => {
          obstacle.x -=
            game.speed;
        }
      );

      /* Remove old */

      game.obstacles =
        game.obstacles.filter(
          (obstacle) =>
            obstacle.x >
            -70
        );

      /* Clouds */

      game.clouds.forEach(
        (cloud) => {
          cloud.x -=
            cloud.speed;

          if (
            cloud.x < -80
          ) {
            cloud.x =
              GAME_WIDTH + 40;
          }
        }
      );

      /* Collision */

      for (
        const obstacle of
          game.obstacles
      ) {
        if (
          collision(
            game.dino,
            obstacle
          )
        ) {
          game.gameOver();
          return;
        }
      }

      /* Score */

      game.score++;

      if (
        game.score % 10 ===
        0
      ) {
        setScore(
          Math.floor(
            game.score / 10
          )
        );
      }
    };

    /* ─────────────────────────
       DRAW
    ───────────────────────── */

    const draw = () => {
      const colors =
        getColors();

      ctx.clearRect(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT
      );

      /* Background */

      ctx.fillStyle =
        colors.secondary;

      ctx.globalAlpha =
        0.025;

      ctx.fillRect(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT
      );

      ctx.globalAlpha = 1;

      /* Clouds */

      game.clouds.forEach(
        (cloud) =>
          drawCloud(
            cloud,
            colors
          )
      );

      /* Ground */

      ctx.strokeStyle =
        colors.border;

      ctx.lineWidth = 2;

      ctx.beginPath();

      ctx.moveTo(
        0,
        GROUND_Y
      );

      ctx.lineTo(
        GAME_WIDTH,
        GROUND_Y
      );

      ctx.stroke();

      /* Ground movement */

      const offset =
        (game.animation *
          game.speed) %
        50;

      ctx.strokeStyle =
        colors.secondary;

      ctx.globalAlpha =
        0.16;

      ctx.lineWidth = 1;

      for (
        let x =
          -50 + offset;
        x <
        GAME_WIDTH;
        x += 50
      ) {
        ctx.beginPath();

        ctx.moveTo(
          x,
          GROUND_Y + 8
        );

        ctx.lineTo(
          x + 18,
          GROUND_Y + 8
        );

        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      /* Obstacles */

      game.obstacles.forEach(
        (obstacle) => {
          if (
            obstacle.air
          ) {
            drawBird(
              obstacle,
              colors
            );
          } else {
            drawCactus(
              obstacle,
              colors
            );
          }
        }
      );

      /* Dino */

      drawDino(colors);

      /* IDLE */

      if (
        game.state ===
        "idle"
      ) {
        ctx.fillStyle =
          colors.text;

        ctx.textAlign =
          "center";

        ctx.font =
          "800 18px system-ui, sans-serif";

        ctx.fillText(
          "PRESS SPACE TO START",
          GAME_WIDTH / 2,
          85
        );

        ctx.font =
          "500 12px system-ui, sans-serif";

        ctx.fillStyle =
          colors.secondary;

        ctx.fillText(
          "or tap the game",
          GAME_WIDTH / 2,
          108
        );
      }

      /* GAME OVER */

      if (
        game.state ===
        "gameover"
      ) {
        ctx.fillStyle =
          colors.text;

        ctx.textAlign =
          "center";

        ctx.font =
          "800 20px system-ui, sans-serif";

        ctx.fillText(
          "GAME OVER",
          GAME_WIDTH / 2,
          82
        );

        ctx.font =
          "500 13px system-ui, sans-serif";

        ctx.fillStyle =
          colors.secondary;

        ctx.fillText(
          "Press Space or tap to try again",
          GAME_WIDTH / 2,
          106
        );
      }
    };

    let frame;

    const loop = () => {
      update();
      draw();

      frame =
        requestAnimationFrame(
          loop
        );
    };

    loop();

    return () => {
      cancelAnimationFrame(
        frame
      );

      gameRef.current = null;
    };
  }, []);

  /* Keyboard */

  useEffect(() => {
    const handleKeyDown = (
      event
    ) => {
      if (
        event.code ===
          "Space" ||
        event.code ===
          "ArrowUp"
      ) {
        event.preventDefault();

        jump();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [jump]);

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:py-10"
      style={{
        backgroundColor:
          "var(--bg)",
      }}
    >
      {/* Ambient glow */}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          backgroundColor:
            "var(--primary)",
          opacity: 0.06,
        }}
      />

      {/* Grid */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize:
              "70px 70px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl">

        {/* ─────────────────
            404 HEADER
        ───────────────── */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="text-center"
        >
          {/* Animated 404 */}

          <motion.div
            animate={{
              y: [
                0,
                -7,
                0,
                5,
                0,
              ],

              rotateX: [
                0,
                4,
                -3,
                2,
                0,
              ],

              rotateY: [
                0,
                -4,
                3,
                -2,
                0,
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformPerspective:
                800,
            }}
            className="relative inline-block"
          >
            {/* Depth layer */}

            <span
              className="absolute inset-0 translate-x-1 translate-y-2 text-7xl font-black tracking-[-0.08em] opacity-10 blur-[1px] sm:text-9xl"
              style={{
                color:
                  "var(--primary)",
              }}
            >
              404
            </span>

            {/* Main text */}

            <span
              className="relative block text-7xl font-black tracking-[-0.08em] sm:text-9xl"
              style={{
                color:
                  "var(--primary)",

                textShadow:
                  "0 10px 30px color-mix(in srgb, var(--primary) 18%, transparent), 2px 3px 0 color-mix(in srgb, var(--text) 8%, transparent)",
              }}
            >
              404
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="mt-1 text-2xl font-black tracking-tight sm:text-3xl"
            style={{
              color:
                "var(--text)",
            }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
            className="mx-auto mt-2 max-w-md text-sm leading-6"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Looks like you got lost.
            While you're here, help
            our little dinosaur survive.
          </motion.p>
        </motion.div>

        {/* ─────────────────
            GAME
        ───────────────── */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
          className="mt-7 overflow-hidden rounded-3xl border shadow-xl"
          style={{
            backgroundColor:
              "var(--surface)",
            borderColor:
              "var(--border)",
          }}
        >
          {/* Game header */}

          <div
            className="flex items-center justify-between border-b px-4 py-3 sm:px-5"
            style={{
              borderColor:
                "var(--border)",
            }}
          >
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                StudySphere Runner
              </p>

              <p
                className="mt-0.5 text-xs"
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                Space / ↑ / Tap to jump
              </p>
            </div>

            <div className="flex gap-5 text-right">
              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    color:
                      "var(--text-secondary)",
                  }}
                >
                  Score
                </p>

                <p
                  className="font-mono text-sm font-bold"
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  {String(score).padStart(
                    5,
                    "0"
                  )}
                </p>
              </div>

              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    color:
                      "var(--text-secondary)",
                  }}
                >
                  Best
                </p>

                <p
                  className="font-mono text-sm font-bold"
                  style={{
                    color:
                      "var(--primary)",
                  }}
                >
                  {String(best).padStart(
                    5,
                    "0"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Game canvas */}

          <div
            className="relative w-full cursor-pointer select-none"
            onPointerDown={jump}
          >
            <canvas
              ref={canvasRef}
              className="block h-auto w-full"
              style={{
                aspectRatio:
                  `${GAME_WIDTH}/${GAME_HEIGHT}`,
              }}
            />

            {/* Mobile hint */}

            <div
              className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1.5 text-[10px] font-medium sm:hidden"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--surface) 85%, transparent)",
                borderColor:
                  "var(--border)",
                color:
                  "var(--text-secondary)",
              }}
            >
              Tap to start / jump
            </div>
          </div>
        </motion.div>

        {/* Buttons */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.55,
          }}
          className="mt-5 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={restart}
            className="flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
            style={{
              backgroundColor:
                "var(--surface)",
              borderColor:
                "var(--border)",
              color:
                "var(--text)",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={17} />
            Restart
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
            style={{
              backgroundColor:
                "var(--primary)",
            }}
          >
            <Home size={17} />
            Back to Home
          </Link>
        </motion.div>

        <p
          className="mt-5 text-center text-[10px] uppercase tracking-[0.2em]"
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Learn • Practice • Succeed
        </p>
      </div>
    </main>
  );
}

export default NotFound;