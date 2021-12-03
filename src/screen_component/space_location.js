import React from "react";
import { PopupMd } from "../component/popups";
import { Editheaderbutton, RoundAddButton } from "../component/home_button";
import { Col, Form, Row } from "react-bootstrap";
import MyAlert from "../component/my_alert";
import HomeDatasetter from "../component/home_poser.js";
import { addLocation, deleteLocation } from "../method/space";
import { editLocation, getLocation } from "../method/space";

export default class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      error: null,
      loading: true,
      showAdd: false,
      loadingAdd: false,
      errorAdd: null,
      edit: null,
      loadingEdit: false,
      errorEdit: null,
      isEdit: false,
      showDelete: false,
      loadingDelete: false,
      errorDelete: null,
    };
  }

  componentDidMount() {
    getLocation((v) => this.setState(v));
  }

  render() {
    const { items, loading, error, showDelete } = this.state;
    const { errorDelete, loadingDelete, edit } = this.state;
    const setState = (v) => this.setState(v);
    return (
      <React.StrictMode>
        <div className="hm_cm1_head_div">
          <div className="hm_cm1_title">Manage Location</div>
          <button className="hm_cm1_filterbutton">
            <i className="fas fa-filter" />
            Filters
          </button>
          <Add setState={setState} state={this.state} />
          <RoundAddButton onclick={() => setState({ showAdd: true })} />
        </div>
        <Edit setState={setState} state={this.state} />
        <MyAlert
          show={showDelete}
          close={() => setState({ showDelete: false, errorDelete: null })}
          body={
            <>
              <b>Are you sure want to Delete it?</b>
              <div style={{ color: "gray" }}>
                If you delete this location, the all data related to this will
                get deleted (Include Company, Members, etc...)
              </div>
              <div style={{ color: "darkgreen" }}>{errorDelete}</div>
            </>
          }
          loading={loadingDelete}
          onconform={() => deleteLocation(setState, edit.id)}
        />
        <div className="hm_sp1_b">
          {items.map((item, key) => (
            <Body key={key} item={item} setState={setState} />
          ))}
        </div>
        <HomeDatasetter loading={loading} error={error} items={items} />
      </React.StrictMode>
    );
  }
}

function Body({ item, setState }) {
  return (
    <div className="hm_sp1_a">
      <div className="hm_sp1_c">
        <i className="fas fa-map-marker-alt hm_sp1_e" />
        <button className="cm_text_a" onClick={() => setState({ edit: item })}>
          {item.location_name}
        </button>
      </div>
      <div className="hm_sp1_c">
        <i className="fas fa-phone-alt hm_sp1_f" />
        <div className="cm_text_b">{item.contact_number}</div>
      </div>
      <div className="hm_sp1_c">
        <i className="fas fa-chart-area	hm_sp1_g" />
        <div className="cm_text_b">{item.area}</div>
      </div>
      {item.billing == null ? null : (
        <div className="hm_sp1_c">
          <i className="fas fa-location-arrow hm_sp1_h" />
          <div className="cm_text_b">
            {item.billing.city + ", "}
            {item.billing.state}
          </div>
        </div>
      )}
    </div>
  );
}

function Add({ setState, state }) {
  const { showAdd, loadingAdd, errorAdd } = state;
  return (
    <PopupMd
      show={showAdd}
      body={
        <>
          <div className="hm_sp1_d">
            <div className="hm_cm1_atert_ttl">Add Location</div>
            <Editheaderbutton
              content={<i className="fas fa-window-close c_skyBlue" />}
              hint="Close"
              onclick={() => setState({ showAdd: false })}
            />
          </div>
          <form
            id="location_add_form"
            className="hm_sp1_i"
            onSubmit={(e) => addLocation(e, setState, state)}
          >
            <div className="hm_sp1_j">General</div>
            <Row>
              <Col xs="12" md="6">
                <label>Location Name</label>
                <Form.Control
                  placeholder={"Name"}
                  id={"location_name"}
                  required
                />
              </Col>
              <Col xs="12" md="3">
                <label>Seating Capacity</label>
                <Form.Control
                  placeholder={"001"}
                  id={"seating_capacity"}
                  required
                />
              </Col>
              <Col xs="12" md="3">
                <label>Area</label>
                <Form.Control placeholder={"Area"} id={"area"} required />
              </Col>
            </Row>
            <Row>
              <Col lg="6" sm="12">
                <label>Contact Number</label>
                <Form.Control
                  placeholder={"95XXXXXX78"}
                  id={"contact_number"}
                  pattern="[0-9]{10}"
                  required
                />
              </Col>
              <Col lg="6" sm="12">
                <label>Email</label>
                <Form.Control
                  placeholder={"example@tmail.com"}
                  type="email"
                  id={"email"}
                  required
                />
              </Col>
            </Row>
            <div className="hm_sp1_j">Billing Details</div>
            <Row>
              <Col lg="6" sm="12">
                <label>Legal Business Name</label>
                <Form.Control
                  placeholder=""
                  id="legal_business_name"
                  required
                />
              </Col>
              <Col lg="6" sm="12">
                <label>Address</label>
                <Form.Control placeholder="" id="address" required />
              </Col>
            </Row>
            <Row>
              <Col lg="6" sm="12">
                <label>Notes Top</label>
                <Form.Control placeholder="" id="notes_top" required />
              </Col>
              <Col lg="6" sm="12">
                <label>Notes Bottom</label>
                <Form.Control placeholder="" id="notes_bottom" required />
              </Col>
            </Row>
            <Row>
              <Col lg="4" sm="12">
                <label>GSTN</label>
                <Form.Control placeholder="" id="gstn" required />
              </Col>
              <Col lg="4" sm="12">
                <label>State</label>
                <Form.Control placeholder="" id="state" required />
              </Col>
              <Col lg="4" sm="12">
                <label>City</label>
                <Form.Control placeholder="" id="city" required />
              </Col>
            </Row>
            <div className="hm_sp1_j">Bank Details</div>
            <label>Bank Name</label>
            <Form.Control placeholder="" id="bank_name" required />
            <Row>
              <Col lg="6" sm="12">
                <label>Branch</label>
                <Form.Control placeholder="" id="branch" required />
              </Col>
              <Col lg="6" sm="12">
                <label>IFSC</label>
                <Form.Control placeholder="" id="ifsc" required />
              </Col>
            </Row>
            <Row>
              <Col lg="6" sm="12">
                <label>Account Number</label>
                <Form.Control
                  placeholder="0098XXXXXXX789"
                  id="account_number"
                  required
                />
              </Col>
              <Col lg="6" sm="12">
                <label>Benificiary Name</label>
                <Form.Control
                  placeholder="Name"
                  id="benificiary_name"
                  required
                />
              </Col>
            </Row>
            <div className="hm_cm1_editbox_bottem">
              <label style={{ color: "red" }}>{errorAdd}</label>
              <button
                type="submit"
                disabled={loadingAdd}
                className="hm_cm1_addedit_btn"
                style={{ background: loadingAdd ? "gray" : "darkblue" }}
              >
                {loadingAdd ? "Loading.." : "Add"}
              </button>
            </div>
          </form>
        </>
      }
    />
  );
}

function Edit({ setState, state }) {
  const { edit, loadingEdit, errorEdit, isEdit } = state;
  return (
    <PopupMd
      show={edit !== null}
      body={
        edit === null ? null : (
          <>
            <div className="hm_sp1_d">
              <div className="hm_cm1_atert_ttl">Edit Location</div>
              <div className="row">
                {isEdit ? null : (
                  <Editheaderbutton
                    content={<i className="fas fa-pencil-alt c_editGreen" />}
                    hint="Edit"
                    onclick={() => setState({ isEdit: true })}
                  />
                )}
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
            <form
              className="hm_sp1_i"
              onSubmit={(e) => editLocation(e, setState, state)}
            >
              <div className="hm_sp1_j">General</div>
              <Row>
                <Col xs="12" md="6">
                  <label>Location Name</label>
                  <Form.Control
                    placeholder={"Name"}
                    id={"location_name"}
                    required
                    disabled={!isEdit}
                    defaultValue={edit.location_name}
                  />
                </Col>
                <Col xs="12" md="3">
                  <label>Seating Capacity</label>
                  <Form.Control
                    placeholder={"001"}
                    id={"seating_capacity"}
                    required
                    disabled={!isEdit}
                    defaultValue={edit.seating_capacity}
                  />
                </Col>
                <Col xs="12" md="3">
                  <label>Area</label>
                  <Form.Control
                    placeholder={"Area"}
                    id={"area"}
                    required
                    disabled={!isEdit}
                    defaultValue={edit.area}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6" sm="12">
                  <label>Contact Number</label>
                  <Form.Control
                    placeholder={"95XXXXXX78"}
                    pattern="[0-9]{10}"
                    id={"contact_number"}
                    disabled={!isEdit}
                    required
                    defaultValue={edit.contact_number}
                  />
                </Col>
                <Col lg="6" sm="12">
                  <label>Email</label>
                  <Form.Control
                    placeholder={"example@tmail.com"}
                    type="email"
                    id={"email"}
                    required
                    disabled={!isEdit}
                    defaultValue={edit.email}
                  />
                </Col>
              </Row>
              <div className="hm_sp1_j">Billing Details</div>
              <Row>
                <Col lg="6" sm="12">
                  <label>Legal Business Name</label>
                  <Form.Control
                    placeholder=""
                    id="legal_business_name"
                    required
                    disabled={!isEdit}
                    defaultValue={
                      edit.billing == null
                        ? ""
                        : edit.billing.legal_business_name
                    }
                  />
                </Col>
                <Col lg="6" sm="12">
                  <label>Address</label>
                  <Form.Control
                    placeholder=""
                    id="address"
                    required
                    disabled={!isEdit}
                    defaultValue={
                      edit.billing == null ? "" : edit.billing.address
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6" sm="12">
                  <label>Notes Top</label>
                  <Form.Control
                    placeholder=""
                    id="notes_top"
                    required
                    disabled={!isEdit}
                    defaultValue={
                      edit.billing == null ? "" : edit.billing.notes_top
                    }
                  />
                </Col>
                <Col lg="6" sm="12">
                  <label>Notes Bottom</label>
                  <Form.Control
                    placeholder=""
                    id="notes_bottom"
                    required
                    defaultValue={
                      edit.billing == null ? "" : edit.billing.notes_bottom
                    }
                    disabled={!isEdit}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="4" sm="12">
                  <label>GSTN</label>
                  <Form.Control
                    placeholder=""
                    id="gstn"
                    disabled={!isEdit}
                    required
                    defaultValue={
                      edit.billing === null ? "" : edit.billing.gstn
                    }
                  />
                </Col>
                <Col lg="4" sm="12">
                  <label>State</label>
                  <Form.Control
                    placeholder=""
                    id="state"
                    disabled={!isEdit}
                    required
                    defaultValue={
                      edit.billing === null ? "" : edit.billing.state
                    }
                  />
                </Col>
                <Col lg="4" sm="12">
                  <label>City</label>
                  <Form.Control
                    placeholder=""
                    id="city"
                    required
                    disabled={!isEdit}
                    defaultValue={edit.billing == null ? "" : edit.billing.city}
                  />
                </Col>
              </Row>
              <div className="hm_sp1_j">Bank Details</div>
              <label>Bank Name</label>
              <Form.Control
                placeholder=""
                id="bank_name"
                required
                disabled={!isEdit}
                defaultValue={edit.bank === null ? "" : edit.bank.bank_name}
              />

              <Row>
                <Col lg="6" sm="12">
                  <label>Branch</label>
                  <Form.Control
                    placeholder=""
                    id="branch"
                    required
                    disabled={!isEdit}
                    defaultValue={edit.bank === null ? "" : edit.bank.branch}
                  />
                </Col>
                <Col lg="6" sm="12">
                  <label>IFSC</label>
                  <Form.Control
                    placeholder=""
                    id="ifsc"
                    required
                    disabled={!isEdit}
                    defaultValue={edit.bank === null ? "" : edit.bank.ifsc}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6" sm="12">
                  <label>Account Number</label>
                  <Form.Control
                    placeholder="0098XXXXXXX789"
                    id="account_number"
                    disabled={!isEdit}
                    required
                    defaultValue={
                      edit.bank === null ? "" : edit.bank.account_number
                    }
                  />
                </Col>
                <Col lg="6" sm="12">
                  <label>Benificiary Name</label>
                  <Form.Control
                    placeholder="Name"
                    id="benificiary_name"
                    disabled={!isEdit}
                    required
                    defaultValue={
                      edit.bank === null ? "" : edit.bank.benificiary_name
                    }
                  />
                </Col>
              </Row>
              {isEdit ? (
                <div style={{ height: 50 }}>
                  <div style={{ color: "red" }}>{errorEdit}</div>
                  <button
                    type="submit"
                    disabled={loadingEdit}
                    style={{
                      boxShadow: "2px 2px 5px #888",
                      background: loadingEdit ? "gray" : "darkblue",
                      borderRadius: 3,
                      color: "white",
                      padding: 10,
                      margin: 15,
                      float: "right",
                    }}
                  >
                    {loadingEdit ? "Loading.." : "Update"}
                  </button>
                </div>
              ) : null}
            </form>
          </>
        )
      }
    />
  );
}
