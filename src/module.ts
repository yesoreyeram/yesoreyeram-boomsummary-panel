///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { MetricsPanelCtrl, loadPluginCss } from "app/plugins/sdk";
import kbn from "app/core/utils/kbn";
import { IBoomSummaryCtl } from "./definitions/types";
import { BoomSummaryStat } from "./app/BoomStat";
import { buildMasterData } from "./app/DataHandler";
import { config } from "./config";
import { getOutputValue } from "./utils/AppUtils";

loadPluginCss(config.cssThemes);

class BoomSummaryCtl extends MetricsPanelCtrl implements IBoomSummaryCtl {
  public static templateUrl = config.default_templateURL;
  public ctrl: any;
  public elem: any;
  public attrs: any;
  public activeStatIndex = 0;
  public masterdata: any = [];
  public unitFormats = kbn.getUnitFormats();
  public statTypes = config.statTypes;
  public compareOperators = config.compareOperators;
  public decimalValues = config.decimalValues;

  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, {});
    this.panel.stats = this.panel.stats || [];
    this.updatePrototypes();
    this.events.on(
      config.grafana_events.dataReceived,
      this.onDataReceived.bind(this)
    );
    this.events.on(
      config.grafana_events.initEditMode,
      this.onInitEditMode.bind(this)
    );
  }

  private updatePrototypes(): void {
    this.panel.stats.map(stat => {
      Object.setPrototypeOf(stat, BoomSummaryStat.prototype);
      return stat;
    });
  }

  private onDataReceived(data: any): void {
    this.masterdata = buildMasterData(data);
    this.render();
  }

  private onInitEditMode(): void {
    _.each(config.editorTabs, editorTab => {
      this.addEditorTab(
        editorTab.title,
        editorTab.templatePath,
        editorTab.position
      );
    });
  }

  public link(scope: any, elem: any, attrs: any, ctrl: any): void {
    this.scope = scope;
    this.elem = elem;
    this.attrs = attrs;
    this.ctrl = ctrl;
  }

  public autoGenerateStats(): void {
    if (this.panel.stats.length === 0) {
      if (this.masterdata && this.masterdata.length > 0) {
        _.each(this.masterdata[0], data => {
          if (data.colname) {
            this.panel.stats.push(
              new BoomSummaryStat({
                bgColor: "green",
                field: data.colname,
                textColor: "white"
              })
            );
          }
        });
      }
    }
    this.activeStatIndex = this.panel.stats.length - 1;
    this.render();
  }

  private includeStat(statOptions): void {
    this.panel.stats.push(
      new BoomSummaryStat({
        bgColor: statOptions.bgColor || "green",
        display_template: statOptions.display_template || undefined,
        field: statOptions.field,
        textColor: statOptions.textColor || "white"
      })
    );
    this.activeStatIndex = this.panel.stats.length - 1;
    this.render();
  }

  public addStat(templateType): void {
    let field = "Sample";
    if (this.masterdata && this.masterdata.length > 0) {
      if (
        this.masterdata[0].length > this.panel.stats.length &&
        this.masterdata[0][this.panel.stats.length].colname
      ) {
        field = this.masterdata[0][this.panel.stats.length].colname;
      }
    }
    let display_template;
    if (templateType && templateType.toUpperCase() === "JUMBO") {
      display_template = config.templates.default_jumbo;
    }
    this.includeStat({
      bgColor: "green",
      display_template,
      field,
      textColor: "white"
    });
  }

  public removeStat(index: number): void {
    this.panel.stats.splice(index, 1);
    this.activeStatIndex =
      this.panel.stats && this.panel.stats.length > 0
        ? this.panel.stats.length - 1
        : -1;
    this.render();
  }

  public moveStat(direction: string, index: Number): void {
    let tempElement = this.panel.stats[Number(index)];
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
  }
}

BoomSummaryCtl.prototype.render = function() {
  let output = ``;
  _.each(this.panel.stats, stat => {
    let o = getOutputValue(this.masterdata, stat);
    output += o;
  });
  this.elem.find("#boomsummary-panel").html(output);
};

export { BoomSummaryCtl as PanelCtrl };
