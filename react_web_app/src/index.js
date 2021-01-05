import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SketchPicker } from 'react-color';
import { Subscribe } from 'mqtt-react';


function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={{background:props.value}} >
    </button>
  );
}

class ColourPicker extends React.Component {
  state = {
    background: '#fff',
  };

  handleChange = (color) => {
    this.setState({ background: color.hex });
  };



  render() {
    return (
      <SketchPicker
        color={this.state.background }
        onChange={ this.handleChange }
        onChangeComplete={ this.props.handleChangeComplete }
      />
    );
  }

}

class Board extends React.Component {

  renderSquare = (i) => {
    return (
      <Square

        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow = (row,n_cols) => {
    var indices = range(row*n_cols, (row+1)*n_cols);

    return (
      <div className="board-row">
        {indices.map(this.renderSquare)}
      </div>
    )
  }

  renderRows(n_rows, n_cols){
    var row_indices = range(0, n_rows);
    let rr = this.renderRow;
    return row_indices.map(
      function(row) {return rr(row, n_cols)}
    );

  }

  render() {

    let n_rows = this.props.n_rows;
    let n_cols = this.props.n_cols;
    return (
      this.renderRows(n_rows, n_cols)


      /*
      <div>
        <div className="board-row">
          {this.renderRow(0,10)}
        </div>
        <div className="board-row">
          {this.renderRow(0,10)}
        </div>
        <div className="board-row">
          {this.renderRow(0,10)}
        </div>
      </div>
      */
    );
  }
}





class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n_rows: 6,
      n_cols: 9,
      colour: "#fff",
      history: [{
        squares: Array(16*16).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
    this.connect();
    console.log("connected");

  }

  handleColourChange = (colour) =>{
    this.setState({
      colour: colour.hex
    });
  }

  connect() {

    var mqtt    = require('mqtt');
    var options = {
        protocol: 'mqtts',
        // clientId uniquely identifies client
        // choose any string you wish
        clientId: 'web_app'
    };
    var client  = mqtt.connect("mqtt://test.mosquitto.org",{clientId:"mqttjs01"});
    client.on("connect",function(){

    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.colour;

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });

    //send i and colour to mqtt server

  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) == 0,
    });
  }

  change_n_rows = (event) => {
    this.setState({
      n_rows: parseInt(event.target.value) ? parseInt(event.target.value) : 1
      /*
      history: [{
        squares: Array(this.n_cols*parseInt(event.target.value)).fill(null),
      }]
      */
    });
  }

  change_n_cols = (event) => {
    this.setState({
      n_cols: parseInt(event.target.value) ? parseInt(event.target.value) : 1
      /*
      history: [{
        squares: Array(this.n_rows*event.target.value).fill(null),
      }]
      */
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            n_rows={this.state.n_rows}
            n_cols={this.state.n_cols}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div>
          <ColourPicker
            handleChangeComplete={this.handleColourChange}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <div>
            Number of rows:
            <input
              type="number"
              onChange={this.change_n_rows}
              />
          </div>
          <div>
            Number of cols:
            <input
              type="number"
              onChange={this.change_n_cols}
              />
          </div>
        </div>

      </div>

    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
