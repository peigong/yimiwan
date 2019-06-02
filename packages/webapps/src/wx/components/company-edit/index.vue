<template>
  <div>
    <wv-group title="基本信息">
      <wv-input label="公司全称" placeholder="工商注册的全称" v-model="params.title"></wv-input>
      <wv-cell title="公司行业" is-link :value="classification.name" @click.native="ctrl.classification = true" />
      <img v-if="!!logo.url" :src="logo.url" max-width="100%" height="auto" />
      <wx-upload label="公司LOGO" @changed="logoChangeHandler" />
      <img v-if="!!licence.url" :src="licence.url" max-width="100%" height="auto" />
      <wx-upload label="营业执照" @changed="licenceChangeHandler" />
    </wv-group>
    <wv-group title="公司业务简介">
      <wv-textarea placeholder="请输入公司业务简介" :rows="3" :show-counter="false" v-model="params.summary"></wv-textarea>
    </wv-group>
    <wv-group title="联系方式">
      <wv-input label="地址" placeholder="请输入公司地址"
        :validate-mode="{onFocus: false}"
        v-model="params.adress">
      </wv-input>
      <wv-input label="电话" placeholder="请输入联系电话" required v-model="params.phone"></wv-input>
      <wv-input label="邮箱" placeholder="请输入电子邮箱"
        pattern="@" required :validate-mode="{onFocus: false, onBlur: true, onChange: false}"
        v-model="params.email">
      </wv-input>
      <wv-input label="负责人" placeholder="请输入负责人" required v-model="params.linkman"></wv-input>
    </wv-group>
    <wv-button type="primary" @click="submit">确定</wv-button>
    <wv-picker
      :visible.sync="ctrl.classification"
      :columns="classificationList"
      value-key="name"
      @change="onChange"
    />
  </div>
</template>

<script>
import { catchHandler, success } from '@/wx/util/ui'
import { getClassificationList } from '@/wx/service/classification'
import { createCompany, updateCompany, getCompanyDetails } from '@/wx/service/company'
import wxUpload from '@/wx/components/wx-upload'

export default {
  name: 'company-edit',
  props: [ 'itemId' ],
  components: {
    wxUpload
  },
  data(){
    return {
      ctrl: {
        classification: false
      },
      classification: {},
      classificationList: [{ values: [] }],

      params: {
        title: '', // 工商注册的全称
        summary: '', // 公司业务简介
        adress: '', // 公司地址
        phone: '', // 联系电话
        email: '', // 电子邮箱
        linkman: '' // 负责人
      },
      logo: {
        originalId: '',
        mediaid: '',
        url: ''
      },
      licence: {
        originalId: '',
        mediaid: '',
        url: ''
      }
    }
  },
  mounted(){
    this.setItemId(this.itemId)
    getClassificationList('industry-code')
    .then(data => {
      this.classificationList[0].values = data || []
    })
    .catch(catchHandler)
  },
  watch: {
    itemId(val = ''){
      this.setItemId(val)
    }
  },
  methods: {
    getMediaUrl(media = {}){
      let url = media.url || ''
      if(url){
        url = `/media/${ url }`
      }
      return url
    },
    setItemId(id = ''){
      if(id){
        getCompanyDetails(id)
        .then(this.setItem)
        .catch(catchHandler)
      }else{
        this.setItem()
      }
    },
    setItem(it = {}){
      this.classification = it.classification || {}

      const logo = it.logo || {}
      this.logo.originalId = logo.mediaid || ''
      this.logo.mediaid = logo.mediaid || ''
      this.logo.url = this.getMediaUrl(logo)
      const licence = it.licence || {}
      this.licence.originalId = licence.mediaid || ''
      this.licence.mediaid = licence.mediaid || ''
      this.licence.url = this.getMediaUrl(licence)

      this.params.title = it.title || '' // 工商注册的全称
      this.params.summary = it.summary || '' // 公司业务简介
      this.params.adress = it.adress || '' // 公司地址
      this.params.phone = it.phone || '' // 联系电话
      this.params.email = it.email || '' // 电子邮箱
      this.params.linkman = it.linkman || '' // 负责人
    },
    logoChangeHandler(media = {}){
      this.logo.mediaid = media.mediaid || ''
      this.logo.url = media.url || ''
    },
    licenceChangeHandler(media = {}){
      this.licence.mediaid = media.mediaid || ''
      this.licence.url = media.url || ''
    },
    submit(){
      const params = { logo: this.logo, licence: this.licence, classification: this.classification, ...this.params }
      const id = this.itemId || ''
      let exec = null
      let message = ''
      if(id){
        params.id = id
        exec = updateCompany
        message = '修改成功'
      }else{
        exec = createCompany
        message = '添加成功'
      }
      exec(params)
      .then(() => {
        success(message)
        this.$emit('changed')
      })
      .catch(catchHandler)
    },
    onChange(picker, values){
      const { sn, name } = values[0]
      this.classification = { sn, name }
    }
  }
}
</script>

<style>
</style>
