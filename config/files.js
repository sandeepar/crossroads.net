/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
    //Override file patterns here
    return {
	js: {
	    vendor: [
		"vendor/js/underscore.js",
		"vendor/js/mediaelement-and-player.min.js",
		"vendor/bower/angular/angular.js",
		"vendor/bower/crossroadsMenu/dist/crossroadsMenu.js",
		"vendor/bower/masonry/dist/masonry.pkgd.js",
		"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js",
		"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js",
		"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js",
		"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js",
		"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js",
	  	"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js",
	  	"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js",
	  	"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js",
		"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js",
	  	"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js",
	  	"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js",
	  	"vendor/bower/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js",
		"vendor/js/**/*.js"
	    ],
	    app: [
		"app/js/app.js",
		"app/js/**/*.js"
	    ]
	}
    };
};
