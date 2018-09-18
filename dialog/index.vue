<template lang="pug" src="./index.pug"></template>
<style lang="stylus" src="./index.styl" scoped></style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FilterPage from './../filter/index.vue'

@Component({
  components: {
    FilterPage
  }
})
export default class Dialog extends Vue {
  /** 弹框设置 */
  @Prop(Array) dialogConfig!: any

  /** 弹框相关的参数，title，visible */
  @Prop(Object) dialog!: any

  /** 新增和编辑弹框的表单对象 */
  @Prop(Object) formObj!: any

  $refs!: {
    resetForm: any
  }

  /** 关闭弹框的时间 */
  closeFuc() {
    this.$refs['filter'].resetForm()
    this.$emit('closeDialog')
  }

  /** 弹框的确认事件 */
  confirmDialogFuc() {
    this.$refs['filter'].$children[0].validate(valid => {
      if (valid) {
        this.$emit('confirmDialog', this.formObj)
      }
    })
  }
}
</script>

