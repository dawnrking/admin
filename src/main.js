// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import Croppa from 'vue-croppa'

import 'element-ui/lib/theme-default/index.css'
import 'vue-croppa/dist/vue-croppa.css'

import Button  from 'element-ui/lib/button'
import Input  from 'element-ui/lib/input'
import Form  from 'element-ui/lib/form'
import FormItem  from 'element-ui/lib/form-item'
import Menu  from 'element-ui/lib/menu'
import MenuItem  from 'element-ui/lib/menu-item'
import Dialog  from 'element-ui/lib/dialog'
import Select  from 'element-ui/lib/select'
import Option  from 'element-ui/lib/option'
import CheckboxGroup  from 'element-ui/lib/checkbox-group'
import Checkbox  from 'element-ui/lib/checkbox'
import Tooltip  from 'element-ui/lib/tooltip'
import Pagination  from 'element-ui/lib/pagination'
import Loading  from 'element-ui/lib/loading'
import Message  from 'element-ui/lib/message'
import MessageBox from 'element-ui/lib/message-box';
import autocomplete from 'element-ui/lib/autocomplete';
import DatePicker from 'element-ui/lib/date-picker';
import  VueQuillEditor from 'vue-quill-editor'

// import $ from 'jquery'

Vue.use(VueQuillEditor)
Vue.use(Croppa)

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(DatePicker)
Vue.use(autocomplete)



Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: { App }
})
