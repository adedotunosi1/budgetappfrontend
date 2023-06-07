import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { deleteItem } from "../helpers";
import { fetchData } from "../helpers";

export function UserexpensesLoader(){
    const expenses = fetchData("expenses");
      return { expenses };
   }
    
  export async function UserexpensesAction({ request }) {
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
  

const UserExpenses = () => {
    const { expenses } = useLoaderData();
    return  (
        <div className="grid-lg">
         <h1> My Expenses </h1>
         {
            expenses && expenses.length > 0 ? (
              <div className="grid-md">
                <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                <Table expenses={expenses} />
              </div>
            ) : (
            <p>No expenses to show</p>
            )
         }
        </div>
    )
        }
export default UserExpenses;