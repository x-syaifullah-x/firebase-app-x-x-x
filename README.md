# X TEST FIREBASE EMULATOR

### Create service accounts
- https://console.cloud.google.com
- Select project
- IAM & Admin
- Service accounts
- CREATE SERVICE ACCOUNT
- Open your service account
- KEYS
- ADD KEY
- Create new key / Upload existing key

### CREATE ENV GOOGLE_APPLICATION_CREDENTIALS
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/private_key.json
```

### ADD ROLE
- https://console.cloud.google.com
- IAM & Admin
- IAM
- VIEW BY PRINCIPALS
- Select services account
- Edit principals
- Role -> owner to full access
