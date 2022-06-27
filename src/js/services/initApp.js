import { settingsConfig } from '../configs/gameSettings.js';
import { playFieldConfig } from '../configs/playFieldConfig.js';
import { canvasConfig } from '../configs/canvasConfig.js';
import { scoreConfig } from '../configs/scoreConfig.js';
import { piecesConfig } from '../configs/piecesConfig.js';
import { colorsConfig } from '../configs/colorsConfig.js';
import { fontConfig } from '../configs/fontConfig.js';

import { Game } from '../components/Game.js';
import { View } from '../components/View.js';
import { Piece } from '../components/Piece.js';
import { Score } from '../components/Score.js';
import { Controller } from '../components/Controller.js';
import { Timer } from '../components/Timer.js';

const initApp = () => {
  const score = new Score(scoreConfig);
  const game = new Game(settingsConfig, playFieldConfig, canvasConfig, score);

  const piece = new Piece(game, piecesConfig, canvasConfig);
  piece.init();

  const view = new View(
    game,
    piece,
    score,
    document.querySelector('.app__game'),
    canvasConfig,
    colorsConfig,
    fontConfig
  );
  view.init();

  const timer = new Timer(game, view, piece);

  const controller = new Controller(game, piece, view, timer);
  controller.init();
};

export { initApp };
