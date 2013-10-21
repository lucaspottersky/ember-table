(function() {
  App.TableFluidExample = Ember.Namespace.create();

  App.TableFluidExample.LazyDataSource = Ember.ArrayProxy.extend({
    objectAt: function(idx) {
      var date, row;
      row = this.get('content')[idx];
      if (row) {
        return row;
      }
      date = new Date();
      date.setDate(date.getDate() + idx);
      row = {
        index: idx,
        date: date,
        open: Math.random() * 100 - 50,
        high: Math.random() * 100 - 50,
        low: Math.random() * 100 - 50,
        close: Math.random() * 100 - 50,
        volume: Math.random() * 1000000
      };
      this.get('content')[idx] = row;
      return row;
    }
  });

  App.FluidColumnDefinition = Ember.Table.ColumnDefinition.extend(Ember.Table.FluidColumnMixin);

  App.TableFluidExample.TableController = Ember.Table.TableController.extend(Ember.Table.FluidTableControllerMixin, {
    hasHeader: true,
    hasFooter: false,
    numFixedColumns: 0,
    numRows: 500000,
    rowHeight: 30,
    fluidTable: true,
    columns: Ember.computed(function() {
      var columnNames, columns, dateColumn, entryColumn;
      columnNames = ['open', 'high', 'low', 'close', 'volume'];
      entryColumn = App.FluidColumnDefinition.create({
        columnWidth: "10%",
        headerCellName: 'Entry',
        getCellContent: function(row) {
          return row['index'];
        }
      });
      dateColumn = App.FluidColumnDefinition.create({
        columnWidth: "30%",
        headerCellName: 'Date',
        getCellContent: function(row) {
          return row['date'].toDateString();
        }
      });
      columns = columnNames.map(function(key, index) {
        var name;
        name = key.charAt(0).toUpperCase() + key.slice(1);
        return App.FluidColumnDefinition.create({
          columnWidth: "12%",
          headerCellName: name,
          getCellContent: function(row) {
            return row[key].toFixed(2);
          }
        });
      });
      columns.unshift(dateColumn);
      columns.unshift(entryColumn);
      return columns;
    }).property(),
    content: Ember.computed(function() {
      return App.TableFluidExample.LazyDataSource.create({
        content: new Array(this.get('numRows'))
      });
    }).property('numRows')
  });

}).call(this);
