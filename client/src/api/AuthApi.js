import axios from "axios";
import api from "../configs/params";
import { ID_TOKEN } from "../configs/constants";

const { apiUrl } = api;

export function attemptSignUp(data) {
  return axios.request({
    url: `${apiUrl}/auth/sign-up`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data
  });
}

export function attemptSignUpVerification(data) {
  return axios.request({
    url: `${apiUrl}/auth/sign-up-verification`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data
  });
}

export function attemptSignIn(data) {
  return axios.request({
    url: `${apiUrl}/auth/sign-in`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data
  });
}

export function attemptSignOut(data) {
  const idToken = localStorage.getItem(ID_TOKEN);
  return axios.request({
    url: `${apiUrl}/auth/sign-out`,
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

export function attemptRequestPasswordReset(data) {
  return axios.request({
    url: `${apiUrl}/auth/password-reset`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data
  });
}

export function attemptSetNewPassword(data) {
  return axios.request({
    url: `${apiUrl}/auth/password-confirm`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data
  });
}
