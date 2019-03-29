import HttpStatus from 'http-status-codes';
import User from '../models/user.model';

const excel = require('exceljs');
const tempfile = require('tempfile');

/**
 * Find all the locations
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function get(req, res) {
  const { filename } = req.params;

  const workbook = new excel.Workbook(); //creating workbook
  const sheet = workbook.addWorksheet('Customers List'); //creating worksheet
  User
    .forge()
    .fetchAll()
		.then(total => {
      const objArray = total.toJSON();
      sheet.addRow().values = Object.keys(objArray[0]);
      objArray.forEach(function(item){
          let valueArray = [];
          valueArray = Object.values(item); // forming an array of values of single json in an array
          sheet.addRow().values = valueArray; // add the array as a row in sheet
      });
      const tempFilePath = tempfile(`${filename}.xlsx`);
      
      workbook.xlsx.writeFile(tempFilePath).then(function() {
        res.sendFile(tempFilePath);
      });
    })
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
    })
    );
}