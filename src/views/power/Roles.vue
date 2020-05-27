<!-- 角色列表 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleVisible=true">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteRole(scope.row.id)"
            >删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="编辑角色" :visible.sync="editRoleVisible" width="40%">
      <el-form ref="editRoleRef" :rules="editRoleRules" :model="editRole" label-width="80px">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="editRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加角色" :visible.sync="addRoleVisible" width="40%">
      <el-form ref="addRoleRef" :rules="addRoleRules" :model="addRole" label-width="80px">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      editRole: {},
      editRoleVisible: false,
      editRoleRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      addRole: {},
      addRoleVisible: false,
      addRoleRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rolesList = res.data
    },
    async showEditDialog(id) {
      this.editRoleVisible = true
      const { data: res } = await this.$http.get('roles/' + id)
      this.editRole = res.data
    },
    editRoleInfo() {
      this.$refs.editRoleRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          `roles/${this.editRole.roleId}`,
          {
            roleName: this.editRole.roleName,
            roleDesc: this.editRole.roleDesc
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success('编辑角色信息成功')
        this.editRoleVisible = false
        this.getRolesList()
      })
    },
    async deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete('roles/' + id)
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success('删除成功!')
          this.getRolesList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addRoleInfo() {
      this.$refs.addRoleRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.addRole)
        if (res.meta.status !== 201) {
          this.$message.error(res.meta.msg)
          return
        }
        this.$message.success(res.meta.msg)
        this.addRoleVisible = false
        this.getRolesList()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
