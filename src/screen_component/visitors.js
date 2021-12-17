import React, { Component } from "react";
import HomeHeader from "../component/home_header";
import HomeDatasetter from "../component/home_poser";
import { getVisitors } from "../method/visitors";

export default class Visitors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      items: [],
    };
  }

  componentDidMount() {
    getVisitors((v) => this.setState(v));
  }

  render() {
    const { error, loading, items } = this.state;
    // const setstate = (v) => this.setState(v);
    return (
      <React.StrictMode>
        <HomeHeader title="Visitors" />
        <div className="hm_vs1_a">
          <div className="hm_cm1_title">Manage Members</div>
          <div className="hm_vs1_b">
            <div>
              <div className="hm_vs1_c">Profile</div>
              {items.map((item) => (
                <div>jk</div>
              ))}
            </div>
            <div>
              <div className="hm_vs1_c">Name</div>
              {items.map((item) => (
                <div className="hm_vs1_d">
                  {item.profile.first_name}&nbsp;
                  {item.profile.last_name}
                </div>
              ))}
            </div>
            <div>
              <div className="hm_vs1_c">Time Slot</div>
            </div>
            <div>
              <div className="hm_vs1_c">Purpose of visit</div>
            </div>
            <div>
              <div className="hm_vs1_c">Status</div>
            </div>
          </div>
        </div>
        <HomeDatasetter loading={loading} error={error} items={items} />
      </React.StrictMode>
    );
  }
}
