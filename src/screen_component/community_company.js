import React from "react";
import HomeDatasetter from "../component/home_poser.js";
import MyAlert from "../component/my_alert";
import { Col, Form, Row } from "react-bootstrap";
import { Editheaderbutton, FilterButton } from "../component/home_button";
import { RoundAddButton } from "../component/home_button";
import { PopupMd } from "../component/popups";
import { addCompany, deleteCompany, getCompany } from "../method/community";
import { deleteCompanyKycdoc, updateCompany } from "../method/community";
import { setImgUrl2 } from "../module/api_init";

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      items: [],
      locations: [],
      showAdd: false,
      loadingAdd: false,
      errorAdd: null,
      kycfileAdd: null,
      edit: null,
      loadingEdit: false,
      errorEdit: null,
      kycfileEdit: null,
      isEdit: false,
      showDelete: false,
      errorDelete: null,
    };
  }

  componentDidMount() {
    getCompany((v) => this.setState(v));
  }

  render() {
    const { items, locations, loading, error, showDelete } = this.state;
    const { loadingDelete, errorDelete } = this.state;
    const setState = (v) => this.setState(v);
    return (
      <React.StrictMode>
        <div className="hm_cy1_a">
          <RoundAddButton
            onclick={() => setState({ kycfileAdd: null, showAdd: true })}
          />
          <FilterButton
            body={
              <React.StrictMode>
                <i className="fas fa-filter hm_cy1_e" />
                <h6 style={{ float: "left" }}>Filters</h6>
              </React.StrictMode>
            }
          />
        </div>
        <div className="hm_cm1_title">Manage Company</div>
        <Edit setState={setState} state={this.state} />
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
          onconform={() => deleteCompany(setState, this.state)}
        />
        <div className="hm_cy1_ao">
          {items.map((item, key) => (
            <Body
              key={key}
              k={key}
              item={item}
              locations={locations}
              reload={() => getCompany(setState)}
              setState={setState}
              state={this.state}
            />
          ))}
        </div>
        <HomeDatasetter loading={loading} error={error} items={items} />
        <Add setState={setState} state={this.state} />
      </React.StrictMode>
    );
  }
}

export default Company;

const colors = [
  "#FF5733",
  "#dd3a5f",
  "#3a69dd",
  "#3addb3",
  "#6bdd3a",
  "#c93add",
];

function Body({ item, k, setState }) {
  return (
    <button
      className="singlebody"
      onClick={() => setState({ edit: item, kycfileEdit: null })}
    >
      <div className="hm_cy1_s" style={{ color: colors[k % 6] }}>
        {item.company_name}
      </div>
      <div className="hm_cy1_an">
        <div className="hm_cy1_t" style={{ background: colors[5 - (k % 6)] }}>
          <i className="far fa-building hm_cy1_u" />
        </div>
        <div>
          <div className="hm_cy1_v" />
          <div className="hm_cy1_w">
            <i className="fas fa-globe hm_cy1_x" />
            {item.web_url}
          </div>
          <div className="hm_cy1_w">
            <i className="fas fa-envelope-open hm_cy1_x" />
            {item.company_email}
          </div>
          <div className="hm_cy1_w">
            <i className="fas fa-phone-alt hm_cy1_x" />
            {item.contact_number}
          </div>
        </div>
      </div>
    </button>
  );
}

function Add({ state, setState }) {
  const { showAdd, locations, loadingAdd, errorAdd } = state;
  var generaladd = (
    <div>
      <Row>
        <Col sm="12" lg="6">
          <label>Company Name</label>
          <Form.Control placeholder="Text" type="text" id="company_name" />
        </Col>
        <Col sm="12" lg="6">
          <label>Company e-mail</label>
          <Form.Control
            placeholder="example@mail.com/test"
            type="email"
            id="company_email"
          />
        </Col>
      </Row>
      <Row>
        <Col ms="12" lg="6">
          <label>Contact number</label>
          <Form.Control
            placeholder="95XXXXXX63"
            type="text"
            id="contact_number"
          />
        </Col>
        <Col sm="12" lg="6">
          <label>Web URL</label>
          <Form.Control placeholder="www.domin.com" type="text" id="web_url" />
        </Col>
      </Row>
      <Row>
        <Col sm="12" lg="6">
          <label for="location">Location</label>
          <select name="location" id="location" className="form-control">
            {locations.map((location, k) => (
              <option key={k} value={location.id}>
                {location.location_name}
              </option>
            ))}
          </select>
        </Col>
        <Col sm="12" lg="6">
          <label>Reference</label>
          <Form.Control placeholder="Text" type="text" id="reference" />
        </Col>
      </Row>
    </div>
  );
  const billingadd = (
    <div>
      <Row>
        <Col sm="12" lg="6">
          <label>CIN</label>
          <Form.Control placeholder="Text" type="text" id="cin" />
        </Col>
        <Col sm="12" lg="6">
          <label>PAN</label>
          <Form.Control placeholder="Text" type="text" id="pan" />
        </Col>
      </Row>
      <Row>
        <Col ms="12" lg="6">
          <label>GSTN</label>
          <Form.Control placeholder="Text" type="text" id="gstn" />
        </Col>
        <Col sm="12" lg="6">
          <label>TAN</label>
          <Form.Control placeholder="Text" type="text" id="tan" />
        </Col>
      </Row>
      <label>Billing Address </label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder=""
        type="text"
        id="billing_address"
      />
    </div>
  );
  const spocadd = (
    <div>
      <Row>
        <Col md="6" sl="12">
          <label>First Name</label>
          <Form.Control placeholder="Name" type="text" id="first_name" />
        </Col>
        <Col md="6" sl="12">
          <label>Last Name</label>
          <Form.Control placeholder="Name" type="text" id="last_name" />
        </Col>
      </Row>
      <Row>
        <Col md="6" sl="12">
          <label>User Name</label>
          <Form.Control placeholder="UserName" type="text" id="user_name" />
        </Col>
        <Col md="6" sl="12">
          <label>E-mail</label>
          <Form.Control placeholder="email" type="text" id="email" />
        </Col>
      </Row>
    </div>
  );
  const kycadd = (
    <div>
      <Row>
        <Col md="6" sl="12">
          <label>Name</label>
        </Col>
        <Col md="5" sl="12">
          <label>File</label>
        </Col>
      </Row>
      <Row>
        <Col md="6" sl="12">
          <Form.Control
            placeholder="Name of the document"
            type="text"
            id="kyc_document_name"
            style={{ marginBottom: 5 }}
          />
        </Col>
        <Col md="6" sl="12">
          <input
            type="file"
            id="file"
            onChange={(event) => {
              setState({ kycfileAdd: event.target.files[0] });
            }}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <PopupMd
      show={showAdd}
      body={
        <>
          <div className="hm_cy1_y">
            <div className="hm_cm1_atert_ttl">Add Members</div>
            <Editheaderbutton
              content={<i className="fas fa-window-close c_skyBlue" />}
              hint="Close"
              onclick={() => setState({ showAdd: false })}
            />
          </div>
          <div className="hm_cy1_ah">
            <form onSubmit={(e) => addCompany(e, state, setState)}>
              <div className="hm_cy1_z">General</div>
              {generaladd}
              <div className="hm_cy1_z">Billing Details</div>
              {billingadd}
              <div className="hm_cy1_z">SPOC</div>
              {spocadd}
              <div className="hm_cy1_z">KYC</div>
              {kycadd}

              <div className="hm_cy1_ag">
                <div style={{ color: "red", margin: 15, float: "left" }}>
                  {errorAdd}
                </div>
                <button
                  type="submit"
                  className="hm_cy1_ai"
                  disabled={loadingAdd}
                >
                  {loadingAdd ? "Loading..." : "Finish"}
                </button>
              </div>
            </form>
          </div>
        </>
      }
    />
  );
}

function Edit({ state, setState }) {
  const { locations, edit, isEdit, loadingEdit, errorEdit } = state;
  const item = edit;
  var generaladd =
    edit === null ? null : (
      <div>
        <Row>
          <Col sm="12" lg="6">
            <label>Company Name</label>
            <Form.Control
              placeholder="Text"
              type="text"
              id="company_name"
              defaultValue={item.company_name}
              disabled={!isEdit}
            />
          </Col>
          <Col sm="12" lg="6">
            <label>Company e-mail</label>
            <Form.Control
              placeholder="example@mail.com/test"
              type="email"
              id="company_email"
              defaultValue={item.company_email}
              disabled={!isEdit}
            />
          </Col>
        </Row>
        <Row>
          <Col ms="12" lg="6">
            <label>Contact number</label>
            <Form.Control
              placeholder="95XXXXXX63"
              type="text"
              id="contact_number"
              defaultValue={item.contact_number}
              disabled={!isEdit}
            />
          </Col>
          <Col sm="12" lg="6">
            <label>Web URL</label>
            <Form.Control
              placeholder="www.domin.com"
              type="text"
              id="web_url"
              defaultValue={item.web_url}
              disabled={!isEdit}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" lg="6">
            <label for="location">Location</label>
            <select
              name="location"
              id="location"
              className="form-control"
              defaultValue={item.location}
              disabled={!isEdit}
            >
              {locations.map((location, k) => (
                <option key={k} value={location.id}>
                  {location.location_name}
                </option>
              ))}
            </select>
          </Col>
          <Col sm="12" lg="6">
            <label>Reference</label>
            <Form.Control
              placeholder="Text"
              type="text"
              id="reference"
              defaultValue={item.reference}
              disabled={!isEdit}
            />
          </Col>
        </Row>
      </div>
    );
  const billingadd =
    edit === null ? null : (
      <div>
        <Row>
          <Col sm="12" lg="6">
            <label>CIN</label>
            <Form.Control
              placeholder="Text"
              type="text"
              id="cin"
              defaultValue={item.billings === null ? null : item.billings.cin}
              disabled={!isEdit}
            />
          </Col>
          <Col sm="12" lg="6">
            <label>PAN</label>
            <Form.Control
              placeholder="Text"
              type="text"
              id="pan"
              defaultValue={item.billings === null ? null : item.billings.pan}
              disabled={!isEdit}
            />
          </Col>
        </Row>
        <Row>
          <Col ms="12" lg="6">
            <label>GSTN</label>
            <Form.Control
              placeholder="Text"
              type="text"
              id="gstn"
              defaultValue={item.billings === null ? null : item.billings.gstn}
              disabled={!isEdit}
            />
          </Col>
          <Col sm="12" lg="6">
            <label>TAN</label>
            <Form.Control
              placeholder="Text"
              type="text"
              id="tan"
              defaultValue={item.billings === null ? null : item.billings.tan}
              disabled={!isEdit}
            />
          </Col>
        </Row>
        <label>Billing Address </label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder=""
          type="text"
          id="billing_address"
          defaultValue={
            item.billings === null ? null : item.billings.billing_address
          }
          disabled={!isEdit}
        />
      </div>
    );
  const spocadd =
    edit === null ? null : (
      <div>
        <Row>
          <Col md="6" sl="12">
            <label>First Name</label>
            <Form.Control
              placeholder="Name"
              type="text"
              id="first_name"
              defaultValue={item.spoc === null ? null : item.spoc.first_name}
              disabled={!isEdit}
            />
          </Col>
          <Col md="6" sl="12">
            <label>Last Name</label>
            <Form.Control
              placeholder="Name"
              type="text"
              id="last_name"
              defaultValue={item.spoc === null ? null : item.spoc.last_name}
              disabled={!isEdit}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" sl="12">
            <label>User Name</label>
            <Form.Control
              placeholder="UserName"
              type="text"
              id="user_name"
              defaultValue={item.spoc === null ? null : item.spoc.user_name}
              disabled={!isEdit}
            />
          </Col>
          <Col md="6" sl="12">
            <label>E-mail</label>
            <Form.Control
              placeholder="email"
              type="text"
              id="email"
              defaultValue={item.spoc === null ? null : item.spoc.email}
              disabled={!isEdit}
            />
          </Col>
        </Row>
      </div>
    );
  const kycadd =
    edit === null ? null : (
      <div>
        <Row>
          <Col md="6" sl="12">
            <label>Name</label>
            <Form.Control
              placeholder="Name of the document"
              type="text"
              id={"kyc_document_name"}
              defaultValue={
                item.kyc.length > 0 ? item.kyc[0].kyc_document_name : null
              }
              disabled={!isEdit}
            />
          </Col>
          <Col md="6" sl="12">
            <label>File</label>
            <br />
            <input
              type="file"
              id="file"
              disabled={!isEdit}
              onChange={(e) => setState({ kycfileEdit: e.target.files[0] })}
            />
          </Col>
        </Row>
        <div className="row">
          {item.kyc.map((kyc, key) => (
            <center key={key}>
              <div className="hm_cy1_aj">
                <img
                  src={setImgUrl2(kyc.file)}
                  className="hm_cy1_ak"
                  alt="..."
                />
                <div
                  className="hm_cy1_al"
                  onClick={() => window.open(setImgUrl2(kyc.file))}
                >
                  {kyc.kyc_document_name}
                </div>
                {isEdit ? (
                  <div
                    className="hm_cy1_am"
                    onClick={() => deleteCompanyKycdoc(setState, state, kyc.id)}
                  >
                    Remove
                  </div>
                ) : null}
              </div>
            </center>
          ))}
        </div>
      </div>
    );

  return (
    <PopupMd
      show={edit !== null}
      body={
        edit === null ? null : (
          <>
            <div className="hm_cy1_y">
              <div className="hm_cm1_atert_ttl"> {item.company_name}</div>
              <div className="row">
                {isEdit ? null : (
                  <Editheaderbutton
                    content={<i className="fas fa-pencil-alt c_editGreen" />}
                    hint="Edit"
                    onclick={() => setState({ isEdit: !isEdit })}
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
            <div className="hm_cy1_ah">
              <form onSubmit={(e) => updateCompany(e, state, setState)}>
                <div className="hm_cy1_z">General</div>
                {generaladd}
                <div className="hm_cy1_z">Billing Details</div>
                {billingadd}
                <div className="hm_cy1_z">SPOC</div>
                {spocadd}
                <div className="hm_cy1_z">KYC</div>
                {kycadd}
                <div className="hm_cy1_ag">
                  <div style={{ color: "red", margin: 15, float: "left" }}>
                    {errorEdit}
                  </div>
                  <button
                    type="submit"
                    className="hm_cy1_ai"
                    disabled={loadingEdit}
                  >
                    {loadingEdit ? "Loading..." : "Finish"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )
      }
    />
  );
}
