import exportFromJSON from "export-from-json";
import api from "../module/api";
import { api_int_get } from "../module/api_init";

export async function getTickets(setState, state) {
  setState({ loading: true });
  var result = await api_int_get(`${api.tickets}?page=${state.page}`);
  if (result.err) setState({ error: result.data });
  else setState({ items: result.data.data, maxPage: result.data.last_page });
  setState({ loading: false });
}

export function pageUp(setState, state) {
  if (state.page < state.maxPage) {
    setState({ page: state.page + 1 });
    getTickets(setState, state);
  }
}

export function pageDown(setState, state) {
  if (state.page > 1) {
    setState({ page: state.page - 1 });
    getTickets(setState, state);
  }
}

export async function filterTickets(setState, value) {
  setState({
    loading: true,
    error: null,
    items: [],
    maxPage: 1,
  });
  var result = await api_int_get(api.ticket_filter + value);
  if (result.err) setState({ error: result.data });
  else setState({ items: result.data });
  setState({ loading: false });
}

export function exportData(items, fileName) {
  const data = [];
  for (let k = 0; k < items.length; k++)
    data.push({
      ID: items[k].id,
      Owner: items[k].user != null ? items[k].user.name : "Not Available",
      "Owner Phone Number":
        items[k].user != null ? items[k].user.mobile : "Not Available",
      Category:
        items[k].subcategory != null
          ? items[k].subcategory.sub_category
          : "Not Available",
      Disciption: items[k].ticket_description,
      Location:
        items[k].location != null
          ? items[k].location.location_name
          : "Not Available",
      "Asset Location": items[k].asset_location,
      "Assigned To":
        items[k].assigned_person != null
          ? items[k].assigned_person.assigned_to
          : "Not Available",
      Preiority:
        items[k].assigned_person != null
          ? items[k].assigned_person.remarks
          : "Not Available",
      Status: items[k].status,
      "Creared Date": items[k].created_at,
      "Updated Date": items[k].updated_at,
      Image:
        items[k].image !== null
          ? "https://mobileapp.kalyaniaura.com/storage/" +
            items[k].image.split("/")[1]
          : "No Image",
    });

  const exportType = "csv";
  exportFromJSON({ data, fileName, exportType });
}

// export async function loadMoreTickets(setState, state) {
//   var { page, items } = state;
//   page += 1;
//   setState({ loading: true, error: null });
//   const result = await api_int_get(`${api.tickets}?page=${page}`);
//   if (result.err) setState({ error: result.data });
//   else {
//     var _t_items = [...items, ...result.data.data];
//     setState({ items: _t_items });
//     var total = result.data.total;
//     var per_page = result.data.per_page;
//     if (page * per_page > total) setState({ more_button: false });
//   }
//   setState({ loading: false });
// }
