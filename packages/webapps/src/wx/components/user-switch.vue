<template>
  <div>
     <wv-radio title="请选择" v-model="type" :options="options" @change="onChange"></wv-radio>
  </div>
</template>

<script>
import { catchHandler, success } from '@/wx/util/ui'
import { UserType, setUserType } from '@/wx/service/user'

export default {
  name: 'user-switch',
  props: [ 'value' ],
  components: {
  },
  mounted(){
  },
  data(){
    let type = this.value || UserType.None
    const options = [
      {
        label: '找东家',
        value: '1'
      },
      {
        label: '找贤才',
        value: '2'
      }
    ]
    return {
      type,
      options
    }
  },
  computed: {
  },
  methods: {
    onChange(val){
      this.type = val
      setUserType(val)
      .then(() => {
        success('切换成功')
        this.$emit('input', val)
      })
      .catch(catchHandler)
    }
  }
}
</script>

<style>
</style>
