const fs = require("fs");
const path = require("path");
const { format } = require("@fast-csv/format");

module.exports = function makeCsv(students) {
  return new Promise((resolve, reject) => {
    const filename = `registrations_${Date.now()}.csv`;
    const filepath = path.join(__dirname, "..", "..", "exports", filename);

    const csvStream = format({ headers: true });

    const writable = fs.createWriteStream(filepath);
    csvStream.pipe(writable);

    students.forEach((s) => { 
      csvStream.write({
        Name: s.name,
        Email: s.email,
        USN: s.usn,
        Branch: s.branch,
      });
    });

    csvStream.end();

    writable.on("finish", () => resolve({ filepath }));
    writable.on("error", reject);
  });
};
