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

BoomFilter.prototype.CanShowValue2 = function() {
  if (this.operator.replace("ignorecase", "").trim() === "between") {
    return true;
  } else if (this.operator.replace("ignorecase", "").trim() === "insiderange") {
    return true;
  } else if (
    this.operator.replace("ignorecase", "").trim() === "outsiderange"
  ) {
    return true;
  } else if (this.operator.replace("ignorecase", "").trim() === "in") {
    return true;
  } else {
    return false;
  }
};
BoomFilter.prototype.GetValue2Helper = function() {
  if (this.operator.replace("ignorecase", "").trim() === "between") {
    return "to";
  } else if (this.operator.replace("ignorecase", "").trim() === "insiderange") {
    return "to";
  } else if (
    this.operator.replace("ignorecase", "").trim() === "outsiderange"
  ) {
    return "to";
  } else if (this.operator.replace("ignorecase", "").trim() === "in") {
    return "seperator";
  } else {
    return "";
  }
};
BoomFilter.prototype.GetValue1Helper = function() {
  if (this.operator.replace("ignorecase", "").trim() === "between") {
    return "From";
  } else if (this.operator.replace("ignorecase", "").trim() === "insiderange") {
    return "From";
  } else if (
    this.operator.replace("ignorecase", "").trim() === "outsiderange"
  ) {
    return "From";
  } else if (this.operator.replace("ignorecase", "").trim() === "in") {
    return "Values";
  } else {
    return "Value";
  }
};
