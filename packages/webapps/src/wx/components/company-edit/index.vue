<template>
  <div>
    <wv-group title="基本信息">
      <wv-input label="公司全称" placeholder="工商注册的全称" v-model="params.title"></wv-input>
      <wv-cell title="公司行业" is-link :value="classification.name" @click.native="ctrl.classification = true" />
      <img v-if="!!licenceUrl" :src="licenceUrl" max-width="100%" height="auto" />
      <wv-cell title="上传营业执照" is-link @click="upload" />
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
import { createCompany, updateCompany } from '@/wx/service/company'
import { chooseImage, uploadImage } from '@/wx/util/wx'

export default {
  name: 'company-edit',
  props: [ 'item' ],
  components: {
  },
  data(){
    const it = this.item || {};
    const { classification, _id, title, summary, adress, phone, email, linkman } = it;
    const licence = it.licence || {}
    return {
      ctrl: {
        classification: false
      },
      classification: classification || {},
      classificationList: [{ values: [] }],

      itemId: _id || '',
      params: {
        title: title || '', // 工商注册的全称
        summary: summary || '', // 公司业务简介
        adress: adress || '', // 公司地址
        phone: phone || '', // 联系电话
        email: email || '', // 电子邮箱
        linkman: linkman || '' // 负责人
      },
      licenceId: licence.id || '',
      licenceUrl: this.getLicenceUrl(licence) // 营业执照照片
    }
  },
  mounted(){
    getClassificationList()
    .then(data => {
      this.classificationList[0].values = data || []
    })
    .catch(catchHandler)
  },
  watch: {
    item(it = {}){
      this.itemId = it._id || ''
      this.classification = it.classification || {}
      const licence = it.licence || {}
      this.licenceId = licence.id || ''
      this.licenceUrl = this.getLicenceUrl(licence)
      this.params.title = it.title || '' // 工商注册的全称
      this.params.summary = it.summary || '' // 公司业务简介
      this.params.adress = it.adress || '' // 公司地址
      this.params.phone = it.phone || '' // 联系电话
      this.params.email = it.email || '' // 电子邮箱
      this.params.linkman = it.linkman || '' // 负责人
    }
  },
  methods: {
    getLicenceUrl(licence = {}){
      let licenceUrl = ''
      const url = licence.url || ''
      if(url){
        licenceUrl = `/media/${ url }`
      }
      return licenceUrl
    },
    upload(){
      chooseImage({
        count: 1 // 默认9
      })
      .then(res => {
        let localId = ''
        const localIds =  res.localIds || []
        if(localIds.length){
          localId = res.localIds[0]
          this.licenceUrl = localId
          return localId
        }
      })
      .then(localId => uploadImage({ localId }))
      .then(res => {
        this.licenceId = res.serverId || ''; // 返回图片的服务器端ID
      })
      .catch(catchHandler)
    },
    submit(){
      const params = { licence: { id: this.licenceId }, classification: this.classification, ...this.params }
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
