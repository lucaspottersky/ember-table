(function() {
  window.App = Ember.Application.create();

  App.ApplicationView = Ember.View.extend({
    classNames: 'ember-app',
    templateName: 'application'
  });

  App.ApplicationController = Ember.Controller.extend({
    tableController: Ember.computed(function() {
      return Ember.get('App.TableFluidExample.TableController').create();
    }).property()
  });

}).call(this);
