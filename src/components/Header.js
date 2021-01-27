import React from "react";
import { MovieContext } from "./context/MovieContext";
import {  Link } from "react-router-dom";

function Header() {
  const { state, dispatch } = React.useContext(MovieContext);
  const divclass = state.totalCount === 0 || state.totalCount === undefined ? "":'divclass'
console.log(state.totalCount)
  
  return (
    <div>
      <nav className="grey darken-1">
        <div className=" nav-wrapper ">
          <div className="brand-logo right  pl133">
            <span onClick={()=>dispatch({type:'TOGGLE_RIGHT_BLOCK',payload: !state.showRightBlock})}>
             Sort prise 
              <i
                className={
                  state.showRightBlock ? "material-icons transform" : "material-icons"
                }
              >
                arrow_drop_down
              </i>
            </span>
          </div>
          <ul id="nav-mobile" className="boxBlok left hide-on-med-and-down">
            <li className="pl30"><Link to = "/">Home</Link> </li>
          <Link to = '/courier'>  <li className="pl30">total price : {Math.floor(state.itemprice)} $</li></Link>
            <li className="pl30 hed"><Link to="/cart"><div className = {divclass}> </div><i className= 'material-icons cartitem' >add_shopping_cart </i> </Link></li> 
            <li> : {state.totalCount === undefined ? 0 : state.totalCount}</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
