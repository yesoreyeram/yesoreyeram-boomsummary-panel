export interface IMasterData {
  public colname: string;
  public refId: string;
  public rowid: number;
  public value: string;
}
export interface IBoomSummaryCtl {
  public activeStatIndex: number;
  public masterdata: IMasterData[][];
}
export interface IBoomFilter {
  public field: string;
  public operator: string;
  public value: string;
  public value2: string;
  public CanShowValue2;
  public GetValue2Helper;
  public GetValue1Helper;
}

export interface IBoomSummaryConditionalFormats {
  public bgColor: string;
  public textColor: string;
  public display_template: string;
}

export interface IBoomSummaryStat {
  public field: string;
  public title: string;
  public defaultStat: string;
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
  public getStats;
  public getValues;
}
