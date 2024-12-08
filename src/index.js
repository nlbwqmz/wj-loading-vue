import Loading from "wj-loading"

const updated = (el, binding) => {
  if (!el.wjLoading) {
    let type = binding.arg || 'BounceLoading'
    if (typeof type === 'string' && type.length > 0) {
      type = type.replace(type[0], type[0].toUpperCase());
    }
    if (type && typeof type === 'string' && Loading[type]) {
      const value = binding.value
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        let option
        if (value.option) {
          option = {element: el, immediate: Boolean(value.enable), ...value.option}
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
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (value.option && typeof value.option === 'object' && !Array.isArray(value.option)) {
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
  if (option && option.name) {
    app.directive(option.name, loadingDirective)
  } else {
    app.directive('loading', loadingDirective)
  }
}

export default {
  install
}