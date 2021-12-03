import React, { Component } from "react";
import Tickets from "./support_tickets";
import HomeHeader from "../component/home_header";
import { Topbutton } from "../component/home_button";
import Scope from "./support_scope";
import Profile from "./support_profile";

class Support extends Component {
  constructor(props) {
    super(props);
    const tpage = window.sessionStorage.supportpage;
    this.state = {
      page: tpage == null ? "1" : tpage,
    };
  }
  render() {
    const { page } = this.state;
    return (
      <>
        <HomeHeader
          title="Supports"
          body={
            <>
              <Topbutton
                onclick={() => {
                  window.sessionStorage.supportpage = "1";
                  this.setState({ page: "1" });
                }}
                selected={page === "1" ? true : false}
                icon={<i className="fas fa-box-open text-warning" />}
                title="Support Scope"
              />
              <Topbutton
                onclick={() => {
                  window.sessionStorage.supportpage = "2";
                  this.setState({ page: "2" });
                }}
                selected={page === "2" ? true : false}
                icon={<i className="fas fa-address-card text-success" />}
                title="Support Profile"
              />
              <Topbutton
                onclick={() => {
                  window.sessionStorage.supportpage = "3";
                  this.setState({ page: "3" });
                }}
                selected={page === "3" ? true : false}
                icon={<i className="fas fa-list-alt text-info" />}
                title="Support Tickets"
               
              />
            </>
          }
        />

        {page === "1" ? <Scope /> : page === "2" ? <Profile /> : <Tickets />}
      </>
    );
  }
}

export default Support;
