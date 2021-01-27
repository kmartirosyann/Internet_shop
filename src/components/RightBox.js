import React from "react";
import Zoom from "react-reveal/Zoom";
import { MovieContext } from "./context/MovieContext";

export default function RightBox() {
  const { state , dispatch} = React.useContext(MovieContext);
  const [activ, setactiv] =React.useState()
 const prise = (a)=>{
  setactiv(a)
  a ===true ? dispatch({type:"SORT_DATA_MIN" }):dispatch({type:"SORT_DATA_MAX" })
   
 }
  if (state.showRightBlock) {
    return (
      <Zoom top>
        <div className=" rigth col s12 m4 l2">
          <div className="grey ">
            <ul className={"collection"}>
              <li className= {activ===true ? "active collection-item":"collection-item"} onClick={()=>prise(true)}>sort max min price</li>
              <li className={activ===false ? "active collection-item":"collection-item"} onClick={()=>prise(false)}>sort min max price</li>
            </ul>
          </div>
        </div>
      </Zoom>
    );
  } else {
    return <div></div>;
  }
}
