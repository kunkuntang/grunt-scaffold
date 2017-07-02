const mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {
    // 显示各任务执行的时间
    require('time-grunt')(grunt);

    // 自动加载grunt任务（不能按需加载）
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            html: {
                files: ['src/**/*.html'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['server.js', 'public/js/**/*.js'],
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

        jshint: {
            all: ['public/js/*.js', 'asset/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            extensions: 'js',
            ignores: ['/node_modules/**/*']
        },

        uglify: {
            generated: {
                options: {
                    mangle: {
                        reserved: ['jQuery']
                    },
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    src: ['dist/assets/js/*.js', '!dist/assets/js/*.min.js'],
                    dest: 'dist/assets',
                    cwd: '.',
                    rename: function (dst, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        // return dst + '/' + src.replace('.js', '.min.js');
                        // Or to override to src:
                        return src;
                    }
                }, {
                    expand: true,
                    src: ['dist/js/*.js', '!dist/js/*.min.js'],
                    dest: 'dist/js',
                    cwd: '.',
                    rename: function (dst, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        // return dst + '/' + src.replace('.js', '.min.js');
                        // Or to override to src:
                        return src;
                    }
                }]
            }
        },

        htmlmin: {
            build: {
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.html', '*.html'],
                    dest: 'dist'
                }]
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        imagemin: {
            build: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()] // Example plugin usage
                },
                files: [{
                    expand: true,
                    cwd: 'public/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img'
                }]
            }
        },

        clean: {
            dist: {
                src: ['dist/*']
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.js', '**/*.css'],
                        dest: 'dist/',
                        cwd: 'src/'
                        // flatten: true       // 是否展平目录里的文件，即把源目录下的文件全都拷到同一层
                    }, {
                        expand: true,
                        src: ['**/*'],  // 拷贝的源路径
                        cwd: 'public/',
                        dest: 'dist/',       // 拷贝的目标目录
                        //filter: 'isFile'     // 为true是拷贝仅含有文件的文件夹
                    }
                ]
            }
        },

        concurrent: {
            target: ['watch', 'nodemon'],
            build: [
                'uglify:generated',
                'htmlmin:build',
                'cssmin',
                'imagemin'
            ],
            options: {
                logConcurrentOutput: true
            }
        }
    })


    // grunt.loadNpmTasks('grunt-contrib-watch')    // 自动刷新
    // grunt.loadNpmTasks('grunt-nodemon')          // 服务器
    // grunt.loadNpmTasks('grunt-concurrent')       // 并行执行任务
    // grunt.loadNpmTasks('grunt-mocha-test')       // mocha测试
    // grunt.loadNpmTasks('grunt-contrib-jshint')   // jshint格式检查
    // grunt.loadNpmTasks('grunt-open');            //

    grunt.option('force', true)

    grunt.registerTask('default', ['concurrent'])
    grunt.registerTask('build', [
        'clean',
        // 'copy',
        'concurrent:build'
    ])
    grunt.registerTask('test', ['mochaTest'])
}