export class BoomSummaryConditionalFormats {
  public field: string;
  public operator: string;
  public value: string;
  public value2: string;
  public bgColor: string;
  public textColor: string;
  public display_template: string;
  public CanShowValue2;
  public GetValue2Helper;
  public GetValue1Helper;
  constructor(options) {
    this.field = options.field || "${default}";
    this.operator = options.operator || "equals";
    this.value = options.value || "Something";
    this.value2 = options.value2 || "";
    this.bgColor = options.bgColor || "";
    this.textColor = options.textColor || "";
    this.display_template = options.display_template || "";
  }
}

BoomSummaryConditionalFormats.prototype.CanShowValue2 = function() {
  if (this.operator.replace("ignorecase","").trim() === "between") {
    return true;
  } else if (this.operator.replace("ignorecase","").trim() === "insiderange") {
    return true;
  } else if (this.operator.replace("ignorecase","").trim() === "outsiderange") {
    return true;
  } else if (this.operator.replace("ignorecase","").trim() === "in") {
    return true;
  } else {
    return false;
  }
};
BoomSummaryConditionalFormats.prototype.GetValue2Helper = function() {
  if (this.operator.replace("ignorecase","").trim() === "between") {
    return "to";
  } else if (this.operator.replace("ignorecase","").trim() === "insiderange") {
    return "to";
  } else if (this.operator.replace("ignorecase","").trim() === "outsiderange") {
    return "to";
  } else if (this.operator.replace("ignorecase","").trim() === "in") {
    return "seperator";
  } else {
    return "";
  }
};
BoomSummaryConditionalFormats.prototype.GetValue1Helper = function() {
  if (this.operator.replace("ignorecase","").trim() === "between") {
    return "From";
  } else if (this.operator.replace("ignorecase","").trim() === "insiderange") {
    return "From";
  } else if (this.operator.replace("ignorecase","").trim() === "outsiderange") {
    return "From";
  } else if (this.operator.replace("ignorecase","").trim() === "in") {
    return "Values";
  } else {
    return "Value";
  }
};
