"use strict";


let PacMan = require("./index");



class PacManAdvance extends PacMan {
  constructor(height, width, name) {
    super(height, width, 5, "☻");
    this.playedBy = name;
    this.zonkPoints = 0;
  }

  validation() {
    let condition = true;

    if (this.height % 2 !== 0 || this.width % 2 !== 0) {
      console.log(`Input harus angka genap yang sama!`);
      condition = false;
      return condition;
    }
    if (this.height !== this.width) {
      console.log(`Angka genap tidak sama!`);
      condition = false;
      return condition;
    }
    return condition;
  }

  generateBoard() {
    let length = this.height * this.width;
    let food = "o";
    let board = [];
    let temp = [];
    let row = 0;
    let col = 0;
    for (let i = 1; i <= length; i++) {
      col++;
      if (row === this.height / 2 || row === this.height / 2 - 1) {
        if (col === this.width / 2 || col === this.width / 2 + 1) {
          temp.push(".");
        } else {
          temp.push(food);
        }
      } else {
        temp.push(food);
      }
      if (this.width === temp.length) {
        board.push(temp);
        temp = [];
        col = 0;
        row++;
      }
    }
    return board;
  }

  play() {
    if (!this.validation()) return `Invalid Input`;
    this.countdownGame();
    this.skipPosition();
    let boardSize = `PLAY BOARD SIZE ${this.height} x ${this.width}`;
    let Position = `Start in position i: ${this.startPosition[0]}; j: ${this.startPosition[1]}`;
    let points = this.points;
    let symbol = this.symbol;
    let board = "";
    let zonkScore = this.zonkPoints;
    let generatedBoard = this.generateBoard();
    let player = `Dimainkan oleh ${this.playedBy}`;
    console.log(boardSize);
    console.log(Position);
    console.log(`Your point now : ${points}`);
    console.log(`Your zonk point now : ${zonkScore}`);
    generatedBoard.forEach(function (el, i, arr) {
      board += el.join(" ");
      if (i !== arr.length - 1) {
        board += "\n";
      }
    });
    console.log(board);
    board = "";
    this.sleep();
    this.clearScreen();

    for (let i = this.startPosition[0]; i < generatedBoard.length; i++) {
      let j = this.startPosition[1];
      if (i > this.startPosition[0]) j = 0;
      for (j; j < generatedBoard[i].length; j++) {
        if (generatedBoard[i][j] == "o") {
          generatedBoard[i][j] = symbol;
          points++;
        } else {
          generatedBoard[i][j] = symbol;
          zonkScore++;
        }
        if (generatedBoard[i][j - 1] === symbol) {
          generatedBoard[i][j - 1] = ".";
        }
        generatedBoard.forEach(function (el, i, arr) {
          board += el.join(" ");
          if (i !== arr.length - 1) {
            board += "\n";
          }
        });
        console.log(boardSize);
        console.log(Position);
        console.log(`Your point now : ${points}`);
        console.log(`Your zonk point now : ${zonkScore}`);
        console.log(board);
        this.sleep();
        if ((i + 1) * (j + 1) !== this.height * this.width) {
          this.clearScreen();
          board = "";
        } else {
          console.log(`FINISH\n\nPosisi yang di lompati :`);
          console.log(this.skippedPositions);
          console.log(player);
        }
      }
      generatedBoard[i][generatedBoard[i].length - 1] = ".";
    }
  }
}

// TEST CASE PacMan Part 2
const pacManAdvance = new PacManAdvance(4, 4, "slimey"); // isi parameter sesuai kebutuhan
pacManAdvance.play();
pacManAdvance.generateBoard()
// console.log(pacManAdvance.startPosition);
// console.log(pacManAdvance.skippedPositions);

// let argv = process.argv.slice(2)
// const game1 = new PacManAdvance(argv[0], argv[1], argv[2])
// game1.play()
