import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";


const AddBudgetForm = () => {

    const [budgetname, setBudgetName] = useState("");
   const [budgetamount, setBudgetAmount] = useState("");
   const userid = JSON.parse(localStorage.getItem("userName"));
   
   const fetcher = useFetcher();
   const isSubmitting = fetcher.state === "submitting"

   const formRef = useRef();
   const focusRef =useRef();

   useEffect(() => {
    if(!isSubmitting){
        formRef.current.reset()
        focusRef.current.focus()
    }
   }, [isSubmitting])

    return ( 
       <div className="form-wrapper">
        <h2 className="h3">
            Create budget
        </h2>
        <fetcher.Form method="post"
         className="grid-sm"
         ref={formRef} 
        >
        <div className="grid-xs">
            <label htmlFor="newBudget">Budget Name</label>
            <input type="text" 
            name="newBudget" 
            id="newBudget" 
            value={budgetname}
            onChange={(e) => setBudgetName(e.target.value)}
            placeholder="..Groceries"
            required
            ref={focusRef}
            />
        </div>
        <div className="grid-xs">
            <label htmlFor="newBudgetAmount"> Amount </label>
            <input type="number" 
            step="0.01"
            name="newBudgetAmount" 
            id="newBudgetAmount"
            onChange={(e) => setBudgetAmount(e.target.value)}
            placeholder="e.g .. $10, $200"
            required
            inputMode="decimal"
            value={budgetamount}
            />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            {
                 isSubmitting ? <span>Adding budget...</span> : (
                    <>
                    <span>Create budget</span>
            <CurrencyDollarIcon width={20} />
                    </>
                 )
                }
        </button>
        </fetcher.Form>
       </div>
     );
}
 // this works if there is no existing budget
export default AddBudgetForm;