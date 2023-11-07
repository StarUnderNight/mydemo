



function test1() {
  let arr = new Array(10)
  for (let i = 0;i < 10;i++) {
    arr[i] = i;
  }
  const barr = arr.slice(5, 8);
  console.log(arr, barr)
}

export function test() {
  // test1()
}