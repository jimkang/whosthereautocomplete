HOMEDIR = $(shell pwd)
GITDIR = /var/repos/bdd-poetry.git

test:
	node tests/basictests.js

run:
	node post-bdd-poem.js

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install
