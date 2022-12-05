const express = require("express");
const generateXLSX = express.Router();
const {convertJsonToExcel} = require('./module/convert-json-to-exl')



generateXLSX.post("/generate-xlsx", async(req, res) => {

  
      // const xlsxData = await req.body.xlsxData;
      // console.log(xlsxData)
  
      try {
        convertJsonToExcel()
        return res.status(200).send({
          status: "success",
          message: "generate-xlsx-successfully",
        });
      } catch (error) {
        return res.status(500).send({
          status: "failed",
          message: "internal-server-error",
        });
      }
    }
  );

module.exports ={
    generateXLSX,
}