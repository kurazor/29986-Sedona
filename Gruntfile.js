module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    
    clean: {
      build: {
        src: ['build']
      }
    },
    
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'sources',
          src: [
            "img/**",
            "js/**",
            "*.html",
            "!**/*.md"
          ],
          dest: 'build'
        }]
      }
    },
    
    less: {
      build: {
        files: {
          'build/css/style.css': ['sources/less/style.less']
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      build: {
        src: 'build/css/style.css'
      }
    },

    cmq: {
      build: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },
    
    cssmin: {
      build: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          'build/css/style.min.css': [ 'build/css/style.css' ]
        }
      }
    },
    
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },
    
    imagemin: {
      build: {
        options: {
          optimizationLevel: 3 
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },
    
    svginject: {
      build : {
        options: {},
        files: {
           'build/js/svginjector.js': ['build/img/**/*.svg'],
        }
      }
    },

    watch: {
      build: {
        files: ['sources/**'],
        tasks: ['build'],
        options: {
          spawn: false,
          livereload: true
        },
      }
    },
    
  });
  
  grunt.registerTask('default', [
    'build',
    'watch'
  ]);
  
  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'autoprefixer',
    'cmq',
    'cssmin',
    'htmlmin',
    'imagemin',
    'svginject'
  ]);
  
};