# wj-loading-vue

<u>***当前为2.X文档***</u>。（[1.X文档](./readme/README_V1.md)）

![NPM Version](https://img.shields.io/npm/v/wj-loading-vue)
![NPM Downloads](https://img.shields.io/npm/dw/wj-loading-vue)
![NPM License](https://img.shields.io/npm/l/wj-loading-vue)

基于[wj-loading](https://github.com/nlbwqmz/wj-loading)构建的`vue`指令，兼容vue2和vue3，支持自定义指令名及多种动画。

- [演示](https://nlbwqmz.github.io/wj-loading-pages/)
- [wj-loading-vue](https://github.com/nlbwqmz/wj-loading-vue)
- [wj-loading](https://github.com/nlbwqmz/wj-loading)

## 安装

**`npm`可以自动安装`peerDependencies`依赖，可只安装`wj-loading-vue`。**

- `npm install wj-loading wj-loading-vue`或`npm install wj-loading-vue`
- `yarn add wj-loading wj-loading-vue`

**npm可以自动安装peerDependencies依赖可只直接安装**

## 引入

### `vue3`

```js
import {createApp} from 'vue'
import App from './App.vue'
// 引入样式
import 'wj-loading-vue/dist/wj-loading-vue.css'
import Loading from 'wj-loading-vue'

createApp(App).use(Loading).mount('#app')
```

### `vue2`

```js
import Vue from 'vue'
import App from './App.vue'
// 引入样式
import 'wj-loading-vue/dist/wj-loading-vue.css'
import Loading from 'wj-loading-vue'

Vue.use(Loading)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

### 自定义指令名

```js
import {createApp} from 'vue'
// 引入样式
import 'wj-loading-vue/dist/wj-loading-vue.css'
import Loading from 'wj-loading-vue'

// 默认指令名为loading
createApp(App).use(Loading, {name: 'wj-loading'})
```

### 指令名冲突

若引入了`element ui`等组件可能会导致相同指令名冲突，解决办法：

- 后引入的指令会覆盖先引入的指令
- 自定义指令名

## 示例

### 示例一

```vue

<template>
  <div style="width: 500px; height: 500px;" v-loading:[arg]="loading"></div>
</template>

<script setup>

  import {ref} from 'vue';

  const arg = ref('BounceLoading')
  const loading = ref(true)

  setTimeout(() => {
    loading.value = false
  }, 2000)

</script>
```

`arg`支持[wj-loading](https://github.com/nlbwqmz/wj-loading)中定义的动画类型，支持动态修改动画类型，缺省值为`BounceLoading`，支持驼峰，`v-loading:CubesLoading`和`v-loading:cubesLoading` 效果相同。

当绑定的值为**布尔类型**时，会使用对应动画类型的**默认参数**，若想**自定义参数**可以参考**示例二**和**示例三**，动画类型和对应支持的参数请查看[wj-loading](https://github.com/nlbwqmz/wj-loading)。

### 示例二

```vue

<template>
  <div style="width: 500px; height: 500px;" v-loading:CmSpinnerLoading="loading"></div>
</template>

<script setup>
  import {ref} from "vue";

  const loading = ref({
    enable: true, // 动画开关
    option: { // 对应动画参数请查看wj-loading文档
      background: 'rgba(0,0,0,.5)',
    }
  })

  setTimeout(() => {
    // loading.value = {...loading.value, enable: false}
    loading.value = {
      enable: false, // 动画开关
      option: { // 对应动画参数请查看wj-loading文档
        background: 'rgba(255,255,255,.5)',
      }
    }
  }, 2000)

</script>
```

当前这种使用方式，参数更新时需对整个对象**重新赋值**，否则指令无法监听到改变。

### 示例三

```vue

<template>
  <div style="width: 500px; height: 500px" v-loading:CmSpinnerLoading="{
    enable: loading,
    option: {
      background: background,
      zIndex: 666
    }
  }"></div>
</template>

<script setup>
  import {ref} from "vue";

  const loading = ref(true)
  const background = ref('rgba(0,0,0,0.5)')

  setTimeout(() => {
    background.value = 'rgba(255,255,255,0.5)'
  }, 2000)

  setTimeout(() => {
    loading.value = false
  }, 5000)

</script>
```

### 示例四

```js
import 'wj-loading-vue/dist/wj-loading-vue.css'
import {Loading} from 'wj-loading-vue'

new Loading.TextLoading({
  element: document.body,
  background: 'rgba(255, 255, 255, .8)',
  immediate: true
})
```

支持[wj-loading](https://github.com/nlbwqmz/wj-loading)原生使用方法。



