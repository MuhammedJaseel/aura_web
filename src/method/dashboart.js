import api from "../module/api";
import { api_int_get } from "../module/api_init";

async function getDashboard(setstate) {
  var result = await api_int_get(api.dashboard);
  if (result.err) setstate({ error: result.data });
  else {
    setstate({ items: result.data });
  }
  setstate({ loading: false });
}

export default getDashboard;
