class Snake {

  constructor(params) {
    if (!params.lineBox || params.lineBox <= 0)
      params.lineBox = 10;

    if (!params.sizeBox || params.sizeBox <= 0)
      params.sizeBox = 20;

    this.board = document.querySelector(".board");
    this.cell = [];
    this.sizeBox = params.sizeBox;
    this.lineBox = params.lineBox;
    this.totalLines = params.lineBox * params.lineBox;
    this.snake = [2, 1, 0];
    this.interval = 0;
    this.intervalTime = 1000;
    this.direction = 1;//направление движения
    this.speed = 0.5;

    this.init();
  }

  init() {
    this.createBoard();
    this.addApple();
    this.startGame();
    
    document.addEventListener("keydown", this.control.bind(this));
  }

  control(e) {
    e = e || window.event;

    switch (e.key) {
      case "ArrowLeft":
          this.direction = -1;
          break;
      case "ArrowRight":
          this.direction = 1;
          break;
      case "ArrowUp":
          this.direction = -this.lineBox
          break;
      case "ArrowDown":
          this.direction = +this.lineBox;
          break;
    }
  }

  //прорисовка доски для игры
  createBoard() {
    this.board.style.width = (this.lineBox * this.sizeBox) + 'px';
    this.board.style.height = (this.lineBox * this.sizeBox) + 'px';

    for (let i = 0; i < this.totalLines; i++) {
      let div = document.createElement("div");
      this.board.appendChild(div);
    }
    this.cell = document.querySelectorAll(".board div");
  }

  //рисуем яблоко
  addApple() {
    let appleIndex = 0;

    do {
      appleIndex = Math.floor(Math.random() * this.cell.length);
    } while (this.cell[appleIndex].classList.contains("snake"));
    
    this.cell[appleIndex].classList.add("apple");
  }

  startGame() {
    this.snake.forEach((index) => this.cell[index].classList.add("snake"));
    this.interval = setInterval(this.checkEndGame.bind(this), this.intervalTime);
  }

  //завершена ли игра
  checkEndGame() {
    if (
      (this.snake[0] + this.lineBox >= this.lineBox * this.lineBox && this.direction === this.lineBox) ||
      (this.snake[0] % this.lineBox === this.lineBox - 1 && this.direction === 1) ||
      (this.snake[0] % this.lineBox === 0 && this.direction === -1) ||
      (this.snake[0] - this.lineBox <= 0 && this.direction === -this.lineBox) ||
      this.cell[this.snake[0] + this.direction].classList.contains("snake")
    ) {
      alert("Game over.");
      return clearInterval(this.interval);
    }
    
    this.moveSnake();
  }

  //движение гусеницы
  moveSnake() {
    //удаляем хвост змеи
    let tail = this.snake.pop();
    this.cell[tail].classList.remove("snake");

    //добавление в начало змеи голову
    this.snake.unshift(this.snake[0] + this.direction);
    this.cell[this.snake[0]].classList.add("snake");
    
    this.eatApple(tail);
  }

  eatApple(tail) {
    if (this.cell[this.snake[0]].classList.contains("apple")) {
      this.cell[this.snake[0]].classList.remove("apple");
      this.cell[tail].classList.add("snake");
      this.snake.push(tail);

      this.addApple();
      
      //score++;
      //scoreDisplay.textContent = score;

      //увеличение времени
      clearInterval(this.interval);
      this.intervalTime = this.intervalTime * this.speed;
      this.interval = setInterval(this.checkEndGame.bind(this), this.intervalTime);
    }
  }

}

new Snake({
  lineBox: 10,//кол-во клеток в ряду
  sizeBox: 20,//размер ячейки 20px
});