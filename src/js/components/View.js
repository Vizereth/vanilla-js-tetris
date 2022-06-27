class View {
  constructor(game, piece, score, el, cvsConfig, colorsConfig, fontConfig) {
    this.game = game;
    this.score = score;
    this.piece = piece;

    this.cvsConfig = cvsConfig;
    this.colorsConfig = colorsConfig;
    this.fontConfig = fontConfig;

    this.el = el;
    this.cvs = null;
    this.ctx = null;

    this.cvsWidth = this.cvsConfig.width;
    this.cvsHeight = this.cvsConfig.height;

    this.cellWidth = null;
    this.cellHeight = null;

    // Gap between playfield and side panel
    this.gap = 30;

    this.borderWidth = this.cvsConfig.borderWidth;

    // Frame
    this.frameX = this.borderWidth;
    this.frameY = this.borderWidth;

    // PlayField
    this.playFieldX = this.frameX;
    this.playFieldY = this.frameY;
    this.playFieldWidth = this.cvsConfig.playFieldWidth;
    this.playFieldHeight = this.cvsConfig.playFieldHeight;

    // Side Panel
    this.sidePanelX = this.playFieldWidth + this.gap;
    this.sidePanelY = 0;
    this.sidePanelWidth = this.cvsWidth / 3;
    this.sidePanelHeight = this.cvsHeight;
  }

  init() {
    this.piece.create();

    this.createCanvas();
    this.calculateDimensions();
    this.renderStartScreen();
  }

  createCanvas() {
    const { width, height } = this.cvsConfig;

    const cvs = document.createElement('canvas');
    this.cvs = cvs;
    this.ctx = cvs.getContext('2d');

    this.cvs.width = width;
    this.cvs.height = height;

    this.el.appendChild(this.cvs);
  }

  calculateDimensions() {
    const { rows, columns } = this.cvsConfig;

    this.cellWidth = this.playFieldWidth / columns;
    this.cellHeight = this.playFieldHeight / rows;
  }

  render() {
    this.clear();

    this.renderFrame();
    this.renderPlayFieldBackground();
    this.renderSidePanel();

    const playField = this.game.playFieldActive;

    for (let row = 0; row < playField.length; row++) {
      for (let col = 0; col < playField[row].length; col++) {
        const playFieldXY = playField[row][col];

        if (playFieldXY !== 0 && playFieldXY !== 99) {
          this.renderPiece(row, col, playFieldXY);
        } else if (playFieldXY === 99) {
          this.renderFullCell(row, col);
        }
      }
    }
  }

  renderFrame() {
    this.ctx.strokeStyle = 'rgb(50, 50, 50)';
    this.ctx.lineWidth = this.borderWidth;
    this.ctx.strokeRect(this.frameX, this.frameY, this.playFieldWidth, this.playFieldHeight);
  }

  renderPlayFieldBackground() {
    this.ctx.fillStyle = 'rgb(18, 18, 18)';
    this.ctx.fillRect(this.playFieldX, this.playFieldY, this.playFieldWidth, this.playFieldHeight);
  }

  renderStartScreen() {
    this.clear();

    const { colorPrimary, fontFamily, fontSizeBig } = this.fontConfig;

    this.ctx.beginPath();
    this.ctx.fillStyle = colorPrimary;
    this.ctx.font = `${fontSizeBig} ${fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      'Press ENTER to start',
      this.cvsWidth / 2,
      this.cvsHeight / 2
    );
    this.ctx.closePath();
  }

  renderPauseScreen() {
    const { colorPrimary, fontFamily, fontSizeBig } = this.fontConfig;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    this.ctx.fillRect(0, 0, this.cvsWidth, this.cvsHeight);
    this.ctx.fillStyle = colorPrimary;
    this.ctx.font = `${fontSizeBig} ${fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('RESUME', this.cvsWidth / 2, this.cvsHeight / 2);
    this.ctx.closePath();
  }

  renderGameOverScreen() {
    this.clear();

    const { colorPrimary, fontFamily, fontSizeMedium } = this.fontConfig;

    this.ctx.fillStyle = colorPrimary;
    this.ctx.font = `${fontSizeMedium} ${fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('GAME OVER', this.cvsWidth / 2, this.cvsHeight / 2);
    this.ctx.fillText(
      `Score: ${this.score.score}`,
      this.cvsWidth / 2,
      this.cvsHeight / 2 + 50
    );
    this.ctx.fillText(
      `Press ENTER to start a new game`,
      this.cvsWidth / 2,
      this.cvsHeight / 2 + 100
    );
  }

  renderFullCell(row, col) {
    this.ctx.fillStyle = '#D81C38';
    this.ctx.strokeStyle = 'rgb(25, 25, 25)';
    this.ctx.lineWidth = 1;

    this.ctx.fillRect(
      this.playFieldX + col * this.cellWidth,
      this.playFieldY + row * this.cellHeight,
      this.cellWidth,
      this.cellHeight
    );
    this.ctx.strokeRect(
      this.playFieldX + col * this.cellWidth,
      this.playFieldY + row * this.cellHeight,
      this.cellWidth,
      this.cellHeight
    );
  }

  renderPiece(row, col, pieceID) {
    const color = this.colorsConfig[pieceID];

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = 'rgb(25, 25, 25)';
    this.ctx.lineWidth = 1;

    this.ctx.fillRect(
      this.playFieldX + col * this.cellWidth,
      this.playFieldY + row * this.cellHeight,
      this.cellWidth,
      this.cellHeight
    );
    this.ctx.strokeRect(
      this.playFieldX + col * this.cellWidth,
      this.playFieldY + row * this.cellHeight,
      this.cellWidth,
      this.cellHeight
    );
  }

  renderSidePanel() {
    this.ctx.textAlign = 'start';
    this.ctx.fillStyle = 'white';
    this.ctx.font = '10px PressStart2P';

    this.ctx.fillText(
      `SCORE: ${this.score.score}`,
      this.sidePanelX,
      this.sidePanelY + 20
    );
    this.ctx.fillText(
      `LINES: ${this.game.lines}`,
      this.sidePanelX,
      this.sidePanelY + 60
    );
    this.ctx.fillText(
      `LEVEL: ${this.game.level}`,
      this.sidePanelX,
      this.sidePanelY + 100
    );
    this.ctx.fillText(`NEXT: `, this.sidePanelX, this.sidePanelY + 160);

    const nextPiece = this.piece.nextPiece;

    for (let row = 0; row < nextPiece.matrix.length; row++) {
      for (let col = 0; col < nextPiece.matrix[row].length; col++) {
        const pieceXY = nextPiece.matrix[row][col];

        if (pieceXY !== 0) {
          // pieceXY is equal to piece ID to find the piece's color in the color config
          const color = this.colorsConfig[pieceXY];

          this.ctx.fillStyle = color;
          this.ctx.strokeStyle = 'black';
          this.ctx.lineWidth = 1;

          this.ctx.fillRect(
            this.sidePanelX + col * this.cellWidth,
            this.sidePanelY + row * this.cellHeight + 220,
            this.cellWidth,
            this.cellHeight
          );
          this.ctx.strokeRect(
            this.sidePanelX + col * this.cellWidth,
            this.sidePanelY + row * this.cellHeight + 220,
            this.cellWidth,
            this.cellHeight
          );
        }
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.cvsWidth, this.cvsHeight);
  }
}

export { View };
