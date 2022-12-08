const moment = require("moment");
const constants = require("../config/constants.js");

const formatDateBy = (date) => {
  if (date) {
    return moment(date).format(constants.dateFormat);
  } else {
    return "-"
  }
}

module.exports = formatDateBy;