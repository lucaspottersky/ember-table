window.App = Ember.Application.create()

App.FluidColumnDefinition = Ember.Table.ColumnDefinition.extend
  columnWidth: Ember.computed ->
    percentWidth = @get('percentColumnWidth') / 100.0
    Math.floor(percentWidth * @get('controller._width'))
  .property 'controller._width', 'percentColumnWidth'

App.ApplicationView = Ember.View.extend
  classNames: 'ember-app'
  templateName: 'application'

App.ApplicationController = Ember.Controller.extend
  numRows: 100

  columns: Ember.computed ->
    dateColumn = App.FluidColumnDefinition.create
      percentColumnWidth: "40"
      headerCellName: 'Date'
      getCellContent: (row) -> row['date'].toDateString();
    openColumn = App.FluidColumnDefinition.create
      percentColumnWidth: "15"
      headerCellName: 'Open'
      getCellContent: (row) -> row['open'].toFixed(2)
    highColumn = App.FluidColumnDefinition.create
      percentColumnWidth: "15"
      headerCellName: 'High'
      getCellContent: (row) -> row['high'].toFixed(2)
    lowColumn = App.FluidColumnDefinition.create
      percentColumnWidth: "15"
      headerCellName: 'Low'
      getCellContent: (row) -> row['low'].toFixed(2)
    closeColumn = App.FluidColumnDefinition.create
      percentColumnWidth: "15"
      headerCellName: 'Close'
      getCellContent: (row) -> row['close'].toFixed(2)
    [dateColumn, openColumn, highColumn, lowColumn, closeColumn]

  content: Ember.computed ->
    [0...@get('numRows')].map (index) ->
      date = new Date()
      date.setDate(date.getDate() + index)
      date:  date
      open:  Math.random() * 100 - 50
      high:  Math.random() * 100 - 50
      low:   Math.random() * 100 - 50
      close: Math.random() * 100 - 50
      volume: Math.random() * 1000000
  .property 'numRows'
