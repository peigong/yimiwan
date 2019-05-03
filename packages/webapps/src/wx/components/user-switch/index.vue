<template>
  <div>
     <wv-radio title="请选择" v-model="type" :options="options" @change="onChange"></wv-radio>
  </div>
</template>

<script>
import { UserType, setUserType } from '@/service/user'

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
      this.$emit('input', val)
    }
  }
}
</script>

<style>
</style>
