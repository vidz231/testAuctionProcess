/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getCookie } from "./cookie";

/**
 * Sends a GET request to the specified URL and returns the response data.
 * @param url - The URL to send the GET request to.
 * @returns A Promise that resolves to the response data.
 */
export const GET = async (url: string) => {
  const data: any = await (
    await fetch(import.meta.env.VITE_SERVER_URL + url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        // Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    })
  ).json();
  return data;
};

/**
 * Sends a POST request to the specified URL with the provided body.
 * @param url - The URL to send the request to.
 * @param body - The body of the request.
 * @returns A Promise that resolves to the response data.
 */
export const POST = async (url: string, body: any) => {
  //   console.log(getCookie("accessToken"));
  const data: any = await (
    await fetch(import.meta.env.VITE_SERVER_URL + url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        // Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(body),
    })
  ).json();
  return data;
};

/**
 * Sends a PUT request to the specified URL with the provided body.
 * @param url - The URL to send the request to.
 * @param body - The body of the request.
 * @returns A Promise that resolves to the response data.
 */
export const PUT = async (url: string, body: any) => {
  const data: any = await (
    await fetch(import.meta.env.VITE_SERVER_URL + url, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        // Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(body),
    })
  ).json();
  return data;
};

/**
 * Sends a DELETE request to the specified URL with the provided body.
 * @param url - The URL to send the request to.
 * @param body - The body of the request.
 * @returns A Promise that resolves to the response data.
 */
export const DELETE = async (url: string, body: any) => {
  const data: any = await (
    await fetch(import.meta.env.VITE_SERVER_URL + url, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        // Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(body),
    })
  ).json();
  return data;
};
