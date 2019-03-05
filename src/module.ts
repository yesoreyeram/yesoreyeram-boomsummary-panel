///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { MetricsPanelCtrl, loadPluginCss } from "app/plugins/sdk";
import kbn from "app/core/utils/kbn";
import { config } from "./config";
import { BoomSummaryStat } from "./app/Stat";
import {
  getOutputValue,
  buildMasterData,
  buildOutput,
  replaceTokens
} from "./utils/AppUtils";

loadPluginCss({
  dark: `plugins/${config.plugin_id}/css/default.dark.css`,
  light: `plugins/${config.plugin_id}/css/default.light.css`
});

class BoomSummaryCtl extends MetricsPanelCtrl {
  public static templateUrl = "partials/module.html";
  public unitFormats = kbn.getUnitFormats();
  public ctrl: any;
  public elem: any;
  public attrs: any;
  public masterdata: any = [];
  public compute;

  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, {
      activeStatIndex: 0
    });
    this.panel.stats = this.panel.stats || [];
    this.updatePrototypes();
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
  }
  private updatePrototypes(): void {
    this.panel.stats.map(stat => {
      Object.setPrototypeOf(stat, BoomSummaryStat.prototype);
      return stat;
    });
  }
  private onDataReceived(data: any): void {
    this.compute(data);
    this.render();
  }
  private onInitEditMode(): void {
    this.addEditorTab(
      "Stats",
      `public/plugins/${config.plugin_id}/partials/stats.html`,
      2
    );
    this.addEditorTab(
      "Panel Options",
      `public/plugins/${config.plugin_id}/partials/options.html`,
      3
    );
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
    this.panel.activeStatIndex = this.panel.stats.length - 1;
    this.render();
  }
  private includStat(statOptions): void {
    this.panel.stats.push(
      new BoomSummaryStat({
        bgColor: statOptions.bgColor || "green",
        display_template: statOptions.display_template || undefined,
        field: statOptions.field,
        textColor: statOptions.textColor || "white"
      })
    );
    this.panel.activeStatIndex = this.panel.stats.length - 1;
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
      display_template = `<div style="width:100%;float:left;text-align:center;border:1px solid black;border-width:1px 1px 0px 1px">
      <br/>
      <h5>\${title}</h5>
      <h1>\${default}</h1>
      <br/>
</div>`;
    }
    this.includStat({
      bgColor: "green",
      display_template,
      field,
      textColor: "white"
    });
  }
  public removeStat(index: number): void {
    this.panel.stats.splice(index, 1);
    this.panel.activeStatIndex =
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
      this.panel.activeStatIndex = Number(index) - 1;
    }
    if (direction === "DOWN") {
      this.panel.stats[Number(index)] = this.panel.stats[Number(index) + 1];
      this.panel.stats[Number(index) + 1] = tempElement;
      this.panel.activeStatIndex = Number(index) + 1;
    }
    this.render();
  }
}

BoomSummaryCtl.prototype.compute = function(data) {
  this.masterdata = buildMasterData(data);
};

BoomSummaryCtl.prototype.render = function() {
  let output = ``;
  _.each(this.panel.stats, stat => {
    let o = getOutputValue(this.masterdata, stat);
    output += buildOutput(
      stat.statWidth,
      replaceTokens(o.output),
      o.bgColor,
      o.textColor
    );
  });
  this.elem.find("#boomsummary-panel").html(output);
};

export { BoomSummaryCtl as PanelCtrl };
