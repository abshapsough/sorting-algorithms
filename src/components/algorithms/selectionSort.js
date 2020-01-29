import React, { Component } from "react";
import _ from "lodash";

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

  componentDidMount() {
    // _.delay(this.selectionSort.bind(this), 100);
    this.setState({ completed: 1 });
  }

  selectionSort() {
    let { j, length, i, iMin, jPrev, iPrev } = this.state;
    let array = [...this.state.rectangles];

    if (j < length - 1) {
      array[length - 1] = {
        ...array[length - 1],
        color: "lightblue"
      };
      // if (iPrev !== j) {
      //   array[iPrev] = {
      //     ...array[iPrev],
      //     color: "lightblue"
      //   };
      // }
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
        console.log(iPrev);
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

        this.setState({
          i: i + 1,
          iMin: iMin,
          rectangles: array,
          iPrev: iPrev
        });
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
      this.setState({
        rectangles: array,
        j: j + 1,
        iMin: j + 1,
        i: j + 2,
        jPrev: iMin
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    _.delay(this.selectionSort.bind(this), this.props.speed);
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

export default SelectionSort;
