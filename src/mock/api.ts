import {mockFlowData} from "@/mock/data.ts";
import {MockParams} from "@/mock/types.ts";

function paramObj(url) {
  const search = url.split("?")[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

const api = [
  {
    url: "/api/test2",
    type: "get",
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        message: "成功",
        data: {
          ret: "成功",
        }
      }
    }
  },
  {
    url: "/api/flow-data",
    type: "get",
    response: (config) => {
      return mockFlowData(paramObj(config.url))
    }
  }
]


export default api