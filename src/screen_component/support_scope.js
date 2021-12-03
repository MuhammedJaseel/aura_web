import React from "react";
import api from "../module/api";
import { Row, Col, Button, Form } from "react-bootstrap";
import Datasetter from "../component/home_poser.js";
import { api_int_delete, api_int_get, api_int_post } from "../module/api_init";

class Scope extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      loading: true,
      selected: null,
      items: [],
      label: "",
    };
  }

  async loaditems() {
    var result = await api_int_get(api.scope);
    if (result.err) this.setState({ loading: false, error: result.data });
    else this.setState({ loading: false, items: result.data });
  }

  componentDidMount() {
    this.loaditems();
  }

  render() {
    const { items, loading, error, selected, label } = this.state;

    return (
      <div style={{ padding: 30 }}>
        <div style={{ height: 40 }}>
          <Add reload={() => this.loaditems()} />

          <div
            style={{
              textShadow: "3px 1px 5px #aaa",
              paddingLeft: 10,
              fontWeight: 500,
              fontSize: 25,
            }}
          >
            Support Scope
          </div>
        </div>
        <hr />
        <Row>
          <Col sm="12" lg="4">
            {items.map((item, key) => (
              <button
                key={key}
                style={{
                  borderWidth: 0,
                  margin: 3,
                  borderRadius: 5,
                  backgroundColor:
                    selected !== null
                      ? selected.id === item.id
                        ? "black"
                        : "#ddd"
                      : "#ddd",
                  color:
                    selected !== null
                      ? selected.id !== item.id
                        ? "black"
                        : "#eee"
                      : "black",
                  padding: 8,
                  width: "100%",
                }}
                onClick={() => this.setState({ selected: item })}
              >
                <b>{item.scope_name}</b>
              </button>
            ))}
          </Col>
          <Col sm="12" lg="8">
            {selected != null ? (
              <div>
                <Row>
                  <Col>
                    <b>{selected.scope_name}</b>
                  </Col>

                  <Col>
                    <input
                      placeholder="Type"
                      type="checkbox"
                      id=""
                      style={{
                        height: 15,
                        width: 15,
                        marginTop: 10,
                        marginRight: 8,
                      }}
                    />
                    <span>Hide</span>
                  </Col>
                  <Col>
                    <span style={{ color: "red" }}>{label}</span>
                  </Col>
                  <Col>
                    <Button
                      className="btn-fill mt-1 p-1 pull-right"
                      style={{ backgroundColor: "#203E79" }}
                      onClick={async () => {
                        var result = await api_int_delete(
                          api.scope + "/" + selected.id
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
                  </Col>
                </Row>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Datasetter loading={loading} error={error} items={items} />
      </div>
    );
  }
}

export default Scope;

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      label: "",
      loading: false,
      add: false,
    };
  }

  render() {
    const { label, add } = this.state;

    return add ? (
      <>
        <Form
          id="scop_add_form"
          onChange={() => this.setState({ label: "" })}
          onSubmit={async (e) => {
            e.preventDefault();
            if (e.target.scope_name.value !== "") {
              var result = await api_int_post(api.scope, {
                scope_name: e.target.scope_name.value,
              });
              if (result.err)
                this.setState({
                  label: "Some of your field's not updated, try again",
                });
              else {
                this.props.reload();
                document.getElementById("scop_add_form").reset();
              }
            } else this.setState({ label: "Enter the Scope" });
          }}
        >
          <button
            style={{
              float: "right",
              backgroundColor: "#DF1622",
              marginRight: 20,
              height: 36,
              borderRadius: 4,
              color: "white",
            }}
            onClick={() => this.setState({ add: true })}
          >
            Add
          </button>
          <div style={{ float: "right", paddingRight: 10, paddingLeft: 10 }}>
            <Form.Control
              placeholder="Type Scope To Add"
              type="text"
              id="scope_name"
            />
          </div>
          <div style={{ float: "right", color: "red", padding: 4 }}>
            {label}
          </div>
        </Form>
      </>
    ) : (
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
        onClick={() => this.setState({ add: true })}
      >
        <h5>+</h5>
      </button>
    );
  }
}
