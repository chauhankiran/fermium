const { Parser } = require("json2csv");

const downloadCSV = (res, fileName, fields, data) => {
  const p = new Parser({ fields });
  const csv = p.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment(fileName);

  return res.send(csv);
}

module.exports = downloadCSV;