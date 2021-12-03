function MyPopup({ size, body, status }) {
  const mysize =
    size === "md" ? 750 : size === "sm" ? 550 : size === "xs" ? 450 : 900;
  return (
    <div
      style={{
        visibility: status ? null : "hidden",
        position: "fixed",
        overflow: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        background: "rgba(0,0,0,.5)",
      }}
    >
      <div style={{ maxWidth: mysize, width: "100%", margin: "50px 5px" }}>
        {status ? body : null}
      </div>
    </div>
  );
}

function PopupLg(props) {
  return <MyPopup size="lg" body={props.body} status={props.show} />;
}
function PopupMd(props) {
  return <MyPopup size="md" body={props.body} status={props.show} />;
}
function PopupSm(props) {
  return <MyPopup size="sm" body={props.body} status={props.show} />;
}
function PopupXs(props) {
  return <MyPopup size="xs" body={props.body} status={props.show} />;
}

export { PopupLg, PopupMd, PopupSm, PopupXs };
