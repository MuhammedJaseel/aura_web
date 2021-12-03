import React from "react";
import api from "../module/api";
import { api_int_get } from "../module/api_init";
import dashboardRoutes from "../module/routes";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scope: ".." };
  }

  async componentDidMount() {
    var id = await window.sessionStorage.user_scop_id;
    const result = await api_int_get(api.scope + "/" + id);
    if (result.err) this.setState({ scope: "error" });
    else this.setState({ scope: result.data.scope_name });
  }

  render() {
    return (
      <div
        style={{
          padding: 5,
          paddingTop: 0,
          textAlign: "center",
        }}
      >
        <img
          src={require("../Assets/image/profile.png").default}
          alt="..."
          className="hm_1logged_user_profile_pic"
        />
        <div style={{ color: "white", fontWeight: 400 }}>
          {window.sessionStorage.user_name}
        </div>
        <div style={{ color: "gray", fontWeight: 500, fontSize: 14 }}>
          {this.state.scope}
        </div>
      </div>
    );
  }
}

class Sidebarbutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  render() {
    return (
      <div
        className="hm_sidebar_a"
        style={{
          backgroundColor: this.props.selected
            ? "rgba(255,255,255,.2)"
            : this.state.backgroundColor,
        }}
        onClick={() => {
          window.history.pushState({}, null, this.props.data.path);
          this.props.onclick(this.props.data.component, this.props.index);
        }}
      >
        <div  className="hm_sidebar_d">
          <i
            className={this.props.data.icon + " hm_sidebar_b"}
            style={{ color: this.props.selected ? "white" : "#ccc" }}
          />
        </div>
        <div
          className="hm_sidebar_c"
          style={{ color: this.props.selected ? "white" : "#C6C8CD" }}
        >
          {this.props.data.name}
        </div>
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div style={{ paddingTop: 15, height: 70, textAlign: "center" }}>
          <a href="/">
            <img
              style={{ width: "30%" }}
              src={require("../Assets/image/kalyani2.png").default}
              align="center"
              alt="..."
            />
          </a>
        </div>
        <div
          style={{
            position: "relative",
            overflow: "auto",
            top: 0,
            height: "calc(100% - 70px)",
            padding: 5,
          }}
        >
          <Profile />
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: 1,
              backgroundColor: "rgba(255,255,255,.2)",
            }}
          />
          <span className="hm_1sidebar_subtopic">GENERAL</span>
          {dashboardRoutes.map((prop, key) => (
            <React.StrictMode key={key}>
              <Sidebarbutton
                data={prop}
                onclick={this.props.onclick}
                index={key}
                selected={this.props.index === key ? true : false}
              />
              {/* {key === 2 ? (
                <span className="sidebar_subtopic">SUPPORT</span>
              ) : null}
              {key === 4 ? (
                <span className="sidebar_subtopic">SOICAIL</span>
              ) : null} */}
              {key === 7 ? (
                <span className="hm_1sidebar_subtopic">VISITOR MANAGEMENT</span>
              ) : null}
              {key === 10 ? (
                <span className="hm_1sidebar_subtopic">SETTINGS</span>
              ) : null}
            </React.StrictMode>
          ))}

          <div className="hm_1sidebar_aboutapp">Kalyani Aura 2021</div>
          <div className="hm_1sidebar_aboutapp">
            Copyright &#169; Kalyani. All Rights Reserved.
          </div>
          <div className="hm_1sidebar_aboutapp">
            {/* Version Aura_Panal v0.2.0(debug) */}
            Version Aura_Panal v0.2.1(debug)
          </div>
          {/* <div className="sidebar_aboutapp">#KalyaniDevolopers #TeamKalyani #KalyaniMotors</div> */}
        </div>
      </>
    );
  }
}

export default Sidebar;
