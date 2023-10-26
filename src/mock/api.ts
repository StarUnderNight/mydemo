
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
  }
]


export default api