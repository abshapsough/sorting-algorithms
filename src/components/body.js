import React, { Component } from "react";
import Slider from "./inputs/slider";
import Buttons from "./inputs/buttons";
import BubbleSort from "./algorithms/bubbleSort";
import InsertionSort from "./algorithms/insertionSort";
import SelectionSort from "./algorithms/selectionSort";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Speed from "./inputs/speed";
import Button from "@material-ui/core/Button";

/**
 * Body of the page
 * @class
 */

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rectangles: Array.from({ length: 20 }, () => ({
        size: Math.floor(Math.random() * 400),
        color: "lightblue"
      })),

      algorithm: "Select a sorting algorithm!",
      speed: 100,
      start: false,
      algorithms: ["Bubble Sort", "Selection Sort", "Insertion Sort"]
    };
  }
  /**
   * Sets speed of sorting animation
   * @function
   */
  speed = value => {
    this.setState({ speed: value, start: false });
  };

  /**
   * Sets size of sorting animation
   * @function
   */
  slider = value => {
    this.setState({
      rectangles: Array.from({ length: value }, () => ({
        size: Math.floor(Math.random() * 400),
        color: "lightblue"
      })),
      algorithm: this.state.algorithm,
      start: false
    });
  };

  /**
   * Choose algorithm buttons
   * @function
   */
  button = value => {
    this.setState({
      start: false,
      algorithm: value
    });
  };

  /**
   * Determine which algorithm to run after start button is called
   * @function
   */
  animation = () => {
    if (this.state.start) {
      if (this.state.algorithm === "Bubble Sort") {
        return (
          <BubbleSort
            rectangles={this.state.rectangles}
            speed={this.state.speed}
          ></BubbleSort>
        );
      } else if (this.state.algorithm === "Insertion Sort") {
        return (
          <InsertionSort
            rectangles={this.state.rectangles}
            speed={this.state.speed}
          ></InsertionSort>
        );
      } else if (this.state.algorithm === "Selection Sort") {
        return (
          <SelectionSort
            rectangles={this.state.rectangles}
            speed={this.state.speed}
          ></SelectionSort>
        );
      }
    } else {
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
            return (
              <div
                key={index}
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
            );
          })}
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Container maxWidth="lg">
          <Grid container alignItems="center" style={{ marginTop: 20 }}>
            <Grid item xs={3}>
              <Slider slider={this.slider}></Slider>
            </Grid>
            <Grid item xs={3}>
              <Speed speed={this.speed}></Speed>
            </Grid>
            <Grid item xs={5}>
              <div>
                <Buttons
                  variant={["outlined", "outlined", "outlined"]}
                  button={this.button}
                  algorithms={this.state.algorithms}
                ></Buttons>
              </div>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                onClick={() => {
                  if (this.state.algorithm === "Select a sorting algorithm!") {
                    this.setState({ start: true, algorithm: "Bubble Sort" });
                  } else {
                    this.setState({ start: true });
                  }
                }}
                color="secondary"
              >
                Start
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginTop: 50 }}
          >
            <Grid item>
              <div style={{ fontSize: 30 }}>{this.state.algorithm}</div>
            </Grid>
          </Grid>
        </Container>

        <div
          style={{
            width: "100%",
            height: "50%",
            borderBottom: "1px solid black",
            position: "absolute",
            marginTop: "5%",
            textAlign: "center"
          }}
        >
          {this.animation()}
        </div>
      </div>
    );
  }
}

export default Body;
