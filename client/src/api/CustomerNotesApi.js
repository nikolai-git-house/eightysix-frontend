import axios from 'axios';
import api from 'configs/params';
import { ID_TOKEN } from 'configs/constants';

const { apiUrl } = api;

export function attemptGetNotes(params) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/customer/${params.customerId}/notes`,
    method: 'GET',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    params,
  });
}

export function attemptCreateNote(data) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/customer/${data.customerId}/note`,
    method: 'POST',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    data,
  });
}

export function attemptUpdateNote(data) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/note/${data.id}`,
    method: 'POST',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    data,
  });
}


export function attemptDeleteNote(data) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/note/${data.id}`,
    method: 'DELETE',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    data,
  });
}
