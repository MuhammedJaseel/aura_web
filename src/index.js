import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import "./style/lin.css";
import "./style/cm_text.css";
import "./style/hm_cm1.css";
import "./style/cm1.css";
import "./style/hm_1.css";
import "./style/hm_2.css";
import "./style/hm_db1.css";
import "./style/hm_cm1.css";
import "./style/hm_sp1.css";
import "./style/hm_cy1.css";
import "./style/hm_su1.css";
import "./style/hm_st1.css";
import "./style/hm_mt1.css";
import "./style/hm_vs1.css";
import "./style/hm_sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./screen/login";
import Home from "./screen/home";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/admin" render={(props) => <Home {...props} />} />
        <Redirect from="/" to="/login" />
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
