import { cloneArray } from '../services/cloneArray.js';

class Game {
  constructor(settingsConfig, playFieldConfig, cvsConfig, score) {
    this.settings = settingsConfig;
    this.cvsConfig = cvsConfig;

    this.score = score;
    this.playing = false;
    this.isGameOver = false;

    this.lines = 0;
    this.level = this.settings.minLevel;

    this.playFieldClean = cloneArray(playFieldConfig);
    this.playFieldActive = cloneArray(playFieldConfig);
    this.playFieldLocked = cloneArray(playFieldConfig);
  }

  checkForFullRows() {
    const rows = this.cvsConfig.rows;
    const rowsToClear = [];

    rows: for (let i = rows - 1; i >= 0; i--) {
      const row = this.playFieldLocked[i];

      for (let j = 0; j < row.length; j++) {
        if (!row[j]) {
          continue rows;
        }
      }

      rowsToClear.unshift(i);
    }

    if (rowsToClear.length === 0) return;

    this.playing = false;
    this.showFullRows(rowsToClear);

    setTimeout(() => {
      this.clearFullRows(rowsToClear);
      this.playing = true;
    }, 500);
  }

  showFullRows(rows) {
    const columns = this.cvsConfig.columns;
    const fullRow = new Array(columns).fill(99);

    rows.forEach((row) => {
      this.playFieldActive[row] = fullRow;
    })
  }

  clearFullRows(rows) {
    const columns = this.cvsConfig.columns;
    const cleanRow = new Array(columns).fill(0);

    rows.forEach((row) => {
      this.playFieldLocked.splice(row, 1);
      this.playFieldLocked.unshift(cleanRow);
    });

    this.playFieldActive = cloneArray(this.playFieldLocked);

    const clearedRows = rows.length;

    this.lines += clearedRows;
    this.score.update(clearedRows, this.level);
    this.updateLevel();
  }

  updateLevel() {
    const newLevel = Math.ceil(this.lines * 0.1);

    if (newLevel > this.settings.maxLevel) return;

    this.level = this.level > newLevel ? this.level : newLevel;
  }

  endGame() {
    this.isGameOver = true;
    this.playing = false;
  }

  reset() {
    this.score.reset();
    this.lines = 0;
    this.level = this.settings.minLevel;
    this.playFieldActive = cloneArray(this.playFieldClean);
    this.playFieldLocked = cloneArray(this.playFieldClean);
    this.isGameOver = false;
  }
}

export { Game };
