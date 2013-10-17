/*! ember-table 2013-10-17 */
(function(e, t, n) {
    function i(n, s) {
        if (!t[n]) {
            if (!e[n]) {
                var o = "function" == typeof require && require;
                if (!s && o) return o(n, !0);
                if (r) return r(n, !0);
                throw Error("Cannot find module '" + n + "'");
            }
            var u = t[n] = {
                exports: {}
            };
            e[n][0].call(u.exports, function(t) {
                var r = e[n][1][t];
                return i(r ? r : t);
            }, u, u.exports);
        }
        return t[n].exports;
    }
    for (var r = "function" == typeof require && require, s = 0; n.length > s; s++) i(n[s]);
    return i;
})({
    1: [ function(require) {
        var _ref;
        Ember.Table = Ember.Namespace.create(), Ember.Table.VERSION = "0.0.2", null != (_ref = Ember.libraries) && _ref.register("Ember Table", Ember.Table.VERSION), 
        require("../../lib/ember-addepar-mixins/resize_handler"), require("../../lib/ember-addepar-mixins/style_bindings"), 
        require("./utils/jquery_fix"), require("./utils/lazy_container_view"), require("./utils/utils"), 
        require("./row_selection_mixin"), require("./column"), require("./views"), require("./component"), 
        require("./ember-table-templates.js");
    }, {
        "./ember-table-templates.js": 2,
        "../../lib/ember-addepar-mixins/resize_handler": 3,
        "../../lib/ember-addepar-mixins/style_bindings": 4,
        "./utils/jquery_fix": 5,
        "./utils/lazy_container_view": 6,
        "./utils/utils": 7,
        "./row_selection_mixin": 8,
        "./column": 9,
        "./views": 10,
        "./component": 11
    } ],
    3: [ function() {
        Ember.AddeparMixins = Ember.AddeparMixins || Ember.Namespace.create(), Ember.AddeparMixins.ResizeHandlerMixin = Ember.Mixin.create({
            resizeEndDelay: 200,
            resizing: !1,
            onResizeStart: Ember.K,
            onResizeEnd: Ember.K,
            onResize: Ember.K,
            endResize: Ember.computed(function() {
                return function(event) {
                    return this.isDestroyed ? void 0 : (this.set("resizing", !1), "function" == typeof this.onResizeEnd ? this.onResizeEnd(event) : void 0);
                };
            }),
            handleWindowResize: function(event) {
                return this.get("resizing") || (this.set("resizing", !0), "function" == typeof this.onResizeStart && this.onResizeStart(event)), 
                "function" == typeof this.onResize && this.onResize(event), Ember.run.debounce(this, this.get("endResize"), event, this.get("resizeEndDelay"));
            },
            didInsertElement: function() {
                return this._super(), this._setupDocumentHandlers();
            },
            willDestroyElement: function() {
                return this._removeDocumentHandlers(), this._super();
            },
            _setupDocumentHandlers: function() {
                return this._resizeHandler ? void 0 : (this._resizeHandler = jQuery.proxy(this.get("handleWindowResize"), this), 
                jQuery(window).on("resize." + this.elementId, this._resizeHandler));
            },
            _removeDocumentHandlers: function() {
                return jQuery(window).off("resize." + this.elementId, this._resizeHandler), this._resizeHandler = null;
            }
        });
    }, {} ],
    4: [ function() {
        Ember.AddeparMixins = Ember.AddeparMixins || Ember.Namespace.create(), Ember.AddeparMixins.StyleBindingsMixin = Ember.Mixin.create({
            concatenatedProperties: [ "styleBindings" ],
            attributeBindings: [ "style" ],
            unitType: "px",
            createStyleString: function(styleName, property) {
                var value;
                return value = this.get(property), void 0 !== value ? ("number" === Ember.typeOf(value) && (value += this.get("unitType")), 
                "" + styleName + ":" + value + ";") : void 0;
            },
            applyStyleBindings: function() {
                var lookup, properties, styleBindings, styleComputed, styles, _this = this;
                return (styleBindings = this.styleBindings) ? (lookup = {}, styleBindings.forEach(function(binding) {
                    var property, style, tmp;
                    tmp = binding.split(":"), property = tmp[0], style = tmp[1], lookup[style || property] = property;
                }), styles = Ember.keys(lookup), properties = styles.map(function(style) {
                    return lookup[style];
                }), styleComputed = Ember.computed(function() {
                    var styleString, styleTokens;
                    return styleTokens = styles.map(function(style) {
                        return _this.createStyleString(style, lookup[style]);
                    }), styleString = styleTokens.join(""), 0 !== styleString.length ? styleString : void 0;
                }), styleComputed.property.apply(styleComputed, properties), Ember.defineProperty(this, "style", styleComputed)) : void 0;
            },
            init: function() {
                return this.applyStyleBindings(), this._super();
            }
        });
    }, {} ],
    2: [ function() {
        Ember.TEMPLATES["body-container"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var hashContexts, hashTypes, buffer = "", escapeExpression = this.escapeExpression;
            return data.buffer.push('<div class="antiscroll-box">\n  <div class="antiscroll-inner">\n    <div class="ember-table-table-scrollable-wrapper">\n      '), 
            hashContexts = {
                classNames: depth0,
                contentBinding: depth0,
                columnsBinding: depth0,
                widthBinding: depth0,
                numItemsShowingBinding: depth0,
                scrollTopBinding: depth0,
                startIndexBinding: depth0
            }, hashTypes = {
                classNames: "STRING",
                contentBinding: "STRING",
                columnsBinding: "STRING",
                widthBinding: "STRING",
                numItemsShowingBinding: "STRING",
                scrollTopBinding: "STRING",
                startIndexBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.LazyTableBlock", {
                hash: {
                    classNames: "ember-table-left-table-block",
                    contentBinding: "controller.bodyContent",
                    columnsBinding: "controller.fixedColumns",
                    widthBinding: "controller._fixedBlockWidth",
                    numItemsShowingBinding: "controller._numItemsShowing",
                    scrollTopBinding: "controller._scrollTop",
                    startIndexBinding: "controller._startIndex"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n      "), hashContexts = {
                classNames: depth0,
                contentBinding: depth0,
                columnsBinding: depth0,
                scrollLeftBinding: depth0,
                widthBinding: depth0,
                numItemsShowingBinding: depth0,
                scrollTopBinding: depth0,
                startIndexBinding: depth0
            }, hashTypes = {
                classNames: "STRING",
                contentBinding: "STRING",
                columnsBinding: "STRING",
                scrollLeftBinding: "STRING",
                widthBinding: "STRING",
                numItemsShowingBinding: "STRING",
                scrollTopBinding: "STRING",
                startIndexBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.LazyTableBlock", {
                hash: {
                    classNames: "ember-table-right-table-block",
                    contentBinding: "controller.bodyContent",
                    columnsBinding: "controller.tableColumns",
                    scrollLeftBinding: "controller._tableScrollLeft",
                    widthBinding: "controller._tableBlockWidth",
                    numItemsShowingBinding: "controller._numItemsShowing",
                    scrollTopBinding: "controller._scrollTop",
                    startIndexBinding: "controller._startIndex"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n    </div>\n  </div>\n</div>"), buffer;
        }), Ember.TEMPLATES["components/ember-table"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            function program1(depth0, data) {
                var hashTypes, hashContexts, buffer = "";
                return data.buffer.push("\n  "), hashTypes = {}, hashContexts = {}, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.HeaderTableContainer", {
                    hash: {},
                    contexts: [ depth0 ],
                    types: [ "ID" ],
                    hashContexts: hashContexts,
                    hashTypes: hashTypes,
                    data: data
                }))), data.buffer.push("\n"), buffer;
            }
            function program3(depth0, data) {
                var hashTypes, hashContexts, buffer = "";
                return data.buffer.push("\n  "), hashTypes = {}, hashContexts = {}, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.FooterTableContainer", {
                    hash: {},
                    contexts: [ depth0 ],
                    types: [ "ID" ],
                    hashContexts: hashContexts,
                    hashTypes: hashTypes,
                    data: data
                }))), data.buffer.push("\n"), buffer;
            }
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var stack1, hashTypes, hashContexts, buffer = "", escapeExpression = this.escapeExpression, self = this;
            return hashTypes = {}, hashContexts = {}, stack1 = helpers["if"].call(depth0, "controller.hasHeader", {
                hash: {},
                inverse: self.noop,
                fn: self.program(1, program1, data),
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }), (stack1 || 0 === stack1) && data.buffer.push(stack1), data.buffer.push("\n"), 
            hashTypes = {}, hashContexts = {}, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.BodyTableContainer", {
                hash: {},
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n"), hashTypes = {}, hashContexts = {}, stack1 = helpers["if"].call(depth0, "controller.hasFooter", {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }), (stack1 || 0 === stack1) && data.buffer.push(stack1), data.buffer.push("\n"), 
            hashTypes = {}, hashContexts = {}, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.ScrollContainer", {
                hash: {},
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n"), hashTypes = {}, hashContexts = {}, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.ColumnSortableIndicator", {
                hash: {},
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n"), buffer;
        }), Ember.TEMPLATES["footer-container"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var hashContexts, hashTypes, buffer = "", escapeExpression = this.escapeExpression;
            return data.buffer.push('<div class="ember-table-table-fixed-wrapper">\n  '), hashContexts = {
                classNames: depth0,
                contentBinding: depth0,
                columnsBinding: depth0,
                widthBinding: depth0,
                heightBinding: depth0
            }, hashTypes = {
                classNames: "STRING",
                contentBinding: "STRING",
                columnsBinding: "STRING",
                widthBinding: "STRING",
                heightBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.TableBlock", {
                hash: {
                    classNames: "ember-table-left-table-block",
                    contentBinding: "controller.footerContent",
                    columnsBinding: "controller.fixedColumns",
                    widthBinding: "controller._fixedBlockWidth",
                    heightBinding: "controller.footerHeight"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n  "), hashContexts = {
                classNames: depth0,
                contentBinding: depth0,
                columnsBinding: depth0,
                scrollLeftBinding: depth0,
                widthBinding: depth0,
                heightBinding: depth0
            }, hashTypes = {
                classNames: "STRING",
                contentBinding: "STRING",
                columnsBinding: "STRING",
                scrollLeftBinding: "STRING",
                widthBinding: "STRING",
                heightBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.TableBlock", {
                hash: {
                    classNames: "ember-table-right-table-block",
                    contentBinding: "controller.footerContent",
                    columnsBinding: "controller.tableColumns",
                    scrollLeftBinding: "controller._tableScrollLeft",
                    widthBinding: "controller._tableBlockWidth",
                    heightBinding: "controller.footerHeight"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n</div>\n"), buffer;
        }), Ember.TEMPLATES["header-cell"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var hashTypes, hashContexts, buffer = "", escapeExpression = this.escapeExpression;
            return data.buffer.push('<div class="ember-table-content-container" '), hashTypes = {}, 
            hashContexts = {}, data.buffer.push(escapeExpression(helpers.action.call(depth0, "sortByColumn", "view.content", {
                hash: {},
                contexts: [ depth0, depth0 ],
                types: [ "ID", "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push('>\n  <span class="ember-table-content">\n    '), hashTypes = {}, 
            hashContexts = {}, data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.headerCellName", {
                hash: {},
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n  </span>\n</div>"), buffer;
        }), Ember.TEMPLATES["header-container"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var hashContexts, hashTypes, buffer = "", escapeExpression = this.escapeExpression;
            return data.buffer.push('<div class="ember-table-table-fixed-wrapper">\n  '), hashContexts = {
                classNames: depth0,
                columnsBinding: depth0,
                widthBinding: depth0,
                heightBinding: depth0
            }, hashTypes = {
                classNames: "STRING",
                columnsBinding: "STRING",
                widthBinding: "STRING",
                heightBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.HeaderBlock", {
                hash: {
                    classNames: "ember-table-left-table-block",
                    columnsBinding: "controller.fixedColumns",
                    widthBinding: "controller._fixedBlockWidth",
                    heightBinding: "controller.headerHeight"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n  "), hashContexts = {
                classNames: depth0,
                columnsBinding: depth0,
                scrollLeftBinding: depth0,
                widthBinding: depth0,
                heightBinding: depth0
            }, hashTypes = {
                classNames: "STRING",
                columnsBinding: "STRING",
                scrollLeftBinding: "STRING",
                widthBinding: "STRING",
                heightBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.HeaderBlock", {
                hash: {
                    classNames: "ember-table-right-table-block",
                    columnsBinding: "controller.tableColumns",
                    scrollLeftBinding: "controller._tableScrollLeft",
                    widthBinding: "controller._tableBlockWidth",
                    heightBinding: "controller.headerHeight"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n</div>\n"), buffer;
        }), Ember.TEMPLATES["header-row"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var hashContexts, hashTypes, buffer = "", escapeExpression = this.escapeExpression;
            return hashContexts = {
                contentBinding: depth0,
                itemViewClassField: depth0,
                widthBinding: depth0
            }, hashTypes = {
                contentBinding: "STRING",
                itemViewClassField: "STRING",
                widthBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.MultiItemViewCollectionView", {
                hash: {
                    contentBinding: "view.content",
                    itemViewClassField: "headerCellViewClass",
                    widthBinding: "controller._tableColumnsWidth"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n"), buffer;
        }), Ember.TEMPLATES["scroll-container"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var hashTypes, hashContexts, buffer = "", escapeExpression = this.escapeExpression;
            return data.buffer.push('<div class="antiscroll-wrap">\n  <div class="antiscroll-inner">\n    '), 
            hashTypes = {}, hashContexts = {}, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.ScrollPanel", {
                hash: {},
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n  </div>\n</div>\n"), buffer;
        }), Ember.TEMPLATES["table-row"] = Ember.Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
            this.compilerInfo = [ 4, ">= 1.0.0" ], helpers = this.merge(helpers, Ember.Handlebars.helpers), 
            data = data || {};
            var hashContexts, hashTypes, buffer = "", escapeExpression = this.escapeExpression;
            return hashContexts = {
                rowBinding: depth0,
                contentBinding: depth0,
                itemViewClassField: depth0,
                widthBinding: depth0
            }, hashTypes = {
                rowBinding: "STRING",
                contentBinding: "STRING",
                itemViewClassField: "STRING",
                widthBinding: "STRING"
            }, data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.MultiItemViewCollectionView", {
                hash: {
                    rowBinding: "view.row",
                    contentBinding: "view.columns",
                    itemViewClassField: "tableCellViewClass",
                    widthBinding: "controller._tableColumnsWidth"
                },
                contexts: [ depth0 ],
                types: [ "ID" ],
                hashContexts: hashContexts,
                hashTypes: hashTypes,
                data: data
            }))), data.buffer.push("\n"), buffer;
        });
    }, {} ],
    5: [ function() {
        /*
jQuery.browser shim that makes HT working with jQuery 1.8+
*/
        jQuery.browser || function() {
            var browser, matched, res;
            return matched = void 0, browser = void 0, jQuery.uaMatch = function(ua) {
                var match;
                return ua = ua.toLowerCase(), match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || 0 > ua.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [], 
                {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            }, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, 
            browser.version = matched.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0), 
            res = jQuery.browser = browser;
        }();
    }, {} ],
    6: [ function() {
        Ember.LazyContainerView = Ember.ContainerView.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            classNames: "lazy-list-container",
            styleBindings: [ "height" ],
            content: null,
            itemViewClass: null,
            rowHeight: null,
            scrollTop: null,
            startIndex: null,
            init: function() {
                return this._super(), this.onNumChildViewsDidChange();
            },
            height: Ember.computed(function() {
                return this.get("content.length") * this.get("rowHeight");
            }).property("content.length", "rowHeight"),
            numChildViews: Ember.computed(function() {
                return this.get("numItemsShowing") + 2;
            }).property("numItemsShowing"),
            onNumChildViewsDidChange: Ember.observer(function() {
                var itemViewClass, newNumViews, numViewsToInsert, oldNumViews, view, viewsToAdd, viewsToRemove, _results;
                return view = this, itemViewClass = Ember.get(this.get("itemViewClass")), newNumViews = this.get("numChildViews"), 
                itemViewClass && newNumViews ? (oldNumViews = this.get("length"), numViewsToInsert = newNumViews - oldNumViews, 
                0 > numViewsToInsert ? (viewsToRemove = this.slice(newNumViews, oldNumViews), this.removeObjects(viewsToRemove)) : numViewsToInsert > 0 ? (viewsToAdd = function() {
                    _results = [];
                    for (var _i = 0; numViewsToInsert >= 0 ? numViewsToInsert > _i : _i > numViewsToInsert; numViewsToInsert >= 0 ? _i++ : _i--) _results.push(_i);
                    return _results;
                }.apply(this).map(function() {
                    return view.createChildView(itemViewClass);
                }), this.pushObjects(viewsToAdd)) : void 0) : void 0;
            }, "numChildViews", "itemViewClass"),
            viewportDidChange: Ember.observer(function() {
                var clength, content, numShownViews, startIndex;
                return content = this.get("content") || [], clength = content.get("length"), numShownViews = Math.min(this.get("length"), clength), 
                startIndex = this.get("startIndex"), startIndex + numShownViews >= clength && (startIndex = clength - numShownViews), 
                0 > startIndex && (startIndex = 0), this.forEach(function(childView, i) {
                    var item, itemIndex;
                    return i >= numShownViews ? (childView = this.objectAt(i), childView.set("content", null), 
                    void 0) : (itemIndex = startIndex + i, childView = this.objectAt(itemIndex % numShownViews), 
                    item = content.objectAt(itemIndex), item !== childView.get("content") ? (childView.teardownContent(), 
                    childView.set("itemIndex", itemIndex), childView.set("content", item), childView.prepareContent()) : void 0);
                }, this);
            }, "content.length", "length", "startIndex")
        }), /**
 * Lazy Item View
 * @class
 * @alias Ember.LazyItemView
*/
        Ember.LazyItemView = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            itemIndex: null,
            prepareContent: Ember.K,
            teardownContent: Ember.K,
            rowHeightBinding: "parentView.rowHeight",
            styleBindings: [ "width", "top", "display" ],
            top: Ember.computed(function() {
                return this.get("itemIndex") * this.get("rowHeight");
            }).property("itemIndex", "rowHeight"),
            display: Ember.computed(function() {
                return this.get("content") ? void 0 : "none";
            }).property("content")
        });
    }, {} ],
    7: [ function() {
        /**
 * Multi Item View Collection View
 * @class
 * @alias Ember.Table.MultiItemViewCollectionView
*/
        Ember.MultiItemViewCollectionView = Ember.CollectionView.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            styleBindings: "width",
            itemViewClassField: null,
            createChildView: function(view, attrs) {
                var itemViewClass, itemViewClassField;
                return itemViewClassField = this.get("itemViewClassField"), itemViewClass = attrs.content.get(itemViewClassField), 
                "string" == typeof itemViewClass && (itemViewClass = Ember.get(Ember.lookup, itemViewClass)), 
                this._super(itemViewClass, attrs);
            }
        }), Ember.MouseWheelHandlerMixin = Ember.Mixin.create({
            onMouseWheel: Ember.K,
            didInsertElement: function() {
                var _this = this;
                return this._super(), this.$().bind("mousewheel", function(event, delta, deltaX, deltaY) {
                    return Ember.run(_this, _this.onMouseWheel, event, delta, deltaX, deltaY);
                });
            },
            willDestroyElement: function() {
                var _ref;
                return null != (_ref = this.$()) && _ref.unbind("mousewheel"), this._super();
            }
        }), Ember.ScrollHandlerMixin = Ember.Mixin.create({
            onScroll: Ember.K,
            scrollElementSelector: "",
            didInsertElement: function() {
                var _this = this;
                return this._super(), this.$(this.get("scrollElementSelector")).bind("scroll", function(event) {
                    return Ember.run(_this, _this.onScroll, event);
                });
            },
            willDestroyElement: function() {
                var _ref;
                return null != (_ref = this.$(this.get("scrollElementSelector"))) && _ref.unbind("scroll"), 
                this._super();
            }
        }), Ember.TouchMoveHandlerMixin = Ember.Mixin.create({
            onTouchMove: Ember.K,
            didInsertElement: function() {
                var startX, startY, _this = this;
                return this._super(), startX = startY = 0, this.$().bind("touchstart", function(event) {
                    startX = event.originalEvent.targetTouches[0].pageX, startY = event.originalEvent.targetTouches[0].pageY;
                }), this.$().bind("touchmove", function(event) {
                    var deltaX, deltaY, newX, newY;
                    newX = event.originalEvent.targetTouches[0].pageX, newY = event.originalEvent.targetTouches[0].pageY, 
                    deltaX = -(newX - startX), deltaY = -(newY - startY), Ember.run(_this, _this.onTouchMove, event, deltaX, deltaY), 
                    startX = newX, startY = newY;
                });
            },
            willDestroy: function() {
                var _ref;
                return null != (_ref = this.$()) && _ref.unbind("touchmove"), this._super();
            }
        }), /**
* Table Row Array Proxy
* @class
* @alias Ember.Table.RowArrayProxy
*/
        Ember.Table.RowArrayController = Ember.ArrayController.extend({
            itemController: null,
            content: null,
            rowContent: Ember.computed(function() {
                return [];
            }).property(),
            controllerAt: function(idx, object) {
                var container, subController, subControllers;
                return container = this.get("container"), subControllers = this.get("_subControllers"), 
                (subController = subControllers[idx]) ? subController : (subController = this.get("itemController").create({
                    target: this,
                    parentController: this.get("parentController") || this,
                    content: object
                }), subControllers[idx] = subController, subController);
            }
        });
    }, {} ],
    8: [ function() {
        var indexesOf;
        indexesOf = Ember.EnumerableUtils.indexesOf, Ember.Table.RowSelectionMixin = Ember.Mixin.create({
            attributeBindings: "tabindex",
            content: Ember.computed.alias("controller.bodyContent"),
            rowHeight: Ember.computed.alias("controller.rowHeight"),
            numItemsShowing: Ember.computed.alias("controller._numItemsShowing"),
            startIndex: Ember.computed.alias("controller._startIndex"),
            scrollTop: Ember.computed.alias("controller._tableScrollTop"),
            tabindex: -1,
            KEY_EVENTS: {
                37: "leftArrowPressed",
                38: "upArrowPressed",
                39: "rightArrowPressed",
                40: "downArrowPressed"
            },
            _calculateSelectionIndices: function(value) {
                var content, indices, rows, selection;
                selection = this.get("selectionIndices"), selection.clear(), rows = this.get("content"), 
                rows && (content = rows.mapProperty("content"), indices = indexesOf(content, value), 
                indices = indices.filter(function(idx) {
                    return idx > 0;
                }), selection.addObjects(indices));
            },
            contentDidChange: Ember.observer(function() {
                return this._calculateSelectionIndices(this.get("selection"));
            }, "content.@each.content"),
            selection: Ember.computed(function(key, value) {
                var rows, selection;
                return rows = this.get("content") || [], selection = this.get("selectionIndices"), 
                value = value || [], 1 === arguments.length ? value = selection.map(function(index) {
                    return rows.objectAt(index).get("content");
                }) : this._calculateSelectionIndices(value), value;
            }).property("selectionIndices.[]"),
            selectionIndices: Ember.computed(function() {
                var set;
                return set = new Ember.Set(), set.addEnumerableObserver(this), set;
            }).property(),
            enumerableDidChange: Ember.K,
            enumerableWillChange: function(set, removing, adding) {
                var content;
                return (content = this.get("content")) ? ("number" == typeof removing ? set.forEach(function(index) {
                    var row;
                    return row = content.objectAt(index), row ? row.set("isSelected", !1) : void 0;
                }) : removing && removing.forEach(function(index) {
                    var row;
                    return row = content.objectAt(index), row ? row.set("isSelected", !1) : void 0;
                }), adding && "number" != typeof adding ? adding.forEach(function(index) {
                    var row;
                    return row = content.objectAt(index), row ? row.set("isSelected", !0) : void 0;
                }) : void 0) : void 0;
            },
            mouseDown: function(event) {
                var index, sel;
                return index = this.getIndexForEvent(event), sel = this.get("selectionIndices"), 
                sel.contains(index) && 1 === sel.length ? sel.clear() : this.setSelectionIndex(index);
            },
            keyDown: function(event) {
                var map, method, _ref;
                return map = this.get("KEY_EVENTS"), method = map[event.keyCode], method ? null != (_ref = this.get(method)) ? _ref.apply(this, arguments) : void 0 : void 0;
            },
            upArrowPressed: function(event) {
                var index, sel;
                return event.preventDefault(), sel = this.get("selectionIndices.lastObject"), index = event.ctrlKey || event.metaKey ? 0 : sel - 1, 
                this.setSelectionIndex(index);
            },
            downArrowPressed: function(event) {
                var clen, index, sel;
                return event.preventDefault(), sel = this.get("selectionIndices.lastObject"), clen = this.get("content.length"), 
                index = event.ctrlKey || event.metaKey ? clen - 1 : sel + 1, this.setSelectionIndex(index);
            },
            getIndexForEvent: function(event) {
                return this.getRowIndexFast(this.getRowForEvent(event));
            },
            getRowForEvent: function(event) {
                var $rowView, view;
                return $rowView = $(event.target).parents(".table-row"), view = Ember.View.views[$rowView.attr("id")], 
                view ? view.get("row") : void 0;
            },
            getRowIndexFast: function(row) {
                var index, numRows, startIndex, sublist;
                return startIndex = this.get("startIndex"), numRows = this.get("numItemsShowing") + 1, 
                sublist = this.get("content").slice(startIndex, startIndex + numRows), index = sublist.indexOf(row), 
                0 > index ? index : index + startIndex;
            },
            setSelectionIndex: function(index) {
                var sel;
                if (this.ensureIndex(index)) return sel = this.get("selectionIndices"), this.get("selectionIndices").clear(), 
                this.toggleSelectionIndex(index);
            },
            toggleSelectionIndex: function(index) {
                var sel;
                if (this.ensureIndex(index)) return sel = this.get("selectionIndices"), sel.contains(index) ? sel.remove(index) : sel.add(index), 
                this.ensureVisible(index);
            },
            ensureIndex: function(index) {
                var clen;
                return clen = this.get("content.length"), index >= 0 && clen > index;
            },
            ensureVisible: function(index) {
                var endIndex, numRows, startIndex;
                return startIndex = this.get("startIndex"), numRows = this.get("numItemsShowing"), 
                endIndex = startIndex + numRows, startIndex > index ? this.scrollToRowIndex(index) : index >= endIndex ? this.scrollToRowIndex(index - numRows + 1) : void 0;
            },
            scrollToRowIndex: function(index) {
                var rowHeight, scrollTop;
                return rowHeight = this.get("rowHeight"), scrollTop = index * rowHeight, this.set("scrollTop", scrollTop);
            }
        });
    }, {} ],
    9: [ function() {
        /**
 * Column Definition
 * @class
 * @alias Ember.Table.ColumnDefinition
*/
        Ember.Table.ColumnDefinition = Ember.Object.extend({
            headerCellName: void 0,
            contentPath: void 0,
            minWidth: void 0,
            maxWidth: void 0,
            defaultColumnWidth: 150,
            columnWidth: Ember.computed.oneWay("defaultColumnWidth"),
            isResizable: !0,
            isSortable: !0,
            textAlign: "text-align-right",
            canAutoResize: !0,
            headerCellViewClass: "Ember.Table.HeaderCell",
            tableCellViewClass: "Ember.Table.TableCell",
            /**
  * Get Cell Content - This gives a formatted value e.g. $20,000,000
  * @memberof Ember.Table.ColumnDefinition
  * @instance
  * @argument row {Ember.Table.Row}
  * @todo More detailed doc needed!
  */
            getCellContent: function(row) {
                var path;
                return path = this.get("contentPath"), Ember.assert("You must either provide a contentPath or override getCellContent in your column definition", null != path), 
                Ember.get(row, path);
            },
            /**
  * Set Cell Content
  * @memberof Ember.Table.ColumnDefinition
  * @instance
  */
            setCellContent: Ember.K
        }), /**
 * Table Row
 * @class
 * @alias Ember.Table.Row
*/
        Ember.Table.Row = Ember.ObjectProxy.extend({
            /**
  * Content of the row
  * @memberof Ember.Table.Row
  * @member content
  * @instance
  */
            content: null,
            /**
  * Is Selected?
  * @memberof Ember.Table.Row
  * @member {Boolean} isSelected
  * @instance
  */
            isSelected: !1,
            /**
  * Is Showing?
  * @memberof Ember.Table.Row
  * @member {Boolean} isShowing
  * @instance
  */
            isShowing: !0,
            /**
  * Is Active?
  * @memberof Ember.Table.Row
  * @member {Boolean} isActive
  * @instance
  */
            isActive: !1
        });
    }, {} ],
    10: [ function() {
        /**
* Table Container
* @class
* @alias Ember.Table.TableContainer
* @mixes Ember.AddeparMixins.StyleBindingsMixin
*/
        Ember.Table.TableContainer = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            classNames: [ "ember-table-table-container" ],
            styleBindings: [ "height", "width" ]
        }), /**
* Table Block
* @class
* @alias Ember.Table.TableBlock
* @mixes Ember.AddeparMixins.StyleBindingsMixin
* @todo This should be a mixin
*/
        Ember.Table.TableBlock = Ember.CollectionView.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            classNames: [ "ember-table-table-block" ],
            styleBindings: [ "width", "height" ],
            itemViewClass: Ember.computed.alias("controller.tableRowViewClass"),
            columns: null,
            content: null,
            scrollLeft: null,
            /**
  * On scroll left did change callback
  * @memberof Ember.Table.TableBlock
  * @instance
  */
            onScrollLeftDidChange: Ember.observer(function() {
                return this.$().scrollLeft(this.get("scrollLeft"));
            }, "scrollLeft"),
            height: Ember.computed(function() {
                return this.get("controller._headerHeight");
            }).property("controller._headerHeight")
        }), /**
* Lazy Table Block
* @class
* @alias Ember.Table.LazyTableBlock
*/
        Ember.Table.LazyTableBlock = Ember.LazyContainerView.extend({
            classNames: [ "ember-table-table-block" ],
            styleBindings: [ "width" ],
            itemViewClass: Ember.computed.alias("controller.tableRowViewClass"),
            rowHeight: Ember.computed.alias("controller.rowHeight"),
            columns: null,
            content: null,
            scrollLeft: null,
            scrollTop: null,
            /**
  * On scroll left did change callback
  * @memberof Ember.Table.LazyTableBlock
  * @instance
  */
            onScrollLeftDidChange: Ember.observer(function() {
                return this.$().scrollLeft(this.get("scrollLeft"));
            }, "scrollLeft")
        }), /**
* Table Row
* @class
* @alias Ember.Table.TableRow
*/
        Ember.Table.TableRow = Ember.LazyItemView.extend({
            templateName: "table-row",
            classNames: "ember-table-table-row",
            classNameBindings: [ "row.isActive:active", "row.isSelected:ember-table-selected", "row.rowStyle", "isLastRow:ember-table-last-row" ],
            styleBindings: [ "width", "height" ],
            row: Ember.computed.alias("content"),
            columns: Ember.computed.alias("parentView.columns"),
            width: Ember.computed.alias("controller._rowWidth"),
            height: Ember.computed.alias("controller.rowHeight"),
            isLastRow: Ember.computed(function() {
                return this.get("row") === this.get("controller.bodyContent.lastObject");
            }).property("controller.bodyContent.lastObject", "row"),
            /**
  * Mouse enter callback
  * @memberof Ember.Table.TableRow
  * @instance
  * @param event jQuery event
  */
            mouseEnter: function() {
                var row;
                return row = this.get("row"), row ? row.set("isActive", !0) : void 0;
            },
            /**
  * Mouse leave callback
  * @memberof Ember.Table.TableRow
  * @instance
  * @param event jQuery event
  */
            mouseLeave: function() {
                var row;
                return row = this.get("row"), row ? row.set("isActive", !1) : void 0;
            },
            /**
  * Teardown content
  * @memberof Ember.Table.TableRow
  * @instance
  */
            teardownContent: function() {
                var row;
                return row = this.get("row"), row ? row.set("isActive", !1) : void 0;
            }
        }), /**
* Table Cell
* @class
* @alias Ember.Table.TableCell
* @mixes Ember.AddeparMixins.StyleBindingsMixin
*/
        Ember.Table.TableCell = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            defaultTemplate: Ember.Handlebars.compile("{{view.cellContent}}"),
            classNames: [ "ember-table-cell" ],
            classNameBindings: "column.textAlign",
            styleBindings: "width",
            row: Ember.computed.alias("parentView.row"),
            column: Ember.computed.alias("content"),
            rowContent: Ember.computed.alias("row.content"),
            width: Ember.computed.alias("column.columnWidth"),
            init: function() {
                return this._super.apply(this, arguments), this.contentPathDidChange();
            },
            contentDidChange: function() {
                return this.notifyPropertyChange("cellContent");
            },
            contentPathWillChange: function() {
                var contentPath;
                return contentPath = this.get("column.contentPath"), contentPath ? this.removeObserver("rowContent." + contentPath, this, this.contentDidChange) : void 0;
            }.observesBefore("column.contentPath"),
            contentPathDidChange: function() {
                var contentPath;
                return contentPath = this.get("column.contentPath"), contentPath ? this.addObserver("rowContent." + contentPath, this, this.contentDidChange) : void 0;
            }.observesBefore("column.contentPath"),
            /**
  * Computed Cell Content
  * @memberof Ember.Table.TableCell
  * @instance
  */
            cellContent: Ember.computed(function(key, value) {
                var column, row;
                return row = this.get("rowContent"), column = this.get("column"), row && column ? (1 === arguments.length ? value = column.getCellContent(row) : column.setCellContent(row, value), 
                value) : void 0;
            }).property("rowContent.isLoaded", "column")
        }), /**
* HeaderBlock
* @class
* @alias Ember.Table.HeaderBlock
* @augments Ember.Table.TableBlock
*/
        Ember.Table.HeaderBlock = Ember.Table.TableBlock.extend({
            classNames: [ "ember-table-header-block" ],
            itemViewClass: "Ember.Table.HeaderRow",
            /**
  * Computed Content
  * @memberof Ember.Table.HeaderBlock
  * @instance
  */
            content: Ember.computed(function() {
                return [ this.get("columns") ];
            }).property("columns")
        }), /**
* Header Row
* @class
* @alias Ember.Table.HeaderRow
* @mixes Ember.AddeparMixins.StyleBindingsMixin
*/
        Ember.Table.HeaderRow = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            templateName: "header-row",
            classNames: [ "ember-table-table-row", "ember-table-header-row" ],
            columns: Ember.computed.alias("content"),
            scrollLeft: Ember.computed.alias("controller._tableScrollLeft"),
            /**
  * Options for jQuery UI sortable
  * @memberof Ember.Table.HeaderRow
  * @instance
  */
            sortableOption: Ember.computed(function() {
                return {
                    axis: "x",
                    containment: "parent",
                    cursor: "move",
                    helper: "clone",
                    items: ".ember-table-header-cell.sortable",
                    opacity: .9,
                    placeholder: "ui-state-highlight",
                    scroll: !0,
                    tolerance: "pointer",
                    update: jQuery.proxy(this.onColumnSortDone, this),
                    stop: jQuery.proxy(this.onColumnSortStop, this),
                    sort: jQuery.proxy(this.onColumnSortChange, this)
                };
            }),
            onScrollLeftDidChange: Ember.observer(function() {
                return this.$().scrollLeft(this.get("scrollLeft"));
            }, "scrollLeft"),
            didInsertElement: function() {
                return this._super(), this.get("controller.enableColumnReorder") ? this.$("> div").sortable(this.get("sortableOption")) : void 0;
            },
            onScroll: function(event) {
                return this.set("scrollLeft", event.target.scrollLeft), event.preventDefault();
            },
            onColumnSortStop: function() {
                return this.set("controller._isShowingSortableIndicator", !1);
            },
            onColumnSortChange: function() {
                var left;
                return left = this.$(".ui-state-highlight").offset().left - this.$().closest(".ember-table-tables-container").offset().left, 
                this.set("controller._isShowingSortableIndicator", !0), this.set("controller._sortableIndicatorLeft", left);
            },
            onColumnSortDone: function(event, ui) {
                var column, newIndex, view;
                return newIndex = ui.item.index(), view = Ember.View.views[ui.item.attr("id")], 
                column = view.get("column"), this.get("controller").onColumnSort(column, newIndex), 
                this.set("controller._isShowingSortableIndicator", !1);
            }
        }), /**
* Header Cell
* @class
* @alias Ember.Table.HeaderCell
* @mixes Ember.AddeparMixins.StyleBindingsMixin
*/
        Ember.Table.HeaderCell = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            templateName: "header-cell",
            classNames: [ "ember-table-cell", "ember-table-header-cell" ],
            classNameBindings: [ "column.isSortable:sortable", "column.textAlign" ],
            styleBindings: [ "width", "height" ],
            column: Ember.computed.alias("content"),
            width: Ember.computed.alias("column.columnWidth"),
            height: Ember.computed(function() {
                return this.get("controller._headerHeight");
            }).property("controller._headerHeight"),
            /**
  * jQuery UI resizable option
  * @memberof Ember.Table.HeaderCell
  * @instance
  */
            resizableOption: Ember.computed(function() {
                return {
                    handles: "e",
                    minHeight: 40,
                    minWidth: this.get("column.minWidth") || 100,
                    maxWidth: this.get("column.maxWidth") || 500,
                    grid: this.get("column.snapGrid"),
                    resize: jQuery.proxy(this.onColumnResize, this),
                    stop: jQuery.proxy(this.onColumnResize, this)
                };
            }),
            /**
  * Did insert element callback
  * @memberof Ember.Table.HeaderCell
  * @instance
  */
            didInsertElement: function() {
                this.elementSizeDidChange(), this.get("column.isResizable") && (this.$().resizable(this.get("resizableOption")), 
                this._resizableWidget = this.$().resizable("widget"));
            },
            /**
  * On column resize callback
  * @memberof Ember.Table.HeaderCell
  * @instance
  * @argument event jQuery event
  */
            onColumnResize: function(event, ui) {
                return this.elementSizeDidChange(), this.set("columnWidth", ui.size.width);
            },
            elementSizeDidChange: function() {
                var maxHeight;
                maxHeight = 0, $(".ember-table-header-block .ember-table-content").each(function() {
                    var thisHeight;
                    return thisHeight = $(this).outerHeight(), thisHeight > maxHeight ? maxHeight = thisHeight : void 0;
                }), this.set("controller._contentHeaderHeight", maxHeight);
            }
        }), Ember.Table.ColumnSortableIndicator = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            classNames: "ember-table-column-sortable-indicator",
            classNameBindings: "controller._isShowingSortableIndicator:active",
            styleBindings: [ "left", "height" ],
            left: Ember.computed.alias("controller._sortableIndicatorLeft"),
            height: Ember.computed.alias("controller._height")
        }), /**
* Header Table Container
* @class
* @alias Ember.Table.HeaderTableContainer
* @augments Ember.Table.TableContainer
* @mixes Ember.MouseWheelHandlerMixin
* @mixes Ember.TouchMoveHandlerMixin
*/
        Ember.Table.HeaderTableContainer = Ember.Table.TableContainer.extend({
            templateName: "header-container",
            classNames: [ "ember-table-table-container", "ember-table-fixed-table-container", "ember-table-header-container" ],
            height: Ember.computed.alias("controller._headerHeight"),
            width: Ember.computed.alias("controller._tableContainerWidth")
        }), /**
* Body Table Container
* @class
* @alias Ember.Table.BodyTableContainer
* @mixes Ember.MouseWheelHandlerMixin
* @mixes Ember.TouchMoveHandlerMixin
* @mixes Ember.ScrollHandlerMixin
*/
        Ember.Table.BodyTableContainer = Ember.Table.TableContainer.extend(Ember.MouseWheelHandlerMixin, Ember.TouchMoveHandlerMixin, Ember.ScrollHandlerMixin, {
            templateName: "body-container",
            classNames: [ "ember-table-table-container", "ember-table-body-container", "antiscroll-wrap" ],
            height: Ember.computed.alias("controller._bodyHeight"),
            width: Ember.computed.alias("controller._width"),
            scrollTop: Ember.computed.alias("controller._tableScrollTop"),
            scrollLeft: Ember.computed.alias("controller._tableScrollLeft"),
            scrollElementSelector: ".antiscroll-inner",
            firefoxScrollDistance: 52,
            /**
  * On scroll top did change observer
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  */
            onScrollTopDidChange: Ember.observer(function() {
                return this.$().scrollTop(this.get("scrollTop"));
            }, "scrollTop"),
            mouseEnter: function(event) {
                var $horizontalScroll, $tablesContainer;
                return $tablesContainer = $(event.target).parents(".ember-table-tables-container"), 
                $horizontalScroll = $tablesContainer.find(".antiscroll-scrollbar-horizontal"), $horizontalScroll.addClass("antiscroll-scrollbar-shown");
            },
            mouseLeave: function(event) {
                var $horizontalScroll, $tablesContainer;
                return $tablesContainer = $(event.target).parents(".ember-table-tables-container"), 
                $horizontalScroll = $tablesContainer.find(".antiscroll-scrollbar-horizontal"), $horizontalScroll.removeClass("antiscroll-scrollbar-shown");
            },
            /**
  * On scroll callback
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  * @argument event jQuery event
  */
            onScroll: function(event) {
                return this.set("scrollTop", event.target.scrollTop), event.preventDefault();
            },
            /**
  * On mouse wheel callback callback
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  * @argument event jQuery event
  * @argument delta
  * @argument deltaX {Integer}
  * @argument deltaY {Integer}
  */
            onMouseWheel: function(event, delta, deltaX, deltaY) {
                var scrollLeft;
                if (Math.abs(deltaX) > Math.abs(deltaY)) return scrollLeft = this.$(".ember-table-right-table-block").scrollLeft() + 50 * deltaX, 
                this.set("scrollLeft", scrollLeft), event.preventDefault();
            },
            /**
  * On touch move callback
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  * @argument event jQuery event
  * @argument deltaX {Integer}
  * @argument deltaY {Integer}
  */
            onTouchMove: function(event, deltaX, deltaY) {
                var scrollLeft;
                if (Math.abs(deltaX) > Math.abs(deltaY)) return scrollLeft = this.$(".ember-table-right-table-block").scrollLeft() + deltaX, 
                this.set("scrollLeft", scrollLeft), event.preventDefault();
            }
        }), /**
* Footer Table Container
* @class
* @alias Ember.Table.FooterTableContainer
* @mixes Ember.MouseWheelHandlerMixin
* @mixes Ember.TouchMoveHandlerMixin
*/
        Ember.Table.FooterTableContainer = Ember.Table.TableContainer.extend(Ember.MouseWheelHandlerMixin, Ember.TouchMoveHandlerMixin, {
            templateName: "footer-container",
            classNames: [ "ember-table-table-container", "ember-table-fixed-table-container", "ember-table-footer-container" ],
            styleBindings: "top",
            height: Ember.computed.alias("controller.footerHeight"),
            width: Ember.computed.alias("controller._tableContainerWidth"),
            scrollLeft: Ember.computed.alias("controller._tableScrollLeft"),
            top: Ember.computed(function() {
                var bodyHeight, contentHeight, headerHeight;
                return headerHeight = this.get("controller._headerHeight"), contentHeight = this.get("controller._tableContentHeight") + headerHeight, 
                bodyHeight = this.get("controller._bodyHeight") + headerHeight, bodyHeight > contentHeight ? contentHeight : bodyHeight;
            }).property("controller._bodyHeight", "controller._headerHeight", "controller._tableContentHeight"),
            onMouseWheel: function(event, delta, deltaX) {
                var scrollLeft;
                return scrollLeft = this.$(".ember-table-right-table-block").scrollLeft() + 50 * deltaX, 
                this.set("scrollLeft", scrollLeft), event.preventDefault();
            },
            onTouchMove: function(event, deltaX) {
                var scrollLeft;
                return scrollLeft = this.$(".ember-table-right-table-block").scrollLeft() + deltaX, 
                this.set("scrollLeft", scrollLeft), event.preventDefault();
            },
            mouseEnter: function(event) {
                var $horizontalScroll, $tablesContainer;
                return $tablesContainer = $(event.target).parents(".ember-table-tables-container"), 
                $horizontalScroll = $tablesContainer.find(".antiscroll-scrollbar-horizontal"), $horizontalScroll.addClass("antiscroll-scrollbar-shown");
            },
            mouseLeave: function(event) {
                var $horizontalScroll, $tablesContainer;
                return $tablesContainer = $(event.target).parents(".ember-table-tables-container"), 
                $horizontalScroll = $tablesContainer.find(".antiscroll-scrollbar-horizontal"), $horizontalScroll.removeClass("antiscroll-scrollbar-shown");
            }
        }), /**
* Scroll Container
* @class
* @alias Ember.Table.ScrollContainer
* @mixes Ember.AddeparMixins.StyleBindingsMixin
* @mixes Ember.ScrollHandlerMixin
*/
        Ember.Table.ScrollContainer = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, Ember.ScrollHandlerMixin, {
            templateName: "scroll-container",
            classNames: [ "ember-table-scroll-container" ],
            styleBindings: [ "left", "width", "height" ],
            scrollElementSelector: ".antiscroll-inner",
            width: Ember.computed.alias("controller._scrollContainerWidth"),
            height: 10,
            left: Ember.computed.alias("controller._fixedColumnsWidth"),
            scrollTop: Ember.computed.alias("controller._tableScrollTop"),
            scrollLeft: Ember.computed.alias("controller._tableScrollLeft"),
            /**
  * On scroll callback
  * @memberof Ember.Table.ScrollContainer
  * @instance
  * @argument event jQuery event
  */
            onScroll: function(event) {
                return this.set("scrollLeft", event.target.scrollLeft), event.preventDefault();
            },
            /**
  * On scroll left did change observer
  * @memberof Ember.Table.ScrollContainer
  * @instance
  */
            onScrollLeftDidChange: Ember.observer(function() {
                var selector;
                return selector = this.get("scrollElementSelector"), this.$(selector).scrollLeft(this.get("scrollLeft"));
            }, "scrollLeft", "scrollElementSelector")
        }), /**
* ScrollPanel
* @class
* @alias Ember.Table.ScrollPanel
* @mixes Ember.AddeparMixins.StyleBindingsMixin
*/
        Ember.Table.ScrollPanel = Ember.View.extend(Ember.AddeparMixins.StyleBindingsMixin, {
            classNames: [ "ember-table-scroll-panel" ],
            styleBindings: [ "width", "height" ],
            width: Ember.computed.alias("controller._tableColumnsWidth"),
            height: Ember.computed.alias("controller._tableContentHeight")
        });
    }, {} ],
    11: [ function() {
        /**
* Table Component
* @class
* @alias Ember.Table.EmberTableComponent
*/
        Ember.Table.EmberTableComponent = Ember.Component.extend(Ember.AddeparMixins.StyleBindingsMixin, Ember.AddeparMixins.ResizeHandlerMixin, {
            templateName: "components/ember-table",
            classNames: [ "ember-table-tables-container" ],
            styleBindings: [ "height" ],
            height: Ember.computed.alias("_tablesContainerHeight"),
            columns: null,
            numFixedColumns: 0,
            numFooterRow: 0,
            rowHeight: 30,
            minHeaderHeight: 30,
            footerHeight: 30,
            hasHeader: !0,
            hasFooter: !0,
            forceFillColumns: !1,
            enableColumnReorder: !0,
            tableRowViewClass: "Ember.Table.TableRow",
            actions: {
                addColumn: Ember.K,
                sortByColumn: Ember.K
            },
            onColumnSort: function(column, newIndex) {
                var columns;
                return columns = this.get("tableColumns"), columns.removeObject(column), columns.insertAt(newIndex, column);
            },
            /**
  * Table Body Content - Array of Ember.Table.Row
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  */
            bodyContent: Ember.computed(function() {
                return Ember.Table.RowArrayController.create({
                    target: this,
                    parentController: this,
                    container: this.get("container"),
                    itemController: Ember.Table.Row,
                    content: this.get("content")
                });
            }).property("content"),
            /**
  * Table Footer Content - Array of Ember.Table.Row
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  */
            footerContent: Ember.computed(function(key, value) {
                return value ? value : Ember.A();
            }).property(),
            /**
  * Table Fixed Columns
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @todo Much more doc needed
  */
            fixedColumns: Ember.computed(function() {
                var columns, numFixedColumns;
                return (columns = this.get("columns")) ? (numFixedColumns = this.get("numFixedColumns") || 0, 
                columns = columns.slice(0, numFixedColumns) || [], columns.setEach("controller", this), 
                columns) : Ember.A();
            }).property("columns.@each", "numFixedColumns"),
            /**
  * Table Columns
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @todo Much more doc needed
  */
            tableColumns: Ember.computed(function() {
                var columns, numFixedColumns;
                return (columns = this.get("columns")) ? (numFixedColumns = this.get("numFixedColumns") || 0, 
                columns = columns.slice(numFixedColumns, columns.get("length")) || [], columns.setEach("controller", this), 
                columns) : Ember.A();
            }).property("columns.@each", "numFixedColumns"),
            didInsertElement: function() {
                return this._super(), this.set("_tableScrollTop", 0), this.elementSizeDidChange();
            },
            /**
  * On resize end callback
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  */
            onResizeEnd: function() {
                return Ember.run(this, this.elementSizeDidChange);
            },
            /**
  * Element size did change callback
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  */
            elementSizeDidChange: function() {
                return "inDOM" === this.get("state") ? (this.set("_width", this.$().parent().outerWidth()), 
                this.set("_height", this.$().parent().outerHeight()), Ember.run.next(this, this.updateLayout)) : void 0;
            },
            updateLayout: function() {
                return "inDOM" === this.get("state") ? (this.$(".antiscroll-wrap").antiscroll(), 
                this.get("forceFillColumns") ? this.doForceFillColumns() : void 0) : void 0;
            },
            doForceFillColumns: function() {
                var additionWidthPerColumn, availableContentWidth, defaultContentWidth, fixedColumnsWidth, numColumnToDistributeWidth, remainingWidth, tableColumns, totalWidth;
                return totalWidth = this.get("_width"), fixedColumnsWidth = this.get("_fixedColumnsWidth"), 
                tableColumns = this.get("tableColumns"), defaultContentWidth = this._getTotalWidth(tableColumns, "defaultColumnWidth"), 
                availableContentWidth = totalWidth - fixedColumnsWidth, availableContentWidth > defaultContentWidth ? (remainingWidth = availableContentWidth - defaultContentWidth, 
                numColumnToDistributeWidth = tableColumns.filterProperty("canAutoResize").length, 
                additionWidthPerColumn = Math.floor(remainingWidth / numColumnToDistributeWidth), 
                tableColumns.forEach(function(column) {
                    var columnWidth;
                    return column.get("canAutoResize") ? (columnWidth = column.get("defaultColumnWidth") + additionWidthPerColumn, 
                    column.set("columnWidth", columnWidth)) : void 0;
                })) : void 0;
            },
            onBodyContentLengthDidChange: Ember.observer(function() {
                return Ember.run.next(this, function() {
                    return Ember.run.once(this, this.updateLayout);
                });
            }, "bodyContent.length"),
            _tableScrollTop: 0,
            _tableScrollLeft: 0,
            _width: null,
            _height: null,
            _contentHeaderHeight: null,
            _hasVerticalScrollbar: Ember.computed(function() {
                var contentHeight, height;
                return height = this.get("_height"), contentHeight = this.get("_tableContentHeight") + this.get("_headerHeight") + this.get("_footerHeight"), 
                contentHeight > height ? !0 : !1;
            }).property("_height", "_tableContentHeight", "_headerHeight", "_footerHeight"),
            _hasHorizontalScrollbar: Ember.computed(function() {
                var contentWidth, tableWidth;
                return contentWidth = this.get("_tableColumnsWidth"), tableWidth = this.get("_width") - this.get("_fixedColumnsWidth"), 
                contentWidth > tableWidth ? !0 : !1;
            }).property("_tableColumnsWidth", "_width", "_fixedColumnsWidth"),
            _tablesContainerHeight: Ember.computed(function() {
                var contentHeight, height;
                return height = this.get("_height"), contentHeight = this.get("_tableContentHeight") + this.get("_headerHeight") + this.get("_footerHeight"), 
                height > contentHeight ? contentHeight : height;
            }).property("_height", "_tableContentHeight", "_headerHeight", "_footerHeight"),
            /**
  * Actual width of the fixed columns (frozen columns)
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _fixedColumnsWidth: Ember.computed(function() {
                return this._getTotalWidth(this.get("fixedColumns"));
            }).property("fixedColumns.@each.columnWidth"),
            /**
  * Actual width of the table columns (non-frozen columns)
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _tableColumnsWidth: Ember.computed(function() {
                var availableWidth, contentWidth;
                return contentWidth = this._getTotalWidth(this.get("tableColumns")) + 3, availableWidth = this.get("_width") - this.get("_fixedColumnsWidth"), 
                contentWidth > availableWidth ? contentWidth : availableWidth;
            }).property("tableColumns.@each.columnWidth", "_width", "_fixedColumnsWidth"),
            /**
  * Computed Row Width
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _rowWidth: Ember.computed(function() {
                var columnsWidth, nonFixedTableWidth;
                return columnsWidth = this.get("_tableColumnsWidth"), nonFixedTableWidth = this.get("_tableContainerWidth") - this.get("_fixedColumnsWidth"), 
                nonFixedTableWidth > columnsWidth ? nonFixedTableWidth : columnsWidth;
            }).property("_fixedColumnsWidth", "_tableColumnsWidth", "_tableContainerWidth"),
            _headerHeight: Ember.computed(function() {
                var contentHeaderHeight, minHeight;
                return minHeight = this.get("minHeaderHeight"), contentHeaderHeight = this.get("_contentHeaderHeight"), 
                minHeight > contentHeaderHeight ? minHeight : contentHeaderHeight;
            }).property("_contentHeaderHeight", "minHeaderHeight"),
            _footerHeight: Ember.computed(function() {
                return this.get("hasFooter") ? this.get("footerHeight") : 0;
            }).property("footerHeight", "hasFooter"),
            /**
  * Computed Body Height
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _bodyHeight: Ember.computed(function() {
                var bodyHeight;
                return bodyHeight = this.get("_tablesContainerHeight"), this.get("hasHeader") && (bodyHeight -= this.get("_headerHeight")), 
                this.get("hasFooter") && (bodyHeight -= this.get("footerHeight")), bodyHeight;
            }).property("_tablesContainerHeight", "_hasHorizontalScrollbar", "_headerHeight", "footerHeight", "hasHeader", "hasFooter"),
            /**
  * Computed Table Block Width
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _tableBlockWidth: Ember.computed(function() {
                return this.get("_width") - this.get("_fixedColumnsWidth");
            }).property("_width", "_fixedColumnsWidth"),
            _fixedBlockWidthBinding: "_fixedColumnsWidth",
            /**
  * Computed Table Content Height
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _tableContentHeight: Ember.computed(function() {
                return this.get("rowHeight") * this.get("bodyContent.length");
            }).property("rowHeight", "bodyContent.length"),
            /**
  * Table Container Width
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _tableContainerWidth: Ember.computed(function() {
                return this.get("_width");
            }).property("_width"),
            /**
  * Computed Scroll Container Width
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _scrollContainerWidth: Ember.computed(function() {
                return this.get("_width") - this.get("_fixedColumnsWidth");
            }).property("_width", "_fixedColumnsWidth"),
            /**
  * Computed number of items showing
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  */
            _numItemsShowing: Ember.computed(function() {
                return Math.floor(this.get("_bodyHeight") / this.get("rowHeight"));
            }).property("_bodyHeight", "rowHeight"),
            /**
  * Computed Start Index
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @raw
  */
            _startIndex: Ember.computed(function() {
                var index, numContent, numViews, rowHeight, scrollTop;
                return numContent = this.get("bodyContent.length"), numViews = this.get("_numItemsShowing"), 
                rowHeight = this.get("rowHeight"), scrollTop = this.get("_tableScrollTop"), index = Math.floor(scrollTop / rowHeight), 
                index + numViews >= numContent && (index = numContent - numViews), 0 > index ? 0 : index;
            }).property("bodyContent.length", "_numItemsShowing", "rowHeight", "_tableScrollTop"),
            /**
  * Get Total Width
  * @memberof Ember.Table.EmberTableComponent
  * @instance
  * @private
  * @argument columns Columns to calculate width for
  */
            _getTotalWidth: function(columns, columnWidthPath) {
                var widths;
                return null == columnWidthPath && (columnWidthPath = "columnWidth"), columns ? (widths = columns.getEach(columnWidthPath) || [], 
                widths.reduce(function(total, w) {
                    return total + w;
                }, 0)) : 0;
            }
        }), Ember.Handlebars.helper("addepar-table", Ember.Table.EmberTableComponent);
    }, {} ]
}, {}, [ 1 ]);