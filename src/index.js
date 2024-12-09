import Loading from "wj-loading"

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

const isObjectAndNotArray = value => {
  return value && typeof value === 'object' && !Array.isArray(value)
}

const updated = (el, binding) => {
  if (!el.wjLoading) {
    const type = convertType(binding.arg)
    if (Loading[type]) {
      const value = binding.value
      if (isObjectAndNotArray(value)) {
        let option
        if (isObjectAndNotArray(value.option)) {
          option = {...value.option, element: el, immediate: Boolean(value.enable)}
        } else {
          option = {element: el, immediate: Boolean(value.enable)}
        }
        el.wjLoading = new Loading[type](option)
      } else {
        el.wjLoading = new Loading[type]({
          element: el,
          immediate: Boolean(value)
        })
      }
    } else {
      throw new Error(`Invalid type "${type}"`)
    }
  } else {
    const value = binding.value
    if (isObjectAndNotArray(value)) {
      if (isObjectAndNotArray(value.option)) {
        el.wjLoading.setOption(value.option)
      }
      if (value.enable) {
        el.wjLoading.loading()
      } else {
        el.wjLoading.remove()
      }
    } else {
      if (value) {
        el.wjLoading.loading()
      } else {
        el.wjLoading.remove()
      }
    }
  }
}

const unmounted = (el, binding) => {
  if (el && el.wjLoading) {
    el.wjLoading.remove()
    el.wjLoading = null
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
  install
}