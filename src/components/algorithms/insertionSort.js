import React, { Component } from "react";
import _ from "lodash";

/**
 * Insertion Sort class.
 * @class
 */
class insertionSort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rectangles: this.props.rectangles,
      i: 1,
      j: 1,
      setJ: false,
      length: this.props.rectangles.length,
      completed: 0
    };
  }

  /**
   * prevents memory leak
   */
  _isMounted = false;

  /**
   * triggers componentDidUpdate
   * and sets initial state
   */
  componentDidMount() {
    this._isMounted = true;
    let array = [...this.state.rectangles];
    array[0] = {
      ...array[0],
      color: "green"
    };
    this.setState({ completed: 1, rectangles: array });
  }

  /**
   * call selectionSort animation function every unit speed of time
   */
  componentDidUpdate(prevProps, prevState) {
    this._isMounted = true;
    _.delay(this.insertionSort.bind(this), this.props.speed);
  }

  /**
   * unmount component and prevent further state updating
   */
  componentWillUnmount() {
    this._isMounted = false;
  }
  /**
   * insertionSort algorithm and animation
   */
  insertionSort() {
    let { length, setJ, i, j } = this.state;
    let array = [...this.state.rectangles];

    if (i <= length) {
      setJ = true;
      if (j > 0 && array[j - 1].size > array[j].size) {
        let temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
        setJ = false;
      }
      array[j] = {
        ...array[j],
        color: "green"
      };
    }

    if (i <= length && setJ) {
      array[i] = {
        ...array[i],
        color: "red"
      };
      if (this._isMounted) {
        this.setState({
          j: i,
          i: i + 1,
          rectangles: array
        });
      }
    } else {
      if (this._isMounted) {
        this.setState({ j: j - 1, setJ: false, rectangles: array });
      }
    }
  }

  /**
   * render each rectangle on the screen
   */
  rec = (size, index) => {
    return (
      <div key={index}>
        <div
          style={{
            height: size.size,
            width: "10px",
            backgroundColor: size.color,
            position: "absolute",
            bottom: "0px",
            left: index * 11,
            marginRight: "2px"
          }}
        ></div>
      </div>
    );
  };

  render() {
    return (
      <div
        style={{
          bottom: "0px",
          position: "absolute",
          left: "10%",
          right: "25%"
        }}
      >
        {this.state.rectangles.map((size, index) => {
          return this.rec(size, index);
        })}
      </div>
    );
  }
}

export default insertionSort;
