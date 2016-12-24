/**
 * Created by kumardivyarajat on 24/12/16.
 */

var grunt = require("grunt");

module.exports = function (grunt) {

    var env = grunt.option('target') || 'dev';
    //grunt wrapper function
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt task configuration will go here
        concat: {
            jasmineJs: { //target
                src: [
                    'src/libs/jasmine/lib/jasmine-core/jasmine.js',
                    'src/libs/jasmine/lib/jasmine-core/jasmine-html.js',
                    'src/libs/jasmine/lib/jasmine-core/boot.js'
                ],
                dest: 'dist/js/jasmine.js'
            },
            distJs: {
                src: [
                    'src/libs/jquery/dist/jquery.min.js',
                    'src/libs/jasmine-jquery/lib/jasmine-jquery.js',
                    'src/libs/handlebars/handlebars.min.js',
                    'src/libs/lodash/dist/lodash.min.js'],
                dest: 'dist/js/vendors.min.js'
            },
            appJs: {
                src: [
                    'src/js/app.js',
                    'specs/feedreader.js'
                ],
                dest: 'dist/js/app.js'
            },
            appCss: {
                src: ['src/css/*', 'src/libs/jasmine/lib/jasmine-core/jasmine.css'],
                dest: 'dist/css/style.css'
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: env !== 'dev'
                }
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: ['**/*.js', '!*.min.js'],
                    dest: 'dist/js',
                    ext: '.min.js'
                }]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });
    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //register grunt default task
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
