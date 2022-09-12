# Ecommerce Node Backend

This is a simple ecommerce backend API to use with your frontend store.

# Collaboration & starting guide

**New developers welcome**

## Prerequisite:
- node: ">=16.0.0"
- npm: ">=7.0.0"
- MongoDB installed and running locally or in Atlas

## Starting:
    git clone https://github.com/Eloi-Perez/ecommerce-node-backend.git
    cd ecommerce-node-backend
    git checkout -b userName@feature

**Now create .env file, copy the keys from .env.example and add your config** (email config is not needed as the email sending is commented atm for testing new features easily)

    npm install
    npm run dev

## Style guide:

- no ``;`` at the end of the line
- ``''`` instead of ``""`` on JS code
- 2 spaces indenting
- variable names in camelCase: 	``newVariable``
- new files names:		``new-file``
- new folder names:		``new-folder``

## Git committing guide:

    git add --all
    git commit -m "feat: amazing feature description"

- feat: The new feature you're adding to a particular application
- fix: A bug fix
- style: Feature and updates related to styling
- refactor: Refactoring a specific section of the codebase
- test: Everything related to testing
- docs: Everything related to documentation
- chore: Regular code maintenance, update packages

## Contributing:

### Do multiple commits with small features

Once you have something functional push your code

### First push

    git push --set-upstream origin your-branch-name

### After the first one

    git push

**Once your feature or fix is finished, resolve conflicts before Pull Request**

    git merge origin/main
    git push

### Now Go to GitHub and create a Pull Request
**I will review the Pull Request and merge it**