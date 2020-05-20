<!-- 主页 -->
<template>
  <el-container class="home-container">
    <el-header>
      <div class="home_logo">
        <img src="@/assets/home_logo.png" alt />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" plain @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" active-text-color="#3d76f7">
          <el-submenu :index="menu.id+''" v-for="menu in menuList" :key="menu.id">
            <template slot="title">
              <i :class="iconList[menu.id]"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <el-menu-item
              :index="menuclild.id+''"
              v-for="menuclild in menu.children"
              :key="menuclild.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ menuclild.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconList: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$message.success('成功退出当前用户')
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    }
  }
}
</script>

<style lang='scss' scoped>
.home-container {
  height: 100%;
  .el-header {
    background-color: #0a1e39;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .home_logo {
      display: flex;
      align-items: center;
      img {
        width: 102px;
        padding: 20px;
      }
      span {
        color: #fff;
        padding: 40px;
      }
    }
  }
  .el-container {
    .el-aside {
      background-color: #fff;
    }
    .el-main {
      background-color: #f5f6fa;
    }
  }
}
.iconfont{
  padding-right: 10px;
}
</style>
