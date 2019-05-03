<template>
  <div>
    <wv-group title="基本信息">
      <wv-input label="公司全称" placeholder="工商注册的全称"></wv-input>
      <wv-cell title="公司行业" is-link :value="classification.name" @click.native="ctrl.classification = true" />
      <wv-cell title="上传营业执照" is-link @click="upload" />
    </wv-group>
    <wv-group title="公司业务简介">
      <wv-textarea placeholder="请输入公司业务简介" :rows="3" :show-counter="false"></wv-textarea>
    </wv-group>
    <wv-group title="联系方式">
      <wv-input label="地址" placeholder="请输入公司地址" :validate-mode="{onFocus: false}"></wv-input>
      <wv-input label="电话" placeholder="请输入联系电话" required></wv-input>
      <wv-input label="邮箱" placeholder="请输入电子邮箱" pattern="@" required :validate-mode="{onFocus: false, onBlur: true, onChange: false}"></wv-input>
      <wv-input label="负责人" placeholder="请输入负责人" required></wv-input>
    </wv-group>
    <wv-button type="primary">确定</wv-button>
    <wv-picker
      :visible.sync="ctrl.classification"
      :columns="classificationList"
      value-key="name"
      @change="onChange"
    />
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getClassificationList } from '@/service/classification'

export default {
  name: 'company-edit',
  props: [ 'itemId' ],
  components: {
  },
  data(){
    return {
      ctrl: {
        classification: false
      },
      classification: {},
      classificationList: [{ values: [] }]
    }
  },
  mounted(){
    getClassificationList()
    .then(data => {
      this.classificationList[0].values = data || []
    })
    .catch(catchHandler)
  },
  computed: {
  },
  methods: {
    upload(){},
    onChange(picker, values){
      this.classification = values[0]
    }
  }
}
</script>

<style>
</style>
