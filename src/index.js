import LoadingObj from "wj-loading"
import 'wj-loading/dist/wj-loading.css'

/**
 * 当arg为空时默认为 BounceLoading
 * 当arg不为空时将首字母转大写
 */
const convertType = arg => {
  if (arg && typeof arg === 'string' && arg.length > 0) {
    return arg.replace(arg[0], arg[0].toUpperCase());
  }
  return 'BounceLoading'
}

/**
 * 检查loading类型是否更改
 */
const shouldCreateLoading = (el, type) => {
  return !el.wjLoading || (el.wjLoading[Symbol.toStringTag] !== type)
}

const isObjectAndNotArray = value => {
  return value && typeof value === 'object' && !Array.isArray(value)
}

const unmounted = el => {
  if (el && el.wjLoading) {
    el.wjLoading.remove()
    el.wjLoading = null
  }
}

const createLoading = (el, binding, type) => {
  if (LoadingObj[type]) {
    const value = binding.value
    if (isObjectAndNotArray(value)) {
      let option
      if (isObjectAndNotArray(value.option)) {
        option = {...value.option, element: el, immediate: Boolean(value.enable)}
      } else {
        option = {element: el, immediate: Boolean(value.enable)}
      }
      el.wjLoading = new LoadingObj[type](option)
    } else {
      el.wjLoading = new LoadingObj[type]({
        element: el,
        immediate: Boolean(value)
      })
    }
  } else {
    throw new Error(`Invalid type "${type}"`)
  }
}

const switchStatus = (el, value) => {
  if (value) {
    el.wjLoading.loading()
  } else {
    el.wjLoading.remove()
  }
}

const updated = (el, binding) => {
  const type = convertType(binding.arg)
  if (shouldCreateLoading(el, type)) {
    if (el.wjLoading) {
      el.wjLoading.remove().then(() => {
        createLoading(el, binding, type)
      })
    } else {
      createLoading(el, binding, type)
    }
  } else {
    const value = binding.value
    if (isObjectAndNotArray(value)) {
      if (isObjectAndNotArray(value.option)) {
        el.wjLoading.setOption(value.option)
      }
      switchStatus(el, value.enable)
    } else {
      switchStatus(el, value)
    }
  }
}

const loadingDirective = {

  // vue2
  inserted: updated,
  update: updated,
  unbind: unmounted,

  // vue3
  mounted: updated,
  updated: updated,
  unmounted: unmounted

}

const install = (app, option) => {
  if (option && option.name && typeof option.name === 'string') {
    app.directive(option.name, loadingDirective)
  } else {
    app.directive('loading', loadingDirective)
  }
}

export default {
  install,
}

export const Loading = LoadingObj
