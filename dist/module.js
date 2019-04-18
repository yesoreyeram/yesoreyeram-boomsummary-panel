System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./BoomSummaryGroup", "./DataHandler", "./Config"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, sdk_1, kbn_1, BoomSummaryGroup_1, DataHandler_1, Config_1, BoomSummaryCtl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (BoomSummaryGroup_1_1) {
                BoomSummaryGroup_1 = BoomSummaryGroup_1_1;
            },
            function (DataHandler_1_1) {
                DataHandler_1 = DataHandler_1_1;
            },
            function (Config_1_1) {
                Config_1 = Config_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss(Config_1.config.cssThemes);
            BoomSummaryCtl = (function (_super) {
                __extends(BoomSummaryCtl, _super);
                function BoomSummaryCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.activeStatIndex = 0;
                    _this.masterdata = [];
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.statTypes = Config_1.config.statTypes;
                    _this.compareOperators = Config_1.config.compareOperators;
                    _this.decimalValues = Config_1.config.decimalValues;
                    _this.format_as = Config_1.config.format_as;
                    _this.templateTypes = Config_1.config.templateTypes;
                    _this.ctrl_width = Config_1.config.ctrl_width;
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats_groups = _this.panel.stats_groups || [];
                    _this.updatePrototypes();
                    _this.events.on(Config_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    _this.events.on(Config_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats_groups.map(function (stats_group) {
                        Object.setPrototypeOf(stats_group, BoomSummaryGroup_1.BoomSummaryGroup.prototype);
                        stats_group.stats.map(function (stat) {
                            Object.setPrototypeOf(stat, BoomSummaryGroup_1.BoomStat.prototype);
                        });
                        return stats_group;
                    });
                };
                BoomSummaryCtl.prototype.onInitEditMode = function () {
                    var _this = this;
                    lodash_1.default.each(Config_1.config.editorTabs, function (editorTab) {
                        _this.addEditorTab(editorTab.title, editorTab.templatePath, editorTab.position);
                    });
                };
                BoomSummaryCtl.prototype.onDataReceived = function (data) {
                    var _this = this;
                    this.masterdata = DataHandler_1.buildMasterData(data);
                    this.colnames = [];
                    lodash_1.default.each(this.masterdata, function (group) {
                        lodash_1.default.each(group, function (item) {
                            _this.colnames.push(item.colname);
                        });
                    });
                    this.colnames = lodash_1.default.uniq(this.colnames);
                    this.render();
                };
                BoomSummaryCtl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                };
                BoomSummaryCtl.prototype.addSummaryGroup = function (statgroupType) {
                    this.panel.stats_groups = this.panel.stats_groups || [];
                    var templateType = "auto";
                    if (statgroupType && statgroupType.toUpperCase() === "JUMBO") {
                        templateType = "jumbo";
                    }
                    else if (statgroupType && statgroupType.toUpperCase() === "JUMBO_WITHOUT_TITLE") {
                        templateType = "jumbo_without_title";
                    }
                    var stats = [];
                    if (this.masterdata && this.masterdata.length > 0) {
                        if (this.masterdata[0].length > this.panel.stats_groups.length && this.masterdata[0][this.panel.stats_groups.length].colname) {
                            stats.push(new BoomSummaryGroup_1.BoomStat({
                                field: this.masterdata[0][this.panel.stats_groups.length].colname,
                                title: this.masterdata[0][this.panel.stats_groups.length].colname
                            }));
                        }
                    }
                    this.panel.stats_groups.push(new BoomSummaryGroup_1.BoomSummaryGroup({
                        bgColor: "green",
                        stats: stats,
                        templateType: templateType || "auto",
                        textColor: "white",
                        title: "Summary " + (this.panel.stats_groups.length + 1)
                    }));
                    this.activeStatIndex = this.panel.stats_groups.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.removeSummaryGroup = function (index) {
                    this.panel.stats_groups.splice(index, 1);
                    this.activeStatIndex = this.panel.stats_groups && this.panel.stats_groups.length > 0 ? this.panel.stats_groups.length - 1 : -1;
                    this.render();
                };
                BoomSummaryCtl.prototype.moveSummaryGroup = function (direction, index) {
                    var tempElement = this.panel.stats_groups[Number(index)];
                    if (direction === "UP") {
                        this.panel.stats_groups[Number(index)] = this.panel.stats_groups[Number(index) - 1];
                        this.panel.stats_groups[Number(index) - 1] = tempElement;
                        this.activeStatIndex = Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.stats_groups[Number(index)] = this.panel.stats_groups[Number(index) + 1];
                        this.panel.stats_groups[Number(index) + 1] = tempElement;
                        this.activeStatIndex = Number(index) + 1;
                    }
                    this.render();
                };
                BoomSummaryCtl.prototype.removeAllSummaryGroups = function () {
                    this.panel.stats_groups = [];
                    this.render();
                };
                BoomSummaryCtl.prototype.limitText = function (text, maxlength) {
                    if (text.split("").length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + "...";
                    }
                    return text;
                };
                BoomSummaryCtl.templateUrl = Config_1.config.default_templateURL;
                return BoomSummaryCtl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", BoomSummaryCtl);
            BoomSummaryCtl.prototype.render = function () {
                var _this = this;
                var output = "";
                output += "<style>" + (this.ctrl.panel.custom_css || "") + "</style>";
                output += "<div class=\"container-fluid\"><div class=\"row\">";
                if (this.ctrl.panel.enable_repeater) {
                    var cols = lodash_1.default.uniq(lodash_1.default.flatMap(this.masterdata).filter(function (t) { return t.colname === _this.ctrl.panel.repeater_column; }).map(function (t) { return t.value; }));
                    lodash_1.default.each(cols, function (col) {
                        output += "<div class=\"col-md-" + lodash_1.default.min([+(_this.ctrl.panel.repeater_width), 12]) + "\" style=\"margin-bottom:" + (_this.ctrl.panel.repeater_margin_bottom || "20") + "px;\">";
                        var mycoldata = _this.masterdata.filter(function (t) { return t.filter(function (t1) { return t1.value === col && t1.colname === _this.ctrl.panel.repeater_column; }).length === 1; });
                        lodash_1.default.each(_this.ctrl.panel.stats_groups, function (stats_group) {
                            output += stats_group.getoutput(mycoldata);
                        });
                        output += "</div>";
                    });
                }
                else {
                    output += "<div class=\"col-md-12\">";
                    lodash_1.default.each(this.ctrl.panel.stats_groups, function (stats_group) {
                        output += stats_group.getoutput(_this.masterdata);
                    });
                    output += "</div>";
                }
                output += "</div></div>";
                this.elem.find("#boomsummary-panel").html(output);
                if (this.ctrl && this.ctrl.elem[0]) {
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var maxheightofpanel = this.ctrl.elem[0].clientHeight - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQWV6Qyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDSSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWTNCO29CQXZCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBRXJCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGVBQVMsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO29CQUM3QixtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGdCQUFVLEdBQUcsZUFBTSxDQUFDLFVBQVUsQ0FBQztvQkFHbEMsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDM0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO29CQUN4RCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ1YsZUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQ2xDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUNqQyxDQUFDO29CQUNGLEtBQUks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LDJCQUF5QixDQUFDO29CQUNwQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBQSxXQUFXO3dCQUM1QyxNQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sSUFBSSxRQUFRLENBQUM7aUJBQ3RCO2dCQUNELE1BQU0sSUFBSSxjQUFjLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBQ3JELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDM0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRDtZQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IE1ldHJpY3NQYW5lbEN0cmwsIGxvYWRQbHVnaW5Dc3MgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xyXG5pbXBvcnQgeyBCb29tU3VtbWFyeUdyb3VwLCBCb29tU3RhdCB9IGZyb20gXCIuL0Jvb21TdW1tYXJ5R3JvdXBcIjtcclxuaW1wb3J0IHsgYnVpbGRNYXN0ZXJEYXRhIH0gZnJvbSBcIi4vRGF0YUhhbmRsZXJcIjtcclxuaW1wb3J0IHsgSUJvb21TdW1tYXJ5Q3RsIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKGNvbmZpZy5jc3NUaGVtZXMpO1xyXG5cclxuY2xhc3MgQm9vbVN1bW1hcnlDdGwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIGltcGxlbWVudHMgSUJvb21TdW1tYXJ5Q3RsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBjb25maWcuZGVmYXVsdF90ZW1wbGF0ZVVSTDtcclxuICAgIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgICBwdWJsaWMgZWxlbTogYW55O1xyXG4gICAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgICBwdWJsaWMgYWN0aXZlU3RhdEluZGV4ID0gMDtcclxuICAgIHB1YmxpYyBtYXN0ZXJkYXRhOiBhbnkgPSBbXTtcclxuICAgIHB1YmxpYyBjb2xuYW1lcztcclxuICAgIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gICAgcHVibGljIHN0YXRUeXBlcyA9IGNvbmZpZy5zdGF0VHlwZXM7XHJcbiAgICBwdWJsaWMgY29tcGFyZU9wZXJhdG9ycyA9IGNvbmZpZy5jb21wYXJlT3BlcmF0b3JzO1xyXG4gICAgcHVibGljIGRlY2ltYWxWYWx1ZXMgPSBjb25maWcuZGVjaW1hbFZhbHVlcztcclxuICAgIHB1YmxpYyBmb3JtYXRfYXMgPSBjb25maWcuZm9ybWF0X2FzO1xyXG4gICAgcHVibGljIHRlbXBsYXRlVHlwZXMgPSBjb25maWcudGVtcGxhdGVUeXBlcztcclxuICAgIHB1YmxpYyBjdHJsX3dpZHRoID0gY29uZmlnLmN0cmxfd2lkdGg7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgICAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFxyXG4gICAgICAgICAgICBjb25maWcuZ3JhZmFuYV9ldmVudHMuaW5pdEVkaXRNb2RlLFxyXG4gICAgICAgICAgICB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFxyXG4gICAgICAgICAgICBjb25maWcuZ3JhZmFuYV9ldmVudHMuZGF0YVJlY2VpdmVkLFxyXG4gICAgICAgICAgICB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLm1hcChzdGF0c19ncm91cCA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdGF0c19ncm91cCwgQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBzdGF0c19ncm91cC5zdGF0cy5tYXAoc3RhdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RhdCwgQm9vbVN0YXQucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0c19ncm91cDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNvbmZpZy5lZGl0b3JUYWJzLCBlZGl0b3JUYWIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRvclRhYihcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi50aXRsZSxcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi50ZW1wbGF0ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3JUYWIucG9zaXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXN0ZXJkYXRhID0gYnVpbGRNYXN0ZXJEYXRhKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuY29sbmFtZXMgPSBbXTtcclxuICAgICAgICBfLmVhY2godGhpcy5tYXN0ZXJkYXRhLCBncm91cCA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChncm91cCwgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG5hbWVzLnB1c2goaXRlbS5jb2xuYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb2xuYW1lcyA9IF8udW5pcSh0aGlzLmNvbG5hbWVzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbmsoc2NvcGU6IGFueSwgZWxlbTogYW55LCBhdHRyczogYW55LCBjdHJsOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICAgICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRTdW1tYXJ5R3JvdXAoc3RhdGdyb3VwVHlwZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgfHwgW107XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlVHlwZSA9IFwiYXV0b1wiO1xyXG4gICAgICAgIGlmIChzdGF0Z3JvdXBUeXBlICYmIHN0YXRncm91cFR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJKVU1CT1wiKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZSA9IFwianVtYm9cIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRncm91cFR5cGUgJiYgc3RhdGdyb3VwVHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIkpVTUJPX1dJVEhPVVRfVElUTEVcIikge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVR5cGUgPSBcImp1bWJvX3dpdGhvdXRfdGl0bGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXRzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLm1hc3RlcmRhdGEgJiYgdGhpcy5tYXN0ZXJkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFzdGVyZGF0YVswXS5sZW5ndGggPiB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggJiYgdGhpcy5tYXN0ZXJkYXRhWzBdW3RoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aF0uY29sbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHMucHVzaChuZXcgQm9vbVN0YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoXS5jb2xuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoXS5jb2xuYW1lXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMucHVzaChuZXcgQm9vbVN1bW1hcnlHcm91cCh7XHJcbiAgICAgICAgICAgIGJnQ29sb3I6IFwiZ3JlZW5cIixcclxuICAgICAgICAgICAgc3RhdHMsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZTogdGVtcGxhdGVUeXBlIHx8IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwid2hpdGVcIixcclxuICAgICAgICAgICAgdGl0bGU6IGBTdW1tYXJ5ICR7dGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoICsgMX1gXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVN1bW1hcnlHcm91cChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzICYmIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCA+IDAgPyB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggLSAxIDogLTE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtb3ZlU3VtbWFyeUdyb3VwKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KV07XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpIC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSBOdW1iZXIoaW5kZXgpIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IE51bWJlcihpbmRleCkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZUFsbFN1bW1hcnlHcm91cHMoKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBvdXRwdXQgPSBgYDtcclxuICAgIG91dHB1dCArPSBgPHN0eWxlPiR7dGhpcy5jdHJsLnBhbmVsLmN1c3RvbV9jc3MgfHwgXCJcIn08L3N0eWxlPmA7XHJcbiAgICBvdXRwdXQgKz0gYDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj48ZGl2IGNsYXNzPVwicm93XCI+YDtcclxuICAgIGlmICh0aGlzLmN0cmwucGFuZWwuZW5hYmxlX3JlcGVhdGVyKSB7XHJcbiAgICAgICAgbGV0IGNvbHMgPSBfLnVuaXEoXy5mbGF0TWFwKHRoaXMubWFzdGVyZGF0YSkuZmlsdGVyKHQgPT4gdC5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5tYXAodCA9PiB0LnZhbHVlKSk7XHJcbiAgICAgICAgXy5lYWNoKGNvbHMsIGNvbCA9PiB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbC1tZC0ke18ubWluKFsrKHRoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl93aWR0aCksIDEyXSl9XCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiR7dGhpcy5jdHJsLnBhbmVsLnJlcGVhdGVyX21hcmdpbl9ib3R0b20gfHwgXCIyMFwifXB4O1wiPmA7XHJcbiAgICAgICAgICAgIGxldCBteWNvbGRhdGEgPSB0aGlzLm1hc3RlcmRhdGEuZmlsdGVyKHQgPT4gdC5maWx0ZXIodDEgPT4gdDEudmFsdWUgPT09IGNvbCAmJiB0MS5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5sZW5ndGggPT09IDEpO1xyXG4gICAgICAgICAgICBfLmVhY2godGhpcy5jdHJsLnBhbmVsLnN0YXRzX2dyb3Vwcywgc3RhdHNfZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHN0YXRzX2dyb3VwLmdldG91dHB1dChteWNvbGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPmA7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuY3RybC5wYW5lbC5zdGF0c19ncm91cHMsIHN0YXRzX2dyb3VwID0+IHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IHN0YXRzX2dyb3VwLmdldG91dHB1dCh0aGlzLm1hc3RlcmRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dHB1dCArPSBgPC9kaXY+YDtcclxuICAgIH1cclxuICAgIG91dHB1dCArPSBgPC9kaXY+PC9kaXY+YDtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb21zdW1tYXJ5LXBhbmVsXCIpLmh0bWwob3V0cHV0KTtcclxuICAgIGlmICh0aGlzLmN0cmwgJiYgdGhpcy5jdHJsLmVsZW1bMF0pIHtcclxuICAgICAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5jdHJsLmVsZW1bMF0uY2xpZW50SGVpZ2h0IC0gMzE7XHJcbiAgICAgICAgcm9vdEVsZW0uY3NzKHsgJ21heC1oZWlnaHQnOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgQm9vbVN1bW1hcnlDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==