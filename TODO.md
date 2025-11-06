# TODO: Modify AuthContext.jsx to use username and password instead of email

- [x] Edit src/context/AuthContext.jsx:

  - Change login function parameter from `email` to `username`.
  - Update axios post payload to send `username` instead of `email`.
  - Update setUser fallback from `{ email }` to `{ username }`.
  - Remove any remaining email references.

- [ ] Followup: Verify changes and test login functionality if possible.
