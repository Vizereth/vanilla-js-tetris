class Timer {
  constructor(game, view, piece) {
    this.game = game;
    this.view = view;
    this.piece = piece;

    this.timer = null;
  }

  start() {
    const speed = 1100 - this.game.level * 100;

    this.view.render();

    this.game.playing = true;
    this.timer = setInterval(() => this.play(), speed);
  }

  play() {
    if (this.game.isGameOver) {
      this.stop();
      this.view.renderGameOverScreen();
      return;
    }

    if (!this.game.playing) return;

    this.piece.moveDown();
    this.view.render();
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.game.playing = false;

    this.view.renderPauseScreen();
  }
}

export { Timer };
