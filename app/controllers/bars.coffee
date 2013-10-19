App.EmberTableBarsController = Ember.Controller.extend
  numRows: 100

  columns: Ember.computed ->
    colors  = ['blue', 'teal', 'green', 'yellow', 'orange']
    column1 = Ember.Table.ColumnDefinition.create
      columnWidth:    50
      headerCellName: 'Name'
      contentPath: 'key'
    columns = [1..5].map (number, index) ->
      Ember.Table.ColumnDefinition.create
        color: colors[index]
        headerCellName: 'Bar'
        tableCellViewClass: 'App.TableBarExample.BarCell'
        contentPath: "value#{number}"
    columns.unshift(column1)
    columns

  content: Ember.computed ->
    [0...@get('numRows')].map (num, index) ->
      key: index
      value1: Math.random() * 80 + 10
      value2: Math.random() * 80 + 10
      value3: Math.random() * 80 + 10
      value4: Math.random() * 80 + 10
      value5: Math.random() * 80 + 10
  .property 'numRows'
