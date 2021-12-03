import React from "react";
// import gear1 from "../../Assets/image/gear1.png";
// import gear3 from "../../Assets/image/gear3.png";
import gear2r from "../Assets/image/gear2r.png";
class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      second1: 360,
      second2: 356,
      second3: 347,
      block: true,
      size: 0.5,
    };
  }

  componentDidMount() {
    // this.myInterval = setInterval(() => {
    //   this.state.block
    //     ? this.setState(({ second1, second2 }) => ({
    //         second1: second1 + 5,
    //         second2: second2 + 5,
    //         block: false,
    //       }))
    //     : this.setState(({ second1, second2 }) => ({
    //         second1: second1 - 5,
    //         second2: second2 - 5,
    //         block: true,
    //       }));
    // }, 0.5);
    // this.myInterval2 = setInterval(() => {
    //   this.setState(({ size }) => ({
    //     size: size + 0.01,
    //   }));
    //   if (this.state.size > 1) clearInterval(this.myInterval2);
    // }, 20);
  }

  componentWillUnmount() {
    // console.log("Greeting unmounted...");
    // clearInterval(this.myInterval);
    // clearInterval(this.myInterval2);
  }

  render() {
    return (
      <center>
        <div
          style={{
            width: "50%",
            textAlign: "left",
            fontWeight: "bold",
            color: "GrayText",
          }}
        >
          <div>
            <img src={gear2r} style={{ width: 50, height: 50 }} alt=".." />
            <span style={{ paddingLeft: 10, fontSize: 23 }}>
              Internet Error
            </span>
          </div>
          <div style={{ padding: "5px 20px" }}>
            <span style={{ paddingLeft: 10 }}>Try,</span>
            <ul>
              <li>Check Your Internet Connection</li>
            </ul>
          </div>
        </div>
      </center>
      // <div
      //   style={{
      //     position: "relative",
      //     width: 180 * this.state.size,
      //     height: 160 * this.state.size,
      //   }}
      // >
      //   <div
      //     style={{
      //       transform: "rotate(" + this.state.second1 + "deg)",
      //       position: "absolute",
      //       left: -150 * this.state.size,
      //       top: -20,
      //       fontSize: 60,
      //       fontWeight: "bold",
      //       color: "#555",
      //     }}
      //   >
      //     Error
      //   </div>
      //   <div
      //     style={{
      //       // transform: "rotate(" + this.state.second1 + "deg)",
      //       position: "absolute",
      //       left: -150 * this.state.size,
      //       top: 100,
      //       fontSize: 15,
      //       color: "GrayText",
      //     }}
      //   >
      //     {/* {this.props.error.message} */}
      //   </div>
      //   <div
      //     style={{
      //       transform: "rotate(" + this.state.second1 + "deg)",
      //       position: "absolute",
      //       left: 0 * this.state.size,
      //       top: 0 * this.state.size,
      //     }}
      //   >
      //     <img src={gear1} height={100 * this.state.size} width={100 * this.state.size} alt=".." />
      //   </div>
      //   <div
      //     style={{
      //       transform: "rotate(" + -this.state.second2 + "deg)",
      //       position: "absolute",
      //       left: 68 * this.state.size,
      //       top: 75 * this.state.size,
      //     }}
      //   >
      //     <img src={gear3} height="80" width="80" alt=".." />
      //   </div>
      //   <div
      //     style={{
      //       transform: "rotate(" + this.state.second3 + "deg)",
      //       position: "absolute",
      //       left: 117 * this.state.size,
      //       top: 31 * this.state.size,
      //     }}
      //   >
      //     <img src={gear2r} height={60 * this.state.size} width={60 * this.state.size} alt=".." />
      //   </div>
      //   <button
      //     style={{
      //       fontSize: 18,
      //       marginLeft: 180,
      //       color: "white",
      //       fontWeight: "bold",
      //       marginTop: 100,
      //       backgroundColor: "lightblue",
      //       borderRadius: 10,
      //       transform: "rotate(" + this.state.second1 + "deg)",
      //     }}
      //     onClick={() => window.location.reload()}
      //   >
      //     Reload
      //   </button>
      // </div>
    );
  }
}

export default Error;
