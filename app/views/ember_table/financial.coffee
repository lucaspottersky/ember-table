App.FinancialTableCell = Ember.Table.TableCell.extend
  templateName: 'ember_table/financial_table/table_cell_container'

App.FinancialTableHeaderCell = Ember.Table.HeaderCell.extend
  templateName: 'ember_table/financial_table/table_tree_header_cell'

App.FinancialTableTreeCell = Ember.Table.TableCell.extend
  templateName: 'ember_table/financial_table/table_tree_cell'
  classNames:   'ember-table-table-tree-cell'
  paddingStyle: Ember.computed ->
    "padding-left:#{@get('row.indentation')}px;"
  .property 'row.indentation'

App.FinancialTableHeaderTreeCell = Ember.Table.HeaderCell.extend
  templateName: 'ember_table/financial_table/table_header_tree_cell'
  classNames:   'ember-table-table-header-tree-cell'
