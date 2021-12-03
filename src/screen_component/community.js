import React, { Component } from "react";
import { Topbutton } from "../component/home_button";
import HomeHeader from "../component/home_header";
import Company from "./community_company";
import Members from "./community_member";

class HomeCommunity extends Component {
  constructor(props) {
    super(props);
    const tpage = window.sessionStorage.communitypage;
    this.state = {
      page: tpage == null ? "1" : tpage,
    };
  }

  render() {
    const { page } = this.state;
    return (
      <React.StrictMode>
        <HomeHeader
          title="Community"
          body={
            <>
              <Topbutton
                onclick={() => {
                  window.sessionStorage.communitypage = "1";
                  this.setState({ page: "1" });
                }}
                selected={page === "1" ? true : false}
                icon={<i className="fas fa-layer-group text-info" />}
                title="Manage Members"
              />
              <Topbutton
                onclick={() => {
                  window.sessionStorage.communitypage = "2";
                  this.setState({ page: "2" });
                }}
                selected={page === "2" ? true : false}
                icon={<i className="fas fa-building text-warning" />}
                title="Manage Companies"
              />
            </>
          }
        />
        <div style={{padding:"0px 1%"}}>{page === "1" ? <Members /> : <Company />}</div>
      </React.StrictMode>
    );
  }
}

export default HomeCommunity;
