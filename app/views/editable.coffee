App.TableEditableExample = Ember.Namespace.create()
App.TableEditableExample.EditableTableCell = Ember.Table.TableCell.extend
  className: 'editable-table-cell'
  templateName: 'editable_table/editable_table_cell'
  isEditing:  no
  type:       'text'

  innerTextField: Ember.TextField.extend
    typeBinding:  'parentView.type'
    valueBinding: 'parentView.cellContent'
    didInsertElement: -> @$().focus()
    blur: (event) ->
      @set 'parentView.isEditing', no

  onRowContentDidChange: Ember.observer ->
    @set 'isEditing', no
  , 'rowContent'

  click: (event) ->
    @set 'isEditing', yes
    event.stopPropagation()

App.TableEditableExample.DatePickerTableCell =
App.TableEditableExample.EditableTableCell.extend
  type: 'date'

App.TableEditableExample.RatingTableCell = Ember.Table.TableCell.extend
  classNames: 'rating-table-cell'
  templateName: 'ember_table/editable_table/rating_table_cell'
  didInsertElement: ->
    @_super()
    @onRowContentDidChange()
  applyRating: (rating) ->
    @$('.rating span').removeClass('active')
    span   = @$('.rating span').get(rating)
    $(span).addClass('active')
  click: (event) ->
    rating = @$('.rating span').index(event.target)
    return if rating is -1
    @get('column').setCellContent(@get('rowContent'), rating)
    @applyRating(rating)
  onRowContentDidChange: Ember.observer ->
    @applyRating @get('cellContent')
  , 'cellContent'
