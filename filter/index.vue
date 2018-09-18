<template lang="pug" src="./index.pug"></template>
<style lang="stylus" src="./index.styl" scoped></style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'

@Component
export default class FilterPage extends Vue {
  /** filter表单对象 */
  @Prop(Array) filterConfig!: any

  /** filter表单对象 */
  @Prop(Object) formObj!: any

  /** 是否需要行内显示表单，默认是 是 */
  @Prop({
    type: Boolean,
    default: true
  })
  inline!: boolean

  $refs!: {
    form: Form
  }

  /** 重置表单验证 */
  resetForm() {
    this.$refs['form'].resetFields()
  }

  /** filter的按钮事件 */
  doFilterAction(event, value?: any) {
    console.log(event, value, 'doFilterAction')
    if (event === 'doReset') {
      this.resetForm()
    }
    this.$emit('filterAction', { event, value })
  }

  /** 有几个输入框合并的下拉选择时 */
  changeSelect() {
    if (this.formObj.sendKey) {
      this.formObj.sendValue = ''
    }
  }
}
</script>
<style lang="stylus">
.custom-filter1 .el-form-item
  padding-left 0
</style>

