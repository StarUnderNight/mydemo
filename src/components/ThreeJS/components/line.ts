import {BufferGeometry, Line, LineBasicMaterial, Vector3} from "three";

function createStraightLine(start: Vector3, end: Vector3) {
  const material = new LineBasicMaterial({color:"red"})
  const points = []
  points.push(start, end)
  const geometry = new BufferGeometry().setFromPoints(points)
  const line = new Line(geometry, material)
  return line
}

export {createStraightLine}