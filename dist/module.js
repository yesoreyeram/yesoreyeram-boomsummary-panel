System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./app/BoomStatsGroup", "./app/DataHandler", "./config"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, BoomStatsGroup_1, DataHandler_1, config_1, BoomSummaryCtl;
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
            function (BoomStatsGroup_1_1) {
                BoomStatsGroup_1 = BoomStatsGroup_1_1;
            },
            function (DataHandler_1_1) {
                DataHandler_1 = DataHandler_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss(config_1.config.cssThemes);
            BoomSummaryCtl = (function (_super) {
                __extends(BoomSummaryCtl, _super);
                function BoomSummaryCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.activeStatIndex = 0;
                    _this.masterdata = [];
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.statTypes = config_1.config.statTypes;
                    _this.compareOperators = config_1.config.compareOperators;
                    _this.decimalValues = config_1.config.decimalValues;
                    _this.format_as = config_1.config.format_as;
                    _this.templateTypes = config_1.config.templateTypes;
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats_groups = _this.panel.stats_groups || [];
                    _this.updatePrototypes();
                    _this.events.on(config_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    _this.events.on(config_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats_groups.map(function (stats_group) {
                        Object.setPrototypeOf(stats_group, BoomStatsGroup_1.BoomStatsGroup.prototype);
                        stats_group.stats.map(function (stat) {
                            Object.setPrototypeOf(stat, BoomStatsGroup_1.BoomStat.prototype);
                        });
                        return stats_group;
                    });
                };
                BoomSummaryCtl.prototype.onInitEditMode = function () {
                    var _this = this;
                    lodash_1.default.each(config_1.config.editorTabs, function (editorTab) {
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
                BoomSummaryCtl.prototype.addStatsGroup = function (statgroupType) {
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
                            if (this.ctrl.panel.enable_repeater && this.panel.stats_groups.length == 0 && ["jumbo", "jumbo_without_title"].indexOf(templateType) < 0) {
                                templateType = "auto";
                                stats.push(new BoomStatsGroup_1.BoomStat({
                                    field: this.ctrl.panel.repeater_column,
                                    title: this.ctrl.panel.repeater_column,
                                }));
                            }
                            stats.push(new BoomStatsGroup_1.BoomStat({
                                field: this.masterdata[0][this.panel.stats_groups.length].colname,
                                title: this.masterdata[0][this.panel.stats_groups.length].colname
                            }));
                        }
                    }
                    this.panel.stats_groups.push(new BoomStatsGroup_1.BoomStatsGroup({
                        bgColor: "green",
                        templateType: templateType || "default",
                        textColor: "white",
                        stats: stats
                    }));
                    this.activeStatIndex = this.panel.stats_groups.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.removeStatsGroup = function (index) {
                    this.panel.stats_groups.splice(index, 1);
                    this.activeStatIndex = this.panel.stats_groups && this.panel.stats_groups.length > 0 ? this.panel.stats_groups.length - 1 : -1;
                    this.render();
                };
                BoomSummaryCtl.prototype.moveStatsGroup = function (direction, index) {
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
                BoomSummaryCtl.prototype.removeAllStatsGroups = function () {
                    this.panel.stats_groups = [];
                    this.render();
                };
                BoomSummaryCtl.prototype.limitText = function (text, maxlength) {
                    if (text.split("").length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + "...";
                    }
                    return text;
                };
                BoomSummaryCtl.templateUrl = config_1.config.default_templateURL;
                return BoomSummaryCtl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", BoomSummaryCtl);
            BoomSummaryCtl.prototype.render = function () {
                var _this = this;
                var output = "<div class=\"container-fluid\"><div class=\"row\">";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQWN6Qyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDSSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWTNCO29CQXRCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBRXJCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGVBQVMsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO29CQUM3QixtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBR3hDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztvQkFDeEQsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNWLGVBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FDakMsQ0FBQztvQkFDRixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDVixlQUFNLENBQUMsY0FB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QUFXOzRCQUM1QyxNQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsTUFBTSxJQUFJLFFBQVEsQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsTUFBTSxJQUFJLDJCQUF5QixDQUFDO29CQUNwQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBQSxXQUFXO3dCQUM1QyxNQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sSUFBSSxRQUFRLENBQUM7aUJBQ3RCO2dCQUNELE1BQU0sSUFBSSxjQUFjLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBQ3JELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDM0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRDtZQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IE1ldHJpY3NQYW5lbEN0cmwsIGxvYWRQbHVnaW5Dc3MgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xyXG5pbXBvcnQgeyBCb29tU3RhdHNHcm91cCwgQm9vbVN0YXQgfSBmcm9tIFwiLi9hcHAvQm9vbVN0YXRzR3JvdXBcIjtcclxuaW1wb3J0IHsgYnVpbGRNYXN0ZXJEYXRhIH0gZnJvbSBcIi4vYXBwL0RhdGFIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElCb29tU3VtbWFyeUN0bCB9IGZyb20gXCIuL2RlZmluaXRpb25zL3R5cGVzXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxubG9hZFBsdWdpbkNzcyhjb25maWcuY3NzVGhlbWVzKTtcclxuXHJcbmNsYXNzIEJvb21TdW1tYXJ5Q3RsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCBpbXBsZW1lbnRzIElCb29tU3VtbWFyeUN0bCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gY29uZmlnLmRlZmF1bHRfdGVtcGxhdGVVUkw7XHJcbiAgICBwdWJsaWMgY3RybDogYW55O1xyXG4gICAgcHVibGljIGVsZW06IGFueTtcclxuICAgIHB1YmxpYyBhdHRyczogYW55O1xyXG4gICAgcHVibGljIGFjdGl2ZVN0YXRJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgbWFzdGVyZGF0YTogYW55ID0gW107XHJcbiAgICBwdWJsaWMgY29sbmFtZXM7XHJcbiAgICBwdWJsaWMgdW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICAgIHB1YmxpYyBzdGF0VHlwZXMgPSBjb25maWcuc3RhdFR5cGVzO1xyXG4gICAgcHVibGljIGNvbXBhcmVPcGVyYXRvcnMgPSBjb25maWcuY29tcGFyZU9wZXJhdG9ycztcclxuICAgIHB1YmxpYyBkZWNpbWFsVmFsdWVzID0gY29uZmlnLmRlY2ltYWxWYWx1ZXM7XHJcbiAgICBwdWJsaWMgZm9ybWF0X2FzID0gY29uZmlnLmZvcm1hdF9hcztcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZVR5cGVzID0gY29uZmlnLnRlbXBsYXRlVHlwZXM7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgICAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFxyXG4gICAgICAgICAgICBjb25maWcuZ3JhZmFuYV9ldmVudHMuaW5pdEVkaXRNb2RlLFxyXG4gICAgICAgICAgICB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFxyXG4gICAgICAgICAgICBjb25maWcuZ3JhZmFuYV9ldmVudHMuZGF0YVJlY2VpdmVkLFxyXG4gICAgICAgICAgICB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLm1hcChzdGF0c19ncm91cCA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdGF0c19ncm91cCwgQm9vbVN0YXRzR3JvdXAucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgc3RhdHNfZ3JvdXAuc3RhdHMubWFwKHN0YXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0YXQsIEJvb21TdGF0LnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0c19ncm91cDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNvbmZpZy5lZGl0b3JUYWJzLCBlZGl0b3JUYWIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRvclRhYihcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi50aXRsZSxcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi50ZW1wbGF0ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3JUYWIucG9zaXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXN0ZXJkYXRhID0gYnVpbGRNYXN0ZXJEYXRhKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuY29sbmFtZXMgPSBbXTtcclxuICAgICAgICBfLmVhY2godGhpcy5tYXN0ZXJkYXRhLCBncm91cCA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChncm91cCwgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG5hbWVzLnB1c2goaXRlbS5jb2xuYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb2xuYW1lcyA9IF8udW5pcSh0aGlzLmNvbG5hbWVzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbmsoc2NvcGU6IGFueSwgZWxlbTogYW55LCBhdHRyczogYW55LCBjdHJsOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICAgICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRTdGF0c0dyb3VwKHN0YXRncm91cFR5cGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzIHx8IFtdO1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZVR5cGUgPSBcImF1dG9cIjtcclxuICAgICAgICBpZiAoc3RhdGdyb3VwVHlwZSAmJiBzdGF0Z3JvdXBUeXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiSlVNQk9cIikge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVR5cGUgPSBcImp1bWJvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0YXRncm91cFR5cGUgJiYgc3RhdGdyb3VwVHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIkpVTUJPX1dJVEhPVVRfVElUTEVcIikge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVR5cGUgPSBcImp1bWJvX3dpdGhvdXRfdGl0bGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXRzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLm1hc3RlcmRhdGEgJiYgdGhpcy5tYXN0ZXJkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFzdGVyZGF0YVswXS5sZW5ndGggPiB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggJiYgdGhpcy5tYXN0ZXJkYXRhWzBdW3RoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aF0uY29sbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3RybC5wYW5lbC5lbmFibGVfcmVwZWF0ZXIgJiYgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoID09IDAgJiYgW1wianVtYm9cIiwgXCJqdW1ib193aXRob3V0X3RpdGxlXCJdLmluZGV4T2YodGVtcGxhdGVUeXBlKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVR5cGUgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0cy5wdXNoKG5ldyBCb29tU3RhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5jdHJsLnBhbmVsLnJlcGVhdGVyX2NvbHVtbixcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5wdXNoKG5ldyBCb29tU3RhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGhdLmNvbG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGhdLmNvbG5hbWVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5wdXNoKG5ldyBCb29tU3RhdHNHcm91cCh7XHJcbiAgICAgICAgICAgIGJnQ29sb3I6IFwiZ3JlZW5cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVUeXBlOiB0ZW1wbGF0ZVR5cGUgfHwgXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICBzdGF0c1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmVTdGF0c0dyb3VwKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgJiYgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoID4gMCA/IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCAtIDEgOiAtMTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG1vdmVTdGF0c0dyb3VwKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KV07XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpIC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSBOdW1iZXIoaW5kZXgpIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IE51bWJlcihpbmRleCkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZUFsbFN0YXRzR3JvdXBzKCkge1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzID0gW107XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsaW1pdFRleHQodGV4dDogc3RyaW5nLCBtYXhsZW5ndGg6IE51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRleHQuc3BsaXQoXCJcIikubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBOdW1iZXIobWF4bGVuZ3RoKSAtIDMpICsgXCIuLi5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJvb21TdW1tYXJ5Q3RsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gYDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj48ZGl2IGNsYXNzPVwicm93XCI+YDtcclxuICAgIGlmICh0aGlzLmN0cmwucGFuZWwuZW5hYmxlX3JlcGVhdGVyKSB7XHJcbiAgICAgICAgbGV0IGNvbHMgPSBfLnVuaXEoXy5mbGF0TWFwKHRoaXMubWFzdGVyZGF0YSkuZmlsdGVyKHQgPT4gdC5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5tYXAodCA9PiB0LnZhbHVlKSk7XHJcbiAgICAgICAgXy5lYWNoKGNvbHMsIGNvbCA9PiB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbC1tZC0ke18ubWluKFsrKHRoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl93aWR0aCksIDEyXSl9XCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiR7dGhpcy5jdHJsLnBhbmVsLnJlcGVhdGVyX21hcmdpbl9ib3R0b20gfHwgXCIyMFwifXB4O1wiPmA7XHJcbiAgICAgICAgICAgIGxldCBteWNvbGRhdGEgPSB0aGlzLm1hc3RlcmRhdGEuZmlsdGVyKHQgPT4gdC5maWx0ZXIodDEgPT4gdDEudmFsdWUgPT09IGNvbCAmJiB0MS5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5sZW5ndGggPT09IDEpO1xyXG4gICAgICAgICAgICBfLmVhY2godGhpcy5jdHJsLnBhbmVsLnN0YXRzX2dyb3Vwcywgc3RhdHNfZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHN0YXRzX2dyb3VwLmdldG91dHB1dChteWNvbGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPmA7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuY3RybC5wYW5lbC5zdGF0c19ncm91cHMsIHN0YXRzX2dyb3VwID0+IHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IHN0YXRzX2dyb3VwLmdldG91dHB1dCh0aGlzLm1hc3RlcmRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dHB1dCArPSBgPC9kaXY+YDtcclxuICAgIH1cclxuICAgIG91dHB1dCArPSBgPC9kaXY+PC9kaXY+YDtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb21zdW1tYXJ5LXBhbmVsXCIpLmh0bWwob3V0cHV0KTtcclxuICAgIGlmICh0aGlzLmN0cmwgJiYgdGhpcy5jdHJsLmVsZW1bMF0pIHtcclxuICAgICAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5jdHJsLmVsZW1bMF0uY2xpZW50SGVpZ2h0IC0gMzE7XHJcbiAgICAgICAgcm9vdEVsZW0uY3NzKHsgJ21heC1oZWlnaHQnOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgQm9vbVN1bW1hcnlDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==