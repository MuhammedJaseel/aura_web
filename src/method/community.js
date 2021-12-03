import api from "../module/api";
import { api_int_delete, api_int_get } from "../module/api_init";
import { api_int_post, api_int_put } from "../module/api_init";

export async function getMemeber(setState) {
  var res1 = await api_int_get(api.members);
  var res2 = await api_int_get(api.location);
  var res3 = await api_int_get(api.companies);
  if (res1.err) setState({ error: res1.data });
  else if (res2.err) setState({ error: res2.data });
  else if (res3.err) setState({ error: res3.data });
  else
    setState({ items: res1.data, locations: res2.data, companies: res3.data });
  setState({ loading: false });
  return;
}

export async function searchMember(e, setState) {
  const value = e.target.value;
  if (value.length === 0) getMemeber(setState);
  if (value.length > 2) {
    setState({ loading: true });
    const result = await api_int_get(api.membersearch + value);
    if (result.err) setState({ error: result.data });
    else setState({ items: result.data });
    setState({ loading: false });
  }
}

export async function deleteMember(setState, item) {
  setState({ errorDelete: null, loadingDelete: true });
  var result = await api_int_delete(api.members + "/" + item.id);
  if (result.err) setState({ errorDelete: result.data });
  else {
    await getMemeber(setState);
    setState({ showDelete: false, edit: null, show: false, errorDelete: null });
  }
  setState({ loadingDelete: false });
}

export async function getCompany(setState) {
  var result1 = await api_int_get(api.companies);
  var result2 = await api_int_get(api.location);
  if (result1.err) setState({ error: result1.data });
  else if (result2.err) setState({ error: result2.data });
  else setState({ items: result1.data, locations: result2.data });
  setState({ loading: false });
  return;
}

export async function deleteCompany(setState, state) {
  setState({ errorDelete: "", loadingDelete: true });
  var result = await api_int_delete(api.companies + "/" + state.edit.id);
  if (result.err) setState({ errorDelete: result.data });
  else {
    setState({ showDelete: false, edit: null, errorDelete: null });
    getCompany(setState);
  }
  setState({ loadingDelete: false });
}

export async function addMember(e, setState, state) {
  e.preventDefault();
  var data = e.target;
  function validate(itemedit) {
    if (
      itemedit.password != null &&
      itemedit.cpassword != null &&
      itemedit.name != null &&
      itemedit.email != null &&
      itemedit.first_name != null &&
      itemedit.last_name != null &&
      itemedit.work_station != null &&
      itemedit.mobile != null &&
      itemedit.working_company != null
    ) {
      if (itemedit.password.toString().length < 8) return 2;
      else if (itemedit.password !== itemedit.cpassword) return 3;
      else if (itemedit.mobile.toString().length !== 10) return 4;
      else return 0;
    } else return 1;
  }
  setState({ loadingAdd: true, errorAdd: null });
  const body = {
    password: data.password.value,
    cpassword: data.cpassword.value,
    name: data.name.value,
    email: data.email.value,
    first_name: data.first_name.value,
    last_name: data.last_name.value,
    mobile: data.mobile.value,
    designation: data.designation.value,
    location: state.locations[data.work_station.value].location_name,
    work_station: state.locations[data.work_station.value].id,
    company: state.companies[data.working_company.value].company_name,
    working_company: state.companies[data.working_company.value].id,
    spoc: state.spoc ? "1" : "0",
  };
  switch (validate(body)) {
    case 0: {
      var result = await api_int_post(api.members, body);
      if (result.err) setState({ errorAdd: result.data, page: 1 });
      else {
        document.getElementById("member_add_form").reset();
        await getMemeber(setState);
        setState({ showAdd: false });
      }
      break;
    }
    case 1:
      setState({ errorAdd: "Some of the fields are missing" });
      break;
    case 2:
      setState({ errorAdd: "Password is not strong minimum 8 charector" });
      break;
    case 3:
      setState({ errorAdd: "Password is not same" });
      break;
    case 4:
      setState({ errorAdd: "Phone Number is not valid" });
      break;
    default:
      break;
  }
  setState({ loadingAdd: false });
}

export async function addCompany(e, state, setState) {
  e.preventDefault();
  setState({ loadingAdd: true, errorAdd: null });
  var data = e.target;
  const datas = {
    company_name: data.company_name.value,
    company_email: data.company_email.value,
    contact_number: data.contact_number.value,
    web_url: data.web_url.value,
    location: data.location.value,
    reference: data.reference.value,
    cin: data.cin.value,
    pan: data.pan.value,
    gstn: data.gstn.value,
    tan: data.tan.value,
    billing_address: data.billing_address.value,
    first_name: data.first_name.value,
    last_name: data.last_name.value,
    user_name: data.user_name.value,
    email: data.email.value,
  };
  var result = await api_int_post(api.companies, datas);
  if (result.err) setState({ errorAdd: "Error" });
  else {
    var kyc = new FormData();
    if (state.kycfileAdd !== null) {
      kyc.append("file", state.kycfileAdd, state.kycfileAdd.name);
      kyc.append("kyc_document_name", data.kyc_document_name.value);
      var id = result.data.id;
      var result2 = await api_int_post(
        `${api.companiekyc}/${id}/companieskyc`,
        kyc
      );
      if (result2.err) {
        getCompany(setState);
        var errorAdd = `KYS Document not added Other details are added, try to update your KYC document`;
        setState({ errorAdd });
      } else {
        setState({ loadingAdd: false, showAdd: false });
        getCompany(setState);
      }
    } else {
      setState({ loadingAdd: false, showAdd: false });
      getCompany(setState);
    }
  }
  setState({ loadingAdd: false });
}

export function setNameLetters(item) {
  if (item === null) return "";
  var fn = item.first_name;
  var sn = item.last_name;
  var f = fn === null || fn.length === 0 ? " " : fn[0].toUpperCase();
  var s = sn === null || sn.length === 0 ? " " : sn[0].toUpperCase();
  return f + s;
}

export async function updateCompany(e, state, setState) {
  e.preventDefault();
  setState({ loadingEdit: true, errorEdit: null });
  var data = e.target;
  const datas = {
    company_name: data.company_name.value,
    company_email: data.company_email.value,
    contact_number: data.contact_number.value,
    web_url: data.web_url.value,
    location: data.location.value,
    reference: data.reference.value,
    cin: data.cin.value,
    pan: data.pan.value,
    gstn: data.gstn.value,
    tan: data.tan.value,
    billing_address: data.billing_address.value,
    first_name: data.first_name.value,
    last_name: data.last_name.value,
    user_name: data.user_name.value,
    email: data.email.value,
  };
  var id = state.edit.id;
  var result = await api_int_put(`${api.companies}/${id}`, datas);
  if (result.err) setState({ errorEdit: "Error" });
  else {
    var kyc = new FormData();
    if (state.kycfileEdit !== null) {
      kyc.append("file", state.kycfileEdit, state.kycfileEdit.name);
      kyc.append("kyc_document_name", data.kyc_document_name.value);
      var result2 = await api_int_post(
        `${api.companiekyc}/${id}/companieskyc`,
        kyc
      );
      if (result2.err) {
        getCompany(setState);
        var errorEdit = `KYS Document not added Other details are added, try to update your KYC document`;
        setState({ errorEdit, loadingEdit: false });
      } else {
        await getCompany(setState);
        setState({ loadingEdit: false });
      }
    } else {
      await getCompany(setState);
      setState({ loadingEdit: false, edit: null });
    }
  }
  setState({ loadingAdd: false });
}

export async function deleteCompanyKycdoc(setState, state, id) {
  if (window.confirm("Confirm Delte")) {
    var _api = `${api.companiekyc}/${state.edit.id}/companieskyc/${id}`;
    var result = await api_int_delete(_api);
    if (result.err) setState({ errorEdit: result.data });
    else getCompany(setState);
  }
}
