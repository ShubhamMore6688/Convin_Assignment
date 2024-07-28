import exceljs from 'exceljs';
import { expenseModel } from '../Models/Expense.js';

export const exportExpense = async (req,res) => {

    // create workbook
    const workbook =  new exceljs.Workbook();

    // create worksheet in that workbook
    const worksheet = workbook.addWorksheet("myexpense");

    // path to download the file
    const path = "./files"


    //create the columns for the worksheet
    worksheet.columns = [
        {header: "Sno.", key: "s_no", width: 10},
        {header: "description", key: "description", width: 20},
        {header: "amount", key: "amount", width: 20},
        {header: "paidby", key: "paidBy", width: 50},
        {header: "sharedType", key: "sharedType", width: 20},
        { header: "Shares", key: "shares", width: 50 }
    ]

    let counter = 1;

    // get the expense details, populate the data by paidBy and also in shares array populate the user details
    const expenses = await expenseModel.find().populate('paidBy', 'name').populate('shares.user', 'name');


    // iterate through array of expenses to store in the worksheet
    expenses.forEach(exp => {

        // get the user and align it with the corresponding amount field from the shares array
        const sharesInfo = exp.shares.map(share => {
            return `${share.user.name}: ${share.amount}`;
        }).join('; ');

       // add each data in the worksheet rowwise
        worksheet.addRow({
            s_no: exp.s_no,
            description: exp.description,
            amount: exp.amount,
            paidBy: exp.paidBy.name,
            sharedType: exp.sharedType,
            shares: sharesInfo
        });

        // this is counter for serial no
        counter++;
    });


    try {
        const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
        .then(()=> {
            res.send({
                status: "success",
                message: "file successfully downloaded",
                path: `${path}/users.xlsx`
            });
        });
    } catch (error) {
        res.send({
            status: "error",
            message: error.message
          });
    }
}