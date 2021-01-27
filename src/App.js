import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Cart from "./components/Cart"
import { MovieProvider } from "./components/context/MovieContext";
import {BrowserRouter as Router,  Route} from "react-router-dom";
import Courier from "./components/Courier";



function App() {
  return (
    
    <MovieProvider>
     
      <Router>
      <div>
      <Header />
      <Route exact path="/courier"><Courier/></Route>
      <Route exact path="/" > <Home/></Route>
      <Route exact path="/cart" ><Cart/> </Route>
     
      </div>
      </Router>
    </MovieProvider>
   
  );
}

export default App;
