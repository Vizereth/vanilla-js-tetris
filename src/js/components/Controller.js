class Controller {
  constructor(game, piece, view, timer) {
    this.game = game;
    this.view = view;
    this.piece = piece;

    this.timer = timer;

    this.x1 = null;
    this.x2 = null;
    this.y1 = null;
    this.y2 = null;
  }

  difference(a, b) {
    return Math.abs(a - b);
  }

  init() {
    const startScreen = document.querySelector(".start-screen");
    const controlsScreen = document.querySelector(".controls-screen");

    const btnLeft = document.querySelector(".controls-screen-btn-left");
    const btnRight = document.querySelector(".controls-screen-btn-right");
    const btnRotate = document.querySelector(".controls-screen-btn-rotate");

    document.addEventListener("keydown", (e) => {
      const keyCode = e.code;

      this.onArrowKeyHandler(keyCode);

      switch (keyCode) {
        case "Enter":
          this.play();
          break;
        case "Escape":
          this.pause();
          break;
        default:
          return;
      }
    });

    btnLeft.addEventListener("touchstart", () => this.piece.moveLeft());
    btnRight.addEventListener("touchstart", () => this.piece.moveRight());
    btnRotate.addEventListener("touchstart", () => this.piece.rotate());

    startScreen.addEventListener("touchstart", () => {
      startScreen.classList.remove("visible");
      controlsScreen.classList.add("visible");
      this.play();
    });
  }

  touchStart(event) {
    event = event || window.event;
    event.preventDefault();

    this.x1 = event.touches[0].clientX;
    this.y1 = event.touches[0].clientY;
  }

  touchEnd(event) {
    if (this.x1 === null || this.y1 === null) {
      return;
    }

    if (!this.game.playing) return;

    event = event || window.event;
    event.preventDefault();

    this.x2 = event.touches[0].clientX;
    this.y2 = event.touches[0].clientY;

    if (this.difference(this.x1, this.x2) > this.difference(this.y1, this.y2)) {
      if (this.x2 - this.x1 > 0) {
        this.piece.moveRight();
      } else {
        this.piece.moveLeft();
      }
    } else if (
      this.difference(this.x1, this.x2) < this.difference(this.y1, this.y2)
    ) {
      if (this.y2 - this.y1 < 0) {
        this.piece.rotate();
      } else {
        this.piece.moveDown();
      }
    }

    this.x1 = null;
    this.x2 = null;
    this.y1 = null;
    this.y2 = null;
  }

  onArrowKeyHandler(keyCode) {
    if (!this.game.playing) return;

    switch (keyCode) {
      case "ArrowLeft":
        this.piece.moveLeft();
        break;
      case "ArrowRight":
        this.piece.moveRight();
        break;
      case "ArrowUp":
        this.piece.rotate();
        break;
      case "ArrowDown":
        this.piece.moveDown();
        break;
      default:
        return;
    }

    this.view.render();
  }

  pause() {
    if (!this.game.playing) return;

    this.game.playing = false;
    this.timer.stop();
  }

  play() {
    if (this.game.playing) return;

    // Game is paused
    if (!this.game.playing && !this.game.isGameOver) {
      this.timer.start();

      return;
    }

    // Start screen or game over screen
    if (!this.game.playing && this.game.isGameOver) {
      this.game.reset();
      this.piece.init();
      this.timer.start();

      return;
    }
  }
}

export { Controller };
