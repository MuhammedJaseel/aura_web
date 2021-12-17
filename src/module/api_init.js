import axios from "axios";

export async function api_int_get(api) {
  const key = await window.sessionStorage.auth_key;
  return axios({
    method: "get",
    url: api,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + key,
    },
  })
    .then((res) => {
      if (res.data.status === 200) return { err: false, data: res.data.data };
      if (res.data.status === 401) window.location.replace("/login");
      else return { err: true, data: res.data.message };
    })
    .catch((err) => {
      if (err.toJSON().message === "Network Error")
        return { err: true, data: "Check Your Internet" };
      else if (err.response.status === 401) window.location.replace("/login");
      else return { err: true, data: "Error Loading data" };
    });
}

export async function api_int_post(api, body) {
  const key = await window.sessionStorage.auth_key;
  return axios({
    method: "post",
    url: api,
    headers: {
      Acept: "application/json",
      authorization: "Bearer " + key,
    },
    data: body,
  })
    .then((res) => {
      if (res.data.status === 200) return { err: false, data: res.data.data };
      if (res.data.status === 401) return window.location.replace("/login");
      else return { err: true, data: "Something Wrong Try again!" }; // res.data.message };
    })
    .catch((err) => {
      console.log(err);
      if (err.toJSON().message === "Network Error")
        return { err: true, data: "Check Your Internet" };
      else if (err.response.status === 401) window.location.replace("/login");
      else return { err: true, data: "Error Loading data" };
    });
}

export async function api_int_put(api, body) {
  const key = await window.sessionStorage.auth_key;
  return axios({
    method: "put",
    url: api,
    headers: {
      Acept: "application/json",
      authorization: "Bearer " + key,
    },
    data: body,
  })
    .then((res) => {
      if (res.data.status === 200) return { err: false, data: res.data.data };
      if (res.data.status === 401) return window.location.replace("/login");
      else return { err: true, data: "Something Wrong Try again!" }; // res.data.message };
    })
    .catch((err) => {
      if (err.toJSON().message === "Network Error")
        return { err: true, data: "Check Your Internet" };
      else if (err.response.status === 401) window.location.replace("/login");
      else return { err: true, data: "Error Loading data" };
    });
}

export async function api_int_delete(api) {
  const key = await window.sessionStorage.auth_key;
  return axios({
    method: "delete",
    url: api,
    headers: {
      Acept: "application/json",
      authorization: "Bearer " + key,
    },
  })
    .then((res) => {
      if (res.data.status === 200) return { err: false, data: res.data.data };
      if (res.data.status === 401) return window.location.replace("/login");
      else return { err: true, data: "Something Wrong Try again!" }; // res.data.message };
    })
    .catch((err) => {
      if (err.toJSON().message === "Network Error")
        return { err: true, data: "Check Your Internet" };
      else if (err.response.status === 401) window.location.replace("/login");
      else return { err: true, data: "Error Loading data" };
    });
}

export async function api_int_login(api) {
  const key = await window.sessionStorage.auth_key;
  return axios({
    method: "post",
    url: api,
    headers: {
      Acept: "application/json",
      authorization: "Bearer " + key,
    },
  })
    .then((res) => {
      if (res.data.status === 200) return { err: false, data: res.data.data };
      else return { err: true, data: res.data.data };
    })
    .catch((err) => {
      if (err.toJSON().message === "Network Error")
        return { err: true, data: "Check Your Internet" };
      else if (err.response.status === 401) window.location.replace("/login");
      else return { err: true, data: "Error Loading data" };
    });
}

export async function api_get(api, setdata, seterror) {
  const key = await window.sessionStorage.auth_key;
  return axios({
    method: "get",
    url: api,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + key,
    },
  })
    .then((res) => {
      if (res.data.status === 200) setdata(res.data.data);
      if (res.data.status === 401) window.location.replace("/login");
      else return seterror(res.data.message);
    })
    .catch((err) => {
      if (err.toJSON().message === "Network Error")
        return seterror("Check Your Internet");
      else if (err.response.status === 401) window.location.replace("/login");
      else return seterror("Error Loading data");
    });
}

export const setImgUrl = (img) => {
  if (img != null)
    return "https://www.mobileapp.kalyaniaura.com/storage/" + img.split("/")[1];
  else return "";
};

export const setImgUrl2 = (img) => {
  if (img != null)
    return "https://www.restapi.kalyaniaura.com/storage/" + img.split("/")[1];
  else return "";
};
