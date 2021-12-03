import React from "react";
import HomeHeader from "../component/home_header";

class Alliances extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <HomeHeader title="Allinces" />
        <div
          style={{
            height: "100%",
            paddingTop: "6%",
            textAlign: "center",
            fontSize: 24,
            color: "GrayText",
          }}
        >
          Coming Soon...
        </div>
      </>
    );
  }
}

export default Alliances;
