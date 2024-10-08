#!/usr/bin/env bash

set -e

function setupGitHooks()
{
  echo "Initialising git hooks..."
  ln -sf "$PWD/tools/git-hooks/prepare-commit-msg.sh" ".git/hooks/prepare-commit-msg"
  echo "Done"
}

setupGitHooks