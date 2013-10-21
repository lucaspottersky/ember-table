(function() {
  window.App = Ember.Application.create();

  App.ApplicationView = Ember.View.extend({
    classNames: 'ember-app',
    templateName: 'application'
  });

  App.ApplicationController = Ember.Controller.extend({
    data: Ember.computed(function() {
      return window.treedata;
    })
  });

}).call(this);
