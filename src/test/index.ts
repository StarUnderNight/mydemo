import {cos} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";


function test1() {
  let arr = new Array(10)
  for (let i = 0;i < 10;i++) {
    arr[i] = i;
  }
  console.log(arr);
  const val = arr.pop();
  console.log(val, arr)
}

export function test() {
  // test1()
}