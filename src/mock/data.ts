import axios from "axios";
import {getFullTime} from "@/utils/time_util.ts";

let flowDatabase = null;

export function mockFlowData(params) {
  const fromTime = params["fromTime"];
  const toTime = params["toTime"];
  console.log("fromTime:", fromTime, "toTime:", toTime)

  if (flowDatabase == null) {
    return {
      code: 404,
      message: "流量数据不存在，请联系管理员",
      data: {}
    };
  }

  let {leftIdx, rightIdx} = getIntervalIdx(flowDatabase[0], fromTime, toTime);
  if (leftIdx == -1 || rightIdx == -1) {
    return {
      code: 404,
      message: "选择的时间段错误，请重新选择",
      data: {}
    };
  }

  // const idxArr = flowDatabase[0].slice(leftIdx, rightIdx);
  const idxArr = [];
  const valArr = flowDatabase[1].slice(leftIdx, rightIdx);
  for (let i = leftIdx; i <= rightIdx; i++) {
    let dateTmp = new Date(flowDatabase[0][i] * 1000)
    idxArr.push(getFullTime(dateTmp));
  }
  idxArr.unshift("时间");
  valArr.unshift("流量");
  const ret = [];
  ret.push(idxArr);
  ret.push(valArr);

  console.log("返回数据：", ret);

  return {
    code: 200,
    message: "访问成功",
    data: {
      data: ret,
    },
  }
}


//初始化一些mock数据
export function innerMockDataInit() {
  if (flowDatabase == null) {
    axios.get("http://localhost:5173/static/mock/flow-data.json").then(resp => {
      flowDatabase = resp.data.data;
    });
  }
}

/**
 * 截取arr数组中的一部分，arr数组升序排列，leftVal为左区间值，rightVal为右区间
 * 截取的数组ret中，其最小值大于等于leftVal,最大值小于等于rightVal
 * @param arr
 * @param leftVal
 * @param rightVal
 */
function getIntervalIdx(arr, leftVal, rightVal) {

  const curTime = new Date().getTime();
  // 如果右边界超过当前时间，则修改右边界为当前时间
  rightVal = rightVal > curTime ? curTime : rightVal

  const leftIdx = findEdge(arr, leftVal)
  const rightIdx = findEdge(arr, rightVal, 1)
  return {leftIdx, rightIdx};
}

/**
 * 查找数组中最接近target的下标，返回值为等于target或大于target且最接近target的下标

 * @param arr
 * @param target
 * @param direction 为1表示右边界，默认左边界
 */
function findEdge(arr, target, direction = 0) {
  let left = 0;
  let right = arr.length - 1;
  if (arr[0] >= target) {
    return 0;
  }
  if (direction == 0 && arr[right] <= target) {
    return -1;
  }
  if (direction == 1 && arr[left] >= target) {
    return -1;
  }

  let mid = -1;
  while (left <= right) {
    mid = Math.round((right - left) / 2) + left;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  if (direction == 1) {
    return right
  }
  return left;
}
