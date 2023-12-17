# Using Vite

Run in development mode:

```
npm run dev
```

Prod build:

```
npm run build
```

# Firebase

List of projects assigned to app

```
firebase use
```

Switch projects:

```
firebase use prod
firebase use default
```

Deploy:

```
firebase deploy
```

## Errors

1) `Error: Failed to get Firebase project project-name. Please make sure the project exists and your account has permission to access it`

    Fix: 
    
    ```
    firebase login --reauth
    ```
