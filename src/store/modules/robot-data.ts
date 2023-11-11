import {defineStore} from "pinia";


interface BrokenLine {
  fromTime: number,
  toTime: number,
  interval: number,
  data: []
}

interface RobotData {
  flowData: BrokenLine,
}

export const useRobotDataStore = defineStore({
  id: "robotData",

  state: ():RobotData => ({
    flowData: null
  }),

  getters: {
    getFlowData(state): BrokenLine {
      return state.flowData;
    }
  },

  actions: {
    setFlowData(data:BrokenLine): void {
      this.flowData = data;
    }
  }
})