import React, { Component } from "react";
import auraLogo from "../Assets/image/kalyani2.png";
import { adminLogin } from "../method/login";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: { email: "", pass: "" },
      error: "",
      loading: false,
    };
  }
  render() {
    const { error, loading } = this.state;
    return (
      <div className="lin_bg_a">
        <div className="lin_fm_a">
          <img src={auraLogo} width="160" alt="Aura Logo" />
          <div className="lin_fm_aa">Login?</div>
          <form
            className="lin_fm_ab"
            onChange={() => this.setState({ error: "" })}
            onSubmit={(e) => adminLogin(e, (v) => this.setState(v))}
          >
            <input
              className="textbox1"
              placeholder="Email"
              id="email"
              required
            />
            <input
              className="textbox1"
              placeholder="Password"
              type="password"
              id="pass" 
              required
            />
            <div className="error_text1">{error === "" ? "" : error}</div>
            <button
              type="submit"
              className="lin_fm_ae"
              disabled={loading}
              style={{ backgroundColor: loading ? "#ddd" : "#ccc" }}
            >
              Login
            </button>
          </form>

          <div className="lin_fm_af">
            <a href="login">Forget password?</a>
          </div>
          <div className="lin_fm_ag">Copyright © kalyaniaura</div>
        </div>
      </div>
    );
  }
}
