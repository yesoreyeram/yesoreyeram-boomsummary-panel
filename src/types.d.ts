export interface IMasterData {
    public colname: string;
    public refId: string;
    public rowid: number;
    public value: string;
}
export interface IBoomSummaryCtl {
    public colnames: string[];
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
    public custom_css_class: string;
}
export interface IBoomStats {
    public count: Number;
    public uniquecount: Number;
    public sum: Number;
    public mean: Number;
    public min: Number;
    public max: Number;
    public first: string;
}
