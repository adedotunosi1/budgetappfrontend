import { useLoaderData } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ArrowUturnLeftIcon, BookmarkIcon, HomeIcon } from "@heroicons/react/24/solid";
export async function budgetLoader({ params }) {

    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if(!budget){
        throw new Error("That budget does not exist");
    }
    return { budget, expenses }
}

export async function budgetAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

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




const BudgetPage = () => {
    const {budget, expenses} = useLoaderData();
    return ( 
        <div className="grid-lg" style={{
            "--accent": budget.color,
        }}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span>
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true}/>
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span> Expenses
                        </h2>
                        <Table expenses={expenses} showBudget={false}/>
                        <div className="flex-md">
                <Link to="/"
                className="btn btn--dark">
                <ArrowUturnLeftIcon width={20} />
                <span>Dashboard</span>
                </Link>
        </div>
                         </div>
                )
            }
        </div>
     );
}
export default BudgetPage;