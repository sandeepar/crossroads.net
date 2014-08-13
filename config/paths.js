module.exports = {
  specs: ['spec/js/**/*.coffee', 'modules/**/spec/js/**/*.coffee'],
  templates: ['app/templates/**/*.html', 'modules/**/templates/**/*.html'],
  scripts: ['modules/**/js/module.coffee', 'modules/**/js/**/*.coffee', 'app/js/app.coffee', 'app/js/**/*.coffee'],
  sass: ['app/scss/**/*.scss', 'modules/**/css/**/*.scss']
};
