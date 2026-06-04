#!/usr/bin/env bash
# Helper to create GitHub repo, push current project, and set VERCEL_TOKEN secret
# Usage: ./scripts/create_github_and_set_secret.sh <github-repo-name> [org-or-user]

set -euo pipefail
REPO_NAME="$1"
OWNER=${2:-"$(gh api user --jq .login 2>/dev/null || echo '')"}

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI not found. Install from https://cli.github.com/"
  exit 1
fi

if [ -z "$OWNER" ]; then
  echo "Unable to detect GitHub owner. Pass the owner as second arg or configure gh CLI."
  exit 1
fi

# Create repo (private=false)
gh repo create "$OWNER/$REPO_NAME" --public --source=. --remote=origin --push

# Ask for Vercel token and set as secret
read -s -p "Enter Vercel personal token: " VERCEL_TOKEN
echo

gh secret set VERCEL_TOKEN -b"$VERCEL_TOKEN"

echo "Repository created and VERCEL_TOKEN secret set. Workflow will run on push to main/master." 
