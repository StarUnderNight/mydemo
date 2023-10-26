import Mock from "mockjs"
import {MockParams} from "@/mock/types";
import api from "@/mock/api";

// 需要遍历的请求
const mocks = [...api]

// 设置200-2000毫秒的延时
Mock.setup({
  timeout: "200-2000"
})

export function mockRequest() {
  let i: MockParams
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || "get", i.response)
  }
}