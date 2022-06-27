class Controller {
  constructor(game, piece, view, timer) {
    this.game = game;
    this.view = view;
    this.piece = piece;

    this.timer = timer;
  }

  init() {
    document.addEventListener('keydown', (e) => {
      const keyCode = e.code;

      this.onArrowKeyHandler(keyCode);

      switch (keyCode) {
        case 'Enter':
          this.onENTERHandler();
          break;
        case 'Escape':
          this.onESCAPEHandler();
          break;
        default:
          return;
      }
    });
  }

  onArrowKeyHandler(keyCode) {
    if (!this.game.playing) return;

    switch (keyCode) {
      case 'ArrowLeft':
        this.piece.moveLeft();
        break;
      case 'ArrowRight':
        this.piece.moveRight();
        break;
      case 'ArrowUp':
        this.piece.rotate();
        break;
      case 'ArrowDown':
        this.piece.moveDown();
        break;
      default:
        return;
    }

    this.view.render();
  }

  onESCAPEHandler() {
    if (!this.game.playing) return;

    this.game.playing = false;
    this.timer.stop();
  }

  onENTERHandler() {
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
