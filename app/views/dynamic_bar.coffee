App.EmberTableDynamicBar = Ember.Namespace.create()

App.EmberTableDynamicBar.BarCell = Ember.Table.TableCell.extend
  templateName:     'ember_table/dynamic_bar/bar_cell'
  classNameBindings:['column.color']
  barWidth: Ember.computed ->
    {column, row} = @getProperties 'column', 'row'
    return 0 unless column and row
    Math.round(+@get('cellContent'))
  .property 'cellContent'

  histogramStyle: Ember.computed ->
    "width: #{@get('barWidth')}%;"
  .property 'barWidth'
