import React from "react";
import LeftBlock from "./LeftBlock";
import { MovieContext } from "./context/MovieContext";
import Zoom from "react-reveal/Zoom";
import Right from "./RightBox";

function Home() {
  const { state, dispatch } = React.useContext(MovieContext);
  
  const increment = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {id:item.id, item},
    });
  };

  const decrement = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { item },
    });
  };
  return (
    <div>
      <div className="row">
        <div className="col s12 m4 l2">
          <LeftBlock />
        </div>
        <Zoom>
          <div className="col s12 m4 l8">
            {state.data &&
              state.data.map((item,index) => {
                return (
                  <Zoom key={item + item.id}>
                    <div className="col s12 m3 l3">
                      <div className="card">
                        <div className="card-image">
                          <img src={item.image} alt="" height="220vh" />
                          <div className="row">
                            <div className="col s12 m6 l6">
                              <div className="card-content padText">
                                <p>{item.category}</p>
                                <p>{item.price} $</p>
                              </div>
                            </div>
                            <div className="col s12 m6 l6">
                              <div className="card-action card-tabs">
                                <div className="grey lighten-3 tabs tabs-fixed-width">
                                  <div
                                    id="test4"
                                    className="tab test"
                                    onClick={() => increment(item)}
                                  >
                                    {" "}
                                    +{" "}
                                  </div>
                                  <div
                                    id="test5"
                                    className="tab test"
                                    onClick={() => decrement(item)}
                                  >
                                    {" "}
                                    -{" "}
                                  </div>
                                </div>
                                 <div className=" grey lighten-4"> total : {state.cartItems[item.id] && state.cartItems[item.id].length } </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Zoom>
                );
              })}
          </div>
        </Zoom>
        <Right />
      </div>
    </div>
  );
}
export default Home;
