'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

//the lowest component of the grid, click to add symbol
var Button = React.createClass({
    _handleClick: function() {
        this.props.controller.handleClick(this.props.id, this.props.model);
    },

    render: function() {
        return (<td><button id ={this.props.id} onClick = {this._handleClick}>{this.props.model.symbolOfId(this.props.id)}</button></td>);
    }

});

//the row of the grid, the number of button in a row depends on the size property
var Row = React.createClass({
    _Buttons: function() {
        var buttons = [];
        for (var i = 0; i < this.props.size; i++){
            buttons.push(<Button key={i} id = {this.props.row_number * this.props.size + i} controller = {this.props.controller} model = {this.props.model}/>)
        }
        return buttons;
    },

    render: function() {
        return (<tr>{this._Buttons()}</tr>);
    }

});

//the grid board to play the game, composed of rows
var Grid = React.createClass({
    _Rows: function() {
        var rows = [];
        for(var i = 0; i < this.props.size; i++){
            rows.push(<Row key={i} row_number = {i} size = {this.props.size} controller = {this.props.controller} model = {this.props.model}/>);
        }
        return rows;
    },

    render: function() {
        return (
            <table>
                <tbody>
                {this._Rows()}
                </tbody>
            </table>);
    }
});

//the component to show player scores
var Player = React.createClass({

    render: function() {
        return <h1>{this.props.model.symbolOfPlayer(this.props.number)} : {this.props.model.palyerRecord(this.props.number)}</h1>
    }
});

//the component to show the number of ties
var Tie = React.createClass({
    render: function() {
        return <h1>Tie : {this.props.model.tieNumber()} </h1>
    }
});

//compoent of the new game area which shows up after a game ending.
//it has a heading to show winner or tie, a input to change board size and a button to start a new game
//if there is no game ending yet, show whose turn it is right now
var NewGame = React.createClass({
    _handleClick : function () {
        this.props.controller.newGame(this.props.model);
    },

    _sizeChange: function(event) {
        this.props.controller.changeSize(this.props.model, event);
    },

    render:function() {
        if(this.props.model.hasEnd()) {
            return (<div>
                <h2>{this.props.model.winnerIs()}</h2>
                <p>Change size(3-5): <input type = "number"  onChange = {this._sizeChange} min = "3" max = "5"/></p>
                <button onClick = {this._handleClick}>New Game</button>

            </div>)
        } else {
            return (<p>It's  {this.props.model.currentPlayer()}'s  turn</p>);
        }
    }
});

//contains all the components on the web
var Container = React.createClass({
    render: function() {
        return (
            <div>
                <Player number = {0} model = {this.props.model}/>
                <Player number = {1} model = {this.props.model}/>
                <Tie model = {this.props.model}/>
                <Grid size = {this.props.model.getSize()} controller = {this.props.controller} model = {this.props.model}/>
                <NewGame controller = {this.props.controller} model = {this.props.model}/>
            </div>
        );
    }
});


module.exports = Container;


