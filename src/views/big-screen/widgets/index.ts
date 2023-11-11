import ControlPanel from './components/ControlPanel.vue'
import MonitorFlow from '@/views/big-screen/widgets/components/Flow.vue'
import MonitorPressure from '@/views/big-screen/widgets/components/Pressure.vue'
import MonitorOilTemperature from '@/views/big-screen/widgets/components/OilTemperature.vue'
import MonitorOilLevel from '@/views/big-screen/widgets/components/OilLevel.vue'
import MonitorPollutionDegree from '@/views/big-screen/widgets/components/PollutionDegree.vue'
import MonitorError from '@/views/big-screen/widgets/components/Error.vue'
import ControlTurbine from '@/views/big-screen/widgets/components/Model.vue'

export default {
  ControlPanel,
  ControlTurbine,
  MonitorFlow,
  MonitorPressure,
  MonitorOilTemperature,
  MonitorOilLevel,
  MonitorPollutionDegree,
  MonitorError,
}
