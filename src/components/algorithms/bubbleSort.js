import React, { Component } from "react";
import _ from "lodash";

/**
 * Bubble Sort class.
 * @class
 */
class BubbleSort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rectangles: this.props.rectangles,
      i: 0,
      j: 0,
      length: null
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

    this.setState({
      i: 0,
      length: this.props.rectangles.length
    });
  }

  /**
   * call selectionSort animation function every unit speed of time
   */
  componentDidUpdate(prevProps, prevState) {
    this._isMounted = true;

    _.delay(this.bubbleSort.bind(this), this.props.speed);
  }

  /**
   * unmount component and prevent further state updating
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * bubbleSort algorithm and animation
   */
  bubbleSort() {
    const { i, j, length } = this.state;

    if (length > j) {
      if (length > i) {
        let rect = [...this.state.rectangles];
        rect[i] = {
          size: rect[i].size,
          color: "green"
        };
        rect[length - 1] = {
          size: rect[length - 1].size,
          color: "lightblue"
        };
        rect[length - 2] = {
          size: rect[length - 2].size,
          color: "lightblue"
        };
        if (typeof rect[i + 1] === "object") {
          if (rect[i + 1].size >= rect[i].size) {
            rect[i + 1] = {
              size: rect[i + 1].size,
              color: "green"
            };
          }
          if (rect[i + 1].size < rect[i].size) {
            rect[i + 1] = {
              size: rect[i + 1].size,
              color: "red"
            };
            rect[i] = {
              size: rect[i].size,
              color: "red"
            };
            let temp = rect[i];
            rect[i] = rect[i + 1];
            rect[i + 1] = temp;
          }
        }
        if (i > 0) {
          rect[i - 1] = {
            size: rect[i - 1].size,
            color: "lightblue"
          };
        }
        if (i === length - 1) {
          rect[i] = {
            size: rect[i].size,
            color: "lightblue"
          };
          if (this._isMounted) {
            this.setState({
              j: j + 1,
              i: 0
            });
          }
        } else {
          if (this._isMounted) {
            this.setState({
              i: i + 1,
              rectangles: rect
            });
          }
        }
      }
    }
  }

  /**
   * render each rectangle on the screen
   */
  rectangle = (size, index) => {
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
          return this.rectangle(size, index);
        })}
      </div>
    );
  }
}

export default BubbleSort;
