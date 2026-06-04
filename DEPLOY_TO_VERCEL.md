Deployment to Vercel (boldpathHr)

Quick options:

1) Deploy locally with Vercel CLI

- Install CLI: `npm i -g vercel`
- Log in: `vercel login`
- From project root run:

```
vercel --prod --name boldpathHr
```

This will create a new Vercel project named `boldpathHr` and deploy the static site using `vercel.json`.

Notes:
- The repository currently contains an Express server at `api/server.js`. The `vercel.json` is configured to deploy only the static frontend (HTML/CSS/JS). If you want the API to run on Vercel, the server must be refactored into serverless functions under `api/` that export request handlers.

2) Deploy via Git integration

- Push the repository to GitHub (or GitLab/Bitbucket).
- In the Vercel dashboard, "New Project" → import your repo.
- Set the project name to `boldpathHr` during import.
- Vercel will use `vercel.json` to serve static files.

If you want, I can:
- Convert the Express API into Vercel serverless functions (automate most routes), or
- Help set up a separate deployment for the API (Heroku/Render) and wire environment variables.

3) Automatic deploys via GitHub Actions

- Create a repository on GitHub and push this project.
- In your GitHub repo settings -> Secrets -> Actions, add a new secret named `VERCEL_TOKEN` containing a Vercel personal token (create one at https://vercel.com/account/tokens).
- The repository already contains a workflow at `.github/workflows/deploy-vercel.yml` which deploys on push to `main` or `master` using that secret.

Workflow behavior:

- On push, the Action installs the Vercel CLI and runs:

```
vercel --prod --confirm --token $VERCEL_TOKEN --name boldpathHr
```

- The workflow deploys the static frontend defined by `vercel.json`.

If you'd like, I can update the workflow to pass `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` or add environment-specific branches.
