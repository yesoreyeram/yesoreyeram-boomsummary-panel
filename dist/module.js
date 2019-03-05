System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./config", "./app/Stat", "./utils/AppUtils"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, config_1, Stat_1, AppUtils_1, BoomSummaryCtl;
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
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (Stat_1_1) {
                Stat_1 = Stat_1_1;
            },
            function (AppUtils_1_1) {
                AppUtils_1 = AppUtils_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + config_1.config.plugin_id + "/css/default.dark.css",
                light: "plugins/" + config_1.config.plugin_id + "/css/default.light.css"
            });
            BoomSummaryCtl = (function (_super) {
                __extends(BoomSummaryCtl, _super);
                function BoomSummaryCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.statTypes = config_1.config.statTypes;
                    _this.compareOperators = config_1.config.compareOperators;
                    _this.decimalValues = config_1.config.decimalValues;
                    _this.activeStatIndex = 0;
                    _this.masterdata = [];
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats = _this.panel.stats || [];
                    _this.updatePrototypes();
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats.map(function (stat) {
                        Object.setPrototypeOf(stat, Stat_1.BoomSummaryStat.prototype);
                        return stat;
                    });
                };
                BoomSummaryCtl.prototype.onDataReceived = function (data) {
                    this.compute(data);
                    this.render();
                };
                BoomSummaryCtl.prototype.onInitEditMode = function () {
                    this.addEditorTab("Stats", "public/plugins/" + config_1.config.plugin_id + "/partials/stats.html", 2);
                    this.addEditorTab("Panel Options", "public/plugins/" + config_1.config.plugin_id + "/partials/options.html", 3);
                };
                BoomSummaryCtl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                };
                BoomSummaryCtl.prototype.autoGenerateStats = function () {
                    var _this = this;
                    if (this.panel.stats.length === 0) {
                        if (this.masterdata && this.masterdata.length > 0) {
                            lodash_1.default.each(this.masterdata[0], function (data) {
                                if (data.colname) {
                                    _this.panel.stats.push(new Stat_1.BoomSummaryStat({
                                        bgColor: "green",
                                        field: data.colname,
                                        textColor: "white"
                                    }));
                                }
                            });
                        }
                    }
                    this.activeStatIndex = this.panel.stats.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.includStat = function (statOptions) {
                    this.panel.stats.push(new Stat_1.BoomSummaryStat({
                        bgColor: statOptions.bgColor || "green",
                        display_template: statOptions.display_template || undefined,
                        field: statOptions.field,
                        textColor: statOptions.textColor || "white"
                    }));
                    this.activeStatIndex = this.panel.stats.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.addStat = function (templateType) {
                    var field = "Sample";
                    if (this.masterdata && this.masterdata.length > 0) {
                        if (this.masterdata[0].length > this.panel.stats.length &&
                            this.masterdata[0][this.panel.stats.length].colname) {
                            field = this.masterdata[0][this.panel.stats.length].colname;
                        }
                    }
                    var display_template;
                    if (templateType && templateType.toUpperCase() === "JUMBO") {
                        display_template = "<div style=\"width:100%;float:left;text-align:center;border:1px solid black;border-width:1px 1px 0px 1px\">\n      <br/>\n      <h5>${title}</h5>\n      <h1>${default}</h1>\n      <br/>\n</div>";
                    }
                    this.includStat({
                        bgColor: "green",
                        display_template: display_template,
                        field: field,
                        textColor: "white"
                    });
                };
                BoomSummaryCtl.prototype.removeStat = function (index) {
                    this.panel.stats.splice(index, 1);
                    this.activeStatIndex =
                        this.panel.stats && this.panel.stats.length > 0
                            ? this.panel.stats.length - 1
                            : -1;
                    this.render();
                };
                BoomSummaryCtl.prototype.moveStat = function (direction, index) {
                    var tempElement = this.panel.stats[Number(index)];
                    if (direction === "UP") {
                        this.panel.stats[Number(index)] = this.panel.stats[Number(index) - 1];
                        this.panel.stats[Number(index) - 1] = tempElement;
                        this.activeStatIndex = Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.stats[Number(index)] = this.panel.stats[Number(index) + 1];
                        this.panel.stats[Number(index) + 1] = tempElement;
                        this.activeStatIndex = Number(index) + 1;
                    }
                    this.render();
                };
                BoomSummaryCtl.templateUrl = "partials/module.html";
                return BoomSummaryCtl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", BoomSummaryCtl);
            BoomSummaryCtl.prototype.compute = function (data) {
                this.masterdata = AppUtils_1.buildMasterData(data);
            };
            BoomSummaryCtl.prototype.render = function () {
                var _this = this;
                var output = "";
                lodash_1.default.each(this.panel.stats, function (stat) {
                    var o = AppUtils_1.getOutputValue(_this.masterdata, stat);
                    output += AppUtils_1.buildOutput(stat.statWidth, AppUtils_1.replaceTokens(o.output), o.bgColor, o.textColor);
                });
                this.elem.find("#boomsummary-panel").html(output);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFjQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGVBQU0sQ0FBQyxTQUFTLDBCQUF1QjtnQkFDeEQsS0FBSyxFQUFFLGFBQVcsZUFBTSxDQUFDLFNBQVMsMkJBQXdCO2FBQzNELENBQUMsQ0FBQzs7Z0JBRTBCLGtDQUFnQjtnQkFhM0Msd0JBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQU16QjtvQkFsQk0saUJBQVcsR0FBRyxhQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ25DLGVBQVMsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO29CQUM3QixzQkFBZ0IsR0FBRyxlQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNDLG1CQUFhLEdBQUcsZUFBTSxDQUFDLGFBQWEsQ0FBQztvQkFDckMscUJBQWUsR0FBRyxDQUFDLENBQUM7b0JBSXBCLGdCQUFVLEdBQVEsRUFBRSxDQUFDO29CQUsxQixnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQzFDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FB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QUFDO2dCQTlIYSwwQkFBVyxHQUFHLHNCQUFzQixDQUFDO2dCQStIckQscUJBQUM7YUFBQSxBQWhJRCxDQUE2QixzQkFBZ0I7O1lBa0k3QyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFTLElBQUk7Z0JBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsMEJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUM7WUFFRixjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztnQkFBQSxpQkFZakM7Z0JBWEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxVQUFBLElBQUk7b0JBQzNCLElBQUksQ0FBQyxHQUFHLHlCQUFjLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxJQUFJLHNCQUFXLENBQ25CLElBQUksQ0FBQyxTQUFTLEVBQ2Qsd0JBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQ3ZCLENBQUMsQ0FBQyxPQUFPLEVBQ1QsQ0FBQyxDQUFDLFNBQVMsQ0FDWixDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IE1ldHJpY3NQYW5lbEN0cmwsIGxvYWRQbHVnaW5Dc3MgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlTdGF0IH0gZnJvbSBcIi4vYXBwL1N0YXRcIjtcclxuaW1wb3J0IHtcclxuICBnZXRPdXRwdXRWYWx1ZSxcclxuICBidWlsZE1hc3RlckRhdGEsXHJcbiAgYnVpbGRPdXRwdXQsXHJcbiAgcmVwbGFjZVRva2Vuc1xyXG59IGZyb20gXCIuL3V0aWxzL0FwcFV0aWxzXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke2NvbmZpZy5wbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICBsaWdodDogYHBsdWdpbnMvJHtjb25maWcucGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5saWdodC5jc3NgXHJcbn0pO1xyXG5cclxuY2xhc3MgQm9vbVN1bW1hcnlDdGwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcclxuICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIHB1YmxpYyBzdGF0VHlwZXMgPSBjb25maWcuc3RhdFR5cGVzO1xyXG4gIHB1YmxpYyBjb21wYXJlT3BlcmF0b3JzID0gY29uZmlnLmNvbXBhcmVPcGVyYXRvcnM7XHJcbiAgcHVibGljIGRlY2ltYWxWYWx1ZXMgPSBjb25maWcuZGVjaW1hbFZhbHVlcztcclxuICBwdWJsaWMgYWN0aXZlU3RhdEluZGV4ID0gMDtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgcHVibGljIG1hc3RlcmRhdGE6IGFueSA9IFtdO1xyXG4gIHB1YmxpYyBjb21wdXRlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB7fSk7XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzID0gdGhpcy5wYW5lbC5zdGF0cyB8fCBbXTtcclxuICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMubWFwKHN0YXQgPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RhdCwgQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZSk7XHJcbiAgICAgIHJldHVybiBzdGF0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbXB1dGUoZGF0YSk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXHJcbiAgICAgIFwiU3RhdHNcIixcclxuICAgICAgYHB1YmxpYy9wbHVnaW5zLyR7Y29uZmlnLnBsdWdpbl9pZH0vcGFydGlhbHMvc3RhdHMuaHRtbGAsXHJcbiAgICAgIDJcclxuICAgICk7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcclxuICAgICAgXCJQYW5lbCBPcHRpb25zXCIsXHJcbiAgICAgIGBwdWJsaWMvcGx1Z2lucy8ke2NvbmZpZy5wbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsXHJcbiAgICAgIDNcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICB9XHJcbiAgcHVibGljIGF1dG9HZW5lcmF0ZVN0YXRzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGlmICh0aGlzLm1hc3RlcmRhdGEgJiYgdGhpcy5tYXN0ZXJkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBfLmVhY2godGhpcy5tYXN0ZXJkYXRhWzBdLCBkYXRhID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhLmNvbG5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0cy5wdXNoKFxyXG4gICAgICAgICAgICAgIG5ldyBCb29tU3VtbWFyeVN0YXQoe1xyXG4gICAgICAgICAgICAgICAgYmdDb2xvcjogXCJncmVlblwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IGRhdGEuY29sbmFtZSxcclxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogXCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIGluY2x1ZFN0YXQoc3RhdE9wdGlvbnMpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMucHVzaChcclxuICAgICAgbmV3IEJvb21TdW1tYXJ5U3RhdCh7XHJcbiAgICAgICAgYmdDb2xvcjogc3RhdE9wdGlvbnMuYmdDb2xvciB8fCBcImdyZWVuXCIsXHJcbiAgICAgICAgZGlzcGxheV90ZW1wbGF0ZTogc3RhdE9wdGlvbnMuZGlzcGxheV90ZW1wbGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgZmllbGQ6IHN0YXRPcHRpb25zLmZpZWxkLFxyXG4gICAgICAgIHRleHRDb2xvcjogc3RhdE9wdGlvbnMudGV4dENvbG9yIHx8IFwid2hpdGVcIlxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGFkZFN0YXQodGVtcGxhdGVUeXBlKTogdm9pZCB7XHJcbiAgICBsZXQgZmllbGQgPSBcIlNhbXBsZVwiO1xyXG4gICAgaWYgKHRoaXMubWFzdGVyZGF0YSAmJiB0aGlzLm1hc3RlcmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5tYXN0ZXJkYXRhWzBdLmxlbmd0aCA+IHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoICYmXHJcbiAgICAgICAgdGhpcy5tYXN0ZXJkYXRhWzBdW3RoaXMucGFuZWwuc3RhdHMubGVuZ3RoXS5jb2xuYW1lXHJcbiAgICAgICkge1xyXG4gICAgICAgIGZpZWxkID0gdGhpcy5tYXN0ZXJkYXRhWzBdW3RoaXMucGFuZWwuc3RhdHMubGVuZ3RoXS5jb2xuYW1lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgZGlzcGxheV90ZW1wbGF0ZTtcclxuICAgIGlmICh0ZW1wbGF0ZVR5cGUgJiYgdGVtcGxhdGVUeXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiSlVNQk9cIikge1xyXG4gICAgICBkaXNwbGF5X3RlbXBsYXRlID0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztib3JkZXItd2lkdGg6MXB4IDFweCAwcHggMXB4XCI+XHJcbiAgICAgIDxici8+XHJcbiAgICAgIDxoNT5cXCR7dGl0bGV9PC9oNT5cclxuICAgICAgPGgxPlxcJHtkZWZhdWx0fTwvaDE+XHJcbiAgICAgIDxici8+XHJcbjwvZGl2PmA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluY2x1ZFN0YXQoe1xyXG4gICAgICBiZ0NvbG9yOiBcImdyZWVuXCIsXHJcbiAgICAgIGRpc3BsYXlfdGVtcGxhdGUsXHJcbiAgICAgIGZpZWxkLFxyXG4gICAgICB0ZXh0Q29sb3I6IFwid2hpdGVcIlxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW1vdmVTdGF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID1cclxuICAgICAgdGhpcy5wYW5lbC5zdGF0cyAmJiB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCA+IDBcclxuICAgICAgICA/IHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogLTE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbW92ZVN0YXQoZGlyZWN0aW9uOiBzdHJpbmcsIGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KV07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSAtIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IE51bWJlcihpbmRleCkgLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IE51bWJlcihpbmRleCkgKyAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbn1cclxuXHJcbkJvb21TdW1tYXJ5Q3RsLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gIHRoaXMubWFzdGVyZGF0YSA9IGJ1aWxkTWFzdGVyRGF0YShkYXRhKTtcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5Q3RsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICBsZXQgb3V0cHV0ID0gYGA7XHJcbiAgXy5lYWNoKHRoaXMucGFuZWwuc3RhdHMsIHN0YXQgPT4ge1xyXG4gICAgbGV0IG8gPSBnZXRPdXRwdXRWYWx1ZSh0aGlzLm1hc3RlcmRhdGEsIHN0YXQpO1xyXG4gICAgb3V0cHV0ICs9IGJ1aWxkT3V0cHV0KFxyXG4gICAgICBzdGF0LnN0YXRXaWR0aCxcclxuICAgICAgcmVwbGFjZVRva2VucyhvLm91dHB1dCksXHJcbiAgICAgIG8uYmdDb2xvcixcclxuICAgICAgby50ZXh0Q29sb3JcclxuICAgICk7XHJcbiAgfSk7XHJcbiAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXN1bW1hcnktcGFuZWxcIikuaHRtbChvdXRwdXQpO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgQm9vbVN1bW1hcnlDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==