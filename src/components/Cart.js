import React from "react";
import { MovieContext } from "./context/MovieContext";

function Cart() {
  const { state, dispatch } = React.useContext(MovieContext);
  const allItems = [].concat.apply([], Object.values(state.cartItems));

  const allItemsId = Array.from(allItems.reduce((acum,elem)=>acum.set(elem.id, elem), new Map()).values())
 
  const increment = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id: item.id, item },
    });
  };

  const decrement = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { item },
    });
  };
  return (
    <div className="container">
      {allItemsId && allItemsId.map((item, index) => (
        <div className="card" key={item.item.id + index}>
          <div className="grid-container  ">
            <img src={item.item.image} alt="" width="80%" />
            <div>
              <h3> Category : {item.item.category}</h3>
              <ul>
                <li>
                  <span>
                    <b>Description :</b> {item.item.description}
                  </span>
                </li>
                <br />

                <li>
                  {" "}
                  <span>
                    <b>Title :</b> {item.item.title}
                  </span>
                </li>
                <br />

                <li>
                  <span>
                    <b>Price :</b> {item.item.price}
                  </span>
                </li>
                <br />
              </ul>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                How match :{" "}
                {state.cartItems[item.id] && state.cartItems[item.id].length}
                <span id="test4" className="tab test right pl20" onClick={()=> increment(item.item)}>
                  +
                </span>
                <span id="test4" className="tab test right pl20" onClick = {()=> decrement(item.item)}>
                  -
                </span>
                <i className="material-icons right">more_vert</i>
              </span>
              <p>
                is only{" "}
                <span className=" right pl20">
                  {state.cartItems[item.id] && state.cartItems[item.id].length * item.item.price }
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
