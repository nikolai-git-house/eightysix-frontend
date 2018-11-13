import axios from "axios";
import api from "configs/params";
import { ID_TOKEN } from "configs/constants";
import refreshToken from "../helpers/token/refreshToken";
const { apiUrl } = api;
/*eslint-disable*/
export function attemptGetCustomers(data) {
  // eslint-disable-line import/prefer-default-export
  const idToken = localStorage.getItem(ID_TOKEN);
  return axios.request({
    url: `${apiUrl}/supplier/customer-users`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json"
    },
    params: data
  });
}
