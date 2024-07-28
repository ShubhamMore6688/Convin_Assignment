import exceljs from 'exceljs';
import jwt from 'jsonwebtoken';
import { userModel } from '../Models/User.js';
import { expenseModel } from '../Models/Expense.js';
export const exportIndividualExpense = async (req,res) => {

   try {
        // const {token} = req.cookies;
        const workbook = new exceljs.Workbook();

        const worksheet = workbook.addWorksheet("my-expense");

        const path = "./files";

        worksheet.columns = [
            {header: "Description", key: "description", width: 50},
            {header: "Amount", key: "amount", width: 50}
        ]



        // get the current logged user
        const user = await req.user.populate("expense");

        // retrive the expense from expense array field of current user
        let individualExpenseDetailsOfUser = [];

    
        // iterate through the expense array in the user model
        for (const expense of user.expense) {
            
           // store the expense details in array
           let individualExpense = await expenseModel.findOne({_id: expense});

           // for overall expense details we need expense of individual user
           // form shares array we are taking only current users expenses.
           for (const item of individualExpense.shares) {
            if(item.user.equals(user._id)){
                individualExpenseDetailsOfUser.push(item);
            }
        }
        }


        individualExpenseDetailsOfUser.forEach(exp => {
            worksheet.addRow({
                description: exp.description,
                amount: exp.amount
            })
        })


        const data = await workbook.xlsx.writeFile(`${path}/individual.xlsx`)
        .then(()=> {
            res.send({
                status: "success",
                message: "file successfully downloaded",
                path: `${path}/individual.xlsx`
            });
        });

   } catch (error) {
        res.send({
            status: "error",
            message: error.message
        });
   }




}