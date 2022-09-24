import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} from "./contacts";

import "./index.css";

import Layout from "./routes/Layout";
import Index from "./routes/Index";
import ErrorPage from "./routes/ErrorPage";
import Contact from "./routes/Contact";
import ContactEdit from "./routes/ContactEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: async ({ params }) => {
              const contact = await getContact(params.contactId);
              if (!contact) {
                throw new Response("", {
                  status: 404,
                  statusText: "Not Found",
                });
              }
              return contact;
            },
            action: async ({ request, params }) => {
              let formData = await request.formData();
              return updateContact(params.contactId, {
                favorite: formData.get("favorite") === "true",
              });
            },
          },
          {
            path: "contacts/:contactId/update",
            element: <ContactEdit />,
            loader: async ({ params }) => {
              return getContact(params.contactId);
            },
            action: async ({ request, params }) => {
              const formData = await request.formData();
              const updates = Object.fromEntries(formData);
              await updateContact(params.contactId, updates);
              return redirect(`/contacts/${params.contactId}`);
            },
          },
          {
            path: "contacts/:contactId/destroy",
            action: async ({ params }) => {
              await deleteContact(params.contactId);
              return redirect("/");
            },
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
