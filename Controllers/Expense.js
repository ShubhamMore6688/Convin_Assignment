import { expenseModel } from "../Models/Expense.js";
import { userModel } from "../Models/User.js";
import jwt from "jsonwebtoken";

export const addExpense = async (req,res) => {
    try {
        const {token}  = req.cookies;
        const {description, amount, sharedType, shares} = req.body;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "login first"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY)
        const user = userModel.findOne({_id: decoded.id});

        // check all the users in the group are valid or not
        for (const share of shares) {
            const user = await userModel.findById(share.user);
            if(!user){
                return res.status(400).json({
                    success: true,
                    message: "invalid user"
                })
            }
        }

        // create object with user and amount
        // amount is changes as per the sharedType
        let calculatedShare = 0;
        switch (sharedType) {

            // when sharedType is EQUAL
            case 'EQUAL':
                const sharedamount = amount / shares.length;
                calculatedShare = shares.map(share => (
                {
                    user: share.user, 
                    description,
                    amount: sharedamount
                }
            ));
                break;

            // when sharedType is PERCENTAGE
            case 'PERCENTAGE':
                let totalpercentage = 0;
                for (const share of shares) {
                    totalpercentage += share.amount;
                }

                if(totalpercentage !== 100){
                    throw new Error("total percentage is not 100")
                }

                calculatedShare = shares.map(share => (
                    {
                        user: share.user,
                        description,
                        amount: (amount * share.amount)/100
                    }
                ))
            
                break;

            // when sharedType is EXACT
            case 'EXACT':
                let totalamount = 0;
                for (const share of shares) {
                    totalamount += share.amount;
                }

                if(totalamount !== amount){
                    throw new Error("total exact amount is not equal to the amount")
                }
                calculatedShare.description = description
                calculatedShare = shares
                
                break;

           
            default:
                throw new Error("Invalid sharedType")
                break;
        }

        // create new expense entry
        const expense = await expenseModel.create({
            description,
            amount,
            paidBy: decoded.id,
            sharedType, 
            shares: calculatedShare
        })

        for (const share of shares) {
            let user = await userModel.findOne({_id: share.user});
            if(user){
                user.expense.push(expense._id);
                await user.save();
            }

          }

        return res.status(200).json({
            success: true,
            message: "expense added successfully"
        })


    } catch (error) {
         // if error occure this block is executes.
         res.status(500).json({
            message: error.message
        })
    }
}


//retrieve individual user expenses
export const getExpense = async (req,res) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "login first"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // get the current logged user
        const user = await userModel.findOne({_id: decoded.id}).populate("expense");

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

        return res.status(200).json({
            success: true,
            individualExpenseDetailsOfUser
        })
    } catch (error) {
          // if error occure this block is executes.
          res.status(500).json({
            message: error.message
        })
    }
}



//Retrieve overall expenses.
export const overallExpense = async(req,res) => {
    try {
        const expenses = await expenseModel.find();
        return res.status(200).json({
            success: true,
            expenses
        })
    } catch (error) {
         // if error occure this block is executes.
         res.status(500).json({
            message: error.message
        })
    }
}