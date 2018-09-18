<template lang="pug" src="./index.pug"></template>
<style lang="stylus" src="./index.styl" scoped></style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DialogPage from './../dialog/index.vue'
import FilterPage from './../filter/index.vue'
import TablePage from './../table/index.vue'
import api from '@/api'
import { error } from 'util'
import { setInterval, clearInterval } from 'timers'

@Component({
  components: {
    DialogPage,
    FilterPage,
    TablePage
  }
})
export default class Common extends Vue {
  /** 表格的表头设置 */
  @Prop(Array) tableConfig!: any

  /** filter查询设置 */
  @Prop(Array) filterConfig!: any

  /** filter表单对象 */
  @Prop(Object) filterObj!: any

  /** filter的刷新timer */
  filterTimer: any = null

  /** 弹框设置 */
  @Prop(Array) dialogConfig!: any

  /** 弹框相关的参数，title，visible */
  @Prop(Object) dialog!: any

  /** 列表请求的接口地址 */
  @Prop(String) apiUrl!: string

  /** 是否显示分页控制器 */
  @Prop({
    type: Boolean,
    default() {
      return true
    }
  })
  paginationShow!: boolean

  /** 新增和编辑弹框的表单对象 */
  @Prop(Object) formObj!: any

  /** table的第一列是否显示可以供选择的，默认是不显示 */
  @Prop({
    type: Boolean,
    default: false
  })
  isSelectColumn!: boolean

  /** 分页控制器的相关参数 */
  filter: FilterState = {
    page: 1,
    page_size: 10,
    total: 0
  }

  /** 列表的数据源 */
  dataSource: any = []

  /** 是否加载 */
  loading: boolean = true

  /** 供filter重置按钮用的filterObj */
  filterDefaultObj: any = {}

  mounted() {
    if (this.filterConfig) {
      this.filterDefaultObj = { ...this.filterObj }
    }
    this.list()
  }

  /** 列表请求 */
  list() {
    this.loading = true
    const { page, page_size } = this.filter
    let params: any = {}
    if (this.paginationShow) {
      params.page = page
      params.page_size = page_size
    }
    let tempFilterObj: any = {}
    for (const key in this.filterObj) {
      if (key === 'sendKey') {
        tempFilterObj[this.filterObj[key]] = this.filterObj['sendValue']
      } else if (key === 'sendValue') {
      } else {
        tempFilterObj[key] = this.filterObj[key]
      }
    }
    api[this.apiUrl]({ ...params, ...tempFilterObj })
      .then((res: any) => {
        const { data, code, attributes } = res
        if (code === 0 && data) {
          this.dataSource = data
          const { total } = attributes
          this.filter.total = total || 0
        } else {
          this.dataSource = []
        }
        this.loading = false
      })
      .catch(error => {
        this.loading = false
      })
  }

  /** 分页控制器的page切换 */
  pageChange(page) {
    if (this.filter.page !== page) {
      this.filter.page = page
      this.list()
    }
  }

  /** 分页控制器的size切换 */
  sizeChange(page_size) {
    if (this.filter.page_size !== page_size) {
      this.filter.page_size = page_size
      this.list()
    }
  }

  /** 新增和编辑弹框的关闭事件 */
  closeDialog() {
    this.$emit('closeDialog')
  }

  /** 新增和编辑弹框的确定事件 */
  confirmDialog(obj) {
    this.$emit('confirmDialog', this.list)
  }

  /** filter的回调事件 */
  filterAction(obj) {
    const { event, value } = obj
    switch (event) {
      case 'export':
        console.log('导出功能')
        break
      case 'refrash':
        if (value.length) {
          this.filterTimer = setInterval(() => {
            this.list()
          }, Number(value) * 1000)
        } else {
          clearInterval(this.filterTimer)
        }
        break
      default:
        if (this.paginationShow) {
          this.filter = {
            page: 1,
            page_size: 10,
            total: 0
          }
        }
        this.list()
    }
  }

  /** 表格头的选择框 */
  handleSelectionChange(arr) {
    this.$emit('handleSelectionChange', arr)
  }
}

interface FilterState {
  page: number
  page_size: number
  total: number
}
</script>

