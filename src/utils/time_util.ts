
/** 获取完整时间
 *
 */

export function getFullTime(date: Date) {

  let year = date.getFullYear()
  let month:any = date.getMonth() + 1
  let day:any = date.getDate()
  let hour:any = date.getHours()
  let minute:any = date.getMinutes()
  let second:any = date.getSeconds()

  return [year, fillZero(month), fillZero(day)].join("/") + " " +
    [fillZero(hour), fillZero(minute), fillZero(second)].join(":")
}

let fillZero = (val: any) => val < 10 ? "0" + val : val


