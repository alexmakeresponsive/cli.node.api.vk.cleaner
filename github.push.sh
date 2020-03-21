#/bin/sh

eval "$(ssh-agent -s)"

ssh-add -K ~/.ssh/github_alexmakeresponsive

git push origin master