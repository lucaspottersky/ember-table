# Dependencies
require 'dependencies/bootstrap/js/bootstrap'
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
# require 'build/app/controllers/'

# Views
require 'build/app/views/index'

# Router
require 'build/app/router'

# App
require 'build/app/main'

# Compiled Handlebars templates
require 'build/app/templates'
