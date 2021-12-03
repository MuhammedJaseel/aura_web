function HomeHeader(props) {
  return (
    <div className="hm_cm1header">
      <div className="row">
        <div style={{ fontWeight: "600", padding: 15 }}>{props.title}</div>
        {/* <div style={{ display: "flex" }}> */}
        {props.body}
      </div>
      {/* </div> */}
      <div className="row">
        <button
          onClick={() => {
            window.sessionStorage.auth_key = "";
            window.location.replace("/login");
          }}
          style={{ padding: 14, color: "gray", float: "right" }}
        >
          <i
            className="fas fa-sign-out-alt"
            style={{ padding: 5, color: "#D1451F" }}
          />
          LogOut
        </button>
        <button
          style={{
            padding: 12,
            color: "#CCC351",
            fontSize: 20,
            float: "right",
          }}
        >
          <i className="fas fa-bell" />
        </button>
      </div>
    </div>
  );
}

export default HomeHeader;
