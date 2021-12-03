import React from "react";

function Topbutton({ selected, title, icon, onclick }) {
  return (
    <button
      className="hm_cm1_headcomm_btn"
      style={selected ? { color: "#eee", background: "#04213C" } : null}
      onClick={onclick}
    >
      {icon}&nbsp;&nbsp;{title}
    </button>
  );
}

function Editheaderbutton({ hint, onclick, content }) {
  return (
    <button onClick={onclick} className="hm_cm1_edithead_btn">
      {content}
      <div className="hm_cm1_edithead_btn_a">{hint}</div>
    </button>
  );
}

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    const { show } = this.state;
    return (
      <React.StrictMode>
        <div
          className="filter_button"
          onClick={() => this.setState({ show: true })}
        >
          <i className="fas fa-filter" />
          Filters
        </div>
        <div
          className="popup_window"
          style={{ visibility: show ? "visible" : "hidden" }}
        >
          <center>
            <div className="popup_content_area">
              Chose Your Filters
              <button
                style={{ float: "right" }}
                onClick={() => this.setState({ show: false })}
              >
                X
              </button>
              <div style={{ padding: 10 }}>{this.props.body}</div>
            </div>
          </center>
        </div>
      </React.StrictMode>
    );
  }
}

class ExportButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    const { show } = this.state;
    return (
      <>
        <button
          className="export_button"
          onClick={() => this.setState({ show: true })}
        >
          <i className="fas fa-file-archive p-1" />
          Export
        </button>
        <div
          className="export_window"
          style={{ visibility: show ? "visible" : "hidden" }}
        >
          <center>
            <div className="export_content_area">
              Export
              <button
                style={{ float: "right" }}
                onClick={() => this.setState({ show: false })}
              >
                X
              </button>
              <div style={{ padding: 10 }}>{this.props.body}</div>
            </div>
          </center>
        </div>
      </>
    );
  }
}

function RoundAddButton({ onclick }) {
  return (
    <button className="hm_cm1_addbutton" onClick={onclick}>
      +
    </button>
  );
}

export {
  Topbutton,
  Editheaderbutton,
  ExportButton,
  FilterButton,
  RoundAddButton,
};
