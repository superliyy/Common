
/**************模板HTML调用*******************/
// common(
//   :tableConfig="tableColumn"
//   :apiUrl="apiUrl"
//   :paginationShow="false" 
//   :dialogConfig="dialogConfig"
//   :formObj="formObj"
//   :dialog="dialog" 
//   @closeDialog="closeDialog" 
//   @confirmDialog="confirmDialog"
//   :filterConfig="filterConfig"
//   :filterObj="filterObj"
//   ref="common"
// )

/****************vue文件相对应的配置*************/
/** 层级列表的table设置 */
// get tableColumn(): object[] {
//   return [
//     {
//       label: '层级名称',
//       prop: 'name',
//       width: '150'
//     },
//     {
//       label: '描述',
//       prop: 'memo',
//       minWidth: '160'
//     },
//     {
//       label: '加入条件',
//       child: [
//         {
//           label: '会员加入时间',
//           prop: 'register_stime,register_etime',
//           minWidth: '170',
//           render: (obj, prop) => {
//             const tempProp = prop.split(',')
//             return `
//               <div>
//                 <p>${obj[tempProp[0]]}</p>
//                 <p>~</p>
//                 <p>${obj[tempProp[1]]}</p>                  
//               </div>
//               `
//           }
//         },
//         {
//           label: '存款时间',
//           prop: 'deposit_stime,deposit_etime',
//           minWidth: '170',
//           render: (obj, prop) => {
//             const tempProp = prop.split(',')
//             return `
//               <div>
//                 <p>${obj[tempProp[0]]}</p>
//                 <p>~</p>
//                 <p>${obj[tempProp[1]]}</p>                  
//               </div>
//               `
//           }
//         },
//         {
//           label: '区间存款总额',
//           prop: 'deposit_min,deposit_max',
//           minWidth: '110',
//           render: (obj, prop) => {
//             const tempProp = prop.split(',')
//             return `<span>${obj[tempProp[0]]}~${obj[tempProp[1]]}</span>`
//           }
//         },
//         {
//           label: '存款次数',
//           prop: 'deposit_times',
//           minWidth: '80'
//         },
//         {
//           label: '存款总额',
//           prop: 'deposit_money',
//           minWidth: '80'
//         },
//         {
//           label: '最大存款额',
//           prop: 'max_deposit_money',
//           minWidth: '110'
//         },
//         {
//           label: '提款次数',
//           prop: 'withdraw_times',
//           minWidth: '80'
//         },
//         {
//           label: '提款总额',
//           prop: 'withdraw_count',
//           minWidth: '80'
//         }
//       ]
//     },
//     {
//       label: '会员人数',
//       prop: 'num',
//       type: 'button',
//       click: obj => {
//         const { num, id } = obj
//         if (Number(num) > 0) {
//           this.isSelfDetail = 3
//           this.lidId = String(id)
//           const tempQuery = this.$route.query
//           this.$router.push({ path: '/member-hierarchy', query: { ...tempQuery, isDetail: '3', lid: id } })
//         }
//       },
//       minWidth: '100'
//     },
//     {
//       label: '备注',
//       prop: 'comment',
//       minWidth: '160'
//     },
//     {
//       label: '操作',
//       type: 'button',
//       width: '220',
//       btnArray: [
//         {
//           label: '分层',
//           click: (obj, callback) => {
//             const { id, name } = obj
//             this.requestLevelList(id)
//             this.activeCheckLayer = { id, name, callback }
//           },
//           show: this.unauthorizedBtnDic['id_5']
//         },
//         {
//           label: '回归',
//           click: (obj, callback) => {
//             const { id, name } = obj
//             this.$confirm(`确定将${name}层回归到未分层？`, '系统提示', {
//               confirmButtonText: '确定',
//               cancelButtonText: '取消'
//             })
//               .then(() => {
//                 api
//                   .userLevelRestore({ id, m_base_id: 32 })
//                   .then((res: any) => {
//                     const { code, message } = res
//                     if (code == 0) {
//                       this.$message.success(`${name}层回归成功！`)
//                       callback()
//                     } else {
//                       this.$message.error(`${name}层回归失败，请稍后重试！`)
//                     }
//                   })
//                   .catch((error: any) => {})
//               })
//               .catch(() => {})
//           },
//           show: this.unauthorizedBtnDic['id_6']
//         },
//         {
//           label: '编辑',
//           click: (obj, callback) => {
//             const { deposit_min, deposit_max, deposit_money, max_deposit_money, withdraw_count, deposit_times, withdraw_times } = obj
//             obj.deposit_min = deposit_min.toString()
//             obj.deposit_max = deposit_max.toString()
//             obj.deposit_money = deposit_money.toString()
//             obj.max_deposit_money = max_deposit_money.toString()
//             obj.withdraw_count = withdraw_count.toString()
//             obj.deposit_times = String(deposit_times)
//             obj.withdraw_times = String(withdraw_times)
//             this.formObj = { ...obj }
//             this.dialogVisible = true
//           },
//           show: this.unauthorizedBtnDic['id_7']
//         },
//         {
//           label: '设定',
//           click: (obj, callback) => {
//             const { id, name } = obj
//             this.isSelfDetail = 2
//             this.activeCheckLayer = { id, name, callback }
//             const tempQuery = this.$route.query
//             this.$router.push({ path: '/member-hierarchy', query: { ...tempQuery, isDetail: '2', level_id: id } })
//           },
//           show: this.unauthorizedBtnDic['id_4']
//         },
//         {
//           label: '删除',
//           click: (obj, callback) => {
//             const { name, id } = obj
//             this.$confirm(`确定删除${name}吗？`, '系统提示', {
//               confirmButtonText: '确定',
//               cancelButtonText: '取消'
//             })
//               .then(() => {
//                 api
//                   .deleteUserLevel({ id, m_base_id: 34 })
//                   .then((res: any) => {
//                     const { code, msg } = res
//                     if (code == 0) {
//                       this.$message.success(`${name}层删除成功！`)
//                       callback()
//                     } else {
//                       this.$message.error(msg)
//                     }
//                   })
//                   .catch((error: any) => {})
//               })
//               .catch(() => {})
//           },
//           show: this.unauthorizedBtnDic['id_8']
//         }
//       ]
//     }
//   ]
// }

// /** 新增和编辑弹框的配置 */
// get dialogConfig() {
//   return [
//     {
//       label: '层级名称',
//       prop: 'name',
//       rules: [
//         { required: true, message: '请输入层级名称', trigger: 'blur' },
//         { min: 2, max: 20, message: '请输入2到20个字符长度的层级名称', trigger: 'blur' }
//       ],
//       placeholder: '请输入2到20个字符长度的名称',
//       type: 'input'
//     },
//     {
//       label: '描述',
//       prop: 'memo',
//       rules: [{ required: true, min: 0, max: 200, message: '输入不能超过200字符', trigger: 'blur' }],
//       placeholder: '请输入描述',
//       type: 'textarea'
//     },
//     {
//       label: '会员加入时间',
//       type: 'date',
//       valueFormat: 'yyyy-MM-dd',
//       children: [
//         {
//           prop: 'register_stime',
//           rules: [],
//           placeholder: '选择日期'
//         },
//         {
//           prop: 'register_etime',
//           rules: [],
//           placeholder: '选择日期'
//         }
//       ]
//     },
//     {
//       label: '存款时间',
//       type: 'date',
//       valueFormat: 'yyyy-MM-dd',
//       children: [
//         {
//           prop: 'deposit_stime',
//           rules: [],
//           placeholder: '选择日期'
//         },
//         {
//           prop: 'deposit_etime',
//           rules: [],
//           placeholder: '选择日期'
//         }
//       ]
//     },
//     {
//       label: '区间存款总额',
//       type: 'numberGroup',
//       children: [
//         {
//           prop: 'deposit_min',
//           rules: [{ required: true, message: '区间存款总额最小值', trigger: 'blur' }, { validator: this.validatorNumber1, trigger: 'blur' }]
//         },
//         {
//           prop: 'deposit_max',
//           rules: [{ required: true, message: '区间存款总额最大值', trigger: 'blur' }, { validator: this.validatorNumber1, trigger: 'blur' }]
//         }
//       ]
//     },
//     {
//       label: '存款次数',
//       prop: 'deposit_times',
//       rules: [
//         { required: true, message: '请输入存款次数', trigger: 'blur' },
//         { min: 1, max: 8, message: '请输入1到8个数字', trigger: 'blur' },
//         { validator: this.validatorNumber }
//       ],
//       placeholder: '请输入1到8个数字',
//       type: 'number'
//     },
//     {
//       label: '存款总额',
//       prop: 'deposit_money',
//       rules: [
//         { required: true, message: '请输入存款总额', trigger: 'blur' },
//         { min: 1, max: 8, message: '请输入1到8个数字', trigger: 'blur' },
//         { validator: this.validatorNumber }
//       ],
//       placeholder: '请输入1到8个数字',
//       type: 'number'
//     },
//     {
//       label: '最大存款额',
//       prop: 'max_deposit_money',
//       rules: [
//         { required: true, message: '请输入最大存款额', trigger: 'blur' },
//         { min: 1, max: 8, message: '请输入1到8个数字', trigger: 'blur' },
//         { validator: this.validatorNumber }
//       ],
//       placeholder: '请输入1到8个数字',
//       type: 'number'
//     },
//     {
//       label: '提款次数',
//       prop: 'withdraw_times',
//       rules: [
//         { required: true, message: '请输入提款次数', trigger: 'blur' },
//         { min: 1, max: 8, message: '请输入1到8个数字', trigger: 'blur' },
//         { validator: this.validatorNumber }
//       ],
//       placeholder: '请输入1到8个数字',
//       type: 'number'
//     },
//     {
//       label: '提款总额',
//       prop: 'withdraw_count',
//       rules: [
//         { required: true, message: '请输入提款总额', trigger: 'blur' },
//         { min: 1, max: 8, message: '请输入1到8个数字', trigger: 'blur' },
//         { validator: this.validatorNumber }
//       ],
//       placeholder: '请输入1到8个数字',
//       type: 'number'
//     },
//     {
//       label: '备注',
//       prop: 'comment',
//       rules: [{ required: true, min: 0, max: 500, message: '输入不能超过500字符', trigger: 'blur' }],
//       placeholder: '请输入备注内容',
//       type: 'textarea'
//     }
//   ]
// }

// /** 新增和编辑控制弹框的属性 */
// get dialog() {
//   let tempObj: any = {
//     title: '新增会员层级',
//     visible: this.dialogVisible
//   }
//   if (this.formObj.name.length) {
//     tempObj.title = '编辑会员层级'
//   }
//   return tempObj
// }

// /** filter的相对应配置 */
// filterConfig: any = [
//   {
//     label: '层级名称',
//     prop: 'name',
//     type: 'input'
//   },
//   {
//     type: 'buttonGroup',
//     children: [
//       {
//         label: '查询',
//         event: 'doQuery'
//       },
//       {
//         label: '重置',
//         event: 'doReset'
//       },
//       {
//         type:'select',
//         value:'',
//         event:'refrash',          
//         option:[{label:'不自动刷新',value:''},{label:'15秒',value:'15'},{label:'30秒',value:'30'},{label:'60秒',value:'60'},{label:'120秒',value:'120'},{label:'180秒',value:'180'}]
//       },
//       {
//         label:'导出',
//         event:'export'
//       }
//     ]
//   }
// ]

// /** filter的表单对象 */
// filterObj: any = {
//   name: ''
// }

// /** 新增和编辑的弹框form对象 */
// formObj: any = {
//   name: '',
//   withdraw_times: '',
//   withdraw_count: '',
//   deposit_times: '',
//   deposit_money: '',
//   max_deposit_money: '',
//   deposit_min: '',
//   deposit_max: '',
//   memo: '',
//   register_stime: '',
//   register_etime: '',
//   deposit_stime: '',
//   deposit_etime: '',
//   comment: ''
// }

// /** table表格的数据源 */
// apiUrl: string = 'userLevelList'

  /** 新增和编辑弹框关闭事件 */
  // closeDialog() {
  //   this.formObj = {
  //     name: '',
  //     withdraw_times: '',
  //     withdraw_count: '',
  //     deposit_times: '',
  //     deposit_money: '',
  //     max_deposit_money: '',
  //     deposit_min: '',
  //     deposit_max: '',
  //     memo: '',
  //     register_stime: '',
  //     register_etime: '',
  //     deposit_stime: '',
  //     deposit_etime: '',
  //     comment: ''
  //   }
  //   this.dialogVisible = false
  // }

  // confirmDialog(callback) {
  //   /** 新增会员层级和编辑会员层级的表单的请求事件 */
  //   this.requestAddMemberLayer(callback)
  // }