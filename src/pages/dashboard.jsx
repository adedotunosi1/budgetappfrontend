import { json, useLoaderData } from "react-router-dom";
import Intro from "../components/intro";
import { createBudget, createExpense, deleteItem, fetchBudget, fetchBudgets, fetchData } from "../helpers";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import { wait } from "../helpers";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import RegisterUser from "./register";


export function dashboardLoader(){
   const userName = fetchData("userName");
   const budgets = fetchBudget("budgets");
   const expenses = fetchData("expenses");
   return { userName, budgets, expenses }
   
}
 
export async function dashboardAction({request}){
   await wait();

 const data = await request.formData();
 const { _action, ...values } = Object.fromEntries(data)

 // new user registration // now we can create user cases for each action in different forms

 if(_action === "newUser"){
   try {
      localStorage.setItem("userName", JSON.stringify(values.userName))
       return toast.success(`Welcome. ${values.userName}`)
     } catch (e) {
       throw new Error("There was a problem creating your account.")
    }
 }

 if(_action === "createBudget"){
   try {
      // create budget
      createBudget({
         name: values.newBudget,
         amount: values.newBudgetAmount,
      })
      return toast.success("Budget created.");
   } catch(e) {
      throw new Error("There was a problem creating your budget.")
   }
 }
 if(_action === "createExpense"){
   try {
      // create budget
      createExpense({
         name: values.newExpense,
         amount: values.newExpenseAmount,
         budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense}  added!`);
   } catch(e) {
      throw new Error("There was a problem creating your expense.")
   }
 }
 if(_action === "deleteExpense"){
   try {
      deleteItem({
         key: "expenses",
         id: values.expenseId,
      });
      return toast.success("Expense deleted!");
     } catch (e) {
       throw new Error("There was a problem creating your account.")
    }
 }
 
}


const Dashboard = () => {
   const { userName, budgets, expenses } = useLoaderData();
    return ( 
        <div> { userName ? (<div className="dashboard">
         <h1>Welcome back, <span className="accent">{userName}</span></h1>
         <div className="grid-sm">
           {budgets && budgets.length > 0 ? (
            <div className="grid-lg">
               <div className="flex-lg">
               <AddBudgetForm /> 
               <AddExpenseForm budgets={budgets} />
               </div>
               <h2>Existing Budgets</h2>
               <div className="budgets">
                  {
                     budgets.map((budget) => (
                        <BudgetItem key={budget.id} budget={budget} />
                     ))
                  }
               </div>
               {
                  expenses && expenses.length > 0 && (
                     <div className="grid-md">
                        <h2>Recent Expenses</h2>
                        <Table expenses={expenses
                           .sort(
                              (a, b) => b.createdAt - a.createdAt
                              ).slice(0, 8)
                              }/>
                              {expenses.length > 8 && (
                                 <Link
                                 to="userexpenses"
                                 className="btn btn--dark"
                                 >
                                 View all expenses
                                 </Link>
                              ) }
                     </div>
                  )
               }
            </div>
           ) 
           : (
           <div className="grid-sm">
           <p>Personal budgeting is the secret to financial freedom.</p>
           <p>Create a budget to get started!</p>
              <AddBudgetForm />
           </div>
        )}
         </div>
        </div>
        ) : <Intro /> }  
        </div>
     )
}
 // if we have a user show the dashboard function if not show the intro page
export default Dashboard;