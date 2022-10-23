"use strict"

class PacMan {
  #skippedPositions
  #startPosition
  constructor(height, width, countdown = 3, symbol = '☺︎'){
    this.height = Number(height);
    this.width = Number(width);
    this.countdown = Number(countdown);
    this.points = 0;
    this.#skippedPositions = [];
    this.#startPosition = this.randomStartPosition();
    this.symbol = symbol;
  }

  
  randomStartPosition(){
    let randomHeight = Math.floor(Math.random() * this.height)
    let randomWidth = Math.floor(Math.random() * this.width)
    return [randomHeight, randomWidth]
  }

  validation(){
    let condition = true
    if(this.height < 3){
      console.log(`Input Height minimum 3!`)
      condition = false
    }
    if(this.width < 3){
      console.log(`Input Width minimum 3!`)
      condition = false
    }
    if(this.countdown <= 0){
      console.log(`Input countdown do not accept zero or minus!`)
      condition = false
    }
    return condition
  }

  countdownGame(){
    let length = this.height * this.width
    let countdown = this.countdown

    while(countdown !== -1){
      let boardCountdown = ''
      for (let i = 0; i < length; i++) {
        if( (i + 1) % this.width === 0){
          boardCountdown += countdown + '\n'
        }else{
          boardCountdown += countdown + ' '
        }
      }
      console.log(`COUNTDOWN: ${countdown}`)
      console.log(boardCountdown)
      this.sleep()
      this.clearScreen()
      countdown--
    }
  }

  generateBoard(){
    let length = this.height * this.width
    let food = 'o'
    let board = [];
    let temp = []
    for (let i = 0; i < length; i++) {
      temp.push(food)
      if(this.width === temp.length){
        board.push(temp)
        temp = []
      }
    }
    return board
  }

  skipPosition(){
    let randomPosition = this.startPosition
    let condition = true
    for (let i = 0; i < this.height; i++) {
      if(!condition) break;
      for (let j = 0; j < this.width; j++) {
        if(`${randomPosition[0]}${randomPosition[1]}` !== `${i}${j}`){
          this.skippedPositions.push([i, j])
        }else{
          condition = false
          break;
        }
      }
    }
  }

  get skippedPositions(){
    return this.#skippedPositions
  }

  set skippedPositions(arr){
    this.#skippedPositions = arr
  }

  get startPosition(){
    return this.#startPosition
  }

  set startPosition(arr){
    this.#startPosition = arr
  }

  play(){
    if(!this.validation())return 'Invalid Input';
    this.countdownGame();
    this.skipPosition();
    let boardSize = `PLAY BOARD SIZE ${this.height} x ${this.width}`;
    let Position = `Start in position i: ${this.#startPosition[0]}; j: ${this.#startPosition[1]}`;
    let points = this.points;
    let symbol = this.symbol;
    let board = '';
    let generatedBoard = this.generateBoard();
    console.log(boardSize);
    console.log(Position);
    console.log(`Your point now : ${points}`);
    generatedBoard.forEach(function(el, i, arr){  
      board += el.join(' ');
      if(i !== arr.length - 1){
        board += '\n';
      }
    })
    console.log(board);
    board = '';
    this.sleep();
    this.clearScreen();
    
    for (let i = this.#startPosition[0]; i < generatedBoard.length; i++) {
      let j = this.#startPosition[1];
      if(i > this.#startPosition[0]) j = 0;
      for (j; j < generatedBoard[i].length; j++) {
        if(generatedBoard[i][j]){
          generatedBoard[i][j] = symbol;
          points += 1;
        }
        if(generatedBoard[i][j - 1] === symbol){
          generatedBoard[i][j - 1] = '.';
        }
        generatedBoard.forEach(function(el, i, arr){  
          board += el.join(' ');
          if(i !== arr.length - 1){
            board += '\n';
          }
        });
        console.log(boardSize);
        console.log(Position);
        console.log(`Your point now : ${points}`);
        console.log(board);
        this.sleep();
        if((i+1) * (j+1) !== this.height * this.width){
        this.clearScreen();
        board = '';
        }else{
          console.log(`FINISH\n\nPosisi yang di lompati :`);
          console.log(this.#skippedPositions);
        }
      }
      generatedBoard[i][generatedBoard[i].length - 1] = '.'
    }
  }

  sleep(milliseconds){
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  clearScreen () {
    console.clear();
  }
}

module.exports = PacMan

// let argv = process.argv.slice(2)
// node index.js [height] [width] [countdown - optional]
// const game = new PacMan(argv[0], argv[1], argv[2])  // isi parameter sesuai kebutuhan
// game.play()


// const example2 = new PacMan(3, 3, 4)
// example2.play()


