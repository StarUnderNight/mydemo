import { defineStore } from 'pinia'
import { computed } from 'vue'
import { pinia } from '@/store'
import { map, filter, size, sortBy } from 'lodash'
import { Message } from '@arco-design/web-vue'
import { useLocalStorageState } from '@/hooks'
import MonitorOilLevel from "@/views/big-screen/widgets/oil-level/index.vue";
import MonitorPollutionDegree from "@/views/big-screen/widgets/pollution-degree/index.vue";


export type ModuleNameType =
  | 'MonitorFlow'
  | 'MonitorPressure'
  | 'MonitorOilTemperature'
  | 'MonitorOilLevel'
  | 'MonitorPollutionDegree'
  | 'MonitorError'

export type ModuleType = Record<
  ModuleNameType,
  {
    key: ModuleNameType
    label: string
    visible: boolean
    updateTime: number
  }
>

export const useLayoutStore = defineStore('app-BaseLayout', () => {
  /** @description: 所有的模块 */
  const layoutModules = useLocalStorageState<ModuleType>('BaseLayout-modules', {
    defaultValue: {
      MonitorFlow: {
        key: 'MonitorFlow',
        label: '流量监测',
        visible: true,
        updateTime: 1,
      },
      MonitorPressure: {
        key: 'MonitorPressure',
        label: '压力监测',
        visible: true,
        updateTime: 2,
      },
      MonitorOilTemperature: {
        key: 'MonitorOilTemperature',
        label: '油温监测',
        visible: true,
        updateTime: 3,
      },
      MonitorOilLevel: {
        key: 'MonitorOilLevel',
        label: '油位监测',
        visible: true,
        updateTime: 4,
      },
      MonitorPollutionDegree: {
        key: 'MonitorPollutionDegree',
        label: '污染度',
        visible: true,
        updateTime: 5,
      },
      MonitorError: {
        key: 'MonitorError',
        label: '异常监测',
        visible: true,
        updateTime: 6,
      },
    },
  })

  /** @description: 所有模块中可见的模块并按照更新时间排序, 返回的是模块的名称 */
  const validModules = computed(() => {
    const list = sortBy(filter(layoutModules.value, 'visible'), 'updateTime')
    return map(list, 'key')
  })

  /** @description: 将有效模块分块便于左右显示 */
  const chunkModules = computed(() => ({
    left: validModules.value.slice(0, 3),
    right: validModules.value.slice(3, 6),
  }))

  /** @description: 根据模块名称切换模块的可见性 */
  const onToggleByModuleName = (moduleName: ModuleNameType) => {
    const module = layoutModules.value[moduleName]
    const visible = !module?.visible
    if (visible && size(validModules.value) >= 6)
      return Message.warning('至多勾选六个模块')
    module.visible = visible
    module.updateTime = new Date().getTime()
    return undefined
  }

  return {
    layoutModules,
    validModules,
    chunkModules,
    onToggleByModuleName,
  }
})

/** @description: 在setup外部使用 */
export function useLayoutStoreWithOut() {
  return useLayoutStore(pinia)
}
