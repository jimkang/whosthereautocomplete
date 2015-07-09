HOMEDIR = $(shell pwd)
GITDIR = /var/repos/whosthereautocomplete.git

test:
	node tests/basictests.js

run:
	node post-joke.js

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install

pushall:
	git push origin master && git push server master

