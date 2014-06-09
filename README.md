crossroads.net
==============
 
Code base for Milacron.
Please feel free to contribute by forking and doing a pull request

## Local Development
crossroads.net uses LinemanJs to manage and run things in local development.

For more information about Lineman visit: http://linemanjs.com

### Prerequisites
* npm (comes with node, http://nodejs.org/)
* Ruby 2.0.0 (version 2.0.0-p451 or higher, https://www.ruby-lang.org)

### Setup
* ```npm install```
* you may want to install lineman globally, ```sudo npm -g install lineman```
* ```gem install bundle```
* ```bundle install```

### Running the project
To run the project use: ```lineman run```

Then you will need to also start NodeMon in another terminal window.
You can do this by using: ```lineman grunt nodemon```

This will watch the filesystem and compile all the sass into css,
coffeescript into javascript and run jkyll-build as well.

### Running the specs
To run specs use: ```lineman spec```

This will start the Testem spec runner.

### Running specs headlessly
```lineman spec-ci```
This uses phantomjs, which you will need to have installed.

### Codeship
We're on the codeship. The project is at: https://www.codeship.io/projects/20882. Codeship is setup to automatically deploy to heroku at: http://crdschurch-dev2.herokuapp.com/

### Setting up project on windows machine
It takes a little extra effort to get Jekyll running on a windows machine.  These resources were helpful...
* http://yizeng.me/2013/05/10/setup-jekyll-on-windows/
* https://github.com/juthilo/run-jekyll-on-windows/
* http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html
