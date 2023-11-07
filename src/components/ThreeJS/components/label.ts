import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {createStraightLine} from "@/components/ThreeJS/components/line.ts";
import {Vector3} from "three";

function createLabelWithLine(targetPos:Vector3, labelPos:Vector3, titleVal:string, contentVal:string) {
  const div = document.createElement("div")
  const title = document.createElement("span")
  const content = document.createElement("span")
  title.textContent = titleVal + ":";
  content.textContent = contentVal;

  div.appendChild(title)
  div.appendChild(content)

  div.style.padding = "5px"
  div.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  div.style.borderRadius = "3px"


  const label = new CSS2DObject(div)
  label.position.copy(labelPos);
  label.layers.set(1);
  const line = createStraightLine(labelPos, targetPos);
  line.layers.set(1);
  line.add(label)

  return line
}

export {createLabelWithLine}