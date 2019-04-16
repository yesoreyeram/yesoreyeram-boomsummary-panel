import _ from "lodash";
import { IBoomMetric } from "../definitions/types";

export class BoomMetric implements IBoomMetric {
    public defaultStat : string;
    public field : string;
    public title: string;
    public decimals: string;
    public format: string;
    public setUnitFormat;
    public getRefId;
    constructor(options){
        this.defaultStat = options.defaultStat || "${first}";
        this.field = options.field || "Sample";
        this.title = options.title || this.field;
        this.format = options.format || "none";
        this.decimals = options.decimals || "0";
    }
}
BoomMetric.prototype.getRefId = function(): string{
    return "${"+this.defaultStat.replace("${","").replace("}","") + ","+ this.field + "}";
}
BoomMetric.prototype.setUnitFormat = function(format: any): void {
    this.format = format && format.value ? format.value : "none";
};