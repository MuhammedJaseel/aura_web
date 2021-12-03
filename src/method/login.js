import axios from "axios";
import api from "../module/api";

export async function adminLogin(e, setstate) {
  e.preventDefault();
  setstate({ loading: true });

  // const key = await window.sessionStorage.auth_key;
  await axios({
    method: "post",
    url: api.login +
      "?email=" +
      e.target.email.value +
      "&password=" +
      e.target.pass.value,
  })
    .then((res) => {
      if (res.data.status === 200) {
        window.sessionStorage.auth_key = res.data.data.token;
        window.sessionStorage.user_name =
          res.data.data.details.first_name + " " + res.data.data.details.last_name;
        window.sessionStorage.user_scop_id = res.data.data.details.scope_id;
        window.location.replace("admin/dashboard");
      }
      else { setstate({ error: res.data.data }); }
    })
    .catch((err) => {
      if (err.toJSON().message === "Network Error")
        setstate({ error: "Check Your Internet" })
      else if (err.response.status === 401) window.location.replace("/login");
      else
        setstate({ error: "Error Loading data" })
    });
  setstate({ loading: false });
}


