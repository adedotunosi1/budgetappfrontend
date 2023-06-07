import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export function expensesLoader(){
  const expenses = fetchData("expenses");
    return { expenses };
 }
  
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data)

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


const ExpensesPage = () => {
    const { expenses } = useLoaderData();
    return  (
        <div className="grid-lg">
         <h1> All Expenses </h1>
         {
            expenses && expenses.length > 0 ? (
              <div className="grid-md">
                <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                <Table expenses={expenses} />
                <div className="flex-md">
                <Link to="/"
                className="btn btn--dark">
                <ArrowUturnLeftIcon width={20} />
                <span>Dashboard</span>
                </Link>
        </div>
              </div>
            ) : (
            <p>No expenses to show</p>
            )
         }
        </div>
    )
};

export default ExpensesPage;