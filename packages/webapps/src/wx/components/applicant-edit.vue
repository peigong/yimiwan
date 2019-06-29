<template>
  <div>
    <wv-group title="我的基本信息">
      <wv-input label="求职意向" placeholder="请输入求职意向" v-model.trim="params.title"></wv-input>
      <wv-input label="姓名" placeholder="请输入姓名" v-model.trim="params.name"></wv-input>
      <wv-cell title="性别" is-link :value="sex.name" @click.native="ctrl.sex = true" />
      <wv-input label="住址" placeholder="请输入住址" v-model.trim="params.address"></wv-input>
      <wv-input label="年龄" placeholder="请输入年龄" v-model.trim="params.age"></wv-input>
      <wv-input label="联系方式" placeholder="请输入联系方式" v-model.trim="params.contact"></wv-input>
      <!--
      <wv-cell title="出生日期" is-link :value="birthday"  @click="openPicker" />
      <wv-cell title="婚姻状况" is-link :value="marital.name" @click.native="ctrl.marital = true" />
    -->
    </wv-group>
    <wv-button type="primary" @click="submit">确定</wv-button>
    <wv-picker
      :visible.sync="ctrl.sex"
      :columns="sexList"
      value-key="name"
      @change="onSexChange"
    />
    <!--
    <wv-group title="性格类型">
      <wv-textarea placeholder="请输入性格类型" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-group title="所获荣誉">
      <wv-textarea placeholder="请输入所获荣誉" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-group title="兴趣特长">
      <wv-textarea placeholder="请输入兴趣特长" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-datetime-picker ref="picker" type="date" @confirm="onConfirm"></wv-datetime-picker>
    <wv-picker
      :visible.sync="ctrl.marital"
      :columns="maritalList"
      value-key="name"
      @change="onMaritalChange"
    />
  -->
  </div>
</template>

<script>
// import dayjs from 'dayjs'
import { catchHandler, success, fail } from '@/wx/util/ui'
import { updateMyInfo } from '@/wx/service/applicant'

export default {
  name: 'applicant-edit',
  props: [ 'item' ],
  components: {
  },
  data(){
    return {
      ctrl: {
        sex: false
      },
      itemId: '',
      params: {
        title: '', // 求职意向
        name: '', // 姓名
        address: '',
        age: '',
        contact: ''
      },
      sex: {},
      sexList: [{ values: [
        { name: '请选择', id: 0 },
        { name: '男性', id: 1 },
        { name: '女性', id: 2 }
      ] }],
      /*
      ctrl: {
        sex: false,
        marital: false
      },
      marital: {},
      maritalList: [{ values: [
        { name: '已婚', id: '已婚' },
        { name: '未婚', id: '未婚' },
        { name: '单身', id: '单身' }
      ] }],
      birthday: ''
      */
    }
  },
  mounted(){
    this.setItem(this.item)
  },
  watch: {
    item(val){
      this.setItem(val)
    }
  },
  methods: {
    setItem(item = {}){
      this.params.title = item.title || ''
      this.params.name = item.name || ''
      this.params.address = item.address || ''
      this.params.age = item.age || ''
      this.params.contact = item.contact || ''
      this.sex = item.sex || {}
    },
    onSexChange(picker, values){
      this.sex = values[0]
    },
    getParams(){
      const params = { ...this.params }
      params.sex = this.sex
      if(!params.title){
        fail('求职意向需要填写')
        return false
      }
      if(!params.name){
        fail('个人姓名需要填写')
        return false
      }
      return params
    },
    submit(){
      const params = this.getParams()
      if(params){
        updateMyInfo(params)
        .then(() => {
          success('编辑成功')
          this.$emit('changed')
        })
        .catch(catchHandler)
      }
    }
    /*
    openPicker() {
      this.$refs.picker.open();
    },
    onConfirm(val){
      this.birthday = dayjs(val).format('YYYY-MM-DD')
    },
    onMaritalChange(picker, values){
      this.marital = values[0]
    }
    */
  }
}
</script>

<style>
</style>
