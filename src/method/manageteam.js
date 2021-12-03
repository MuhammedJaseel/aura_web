import api from "../module/api";
import { api_int_delete, api_int_get } from "../module/api_init";
import { api_int_post, api_int_put } from "../module/api_init";

export async function getManageteam(setState) {
  var res1 = await api_int_get(api.teammember);
  var res2 = await api_int_get(api.location);
  var res3 = await api_int_get(api.role);
  var res4 = await api_int_get(api.scope);
  if (res1.err) setState({ error: res1.data });
  else if (res2.err) setState({ error: res2.data });
  else if (res3.err) setState({ error: res3.data });
  else if (res4.err) setState({ error: res4.data });
  else
    setState({
      items: res1.data,
      locations: res2.data,
      roles: res3.data,
      scops: res4.data,
    });
  setState({ loading: false });
  return;
}

export async function addRole(e, setState) {
  e.preventDefault();
  setState({ loadingRoles: true });
  var body = { role: e.target.role.value };
  var result = await api_int_post(api.role, body);
  if (result.err) setState({ errorgRoles: result.data });
  else await getManageteam(setState);
  setState({ loadingRoles: false });
}

export async function updateRole(e, setState, id) {
  e.preventDefault();
  setState({ loadingRoles: true });
  var body = { role: e.target.role.value };
  var result = await api_int_put(`${api.role}/${id}`, body);
  if (result.err) setState({ errorgRoles: result.data });
  else {
    getManageteam(setState);
    setState({ editRole: null });
  }
  setState({ loadingRoles: false });
}

export async function deleteRole(setState, id) {
  setState({ errorRoles: null, loadingRoles: true, showDeleteRole: false });
  var res = await api_int_delete(api.role + "/" + id);
  if (res.err) setState({ errorRoles: res.data });
  else {
    await getManageteam(setState);
    setState({
      showDeleteRole: false,
      editRole: null,
    });
  }
  setState({ loadingRoles: false });
}
