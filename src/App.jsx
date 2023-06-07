import { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { logoutAction } from "./actions/logout";
import Main, { mainLoader } from "./layouts/main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/dashboard"
import Error from "./pages/Error"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import DeleteBudget from "./actions/DeleteBudget";
import UserExpenses, { UserexpensesAction, UserexpensesLoader } from "./pages/UserExpenses";
import UserLogin from "./pages/login";
import RegisterUser from "./pages/register";
import validator from "validator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "login",
        element: <UserLogin />,
      },
      {
        path: "register",
        element: <RegisterUser />,

      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: DeleteBudget,
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />
      },
      {
        path: "userexpenses",
        element: <UserExpenses />,
        loader: UserexpensesLoader,
        action: UserexpensesAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction,
        errorElement: <Error />
      },
      {
          path: "about",
          element: <p> About </p>
      }
    ]
  },
]);

function App() {


  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
