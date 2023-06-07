import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { calculateBudget, formatCurrency, formatPercentage } from "../helpers";
import { Form } from "react-router-dom";

const BudgetItem = ({ budget, showDelete = false }) => {

    const {id, name, amount, color} = budget;
     const spent = calculateBudget(id);
 

    return ( 
       <div 
       className="budget"
       style={{
        "--accent": color
       }}
       >
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency  (amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spent}>
        {formatPercentage (spent / amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency (spent)}... spent </small>
            <small>{formatCurrency (amount - spent )} remaining </small>
        </div>
        {
            showDelete ? (
                <div className="flex-sm">
                    <Form method="post"
                    action="delete"
                    onSubmit={(event) => {
                        if(!confirm("Are you sure you want to delete this budget?")){
                            event.preventDefault();
                        }
                    }}
                    >
                   <button type="submit" className="btn"><span>Delete Budget   <TrashIcon width={20} /></span></button>
                </Form>
                </div>
            ) : (
               <div className="flex-sm">
                 <Link 
                to={`/budget/${id}`}
                className="btn"
                >
                <span>View Details</span>
                <BanknotesIcon width={20} />
                </Link>
               </div>
            )
        }
       </div>
     );
}
 
export default BudgetItem;