import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import "./index.css";

import Root from "./routes/Root";

import ErrorPage from "./routes/ErrorPage";
import Contact from "./routes/Contact";
import EditContact from "./routes/EditContact";

import {
  getContact,
  getContacts,
  createContact,
  updateContact,
} from "./contacts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const contacts = await getContacts();
      return { contacts };
    },
    action: async () => {
      await createContact();
    },
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: (el) => {
          return getContact(el.params.contactId);
        },
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: ({ params }) => {
          return getContact(params.contactId);
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          const updates = Object.fromEntries(formData);
          await updateContact(params.contactId, updates);
          return redirect(`/contacts/${params.contactId}`);
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
