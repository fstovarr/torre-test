import { extend, localize } from 'vee-validate'
/* eslint import/namespace: [2, { allowComputed: true }] */
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

extend('decimal', (n) => {
  console.log(n)
  if (isNaN(n)) return false
  const RE = /^-{0,1}\d*\.{0,1}\d+$/
  return RE.test(n)
})

export default ({ app }) => {
  import(`vee-validate/dist/locale/${app.i18n.locale}.json`).then((locale) => {
    localize(app.i18n.locale, locale)
  })
}
