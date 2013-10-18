(function() {

  window.App = Ember.Application.create();

  App.TableBarExample = Ember.Namespace.create();

  App.TableBarExample.BarCell = Ember.Table.TableCell.extend({
    templateName: 'bar-cell',
    classNameBindings: ['column.color'],
    barWidth: Ember.computed(function() {
      var column, row, _ref;
      _ref = this.getProperties('column', 'row'), column = _ref.column, row = _ref.row;
      if (!(column && row)) {
        return 0;
      }
      return Math.round(+this.get('cellContent'));
    }).property('cellContent'),
    histogramStyle: Ember.computed(function() {
      return "width: " + (this.get('barWidth')) + "%;";
    }).property('barWidth')
  });

  App.ApplicationView = Ember.View.extend({
    classNames: 'ember-app',
    templateName: 'application'
  });

  App.ApplicationController = Ember.Controller.extend({
    numRows: 100,
    init: function() {
      var _this = this;
      return setInterval(function() {
        return _this.get('content').forEach(function(item) {
          item.set('value1', Math.abs(item.get('value1') + (Math.random() * 10 - 5)));
          item.set('value2', Math.abs(item.get('value2') + (Math.random() * 10 - 5)));
          item.set('value3', Math.abs(item.get('value3') + (Math.random() * 10 - 5)));
          item.set('value4', Math.abs(item.get('value4') + (Math.random() * 10 - 5)));
          return item.set('value5', Math.abs(item.get('value5') + (Math.random() * 10 - 5)));
        });
      }, 1500);
    },
    columns: Ember.computed(function() {
      var colors, column1, columns;
      colors = ['blue', 'teal', 'green', 'yellow', 'orange'];
      column1 = Ember.Table.ColumnDefinition.create({
        columnWidth: 50,
        headerCellName: 'Name',
        contentPath: 'key'
      });
      columns = [1, 2, 3, 4, 5].map(function(number, index) {
        return Ember.Table.ColumnDefinition.create({
          color: colors[index],
          headerCellName: 'Bar',
          tableCellViewClass: 'App.TableBarExample.BarCell',
          contentPath: "value" + number
        });
      });
      columns.unshift(column1);
      return columns;
    }).property(),
    content: Ember.computed(function() {
      var _i, _ref, _results;
      return (function() {
        _results = [];
        for (var _i = 0, _ref = this.get('numRows'); 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(num, index) {
        return Ember.Object.create({
          key: index,
          value1: Math.random() * 80 + 10,
          value2: Math.random() * 80 + 10,
          value3: Math.random() * 80 + 10,
          value4: Math.random() * 80 + 10,
          value5: Math.random() * 80 + 10
        });
      });
    }).property('numRows')
  });

}).call(this);
