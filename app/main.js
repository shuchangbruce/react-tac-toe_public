'use strict';
var ReactDOM = require('react-dom');
var React = require('react');
var Component = require("./components.js");

//the controller in MVC, links model and view
class Controller {
    //when the button on the grid is clicked, addsymbol if it's emty
    handleClick(id, model) {
        model.addSymbol(id);
        ReactDOM.render(<Component size = {model.getSize()} controller = {this} model = {model}/>, document.getElementById('content'));
    }
    //when the new game button is click.
    newGame(model) {
        model.clean();
        ReactDOM.render(<Component size = {model.getSize()} controller = {this} model = {model}/>, document.getElementById('content'));
    }
    //change the size of the game board
    changeSize(model, event) {
        model.changeSize(event.target.value);
        ReactDOM.render(<Component size = {model.getSize()} controller = {this} model = {model}/>, document.getElementById('content'));
    }
}

//the model in MVC, records of data
class Model {
    constructor(size, symbol) {
        this._size = size;
        this._boxes = this.makeBoxes(this._size); //records symbol on each box
        this._winRecord = [0,0];
        this._round = 0;
        this._symbol = symbol;
        this._current = this._symbol[0];
        this._currentMove = 0;
        this._result = undefined;
    }

    //if the box is empty, add a symbol
    addSymbol(id) {
        if(this._boxes[id] == undefined && this._result == undefined) {
            this._boxes[id] = this._current;
            this._currentMove++;
            this.checkEnding(id, this._current);
            this._current = this._symbol[Math.abs(this._symbol.indexOf(this._current) - 1)];
        }
    }

    //returns a array of records of symbols. The array index is the box id.
    makeBoxes(size) {
        var result = [];
        for(var i = 0; i < size * size; i++) {
            result.push(undefined);
        }
        return result;
    }

    //check if there is the end of the game
    //returns winner symbol or tie if it is the end
    //returns undefined if it's not the end yet
    checkEnding(id, symbol) {
        var row = Math.floor(id / this._size);
        var column = id % this._size;
        var result;
        //check row
        for(var i = 0; i < this._size; i++) {
            if(this._boxes[row * this._size + i] != symbol) {
                break;
            }
            if(i == this._size - 1) {
                result =  symbol;
            }
        }
        //check column
        for(var i = 0; i < this._size; i++) {
            if(this._boxes[column + i * this._size] != symbol) {
                break;
            }
            if(i == this._size - 1) {
                result = symbol;
            }
        }
        //check diag
        for(var i = 0; i < this._size; i++) {
            if(this._boxes[i + i * (this._size)] != symbol) {
                break;
            }
            if(i == this._size - 1) {
                result = symbol;
            }
        }
        //check inverse diag
        for(var i = 0; i < this._size; i++) {
            if(this._boxes[(this._size + this._size * i  - i - 1)] != symbol) {
                break;
            }
            if(i == this._size - 1) {
                result = symbol;
            }
        }

        if(this._currentMove == this._size * this._size && result == undefined) {
            result = "tie";
        }
        if(result != undefined) {
            if(result != "tie") {
                this._winRecord[this._symbol.indexOf(result)]++;
            }
            this._round++;
            this._result = result;
        }
    }

    //returns the symbol on the given box id
    symbolOfId(id) {
        return this._boxes[id];
    }

    //returns the symbol of the play by player number
    symbolOfPlayer(playerNumber) {
        return this._symbol[playerNumber];
    }

    //return how many wins of the player
    palyerRecord(playerNumber) {
        return this._winRecord[playerNumber];
    }

    //returns the number of ties
    tieNumber() {
        return this._round - this._winRecord[0] - this._winRecord[1];
    }

    //check if the game has an ending
    hasEnd() {
        return this._result != undefined;
    }

    //returns the result of the game.
    winnerIs() {
        if(this._result == "tie") {
            return "It's a tie."
        } else {
            return "Winner is " + this._result;
        }
    }

    //returns the current player
    currentPlayer() {
        return this._current;
    }

    getSize() {
        return this._size;
    }

    changeSize(size) {
        this._size = size;
    }

    //reset the board for a new game
    clean() {
        this._boxes = this.makeBoxes(this._size);
        this._currentMove = 0;
        this._result = undefined;

    }

}

var game = new Model(3, ["X", "O"]);
var myController = new Controller();

ReactDOM.render(<Component controller = {myController} model = {game}/>, document.getElementById('content'));