import { IBoomFilter } from "../../definitions/types";

export class BoomFilter implements IBoomFilter {
  public field: string;
  public operator: string;
  public value: string;
  public value2: string;
  public CanShowValue2;
  public GetValue2Helper;
  public GetValue1Helper;
  constructor(options) {
    this.field = options.field || "Sample";
    this.operator = options.operator || "equals";
    this.value = options.value || "Something";
    this.value2 = options.value2 || "";
  }
}

let getSecondaryFieldDetails = function(operator) {
  let CanShowValue2 = false;
  let Value1Helper = "Value";
  let Value2Helper = "";
  switch (operator.replace("ignorecase", "").trim()) {
    case "between":
      CanShowValue2 = true;
      Value1Helper = "From";
      Value2Helper = "To";
      break;
    case "insiderange":
      CanShowValue2 = true;
      Value1Helper = "From";
      Value2Helper = "To";
      break;
    case "outsiderange":
      CanShowValue2 = true;
      Value1Helper = "From";
      Value2Helper = "To";
      break;
    case "in":
      CanShowValue2 = true;
      Value1Helper = "Values";
      Value2Helper = "Seperator";
      break;
    default:
      break;
  }
  return {
    CanShowValue2,
    Value1Helper,
    Value2Helper
  };
};

BoomFilter.prototype.GetValue1Helper = function() {
  return getSecondaryFieldDetails(this.operator).Value1Helper;
};
BoomFilter.prototype.GetValue2Helper = function() {
  return getSecondaryFieldDetails(this.operator).Value2Helper;
};
BoomFilter.prototype.CanShowValue2 = function() {
  return getSecondaryFieldDetails(this.operator).CanShowValue2;
};
