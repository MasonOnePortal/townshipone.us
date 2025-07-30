"use client";
var token;

export function setToken(tokenString) {
  token = tokenString;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("token", JSON.stringify(token));
  }
}
export function setSessionToken(tokenString) {
  token = tokenString;
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("access_token", JSON.stringify(token));
  }
}
export function getSessionToken() {
  if (!token && typeof sessionStorage !== "undefined") {
    token = JSON.parse(sessionStorage.getItem("access_token"));
  }
  return token;
}
export function getToken() {
  if (!token && typeof localStorage !== "undefined") {
    token = JSON.parse(localStorage.getItem("token"));
  }
  return token;
}

export function removeToken() {
  token = "";

  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("token");
    location.replace("/");
  }
}
export function removeSessionToken() {
  token = "";
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem("access_token");
    // location.replace("/");
  }
}
