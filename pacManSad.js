"use strict";

let PacMan = require("./index");



class PacManSad extends PacMan {
  constructor(height, width) {
    super(height, width, 4, "☹︎");
  }

  validation() {
    let condition = true;
    if (this.width < 3 || this.height < 3) {
      console.log(`Input Height & Weight minimum 3!`);
      condition = false;
    }
    if (this.width % 2 === 0 || this.height % 2 === 0) {
      console.log(`Input must odd!`);
      condition = false;
    }
    return condition;
  }
}


const game3 = new PacManSad(3, 3); // isi parameter sesuai kebutuhan
game3.play();
// console.log(game3.startPosition);
// console.log(game3.skippedPositions);

// let argv = process.argv.slice(2);
// const game1 = new PacManSad(argv[0], argv[1]);
// game1.play();
