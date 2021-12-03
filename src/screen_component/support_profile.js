import React from "react";
import api from "../module/api";
import { Row, Col, Button, Form } from "react-bootstrap";
import Datasetter from "../component/home_poser.js";
import {
  api_int_delete,
  api_int_get,
  api_int_post,
} from "../module/api_init";
import { PopupSm } from "../component/popups";
import { Editheaderbutton } from "../component/home_button";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      selected: null,
      items: [],
      scopes: [],
      label: "",
    };
  }

  async loaditems() {
    var result1 = await api_int_get(api.profile);
    var result2 = await api_int_get(api.scope);

    if (result1.err) this.setState({ error: result1.data });
    else if (result2.err) this.setState({ error: result2.data });
    else this.setState({ items: result1.data, scopes: result2.data });

    this.setState({ loading: false });
  }

  componentDidMount() {
    this.loaditems();
  }

  render() {
    const { items, loading, error, selected, showadd, scopes, label } =
      this.state;

    return (
      <div style={{ padding: 30 }}>
        <div style={{ height: 40 }}>
          <button
            style={{
              float: "right",
              backgroundColor: "#DF1622",

              marginRight: 20,
              height: 32,
              width: 32,
              borderRadius: 16,
              color: "white",
            }}
            onClick={() => this.setState({ showadd: true })}
          >
            <h5>+</h5>
          </button>
          <div
            style={{
              textShadow: "3px 1px 5px #aaa",
              paddingLeft: 10,
              fontWeight: 500,
              fontSize: 25,
            }}
          >
            Support Profiles
          </div>
        </div>
        <div style={{ padding: 10 }}>
          <Row>
            <Col sm="12" lg="4">
              {items.map((item, k) => (
                <button
                  key={k}
                  style={{
                    borderWidth: 0,
                    margin: 3,
                    borderRadius: 5,
                    backgroundColor:
                      selected != null
                        ? selected === k
                          ? "black"
                          : "#ddd"
                        : "#ddd",
                    color:
                      selected != null
                        ? selected === k
                          ? "#eee"
                          : "black"
                        : "#black ",
                    padding: 8,
                    width: "100%",
                  }}
                  onClick={() => this.setState({ selected: k })}
                >
                  <b>{item.category}</b>
                </button>
              ))}
            </Col>
            <Col sm="12" lg="8">
              {selected != null ? (
                <div>
                  <b>{items[selected].category}&nbsp;-&nbsp;</b>
                  {scopes.map((scope) =>
                    scope.id === items[selected].scope_id
                      ? scope.scope_name
                      : null
                  )}
                  <span style={{ color: "red", paddingLeft: 20 }}>{label}</span>
                  <div style={{ float: "right" }}>
                    <input
                      type="checkbox"
                      style={{ height: 15, width: 15, marginRight: 10 }}
                    />
                    Hide
                    <Button
                      className="btn-fill ml-4 mr-4 pt-0 pb-1"
                      style={{ backgroundColor: "#203E79" }}
                      onClick={async () => {
                        var result = await api_int_delete(
                          api.profile + "/" + items[selected].id
                        );

                        if (result.err) this.setState({ label: "Not Deleted" });
                        else {
                          this.setState({ selected: null });
                          this.loaditems();
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Remove"}
                    </Button>
                  </div>
                  <form
                    onChange={() => this.setState({ label: "" })}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (e.target.sub_category.value !== "") {
                        var result = await api_int_post(
                          api.profile +
                            "/" +
                            items[selected].id +
                            "/supportsubcategory",
                          {
                            sub_category: e.target.sub_category.value,
                          }
                        );

                        if (result.err)
                          this.setState({
                            label:
                              "Some of your field's not updated, try again",
                          });
                        else this.loaditems();
                      } else this.setState({ label: "Enter the categery" });
                    }}
                    style={{ paddingTop: 15, paddingBottom: 15, height: 70 }}
                  >
                    <Form.Control
                      placeholder="Add new issue type"
                      type="text"
                      id="sub_category"
                      required
                      style={{ width: "40%", marginRight: 20, float: "left" }}
                    />
                    <Button
                      type="submit"
                      className="btn-fill"
                      style={{ backgroundColor: "#203E79" }}
                      disabled={loading}
                    >
                      {loading ? "Loading.." : "Add"}
                    </Button>
                  </form>
                  <div style={{ padding: 15 }}>
                    {items[selected].subcategory != null
                      ? items[selected].subcategory.map((it, k) => (
                          <div key={k}>
                            {it.sub_category}
                            <div style={{ float: "right" }}>
                              <input
                                type="checkbox"
                                style={{
                                  height: 15,
                                  width: 15,
                                  marginRight: 10,
                                }}
                              />
                              Hide
                            </div>
                            <hr style={{ marginBottom: 5 }} />
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
        <Datasetter loading={loading} error={error} items={items} />
        <Add
          show={showadd}
          reload={() => this.loaditems()}
          close={() => this.setState({ showadd: false })}
          scopes={scopes}
        />
      </div>
    );
  }
}

export default Profile;

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      label: "",
      loading: false,
    };
  }

  render() {
    const { label, loading } = this.state;

    return (
      <PopupSm
        show={this.props.show}
        body={
          <>
            <div
              style={{ padding: 12, width: "100%", backgroundColor: "#04213C" }}
            >
              <Editheaderbutton
                content={
                  <i
                    className="fas fa-window-close"
                    style={{ color: "skyBlue" }}
                  />
                }
                hint="Close"
                onclick={this.props.close}
              />

              <span style={{ fontWeight: "bold", color: "white" }}>
                Add Profile
              </span>
            </div>
            <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
              <Form
                id="profile_add_form"
                onChange={() => this.setState({ label: "" })}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (e.target.category.value !== "") {
                    var result = await api_int_post(api.profile, {
                      scope_id: e.target.scope_id.value,
                      category: e.target.category.value,
                    });
                    if (result.err) this.setState({ label: result.data });
                    else {
                      this.props.reload();
                      this.props.close();
                      document.getElementById("profile_add_form").reset();
                    }
                  } else this.setState({ label: "Enter the Catogery" });
                }}
              >
                <Row>
                  <Col lg="6">
                    <label>Add new Profile</label>
                    <Form.Control
                      placeholder="Type"
                      type="text"
                      id="category"
                    />
                  </Col>
                  <Col lg="6">
                    <label>Add new Profile</label>
                    <select
                      id="scope_id"
                      name="cars"
                      className="form-control"
                      required
                    >
                      {this.props.scopes.map((scope, k) => (
                        <option key={k} value={scope.id}>
                          {scope.scope_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <div style={{ color: "red", height: 50 }}>
                  <Button
                    type="submit"
                    className="btn-fill mt-3"
                    style={{ backgroundColor: "#203E79", float: "right" }}
                    disabled={loading}
                  >
                    {loading ? "Looding..." : "Add"}
                  </Button>

                  {label}
                </div>
              </Form>
            </div>
          </>
        }
      />
    );
  }
}
