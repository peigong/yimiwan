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
      @change="classificationChangeHandler"
    />
  </div>
</template>

<script>
import { catchHandler, success } from '@/wx/util/ui'
import { ClassificationType } from '@/wx/enums'
import { getMediaUrl } from '@/wx/service/media'
import { getClassificationList } from '@/wx/service/classification'
// import { createCompany, updateCompany } from '@/wx/service/company'
import { updateMyCompany } from '@/wx/service/company'
import wxUpload from '@/wx/components/wx-upload'

const def = { sn: '', name: '请选择' }

export default {
  name: 'company-edit',
  props: [ 'item' ],
  components: {
    wxUpload
  },
  data(){
    return {
      ctrl: {
        classification: false
      },
      classification: { ...def },
      classificationList: [{ values: [] }],

      itemId: '',
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
    this.setItem(this.item)
    getClassificationList(ClassificationType.IndustryCode)
    .then(data => {
      const items = data || []
      this.classificationList[0].values = [ { ...def }, ...items ]
    })
    .catch(catchHandler)
  },
  watch: {
    item(val = ''){
      this.setItem(val)
    }
  },
  methods: {
    setItem(item = {}){
      this.itemId = item._id || ''
      this.classification = item.classification || {}

      const logo = item.logo || {}
      this.logo.originalId = logo.mediaid || ''
      this.logo.mediaid = logo.mediaid || ''
      this.logo.url = getMediaUrl(logo)
      const licence = item.licence || {}
      this.licence.originalId = licence.mediaid || ''
      this.licence.mediaid = licence.mediaid || ''
      this.licence.url = getMediaUrl(licence)

      this.params.title = item.title || '' // 工商注册的全称
      this.params.summary = item.summary || '' // 公司业务简介
      this.params.adress = item.adress || '' // 公司地址
      this.params.phone = item.phone || '' // 联系电话
      this.params.email = item.email || '' // 电子邮箱
      this.params.linkman = item.linkman || '' // 负责人
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
      /*
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
      */
      updateMyCompany(params)
      .then(() => {
        success('编辑成功')
        this.$emit('changed')
      })
      .catch(catchHandler)
    },
    classificationChangeHandler(picker, values){
      const { sn, name } = values[0]
      this.classification = { sn, name }
    }
  }
}
</script>

<style>
</style>
