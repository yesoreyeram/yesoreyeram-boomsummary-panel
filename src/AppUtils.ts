import _ from "lodash";
import { isMatch } from "./BoomUtils";

export let didSatisfyFilters = function (group, filters) {
  if (filters && filters.length > 0) {
    let matches = 0;
    _.each(filters, filter => {
      let matching_field = _.filter(group, g => g.colname === filter.field);
      if (matching_field && matching_field.length > 0) {
        matches +=
          isMatch(
            matching_field[0].value,
            filter.operator,
            filter.value,
            filter.value2
          ) === true
            ? 1
            : 0;
      }
    });
    return matches === filters.length;
  } else {
    return true;
  }
};

export let getFilteredDataFromMasterData = function (masterdata, filters) {
  let colnames: any = [];
  _.each(masterdata, group => {
    _.each(group, item => {
      colnames.push(item.colname);
    });
  });
  colnames = _.uniq(colnames);
  let validFilters = filters.filter(filter => colnames.indexOf(filter.field) > -1);
  return masterdata.filter(group => didSatisfyFilters(group, validFilters));
};
