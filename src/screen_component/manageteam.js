import React from "react";
import { PopupMd, PopupLg, PopupXs, PopupSm } from "../component/popups";
import { Editheaderbutton, RoundAddButton } from "../component/home_button";
import { Col, Form, Row } from "react-bootstrap";
import {
  api_int_delete,
  api_int_post,
  api_int_put,
  setImgUrl,
} from "../module/api_init";
import api from "../module/api";
import MyAlert from "../component/my_alert";
import HomeDatasetter from "../component/home_poser.js";
import HomeHeader from "../component/home_header";
import SingleMember from "../component/home_member";
import { addRole, deleteRole, getManageteam } from "../method/manageteam";
import { updateRole } from "../method/manageteam";

export default class HomeManageteam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      items: [],
      locations: [],
      scops: [],
      roles: [],
      showAdd: false,
      loadingAdd: false,
      errorAdd: null,
      edit: null,
      loadingEdit: false,
      errorEdit: null,
      showDelete: false,
      loadingDelete: false,
      errorDelete: null,
      showRole: false,
      errorRoles: null,
      loadingRoles: false,
      editRole: null,
      showDeleteRole: false,
      showPermission: false,
      loadingPermission: false,
      errorPermission: null,
      spocAdd: false,
    };
  }

  componentDidMount() {
    getManageteam((v) => this.setState(v));
  }

  render() {
    const { items, roles, loading, error } = this.state;
    const { showDeleteRole, editRole, loadingRoles, errorRoles } = this.state;
    const { edit, showDelete, errorDelete, loadingDelete } = this.state;
    const setState = (v) => this.setState(v);
    return (
      <React.StrictMode>
        <HomeHeader title="Manage Team" />
        <div className="hm_mt1_e">
          <div className="hm_cm1_title">Manage Members</div>
          <div className="hm_mt1_f">
            <RoundAddButton onclick={() => setState({ showAdd: true })} />
            <button
              className="hm_mt1_c"
              onClick={() => this.setState({ showRole: true })}
            >
              <i className="fas fa-chalkboard-teacher hm_mt1_d" />
              Roles
            </button>
            <button className="hm_cm1_filterbutton">
              <i className="fas fa-filter" />
              Filters
            </button>
          </div>
        </div>
        <List setState={setState} state={this.state} />
        <Edit setState={setState} state={this.state} />
        <Roles setState={setState} state={this.state} />
        <Add setState={setState} state={this.state} />
        <UserPermission setState={setState} state={this.state} />
        <MyAlert
          show={showDelete}
          close={() => setState({ showDelete: false, errorDelete: null })}
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
          onconform={async () => {
            setState({ errorDelete: null, loadingDelete: true });
            var result = await api_int_delete(api.teammember + "/" + edit.id);
            if (result.err) setState({ errorDelete: result.data });
            else {
              await getManageteam(setState);
              setState({ showDelete: false, show: false, errorDelete: null });
            }
            setState({ loadingDelete: false });
          }}
        />
        <MyAlert
          show={showDeleteRole}
          close={() => setState({ showDeleteRole: false, editRole: null })}
          body={
            <>
              <b>Are you sure want to Delete it?</b>
              <br />
              If you delete Company, the related Members alose get deleted.
              <div style={{ color: "darkgreen" }}>{errorRoles}</div>
            </>
          }
          loading={loadingRoles}
          onconform={() => deleteRole(setState, roles[editRole].id)}
        />
        <HomeDatasetter loading={loading} error={error} items={items} />
      </React.StrictMode>
    );
  }
}

function List({ setState, state }) {
  const { items } = state;
  return (
    <div style={{ padding: 10 }}>
      {items.map((item) => (
        <SingleMember
          onclick={() => setState({ edit: item })}
          img={item.profile_image}
          f_name={item.first_name}
          l_name={item.last_name}
          email={item.email}
          mobile={item.mobile}
        />
      ))}
    </div>
  );
}

function Add({ setState, state }) {
  const { showAdd, locations, scops, roles } = state;
  const { errorAdd, loadingAdd, spocAdd } = state;

  function validate(itemedit) {
    if (itemedit.password.toString().length < 8) return 1;
    else if (itemedit.password !== itemedit.password_confirmation) return 2;
    else if (itemedit.mobile.toString().length !== 10) return 3;
    else return 0;
  }

  function textbox(label, id, ph = "Text", type = "text") {
    return (
      <Col sm="12" lg="3">
        <label for="male">{label}</label>
        <Form.Control placeholder={ph} type={type} id={id} required />
      </Col>
    );
  }
  return (
    <PopupLg
      show={showAdd}
      body={
        <>
          <div className="hm_mt1_a">
            <div className="hm_cm1_atert_ttl">Add Members</div>
            <Editheaderbutton
              content={<i className="fas fa-window-close c_skyBlue" />}
              hint="Close"
              onclick={() => setState({ showAdd: false })}
            />
          </div>
          <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
            <Form
              id="teammember_add_form"
              onSubmit={async (e) => {
                e.preventDefault();
                var data = e.target;
                setState({ loading: true, errorAdd: null });
                const body = {
                  password: data.password.value,
                  password_confirmation: data.password_confirmation.value,
                  user_name: data.name.value,
                  email: data.email.value,
                  first_name: data.first_name.value,
                  last_name: data.last_name.value,
                  mobile: data.mobile.value,
                  designation: data.designation.value,
                  work_station: locations[data.work_station.value].id,
                  scope_id: scops[data.scope_id.value].id,
                  role_id: roles[data.role_id.value].id,
                  spoc: spocAdd ? "1" : "0",
                };
                switch (validate(body)) {
                  case 0: {
                    var result = await api_int_post(api.teammember, body);
                    if (result.err) setState({ errorAdd: result.data });
                    else {
                      document.getElementById("teammember_add_form").reset();
                      setState({ showAdd: false });
                      getManageteam(setState);
                    }
                    break;
                  }
                  case 1:
                    setState({
                      errorAdd: "Password is not strong minimum 8 charector",
                    });
                    break;
                  case 2:
                    setState({ errorAdd: "Password is not same" });
                    break;
                  case 3:
                    setState({ errorAdd: "Phone Number is not valid" });
                    break;
                  default:
                    break;
                }
                setState({ loading: false });
              }}
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
                  <select id="work_station" class="form-control" required>
                    {locations.map((location, k) => (
                      <option kay={k} value={k}>
                        {location.location_name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col sm="12" lg="3">
                  <label>Scope</label>
                  <select id="scope_id" class="form-control" required>
                    {scops.map((scope, k) => (
                      <option kay={k} value={k}>
                        {scope.scope_name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col sm="12" lg="3">
                  <label>Role</label>
                  <select id="role_id" class="form-control" required>
                    {roles.map((role, k) => (
                      <option kay={k} value={k}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </Col>

                {textbox("Mobile", "mobile", "95XXXXXX63", "number")}
              </Row>
              <Row>
                {textbox("Designation", "designation")}
                {textbox("Password", "password", "Password", "password")}
                {textbox(
                  "Confirm Password",
                  "password_confirmation",
                  "Re Enter Password",
                  "password"
                )}
              </Row>

              <div style={{ paddingLeft: 20, paddingTop: 5 }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="spoc"
                  style={{ height: 18, width: 18 }}
                  onChange={() => setState({ spocAdd: !spocAdd })}
                />
                SPOC (Special point of contact) A company member who can
                receive/pay invoices
              </div>

              <div style={{ margin: 10, height: 30 }}>
                <label style={{ color: "red" }}>{errorAdd}</label>
                <button
                  type="submit"
                  disabled={loadingAdd}
                  style={{
                    boxShadow: "2px 2px 5px #888",
                    backgroundColor: loadingAdd ? "gray" : "darkblue",
                    borderRadius: 3,
                    color: "white",
                    padding: 5,
                    paddingLeft: 15,
                    paddingRight: 15,
                    margin: 5,
                    float: "right",
                  }}
                >
                  {loadingAdd ? "Loading.." : "Add"}
                </button>
              </div>
            </Form>
          </div>
        </>
      }
    />
  );
}

class EditSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editstatus: false };
  }

  render() {
    const { edit, data, confirm } = this.props;
    const { editstatus } = this.state;
    return editstatus ? (
      <div style={{ height: 70, paddingTop: 5 }}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await confirm(e.target);
            this.setState({ editstatus: false });
          }}
        >
          <div style={{ height: 40 }}>{edit}</div>
          <div style={{ width: "100%" }}>
            <button
              type="button"
              style={{
                float: "right",
                color: "gray",
                fontSize: 12,
                paddingLeft: 10,
              }}
              onClick={() => this.setState({ editstatus: false })}
            >
              <i className="fa fa-remove" />
              Cancel
            </button>
            <button
              type="submit"
              style={{
                float: "right",
                color: "darkblue",
                fontSize: 12,
                paddingLeft: 10,
              }}
            >
              <i className="fas fa-upload" />
              Confirm
            </button>
          </div>
        </form>
      </div>
    ) : (
      <>
        {data}
        <button
          style={{
            paddingRight: this.props.header ? 25 : null,
            float: "right",
            color: "#04213C",
            fontSize: 12,
            paddingLeft: 10,
          }}
          onClick={() => this.setState({ editstatus: true })}
        >
          <i className="fas fa-pencil-alt" />
          Edit
        </button>
        <br />
      </>
    );
  }
}

function Edit({ setState, state }) {
  const api_manageteam_put = async (data) => {
    this.setState({ loading: true, label: "" });
    var _api = api.teammember + "/" + this.props.item.id;
    var result = await api_int_put(_api, data);
    if (result.err) this.setState({ label: result.data });
    else this.props.reload();
    this.setState({ loading: false });
  };

  const { locations, scops, roles, edit } = state;
  const { errorEdit, loadingEdit } = state;
  const item = edit;

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

  return edit === null ? null : (
    <PopupXs
      show={edit !== null}
      body={
        <>
          <div className="hm_mt1_b">
            <div>
              {item.profile_image != null ? (
                <img
                  src={setImgUrl(item.profile_image)}
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    margin: 10,
                    float: "left",
                  }}
                  alt="..."
                />
              ) : (
                <div
                  style={{
                    height: 80,
                    width: 80,
                    float: "left",
                    margin: 10,
                    backgroundColor: "black",
                    borderRadius: 40,
                    paddingTop: 13,
                    fontSize: 35,
                    color: "gray",
                    fontWeight: 700,
                  }}
                >
                  <center>
                    {item.first_name[0].toUpperCase() +
                      item.last_name[0].toUpperCase()}
                  </center>
                </div>
              )}
              <div
                style={{
                  fontWeight: 500,
                  color: "white",
                  marginTop: 28,
                  height: 22,
                  overflow: "hidden",
                }}
              >
                {item.first_name + " " + item.last_name}
              </div>
              <div style={{ color: "gray", fontSize: 12 }}>{item.email}</div>
            </div>
            <div className="row">
              <Editheaderbutton
                content={<i className="fas fa-user-secret c_editGreen" />}
                hint="User Permission"
                onclick={() => setState({ showPermission: true })}
              />
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
                <div>
                  <div style={{ float: "left", width: 200 }}>
                    {textbox("first_name")}
                  </div>
                  <div style={{ float: "right", width: 200 }}>
                    {textbox("last_name")}
                  </div>
                </div>
              }
              confirm={(data) =>
                api_manageteam_put({
                  first_name: data.first_name.value,
                  last_name: data.last_name.value,
                })
              }
              data={<b>{item.first_name + " " + item.last_name}</b>}
              header={true}
            />
            <div className="profile_inside">
              <EditSingle
                edit={textbox("user_name")}
                confirm={(data) =>
                  api_manageteam_put({ user_name: data.user_name.value })
                }
                data={
                  <>
                    <div className="profile_sub_title">
                      <i className="far fa-address-card memberdisicon" />
                      User Name
                    </div>
                    <span className="profile_sub_data">{item.user_name}</span>
                  </>
                }
              />
              <hr style={{ margin: 5 }} />
              <EditSingle
                edit={textbox("email", "example@mail.com", "email")}
                confirm={(data) =>
                  api_manageteam_put({ email: data.email.value })
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
                confirm={(data) =>
                  api_manageteam_put({
                    work_station: data.work_station.value,
                  })
                }
                edit={
                  <select
                    id="work_station"
                    class="form-control"
                    required
                    defaultValue={item.work_station}
                  >
                    {locations.map((location, k) => (
                      <option kay={k} value={location.id}>
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
                    <span className="profile_sub_data">
                      {locations.map((location) =>
                        location.id.toString() === item.work_station.toString()
                          ? location.location_name
                          : null
                      )}
                    </span>
                  </>
                }
              />
              <hr style={{ margin: 5 }} />
              <EditSingle
                confirm={(data) =>
                  api_manageteam_put({ scope_id: data.scope_id.value })
                }
                edit={
                  <select
                    id="scope_id"
                    class="form-control"
                    required
                    defaultValue={item.scope}
                  >
                    {scops.map((scope, k) => (
                      <option kay={k} value={scope.id}>
                        {scope.scope_name}
                      </option>
                    ))}
                  </select>
                }
                data={
                  <>
                    <div className="profile_sub_title">
                      <i className="fas fa-box-open memberdisicon" />
                      Scope
                    </div>
                    <span className="profile_sub_data">
                      {scops.map((scope) =>
                        scope.id === item.scope_id ? scope.scope_name : null
                      )}
                    </span>
                  </>
                }
              />
              <hr style={{ margin: 5 }} />
              <EditSingle
                confirm={(data) =>
                  api_manageteam_put({ role_id: data.role_id.value })
                }
                edit={
                  <select
                    id="role_id"
                    class="form-control"
                    required
                    defaultValue={item.role_id}
                  >
                    {roles.map((role, k) => (
                      <option kay={k} value={role.id}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                }
                data={
                  <>
                    <div className="profile_sub_title">
                      <i className="fas fa-chalkboard-teacher memberdisicon" />
                      Role
                    </div>
                    <span className="profile_sub_data">
                      {roles.map((role) =>
                        role.id === item.role ? role.role : null
                      )}
                    </span>
                  </>
                }
              />
              <hr style={{ margin: 5 }} />
              <EditSingle
                confirm={(data) =>
                  api_manageteam_put({ mobile: data.mobile.value })
                }
                edit={textbox("mobile", "95XXXXXX63", "number")}
                data={
                  <>
                    <div className="profile_sub_title">
                      <i className="fas fa-phone memberdisicon" />
                      Phone Number
                    </div>
                    <span className="profile_sub_data">{item.mobile}</span>
                  </>
                }
              />
              <hr style={{ margin: 5 }} />
              <EditSingle
                confirm={(data) =>
                  api_manageteam_put({
                    designation: data.designation.value,
                  })
                }
                edit={textbox("designation")}
                data={
                  <>
                    <div className="profile_sub_title">
                      <i className="fab fa-discord memberdisicon" />
                      Designation
                    </div>
                    <span className="profile_sub_data">
                      {item.designation}{" "}
                    </span>
                  </>
                }
              />
              <hr style={{ margin: 5 }} />
              <div style={{ paddingLeft: 24 }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="spoc"
                  style={{ height: 15, width: 15 }}
                  checked={item.spoc === 1 ? true : false}
                  onChange={() => {
                    api_manageteam_put({
                      spoc: item.spoc === 1 ? 0 : 1,
                    });
                  }}
                />
                SPOC
              </div>
            </div>
            <errormsg>{errorEdit}</errormsg>
            {loadingEdit ? <loading>Loading</loading> : null}
          </div>
        </>
      }
    />
  );
}

function Roles({ setState, state }) {
  const { errorRoles, loadingRoles, showRole, roles, editRole } = state;
  return (
    <PopupSm
      show={showRole}
      body={
        <>
          <div
            style={{
              padding: 12,
              width: "100%",
              backgroundColor: "#04213C",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontWeight: 500, color: "white" }}>Roles</div>
            <Editheaderbutton
              content={<i className="fas fa-window-close c_skyBlue" />}
              hint="Close"
              onclick={() => setState({ showRole: false })}
            />
          </div>

          <div style={{ padding: 20, backgroundColor: "#fefefe" }}>
            <div style={{ height: 32 }}>
              <form onSubmit={(e) => addRole(e, setState)}>
                <button
                  className="rode_add_button"
                  type="submit"
                  disabled={loadingRoles}
                >
                  {loadingRoles ? "Loading..." : "+Add Role"}
                </button>
                <div className="rode_add_text">
                  <Form.Control
                    placeholder="Create a new Role..."
                    id="role"
                    style={{ height: 28 }}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="profile_inside">
              {roles.map((item, k) => (
                <React.StrictMode key={k}>
                  {editRole === k ? (
                    <div style={{ height: 70, paddingTop: 5 }}>
                      <form onSubmit={(e) => updateRole(e, setState, item.id)}>
                        <div style={{ height: 40 }}>
                          <Form.Control
                            id="role"
                            required
                            defaultValue={item.role}
                          />
                        </div>
                        <div style={{ width: "100%" }}>
                          <button
                            type="button"
                            style={{
                              float: "right",
                              color: "gray",
                              fontSize: 12,
                              paddingLeft: 10,
                            }}
                            onClick={() => setState({ editRole: null })}
                          >
                            <i className="fa fa-remove" />
                            Cancel
                          </button>
                          <button
                            type="submit"
                            style={{
                              float: "right",
                              color: "darkblue",
                              fontSize: 12,
                              paddingLeft: 10,
                            }}
                          >
                            <i className="fas fa-upload" />
                            Confirm
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      <span style={{ color: "gray" }}>{item.role}</span>
                      <button
                        style={{
                          float: "right",
                          color: "#04213C",
                          fontSize: 12,
                          paddingLeft: 10,
                        }}
                        onClick={() => setState({ editRole: k })}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                      <button
                        style={{
                          float: "right",
                          color: "red",
                          fontSize: 12,
                          paddingLeft: 10,
                        }}
                        onClick={() =>
                          setState({ showDeleteRole: true, editRole: k })
                        }
                      >
                        <i className="far fa-trash-alt" />
                      </button>
                      <br />
                    </>
                  )}
                  <hr style={{ marginTop: 5, marginBottom: 8 }} />
                </React.StrictMode>
              ))}
            </div>
            <errormsg>{errorRoles}</errormsg>
            {loadingRoles ? <loading>Loading</loading> : null}
          </div>
        </>
      }
    />
  );
}

function SingleCheckBox({ item }) {
  return (
    <div style={{ width: "10%" }}>
      <input
        // class="form-check-input"
        type="checkbox"
        id="spoc"
        style={{ height: 15, width: 15 }}
        // checked={item.spoc == 1 ? true : false}
        onChange={() => {
          //   this.api_manageteam_put({ spoc: item.spoc == 1 ? 0 : 1 });
        }}
      />
    </div>
  );
}

function UserPermission({ setState, state }) {
  const { errorPermission, loadingPermission, showPermission } = state;
  return (
    <PopupMd
      show={showPermission}
      body={
        <>
          <div
            style={{
              padding: 10,
              width: "100%",
              backgroundColor: "#04213C",
              height: 45,
            }}
          >
            <Editheaderbutton
              content={
                <i
                  className="fas fa-window-close"
                  style={{ color: "skyBlue" }}
                />
              }
              hint="Close"
              onclick={() => setState({ showPermission: false })}
            />
            <span style={{ fontWeight: "bold", color: "white" }}>
              User Permission
            </span>
          </div>
          <div style={{ padding: 20, backgroundColor: "#fefefe" }}>
            <div className="profile_inside">
              <div style={{ display: "flex", fontWeight: "bold" }}>
                <div style={{ width: "40%" }}>Title</div>
                <div style={{ width: "10%" }}>View</div>
                <div style={{ width: "10%" }}>Add</div>
                <div style={{ width: "10%" }}>Edit</div>
                <div style={{ width: "10%" }}>Delete</div>
                <div style={{ width: "15%" }}>Limit view</div>
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Manage Location</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Manage Invntory</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Manage Plan</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Manage Members</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Team Members</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Support Scope</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Support Profiles</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Support Tickets</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Announcement</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
              <hr style={{ margin: 5 }} />
              <div style={{ display: "flex" }}>
                <div style={{ width: "40%" }}>Stream</div>
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
                <SingleCheckBox />
              </div>
            </div>
            <errormsg>{errorPermission}</errormsg>
            {loadingPermission ? <loading>Loading</loading> : null}
          </div>
        </>
      }
    />
  );
}
