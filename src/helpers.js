// delay running
import { useEffect } from "react";
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 2000))



const generateRandomColor = () => {
    const exisitingBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${exisitingBudgetsLength * 34} 65% 50%`
}

// Local storage functions

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

useEffect(()=>{}, [budgets])

// export const fetchBudgets = (budget) => {
//     fetch("http://localhost:4000/last-user-budget", {
//         method: 'GET',
//       }).then((res) => {
//         return res.json()
// }).then((lastbudget) => {
//  console.log(lastbudget, "Last created budget by user");
//  const budgets = lastbudget;
//  console.log(budgets);
//  return budgets;
// })}

// export const fetchBudget = (budgets) => {
//     fetch("http://localhost:4000/user-budgets", {
//         method: 'GET',
//       }).then((res) => {
//         return res.json()
// }).then((mybudgets) => {
//  const budgets = mybudgets.budget;
//  console.log(budgets, "userBudgets");
//  return budgets;
// })}
// creating a new budget
export const createBudget = ({
    name, amount
}) => {
      
   const userid = JSON.parse(localStorage.getItem("userName"));
        const newItem = {
            id: crypto.randomUUID(),
            name: name,
            createdAt: Date.now(),
            amount: +amount,
            color: generateRandomColor(),
            userid: userid,
        }
    
        fetch('http://localhost:4000/addbudget', {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(newItem)
        }).then(() => {
          console.log(newItem);
          Navigate('/?index');
          toast.success('Budget Added')
        }).catch((error) => {
          throw new Error('There was an error');
        })
       
       const exisitingBudgets = fetchData("budgets") ?? [];  // if there is no bduget give us an empty array
    return localStorage.setItem("budgets",
    JSON.stringify([...exisitingBudgets, newItem]))
}
export const createBudgets = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const exisitingBudgets = fetchData("budgets") ?? [];  // if there is no bduget give us an empty array
    return localStorage.setItem("budgets",
    JSON.stringify([...exisitingBudgets, newItem]))
}

export const createExpense = ({
    name, amount, budgetId
}) => {
    const userid = JSON.parse(localStorage.getItem("userName"));

    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
        userid: userid,
    }
    fetch('http://localhost:4000/addexpenses', {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(newItem)
        }).then(() => {
          console.log(newItem);
          Navigate('/?index');
          toast.success('Expense Added')
        }).catch((error) => {
          toast.error('There was an error');
        })
    const existingExpenses = fetchData("expenses") ?? [];  // if there is no bduget give us an empty array
    return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

// delete item from local storage
export const deleteItem = ({ key, id }) => {
    const oldData = fetchData(key);
    if(id) {
        const newData = oldData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}


// get all items from local storage

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
}
// delete user item e.t.c


// formatting currency

export const formatCurrency = (am) => {
    return am.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

// total budget spend

export const calculateBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
            // check if expense.id is same as budgetID
            if(expense.budgetId !== budgetId) return acc;

            // add the current amount to my total

            return acc += expense.amount


    }, 0)
    return budgetSpent;
}

// format percentage 

export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

// format date

export const formatDate = (epoch) =>  new Date(epoch).toLocaleDateString();