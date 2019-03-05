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
                    _this.masterdata = [];
                    lodash_1.default.defaults(_this.panel, {
                        activeStatIndex: 0
                    });
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
                    this.panel.activeStatIndex = this.panel.stats.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.addStat = function () {
                    var field = "Sample";
                    if (this.masterdata && this.masterdata.length > 0) {
                        if (this.masterdata[0].length > this.panel.stats.length &&
                            this.masterdata[0][this.panel.stats.length].colname) {
                            field = this.masterdata[0][this.panel.stats.length].colname;
                        }
                    }
                    this.panel.stats.push(new Stat_1.BoomSummaryStat({
                        bgColor: "green",
                        field: field,
                        textColor: "white"
                    }));
                    this.panel.activeStatIndex = this.panel.stats.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.removeStat = function (index) {
                    this.panel.stats.splice(index, 1);
                    this.panel.activeStatIndex =
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
                        this.panel.activeStatIndex = Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.stats[Number(index)] = this.panel.stats[Number(index) + 1];
                        this.panel.stats[Number(index) + 1] = tempElement;
                        this.panel.activeStatIndex = Number(index) + 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFjQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGVBQU0sQ0FBQyxTQUFTLDBCQUF1QjtnQkFDeEQsS0FBSyxFQUFFLGFBQVcsZUFBTSxDQUFDLFNBQVMsMkJBQXdCO2FBQzNELENBQUMsQ0FBQzs7Z0JBRTBCLGtDQUFnQjtnQkFTM0Msd0JBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQVF6QjtvQkFoQk0saUJBQVcsR0FBRyxhQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBSW5DLGdCQUFVLEdBQVEsRUFBRSxDQUFDO29CQUsxQixnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNyQixlQUFlLEVBQUUsQ0FBQztxQkFDbkIsQ0FBQyxDQUFDO29CQUNILEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztnQkFDbkUsQ0FBQztnQkFDTyx5Q0FBZ0IsR0FBeEI7b0JBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTt3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Q0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUN2QixDQUFDLENBQUMsT0FBTyxFQUNULENBQUMsQ0FBQyxTQUFTLENBQ1osQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsLCBsb2FkUGx1Z2luQ3NzIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5U3RhdCB9IGZyb20gXCIuL2FwcC9TdGF0XCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0T3V0cHV0VmFsdWUsXHJcbiAgYnVpbGRNYXN0ZXJEYXRhLFxyXG4gIGJ1aWxkT3V0cHV0LFxyXG4gIHJlcGxhY2VUb2tlbnNcclxufSBmcm9tIFwiLi91dGlscy9BcHBVdGlsc1wiO1xyXG5cclxubG9hZFBsdWdpbkNzcyh7XHJcbiAgZGFyazogYHBsdWdpbnMvJHtjb25maWcucGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5kYXJrLmNzc2AsXHJcbiAgbGlnaHQ6IGBwbHVnaW5zLyR7Y29uZmlnLnBsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEJvb21TdW1tYXJ5Q3RsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIjtcclxuICBwdWJsaWMgdW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgcHVibGljIG1hc3RlcmRhdGE6IGFueSA9IFtdO1xyXG4gIHB1YmxpYyBjb21wdXRlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB7XHJcbiAgICAgIGFjdGl2ZVN0YXRJbmRleDogMFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzID0gdGhpcy5wYW5lbC5zdGF0cyB8fCBbXTtcclxuICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMubWFwKHN0YXQgPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RhdCwgQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZSk7XHJcbiAgICAgIHJldHVybiBzdGF0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbXB1dGUoZGF0YSk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXHJcbiAgICAgIFwiU3RhdHNcIixcclxuICAgICAgYHB1YmxpYy9wbHVnaW5zLyR7Y29uZmlnLnBsdWdpbl9pZH0vcGFydGlhbHMvc3RhdHMuaHRtbGAsXHJcbiAgICAgIDJcclxuICAgICk7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcclxuICAgICAgXCJQYW5lbCBPcHRpb25zXCIsXHJcbiAgICAgIGBwdWJsaWMvcGx1Z2lucy8ke2NvbmZpZy5wbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsXHJcbiAgICAgIDNcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICB9XHJcbiAgcHVibGljIGF1dG9HZW5lcmF0ZVN0YXRzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGlmICh0aGlzLm1hc3RlcmRhdGEgJiYgdGhpcy5tYXN0ZXJkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBfLmVhY2godGhpcy5tYXN0ZXJkYXRhWzBdLCBkYXRhID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhLmNvbG5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0cy5wdXNoKFxyXG4gICAgICAgICAgICAgIG5ldyBCb29tU3VtbWFyeVN0YXQoe1xyXG4gICAgICAgICAgICAgICAgYmdDb2xvcjogXCJncmVlblwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IGRhdGEuY29sbmFtZSxcclxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogXCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVTdGF0SW5kZXggPSB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkU3RhdCgpOiB2b2lkIHtcclxuICAgIGxldCBmaWVsZCA9IFwiU2FtcGxlXCI7XHJcbiAgICBpZiAodGhpcy5tYXN0ZXJkYXRhICYmIHRoaXMubWFzdGVyZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGFbMF0ubGVuZ3RoID4gdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggJiZcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGhdLmNvbG5hbWVcclxuICAgICAgKSB7XHJcbiAgICAgICAgZmllbGQgPSB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGhdLmNvbG5hbWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucGFuZWwuc3RhdHMucHVzaChcclxuICAgICAgbmV3IEJvb21TdW1tYXJ5U3RhdCh7XHJcbiAgICAgICAgYmdDb2xvcjogXCJncmVlblwiLFxyXG4gICAgICAgIGZpZWxkLFxyXG4gICAgICAgIHRleHRDb2xvcjogXCJ3aGl0ZVwiXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVTdGF0SW5kZXggPSB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlU3RhdChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVN0YXRJbmRleCA9XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHMgJiYgdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggPiAwXHJcbiAgICAgICAgPyB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAtIDFcclxuICAgICAgICA6IC0xO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG1vdmVTdGF0KGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCldO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCkgLSAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpIC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVTdGF0SW5kZXggPSBOdW1iZXIoaW5kZXgpIC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCkgKyAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVTdGF0SW5kZXggPSBOdW1iZXIoaW5kZXgpICsgMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5Cb29tU3VtbWFyeUN0bC5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICB0aGlzLm1hc3RlcmRhdGEgPSBidWlsZE1hc3RlckRhdGEoZGF0YSk7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeUN0bC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgbGV0IG91dHB1dCA9IGBgO1xyXG4gIF8uZWFjaCh0aGlzLnBhbmVsLnN0YXRzLCBzdGF0ID0+IHtcclxuICAgIGxldCBvID0gZ2V0T3V0cHV0VmFsdWUodGhpcy5tYXN0ZXJkYXRhLCBzdGF0KTtcclxuICAgIG91dHB1dCArPSBidWlsZE91dHB1dChcclxuICAgICAgc3RhdC5zdGF0V2lkdGgsXHJcbiAgICAgIHJlcGxhY2VUb2tlbnMoby5vdXRwdXQpLFxyXG4gICAgICBvLmJnQ29sb3IsXHJcbiAgICAgIG8udGV4dENvbG9yXHJcbiAgICApO1xyXG4gIH0pO1xyXG4gIHRoaXMuZWxlbS5maW5kKFwiI2Jvb21zdW1tYXJ5LXBhbmVsXCIpLmh0bWwob3V0cHV0KTtcclxufTtcclxuXHJcbmV4cG9ydCB7IEJvb21TdW1tYXJ5Q3RsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=