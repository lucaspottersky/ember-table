App.DynamicBarTableExample = Ember.Namespace.create()

App.DynamicBarTableExample.BarCell = Ember.Table.TableCell.extend
  templateName:     'bar-cell'
  classNameBindings:['column.color']
  barWidth: Ember.computed ->
    {column, row} = @getProperties 'column', 'row'
    return 0 unless column and row
    Math.round(+@get('cellContent'))
  .property 'cellContent'

  histogramStyle: Ember.computed ->
    "width: #{@get('barWidth')}%;"
  .property 'barWidth'
