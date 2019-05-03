<template>
  <div>
    <wv-group title="基本信息">
      <wv-input label="求职意向" placeholder="请输入求职意向"></wv-input>
      <wv-input label="姓名" placeholder="请输入姓名"></wv-input>
      <wv-cell title="性别" is-link :value="sex.name" @click.native="ctrl.sex = true" />
      <wv-cell title="出生日期" is-link :value="birthday"  @click="openPicker" />
      <wv-input label="家庭住址" placeholder="请输入家庭住址"></wv-input>
      <wv-cell title="婚姻状况" is-link :value="marital.name" @click.native="ctrl.marital = true" />
      <!--<wv-input label="身体状况" placeholder="请输入身体状况"></wv-input>-->
    </wv-group>
    <wv-group title="性格类型">
      <wv-textarea placeholder="请输入性格类型" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-group title="所获荣誉">
      <wv-textarea placeholder="请输入所获荣誉" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-group title="兴趣特长">
      <wv-textarea placeholder="请输入兴趣特长" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-button type="primary">确定</wv-button>
    <wv-datetime-picker ref="picker" type="date" @confirm="onConfirm"></wv-datetime-picker>
    <wv-picker
      :visible.sync="ctrl.sex"
      :columns="sexList"
      value-key="name"
      @change="onSexChange"
    />
    <wv-picker
      :visible.sync="ctrl.marital"
      :columns="maritalList"
      value-key="name"
      @change="onMaritalChange"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'applicant-edit',
  props: [ 'itemId' ],
  components: {
  },
  data(){
    return {
      ctrl: {
        sex: false,
        marital: false
      },
      sex: {},
      sexList: [{ values: [
        { name: '请选择', id: '' },
        { name: '男性', id: '1' },
        { name: '女性', id: '2' }
      ] }],
      marital: {},
      maritalList: [{ values: [
        { name: '已婚', id: '已婚' },
        { name: '未婚', id: '未婚' },
        { name: '单身', id: '单身' }
      ] }],
      birthday: ''
    }
  },
  computed: {
  },
  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
    onConfirm(val){
      this.birthday = dayjs(val).format('YYYY-MM-DD')
    },
    onSexChange(picker, values){
      this.sex = values[0]
    },
    onMaritalChange(picker, values){
      this.marital = values[0]
    }
  }
}
</script>

<style>
</style>
