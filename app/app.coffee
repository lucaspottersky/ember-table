# Dependencies
require 'dependencies/bootstrap/js/bootstrap'
require 'dependencies/antiscroll/antiscroll'
require 'dependencies/ember-addepar-mixins/resize_handler'
require 'dependencies/ember-addepar-mixins/style_bindings'
require 'dist/ember-table'

window.App = Ember.Application.create
  LOG_TRANSITIONS: true

# Data
require 'build/app/data/treedata'

# Components
# require 'build/app/components/resizable_panel'

# Controllers
require 'build/app/controllers/overview'
require 'build/app/controllers/simple'
require 'build/app/controllers/treetable'
require 'build/app/controllers/financial'
require 'build/app/controllers/editable'
require 'build/app/controllers/bars'
require 'build/app/controllers/charts'
require 'build/app/controllers/ajax'

# Views
require 'build/app/views/index'
require 'build/app/views/ajax'
require 'build/app/views/treetable'
require 'build/app/views/financial'
require 'build/app/views/editable'
require 'build/app/views/bars'
require 'build/app/views/charts'

# Router
require 'build/app/router'

# App
require 'build/app/main'

# Compiled Handlebars templates
require 'build/app/templates'
