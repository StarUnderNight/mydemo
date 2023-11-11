import {DirectionalLight, PointLight, RectAreaLight, SpotLight, AmbientLight, HemisphereLight} from "three";

// 太阳光
function createDirectionLight() {
  const light = new DirectionalLight("white", 3)
  light.target.position.set(0, -30, 0)
  light.castShadow = true;  //告诉平行光需要开启阴影投射
  return light
}

// 灯泡 从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。
function createPointLight() {
  const light = new PointLight("white", 800)  // 创建强度为8的白光
  light.position.set(0, 0, 10)
  return light
}

// 聚光灯 光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
function createSpotLight() {
  const light = new SpotLight("white", 80)
  light.position.set(0, 0, 10)
  return light
}

// 窗口 平面光光源从一个矩形平面上均匀地发射光线
function createRectAreaLight() {
  const light = new RectAreaLight("white", 1)
  light.position.set(0, 0, 10)
  return light
}

// 环境光会均匀的照亮场景中的所有物体
function createAmbientLight() {
  const light = new AmbientLight("white", 1)
  light.position.set(10, 0, 0)
  return light
}

// 半球光 光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色
function createHemisphereLight() {
  const light = new HemisphereLight("white", 1)
  light.position.set(0, 0, 10)
  return light
}


export {createDirectionLight, createPointLight, createSpotLight, createRectAreaLight, createAmbientLight, createHemisphereLight}