# Admin Login Credentials

## Default Admin Account

**Email:** admin@sportsstore.com
**Password:** Admin@123

---

## Important Notes

1. This is a demo admin account for testing purposes
2. Please change the password after first login in production
3. Only customers can register through the signup form
4. Admin accounts must be created manually in the database

---

## Creating Additional Admin Accounts

If you need to create additional admin accounts, you can do so by:

1. Creating a regular user account through the signup form
2. Updating the user's role in the `profiles` table from 'customer' to 'admin'

SQL Example:
```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'newemail@example.com';
```
