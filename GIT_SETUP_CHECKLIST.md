# Git Setup Checklist

## Goal

Make sure both team members have a working Git/GitHub setup, and complete one full **branch → commit → push → pull request → review → merge** workflow before React development starts.

Run the commands below in your terminal. After cloning the repository, run all remaining commands from the `jobtrack-react` folder.

## 1. Check the local development environment

Check that Git, Node.js, and npm are installed:

```bash
git --version
node -v
npm -v
```

Each command should display a version number. If a command is not found, install the missing tool before continuing. Both team members should use the same Node.js major version.

Check your Git identity:

```bash
git config --global user.name
git config --global user.email
```

If your identity has not been configured, run:

```bash
git config --global user.name "Zhang Xun Johnson"
git config --global user.email "your-github-email@example.com"
```

Replace the example email with an email associated with your GitHub account, or your GitHub-provided private commit email. These global settings apply to all repositories on your computer.

## 2. Confirm access to the shared GitHub repository

Accept the collaborator invitation for [jobtrack-react](https://github.com/zhxunzh84/jobtrack-react).

Clone the repository and open its folder:

```bash
git clone https://github.com/zhxunzh84/jobtrack-react.git
cd jobtrack-react
```

If you have already cloned it, open the existing folder instead of cloning it again.

Check the repository:

```bash
git status
git remote -v
```

You should see something similar to:

```text
On branch main
nothing to commit, working tree clean
```

The remote should point to the shared repository:

```text
origin  https://github.com/zhxunzh84/jobtrack-react.git (fetch)
origin  https://github.com/zhxunzh84/jobtrack-react.git (push)
```

## 3. Sync `main` before starting new work

Before creating a new branch, run:

```bash
git checkout main
git pull origin main
```

Both team members should do this before starting each new feature. If you have unfinished local changes, commit them on their current branch before switching branches.

## 4. Create a test branch

Create a separate branch for this setup check:

```bash
git checkout -b test/kenneth-git-setup
```

Check the current branch:

```bash
git branch
```

The asterisk marks your current branch. You should see:

```text
  main
* test/yourname-git-setup
```

## 5. Create a simple test file

Using your code editor, create a file named `yourname-test.txt` in the root of the repository, with this content:

```text
Git setup verified by Kenneth.
```

Save the file, then run:

```bash
git status
```

The file should appear under **Untracked files**. This means Git sees the file but has not started tracking it yet.

## 6. Add and commit the file

Stage the file and create a commit:

```bash
git add yourname-test.txt
git commit -m "Verify my Git setup"
```

`git add` selects the changes to include. `git commit` saves those changes in your local Git history.

## 7. Push the branch to GitHub

```bash
git push -u origin test/yourname-git-setup
```

This uploads your branch to GitHub. The `-u` option connects your local branch to its remote branch, so later pushes from this branch can use `git push`.

If Git asks you to sign in, follow the GitHub authentication prompts. Your GitHub account password is not used as an HTTPS Git password.

## 8. Create a Pull Request on GitHub

Open the [repository on GitHub](https://github.com/zhxunzh84/jobtrack-react) and create a pull request (PR). You can use **Compare & pull request** if it appears, or open **Pull requests → New pull request**.

Select:

```text
base: main
compare: test/kenneth-git-setup
```

Use this title:

```text
Verify Kenneth Git setup
```

Suggested description:

```text
Adds kenneth-test.txt to verify my local Git setup, repository access,
and branch → commit → push → pull request workflow.
```

Check that the PR contains only the intended test file, then create it. Ask your teammate to review it and merge it after approval.

## 9. Sync after the PR is merged

Once the PR has been merged on GitHub, update your local `main` branch:

```bash
git checkout main
git pull origin main
```

Confirm that `yourname-test.txt` is now present on `main`.

You can then delete the local test branch:

```bash
git branch -d test/yourname-git-setup
```

If Git refuses because it considers the branch unmerged, keep the branch and check with your teammate. This can happen after a squash merge.

You can also delete the remote test branch using **Delete branch** on the merged PR page.

## 10. Standard project workflow

Use this workflow for future features:

```text
Switch to main
↓
Pull the latest changes
↓
Create a feature branch
↓
Write and check your code
↓
Review and stage your changes
↓
Commit
↓
Push the branch
↓
Create a pull request
↓
Teammate review
↓
Merge
↓
Switch to main and pull again
```

Example commands to start a feature:

```bash
git checkout main
git pull origin main
git checkout -b feature/add-job-form
```

After making and checking your changes:

```bash
git status
git diff
git add path/to/changed-file
git commit -m "Add job application form"
git push -u origin feature/add-job-form
```

Replace `path/to/changed-file` with the actual file path. Repeat `git add` for each file you want to include, then create a PR on GitHub.

Work on a feature branch, keep commits focused, and have your teammate review the PR before merging into `main`.
