import api from "../module/api";
import {
  api_int_delete,
  api_int_get,
  api_int_post,
  api_int_put,
} from "../module/api_init";

function setPage(setState, v) {
  window.sessionStorage.spacepage = v;
  setState({ page: v });
}

async function getLocation(setState) {
  let result = await api_int_get(api.location);
  if (result.err) setState({ loading: false, error: result.err });
  else setState({ loading: false, items: result.data });
}
async function getInventory(setState) {
  var result = await api_int_get(api.inventories);
  if (result.err) setState({ loading: false, error: result.data });
  else setState({ loading: false, items: result.data });
}

async function getPlan(setState) {
  var result1 = await api_int_get(api.plan);
  var result2 = await api_int_get(api.location);
  var result3 = await api_int_get(api.inventories);

  if (result1.err) setState({ error: result1.data });
  else if (result2.err) setState({ error: result2.data });
  else if (result3.err) setState({ error: result3.data });
  else
    setState({
      items: result1.data,
      locations: result2.data,
      inventories: result3.data,
    });

  setState({ loading: false });
}

async function deleteLocation(setState, id) {
  setState({ errorDelete: "", loadingDelete: true });
  var result = await api_int_delete(api.location + "/" + id);
  if (result.err) setState({ errorDelete: result.data });
  else {
    setState({ showDelete: false, show: false, errorDelete: "" });
    getLocation(setState);
  }
  setState({ loadingDelete: false });
}

async function deleteInventory(setState, item, reload) {
  setState({ label: "", loading: true });
  var result = await api_int_delete(api.inventories + "/" + item.id);
  if (result.err) setState({ label: result.data });
  else {
    setState({ showdelete: false, show: false, label: "" });
    reload();
  }
  setState({ loading: false });
}

async function deletePlan(setState, item, reload) {
  setState({ label: "", loading: true });
  var result = await api_int_delete(api.plan + "/" + item.id);
  if (result.err) setState({ label: result.data });
  else {
    setState({ showdelete: false, show: false, label: "" });
    reload();
  }
  setState({ loading: false });
}

async function addLocation(e, setState, state) {
  e.preventDefault();
  var data = e.target;
  setState({ loadingAdd: true, errorAdd: "" });
  const body_gen = {
    location_name: data.location_name.value,
    seating_capacity: data.seating_capacity.value,
    area: data.area.value,
    contact_number: data.contact_number.value,
    email: data.email.value,
  };
  const body_bill = {
    legal_business_name: data.legal_business_name.value,
    address: data.address.value,
    notes_top: data.notes_top.value,
    notes_bottom: data.notes_bottom.value,
    gstn: data.gstn.value,
    state: data.state.value,
    city: data.city.value,
  };
  const body_bank = {
    bank_name: data.bank_name.value,
    branch: data.branch.value,
    ifsc: data.ifsc.value,
    account_number: data.account_number.value,
    benificiary_name: data.benificiary_name.value,
  };
  var id = "";
  var result = await api_int_post(api.location, body_gen);
  if (result.err) setState({ errorAdd: result.data });
  else {
    id = await result.data.id;
    var _api_bill = api.location + "/" + id + "/billings";
    var result_1 = await api_int_post(_api_bill, body_bill);
    if (result_1.err) setState({ errorAdd: result_1.data });
    var _api_bank = api.location + "/" + id + "/banks";
    var result_2 = await api_int_post(_api_bank, body_bank);
    if (result_2.err) setState({ errorAdd: result_2.data });
    document.getElementById("location_add_form").reset();
    setState({ showAdd: false });
    getLocation(setState);
  }
  setState({ loadingAdd: false });
}

async function addInventory(e, setState, reload) {
  e.preventDefault();
  setState({ loading: true, label: "" });
  var body = {
    title: e.target.title.value,
    res_type: e.target.res_type.value,
    hsn_code: e.target.hsn_code.value,
  };
  var result = await api_int_post(api.inventories, body);
  if (result.err) setState({ label: result.data });
  else {
    setState({ show: false });
    reload();
    document.getElementById("inventory_add_form").reset();
  }

  setState({ loading: false });
}

async function addPlan(e, setState, reload) {
  e.preventDefault();
  setState({ loading: true, label: "" });
  var data = e.target;
  var items = {
    inventory_id: data.inventory_id.value,
    location: data.location.value,
    resource_price: data.resource_price.value,
    num_seats: data.num_seats.value,
    description: data.description.value,
    area: data.area.value,
    meeting_room_credits: "0",
    printer_credits: "0",
  };
  var result = await api_int_post(api.plan, items);
  if (result.err) setState({ label: result.data });
  else {
    setState({ show: false });
    reload();
    document.getElementById("plan_add_form").reset();
  }
  setState({ loading: false });
}

async function editLocation(e, setState, state) {
  e.preventDefault();
  var data = e.target;
  setState({ loadingEdit: true, errorEdit: null });
  const body_gen = {
    location_name: data.location_name.value,
    seating_capacity: data.seating_capacity.value,
    area: data.area.value,
    contact_number: data.contact_number.value,
    email: data.email.value,
  };
  const body_bill = {
    legal_business_name: data.legal_business_name.value,
    address: data.address.value,
    notes_top: data.notes_top.value,
    notes_bottom: data.notes_bottom.value,
    gstn: data.gstn.value,
    state: data.state.value,
    city: data.city.value,
  };
  const body_bank = {
    bank_name: data.bank_name.value,
    branch: data.branch.value,
    ifsc: data.ifsc.value,
    account_number: data.account_number.value,
    benificiary_name: data.benificiary_name.value,
  };
  var _api_gen = `${api.location}/${state.edit.id}`;
  var result = await api_int_put(_api_gen, body_gen);
  if (result.err) setState({ errorEdit: result.data });
  var _api_bill = `${api.location}/${state.edit.id}/billings/${state.edit.billing.id}`;
  var result_1 = await api_int_put(_api_bill, body_bill);
  if (result_1.err) setState({ errorEdit: result_1.data });
  var _api_bank = `${api.location}/${state.edit.id}/banks/${state.edit.bank.id}`;
  var result_2 = await api_int_put(_api_bank, body_bank);
  if (result_2.err) setState({ errorEdit: result_2.data });
  getLocation(setState);
  setState({ errorEdit: null, loadingEdit: false });
}

async function editInventory(e, setState, reload, close, body) {
  e.preventDefault();
  var data = e.target;
  setState({ loading: true, label: "" });
  var _api = `${api.inventories}/${body.id}`;
  var result = await api_int_put(_api, {
    title: data.title.value,
    res_type: data.res_type.value,
    hsn_code: data.hsn_code.value,
  });
  if (result.err) setState({ label: result.data });
  else {
    close();
    reload();
  }
  setState({ loading: false });
}

async function editPlan(e, setState, reload, close, body) {
  e.preventDefault();
  setState({ loading: true, label: "" });
  var data = e.target;
  var items = {
    inventory_id: data.inventory_id.value,
    location: data.location.value,
    resource_price: data.resource_price.value,
    num_seats: data.num_seats.value,
    description: data.description.value,
    area: data.area.value,
    meeting_room_credits: 0,
    printer_credits: 0,
  };
  var result = await api_int_put(`${api.plan}/${body.id}`, items);
  if (result.err) setState({ label: result.data });
  else {
    close();
    reload();
  }

  setState({ loading: false });
}

export {
  setPage,
  getLocation,
  getInventory,
  getPlan,
  deleteInventory,
  deleteLocation,
  deletePlan,
  addLocation,
  addInventory,
  addPlan,
  editLocation,
  editInventory,
  editPlan,
};
