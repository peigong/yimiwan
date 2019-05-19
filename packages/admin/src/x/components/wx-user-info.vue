<template>
  <div>
    <div>
      <span>{{ item.nickname }}</span>
      <span class="x-userinfo-sep">|</span>
      <span>{{ item.sex | formatSex }}</span>
    </div>
    <div>
      <span>{{ item.province }}</span>
      <span class="x-userinfo-sep">|</span>
      <span>{{ item.city }}</span>
      <span class="x-userinfo-sep">|</span>
      <span>{{ item.type | formatType }}</span>
    </div>
    <div>
      <span>ID：{{ item.openid }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
    };
  },
  filters: {
    formatType(val = 0){
      const map = new Map()
      map.set(0, '身份未知')
      map.set(1, '求职者')
      map.set(2, '招聘者')
      map.set(4, '猎头')
      return map.get(+val)
    },
    formatSex(val){
      const map = new Map()
      map.set(0, '性别未知')
      map.set(1, '男')
      map.set(2, '女')
      return map.get(+val)
    }
  },
  methods: {
  }
}
</script>

<style>
.x-userinfo-sep {
  padding: 0 5px 0 5px;
  color: #cccccc;
}
</style>
