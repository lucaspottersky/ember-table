(function() {
  window.App = Ember.Application.create();

  App.LazyDataSource = Ember.ArrayProxy.extend({
    objectAt: function(idx) {
      var row;
      row = this.get('content')[idx];
      if (row) {
        return row;
      }
      row = {
        num: idx,
        start: '01/01/2009',
        finish: '01/05/2009',
        title: 'Task ' + idx,
        duration: '5 days',
        effortDriven: idx % 5 === 0
      };
      this.get('content')[idx] = row;
      return row;
    }
  });

  App.ApplicationView = Ember.View.extend({
    classNames: 'ember-app',
    templateName: 'application'
  });

  App.ApplicationController = Ember.Controller.extend({
    numRows: 100000,
    columnNames: Ember.computed(function() {
      return ['num', 'start', 'finish', 'title', 'duration', 'effortDriven'];
    }).property(),
    columns: Ember.computed(function() {
      return this.get('columnNames').map(function(key, index) {
        return Ember.Table.ColumnDefinition.create({
          index: index,
          headerCellName: key,
          contentPath: key
        });
      });
    }).property(),
    content: Ember.computed(function() {
      return App.LazyDataSource.create({
        content: new Array(this.get('numRows'))
      });
    }).property('numRows')
  });

}).call(this);
