import React from "react";
import { PopupMd, PopupLg } from "../component/popups";
import { Editheaderbutton, RoundAddButton } from "../component/home_button";
import { Col, Form, Row } from "react-bootstrap";
import MyAlert from "../component/my_alert";
import HomeDatasetter from "../component/home_poser.js";
import { addPlan, deletePlan, editPlan, getPlan } from "../method/space";

class SpacePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      items: [],
      locations: [],
      inventories: [],
      showadd: false,
    };
  }
  componentDidMount() {
    getPlan((v) => this.setState(v));
  }

  render() {
    const { items, loading, error, locations, inventories } = this.state;

    return (
      <>
        <div className="hm_cm1_head_div">
          <div className="hm_cm1_title">Manage Plan</div>
          <button className="hm_cm1_filterbutton">
            <i className="fas fa-filter" />
            Filters
          </button>
          <Add
            locations={locations}
            inventories={inventories}
            reload={() => getPlan((v) => this.setState(v))}
          />
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
              <th className="hm_cm1_th">LOCATION</th>
              <th className="hm_cm1_th">CRIDITS</th>
              <th className="hm_cm1_th">AREA</th>
            </tr>

            {items.map((item, key) => (
              <Body
                key={key}
                item={item}
                locations={locations}
                inventories={inventories}
                reload={() => getPlan((v) => this.setState(v))}
              />
            ))}
          </table>
        </div>
        <HomeDatasetter loading={loading} error={error} items={items} />
      </>
    );
  }
}

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
    const { show, loading, label, showdelete } = this.state;
    const { item, reload } = this.props;
    return (
      <React.StrictMode>
        <tr
          style={{ backgroundColor: this.state.bg }}
          onMouseOver={() => this.setState({ bg: "lightblue" })}
          onMouseLeave={() => this.setState({ bg: null })}
          onClick={() => this.setState({ show: true })}
        >
          <td className="hm_cm1_td">
            <span style={{ color: "#555", fontWeight: "bold" }}>
              {this.props.item.location.location_name}
            </span>
            <span style={{ fontSize: 12, fontWeight: "bold", padding: 8 }}>
              {this.props.item.resource_price}
            </span>
          </td>
          <td>
            <span style={{ fontSize: 13, fontWeight: "bold", padding: 8 }}>
              <i className="far fa-handshake p-1" />
              {this.props.item.meeting_room_credits}
            </span>
            <span style={{ fontSize: 13, fontWeight: "bold", padding: 8 }}>
              <i className="fas fa-print p-1" />
              {this.props.item.printer_credits}
            </span>
          </td>
          <td>
            {this.props.item.inventory.res_type}-{this.props.item.num_seats}
          </td>
        </tr>
        <Edit
          show={show}
          close={() => this.setState({ show: false })}
          body={this.props.item}
          locations={this.props.locations}
          inventories={this.props.inventories}
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
                If you delete this Inventory, the related also alose get
                deleted.
              </div>
              <div style={{ color: "darkgreen" }}>{label}</div>
            </>
          }
          loading={loading}
          onconform={() => deletePlan((v) => this.setState(v), item, reload)}
        />
      </React.StrictMode>
    );
  }
}

export default SpacePlan;

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
    const { locations, inventories } = this.props;

    return (
      <React.StrictMode>
        <RoundAddButton onclick={() => this.setState({ show: true })} />
        <PopupMd
          show={this.state.show}
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
                <div className="hm_cm1_atert_ttl">Add Plan</div>
                <Editheaderbutton
                  content={<i className="fas fa-window-close c_skyBlue" />}
                  hint="Close"
                  onclick={() => this.setState({ show: false })}
                />
              </div>
              <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
                <Form
                  id="plan_add_form"
                  onSubmit={(e) =>
                    addPlan(e, (v) => this.setState(v), this.props.reload)
                  }
                >
                  <Row>
                    <Col sl="12" md="6" lg="4">
                      <label>Resource Type</label>
                      <select
                        id="inventory_id"
                        className="form-control"
                        required
                      >
                        {inventories.map((res, key) => (
                          <option key={key} value={res.id}>
                            {res.title}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col sl="12" md="6" lg="4">
                      <label>Location</label>
                      <select id="location" className="form-control" required>
                        {locations.map((location, key) => (
                          <option key={key} value={location.id}>
                            {location.location_name}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col sl="12" md="6" lg="4">
                      <label>Resource price</label>
                      <Form.Control
                        placeholder="Number"
                        type="number"
                        id="resource_price"
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sl="12" md="6" lg="6">
                      <label>Description</label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Discription"
                        type="text"
                        id="description"
                        required
                      />
                    </Col>
                    <Col sl="12" md="6" lg="6">
                      <label>No of Seats</label>
                      <Form.Control
                        placeholder="Count"
                        type="number"
                        id="num_seats"
                        required
                      />
                      <label>Area</label>
                      <Form.Control
                        placeholder="In SqFt"
                        type="number"
                        id="area"
                        required
                      />
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
    const body = this.props.body;
    const locations = this.props.locations;
    const inventories = this.props.inventories;
    const { edit } = this.state;

    return (
      <PopupLg
        show={this.props.show}
        body={
          <>
            <div className="hm_sp1_d">
              <div className="hm_cm1_atert_ttl">Edit Plan</div>
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
                onSubmit={async (e) =>
                  editPlan(
                    e,
                    (v) => this.setState(v),
                    this.props.reload,
                    this.props.close,
                    body
                  )
                }
              >
                <Row>
                  <Col sl="12" md="6" lg="4">
                    <label>Resource Type</label>
                    <select
                      id="inventory_id"
                      className="form-control"
                      required
                      disabled={!edit}
                      defaultValue={body.inventory_id}
                    >
                      {inventories.map((res, key) => (
                        <option key={key} value={res.id}>
                          {res.title}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col sl="12" md="6" lg="4">
                    <label>Location</label>
                    <select
                      id="location"
                      className="form-control"
                      required
                      disabled={!edit}
                      defaultValue={body.location}
                    >
                      {locations.map((location, key) => (
                        <option key={key} value={location.id}>
                          {location.location_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col sl="12" md="6" lg="4">
                    <label>Resource price</label>
                    <Form.Control
                      placeholder="Number"
                      type="number"
                      id="resource_price"
                      defaultValue={body.resource_price}
                      required
                      disabled={!edit}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sl="12" md="6" lg="6">
                    <label>Description</label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Type"
                      type="text"
                      id="description"
                      defaultValue={body.description}
                      required
                      disabled={!edit}
                    />
                  </Col>
                  <Col sl="12" md="6" lg="6">
                    <label>No of Seats</label>
                    <Form.Control
                      placeholder="type"
                      type="number"
                      id="num_seats"
                      defaultValue={body.num_seats}
                      required
                      disabled={!edit}
                    />
                    <label>Area</label>
                    <Form.Control
                      placeholder="type"
                      type="number"
                      id="area"
                      disabled={!edit}
                      defaultValue={body.area}
                      required
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
