import React from "react";
import { MovieContext } from "./context/MovieContext";

function LeftBlock() {
  const { dispatch } = React.useContext(MovieContext);
  const [useActive, setuseActive] = React.useState(0);
  let collection = [
    "all",
    "men clothing",
    "jewelery",
    "electronics",
    "women clothing",
  ];
  const active = (index) => {
    setuseActive(index);
    
    dispatch({type:'SET_CATEGORIES',payload:collection[index]})
    
  };
  return (
    <div>
      <ul className="collection">
        {collection.map((item, index) => (
          <li
            key={item + index}
            className={
              useActive === index ? "active collection-item" : "collection-item"
            }
            onClick={() =>active(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeftBlock;
