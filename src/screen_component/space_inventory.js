import React from "react";
import { PopupMd } from "../component/popups";
import { Editheaderbutton, RoundAddButton } from "../component/home_button";
import { Col, Form, Row } from "react-bootstrap";
import MyAlert from "../component/my_alert";
import HomeDatasetter from "../component/home_poser.js";
import { addInventory, deleteInventory } from "../method/space";
import { editInventory, getInventory } from "../method/space";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      items: [],
      showadd: false,
    };
  }
  componentDidMount() {
    getInventory((v) => this.setState(v));
  }

  render() {
    const { items, loading, error } = this.state;

    return (
      <>
        <div className="hm_cm1_head_div">
          <div className="hm_cm1_title">Manage Invntory</div>
          <button className="hm_cm1_filterbutton">
            <i className="fas fa-filter" />
            Filters
          </button>
          <Add reload={() => getInventory((v) => this.setState(v))} />
        </div>

        <div
          style={{
            boxShadow: "0px 0px 10px #CDCFB2",
            margin: "5px 1%",
            backgroundColor: "white",
          }}
        >
          <table className="hm_cm1_table">
            <tr className="hm_cm1_tr">
              <th className="hm_cm1_th">TITLE</th>
              <th className="hm_cm1_th">RESORCE TYPE</th>
              <th className="hm_cm1_th">HSN CODE</th>
            </tr>
            {items.map((item, key) => (
              <Body
                key={key}
                item={item}
                reload={() => getInventory((v) => this.setState(v))}
              />
            ))}
          </table>
        </div>
        <HomeDatasetter loading={loading} error={error} items={items} />
      </>
    );
  }
}

export default Inventory;

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bg: null,
      show: false,
      showdelete: false,
      loading: false,
      label: "",
    };
  }
  render() {
    const { item, reload } = this.props;
    const { show, showdelete, loading, label } = this.state;
    return (
      <>
        <tr
          style={{ backgroundColor: this.state.bg }}
          onMouseOver={() => this.setState({ bg: "lightblue" })}
          onMouseLeave={() => this.setState({ bg: null })}
          onClick={() => this.setState({ show: !this.state.show })}
        >
          <td className="hm_cm1_td">
            <span style={{ color: "#333", fontWeight: "bold" }}>
              {this.props.item.title}
            </span>
          </td>
          <td>{this.props.item.res_type}</td>
          <td>{this.props.item.hsn_code}</td>
        </tr>
        <Edit
          show={show}
          close={() => this.setState({ show: false })}
          body={this.props.item}
          reload={this.props.reload}
          delete={() => this.setState({ showdelete: true })}
        />
        <MyAlert
          show={showdelete}
          close={() => this.setState({ showdelete: false, label: "" })}
          body={
            <>
              <b>Are you sure want to Delete it?</b>
              <div style={{ color: "gray" }}>
                If you delete this Inventory, the related plans alose get
                deleted.
              </div>
              <div style={{ color: "darkgreen" }}>{label}</div>
            </>
          }
          loading={loading}
          onconform={() =>
            deleteInventory((v) => this.setState(v), item, reload)
          }
        />
      </>
    );
  }
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      loading: false,
      show: false,
    };
  }

  render() {
    return (
      <React.StrictMode>
        <RoundAddButton onclick={() => this.setState({ show: true })} />
        <PopupMd
          show={this.state.show}
          body={
            <>
              <div className="hm_sp1_d">
                <div className="hm_cm1_atert_ttl">Add Inventory</div>
                <Editheaderbutton
                  content={<i className="fas fa-window-close c_skyBlue" />}
                  hint="Close"
                  onclick={() => this.setState({ show: false })}
                />
              </div>
              <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
                <Form
                  id="inventory_add_form"
                  onSubmit={(e) =>
                    addInventory(e, (v) => this.setState(v), this.props.reload)
                  }
                >
                  <Row>
                    <Col xs="12" md="6">
                      <label>Title</label>
                      <Form.Control
                        placeholder={"Name"}
                        id={"title"}
                        required
                      />
                    </Col>
                    <Col xs="12" md="3">
                      <label>Rescorce Type</label>
                      <select id="res_type" className="form-control" required>
                        <option value="Desk">Desk</option>
                        <option value="Area">Area</option>
                        <option value="Other">Other Service</option>
                      </select>
                    </Col>
                    <Col xs="12" md="3">
                      <label>Hsn Code</label>
                      <Form.Control placeholder="HSN" id="hsn_code" required />
                    </Col>
                  </Row>
                  <div className="hm_cm1_editbox_bottem">
                    <label style={{ color: "red" }}>{this.state.error}</label>
                    <button
                      type="submit"
                      disabled={this.state.loading}
                      className="hm_cm1_addedit_btn"
                      style={{
                        background: this.state.loading ? "gray" : "darkblue",
                      }}
                    >
                      {this.state.loading ? "Loading.." : "Add"}
                    </button>
                  </div>
                </Form>
              </div>
            </>
          }
        />
      </React.StrictMode>
    );
  }
}

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      loading: false,
      edit: false,
    };
  }

  render() {
    const { edit } = this.state;
    const { body } = this.props;

    return (
      <PopupMd
        show={this.props.show}
        body={
          <>
            <div className="hm_sp1_d">
              <div className="hm_cm1_atert_ttl">Edit Inventory</div>
              <div className="row">
                {this.state.edit ? null : (
                  <Editheaderbutton
                    content={<i className="fas fa-pencil-alt c_editGreen" />}
                    hint="Edit"
                    onclick={() => this.setState({ edit: !this.state.edit })}
                  />
                )}
                <Editheaderbutton
                  content={<i className="fas fa-trash-alt c_deletered" />}
                  hint="Delete"
                  onclick={this.props.delete}
                />
                <Editheaderbutton
                  content={<i className="fas fa-window-close c_skyBlue" />}
                  hint="Close"
                  onclick={this.props.close}
                />
              </div>
            </div>
            <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
              <Form
                onSubmit={async (e) => {
                  editInventory(
                    e,
                    (v) => this.setState(v),
                    this.props.reload,
                    this.props.close,
                    body
                  );
                }}
              >
                <Row>
                  <Col xs="12" md="6">
                    <label>Title</label>
                    <Form.Control
                      placeholder={"Name"}
                      id={"title"}
                      required
                      defaultValue={this.props.body.title}
                      disabled={!edit}
                    />
                  </Col>
                  <Col xs="12" md="3">
                    <label>Rescorce Type</label>
                    <select
                      id="res_type"
                      className="form-control"
                      required
                      defaultValue={this.props.body.res_type}
                      disabled={!edit}
                    >
                      <option value="Desk">Desk</option>
                      <option value="Area">Area</option>
                      <option value="Other">Other Service</option>
                    </select>
                  </Col>
                  <Col xs="12" md="3">
                    <label>Hsn Code</label>
                    <Form.Control
                      placeholder={"hsn code"}
                      id={"hsn_code"}
                      required
                      defaultValue={this.props.body.hsn_code}
                      disabled={!edit}
                    />
                  </Col>
                </Row>
                {edit ? (
                  <div style={{ margin: 10, height: 30 }}>
                    <label style={{ color: "red" }}>{this.state.label}</label>
                    <button
                      type="submit"
                      disabled={this.state.loading}
                      style={{
                        boxShadow: "2px 2px 5px #888",
                        backgroundColor: this.state.loading
                          ? "gray"
                          : "darkblue",
                        borderRadius: 3,
                        color: "white",
                        padding: 10,
                        margin: 5,
                        float: "right",
                      }}
                    >
                      {this.state.loading ? "Loading.." : "Update"}
                    </button>
                  </div>
                ) : null}
              </Form>
            </div>
          </>
        }
      />
    );
  }
}
