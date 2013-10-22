
App.EmberTableOverviewView = Ember.View.extend(App.LargeHeroAffixMixin)

App.EmberTableDocumentationView = Ember.View.extend(App.SmallHeroAffixMixin)

App.EmberTableSimpleView =
Ember.View.extend(App.CodePrettyPrintMixin, App.SmallHeroAffixMixin)

App.EmberTableFinancialView =
Ember.View.extend(App.CodePrettyPrintMixin, App.SmallHeroAffixMixin)

App.EmberTableEditableView =
Ember.View.extend(App.CodePrettyPrintMixin, App.SmallHeroAffixMixin)

App.EmberTableChartsView =
Ember.View.extend(App.CodePrettyPrintMixin, App.SmallHeroAffixMixin)

App.EmberTableAjaxView =
Ember.View.extend(App.CodePrettyPrintMixin, App.SmallHeroAffixMixin)
