import { Form, useLoaderData, useNavigation } from "react-router-dom";

export default function EditContact() {
  const contact = useLoaderData();
  const navigation = useNavigation();
  console.log(navigation.state);
  const loadingStates = ["submitting", "loading"];

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button
          type="submit"
          disabled={loadingStates.includes(navigation.state)}
        >
          {loadingStates.includes(navigation.state) ? "loading ..." : "Save"}
        </button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
