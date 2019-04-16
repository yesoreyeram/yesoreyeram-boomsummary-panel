import { IBoomFilter, IBoomSummaryConditionalFormats } from "../../definitions/types";
import { BoomFilter } from "./Filter";

export class BoomSummaryConditionalFormats extends BoomFilter
  implements IBoomFilter, IBoomSummaryConditionalFormats {
  public bgColor: string;
  public textColor: string;
  public display_template: string;
  constructor(options) {
    super(options);
    this.bgColor = options.bgColor || "";
    this.textColor = options.textColor || "";
    this.display_template = options.display_template || "";
  }
}
