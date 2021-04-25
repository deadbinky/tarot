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
  },
  formatDate (date) {
    const d = new Date(date)
    const f = new Intl.DateTimeFormat('en').format(d)
    const a = f.split('/')

    const h = d.getHours()
    const m = d.getMinutes()
    const s = d.getSeconds()

    a.push(h, m, s)

    return a
  }
}
