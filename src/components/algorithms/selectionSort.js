import React, { Component } from "react";
import _ from "lodash";

/**
 * Selection Sort class.
 * @class
 */
class SelectionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectangles: this.props.rectangles,
      i: 1,
      j: 0,
      iMin: 0,
      jPrev: 1,
      iPrev: 0,
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
   */
  componentDidMount() {
    this._isMounted = true;
    this.setState({ completed: 1 });
  }

  /**
   * call selectionSort animation function every unit speed of time
   */
  componentDidUpdate(prevProps, prevState) {
    this._isMounted = true;
    _.delay(this.selectionSort.bind(this), this.props.speed);
  }

  /**
   * unmount component and prevent further state updating
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * selectionSort algorithm and animation
   */
  selectionSort() {
    let { j, length, i, iMin, jPrev, iPrev } = this.state;
    let array = [...this.state.rectangles];

    if (j < length - 1) {
      array[length - 1] = {
        ...array[length - 1],
        color: "lightblue"
      };

      array[jPrev] = {
        ...array[jPrev],
        color: "lightblue"
      };
      array[j - 1] = {
        ...array[j - 1],
        color: "lightblue"
      };
      if (i < length) {
        if (array[i].size < array[iMin].size) {
          if (iMin !== j) {
            iPrev = iMin;
          }
          iMin = i;
        }

        array[i] = {
          ...array[i],
          color: "green"
        };
        array[i - 1] = {
          ...array[i - 1],
          color: "lightblue"
        };

        array[iPrev] = {
          ...array[iPrev],
          color: "lightblue"
        };
        array[iMin] = {
          ...array[iMin],
          color: "red"
        };
        array[j] = {
          ...array[j],
          color: "yellow"
        };
        if (this._isMounted) {
          this.setState({
            i: i + 1,
            iMin: iMin,
            rectangles: array,
            iPrev: iPrev
          });
        }
        return;
      }

      if (iMin !== j) {
        let temp = array[j];
        array[j] = array[iMin];
        array[iMin] = temp;
      }
      array[iMin] = {
        ...array[iMin],
        color: "lightblue"
      };
      if (this._isMounted) {
        this.setState({
          rectangles: array,
          j: j + 1,
          iMin: j + 1,
          i: j + 2,
          jPrev: iMin
        });
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

export default SelectionSort;
