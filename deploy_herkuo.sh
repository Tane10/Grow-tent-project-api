#! /bin/zsh
heroku container:push --app=fathomless-crag-53362 web
heroku container:release --app=fathomless-crag-53362 web