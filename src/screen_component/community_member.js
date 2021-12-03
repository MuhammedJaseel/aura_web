import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Editheaderbutton, FilterButton } from "../component/home_button";
import { RoundAddButton } from "../component/home_button";
import SingleMember from "../component/home_member";
import MyAlert from "../component/my_alert";
import { PopupLg, PopupXs } from "../component/popups";
import Datasetter from "../component/home_poser.js";
import api from "../module/api";
import { api_int_put, setImgUrl } from "../module/api_init";
import { addMember, deleteMember, setNameLetters } from "../method/community";
import { getMemeber, searchMember } from "../method/community";

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
      loading: true,
      error: null,
      items: [],
      locations: [],
      companies: [],
      search: false,
      loadingAdd: false,
      errorAdd: null,
      spocAdd: false,
      edit: null,
      loadingEdit: false,
      errorEdit: null,
      loadingDelete: false,
      errorDelete: null,
      showDelete: false,
    };
  }

  componentDidMount() {
    getMemeber((v) => this.setState(v));
  }

  render() {
    const { items, edit, loadingDelete, errorDelete } = this.state;
    const { showDelete, loading, error, search } = this.state;
    const setstate = (v) => this.setState(v);
    return (
      <React.StrictMode>
        <div className="hm_cy1_a">
          <RoundAddButton onclick={() => setstate({ showAdd: true })} />
          {search ? <i className="fas fa-search hm_cy1_b" /> : null}
          {search ? (
            <input
              className="hm_cy1_c"
              placeholder="Search.."
              onChange={(e) => searchMember(e, setstate)}
            />
          ) : null}
          {!search ? (
            <div
              className="hm_cy1_d"
              onClick={() => setstate({ search: true })}
            >
              <i className="fas fa-search text-white" />
            </div>
          ) : null}

          <FilterButton
            body={
              <React.StrictMode>
                <i className="fas fa-filter hm_cy1_e" />
                <h6 style={{ float: "left" }}>Filters</h6>
              </React.StrictMode>
            }
          />
        </div>
        <div className="hm_cm1_title">Manage Members</div>
        {items.map((item, key) => (
          <SingleMember
            onclick={() => setstate({ edit: item })}
            img={item.profile_image}
            f_name={item.first_name ?? "u"}
            l_name={item.last_name ?? "n"}
            email={item.email}
            mobile={item.mobile}
          />
        ))}
        <Edit setState={setstate} state={this.state} />
        <MyAlert
          show={showDelete}
          close={() => this.setState({ showDelete: false, errorDelete: "" })}
          body={
            <>
              <b>Are you sure want to Delete it?</b>
              <div style={{ color: "gray" }}>
                If you delete this Company, the related Members alose get
                deleted.
              </div>
              <div style={{ color: "darkgreen" }}>{errorDelete}</div>
            </>
          }
          loading={loadingDelete}
          onconform={() => deleteMember(setstate, edit)}
        />
        <Datasetter loading={loading} error={error} items={items} />
        <Add setState={setstate} state={this.state} />
      </React.StrictMode>
    );
  }
}

export default Members;

class EditSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editstatus: false,
    };
  }

  render() {
    const { edit, data, confirm } = this.props;
    const { editstatus } = this.state;
    return editstatus ? (
      <div className="hm_cy1_f">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await confirm(e.target);
            this.setState({ editstatus: false });
          }}
        >
          <div style={{ height: 40 }}>{edit}</div>
          <div className="hm_cy1_g">
            <div
              className="hm_cy1_h"
              onClick={() => this.setState({ editstatus: false })}
            >
              <i className="fa fa-remove" />
              Cancel
            </div>
            <div type="submit" className="hm_cy1_i">
              <i className="fas fa-upload" />
              Confirm
            </div>
          </div>
        </form>
      </div>
    ) : (
      <React.StrictMode>
        {data}
        <button
          className="hm_cy1_j"
          onClick={() => this.setState({ editstatus: true })}
        >
          <i className="fas fa-pencil-alt" />
          Edit
        </button>
        <br />
      </React.StrictMode>
    );
  }
}

function Edit({ setState, state }) {
  const { loadingEdit, errorEdit, edit, locations, companies } = state;
  const item = edit;

  async function api_member_put(data) {
    setState({ loadingEdit: true, errorEdit: null });
    var _api = api.members + "/" + this.props.item.id;
    var result = await api_int_put(_api, data);
    if (result.err) setState({ errorEdit: result.data });
    else this.props.reload();
    setState({ loadingEdit: false });
  }
  function textbox(id, ph = "Text", type = "text") {
    return (
      <Form.Control
        placeholder={ph}
        type={type}
        id={id}
        required
        defaultValue={item[id]}
      />
    );
  }

  return (
    <PopupXs
      show={item !== null}
      body={
        item === null ? null : (
          <>
            <div className="hm_cy1_k">
              <div className="hm_cy1_ad">
                {item.profile_image != null ? (
                  <img
                    src={setImgUrl(item.profile_image)}
                    className="hm_cy1_l"
                    alt="User"
                  />
                ) : (
                  <div className="hm_cy1_m">{setNameLetters(item)}</div>
                )}
                <div className="hm_cy1_ae">
                  <div className="hm_cy1_n">
                    {item.first_name + " " + item.last_name}
                  </div>
                  <div className="hm_cy1_o">{item.email}</div>
                </div>
              </div>
              <div className="hm_cy1_af">
                <Editheaderbutton
                  content={<i className="fas fa-trash-alt c_deletered" />}
                  hint="Delete"
                  onclick={() => setState({ showDelete: true })}
                />
                <Editheaderbutton
                  content={<i className="fas fa-window-close c_skyBlue" />}
                  hint="Close"
                  onclick={() => setState({ edit: null })}
                />
              </div>
            </div>
            <div style={{ padding: 20, backgroundColor: "#fefefe" }}>
              <EditSingle
                edit={
                  <div className="hm_cy1_p">
                    {textbox("first_name")}
                    {textbox("last_name")}
                  </div>
                }
                confirm={(data) =>
                  api_member_put({
                    first_name: data.first_name.value,
                    last_name: data.last_name.value,
                  })
                }
                data={<b>{item.first_name + " " + item.last_name}</b>}
                header={true}
              />
              <div className="profile_inside">
                <EditSingle
                  edit={textbox("name")}
                  confirm={(data) => api_member_put({ name: data.name.value })}
                  data={
                    <>
                      <div className="profile_sub_title">
                        <i className="far fa-address-card memberdisicon" />
                        User Name
                      </div>
                      <span className="profile_sub_data">{item.name}</span>
                    </>
                  }
                />
                <hr style={{ margin: 5 }} />
                <EditSingle
                  edit={textbox("email", "example@mail.com", "email")}
                  confirm={(data) =>
                    api_member_put({ email: data.email.value })
                  }
                  data={
                    <>
                      <div className="profile_sub_title">
                        <i className="fas fa-envelope-open memberdisicon" />
                        Email
                      </div>
                      <span className="profile_sub_data">{item.email}</span>
                    </>
                  }
                />
                <hr style={{ margin: 5 }} />
                <EditSingle
                  confirm={(data) => {
                    setState({ loadingEdit: true, errorEdit: null });
                    var location_name = "";
                    for (let i = 0; i < locations.length; i++)
                      if (locations[i].id === data.work_station.value) {
                        location_name = locations[i].location_name;
                        break;
                      }
                    api_member_put({
                      work_station: data.work_station.value,
                      location: location_name,
                    });
                  }}
                  edit={
                    <select
                      id="work_station"
                      className="form-control"
                      required
                      defaultValue={item.work_station}
                    >
                      {locations.map((location, k) => (
                        <option key={k} value={location.id}>
                          {location.location_name}
                        </option>
                      ))}
                    </select>
                  }
                  data={
                    <>
                      <div className="profile_sub_title">
                        <i className="fas fa-map-marker-alt memberdisicon" />
                        Location
                      </div>
                      <span className="profile_sub_data">{item.location}</span>
                    </>
                  }
                />
                <hr style={{ margin: 5 }} />
                <EditSingle
                  confirm={(data) => {
                    setState({ loadingEdit: true, errorEdit: null });
                    var company_name = "";
                    for (let j = 0; j < companies.length; j++)
                      if (companies[j].id === data.working_company.value) {
                        company_name = companies[j].company_name;
                        break;
                      }
                    api_member_put({
                      working_company: data.working_company.value,
                      company: company_name,
                    });
                  }}
                  edit={
                    <select
                      id="working_company"
                      className="form-control"
                      required
                      defaultValue={item.working_company}
                    >
                      {companies.map((company, k) => (
                        <option key={k} value={company.id}>
                          {company.company_name}
                        </option>
                      ))}
                    </select>
                  }
                  data={
                    <>
                      <div className="profile_sub_title">
                        <i className="	fas fa-building memberdisicon" />
                        Company
                      </div>
                      <span className="profile_sub_data">{item.company}</span>
                    </>
                  }
                />
                <hr style={{ margin: 5 }} />
                <EditSingle
                  confirm={(data) =>
                    api_member_put({ mobile: data.mobile.value })
                  }
                  edit={textbox("mobile", "95XXXXXX63", "number")}
                  data={
                    <>
                      <div className="profile_sub_title">
                        <i className="fas fa-phone memberdisicon " />
                        Phone Number
                      </div>
                      <span className="profile_sub_data">{item.mobile}</span>
                    </>
                  }
                />
                <hr style={{ margin: 5 }} />
                <EditSingle
                  confirm={(data) =>
                    api_member_put({ designation: data.designation.value })
                  }
                  edit={textbox("designation")}
                  data={
                    <>
                      <div className="profile_sub_title">
                        <i className="fab fa-discord memberdisicon " />
                        Designation
                      </div>
                      <span className="profile_sub_data">
                        {item.designation}
                      </span>
                    </>
                  }
                />
                <hr style={{ margin: 5 }} />
                <div style={{ paddingLeft: 24 }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="spoc"
                    style={{ height: 15, width: 15 }}
                    checked={item.spoc === 1 ? true : false}
                    onChange={() =>
                      api_member_put({ spoc: item.spoc === 1 ? 0 : 1 })
                    }
                  />
                  SPOC
                </div>
              </div>
              <errormsg>{errorEdit}</errormsg>
              {loadingEdit ? <loading>Loading...</loading> : null}
            </div>
          </>
        )
      }
    />
  );
}

function Add({ state, setState }) {
  function textbox(label, id, ph = "Text", type = "text") {
    return (
      <Col sm="12" lg="3">
        <label>{label}</label>
        <Form.Control placeholder={ph} type={type} id={id} required />
      </Col>
    );
  }
  return (
    <PopupLg
      show={state.showAdd}
      body={
        <React.StrictMode>
          <div className="hm_cy1_q">
            <span style={{ fontWeight: "bold", color: "white" }}>
              Add Members
            </span>
            <Editheaderbutton
              content={<i className="fas fa-window-close c_skyBlue" />}
              hint="Close"
              onclick={() => setState({ showAdd: false })}
            />
          </div>
          <div className="hm_cy1_ab">
            <form
              id="member_add_form"
              onSubmit={(e) => addMember(e, setState, state)}
            >
              <Row>
                {textbox("First Name", "first_name")}
                {textbox("Last Name", "last_name")}
                {textbox("User Name", "name")}
                {textbox("Email", "email", "example@mail.com", "email")}
              </Row>
              <Row>
                <Col sm="12" lg="3">
                  <label>Work Location</label>
                  <select id="work_station" className="form-control" required>
                    {state.locations.map((location, k) => (
                      <option key={k} value={k}>
                        {location.location_name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col sm="12" lg="3">
                  <label>Working Company</label>
                  <select
                    id="working_company"
                    className="form-control"
                    required
                  >
                    {state.companies.map((company, k) => (
                      <option key={k} value={k}>
                        {company.company_name}
                      </option>
                    ))}
                  </select>
                </Col>
                {textbox("Mobile", "mobile", "95XXXXXX63", "number")}
                {textbox("Designation", "designation")}
              </Row>
              <Row>
                {textbox("Password", "password", "Password", "password")}
                {textbox(
                  "Confirm Password",
                  "cpassword",
                  "Re Enter Password",
                  "password"
                )}
              </Row>

              <div className="hm_cy1_ac">
                <input
                  type="checkbox"
                  id="spoc"
                  onChange={() => setState({ spocAdd: !state.spoc })}
                />
                &nbsp; SPOC (Special point of contact) A company member who can
                receive/pay invoices
              </div>

              <div className="hm_cy1_aa">
                <label style={{ color: "red" }}>{state.errorAdd}</label>
                <button
                  type="submit"
                  disabled={state.loadingAdd}
                  className="hm_cy1_r"
                  style={{ background: state.loadingAdd ? "gray" : "darkblue" }}
                >
                  {state.loadingAdd ? "Loading.." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </React.StrictMode>
      }
    />
  );
}
