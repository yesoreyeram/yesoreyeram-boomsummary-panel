System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./app/BoomStat", "./app/DataHandler", "./config"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, BoomStat_1, DataHandler_1, config_1, BoomSummaryCtl;
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
            function (BoomStat_1_1) {
                BoomStat_1 = BoomStat_1_1;
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
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats = _this.panel.stats || [];
                    _this.updatePrototypes();
                    _this.events.on(config_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
                    _this.events.on(config_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats.map(function (stat) {
                        Object.setPrototypeOf(stat, BoomStat_1.BoomSummaryStat.prototype);
                        return stat;
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
                BoomSummaryCtl.prototype.onInitEditMode = function () {
                    var _this = this;
                    lodash_1.default.each(config_1.config.editorTabs, function (editorTab) {
                        _this.addEditorTab(editorTab.title, editorTab.templatePath, editorTab.position);
                    });
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
                        lodash_1.default.each(this.colnames, function (colname) {
                            _this.panel.stats.push(new BoomStat_1.BoomSummaryStat({
                                bgColor: "green",
                                field: colname,
                                textColor: "white"
                            }));
                        });
                    }
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
                        display_template = config_1.config.templates.default_jumbo;
                    }
                    this.panel.stats.push(new BoomStat_1.BoomSummaryStat({
                        bgColor: "green",
                        display_template: display_template || undefined,
                        field: field,
                        textColor: "white"
                    }));
                    this.activeStatIndex = this.panel.stats.length - 1;
                    this.render();
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
                var output = "<div class=\"container-fluid\">\n    <div class=\"row\">";
                if (this.ctrl.panel.repeatmode) {
                    var cols = lodash_1.default.uniq(lodash_1.default.flatMap(this.masterdata).filter(function (t) { return t.colname === _this.ctrl.panel.repeatcolumn; }).map(function (t) { return t.value; }));
                    lodash_1.default.each(cols, function (col) {
                        output += "<div class=\"col-md-" + lodash_1.default.min([+(_this.ctrl.panel.repeatwidth), 12]) + "\" style=\"margin-bottom:" + (_this.ctrl.panel.repeat_margin_bottom || "20") + "px;\">";
                        var mymasterdata = _this.masterdata.filter(function (t) { return t.filter(function (t1) { return t1.value === col && t1.colname === _this.ctrl.panel.repeatcolumn; }).length === 1; });
                        lodash_1.default.each(_this.panel.stats, function (stat) {
                            output += stat.getOutputValue(mymasterdata);
                        });
                        output += "</div>";
                    });
                }
                else {
                    lodash_1.default.each(this.panel.stats, function (stat) {
                        output += stat.getOutputValue(_this.masterdata);
                    });
                }
                output += "</div>\n    </div>\n  ";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQWEzQyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWXpCO29CQXJCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBRXJCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBSTFDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNaLGVBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FDL0IsQ0FBQztvQkFDRixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDWixlQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFDbEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQy9CLENBQUM7O2dCQUNK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QUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQzNELFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDekQ7WUFHSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsLCBsb2FkUGx1Z2luQ3NzIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgSUJvb21TdW1tYXJ5Q3RsIH0gZnJvbSBcIi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlTdGF0IH0gZnJvbSBcIi4vYXBwL0Jvb21TdGF0XCI7XHJcbmltcG9ydCB7IGJ1aWxkTWFzdGVyRGF0YSB9IGZyb20gXCIuL2FwcC9EYXRhSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmxvYWRQbHVnaW5Dc3MoY29uZmlnLmNzc1RoZW1lcyk7XHJcblxyXG5jbGFzcyBCb29tU3VtbWFyeUN0bCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwgaW1wbGVtZW50cyBJQm9vbVN1bW1hcnlDdGwge1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBjb25maWcuZGVmYXVsdF90ZW1wbGF0ZVVSTDtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgcHVibGljIGFjdGl2ZVN0YXRJbmRleCA9IDA7XHJcbiAgcHVibGljIG1hc3RlcmRhdGE6IGFueSA9IFtdO1xyXG4gIHB1YmxpYyBjb2xuYW1lcztcclxuICBwdWJsaWMgdW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBwdWJsaWMgc3RhdFR5cGVzID0gY29uZmlnLnN0YXRUeXBlcztcclxuICBwdWJsaWMgY29tcGFyZU9wZXJhdG9ycyA9IGNvbmZpZy5jb21wYXJlT3BlcmF0b3JzO1xyXG4gIHB1YmxpYyBkZWNpbWFsVmFsdWVzID0gY29uZmlnLmRlY2ltYWxWYWx1ZXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMgPSB0aGlzLnBhbmVsLnN0YXRzIHx8IFtdO1xyXG4gICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcclxuICAgICAgY29uZmlnLmdyYWZhbmFfZXZlbnRzLmRhdGFSZWNlaXZlZCxcclxuICAgICAgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5pbml0RWRpdE1vZGUsXHJcbiAgICAgIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMubWFwKHN0YXQgPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RhdCwgQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZSk7XHJcbiAgICAgIHJldHVybiBzdGF0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRGF0YVJlY2VpdmVkKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5tYXN0ZXJkYXRhID0gYnVpbGRNYXN0ZXJEYXRhKGRhdGEpO1xyXG4gICAgdGhpcy5jb2xuYW1lcyA9IFtdO1xyXG4gICAgXy5lYWNoKHRoaXMubWFzdGVyZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgICBfLmVhY2goZ3JvdXAsIGl0ZW0gPT4ge1xyXG4gICAgICAgIHRoaXMuY29sbmFtZXMucHVzaChpdGVtLmNvbG5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb2xuYW1lcyA9IF8udW5pcSh0aGlzLmNvbG5hbWVzKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgXy5lYWNoKGNvbmZpZy5lZGl0b3JUYWJzLCBlZGl0b3JUYWIgPT4ge1xyXG4gICAgICB0aGlzLmFkZEVkaXRvclRhYihcclxuICAgICAgICBlZGl0b3JUYWIudGl0bGUsXHJcbiAgICAgICAgZWRpdG9yVGFiLnRlbXBsYXRlUGF0aCxcclxuICAgICAgICBlZGl0b3JUYWIucG9zaXRpb25cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxpbmsoc2NvcGU6IGFueSwgZWxlbTogYW55LCBhdHRyczogYW55LCBjdHJsOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcclxuICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dG9HZW5lcmF0ZVN0YXRzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIF8uZWFjaCh0aGlzLmNvbG5hbWVzLCBjb2xuYW1lID0+IHtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzLnB1c2goXHJcbiAgICAgICAgICBuZXcgQm9vbVN1bW1hcnlTdGF0KHtcclxuICAgICAgICAgICAgYmdDb2xvcjogXCJncmVlblwiLFxyXG4gICAgICAgICAgICBmaWVsZDogY29sbmFtZSxcclxuICAgICAgICAgICAgdGV4dENvbG9yOiBcIndoaXRlXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkU3RhdCh0ZW1wbGF0ZVR5cGUpOiB2b2lkIHtcclxuICAgIGxldCBmaWVsZCA9IFwiU2FtcGxlXCI7XHJcbiAgICBpZiAodGhpcy5tYXN0ZXJkYXRhICYmIHRoaXMubWFzdGVyZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGFbMF0ubGVuZ3RoID4gdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggJiZcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGhdLmNvbG5hbWVcclxuICAgICAgKSB7XHJcbiAgICAgICAgZmllbGQgPSB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGhdLmNvbG5hbWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBkaXNwbGF5X3RlbXBsYXRlO1xyXG4gICAgaWYgKHRlbXBsYXRlVHlwZSAmJiB0ZW1wbGF0ZVR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJKVU1CT1wiKSB7XHJcbiAgICAgIGRpc3BsYXlfdGVtcGxhdGUgPSBjb25maWcudGVtcGxhdGVzLmRlZmF1bHRfanVtYm87XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzLnB1c2goXHJcbiAgICAgIG5ldyBCb29tU3VtbWFyeVN0YXQoe1xyXG4gICAgICAgIGJnQ29sb3I6IFwiZ3JlZW5cIixcclxuICAgICAgICBkaXNwbGF5X3RlbXBsYXRlOiBkaXNwbGF5X3RlbXBsYXRlIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBmaWVsZDogZmllbGQsXHJcbiAgICAgICAgdGV4dENvbG9yOiBcIndoaXRlXCJcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlU3RhdChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHMgJiYgdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggPiAwXHJcbiAgICAgICAgPyB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAtIDFcclxuICAgICAgICA6IC0xO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlU3RhdChkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpXTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpIC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmICh0ZXh0LnNwbGl0KFwiXCIpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xyXG4gICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgTnVtYmVyKG1heGxlbmd0aCkgLSAzKSArIFwiLi4uXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbn1cclxuXHJcbkJvb21TdW1tYXJ5Q3RsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IG91dHB1dCA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+YDtcclxuICBpZiAodGhpcy5jdHJsLnBhbmVsLnJlcGVhdG1vZGUpIHtcclxuICAgIGxldCBjb2xzID0gXy51bmlxKF8uZmxhdE1hcCh0aGlzLm1hc3RlcmRhdGEpLmZpbHRlcih0ID0+IHQuY29sbmFtZSA9PT0gdGhpcy5jdHJsLnBhbmVsLnJlcGVhdGNvbHVtbikubWFwKHQgPT4gdC52YWx1ZSkpO1xyXG4gICAgXy5lYWNoKGNvbHMsIGNvbCA9PiB7XHJcbiAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbC1tZC0ke18ubWluKFsrKHRoaXMuY3RybC5wYW5lbC5yZXBlYXR3aWR0aCksIDEyXSl9XCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiR7dGhpcy5jdHJsLnBhbmVsLnJlcGVhdF9tYXJnaW5fYm90dG9tIHx8IFwiMjBcIn1weDtcIj5gO1xyXG4gICAgICBsZXQgbXltYXN0ZXJkYXRhID0gdGhpcy5tYXN0ZXJkYXRhLmZpbHRlcih0ID0+IHQuZmlsdGVyKHQxID0+IHQxLnZhbHVlID09PSBjb2wgJiYgdDEuY29sbmFtZSA9PT0gdGhpcy5jdHJsLnBhbmVsLnJlcGVhdGNvbHVtbikubGVuZ3RoID09PSAxKTtcclxuICAgICAgXy5lYWNoKHRoaXMucGFuZWwuc3RhdHMsIHN0YXQgPT4ge1xyXG4gICAgICAgIG91dHB1dCArPSBzdGF0LmdldE91dHB1dFZhbHVlKG15bWFzdGVyZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBvdXRwdXQgKz0gXCI8L2Rpdj5cIjtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBfLmVhY2godGhpcy5wYW5lbC5zdGF0cywgc3RhdCA9PiB7XHJcbiAgICAgIG91dHB1dCArPSBzdGF0LmdldE91dHB1dFZhbHVlKHRoaXMubWFzdGVyZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgb3V0cHV0ICs9IGA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGA7XHJcbiAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXN1bW1hcnktcGFuZWxcIikuaHRtbChvdXRwdXQpO1xyXG5cclxuICBpZiAodGhpcy5jdHJsICYmIHRoaXMuY3RybC5lbGVtWzBdKSB7XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLmN0cmwuZWxlbVswXS5jbGllbnRIZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7ICdtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0b2ZwYW5lbCArIFwicHhcIiB9KTtcclxuICB9XHJcblxyXG5cclxufTtcclxuXHJcbmV4cG9ydCB7IEJvb21TdW1tYXJ5Q3RsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=