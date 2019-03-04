import { BoomSummaryFilter } from "./Filter";
import { BoomSummaryConditionalFormats } from "./ConditionalFormat";

export class BoomSummaryStat {
  public field: string;
  public title: string;
  public display_template: string;
  public statWidth: string;
  public bgColor: string;
  public textColor: string;
  public format: string;
  public decimals: string;
  public filters: BoomSummaryFilter[];
  public conditional_formats: BoomSummaryConditionalFormats[];
  public addFilter;
  public removeFilter;
  public addConditonalFormat;
  public removeConditionalFormat;
  public moveConditionalFormat;
  public setUnitFormat;
  constructor(options) {
    this.field = options.field || "Sample";
    this.title = options.title || this.field + " info";
    this.display_template =
      options.display_template ||
      `<div style="width:100%;float:left;">
            <div style="width:50%;float:left;padding:10px;border:1px solid black;">\${title}</div>
            <div style="width:50%;float:left;padding:10px;border:1px solid black;">\${default}</div>
</div>`;
    this.statWidth = options.statWidth || "100";
    this.bgColor = options.bgColor || "";
    this.textColor = options.textColor || "";
    this.format = options.format || "none";
    this.decimals = options.decimals || "0";
    this.filters = options.filters || [];
    this.conditional_formats = options.conditional_formats || [];
  }
}

BoomSummaryStat.prototype.addFilter = function(): void {
  let newfilter = new BoomSummaryFilter({});
  this.filters = this.filters || [];
  this.filters.push(newfilter);
};

BoomSummaryStat.prototype.removeFilter = function(index: Number): void {
  if (this.filters.length > 0) {
    this.filters.splice(Number(index), 1);
  }
};

BoomSummaryStat.prototype.addConditonalFormat = function(): void {
  let new_conditional_formatter = new BoomSummaryConditionalFormats({});
  this.conditional_formats = this.conditional_formats || [];
  this.conditional_formats.push(new_conditional_formatter);
};

BoomSummaryStat.prototype.removeConditionalFormat = function(
  index: Number
): void {
  if (this.conditional_formats.length > 0) {
    this.conditional_formats.splice(Number(index), 1);
  }
};

BoomSummaryStat.prototype.moveConditionalFormat = function(
  direction: string,
  index: Number
): void {
  let tempElement = this.conditional_formats[Number(index)];
  if (direction === "UP") {
    this.conditional_formats[Number(index)] = this.conditional_formats[
      Number(index) - 1
    ];
    this.conditional_formats[Number(index) - 1] = tempElement;
  }
  if (direction === "DOWN") {
    this.conditional_formats[Number(index)] = this.conditional_formats[
      Number(index) + 1
    ];
    this.conditional_formats[Number(index) + 1] = tempElement;
  }
};

BoomSummaryStat.prototype.setUnitFormat = function(format: any): void {
  this.format = format && format.value ? format.value : "none";
};
