#
# Router
################################################################################

App.Router.map ->
  @route 'license'
  @resource 'emberTable', path: '/ember-table', ->
    @route 'ajax'
    @route 'bars'
    @route 'documentation'
    @route 'dynamic-bar'
    @route 'editable'
    @route 'financial'
    @route 'fluid'
    @route 'horizon'
    @route 'overview'
    @route 'simple'
    @route 'sparkline'

App.IndexRoute = Ember.Route.extend
  redirect: ->
    @transitionTo 'emberTable.overview'

App.EmberTableIndexRoute = Ember.Route.extend
  redirect: ->
    @transitionTo 'emberTable.overview'
