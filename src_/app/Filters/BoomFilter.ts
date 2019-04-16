import { IBoomFilter } from "../../definitions/types";
import { BoomFilter } from "./Filter";

export class BoomSummaryFilter extends BoomFilter implements IBoomFilter {
  constructor(options) {
    super(options);
  }
}
