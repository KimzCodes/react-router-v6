import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();
  const { state } = useNavigation();

  const loadingState = ["submitting", "loading"];
  const isLoading = loadingState.includes(state);

  return (
    <Form method="post" id="contact-form">
      {isLoading && <span>Loading please wait ...</span>}
      <label>
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
      </label>
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
        <button type="submit" disabled={isLoading}>
          Save
        </button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
