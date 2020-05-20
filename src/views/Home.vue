<!-- 主页 -->
<template>
  <div>
    <el-button type="info" plain @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$message.success('成功退出当前用户')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
