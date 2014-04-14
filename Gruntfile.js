module.exports = function(grunt) {

  // Load tasks provided by each plugin
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
	
   // Project configuration
  grunt.initConfig({
      compass: {
          dist: {
              options: {
                  config: 'config.rb'
              }
          }
      },
      cssmin: {
          minify: {
              expand: true,
              cwd: 'clientside/stylesheets/',
              src: ['*.css', '!*.min.css'],
              dest: 'clientside/stylesheets/min/',
              ext: '.min.css'
          }
      }

  });

  grunt.registerTask('default', ['compass','cssmin']);

}
