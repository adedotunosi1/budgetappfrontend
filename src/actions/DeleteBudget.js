import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

export function DeleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });

        const assoicatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })

        assoicatedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            })
        });

        toast.success("Budget deleted");
    } catch (e) {
        throw new Error("There was  a problem deleting your budget.");
    }
    return redirect("/");
}

 
export default DeleteBudget;