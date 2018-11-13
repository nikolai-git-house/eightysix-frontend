import axios from "axios";
import api from "configs/params";
import { ID_TOKEN } from "configs/constants";
import refreshToken from "../helpers/token/refreshToken";
const { apiUrl } = api;
/*eslint-disable*/
export function attemptGetProducts(data) {
  const idToken = localStorage.getItem(ID_TOKEN);
  return refreshToken().then(function() {
    return axios.request({
      url: `${apiUrl}/supplier/customer/${data.customerId}/products`,
      method: "GET",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
      params: data
    });
  });
}

export function attemptShowHideProduct(data) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/customer-product/${data.customerProductId}`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json"
    },
    data
  });
}
