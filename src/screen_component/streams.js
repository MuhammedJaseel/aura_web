import React from "react";
import { Form } from "react-bootstrap";
import { setImgUrl } from "../module/api_init";
import HomeHeader from "../component/home_header";
import HomeDatasetter from "../component/home_poser";
import { Editheaderbutton } from "../component/home_button";
import { getCommend, getMostPostCreated } from "../method/stream";
import { getStream, hideCommend } from "../method/stream";
import { getStreamByFiltered, hidePost } from "../method/stream";
import { removeFilter, searchSteam } from "../method/stream";
var moment = require("moment");

export default class Stream extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      loading: true,
      items: [],
      search: false,
      sort_title: "",
      reportStatus: false,
      cmd: null,
      commends: [],
      errorCmd: null,
      loadingCmd: true,
      loadingCmdvisibility: false,
    };
  }

  componentDidMount() {
    getStream((v) => this.setState(v));
  }

  render() {
    const { items, search, loading, error, sort_title } = this.state;
    const setState = (v) => this.setState(v);
    const searchDiv = (
      <form>
        <div className="hm_st_a">
          {search ? <i className="fas fa-search hm_st_b" /> : null}
          {search ? (
            <Form.Control
              className="hm_st_c"
              placeholder="Search.."
              onChange={(e) => searchSteam(e, setState)}
            />
          ) : null}
          {!search ? (
            <div className="hm_st_d" onClick={() => setState({ search: true })}>
              <i className="fas fa-search text-white" />
            </div>
          ) : null}
        </div>
      </form>
    );

    return (
      <React.StrictMode>
        <HomeHeader title="Stream" body={searchDiv} />
        <div className="stream_full_body">
          <div className="stream_area">
            {sort_title !== "" ? (
              <div className="hm_st_e">
                <input
                  type="checkbox"
                  checked
                  onChange={() => removeFilter(setState)}
                />
                {sort_title}
              </div>
            ) : null}
            {items.map((item) => (
              <Body setState={setState} state={this.state} item={item} />
            ))}
            <HomeDatasetter loading={loading} error={error} items={items} />
          </div>
          <div className="filter_area">
            <Filters
              filter={(v) => getStreamByFiltered(v, setState)}
              settitle={(value) => setState({ sort_title: value })}
            />
          </div>
        </div>
        <Commends setState={setState} state={this.state} />
      </React.StrictMode>
    );
  }
}

function Body({ setState, state, item }) {
  const { reportStatus } = state;
  return (
    <div className="stream_full">
      <div className="hm_st_n">
        <div className="hm_st_i">
          <img
            src={
              item.owner.profile_image == null
                ? require("../Assets/image/profile.png").default
                : setImgUrl(item.owner.profile_image)
            }
            alt="User"
            className="hm_st_j"
          />
          <div className="hm_st_s">
            <div className="hm_st_m">
              <div className="hm_st_k">
                {item.owner.first_name}&nbsp;
                {item.owner.last_name}
              </div>
              <Report
                show={reportStatus}
                close={() => setState({ reportStatus: false })}
                id={item.id}
              />
              <div className="hm_st_r">
                <StreamVisibility item={item} />
                <div>
                  <i className="fas fa-heart hm_st_o"></i>
                  {item.likes_count}
                </div>
                {item.spams_count !== 0 ? (
                  <div>
                    <i className="fas fa-exclamation-triangle hm_st_p"></i>
                    {item.spams_count}
                  </div>
                ) : null}
                <div>
                  <i
                    className="fas fa-comments hm_st_q"
                    onClick={() => {
                      setState({ cmd: item.id });
                      getCommend(setState, item.id);
                    }}
                  ></i>
                  {item.comments_count}
                </div>
              </div>
            </div>
            <div className="hm_st_l">
              <i className="fas fa-map-marker-alt pr-1" />
              {item.owner.company} | <i className="fas fa-globe pr-1" />
              {item.owner.location} | {moment().utc(item.created_at).fromNow()}
            </div>
          </div>
        </div>
        <StreamTitle
          item={item}
          search={(v) => {
            getStreamByFiltered(v, setState);
            setState({
              sort_title: "Showing Post releted to #" + v.split("/")[1],
            });
          }}
        />
      </div>
      {item.image != null ? (
        <img className="stream_image" alt="..." src={setImgUrl(item.image)} />
      ) : null}
    </div>
  );
}

function Report({ show, close }) {
  return (
    <div className="hm_st_f" style={{ visibility: show ? null : "hidden" }}>
      <div style={{ padding: 12, width: "100%", backgroundColor: "#04213C" }}>
        <Editheaderbutton
          content={
            <i className="fas fa-window-close" style={{ color: "skyBlue" }} />
          }
          hint="Close"
          onclick={close}
        />
        <span style={{ fontWeight: "bold", color: "white" }}>Reports</span>
      </div>
    </div>
  );
}

class StreamVisibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      status: this.props.item.post_status === 0,
    };
  }

  setstate = (v) => this.setState(v);

  render() {
    const { item } = this.props;
    const { status, loading } = this.state;
    return (
      <button
        className="stream_hide_butten"
        title={status ? "Hide Post" : "Make Post Visible"}
        disabled={loading}
        onClick={() => hidePost(this.setstate, item, status)}
      >
        {loading ? (
          <i className="fas fa-sync-alt" />
        ) : status ? (
          <i className="fas fa-eye-slash" />
        ) : (
          <i className="fas fa-eye" />
        )}
      </button>
    );
  }
}

function StreamTitle({ item, search }) {
  var data = item.description;
  var hash = false;
  var temp = "";
  var list_element = [];

  if (data === null) data = "";

  for (let i = 0; i < data.length; i++) {
    if (hash)
      if (data[i] === " " || data[i] === "#") {
        list_element.push([true, temp]);
        temp = "";
        if (data[i] === " ") hash = false;
      } else temp += data[i];
    else if (data[i] === "#") {
      list_element.push([false, temp]);
      temp = "";
      hash = true;
    } else temp += data[i];
  }

  if (hash) list_element.push([true, temp]);
  else list_element.push([false, temp]);

  return (
    <div
      className="stream_title_message"
      style={{ maxHeight: item.image != null ? 100 : 300 }}
    >
      {list_element.map((element) =>
        element[0] ? (
          <button
            onClick={() => search("feed/" + element[1])}
            style={{ color: "#2545E3", padding: 0, fontWeight: 500 }}
          >
            #{element[1]}
          </button>
        ) : (
          <span style={{ color: "rgba(0, 0, 0, 0.7)" }}> {element[1]}</span>
        )
      )}
    </div>
  );
}

var sort_filter = [
  // "New",  // "Only Non Hidden",
  "Hidden Only", // "Spams - Low to High",
  "Spams - High to Low", // "Only Spams",  // "No Spams",  // "Likes - Low to High",
  "Likes - High to Low", // "Commends - Low to High",
  "Commends - High to Low",
];

function Commends({ setState, state }) {
  const { cmd, commends, loadingCmdvisibility, errorCmd, loadingCmd } = state;
  return (
    <div
      className="hm_st_t"
      style={{ visibility: cmd == null ? "hidden" : null }}
    >
      <div className="hm_st_u">
        <div className="hm_cm1_atert_ttl">Commends</div>
        <Editheaderbutton
          content={<i className="fas fa-window-close c_skyBlue" />}
          hint="Close"
          onclick={() => setState({ cmd: null, commends: [] })}
        />
      </div>
      <div className="hm_st_v">
        {commends.map((item) => (
          <div className="hm_st_w">
            <div className="hm_st_y">
              <img
                src={
                  item.user.profile_image == null
                    ? require("../Assets/image/profile.png").default
                    : setImgUrl(item.user.profile_image)
                }
                alt=".."
                className="hm_st_x"
              />
              <div>
                <div className="hm_st_z">{item.user.name}</div>
                <div className="hm_st_ab">{item.comment_description}</div>
              </div>
            </div>
            <div className="hm_st_ac">
              <div className="hm_st_aa">
                Posted {moment().utc(item.created_at).fromNow()}
              </div>
              <div
                className="hm_st_ad"
                title={item.status ? "Hide Post" : "Make Post Visible"}
                disabled={loadingCmdvisibility}
                onClick={() => hideCommend(setState, state)}
              >
                {loadingCmdvisibility ? (
                  <i className="fas fa-sync-alt" />
                ) : item.status ? (
                  <i className="fas fa-eye-slash" />
                ) : (
                  <i className="fas fa-eye" />
                )}
              </div>
            </div>
          </div>
        ))}
        <HomeDatasetter
          loading={loadingCmd}
          error={errorCmd}
          items={commends}
          vacum={true}
        />
      </div>
    </div>
  );
}

// function SortButten({ selected }) {
//   return (
//     <button
//       className="filter_butten"
//       style={{ backgroundColor: selected ? "white" : "#04213c" }}
//     >
//       <div style={{ float: "left", width: 15, marginRight: 5, marginTop: 1 }}>
//         <input
//           type="checkbox"
//           checked={selected}
//           onChange={() => this.setState({ selected: !selected })}
//         />
//       </div>
//       {this.props.filter}
//     </button>
//   );
// }

class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      loading: true,
      stream_most_post: [],
      companies: [],
      search: false,
    };
  }

  componentDidMount() {
    getMostPostCreated((v) => this.setState(v));
  }

  render() {
    const { stream_most_post } = this.state;
    const { filter, settitle } = this.props;
    return (
      <React.StrictMode>
        <div className="sort_area">
          <div className="stream_sort_titles">
            Sort Your Stream <i className="fas fa-filter" />
          </div>
          <select
            id="location"
            class="hm_st_h "
            onChange={(e) => {
              if (e.target.value === "Spams - High to Low") {
                settitle("Spams - High to Low");
                filter("spam");
              }
              if (e.target.value === "Likes - High to Low") {
                settitle("Likes - High to Low");
                filter("highlikes");
              }
              if (e.target.value === "Commends - High to Low") {
                settitle("Commends - High to Low");
                filter("highcomments");
              }
              if (e.target.value === "Hidden Only") {
                settitle("Hidden Only");
                filter("hiddenonly");
              }
            }}
          >
            <option>Chose One Filter</option>
            {sort_filter.map((filter, k) => (
              <option value={filter}>{filter}</option>
            ))}
          </select>
        </div>

        <div className="sort_area">
          <div className="stream_sort_titles">
            Top Post Created Users <i className="fas fa-poll" />
          </div>
          {stream_most_post.slice(0, 10).map((member) =>
            member.streams_count === 0 ? null : (
              <div className="member">
                <div className="hm_st_g">
                  <img
                    src={
                      member.profile_image == null
                        ? require("../Assets/image/profile.png").default
                        : setImgUrl(member.profile_image)
                    }
                    alt={member.first_name}
                    className="stream_sort_member_image"
                  />
                  <div className="">
                    <div className="stream_sort_member_name">
                      {member.first_name}&nbsp;{member.last_name}
                    </div>
                    <div className="stream_sort_member_post">
                      {member.streams_count} Posts
                    </div>
                  </div>
                </div>
                <div
                  className="stream_sort_member_butten"
                  onClick={() => {
                    settitle(
                      <React.StrictMode>
                        Showing&nbsp;<b> {member.name}</b>&nbsp;Posts
                      </React.StrictMode>
                    );
                    filter(`user/${member.id}/stream`);
                  }}
                >
                  View Postes
                </div>
              </div>
            )
          )}
        </div>
        <div className="sort_area">
          <div className="stream_sort_titles">
            Sort Your Stream Based On Date <i className="far fa-calendar-alt" />
          </div>
          <form
            className="stream_filter_date"
            onSubmit={(e) => {
              e.preventDefault();
              var data = e.target;
              var fromdate = data.from_date.value + " " + data.from_time.value;
              var todate = data.to_date.value + " " + data.to_time.value;
              settitle(`Post From ${fromdate} to ${todate}`);
              filter(
                `feedsfilter?from_date=${fromdate}:00&${todate}=todate:00`
              );
            }}
          >
            <div style={{ color: "Gray", fontSize: 12 }}>From</div>
            <input
              className="stream_date"
              type="date"
              id="from_date"
              required
            />
            <input
              className="stream_date"
              type="time"
              id="from_time"
              defaultValue="00:00"
              required
            />
            <div style={{ color: "Gray", fontSize: 12 }}>To</div>
            <input className="stream_date" type="date" id="to_date" required />
            <input
              className="stream_date"
              type="time"
              id="to_time"
              defaultValue="23:59"
              required
            />
            <button className="stream_date_find_butten" type="submit">
              Find
            </button>
          </form>
        </div>
      </React.StrictMode>
    );
  }
}
