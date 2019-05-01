<template>
  <dl class="flow-list__item">
    <dt>[{{ item.category.name }}]{{ item.title }}</dt>
    <dd>公司介绍 | 职位信息 | 应聘</dd>
  </dl>
</template>

<script>
export default {
  name: 'flow-applicant-item',
  props: [ 'item' ],
  components: {
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
</style>
