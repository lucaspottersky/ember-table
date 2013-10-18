(function() {

  window.App = Ember.Application.create();

  App.FluidColumnDefinition = Ember.Table.ColumnDefinition.extend({
    columnWidth: Ember.computed(function() {
      var percentWidth;
      percentWidth = this.get('percentColumnWidth') / 100.0;
      return Math.floor(percentWidth * this.get('controller._width'));
    }).property('controller._width', 'percentColumnWidth')
  });

  App.ApplicationView = Ember.View.extend({
    classNames: 'ember-app',
    templateName: 'application'
  });

  App.ApplicationController = Ember.Controller.extend({
    numRows: 100,
    columns: Ember.computed(function() {
      var closeColumn, dateColumn, highColumn, lowColumn, openColumn;
      dateColumn = App.FluidColumnDefinition.create({
        percentColumnWidth: "40",
        headerCellName: 'Date',
        getCellContent: function(row) {
          return row['date'].toDateString();
        }
      });
      openColumn = App.FluidColumnDefinition.create({
        percentColumnWidth: "15",
        headerCellName: 'Open',
        getCellContent: function(row) {
          return row['open'].toFixed(2);
        }
      });
      highColumn = App.FluidColumnDefinition.create({
        percentColumnWidth: "15",
        headerCellName: 'High',
        getCellContent: function(row) {
          return row['high'].toFixed(2);
        }
      });
      lowColumn = App.FluidColumnDefinition.create({
        percentColumnWidth: "15",
        headerCellName: 'Low',
        getCellContent: function(row) {
          return row['low'].toFixed(2);
        }
      });
      closeColumn = App.FluidColumnDefinition.create({
        percentColumnWidth: "15",
        headerCellName: 'Close',
        getCellContent: function(row) {
          return row['close'].toFixed(2);
        }
      });
      return [dateColumn, openColumn, highColumn, lowColumn, closeColumn];
    }),
    content: Ember.computed(function() {
      var _i, _ref, _results;
      return (function() {
        _results = [];
        for (var _i = 0, _ref = this.get('numRows'); 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(index) {
        var date;
        date = new Date();
        date.setDate(date.getDate() + index);
        return {
          date: date,
          open: Math.random() * 100 - 50,
          high: Math.random() * 100 - 50,
          low: Math.random() * 100 - 50,
          close: Math.random() * 100 - 50,
          volume: Math.random() * 1000000
        };
      });
    }).property('numRows')
  });

}).call(this);
