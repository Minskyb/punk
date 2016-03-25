/**
 * Created by Administrator on 2016/3/18.
 */

module.exports = function(grunt){

    grunt.initConfig({

        pkg:grunt.file.readJSON('package.json'),
        banner:'/** version <%=pkg.version%> author <%=pkg.author%> **/',
        clean:{
            build:'www_build',
            dist:'dist',
            www: 'www/css'
        },
        concat:{
            options:{
                banner:'<%=banner%>'
            },
            dist:{
                src:[
                    'js/**/*.js',
                ],
                dest:'dist/js/<%=pkg.name%>.js'
            },
            www:{
                src:[
                    'www/css/main.css',
                    'www/lib/punk/css/punk.css'
                ],
                dest:'www/css/main.css'
            }
        },
        uglify:{
            dist:{
                src:'dist/js/<%=pkg.name%>.js',
                dest:'dist/js/<%=pkg.name%>.min.js'
            }
        },
        less:{
            dist:{
                options:{
                    strictMan:true,
                    sourceMap:true,
                    outputSourceFiles:true,
                    sourceMapURL:'<%=pkg.name%>.css.map',
                    sourceMapFilename:'dist/css/<%=pkg.name%>.css.map'
                },
                src:'less/<%=pkg.name%>.less',
                dest:'dist/css/<%=pkg.name%>.css'
            },
            www:{
                options:{
                    strictMan:true,
                    sourceMap:true,
                    outputSourceFiles:true,
                    sourceMapURL:'main.css.map',
                    sourceMapFilename:'www/css/main.css.map'
                },
                src:'www/less/li.less',
                dest:'www/css/main.css'
            }
        },
        cssmin:{
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            dist:{
                src:'dist/css/<%=pkg.name%>.css',
                dest:'dist/css/<%=pkg.name%>.min.css'
            },
            www:{
                src:'www/css/main.css',
                dest:'www/css/mian.min.css'
            }
        },
        watch:{
            dist:{
                files:[
                    'less/**/*.less',
                    'js/*.js'
                ],
                tasks:['dist.watch','www.watch']
            },
            www:{
                files:['www/less/**/*.less'],
                tasks:['www.watch']
            }
        },
        copy:{
            dist:{
                expand:true,
                cwd:'dist/',
                src:'**/*.*',
                dest:'www/lib/punk'
            },
            dcss:{
                expand:true,
                cwd:'dist',
                src:'css/**/*.*',
                dest:"www/lib/punk"
            },
            djs:{
                expand:true,
                cwd:'dist',
                src:'js/**/*.*',
                dest:"www/lib/punk"
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dist.watch',[
        'clean:dist',
        'concat:dist',
        'uglify:dist',
        'less:dist',
        'cssmin:dist',
        'copy:dist'
    ])

    grunt.registerTask('dist',[
        'clean:dist',
        'concat:dist',
        'uglify:dist',
        'less:dist',
        'cssmin:dist',
        'copy:dist',
        'watch'
    ]);

    grunt.registerTask('www.watch',[
        'clean:www',
        'less:www',
        'concat:www',
        'cssmin:www'
    ]);

    grunt.registerTask('www',[
        'clean:www',
        'less:www',
        'concat:www',
        'cssmin:www',
        'watch:www'
    ]);
};