import api from "../module/api";
import { api_int_get, api_int_put } from "../module/api_init";

export async function getStream(setState) {
  var result = await api_int_get(api.stream);
  if (result.err) setState({ loading: false, error: result.data });
  else setState({ loading: false, items: result.data });
}

export async function searchSteam(e, setState) {
  e.preventDefault();
  if (e.target.value.length > 2) {
    getStreamByFiltered("feed/" + e.target.value, setState);
    setState({
      sort_title: "Showing Post releted to " + e.target.value,
    });
  }
  if (e.target.value.length === 0) {
    setState({ sort_title: "" });
    getStream(setState);
  }
}

export async function getStreamByFiltered(value, setState) {
  setState({ loading: true, error: null, items: [] });
  var result = await api_int_get(api.baseapi + value);
  if (result.err) setState({ loading: false, error: result.data });
  else setState({ loading: false, items: result.data });
}

export async function removeFilter(setState) {
  setState({ sort_title: "" });
  getStream(setState);
}

export async function hidePost(setState, item, status) {
  setState({ loading: true });
  var result = await api_int_put(`${api.stream}/${item.id}`, {
    post_status: status ? 1 : 0,
  });
  if (result.err) {
    status
      ? alert("Error on Hiding The Post")
      : alert("Error on Make Visible The Post");
  } else setState({ status: !status });

  setState({ loading: false });
}

export async function getMostPostCreated(setState) {
  var result = await api_int_get(api.stream_most_post);
  if (result.err) setState({ loading: false, error: result.data });
  else setState({ loading: false, stream_most_post: result.data });
}

export async function getCommend(setState, id) {
  setState({ loadingCmd: true, errorCmd: null });
  var result = await api_int_get(api.stream_operation + id + "/comment");
  if (result.err) setState({ loadingCmd: false, errorCmd: result.data });
  else setState({ loadingCmd: false, commends: result.data });
}

export async function hideCommend(setState, state) {
  // setState({ loadingCmd: true, errorCmd: null });
  // var result = await api_int_get(api.stream_operation + state.cmd + "/comment");
  // if (result.err) setState({ loadingCmd: false, errorCmd: result.data });
  // else setState({ loadingCmd: false, commends: result.data });
  // this.setState({ loadingCmdvisibility: true });
  // axios
  //   .put(api.stream + "/" + item.id, { post_status: status ? 1 : 0 })
  //   .then((res) => this.setState({ loadingCmdvisibility: false, status: !status }))
  //   .catch((err) => {
  //     this.setState({ loadingCmdvisibility: false });
  //     status ? alert("Thir is a Error on Hiding The Post") : alert("Thir is a Error on Make Visible The Post");
  //     return 0;
  //   });
}
