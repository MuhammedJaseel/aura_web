import api from "../module/api";
import { api_get } from "../module/api_init";

export async function getVisitors(setstate) {
  setstate({ loading: true });
  const setdata = (data) => {
    setstate({ items: data });
    console.log(data);
  };
  const seterror = (err) => setstate({ error: err });
  await api_get(api.visitor, setdata, seterror);
  setstate({ loading: false });
  return;
}
