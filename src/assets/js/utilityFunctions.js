export default {
  getDirection (dir) {
    const d = {}
    d.reversed = false
    d.direction = 'upright'

    if (dir) {
      d.reversed = true
      d.direction = 'reversed'
    }
    return d
  },
  replace (pattern, title, element) {
    return element.replace(pattern, title)
  }
}
