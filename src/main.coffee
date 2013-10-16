## Used for bundling files together using neuter

Ember.Table = Ember.Namespace.create()
Ember.Table.VERSION = '0.0.2'

Ember.libraries?.register 'Ember Table', Ember.Table.VERSION

require '../../lib/ember-addepar-mixins/resize_handler'
require '../../lib/ember-addepar-mixins/style_bindings'
require './utils/jquery_fix'
require './utils/lazy_container_view'
require './utils/utils'
require './row_selection_mixin'
require './column'
require './views'
require './component'
require './ember-table-templates.js'
