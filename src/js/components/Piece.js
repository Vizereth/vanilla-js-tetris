import { getRandomInt } from '../services/getRandomInt.js';
import { cloneArray } from '../services/cloneArray.js';

class Piece {
  constructor(game, piecesConfig, cvsConfig) {
    this.game = game;
    
    this.piecesConfig = piecesConfig;
    this.cvsConfig = cvsConfig;

    this.currentPiece = null;
    this.nextPiece = null;

    this.x = 0;
    this.y = -1;
    this.rotation = 0;

  }

  init() {
    this.reset();
    this.currentPiece = this.create();
    this.nextPiece = this.create();
    this.positionCurrentPiece();
  }

  create() {
    const min = 0;
    const max = this.piecesConfig.length - 1;
    const randomNumber = getRandomInt(min, max);

    const randomPiece = this.piecesConfig[randomNumber].piece;

    return randomPiece;
  }

  positionCurrentPiece() {
    const pieceWidth = this.currentPiece.matrix[0].length;
    const offsetX =
      Math.floor(this.cvsConfig.columns / 2) - Math.floor(pieceWidth / 2);

    this.x = offsetX;

    if (this.checkForCollision(this.currentPiece.matrix, this.y + 1, this.x)) {
      this.game.endGame();
    }
  }

  reset() {
    this.y = -1;
    this.rotation = 0;
  }

  moveRight() {
    this.x += 1;

    if (this.checkForCollision()) {
      this.x -= 1;
    }
    this.updatePosition();
  }

  moveLeft() {
    this.x -= 1;

    if (this.checkForCollision()) {
      this.x += 1;
    }

    this.updatePosition();
  }

  moveDown() {
    this.y += 1;

    if (this.checkForCollision()) {
      this.y -= 1;
      this.lock();
      this.game.checkForFullRows();

      return;
    }

    this.updatePosition();
  }

  rotate() {
    let newRotation = this.rotation;
    let newMatrix;

    if (this.rotation === this.currentPiece.rotations.length - 1) {
      newRotation = 0;
    } else {
      newRotation += 1;
    }

    newMatrix = this.currentPiece.rotations[newRotation];

    if (this.checkForCollision(newMatrix)) {
      return;
    }

    this.rotation = newRotation;
    this.updateMatrix();
    this.updatePosition();
  }

  updateMatrix() {
    this.currentPiece.matrix = this.currentPiece.rotations[this.rotation];
  }

  checkForCollision(matrix = this.currentPiece.matrix, posY = this.y, posX = this.x) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const pieceXY = matrix[row][col];

        if (!pieceXY) continue;

        const playFieldY = this.game.playFieldLocked[posY + row];

        if (pieceXY && playFieldY === undefined) {
          return true;
        }

        const playFieldXY =
          this.game.playFieldLocked[posY + row][posX + col];

        if (pieceXY && (playFieldXY === undefined || playFieldXY !== 0)) {
          return true;
        }
      }
    }

    return false;
  }

  updatePosition() {
    const playField = cloneArray(this.game.playFieldLocked);
    const matrix = this.currentPiece.matrix;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const pieceXY = matrix[row][col];

        if (pieceXY) {
          playField[this.y + row][this.x + col] = pieceXY;
        }
      }
    }

    this.game.playFieldActive = playField;

    return playField;
  }

  lock() {
    const matrix = this.currentPiece.matrix;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const pieceXY = matrix[row][col];

        if (pieceXY) {
          this.game.playFieldLocked[this.y + row][this.x + col] = pieceXY;
        }
      }
    }

    this.reset();
    this.currentPiece = this.nextPiece;
    this.positionCurrentPiece();
    this.nextPiece = this.create();
  }
}

export { Piece };
