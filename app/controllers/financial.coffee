App.EmberTableFinancialController = Ember.Controller.extend
  data: Ember.computed -> App.data.treedata

Number.prototype.toCurrency = ->
  return '-' if isNaN(@) or not isFinite(@)
  value = Math.abs(@).toFixed(2)
  value = value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  (if this < 0 then '-$' else '$') + value

Number.prototype.toPercent = ->
  return '-' if isNaN(@) or not isFinite(@)
  Math.abs(this * 100).toFixed(2) + '%'