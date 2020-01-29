import React, { Component } from "react";
import _ from "lodash";

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
  componentDidMount() {
    // _.delay(this.selectionSort.bind(this), 100);
    let array = [...this.state.rectangles];
    array[0] = {
      ...array[0],
      color: "green"
    };
    this.setState({ completed: 1, rectangles: array });
  }

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
      this.setState({
        j: i,
        i: i + 1,
        rectangles: array
      });
    } else {
      // array[j] = {
      //   ...array[j],
      //   color: "green"
      // };
      this.setState({ j: j - 1, setJ: false, rectangles: array });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    _.delay(this.insertionSort.bind(this), this.props.speed);
  }

  rec = (size, index) => {
    return (
      <div>
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
        {/* {console.log(this.state.i)} */}
        {this.state.rectangles.map((size, index) => {
          return this.rec(size, index);
        })}
      </div>
    );
  }
}

export default insertionSort;
