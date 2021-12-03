import React from "react";
import dashboardRoutes from "../module/routes";
import Sidebar from "../component/sidebar";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      index: -1,
      show: false,
    };
  }

  componentDidMount() {
    if (this.state.body === null)
      for (let i = 0; i < dashboardRoutes.length; i++) {
        if (this.props.location.pathname === dashboardRoutes[i].path)
          this.setState({ body: dashboardRoutes[i].component, index: i });
      }
  }

  render() {
    return (
      <React.StrictMode>
        <div className="hm_1sidebar">
          <Sidebar
            onclick={(body, key) => this.setState({ body, index: key })}
            index={this.state.index}
          />
        </div>
        <div className="hm_1body">
          {this.state.body != null ? (
            <this.state.body
              loadall={() => this.setState({ show: !this.state.show })}
            />
          ) : null}
        </div>
      </React.StrictMode>
    );
  }
}

export default Home;
