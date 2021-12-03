import React, { useEffect, useRef } from "react";
import api from "../module/api";
import { Button, Form } from "react-bootstrap";
import Datasetter from "../component/home_poser.js";
import { api_int_get, api_int_post } from "../module/api_init";
import { PopupLg } from "../component/popups";
import { Editheaderbutton, ExportButton } from "../component/home_button";
import { FilterButton } from "../component/home_button";
import { exportData, filterTickets, getTickets } from "../method/support";
import { pageDown, pageUp } from "../method/support";

export default class Tickets extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      loading: true,
      items: [],
      maxPage: 1,
      page: 1,
      showExport: false,
      erorrExport: null,
      loadingExport: false,
      showFilter: false,
      erorrFilter: null,
      loadingFilter: false,
      members: [],
      teamMembers: [],
    };
  }

  componentDidMount() {
    getTickets((v) => this.setState(v), this.state);
  }

  render() {
    const { items, loading, error, maxPage, page } = this.state;
    const setState = (v) => this.setState(v);
    return (
      <div className="hm_su1_a">
        <div className="hm_su1_b">
          <div className="hm_cm1_title">Support Tickets</div>
          <div className="hm_su1_c">
            <Export setState={setState} state={this.state} />
            <Filter
              setState={setState}
              state={this.state}
              reload={() => getTickets(setState, this.state)}
              filter={(v) => filterTickets(setState, v)}
            />
          </div>
        </div>
        <div className="hm_su1_d">Showing {items.length} Result</div>
        <div style={{ background: "white" }}>
          <div className="ticket_list_header">
            <div className="ticket_titles ticket_column_lg">Ticket No</div>
            <div className="ticket_titles ticket_column_lg">Issue Type</div>
            <div className="ticket_titles ticket_column_sm">Status</div>
            <div className="ticket_titles ticket_column_lg">Assigned To</div>
            <div className="ticket_titles ticket_column_lg">Time</div>
            <div className="ticket_titles ticket_column_sm">View</div>
          </div>
          {items.map((item, k) => (
            <Eachtickets
              key={k}
              item={item}
              reload={() => getTickets(setState, this.state)}
            />
          ))}
        </div>
        <Datasetter
          loading={loading}
          error={error}
          items={items}
          vacum={true}
        />
        <div className="hm_su1_g">
          <div
            className="hm_su1_f"
            onClick={() => pageDown(setState, this.state)}
          >
            Prev
          </div>
          {page}/{maxPage}
          <div
            className="hm_su1_f"
            onClick={() => pageUp(setState, this.state)}
          >
            More
          </div>
        </div>
      </div>
    );
  }
}

class Eachtickets extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      loading: true,
      items: [],
      label: "",
      show: false,
      show_assign: false,
      message_loading: false,
      messages: [],
      message_error: null,
      team_members: [],
    };
  }

  async loaditems() {
    var result = await api_int_get(api.teammember);
    if (result.err) this.setState({ error: result.data });
    else this.setState({ team_members: result.data });
    this.setState({ loading: false });
  }

  load_messages = async (id) => {
    var result = await api_int_get(`${api.baseapi}supportticket/${id}/comment`);
    if (result.err) this.setState({ error: result.data });
    else this.setState({ messages: result.data[0].comment });
    this.setState({ message_loading: false });
  };

  componentDidMount() {
    this.loaditems();
  }

  render() {
    const {
      show,
      show_assign,
      message_error,
      messages,
      message_loading,
      team_members,
    } = this.state;
    const { item, reload } = this.props;
    return (
      <React.StrictMode>
        <div style={{ height: 50, display: "flex" }}>
          <div className="ticket_content ticket_column_lg">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span className="text-info">#{item.id}&nbsp;</span>
              <b> {item.user.name}</b>
            </div>
            <div style={{ fontSize: 12 }}>
              <i
                className="fas fa-location-arrow pr-1"
                style={{ fontSize: 10 }}
              />
              {item.location.location_name}
            </div>
          </div>
          <div className="ticket_content ticket_column_lg">
            <span style={{ fontSize: 14, whiteSpace: "nowrap" }}>
              {item.subcategory.sub_category}
            </span>
          </div>
          <div
            className="ticket_content ticket_column_sm"
            style={{
              color:
                item.status === "Pending"
                  ? "red"
                  : item.status === "Assigned"
                  ? "orange"
                  : item.status === "Closed"
                  ? "green"
                  : "gray",
            }}
          >
            {item.status}
          </div>
          <div className="ticket_content ticket_column_lg">
            {item.assigned_person === null ? (
              <span style={{ color: "red" }}> Not Assigned</span>
            ) : (
              <b> {item.assigned_person.assigned_to}</b>
            )}
          </div>
          <div className="ticket_content ticket_column_lg">
            <span style={{ fontSize: 14 }}>
              {item.created_at.substr(0, 10)}&nbsp;
              {item.created_at.substr(11, 5)}
            </span>
          </div>
          <div className="ticket_content ticket_column_sm">
            <Button
              className="btn-fill pt-1"
              style={{ height: 29, fontSize: 13 }}
              variant="info"
              onClick={() => {
                this.setState({ show: true, message_loading: true });
                this.load_messages(item.id);
              }}
            >
              View
            </Button>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "#eee", margin: 5 }} />
        <View
          item={item}
          show={show}
          messages={messages}
          message_error={message_error}
          message_loading={message_loading}
          close={() => this.setState({ show: false })}
          show_assign={() => this.setState({ show_assign: true })}
          load_messages={this.load_messages}
        />
        <AssignPopup
          item={item}
          show={show_assign}
          close={() => this.setState({ show_assign: false })}
          team_members={team_members}
          reload={reload}
        />
      </React.StrictMode>
    );
  }
}

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      loading: true,
      items: [],
      label: "",
      message_box_dissabled: false,
      my_message: "",
    };
  }

  render() {
    const {
      show,
      show_assign,
      message_error,
      item,
      messages,
      message_loading,
      load_messages,
    } = this.props;
    const { message_box_dissabled, my_message } = this.state;

    return (
      <PopupLg
        show={show}
        body={
          <>
            <div className="hm_su1_e">
              <div className="hm_cm1_atert_ttl">Tocken</div>
              <div className="row">
                <Editheaderbutton
                  content={<i className="fas fa-user-check c_skyBlue" />}
                  hint="Assign"
                  onclick={show_assign}
                />
                <Editheaderbutton
                  content={<i className="fas fa-window-close c_skyBlue" />}
                  hint="Close"
                  onclick={this.props.close}
                />
              </div>
            </div>
            <div
              style={{ padding: 10, backgroundColor: "#fefefe", height: "80%" }}
            >
              <div className="ticket_chat_body ">
                <div
                  style={{ position: "relative", height: "calc(100% - 30px)" }}
                >
                  <div className="ticket_chat_inside_body">
                    {messages.reverse().map((message) =>
                      message.created_by === "0" ? (
                        <div style={{ paddingRight: "15%" }}>
                          <div
                            className="ticket_message"
                            style={{ backgroundColor: "#cfc" }}
                          >
                            {message.message}
                            <div style={{ fontSize: 12, textAlign: "right" }}>
                              {message.created_at.substr(11, 5)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ paddingLeft: "15%" }}>
                          <div
                            className="ticket_message"
                            style={{
                              backgroundColor: "#ccf",
                              textAlign: "right",
                            }}
                          >
                            {message.message}
                            <div style={{ fontSize: 12, textAlign: "left" }}>
                              {message.created_at.substr(11, 5)}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <Datasetter
                      loading={message_loading}
                      error={message_error}
                      items={messages}
                      vacum={true}
                      onreload={() => load_messages(item.id)}
                    />
                    <AlwaysScrollToBottom />
                  </div>
                </div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    this.setState({ message_box_dissabled: true });

                    var result = await api_int_post(api.ticket_sent_msg, {
                      supportticket_id: item.id,
                      message: e.target.message.value,
                    });

                    if (result.err) alert("Something went wrong");
                    else {
                      load_messages(item.id);
                      this.setState({ my_message: "" });
                    }

                    this.setState({ message_box_dissabled: false });
                  }}
                >
                  <button
                    style={{
                      float: "right",
                      width: 90,
                      backgroundColor: "darkblue",
                      height: 35,
                      borderRadius: 5,
                      color: "white",
                    }}
                    type="submit"
                  >
                    Send
                    <i className="fa fa-send" />
                  </button>
                  <Form.Control
                    id="message"
                    placeholder="Replay..."
                    disabled={message_box_dissabled}
                    style={{ width: "calc(100% - 100px)" }}
                    value={my_message}
                    onChange={(e) =>
                      this.setState({ my_message: e.target.value })
                    }
                  />
                </form>
              </div>
              <div className="ticket_details_body ">
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">Ticket ID :</div>
                  <b>#{item.id}</b>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">Created By :</div>
                  {item.user.name}
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">Status :</div>
                  <span
                    style={{
                      color:
                        item.status === "Pending"
                          ? "red"
                          : item.status === "Assigned"
                          ? "orange"
                          : item.status === "Closed"
                          ? "green"
                          : "gray",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">
                    Created Time :
                  </div>
                  {item.created_at.split("T")[1].split(".")[0]}
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">
                    Created Date :
                  </div>
                  {item.created_at.split("T")[0]}
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">Dscription :</div>
                  {item.ticket_description}
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">Category :</div>
                  {item.subcategory.sub_category}
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">Location :</div>
                  {item.location.location_name}
                </div>
                <div style={{ display: "flex" }}>
                  <div className="ticket_details_each_title">Assigned To :</div>
                  {item.assigned_person === null
                    ? "Not Assigned"
                    : item.assigned_person.assigned_to}
                </div>
                {item.image !== null ? (
                  <img
                    className="ticket_image"
                    alt="..."
                    src={
                      "https://mobileapp.kalyaniaura.com/storage/" +
                      item.image.split("/")[1]
                    }
                  />
                ) : null}
              </div>
            </div>
          </>
        }
      />
    );
  }
}

class AssignPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      items: [],
      label: "",
      assigned_date_state: "",
      assigned_time_state: "00:00",
      closed_date_state: "",
      closed_time_state: "00:00",
      assigned_member_index: -1,
    };
  }

  async assignment_api_calls(data) {
    var result = await api_int_post(api.ticket_assign, data);
    if (result.err)
      alert(
        "Something is Wrong on updating your data try it again by reloading the whole page"
      );
    else this.props.reload();
  }

  componentDidMount() {
    var temp_item = this.props.item.assigned_person;
    if (temp_item !== null) {
      if (temp_item.task_assigned_time != null)
        this.setState({
          assigned_date_state: temp_item.task_assigned_time.substr(0, 10),
          assigned_time_state: temp_item.task_assigned_time.substr(11, 4),
        });
      if (temp_item.task_solved_time != null)
        this.setState({
          closed_date_state: temp_item.task_solved_time.substr(0, 10),
          closed_time_state: temp_item.task_solved_time.substr(11, 4),
        });
    }
  }

  render() {
    const { show, item, team_members } = this.props;
    const { assigned_date_state, assigned_time_state } = this.state;
    const { closed_date_state, closed_time_state } = this.state;

    return (
      <PopupLg
        show={show}
        body={
          <>
            <div className="hm_su1_e">
              <div className="hm_cm1_atert_ttl">Assign This Tocken</div>
              <Editheaderbutton
                content={<i className="fas fa-window-close c_skyBlue" />}
                hint="Close"
                onclick={this.props.close}
              />
            </div>
            <div
              style={{ padding: 10, backgroundColor: "#fefefe", height: 280 }}
            >
              <div style={{ height: 120 }}>
                <b>Ticket Assigment</b>
                <br />
                <div style={{ float: "left", width: "31%", margin: "1%" }}>
                  <label>Chose a Member</label>
                  <select
                    className="form-control"
                    defaultValue={
                      item.assigned_person !== null
                        ? item.assigned_person.assigned_person_id
                        : null
                    }
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        let person_name = "";
                        for (let i = 0; i < team_members.length; i++)
                          if (
                            team_members[i].id.toString() === e.target.value
                          ) {
                            person_name = team_members[i].user_name;
                            break;
                          }
                        this.assignment_api_calls({
                          support_ticket_id: item.id,
                          assigned_person_id: e.target.value,
                          assigned_to: person_name,
                        });
                      } else alert("Asseign a Member");
                    }}
                  >
                    <option value="">Not Assigned</option>
                    {team_members.map((member, k) => (
                      <option value={member.id.toString()} name={k} key={k}>
                        {member.user_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ float: "left", width: "31%", margin: "1%" }}>
                  <label>Priority</label>
                  <select
                    className="form-control"
                    required
                    defaultValue={
                      item.assigned_person !== null
                        ? item.assigned_person.remarks
                        : null
                    }
                    onChange={(e) =>
                      this.assignment_api_calls({
                        support_ticket_id: item.id,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div style={{ float: "left", width: "31%", margin: "1%" }}>
                  <label>Assigned Time</label>
                  <div>
                    <form
                      onChange={(e) => {
                        if (
                          document.getElementById("assigned_data").value !== ""
                        )
                          this.assignment_api_calls({
                            support_ticket_id: item.id,
                            task_assigned_time:
                              document.getElementById("assigned_data").value +
                              " " +
                              document.getElementById("assigned_time").value,
                          });
                      }}
                    >
                      <div
                        style={{ float: "left", width: "60%", margin: "1%" }}
                      >
                        <Form.Control
                          type="date"
                          id="assigned_data"
                          defaultValue={assigned_date_state}
                        />
                      </div>
                      <div
                        style={{ float: "left", width: "35%", margin: "1%" }}
                      >
                        <Form.Control
                          type="time"
                          id="assigned_time"
                          defaultValue={assigned_time_state}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div style={{ height: 120 }}>
                <b>Ticket Clouser</b>
                <br />
                <div style={{ float: "left", width: "31%", margin: "1%" }}>
                  <label>Ticket Status {item.id}</label>
                  <select
                    defaultValue={
                      item.assigned_person !== null
                        ? item.assigned_person.status
                        : null
                    }
                    className="form-control"
                    required
                    onChange={(e) =>
                      this.assignment_api_calls({
                        support_ticket_id: item.id,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Created">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Closed">Closed</option>
                    <option value="Due">Due</option>
                  </select>
                </div>
                <div style={{ float: "left", width: "31%", margin: "1%" }}>
                  <label>Closed Time</label>
                  <div>
                    <form
                      onChange={(e) => {
                        if (document.getElementById("closed_data").value !== "")
                          this.assignment_api_calls({
                            support_ticket_id: item.id,
                            task_solved_time:
                              document.getElementById("closed_data").value +
                              " " +
                              document.getElementById("closed_time").value,
                          });
                      }}
                    >
                      <div
                        style={{ float: "left", width: "60%", margin: "1%" }}
                      >
                        <Form.Control
                          type="date"
                          id="closed_data"
                          defaultValue={closed_date_state}
                        />
                      </div>
                      <div
                        style={{ float: "left", width: "35%", margin: "1%" }}
                      >
                        <Form.Control
                          type="time"
                          id="closed_time"
                          defaultValue={closed_time_state}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div style={{ float: "left", width: "31%", margin: "1%" }}>
              <label>Clouser Update Time</label>
              <div>
                <form
                  onChange={(e) => {
                    // if (e.target.update_data.value !== null)
                    //   this.assignment_api_calls({
                    //     support_ticket_id: item.id,
                    //     task_assigned_time:
                    //       e.target.update_data.value +
                    //       " " +
                    //       e.target.update_time.value,
                    //   });
                  }}
                >
                  <div style={{ float: "left", width: "60%", margin: "1%" }}>
                    <Form.Control type="date" id="update_data" />
                  </div>
                  <div style={{ float: "left", width: "35%", margin: "1%" }}>
                    <Form.Control
                      type="time"
                      id="update_time"
                      defaultValue="00:00"
                    />
                  </div>
                </form>
              </div>
            </div> */}
              </div>
            </div>
          </>
        }
      />
    );
  }
}

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      team_members: [],
      members: [],
      filters_status: {
        status: true,
        member: true,
        team_member: true,
        date: true,
      },
    };
  }

  async loaditems() {
    var result1 = await api_int_get(api.teammember);
    var result2 = await api_int_get(api.members);

    if (result1.err) this.setState({ error: result1.data });
    else this.setState({ team_members: result1.data });

    if (result2.err) this.setState({ error: result2.data });
    else this.setState({ members: result2.data });
  }

  componentDidMount() {
    this.loaditems();
  }

  change_status(e) {
    var _status = this.state.filters_status;
    _status[e] = !_status[e];
    this.setState({ filters_status: _status });
  }

  sort(e) {
    e.preventDefault();
    const { status, member } = this.state.filters_status;
    let body = "?";
    if (!status) body += `status=${e.target.status.value}&`;
    if (!member) body += `user_id=${e.target.member.value}&`;
    // if (!team_member) body += `${e.target.team_member.value}&`;
    // if (date) body += `${e.target.date.value}&`
    this.props.filter(body);
  }

  render() {
    const { error, filters_status, members } = this.state;
    const { reload } = this.props;
    return (
      <FilterButton
        body={
          <form onSubmit={(e) => this.sort(e)}>
            <div className="filter_single_row">
              <input
                type="checkbox"
                className="filter_checkbox"
                onChange={() => this.change_status("status")}
              />
              <span className="filter_each_title">Status : </span>
              <select
                className="filter_dropdown"
                disabled={filters_status.status}
                id="status"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="Closed">Closed</option>
                <option value="Due">Due</option>
              </select>
            </div>

            <div className="filter_single_row">
              <input
                type="checkbox"
                className="filter_checkbox"
                onChange={() => this.change_status("member")}
              />
              <span className="filter_each_title">Member :</span>
              <select
                className="filter_dropdown"
                id="member"
                disabled={filters_status.member}
              >
                <option value="">All</option>
                {members.map((member, key) => (
                  <option key={key} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="filter_single_row">
              <input
                type="checkbox"
                className="filter_checkbox"
                onChange={() => this.change_status("team_member")}
              />
              <span className="filter_each_title">Team Member : </span>
              <select
                class="filter_dropdown"
                id="team_member"
                disabled={filters_status.team_member}
              >
                <option value="">All</option>
                {team_members.map((member) => (
                  <option value={member.id}>{member.user_name}</option>
                ))}
              </select>
            </div> */}

            <div className="filter_single_row">
              <input
                type="checkbox"
                className="filter_checkbox"
                onChange={() => this.change_status("date")}
              />
              <span className="filter_each_title">Filter On Date : </span>
              <input
                className="filter_date_input"
                type="date"
                id="from_date"
                required
                disabled={filters_status.date}
              />
              <input
                className="filter_time_input"
                type="time"
                id="from_time"
                required
                disabled={filters_status.date}
              />
            </div>

            <div className="filter_single_row">
              <div className="filter_checkbox" />
              <span className="filter_each_title"></span>
              <input
                className="filter_date_input"
                id="to_date"
                type="date"
                required
                disabled={filters_status.date}
              />
              <input
                className="filter_time_input"
                id="to_time"
                type="time"
                required
                disabled={filters_status.date}
              />
            </div>

            <div style={{ marginTop: 5, height: 26 }}>
              <button
                className="filter_sort_button ml-1"
                type="button"
                onClick={reload}
              >
                View All
              </button>
              {filters_status.status &&
              filters_status.member &&
              filters_status.date ? null : (
                <button className="filter_sort_button" type="submit">
                  Sort
                </button>
              )}
              {/* <button
                className="filter_clear_button"
                onClick={() =>
                  this.setState({
                    filters_status: {
                      status: true,
                      member: true,
                      team_member: true,
                      date: true,
                    },
                  })
                }
              >
                Clear
              </button> */}
              <div style={{ color: "red" }}>{error}</div>
            </div>
          </form>
        }
      />
    );
  }
}

function Export({ setState, state }) {
  return (
    <ExportButton
      body={
        <>
          It's only export the data available in your screen
          <div style={{ marginTop: 5, height: 30 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                exportData(state.items, e.target.file_name.value);
                setState({ showExport: false });
              }}
            >
              <input
                className="export_file_name"
                placeholder="Enter Your File Name"
                id="file_name"
                required
              />
              <button
                className="export_inside_button"
                onClick={() => setState({ showExport: true })}
              >
                <i className="fas fa-file-archive p-1" />
                Export
              </button>
            </form>
            <div style={{ color: "red" }}>{state.errorExport}</div>
          </div>
        </>
      }
    />
  );
}
