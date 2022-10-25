 /* eslint-disable */ 
export const throttle = (fn, wait) => {
  let callback = fn
  let timerId = null
  let firstInvoke = true
  const throttled = () => {
    let context = this
    let args = arguments
    if (firstInvoke) {
      callback.apply(context, args)
      firstInvoke = false
      return
    }     
    if (timerId) {
      return
    }
    timerId = setTimeout(() => {
      clearTimeout(timerId)
      timerId = null
      callback.apply(context, args)
    }, wait)
  }
  return throttled
}