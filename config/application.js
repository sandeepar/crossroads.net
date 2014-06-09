/* Exports a function which returns an object that overrides the default &
 *   plugin grunt configuration object.
 *
 * You can familiarize yourself with Lineman's defaults by checking out:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/application.coffee
 *   - https://github.com/linemanjs/lineman/blob/master/config/plugins
 *
 * You can also ask Lineman's about config from the command line:
 *
 *   $ lineman config #=> to print the entire config
 *   $ lineman config concat.js #=> to see the JS config for the concat task.
 */
module.exports = function(lineman) {
    //Override application configuration here. Common examples follow in the comments.
    var app = lineman.config.application;
    return {
	// grunt-angular-templates assumes your module is named "app", but
	// you can override it like so:
	//
	ngtemplates: {
	    options: {
		module: "crossroads"
	    }
	},
	loadNpmTasks: app.loadNpmTasks.concat("grunt-jekyll", "grunt-nodemon"),
	prependTasks: {
	    common: ["jekyll"].concat(app.prependTasks.common)
	},
	removeTasks: {
	    dev: ["server"]
	},

	// grunt-angular-templates assumes your module is named "app", but
	// you can override it like so:
	//
	// ngtemplates: {
	//   options: {
	//     module: "myModuleName"
	//   }
	// }
	// Sass
	//
	// Lineman supports Sass via grunt-contrib-sass, which requires you first
	// have Ruby installed as well as the `sass` gem. To enable it, comment out the
	// following line:
	//
	enableSass: true,
	//ACTION: need to update this to generate a minified version once dev is complete
	sass: {
	    compile: {
		options: {
		    noCache: true
		},
	    }
	},
	jekyll: {
	    build: {
		options: {
		    src: 'app',
		    dest: 'generated',
		    bundleExec: true,
		    config: 'config/_config.yml'
		}
	    }
	},
	watch: {
	    jekyll: {
		files: [
		    "app/**/*.md",
		    "app/**/*.markdown",
		    "app/**/*.html",
		    "app/_data/*.yml"
		],
		tasks: ["jekyll:build", "sass:compile", "coffee", "concat_sourcemap"]
	    },
	    scss: {
		files: 'app/css/*.scss',
		tasks: ['sass:compile']
	    }
	},
	nodemon: {
	    dev: {
		script: 'server/server.js',
		ext: 'js,coffee',
		watch: ['server'],
		delay: 1000,
		legacyWatch: true
	    }
	}

    };
};
