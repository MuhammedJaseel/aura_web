import React from "react";
import { MyBarChart, MyLineChart } from "../component/dashbord_chart";
import HomeHeader from "../component/home_header";
import getDashboard from "../method/dashboart";

function Mycard(props) {
  return (
    <div className="dashbord_small_card" onClick={props.onclick}>
      <div className="hm_db1_a">
        <div className="hm_db1_b">
          <div className="dashbord_small_card_icon">
            <i style={{ color: props.color }} className={props.icon} />
          </div>
          <div>
            <div className="dashbord_small_card_title">{props.title}</div>
            <div className="dashbord_small_card_sub_title">
              {props.low_title}
            </div>
            <div className="dashbord_small_card_status">{props.high_title}</div>
          </div>
        </div>
        <div className="dashbord_small_card_value">{props.value}</div>
      </div>
    </div>
  );
}

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      items: {
        location: {
          total_location: "...",
          active_location: "...",
          inactive_location: "...",
        },
        company: {
          total_company: "...",
          active_company: "...",
          inactive_company: "...",
        },
        member: {
          total_member: "...",
          active_member: "...",
          inactive_member: "...",
        },
        team: {
          total_team_member: "...",
          active_team_member: "...",
          inactive_team_member: "...",
        },
        ticket: {
          total_ticket: "...",
          active_ticket: "...",
          inactive_ticket: "...",
        },
        stream: {
          total_stream: "...",
          active_stream: "...",
          inactive_stream: "...",
        },
        announcement: "...",
      },
      loading: true,
    };
  }

  setstate = (v) => this.setState(v);

  componentDidMount() {
    getDashboard(this.setstate);
  }

  render() {
    const { items } = this.state;
    const colors = [
      "blue",
      "red",
      "green",
      "orange",
      "#D81B52",
      "#DAF7A6",
      "#FFC300",
      "#C70039",
    ];
    return (
      <>
        <HomeHeader title={"Dashboard"} />
        <div className="dashbord_body">
          <Mycard
            title="Location"
            value={items.location.total_location}
            low_title={items.location.active_location + " Active"}
            // high_title={items.location.inactive_location + " Inactive"}
            icon="fas fa-map-marker-alt"
            color={colors[0]}
            onclick={() => {
              window.sessionStorage.spacepage = "1";
              window.location.replace("/admin/space");
            }}
          />
          <Mycard
            title="Company"
            value={items.company.total_company}
            low_title={items.company.active_company + " Active"}
            // high_title={items.company.inactive_company + " Inactive"}
            icon="fas fa-building"
            color={colors[1]}
            onclick={() => {
              window.sessionStorage.communitypage = "2";
              window.location.replace("/admin/community");
            }}
          />
          <Mycard
            title="Member"
            value={items.location.total_location}
            low_title={items.location.active_location + " Active"}
            // high_title={items.location.inactive_location + " Inactive"}
            icon="fas fa-layer-group"
            color={colors[2]}
            onclick={() => {
              window.sessionStorage.communitypage = "1";
              window.location.replace("/admin/community");
            }}
          />
          <Mycard
            title="Support Team"
            value={items.team.total_team_member}
            low_title={items.team.active_team_member + " Active"}
            // high_title={items.team.inactive_team_member + " Inactive"}
            icon="fas fa-headset"
            color={colors[3]}
            onclick={() => window.location.replace("/admin/manageteam")}
          />
          <Mycard
            title="Ticket"
            value={items.ticket.total_ticket}
            low_title={items.ticket.active_ticket + " Active"}
            // high_title={items.ticket.inactive_ticket + " Inactive"}
            icon="far fa-money-bill-alt"
            color={colors[4]}
            onclick={() => {
              window.sessionStorage.supportpage = "3";
              window.location.replace("/admin/supports");
            }}
          />
          <Mycard
            title="Stream"
            value={items.stream.total_stream}
            low_title={items.stream.active_stream + " Active Posts"}
            // high_title={items.stream.inactive_stream + " Inactive"}
            icon="fas fa-book-reader"
            color={colors[5]}
            onclick={() => window.location.replace("/admin/stream")}
          />
          <Mycard
            title="Announcement"
            value={items.announcement}
            low_title={"Events"}
            icon="fas fa-calendar-alt"
            color={colors[6]}
            onclick={() => window.location.replace("/admin/announcements")}
          />
          <Mycard
            title="Visitors"
            value="0"
            low_title="Accepted Request"
            // high_title="Pending Request"
            icon="fas fa-biking"
            color={colors[7]}
            subicon="fas fa-redo"
          />
        </div>
        <div className="hm_db1_c">
          <div className="dashbord_large_card">
            <MyBarChart />
          </div>

          <div className="dashbord_large_card">
            <MyLineChart />
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
