(() => {
    "use strict";
    const settingsConfig = {
        minLevel: 1,
        maxLevel: 5
    };
    const canvasConfig = {
        width: 500,
        height: 730,
        borderWidth: 4,
        playFieldWidth: 360,
        playFieldHeight: 720,
        rows: 30,
        columns: 15,
        bgColor: "rgb(5, 5, 5)",
        borderColor: "rgb(25, 25, 25)"
    };
    const playFieldConfig = [];
    for (let i = 0; i < canvasConfig.rows; i++) {
        const row = [];
        for (let j = 0; j < canvasConfig.columns; j++) row.push(0);
        playFieldConfig.push(row);
    }
    const scoreConfig = {
        1: 40,
        2: 100,
        3: 300,
        4: 1200
    };
    const piecesConfig = [ {
        piece: {
            matrix: [ [ 1, 1, 1 ], [ 0, 1, 0 ], [ 0, 0, 0 ] ],
            rotations: [ [ [ 1, 1, 1 ], [ 0, 1, 0 ], [ 0, 0, 0 ] ], [ [ 0, 1, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ] ], [ [ 0, 1, 0 ], [ 1, 1, 1 ], [ 0, 0, 0 ] ], [ [ 1, 0, 0 ], [ 1, 1, 0 ], [ 1, 0, 0 ] ] ],
            type: "T"
        }
    }, {
        piece: {
            matrix: [ [ 2, 2, 0 ], [ 0, 2, 2 ], [ 0, 0, 0 ] ],
            rotations: [ [ [ 2, 2, 0 ], [ 0, 2, 2 ], [ 0, 0, 0 ] ], [ [ 0, 2, 0 ], [ 2, 2, 0 ], [ 2, 0, 0 ] ], [ [ 2, 2, 0 ], [ 0, 2, 2 ], [ 0, 0, 0 ] ], [ [ 0, 2, 0 ], [ 2, 2, 0 ], [ 2, 0, 0 ] ] ],
            type: "Z"
        }
    }, {
        piece: {
            matrix: [ [ 0, 3, 3 ], [ 3, 3, 0 ], [ 0, 0, 0 ] ],
            rotations: [ [ [ 0, 3, 3 ], [ 3, 3, 0 ], [ 0, 0, 0 ] ], [ [ 3, 0, 0 ], [ 3, 3, 0 ], [ 0, 3, 0 ] ], [ [ 0, 3, 3 ], [ 3, 3, 0 ], [ 0, 0, 0 ] ], [ [ 3, 0, 0 ], [ 3, 3, 0 ], [ 0, 3, 0 ] ] ],
            type: "S"
        }
    }, {
        piece: {
            matrix: [ [ 4, 4, 4 ], [ 0, 0, 4 ], [ 0, 0, 0 ] ],
            rotations: [ [ [ 4, 4, 4 ], [ 0, 0, 4 ], [ 0, 0, 0 ] ], [ [ 0, 4, 0 ], [ 0, 4, 0 ], [ 4, 4, 0 ] ], [ [ 4, 0, 0 ], [ 4, 4, 4 ], [ 0, 0, 0 ] ], [ [ 4, 4, 0 ], [ 4, 0, 0 ], [ 4, 0, 0 ] ] ],
            type: "J"
        }
    }, {
        piece: {
            matrix: [ [ 5, 5, 5 ], [ 5, 0, 0 ], [ 0, 0, 0 ] ],
            rotations: [ [ [ 5, 5, 5 ], [ 5, 0, 0 ], [ 0, 0, 0 ] ], [ [ 5, 5, 0 ], [ 0, 5, 0 ], [ 0, 5, 0 ] ], [ [ 0, 0, 5 ], [ 5, 5, 5 ], [ 0, 0, 0 ] ], [ [ 5, 0, 0 ], [ 5, 0, 0 ], [ 5, 5, 0 ] ] ],
            type: "L"
        }
    }, {
        piece: {
            matrix: [ [ 6, 6, 6, 6 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
            rotations: [ [ [ 6, 6, 6, 6 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ], [ [ 6, 0, 0, 0 ], [ 6, 0, 0, 0 ], [ 6, 0, 0, 0 ], [ 6, 0, 0, 0 ] ], [ [ 6, 6, 6, 6 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ], [ [ 6, 0, 0, 0 ], [ 6, 0, 0, 0 ], [ 6, 0, 0, 0 ], [ 6, 0, 0, 0 ] ] ],
            type: "I"
        }
    }, {
        piece: {
            matrix: [ [ 7, 7, 0 ], [ 7, 7, 0 ], [ 0, 0, 0 ] ],
            rotations: [ [ [ 7, 7, 0 ], [ 7, 7, 0 ], [ 0, 0, 0 ] ], [ [ 7, 7, 0 ], [ 7, 7, 0 ], [ 0, 0, 0 ] ], [ [ 7, 7, 0 ], [ 7, 7, 0 ], [ 0, 0, 0 ] ], [ [ 7, 7, 0 ], [ 7, 7, 0 ], [ 0, 0, 0 ] ] ],
            type: "O"
        }
    } ];
    const colorsConfig = {
        1: "#107DC2",
        2: "#67AD19",
        3: "#E34B36",
        4: "#E2C61A",
        5: "#FF8009",
        6: "#117CC4",
        7: "#683B8E"
    };
    const fontConfig = {
        colorPrimary: "#FFFFFF",
        fontFamily: "PressStart2P",
        fontSizeSmall: "14px",
        fontSizeMedium: "18px",
        fontSizeBig: "24px"
    };
    const cloneArray = arr => arr.map((item => item.slice()));
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
                for (let j = 0; j < row.length; j++) if (!row[j]) continue rows;
                rowsToClear.unshift(i);
            }
            if (0 === rowsToClear.length) return;
            this.playing = false;
            this.showFullRows(rowsToClear);
            setTimeout((() => {
                this.clearFullRows(rowsToClear);
                this.playing = true;
            }), 500);
        }
        showFullRows(rows) {
            const columns = this.cvsConfig.columns;
            const fullRow = new Array(columns).fill(99);
            rows.forEach((row => {
                this.playFieldActive[row] = fullRow;
            }));
        }
        clearFullRows(rows) {
            const columns = this.cvsConfig.columns;
            const cleanRow = new Array(columns).fill(0);
            rows.forEach((row => {
                this.playFieldLocked.splice(row, 1);
                this.playFieldLocked.unshift(cleanRow);
            }));
            this.playFieldActive = cloneArray(this.playFieldLocked);
            const clearedRows = rows.length;
            this.lines += clearedRows;
            this.score.update(clearedRows, this.level);
            this.updateLevel();
        }
        updateLevel() {
            const newLevel = Math.ceil(.1 * this.lines);
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
    class View {
        constructor(game, piece, score, el, overlayScreen, startScreen, controlsScreen, cvsConfig, colorsConfig, fontConfig) {
            this.game = game;
            this.score = score;
            this.piece = piece;
            this.cvsConfig = cvsConfig;
            this.colorsConfig = colorsConfig;
            this.fontConfig = fontConfig;
            this.overlayScreen = overlayScreen;
            this.startScreen = startScreen;
            this.controlsScreen = controlsScreen;
            this.el = el;
            this.cvs = null;
            this.ctx = null;
            this.cvsWidth = this.cvsConfig.width;
            this.cvsHeight = this.cvsConfig.height;
            this.cellWidth = null;
            this.cellHeight = null;
            this.gap = 30;
            this.borderWidth = this.cvsConfig.borderWidth;
            this.frameX = this.borderWidth;
            this.frameY = this.borderWidth;
            this.playFieldX = this.frameX;
            this.playFieldY = this.frameY;
            this.playFieldWidth = this.cvsConfig.playFieldWidth;
            this.playFieldHeight = this.cvsConfig.playFieldHeight;
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
            const {width, height} = this.cvsConfig;
            const cvs = document.createElement("canvas");
            this.cvs = cvs;
            this.ctx = cvs.getContext("2d");
            this.cvs.width = width;
            this.cvs.height = height;
            this.el.appendChild(this.cvs);
        }
        calculateDimensions() {
            const {rows, columns} = this.cvsConfig;
            this.cellWidth = this.playFieldWidth / columns;
            this.cellHeight = this.playFieldHeight / rows;
        }
        render() {
            this.overlayScreen.classList.remove("visible");
            this.clear();
            this.renderFrame();
            this.renderPlayFieldBackground();
            this.renderSidePanel();
            const playField = this.game.playFieldActive;
            for (let row = 0; row < playField.length; row++) for (let col = 0; col < playField[row].length; col++) {
                const playFieldXY = playField[row][col];
                if (0 !== playFieldXY && 99 !== playFieldXY) this.renderPiece(row, col, playFieldXY); else if (99 === playFieldXY) this.renderFullCell(row, col);
            }
        }
        renderFrame() {
            this.ctx.strokeStyle = this.cvsConfig.borderColor;
            this.ctx.lineWidth = this.borderWidth;
            this.ctx.strokeRect(this.frameX, this.frameY, this.playFieldWidth, this.playFieldHeight);
        }
        renderPlayFieldBackground() {
            this.ctx.fillStyle = this.cvsConfig.bgColor;
            this.ctx.fillRect(this.playFieldX, this.playFieldY, this.playFieldWidth, this.playFieldHeight);
        }
        renderStartScreen() {
            this.startScreen.classList.add("visible");
            this.clear();
            const {colorPrimary, fontFamily, fontSizeBig} = this.fontConfig;
            this.ctx.beginPath();
            this.ctx.fillStyle = colorPrimary;
            this.ctx.font = `${fontSizeBig} ${fontFamily}`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText("Press ENTER to start", this.cvsWidth / 2, this.cvsHeight / 2);
            this.ctx.closePath();
        }
        renderPauseScreen() {
            this.overlayScreen.classList.add("visible");
        }
        renderGameOverScreen() {
            this.startScreen.classList.add("visible");
            this.controlsScreen.classList.remove("visible");
            this.clear();
            const {colorPrimary, fontFamily, fontSizeMedium} = this.fontConfig;
            this.ctx.fillStyle = colorPrimary;
            this.ctx.font = `${fontSizeMedium} ${fontFamily}`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText("GAME OVER", this.cvsWidth / 2, this.cvsHeight / 2);
            this.ctx.fillText(`Score: ${this.score.score}`, this.cvsWidth / 2, this.cvsHeight / 2 + 50);
            this.ctx.fillText(`Press ENTER to start a new game`, this.cvsWidth / 2, this.cvsHeight / 2 + 100);
        }
        renderFullCell(row, col) {
            this.ctx.fillStyle = "#D81C38";
            this.ctx.strokeStyle = "rgb(25, 25, 25)";
            this.ctx.lineWidth = 1;
            this.ctx.fillRect(this.playFieldX + col * this.cellWidth, this.playFieldY + row * this.cellHeight, this.cellWidth, this.cellHeight);
            this.ctx.strokeRect(this.playFieldX + col * this.cellWidth, this.playFieldY + row * this.cellHeight, this.cellWidth, this.cellHeight);
        }
        renderPiece(row, col, pieceID) {
            const color = this.colorsConfig[pieceID];
            this.ctx.fillStyle = color;
            this.ctx.strokeStyle = "rgb(25, 25, 25)";
            this.ctx.lineWidth = 1;
            this.ctx.fillRect(this.playFieldX + col * this.cellWidth, this.playFieldY + row * this.cellHeight, this.cellWidth, this.cellHeight);
            this.ctx.strokeRect(this.playFieldX + col * this.cellWidth, this.playFieldY + row * this.cellHeight, this.cellWidth, this.cellHeight);
        }
        renderSidePanel() {
            this.ctx.textAlign = "start";
            this.ctx.fillStyle = "white";
            this.ctx.font = "10px PressStart2P";
            this.ctx.fillText(`SCORE: ${this.score.score}`, this.sidePanelX, this.sidePanelY + 20);
            this.ctx.fillText(`LINES: ${this.game.lines}`, this.sidePanelX, this.sidePanelY + 60);
            this.ctx.fillText(`LEVEL: ${this.game.level}`, this.sidePanelX, this.sidePanelY + 100);
            this.ctx.fillText(`NEXT: `, this.sidePanelX, this.sidePanelY + 160);
            const nextPiece = this.piece.nextPiece;
            for (let row = 0; row < nextPiece.matrix.length; row++) for (let col = 0; col < nextPiece.matrix[row].length; col++) {
                const pieceXY = nextPiece.matrix[row][col];
                if (0 !== pieceXY) {
                    const color = this.colorsConfig[pieceXY];
                    this.ctx.fillStyle = color;
                    this.ctx.strokeStyle = "black";
                    this.ctx.lineWidth = 1;
                    this.ctx.fillRect(this.sidePanelX + col * this.cellWidth, this.sidePanelY + row * this.cellHeight + 220, this.cellWidth, this.cellHeight);
                    this.ctx.strokeRect(this.sidePanelX + col * this.cellWidth, this.sidePanelY + row * this.cellHeight + 220, this.cellWidth, this.cellHeight);
                }
            }
        }
        clear() {
            this.ctx.clearRect(0, 0, this.cvsWidth, this.cvsHeight);
        }
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
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
            return JSON.parse(JSON.stringify(randomPiece));
        }
        positionCurrentPiece() {
            const pieceWidth = this.currentPiece.matrix[0].length;
            const offsetX = Math.floor(this.cvsConfig.columns / 2) - Math.floor(pieceWidth / 2);
            this.x = offsetX;
            if (this.checkForCollision(this.currentPiece.matrix, this.y + 1, this.x)) this.game.endGame();
        }
        reset() {
            this.y = -1;
            this.rotation = 0;
        }
        moveRight() {
            this.x += 1;
            if (this.checkForCollision()) this.x -= 1;
            this.updatePosition();
        }
        moveLeft() {
            this.x -= 1;
            if (this.checkForCollision()) this.x += 1;
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
            if (this.rotation === this.currentPiece.rotations.length - 1) newRotation = 0; else newRotation += 1;
            newMatrix = this.currentPiece.rotations[newRotation];
            if (this.checkForCollision(newMatrix)) return;
            this.rotation = newRotation;
            this.updateMatrix();
            this.updatePosition();
        }
        updateMatrix() {
            this.currentPiece.matrix = this.currentPiece.rotations[this.rotation];
        }
        checkForCollision(matrix = this.currentPiece.matrix, posY = this.y, posX = this.x) {
            for (let row = 0; row < matrix.length; row++) for (let col = 0; col < matrix[row].length; col++) {
                const pieceXY = matrix[row][col];
                if (!pieceXY) continue;
                const playFieldY = this.game.playFieldLocked[posY + row];
                if (pieceXY && void 0 === playFieldY) return true;
                const playFieldXY = this.game.playFieldLocked[posY + row][posX + col];
                if (pieceXY && (void 0 === playFieldXY || 0 !== playFieldXY)) return true;
            }
            return false;
        }
        updatePosition() {
            const playField = cloneArray(this.game.playFieldLocked);
            const matrix = this.currentPiece.matrix;
            for (let row = 0; row < matrix.length; row++) for (let col = 0; col < matrix[row].length; col++) {
                const pieceXY = matrix[row][col];
                if (pieceXY) playField[this.y + row][this.x + col] = pieceXY;
            }
            this.game.playFieldActive = playField;
            return playField;
        }
        lock() {
            const matrix = this.currentPiece.matrix;
            for (let row = 0; row < matrix.length; row++) for (let col = 0; col < matrix[row].length; col++) {
                const pieceXY = matrix[row][col];
                if (pieceXY) this.game.playFieldLocked[this.y + row][this.x + col] = pieceXY;
            }
            this.reset();
            this.currentPiece = JSON.parse(JSON.stringify(this.nextPiece));
            this.positionCurrentPiece();
            this.nextPiece = this.create();
        }
    }
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
            document.addEventListener("keydown", (e => {
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
            }));
            btnLeft.addEventListener("touchstart", (() => this.piece.moveLeft()));
            btnRight.addEventListener("touchstart", (() => this.piece.moveRight()));
            btnRotate.addEventListener("touchstart", (() => this.piece.rotate()));
            startScreen.addEventListener("touchstart", (() => {
                startScreen.classList.remove("visible");
                controlsScreen.classList.add("visible");
                this.play();
            }));
        }
        touchStart(event) {
            event = event || window.event;
            event.preventDefault();
            this.x1 = event.touches[0].clientX;
            this.y1 = event.touches[0].clientY;
        }
        touchEnd(event) {
            if (null === this.x1 || null === this.y1) return;
            if (!this.game.playing) return;
            event = event || window.event;
            event.preventDefault();
            this.x2 = event.touches[0].clientX;
            this.y2 = event.touches[0].clientY;
            if (this.difference(this.x1, this.x2) > this.difference(this.y1, this.y2)) if (this.x2 - this.x1 > 0) this.piece.moveRight(); else this.piece.moveLeft(); else if (this.difference(this.x1, this.x2) < this.difference(this.y1, this.y2)) if (this.y2 - this.y1 < 0) this.piece.rotate(); else this.piece.moveDown();
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
            if (!this.game.playing && !this.game.isGameOver) {
                this.timer.start();
                return;
            }
            if (!this.game.playing && this.game.isGameOver) {
                this.game.reset();
                this.piece.init();
                this.timer.start();
                return;
            }
        }
    }
    class Timer {
        constructor(game, view, piece) {
            this.game = game;
            this.view = view;
            this.piece = piece;
            this.timer = null;
        }
        start() {
            const speed = 1100 - 100 * this.game.level;
            this.view.render();
            this.game.playing = true;
            this.timer = setInterval((() => this.play()), speed);
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
    const initApp = () => {
        const score = new Score(scoreConfig);
        const game = new Game(settingsConfig, playFieldConfig, canvasConfig, score);
        const piece = new Piece(game, piecesConfig, canvasConfig);
        piece.init();
        const view = new View(game, piece, score, document.querySelector(".app__game"), document.querySelector(".overlay-screen"), document.querySelector(".start-screen"), document.querySelector(".controls-screen"), canvasConfig, colorsConfig, fontConfig);
        view.init();
        const timer = new Timer(game, view, piece);
        const controller = new Controller(game, piece, view, timer);
        controller.init();
    };
    const toggleLoader = () => {
        const loader = document.querySelector(".loader");
        if (!loader) return;
        loader.classList.add("loader--inactive");
    };
    window.addEventListener("DOMContentLoaded", (() => {
        setTimeout((() => {
            toggleLoader();
            initApp();
        }), 3e3);
    }));
    window["FLS"] = true;
})();