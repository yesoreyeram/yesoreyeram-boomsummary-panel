import _ from "lodash";
import { IMasterData } from "./types";

export let buildMasterData = function(data) {
  let masterdata: IMasterData[][] = [];
  _.each(data, d => {
    if (d.type === "table") {
      let refId = d.refId;
      _.each(d.rows, (row, i) => {
        let group: IMasterData[] = [];
        _.each(row, (col, j) => {
          let mydata: IMasterData = {
            colname: d.columns[j].text,
            refId,
            rowid: +i,
            value: col
          };
          group.push(mydata);
        });
        masterdata.push(group);
      });
    } else {
      console.error("ERROR: Only table format is currently supported");
    }
  });
  return masterdata;
};
