const mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    // 显示各任务执行的时间
    require('time-grunt')(grunt);

    // 自动加载grunt任务（不能按需加载）
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            html: {
                files: ['src/**/*.html']
            },
            js: {
                files: ['server.js', 'public/js/**/*.js']
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
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

                    sourceMap: true,
                    compress: true
                },
                files: [{
                    expand: true,
                    src: ['**/*.js'],
                    dest: 'dist/asset/js',
                    cwd: 'src/asset/js',
                    rename: function(dst, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        // return dst + '/' + src.replace('.js', '.min.js');
                        // Or to override to src:
                        // return dst + '/' + src.replace('.js', '.min.js');
                        return dst + '/' + src;
                    }
                }]
            }
        },

        htmlmin: {
            build: {
                options: { // Target options
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
                    cwd: 'src/asset/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/asset/css',
                    //ext: '.min.css'
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
                    cwd: 'src/asset/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/asset/img'
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
                files: [{
                    expand: true,
                    src: ['**/*.js', '**/*'], // 拷贝的源路径
                    cwd: 'src/',
                    dest: 'dist/', // 拷贝的目标目录
                    //filter: 'isFile'     // 为true是拷贝仅含有文件的文件夹
                }]
            }
        },

        browserSync: {
            bsFiles: {
                src: [
                    'src/css/*.css',
                    'src/js/*.js',
                    'src/**/*.html'
                ]
            },
            options: {
                server: {
                    baseDir: "./src"
                }
            }
        },

        concurrent: {
            target: ['watch', 'browserSync'],
            build: [
                'uglify:generated',
                'htmlmin:build',
                'cssmin',
                'imagemin',
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