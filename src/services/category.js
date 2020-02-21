import { stringify } from "qs";
import request from "@/utils/request";
// 分类
export async function queryCategory(params) {
  return request(`/api/getCategoryList?${stringify(params)}`);
}
// export async function queryCategory(params) {
//   return request("/api/getCategoryList", { params });
// }

export async function addCategory(params) {
  return request("/api/addCategory", {
    method: "POST",
    data: params
  });
}
export async function updateCategory(params) {
  return request(
    "/api/updateCategory",
    {
      method: "POST",
      data: params
    },
    console.log(request.headers)
  );
}

export async function delCategory(params) {
  return request("/api/delCategory", {
    method: "POST",
    data: params
  });
}
