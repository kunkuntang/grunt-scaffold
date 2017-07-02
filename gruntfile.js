module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            html: {
                files: ['src/*.html'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['server.js', 'public/js/**'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: '3000'
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js,coffee',
                    watch: ['server'],
                    delay: 1000,
                    legacyWatch: true
                }
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },

        concurrent: {
        	target: ['watch', 'nodemon'],
        	options: {
                logConcurrentOutput: true
            }
    	}
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-mocha-test')

    grunt.option('force', true)

    grunt.registerTask('default', ['concurrent'])
    grunt.registerTask('test', ['mochaTest'])
}