module.exports = function(grunt) {
  var getSvgFileNames = function() {
    return [
      'form_logo_triangle.svg',
      'icon_burger.svg',
      'icon_calendar.svg',
      'icon_cross.svg',
      'icon_facebook.svg',
      'icon_gift.svg',
      'icon_house.svg',
      'icon_menu.svg',
      'icon_minus.svg',
      'icon_plus.svg',
      'icon_twitter.svg',
      'icon_youtube.svg',
      'logo_glukhanko.svg',
      'logo_htmlacademy.svg',
      'text_becausecanyon.svg',
      'text_sedona.svg',
      'text_tothegorgeous.svg',
      'text_welcome.svg',
    ];
  };
      
  var getSvgMinFiles = function(sourceFolder, targetFolder) {
    var fileNames = getSvgFileNames();
    var result = {};
    for (var index = 0; index < fileNames.length; index++) {
      var fileName = fileNames[index];
      var sourceFile = sourceFolder + "/" + fileName;
      var targetFile = targetFolder + "/" + fileName;
      result[targetFile] = sourceFile;
    }
    return result;
  };
      
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    lintspaces: {
      all: {
        src: [
          '*.html'
        ],
        options: {
          newline: true,
          newlineMaximum: 2,
          trailingspaces: true,
          indentationGuess: true,
          editorconfig: '.editorconfig',
          ignores: [
            'html-comments',
            'js-comments'
          ],
          showTypes: true,
          showCodes: true
        }
      }
    },

    less: {
      style: {
        files: {
          'css/style.css': ['less/style.less']
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      style: {
        src: 'css/style.css'
      }
    },

    cmq: {
      style: {
        files: {
          'css/style.css': ['css/style.css']
        }
      }
    },

    watch: {
      style: {
        files: ['less/**/*.less'],
        tasks: ['style'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['*.html'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },
    
    grunticon: {
      images: {
        files: [{
          expand: true,
          cwd: '_sources/sprites',
          src: ['*.svg', '*.png'],
          dest: 'css/sprites'
        }],
        options: {
          datasvgcss: 'icons-svg.css',
          datapngcss: 'icons-png.css',
          urlpngcss:  'icons-fallback.css',
          loadersnippet: '../../js/spriteloader.js',
          pngfolder: '../../img/sprites',
          pngpath: 'img/sprites',
          compressPNG: true,
          enhanceSVG: true,
          corsEmbed: true
        }
      }
    },
    
    svginject: {
      all : {
        options: {},
        files: {
           'js/svginjector.js': ['_sources/svg/min/*.svg'],
        }
      }
    },
    
    svgmin: {
        options: {
            plugins: [
                {
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }
            ]
        },
        dist: {
            files: getSvgMinFiles('_sources/svg', '_sources/svg/min')
        }
    }

  });
    
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-svginject');

  grunt.registerTask('default', [
    'less',
    'autoprefixer',
    'cmq',
    'watch'
  ]);

  grunt.registerTask('style', [
    'less',
    'autoprefixer',
    'cmq',
  ]);
    
  grunt.registerTask('images', [
    /*'grunticon:images',*/
    'svgmin',
    'svginject:all'
  ]);
};