import React from "react";
import Button from "@material-ui/core/Button";

/**
 * set state of sorting buttons
 * @param {*} props
 */
export default function Buttons(props) {
  const [array, setArray] = React.useState([...props.variant]);
  const [unselect, setUnselect] = React.useState(2);
  function handleClick(index) {
    let arr = [...array];
    arr[unselect] = "outlined";
    arr[index] = "contained";

    setUnselect(index);
    setArray(arr);
  }

  return (
    <div>
      {props.algorithms.map((value, index) => {
        return (
          <Button
            key={index}
            variant={array[index]}
            style={{ marginLeft: 5 }}
            color="primary"
            onClick={() => {
              handleClick(index);
              props.button(value);
            }}
          >
            {value}
          </Button>
        );
      })}
    </div>
  );
}
