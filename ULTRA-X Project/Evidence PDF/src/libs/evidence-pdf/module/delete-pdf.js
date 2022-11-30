const {pool} = require('../db/pool')

const {pdfName} = require('../sql_query/query')



const deletePDF = async (req, res) =>{
    const value = req.params.id;

    const errors = []
        const [name] = await pool.query(pdfName, value);
      const fileName = name[0].FILE_NAME;

      const dirName = path.join(__dirname, "evidence");
      const evidencePath = `${dirName}/`;

      fs.readdir(dirName, function (err, data) {
        if (data.length == 0) {
         errors.push("Directory-is-empty")
        } else {
          fs.unlink(evidencePath + fileName, async function (err) {
            if (err) {
             errors.push('files-not-found')
            } 
          });
        }
        if(errors.length >=1){
            return res.status(406).send({
                status: "failed",
                message: "invalid-data",
                errors,
              });
        }
      });

      next();

}


module.exports ={
    deletePDF,
}