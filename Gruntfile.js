module.exports = function( grunt ) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({

    compass: {
      dist: {
        options: {
          config: 'config.rb',
          outputStyle: 'compressed',
          force: true
        }
      }
    },
          
  	concat: {
  		options: {
  			separator: ''
  		},
  		dist: {
  			src: [
  				'assets/js/classes/*.js', 
  				'assets/js/main.dev.js'
  			],
  			dest: 'assets/js/main.js'
  		}
  	},

    watch: {
      compass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/**/*.scss'
        ],
        tasks: [ 'compass' ]
      },
      js: {
        files: [
          'assets/js/classes/*.js', 
          'assets/js/main.dev.js'
        ],
        tasks: ['concat']
      }
    }
  
  });

  grunt.registerTask( 'default', function() {

    grunt.task.run([ 
      'compass', 
      'concat', 
      'watch' 
    ]);

  });
    
};