<template>
  <div>
    <wv-group title="">
      <wv-cell title="选择简历" is-link :value="cv.title" @click.native="ctrl.cv = true" />
    </wv-group>
    <div>
      <wv-button type="default" class="btn-handler" :mini="true" @click="toggle('cvEdit')">修改</wv-button>
      <wv-button type="default" class="btn-handler" :mini="true" @click="toggle('cvEdit')">添加</wv-button>
      <wv-button type="default" class="btn-handler" :mini="true" @click="toggle('educationalEdit')">教育</wv-button>
      <wv-button type="default" class="btn-handler" :mini="true" @click="toggle('workEdit')">工作</wv-button>
    </div>
    <wv-panel title="教育经历">
      <wv-form-preview class="preview-item" v-for="(item, key) in educationalList" :key="key" title="学校" :value="item.title" :dataItems="item.dataItems" :buttons="educationalButtons" />
    </wv-panel>
    <wv-panel title="工作经历">
      <wv-form-preview class="preview-item" v-for="(item, key) in workList" :key="key" title="单位" :value="item.title" :dataItems="item.dataItems" :buttons="workButtons" />
    </wv-panel>
    <wv-picker
      :visible.sync="ctrl.cv"
      :columns="cvList"
      value-key="title"
      @change="onChange"
    />
    <wv-popup :visible.sync="ctrl.cvEdit">
      <wv-switch title="关闭" v-model="ctrl.cvEdit" />
      <cv-edit />
    </wv-popup>
    <wv-popup :visible.sync="ctrl.educationalEdit">
      <wv-switch title="关闭" v-model="ctrl.educationalEdit" />
      <educational-edit />
    </wv-popup>
    <wv-popup :visible.sync="ctrl.workEdit">
      <wv-switch title="关闭" v-model="ctrl.workEdit" />
      <work-edit />
    </wv-popup>
  </div>
</template>

<script>
import { catchHandler } from '@/wx/util/ui'
import { getCVList } from '@/service/cv'
import cvEdit from '@/wx/components/cv-edit'
import educationalEdit from '@/wx/components/educational-edit'
import workEdit from '@/wx/components/work-edit'

export default {
  name: 'cv-info',
  props: [ 'itemId' ],
  components: {
    cvEdit,
    educationalEdit,
    workEdit
  },
  mounted(){
    getCVList()
    .then((data) => {
      this.cvList[0].values = data
    })
    .catch(catchHandler)
  },
  data(){
    return {
      ctrl: {
        cv: false,
        cvEdit: false,
        educationalEdit: false,
        workEdit: false
      },
      cv: { title: '初级工程师' },
      cvList: [{  values: [] }],
      educationalButtons: [
        {
          text: '修改',
          type: 'primary',
          action: () => {
            this.toggle('educationalEdit')
          }
        }
      ],
      educationalList: [
        {
          title: '北京大学附属小学',
          dataItems: [
            { label: '专业', value: '人工智能' },
            { label: '学历', value: '硕士' },
            { label: '起止时间', value: '2010-05 ~ 2019-05' }
          ]
        },
        {
          title: '北京大学附属小学',
          dataItems: [
            { label: '专业', value: '人工智能' },
            { label: '学历', value: '硕士' },
            { label: '起止时间', value: '2010-05 ~ 2019-05' }
          ]
        },
        {
          title: '北京大学附属小学',
          dataItems: [
            { label: '专业', value: '人工智能' },
            { label: '学历', value: '硕士' },
            { label: '起止时间', value: '2010-05 ~ 2019-05' }
          ]
        }
      ],
      workButtons: [
        {
          text: '修改',
          type: 'primary',
          action: () => {
            this.toggle('workEdit')
          }
        }
      ],
      workList: [
        {
          title: '新时代教育公司',
          dataItems: [
            { label: '职务', value: '业务经理' },
            { label: '主要工作', value: '找客户找资源' },
            { label: '起止时间', value: '2010-05 ~ 2019-05' }
          ]
        },
        {
          title: '新时代教育公司',
          dataItems: [
            { label: '职务', value: '业务经理' },
            { label: '主要工作', value: '找客户找资源' },
            { label: '起止时间', value: '2010-05 ~ 2019-05' }
          ]
        },
        {
          title: '新时代教育公司',
          dataItems: [
            { label: '职务', value: '业务经理' },
            { label: '主要工作', value: '找客户找资源' },
            { label: '起止时间', value: '2010-05 ~ 2019-05' }
          ]
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    toggle(type){
      const ctrl = this.ctrl
      Object.keys(ctrl).forEach(key => { ctrl[key] = false  })
      if(type){
        ctrl[type] = true
      }
    },
    onChange(picker, values){
      this.cv = values[0]
    }
  }
}
</script>

<style>
.weui-panel__hd {
  font-size: 16px;
}
.weui-form-preview__hd .weui-form-preview__value {
  font-size: 1em;
}
</style>
