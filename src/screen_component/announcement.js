import React from "react";
import api from "../module/api";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Editheaderbutton } from "../component/home_button";
import { PopupMd, PopupSm } from "../component/popups";

import EditImageIcon from "../Assets/icon/edit_image2.png";
import { api_int_delete, api_int_get } from "../module/api_init";
import { api_int_post, api_int_put } from "../module/api_init";
import MyAlert from "../component/my_alert";
import HomeDatasetter from "../component/home_poser.js";
import HomeHeader from "../component/home_header";

class HomeAnnouncements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      items: [],
      locations: [],
    };
  }

  async loaditems() {
    var result1 = await api_int_get(api.announcement);
    var result2 = await api_int_get(api.location);
    if (result1.err) this.setState({ error: result1.data });
    else if (result2.err) this.setState({ error: result2.data });
    else this.setState({ items: result1.data, locations: result2.data });
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.loaditems();
  }

  render() {
    const { items, loading, error, locations } = this.state;
    return (
      <div style={{ padding: "20px 1%" }}>
        <HomeHeader title="Announcement" />
        <button
          style={{
            float: "right",
            backgroundColor: "#DF1622",
            marginRight: 5,
            height: 32,
            width: 32,
            borderRadius: 16,
            color: "white",
          }}
          onClick={() => this.setState({ showadd: true })}
        >
          <h5>+</h5>
        </button>
        <button
          style={{
            float: "right",
            backgroundColor: "#AC00A4",
            marginRight: 20,
            height: 32,
            width: 100,
            borderRadius: 5,
            color: "white",
          }}
        >
          <i
            className="fas fa-filter"
            style={{ fontSize: 15, color: "#white", float: "left", padding: 5 }}
          />
          <h6 style={{ float: "left" }}>Filters</h6>
        </button>
        <div
          style={{
            textShadow: "1px 1px 5px #999",
            paddingLeft: 5,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          Manage Announcement
        </div>
        <div style={{ marginTop: 20 }}>
          <List
            items={items}
            locations={locations}
            reload={() => this.loaditems()}
          />
        </div>
        <HomeDatasetter loading={loading} error={error} items={items} />
        <Add
          show={this.state.showadd}
          locations={locations}
          reload={() => this.loaditems()}
          close={() => this.setState({ showadd: false })}
        />
      </div>
    );
  }
}

export default HomeAnnouncements;

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editimage: false,
      view: false,
      showdelete: false,
      label: "",
      loading: false,
    };
  }

  render() {
    const { edit, view, editimage, showdelete, loading, label } = this.state;
    const { item, reload, locations } = this.props;

    return (
      <>
        <div className="fulldiv">
          <div
            className="announcement_single_body"
            onClick={() => this.setState({ view: true })}
          >
            {item.image == null ? null : (
              <div style={{ height: item.image == null ? 0 : 200 }}>
                {/* <img className="aimg" src={errorimage} alt="..." /> */}
                <img
                  className="aimg"
                  src={
                    "https://www.restapi.kalyaniaura.com/storage/" +
                    this.props.item.image.split("/")[1]
                  }
                  alt="..."
                />
              </div>
            )}

            <div className="topdiv">
              <button className="intrest">
                {item.interested_count}
                <i className="fas fa-chart-pie pl-1 " />
              </button>
              <p className="title">{item.title}</p>
            </div>

            {item.image == null ? (
              <div className="bottomdiv_noimage bottomdiv">
                {/* {item.schedule.split("T")[0]}&nbsp;&nbsp;&nbsp;
                {item.schedule.split("T")[1].split(".")[0]} */}
                {item.schedule}
                <br />
                {item.message}
              </div>
            ) : (
              <div className="bottomdiv">
                {/* {item.schedule.split("T")[0]}&nbsp;&nbsp;&nbsp;
                {item.schedule.split("T")[1].split(".")[0]} */}
                {item.schedule} <br />
                {item.message}
              </div>
            )}
          </div>
        </div>
        <View
          show={view}
          reload={reload}
          item={item}
          onedit={() => this.setState({ edit: true })}
          oneditimage={() => this.setState({ editimage: true })}
          close={() => this.setState({ view: false })}
          delete={() => this.setState({ showdelete: true })}
        />
        <Edit
          show={edit}
          reload={reload}
          locations={locations}
          item={item}
          close={() => this.setState({ edit: false })}
        />
        <EditImage
          show={editimage}
          reload={reload}
          item={item}
          close={() => this.setState({ editimage: false })}
        />
        <MyAlert
          show={showdelete}
          close={() => this.setState({ showdelete: false, label: "" })}
          body={
            <>
              <b>Are you sure want to Delete it?</b>
              <br />
              If you delete this Company, the related Members alose get deleted.
              <div style={{ color: "darkgreen" }}>{label}</div>
            </>
          }
          loading={loading}
          onconform={async () => {
            this.setState({ label: "", loading: true });
            var result = await api_int_delete(api.announcement + "/" + item.id);
            if (result.err) this.setState({ label: result.data });
            else window.location.reload();
            // {
            //   this.setState({
            //     view: false,
            //     showdelete: false,
            //     show: false,
            //     label: "",
            //   });
            //   reload();
            // }
            this.setState({ loading: false });
          }}
        />
      </>
    );
  }
}

function List({ items, locations, reload }) {
  return (
    <>
      {items.map((item, key) => (
        <Body key={key} item={item} locations={locations} reload={reload} />
      ))}
    </>
  );
}

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      loading: false,
      viewconent: false,
    };
  }

  render() {
    const { viewconent } = this.state;
    const { onedit, item, show, oneditimage } = this.props;
    return (
      <PopupMd
        show={show}
        body={
          <>
            <div
              style={{
                position: "relative",
                backgroundColor: "white",
                borderRadius: 8,
              }}
              onMouseOver={() => this.setState({ viewconent: true })}
              onMouseLeave={() => this.setState({ viewconent: false })}
            >
              <div
                className="fullview_content_page"
                style={{
                  visibility:
                    item.image == null ? null : viewconent ? null : "hidden",
                  backgroundColor: item.image == null ? "black" : null,
                }}
              >
                <Editheaderbutton
                  content={
                    <i
                      className="fas fa-window-close"
                      style={{ color: "rgba(255,255,255,.7)" }}
                    />
                  }
                  hint="Close"
                  onclick={this.props.close}
                />
                <Editheaderbutton
                  content={
                    <i
                      className="fas fa-trash-alt"
                      style={{ color: "rgba(255,255,255,.7)" }}
                    />
                  }
                  hint="Delete"
                  onclick={this.props.delete}
                />
                <Editheaderbutton
                  content={
                    <i
                      className="fas fa-pencil-alt"
                      style={{ color: "rgba(255,255,255,.7)" }}
                    />
                  }
                  hint="Edit"
                  onclick={onedit}
                />
                <Editheaderbutton
                  content={<img width="22" src={EditImageIcon} alt="..." />}
                  hint="Change Photo"
                  onclick={oneditimage}
                />
                <div className="fullview_discr">
                  <span className="fullview_title">{item.title}</span>
                  <br />
                  <b>
                    Schedule : {item.schedule}&nbsp;&nbsp; Expiration :
                    {item.expiration}
                  </b>
                  <br />
                  {item.message}
                </div>
              </div>
              {item.image == null ? (
                <div style={{ height: 500 }} />
              ) : (
                <img
                  className="fullimage"
                  src={
                    "https://www.restapi.kalyaniaura.com/storage/" +
                    (this.props.item.image == null
                      ? ""
                      : this.props.item.image.split("/")[1])
                  }
                  alt="..."
                />
              )}
            </div>
          </>
        }
      />
    );
  }
}

class EditImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      loading: false,
      photo: null,
    };
  }

  render() {
    const { label, loading, photo } = this.state;
    const { item, show } = this.props;
    return (
      <PopupSm
        show={show}
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
                Edit Announcement Image
              </span>
            </div>
            <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  this.setState({ loading: true, label: "" });

                  const formData = new FormData();

                  if (photo != null) {
                    formData.append("image", photo, photo.name);
                    formData.append("_method", "PUT");
                    const result = await api_int_post(
                      api.announcement + "/" + item.id,
                      formData
                    );
                    if (result.err)
                      this.setState({
                        label: "Something Wrong Try again!",
                      });
                    else {
                      this.props.close();
                      this.props.reload();
                    }
                  } else this.setState({ label: "Chose A File" });
                  this.setState({ loading: false });
                }}
              >
                <label>Chose a image to replace</label>
                <Form.Control
                  placeholder="type"
                  type="file"
                  id="image"
                  onChange={(e) =>
                    this.setState({ photo: e.target.files[0], label: "" })
                  }
                />

                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#04213C",
                    float: "right",
                    margin: 10,
                  }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Add"}
                </Button>

                <div style={{ height: 40, padding: 5 }}>
                  <div style={{ color: "red" }}>{label}</div>
                </div>
              </Form>
            </div>
          </>
        }
      />
    );
  }
}

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      loading: false,
    };
  }

  render() {
    const { label, loading } = this.state;
    const { item, locations, show } = this.props;
    return (
      <PopupMd
        show={show}
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
                Edit Announcement
              </span>
            </div>
            <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  var data = e.target;
                  this.setState({ loading: true, label: "" });

                  const body = {
                    title: data.title.value,
                    location: data.location.value,
                    schedule: data.schedule.value,
                    expiration: data.expiration.value,
                    message: data.message.value,
                  };
                  var result = await api_int_put(
                    api.announcement + "/" + item.id,
                    body
                  );
                  if (result.err) this.setState({ label: result.data });
                  else {
                    this.props.close();
                    this.props.reload();
                  }
                  this.setState({ loading: false });
                }}
              >
                <Row>
                  <Col sl="12" md="6" lg="6">
                    <label>Title</label>
                    <Form.Control
                      placeholder="type"
                      type="text"
                      id="title"
                      defaultValue={item.title}
                    />
                  </Col>
                  <Col sl="12" md="6" lg="6">
                    <label>Location</label>
                    <select
                      id="location"
                      class="form-control"
                      defaultValue={item.location}
                    >
                      {locations.map((location, k) => (
                        <option value={location.id}>
                          {location.location_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col sl="12" md="6" lg="6">
                    <label>Schedule Date</label>
                    <Form.Control
                      placeholder="type"
                      type="datetime-local"
                      id="schedule"
                      defaultValue={item.schedule}
                    />
                  </Col>
                  <Col sl="12" md="6" lg="6">
                    <label>Expiration Date</label>
                    <Form.Control
                      placeholder="type"
                      type="datetime-local"
                      id="expiration"
                      defaultValue={item.expiration}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sl="12" md="6" lg="6">
                    <label>Message</label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Type"
                      type="text"
                      id="message"
                      defaultValue={item.message}
                    />
                  </Col>
                </Row>
                <div style={{ height: 40, padding: 5 }}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#04213C", float: "right" }}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Update"}
                  </Button>
                  <div style={{ color: "red" }}>{label}</div>
                </div>
              </Form>
            </div>
          </>
        }
      />
    );
  }
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      loading: false,
      photo: null,
    };
  }

  render() {
    const { label, loading, photo } = this.state;
    const { locations } = this.props;
    return (
      <PopupMd
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
                Create Announcement
              </span>
            </div>
            <div style={{ padding: 25, backgroundColor: "#fefefe" }}>
              <Form
                id="anouncement_add_form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  var data = e.target;
                  this.setState({ loading: true, label: "" });

                  const formData = new FormData();
                  if (photo != null)
                    formData.append("image", photo, photo.name);
                  formData.append("title", data.title.value);
                  formData.append("location", data.location.value);
                  formData.append("schedule", data.schedule.value);
                  formData.append("expiration", data.expiration.value);
                  formData.append("message", data.message.value);

                  var result = await api_int_post(api.announcement, formData);
                  if (result.err) this.setState({ label: result.data });
                  else window.location.reload();
                  // {
                  // this.props.close();
                  // this.props.reload();
                  // document.getElementById("anouncement_add_form").reset();
                  // }

                  this.setState({ loading: false });
                }}
              >
                <Row>
                  <Col sl="12" md="6" lg="6">
                    <label>Title</label>
                    <Form.Control placeholder="type" type="text" id="title" />
                  </Col>
                  <Col sl="12" md="6" lg="6">
                    <label>Location</label>
                    <select id="location" class="form-control">
                      {locations.map((location, k) => (
                        <option value={location.id}>
                          {location.location_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col sl="12" md="6" lg="6">
                    <label>Schedule Date</label>
                    <Form.Control
                      placeholder="type"
                      type="datetime-local"
                      id="schedule"
                    />
                  </Col>
                  <Col sl="12" md="6" lg="6">
                    <label>Expiration Date</label>
                    <Form.Control
                      placeholder="type"
                      type="datetime-local"
                      id="expiration"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sl="12" md="6" lg="6">
                    <label>Message</label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Type"
                      type="text"
                      id="message"
                    />
                  </Col>
                  <Col sl="12" md="6" lg="6">
                    <label>Image</label>
                    <Form.Control
                      placeholder="type"
                      type="file"
                      id="image"
                      onChange={(e) =>
                        this.setState({ photo: e.target.files[0] })
                      }
                    />
                  </Col>
                </Row>
                <div style={{ height: 40, padding: 5 }}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#04213C", float: "right" }}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Add"}
                  </Button>
                  <div style={{ color: "red" }}>{label}</div>
                </div>
              </Form>
            </div>
          </>
        }
      />
    );
  }
}
