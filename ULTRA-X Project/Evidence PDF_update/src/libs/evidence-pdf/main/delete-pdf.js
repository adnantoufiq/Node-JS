const { pool } = require("../db/pool");
const fs = require('fs');
const path = require('path');
const { deleteGeneratePDF, pdfName } = require("../sql_query/query");


const deletePdf = (value) => {
    const errors = [];
    const [name] = pool.query(pdfName, value);
    const fileName = name[0].pdf_name;
    const dirName = path.join(__dirname, "/../evidence");
    const evidencePath = `${dirName}/`;
    return fs.readdir(dirName, function (err, data) {  // check there have any file in directory or not
        if (err) {
            console.log("__Error: ", err);
            return Promise.reject('__directory-is-empty')
        }

        if (data.length === 0) {
            // return "Directory is empty";
            return Promise.reject('Directory-is-empty');
            // console.log('data', errors)
        } else {

            return fs.unlink(evidencePath + fileName, function (err) { // delete file based on file id

                if (err) {

                    // errors.push("File not found");
                    return Promise.reject('file-not-found');
                } else {

                    pool.query(deleteGeneratePDF, value);
                    return Promise.resolve('file-delete-in-db');
                }
            });
        }
        // console.log('data', errors)
        // errors.push('jsdhgfjasgdf')
        // if (errors.length >= 1) {
        //     return errors;
        // }
    });

}
module.exports = {
    deletePdf
}