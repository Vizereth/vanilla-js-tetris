class Score {
  constructor(scoreConfig) {
    this.score = 0;
    this.scoreConfig = scoreConfig;
  }

  update(lines, level) {
    const scoreToAdd = this.scoreConfig[lines] * level;
    this.score += scoreToAdd;
  }

  reset() {
    this.score = 0;
  }
}

export { Score };
