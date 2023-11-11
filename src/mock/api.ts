import {mockLineData} from "@/mock/data.ts";
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
      return mockLineData(paramObj(config.url), "flow", "时间", "流量");
    }
  },
  {
    url: "/api/oil-level-data",
    type: "get",
    response: (config) => {
      return mockLineData(paramObj(config.url), "oil-level", "时间", "油位");
    }
  },
  {
    url: "/api/oil-temperature-data",
    type: "get",
    response: (config) => {
      return mockLineData(paramObj(config.url), "oil-temperature", "时间", "油温");
    }
  },
  {
    url: "/api/pollution-degree-data",
    type: "get",
    response: (config) => {
      return mockLineData(paramObj(config.url), "pollution-degree", "时间", "污染度");
    }
  },
  {
    url: "/api/pressure-data",
    type: "get",
    response: (config) => {
      return mockLineData(paramObj(config.url), "pressure", "时间", "压力");
    }
  }
]


export default api