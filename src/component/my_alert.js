import React from "react";
import { Editheaderbutton } from "./home_button";

class MyAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      loading: false,
    };
  }

  render() {
    const { body, close, onconform } = this.props;
    return (
      <div className="alert_full_body" style={{ visibility: this.props.show ? null : "hidden" }}>
        <center>
          <div className="alert_body">
            {this.state.loading ? (
              "Loading.."
            ) : (
              <Editheaderbutton
                content={<i className="fas fa-window-close" style={{ color: "skyBlue" }} />}
                hint="Close"
                onclick={close}
              />
            )}
            <span style={{ fontWeight: "bold", color: "white" }}>Alert</span>
          </div>
          <div className="alert_header">
            <div style={{ padding: 8 }}>{body}</div>
            <div>
              <button className="alert_confirm_button" onClick={onconform}>
                Confirm
              </button>
              <button className="alert_cancel_button" onClick={close}>
                Cancel
              </button>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default MyAlert;
