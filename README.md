crossroads.net
==============

Code base for Milacron.
Please feel free to contribute by forking and doing a pull request

## Local Development
crossroads.net uses GulpJS to manage and run things in local development.

For more information about Gulp visit: http://gulpjs.com

### Prerequisites
* npm (comes with node, http://nodejs.org/)
* Ruby 2.0.0 (version 2.0.0-p451 or higher, https://www.ruby-lang.org)
* local Redis 2.0 or higher in order to run the node server and store sessions.

### Setup
* ```npm install```
* you may want to install gulp globally, ```npm -g install gulp```
* ```gem install bundler```
* ```bundle install```

### Running the project
To run the project use: ```gulp```

If you would prefer to disable the growl notifications you may run: ```gulp -n```

This will watch the filesystem and compile all the sass into css,
coffeescript into javascript and run jekyll-build as well. This will also run
the node server making the site available at localhost:3000

### Running the specs
To run specs use: ```gulp test```

This will run the AngularJS spec headlessly in phantomjs, which you will need to have installed.

### Codeship
We're on the codeship. The project is at: https://www.codeship.io/projects/20882. Codeship is setup to automatically deploy to heroku at: http://crdschurch-dev2.herokuapp.com/

### Setting up project on windows machine
It takes a little extra effort to get Jekyll running on a windows machine.  These resources were helpful...
* http://yizeng.me/2013/05/10/setup-jekyll-on-windows/
* https://github.com/juthilo/run-jekyll-on-windows/
* http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html
