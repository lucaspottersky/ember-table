App.TableBarExample = Ember.Namespace.create()

App.TableBarExample.BarCell = Ember.Table.TableCell.extend
  templateName:     'ember_table/chart_table/bar'
  classNameBindings:['column.color']
  barWidth: Ember.computed ->
    {column, row} = @getProperties 'column', 'row'
    return 0 unless column and row
    Math.round(+column.getCellContent(row.get('content')))
  .property 'column', 'row'

  histogramStyle: Ember.computed ->
    "width: #{@get('barWidth')}%;"
  .property 'barWidth'