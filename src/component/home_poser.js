import { Loading } from "./loading";
import Error from "./error";

function HomeDatasetter({ loading, error, items, vacum, onreload }) {
  return (
    <center>
      {loading ? (
        <Loading />
      ) : error != null ? (
        <Error />
      ) : items.length === 0 ? (
        <>
          <div style={{ color: "GrayText", fontSize: 14, fontWeight: 500 }}>
            <i className="fas fa-exclamation-triangle pr-3" />
            No data Available.
          </div>
          <button
            style={{ color: "blue", fontSize: 12 }}
            onClick={
              onreload !== null ? onreload : () => window.location.reload()
            }
          >
            Click to Reload.
          </button>
        </>
      ) : vacum ? null : (
        <div style={{ height: 50 }} />
      )}
    </center>
  );
}

export default HomeDatasetter;
