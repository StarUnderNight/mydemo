<template>
  <div style="text-align: center;margin: 0 20px">
    <div style="margin-top: 100px">
      <div style="font-size: 25px;font-weight: bold">注册新用户</div>
      <div style="font-size: 14px;color: grey">欢迎注册移动监测平台，请填写注册信息</div>
    </div>
    <div style="margin-top: 50px">
      <el-form :model="form" :rules="rule" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" maxlength="10" type="text" placeholder="用户名/邮箱">
            <template #prefix>
              <el-icon><User/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" maxlength="10" type="password" placeholder="密码">
            <template #prefix>
              <el-icon><Lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="form.password_repeat" maxlength="10" type="password" placeholder="重复密码">
            <template #prefix>
              <el-icon><Lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" placeholder="邮箱">
            <template #prefix>
              <el-icon><Message/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-input v-model="form.email" type="email" placeholder="部门">
            <template #prefix>
              <el-icon><i class="iconfont icon-bumen-moren"/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="10" style="width: 100%">
            <el-col :span="17">
              <el-input v-model="form.code" type="text" placeholder="请输入验证码">
                <template #prefix>
                  <el-icon><EditPen /></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button @click="askCode" :disabled="!isEmailValid||codeBtnColdTime > 0" type="success">
                {{codeBtnColdTime > 0 ? `请稍后${codeBtnColdTime}秒` : "获取验证码"}}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>
    </div>
    <div style="margin-top: 50px">
      <el-button @click="register" style="width: 270px" type="warning">立即注册</el-button>
    </div>
    <div style="margin-top: 20px">
      <span style="font-size: 14px;line-height: 15px;color: grey">已有账号？</span>
      <el-link @click="router.push('/welcome')">立即登录</el-link>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, computed} from "vue";
import {User, Lock, Message, EditPen} from "@element-plus/icons-vue";
import router from "@/router/index.ts"
import {get, post } from "@/net/index.ts"
import {ElMessage} from "element-plus";
import "@/assets/iconfont/iconfont.css"


const codeBtnColdTime = ref(0)
const formRef = ref()

const isEmailValid = computed(() => {
  return /^[\w-]+@[\w-]+\.\w+$/.test(form.email)
})


const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error("请输入用户名"))
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error("用户名不能包含特殊字符，只能是中/英文"))
  } else {
    callback()
  }
}

const validateRepeatPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error("两次输入密码不一致"))
  } else {
    callback()
  }
}

const rule = {
  username: [
    {validator: validateUsername, trigger:["blur", "change"]},
  ],
  password: [
    {required: true, message: "请输入密码", trigger:["blur"]},
    {min:6, max:20, message: "密码长度必须在6-20字符之间", trigger: ["blur", "change"]}
  ],
  password_repeat: [
    {required: true, message: "请再次输入密码", trigger:["blur"]},
    {validator: validateRepeatPassword, trigger:["blur", "change"]},
  ],
  email: [
    {required: true, message: "请输入邮件地址", trigger:["blur"]},
    {type: "email", message: "请输入合法的电子邮件地址", trigger: ["blur", "change"]}
  ],
  code: [
    {required: true, message: "请输入验证码", trigger:["blur"]},
  ],
}

const form = reactive({
  username: "",
  password: "",
  password_repeat: "",
  email: "",
  code: "",
})

function askCode() {
  codeBtnColdTime.value = 60
  if (/^[\w-]+@[\w-]+\.\w+$/.test(form.email)) {
    get(`/api/auth/ask-code?email=${form.email}&type=register`, () => {
      ElMessage.success(`验证码已发送至邮箱:${form.email}，请注意查收`)
      setInterval(() => codeBtnColdTime.value--, 1000)
    })
  } else {
    ElMessage.warning("请输入一个正确的邮箱地址")
  }
}

function register() {
  formRef.value.validate((valid) => {
    if (valid) {
      post("/api/auth/register", {...form}, () => {
        ElMessage.success("注册成功")
        router.push("/")
      })
    } else {
      ElMessage.warning("请检查填写参数内容")
    }
  })
}



</script>

<style scoped>

</style>