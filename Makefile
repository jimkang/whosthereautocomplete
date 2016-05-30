PROJECTNAME = whosthereautocomplete
HOMEDIR = $(shell pwd)
USER = bot
SERVER = smidgeo
SSHCMD = ssh $(USER)@$(SERVER)
APPDIR = /opt/$(PROJECTNAME)

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(USER)@$(SERVER):/opt --exclude node_modules/
	$(SSHCMD) "cd $(APPDIR) && npm install"

test:
	node tests/basictests.js

run:
	node post-joke.js
