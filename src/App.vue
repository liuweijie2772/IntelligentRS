<template>
  <div class="wrapper">
    <header>
      <div class="nav">
        <div class="nav-content">
          <div class="nav-icon">
            <img src="./assets/logo.jpg" alt="Logo" width="50" height="50" />
            <div class="nav-text">Intelligent-RS</div>
          </div>
          <div v-if="isHomePage" class="login-and-register">
            <el-button plain @click="loginVisible = true">登录</el-button>
            <el-dialog
              v-model="loginVisible"
              width="33em"
              style="background-color: whitesmoke;"
            >
              <div existing_git_repo
                style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
              >
                <h1 style="color: black; font-size: 2em">登录</h1>
                <div style="font-size: 1em; color: #868484; margin-top: 10px">
                  在进入系统之前，请先输入用户名和密码进行登录
                </div>
              </div>
              <div class="input-wrapper">
                <el-form>
                  <el-form-item prop="username">
                    <el-input maxlength="30" type="text" placeholder="用户名/邮箱">
                      <template #prefix>
                        <el-icon>
                          <User />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      maxlength="20"
                      style="margin-top: 5px"
                      placeholder="密码"
                    >
                      <template #prefix>
                        <el-icon>
                          <Lock />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-row style="margin-top: 5px">
                    <el-col :span="12" style="text-align: left">
                      <el-form-item prop="remember">
                        <el-checkbox label="记住我" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                      <el-link @click="changeToReset">忘记密码？</el-link>
                    </el-col>
                  </el-row>
                </el-form>
                <div
                  style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
                >
                  <div style="margin-top: 1vw">
                    <el-button
                      style="width: 22vw"
                      type="success"
                      plain
                      @click="changeToLearn2"
                    >
                      立即登录
                    </el-button>
                  </div>
                  <el-divider>
                    <span style="color: grey; font-size: 0.9em;">没有账号</span>
                  </el-divider>
                  <div style="margin-bottom: 1vw">
                    <el-button
                      style="width: 22vw"
                      type="warning"
                      plain
                      @click="changeToRegister"
                    >
                      注册账号
                    </el-button>
                  </div>
                </div>
              </div>
            </el-dialog>
            <el-dialog
              v-model="resetVisible"
              width="33em"
              style="background-color: whitesmoke"
            >
              <div style="text-align: center">
                <div style="margin-top: 1vw">
                  <el-steps :active="active" finish-status="success" align-center>
                    <el-step title="验证电子邮件" />
                    <el-step title="重新设定密码" />
                  </el-steps>
                </div>
                <div style="margin: 0 2vw" v-if="active === 0">
                  <div style="margin-top: 1vw">
                    <div style="font-size: 2em; font-weight: bold; color: black">
                      重置密码
                    </div>
                    <div style="font-size: 1em; color: #868484; margin-top: 10px">
                      请输入需要重置密码的电子邮件地址
                    </div>
                  </div>
                  <div style="margin-top: 1.5vw">
                    <el-form>
                      <el-form-item prop="email">
                        <el-input type="email" placeholder="电子邮件地址">
                          <template #prefix>
                            <el-icon>
                              <Message />
                            </el-icon>
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="code">
                        <el-row :gutter="10" style="width: 100%">
                          <el-col :span="18">
                            <el-input
                              maxlength="6"
                              type="text"
                              placeholder="请输入验证码"
                            >
                              <template #prefix>
                                <el-icon>
                                  <EditPen />
                                </el-icon>
                              </template>
                            </el-input>
                          </el-col>
                          <el-col :span="5">
                            <el-button type="success">获取验证码</el-button>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div style="margin: 2.5vw 0">
                    <el-button
                      @click="confirmReset"
                      style="width: 22vw"
                      type="warning"
                      plain
                    >
                      开始重置密码
                    </el-button>
                  </div>
                </div>
                <div style="margin: 0 2vw" v-if="active === 1">
                  <div style="margin-top: 1vw">
                    <div style="font-size: 2em; font-weight: bold; color: black">
                      重置密码
                    </div>
                    <div style="font-size: 1em; color: #868484; margin-top: 10px">
                      请填写你的新密码，并牢记防止丢失
                    </div>
                  </div>
                  <div style="margin-top: 1.5vw">
                    <el-form>
                      <el-form-item prop="password">
                        <el-input
                          maxlength="20"
                          type="password"
                          placeholder="密码"
                        >
                          <template #prefix>
                            <el-icon>
                              <Lock />
                            </el-icon>
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="password_repeat">
                        <el-input
                          maxlength="20"
                          type="password"
                          placeholder="重复密码"
                        >
                          <template #prefix>
                            <el-icon>
                              <Lock />
                            </el-icon>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div style="margin: 2.5vw 0">
                    <el-button
                      @click="doReset"
                      style="width: 22vw"
                      type="danger"
                      plain
                    >
                      立即重置密码
                    </el-button>
                  </div>
                </div>
              </div>
            </el-dialog>
            <el-button type="primary" @click="registerVisible = true">
              注册
            </el-button>
            <el-dialog
              v-model="registerVisible"
              width="33em"
              style="background-color: whitesmoke"
            >
              <div
                style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
              >
                <h1 style="color: black; font-size: 2em">注册</h1>
                <div style="font-size: 1em; color: #868484; margin-top: 10px">
                  欢迎注册我们的遥感图像智能处理平台，请在下方填写相关信息
                </div>
              </div>
              <div class="input-wrapper">
                <el-form>
                  <el-form-item prop="username">
                    <el-input
                      maxlength="30"
                      type="text"
                      placeholder="用户名/邮箱"
                    >
                      <template #prefix>
                        <el-icon>
                          <User />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      maxlength="20"
                      style="margin-top: 5px"
                      placeholder="密码"
                    >
                      <template #prefix>
                        <el-icon>
                          <Lock />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password_repeat">
                    <el-input
                      type="password"
                      maxlength="20"
                      style="margin-top: 5px"
                      placeholder="重复密码"
                    >
                      <template #prefix>
                        <el-icon>
                          <Lock />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="email">
                    <el-input type="email" placeholder="电子邮件地址">
                      <template #prefix>
                        <el-icon>
                          <Message />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-row :gutter="10" style="width: 100%;">
                      <el-col :span="18">
                        <el-input
                          maxlength="6"
                          type="text"
                          placeholder="请输入验证码"
                        >
                          <template #prefix>
                            <el-icon>
                              <EditPen />
                            </el-icon>
                          </template>
                        </el-input>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="success">获取验证码</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
                <div
                  style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
                >
                  <div style="margin-top: 1vw">
                    <el-button
                      style="width: 22vw"
                      type="warning"
                      plain
                      @click="changeToLogin"
                    >
                      立即注册
                    </el-button>
                  </div>
                  <div style="margin: 1vw 0">
                    <span style="font-size: 1em; line-height: 15px; color: grey">
                      已有账号?&nbsp;&nbsp;&nbsp;
                    </span>
                    <el-link type="primary" style="translate: 0 -2.5px" @click="changeToLogin2">
                      立即登录
                    </el-link>
                  </div>
                </div>
              </div>
            </el-dialog>
          </div>
          <div v-else class="avatar">
            <img
              src="./assets/avatae.png"
              alt=""
              style="border-radius: 10em; height: 100%; width: 100%;"
            />
          </div>
        </div>
      </div>
    </header>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { register } from 'swiper/element/bundle';
register();
import { useRouter, useRoute } from 'vue-router';
import { computed } from "vue";
import { ref } from 'vue'
import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const router = useRouter()
const changeToAIChat = ()=>{
  router.push({
    name:'aichat'
  })
}
const changeToStatistics = ()=>{
  router.push({
    name: 'statistics'
  })
}
const changeToLearn = ()=>{
  router.push({
    name: 'learn'
  })
}
const changeToLearn2 = ()=> {
  router.push({
    name: 'learn'
  })
  ElMessage.success('登录成功，欢迎回来~')
}

const route = useRoute();
const isHomePage = computed(() => route.path === '/home')

const loginVisible = ref(false)
const registerVisible = ref(false)
const resetVisible = ref(false)
const changeToLogin = ()=> {
  registerVisible.value = false
  loginVisible.value = true
  ElMessage.success('注册成功，请登录进入学习平台')
}
const changeToLogin2 = ()=> {
  registerVisible.value = false
  loginVisible.value = true
}
const changeToRegister = ()=> {
  loginVisible.value = false
  registerVisible.value = true
}
const changeToReset = ()=> {
  loginVisible.value = false
  resetVisible.value = true
}

const active = ref(0)
const confirmReset = ()=> {
  active.value++
}
const doReset = ()=> {
  active.value--
  resetVisible.value = false
  loginVisible.value = true
  ElMessage.success('密码重置成功，请重新登录')
}

</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

header {
  height: 4em;
  background-color: white;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.main-content {
  width: 100%;
  box-sizing: border-box;
  background-color: #1a1a1a;
}

.avatar{
  height: 3em;
  width: 3em;
  border-radius: 10em;
  background-color: transparent;
  margin-right: 3em;
}

.nav {
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between;
  height: 100%; /* 假设您希望 .nav 填满父容器的高度 */
  width: 100%;
}

.nav-content {
  display: flex; /* 内部也使用flex布局 */
  justify-content: space-between;
  width: 100%;
  align-items: center; /* 垂直居中 */
  .nav-icon{
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }
}

.logo {
  width: 50px; /* 图片宽度 */
  height: 50px; /* 图片高度 */
  margin-right: 10px; /* 图片和文字之间的间距 */
}

.nav-text {
  /* 如果需要可以添加额外的样式，比如字体大小、颜色等 */
  font-size: 1em; /* 根据需要调整字体大小 */
  color: #000; /* 根据需要调整字体颜色 */
}

.login-and-register {
  width: 10vw;
  height: 3vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1em;
}

:deep(.el-divider__text) {
  background-color: whitesmoke;
}

.input-wrapper {
  margin-top: 1.5vw;
  padding: 0
}
</style>
