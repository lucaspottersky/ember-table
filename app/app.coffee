# Ember-Table Dependencies
require 'dependencies/bootstrap/js/bootstrap'
require 'dependencies/antiscroll/antiscroll'
require 'dependencies/ember-addepar-mixins/resize_handler'
require 'dependencies/ember-addepar-mixins/style_bindings'
require 'dist/ember-table'

# Editable Table Example dependency
require 'dependencies/date'

# Editable Horizon and Sparkline dependency
require 'dependencies/d3.v3'
require 'dependencies/horizon'

window.App = Ember.Application.create
  LOG_TRANSITIONS: true

# Data
require 'build/app/data/data'

# Controllers
require 'build/app/controllers/ajax'
require 'build/app/controllers/bars'
require 'build/app/controllers/charts'
require 'build/app/controllers/dynamic_bar'
require 'build/app/controllers/editable'
require 'build/app/controllers/fluid'
require 'build/app/controllers/horizon'
require 'build/app/controllers/overview'
require 'build/app/controllers/simple'
require 'build/app/controllers/sparkline'
require 'build/app/controllers/treetable'

# Views
require 'build/app/views/ajax'
require 'build/app/views/bars'
require 'build/app/views/charts'
require 'build/app/views/dynamic_bar'
require 'build/app/views/editable'
require 'build/app/views/financial'
require 'build/app/views/horizon'
require 'build/app/views/sparkline'
require 'build/app/views/treetable'

# Router
require 'build/app/router'

# App
require 'build/app/main'

# Compiled Handlebars templates
require 'build/app/templates'
