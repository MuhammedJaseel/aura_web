import React from "react";

import gear1 from "../Assets/image/gear1.png";
import gear2 from "../Assets/image/gear2.png";
import gear3 from "../Assets/image/gear3.png";

class Loadingfull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      second1: 360,
      second2: 356,
      second3: 347,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      console.log("renningoo");
      this.state.second1 === 0
        ? this.setState({ second1: 360, second2: 356, second3: 347 })
        : this.setState(({ second1 }) => ({
            second1: second1 - 0.35,
          }));
      this.setState(({ second2 }) => ({
        second2: second2 - 0.4,
      }));
      this.setState(({ second3 }) => ({
        second3: second3 - 0.467,
      }));
    }, 0.5);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <div
        style={{
          position: "fixed",
          visibility: this.props.show ? null : "hidden",
          height: window.innerHeight,
          width: window.innerWidth,
          background: "rgba(0,0,0,.5)",
          alignContent: "center",
          textAlign: "center",
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: window.innerWidth / 2 - 70,
            top: window.innerHeight / 2 - 80,
            backgroundColor: "rgba(255,255,255,.7)",
            borderRadius: 10,
            padding: 5,
            width: 140,
            height: 110,
          }}
        >
          <div
            style={{
              transform: "rotate(" + this.state.second1 + "deg)",
              position: "absolute",
              // position: "relative",
              left: 25,
              top: 5,
              width: 50,
              height: 50,
            }}
          >
            <img src={gear1} height={50} width={50} alt=".." />
          </div>
          <div
            style={{
              transform: "rotate(" + -this.state.second2 + "deg)",
              position: "absolute",
              // position: "relative",
              left: 59,
              top: 42,
              width: 40,
              height: 40,
            }}
          >
            <img src={gear3} height={40} width={40} alt=".." />
          </div>
          <div
            style={{
              transform: "rotate(" + this.state.second3 + "deg)",
              position: "absolute",
              // position: "relative",
              left: 83,
              top: 20,
              width: 30,
              height: 30,
            }}
          >
            <img src={gear2} height={30} width={30} alt=".." />
          </div>
          <div
            style={{
              position: "absolute",
              top: 80,
              left: 35,
              alignContent: "center",
            }}
          >
            <label>Loading...</label>
          </div>
        </div>
      </div>
    );
  }
}

class Loading extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     second1: 360,
  //     second2: 356,
  //     second3: 347,
  //   };
  // }

  // componentDidMount() {
  //   this.myInterval = setInterval(() => {
  //     console.log("renningoo");
  //     this.state.second1 === 0
  //       ? this.setState({ second1: 360, second2: 356, second3: 347 })
  //       : this.setState(({ second1 }) => ({
  //           second1: second1 - 0.35,
  //         }));
  //     this.setState(({ second2 }) => ({
  //       second2: second2 - 0.4,
  //     }));
  //     this.setState(({ second3 }) => ({
  //       second3: second3 - 0.467,
  //     }));
  //   }, 0.5);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.myInterval);
  // }

  render() {
    return (
      // <ShimmerPlaceHolder visible={isFetched}>
        <div>Loading..</div>
      // {/* </ShimmerPlaceHolder> */}
      // <Shimmer>
      //   <Text>Loading...</Text>
      // </Shimmer>
    );
    // return (
    //   <div
    //     style={{
    //       borderRadius: 10,
    //       padding: 5,
    //       width: 140,
    //       position: "relative",
    //       height: 110,
    //     }}
    //   >
    //     <div
    //       style={{
    //         transform: "rotate(" + this.state.second1 + "deg)",
    //         position: "absolute",
    //         left: 25,
    //         top: 5,
    //         width: 50,
    //         height: 50,
    //       }}
    //     >
    //       <img src={gear1} height={50} width={50} alt=".." />
    //     </div>
    //     <div
    //       style={{
    //         transform: "rotate(" + -this.state.second2 + "deg)",
    //         position: "absolute",
    //         // position: "relative",
    //         left: 59,
    //         top: 42,
    //         width: 40,
    //         height: 40,
    //       }}
    //     >
    //       <img src={gear3} height={40} width={40} alt=".." />
    //     </div>
    //     <div
    //       style={{
    //         transform: "rotate(" + this.state.second3 + "deg)",
    //         position: "absolute",
    //         // position: "relative",
    //         left: 83,
    //         top: 20,
    //         width: 30,
    //         height: 30,
    //       }}
    //     >
    //       <img src={gear2} height={30} width={30} alt=".." />
    //     </div>
    //     <div
    //       style={{
    //         position: "absolute",
    //         top: 80,
    //         left: 35,
    //         alignContent: "center",
    //       }}
    //     >
    //       <label>Loading...</label>
    //     </div>
    //   </div>
    // );
  }
}

export { Loadingfull, Loading };
