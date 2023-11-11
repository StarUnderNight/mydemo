import Mock from "mockjs"
import {MockParams} from "@/mock/types";
import api from "@/mock/api";
import {innerMockDataInit} from "@/mock/data.ts";

// 需要遍历的请求
const mocks = [...api]

// 设置200-2000毫秒的延时
Mock.setup({
  timeout: "200-2000"
})

export function mockRequest() {
  let param: MockParams
  for (param of mocks) {
    Mock.mock(new RegExp(param.url), param.type || "get", param.response)
  }
}


export function mockDataInit() {
  innerMockDataInit()
}