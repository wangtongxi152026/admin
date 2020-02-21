import { stringify } from "qs";
import request from "@/utils/request";

// 时间轴
export async function queryTimeAxis(params) {
  return request(`/api/getTimeAxisList?${stringify(params)}`);
}

export async function addTimeAxis(params) {
  return request("/api/addTimeAxis", {
    method: "POST",
    data: params
  });
}

export async function delTimeAxis(params) {
  return request("/api/delTimeAxis", {
    method: "POST",
    data: params
  });
}

export async function updateTimeAxis(params) {
  return request("/api/updateTimeAxis", {
    method: "POST",
    data: params
  });
}

export async function getTimeAxisDetail(params) {
  return request("/api/getTimeAxisDetail", {
    method: "POST",
    data: params
  });
}
