<template lang="pug" src="./index.pug"></template>
<style lang="stylus" src="./index.styl" scoped></style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Table extends Vue {
  /** 表格的表头设置 */

  @Prop(Array) tableConfig!: any

  /** 表格的数据源 */
  @Prop(Array) dataSource!: any

  /** 是否显示分页控制器，默认是显示 */

  @Prop({
    type: Boolean,
    default: true
  })
  paginationShow!: boolean

  /** 加载的loading */
  @Prop({
    type: Boolean,
    default: true
  })
  loading!: boolean

  /** 分页控制器的对象 */
  @Prop(Object) filter!: object

  /** 表格能否选择 默认是不显示*/
  @Prop({
    type: Boolean,
    default: false
  })
  isSelectColumn!: boolean

  /** 渲染的html */
  renderHTML(obj, column) {
    return column.render(obj, column.prop)
  }

  /** 分页控制器的size切换 */
  handleSizeChange(page_size) {
    this.$emit('sizeChange', page_size)
  }

  /** 分页控制器的page切换 */
  handleCurrentChange(page) {
    this.$emit('pageChange', page)
  }

  /** 表格头的选择框 */
  handleSelectionChange(arr) {
    this.$emit('handleSelectionChange',arr)
  }
}
interface FilterState {
  page: number
  page_size: number
  total: number
}
</script>
<style lang="stylus">
.table1 .el-table th:nth-last-child(2)
  border-right 1px solid #ebeef5
</style>

