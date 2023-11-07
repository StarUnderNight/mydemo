<template>
  <BaseCollapse title="模型控制">
    <BaseCheckbox :value="checked" label="模型拆解" @change="ontoggle" />
  </BaseCollapse>
</template>
<script setup lang="ts">
import BaseCheckbox from '@/components/BaseCheckbox/index.vue'
import BaseCollapse from '@/components/BaseCollapse/index.vue'
import { inject, ref } from 'vue'

const turbineActions: any = inject('turbineActions')
const checked = ref(false)
const ontoggle = () => {
  checked.value = !checked.value

  // console.log('turbineActions', turbineActions)
  if (checked.value) {
    turbineActions.equipmentDecomposeAnimation()
  } else {
    turbineActions.equipmentComposeAnimation()
  }
}
</script>
