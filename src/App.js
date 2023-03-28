/* eslint-disable no-unused-vars */
import Register from "./components/Register";
import Login  from "./components/Login";
import Product from "./components/Products";
// import Checkout from "./components/Checkout";
// import Thanks from "./components/Thanks"
import ipConfig from "./ipConfig.json";
import {Switch, Route} from "react-router-dom";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          {/* <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/Thanks">
            <Thanks /> */}
          {/* </Route> */}
          <Route path="/">
            <Product />
          </Route>
        </Switch>  
    </div>
  );
}

export default App;
