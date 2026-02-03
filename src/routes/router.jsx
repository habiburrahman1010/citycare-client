import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashLayout from "../Layouts/DashLayout";
import CitizenHome from "../Pages/Dashboard/Citizen/CitizenHome";
import CreateIssue from "../Pages/Dashboard/Citizen/CreateIssue";
import MyIssues from "../Pages/Dashboard/Citizen/MyIssues";
import IssueDetails from "../Pages/Dashboard/Citizen/IssueDetails";
import CitizenProfile from "../Pages/Dashboard/Citizen/CitizenProfile";
import PaymentSuccessfull from "../Pages/Dashboard/Citizen/PaymentSuccessfull";
import PaymentCanceled from "../Pages/Dashboard/Citizen/PaymenCanceled";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashLayout></DashLayout>,
    children: [
      {
        index: true,
        element: <CitizenHome></CitizenHome>
      },
      {
        path: 'create-issue',
        element: <CreateIssue></CreateIssue>
      },
      {
        path: 'my-issue/:email',
        element: <MyIssues></MyIssues>
      },
      {
        path: 'issue-details/:id',
        element: <IssueDetails></IssueDetails>
      },
      {
        path: 'citizen-profile',
        element: <CitizenProfile></CitizenProfile>
      },
      {
        path: 'payment-success',
        element: <PaymentSuccessfull />
      },
      {
        path: 'payment-canceled',
        element: <PaymentCanceled />
      }

    ]
  }
]);

