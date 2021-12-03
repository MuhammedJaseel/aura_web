import React, { Component } from "react";
import Location from "./space_location";
import Inventory from "./space_inventory";
import HomeHeader from "../component/home_header";
import { Topbutton } from "../component/home_button";
import SpacePlan from "./space_plan";
import { setPage } from "../method/space";

class Space extends Component {
  constructor(props) {
    super(props);
    const tpage = window.sessionStorage.spacepage;
    this.state = {
      page: tpage == null ? "1" : tpage,
    };
  }

  setstate = (v) => this.setState(v);
  page() {
    if (this.state.page === "1") return <Location />;
    if (this.state.page === "2") return <Inventory />;
    if (this.state.page === "3") return <SpacePlan />;
  }

  render() {
    const { page } = this.state;
    return (
      <React.StrictMode>
        <HomeHeader
          title="Space"
          body={
            <>
              <Topbutton
                onclick={() => setPage(this.setstate, "1")}
                selected={page === "1" ? true : false}
                icon={<i className="fas fa-map-marker-alt text-danger" />}
                title="Manage Location"
              />
              <Topbutton
                onclick={() => setPage(this.setstate, "2")}
                selected={page === "2" ? true : false}
                icon={<i className="fab fa-searchengin text-info" />}
                title="Manage Inventory"
              />
              <Topbutton
                onclick={() => setPage(this.setstate, "3")}
                selected={page === "3" ? true : false}
                icon={<i className="fas fa-layer-group text-primary" />}
                title="Manage Plan"
              />
            </>
          }
        />
        {this.page()}
      </React.StrictMode>
    );
  }
}

export default Space;
