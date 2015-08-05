[![Build Status](https://travis-ci.org/el-sonny/ctbook-front.svg?branch=master)](https://travis-ci.org/el-sonny/ctbook-front)
[![Code Climate](https://codeclimate.com/github/el-sonny/ctbook-front/badges/gpa.svg)](https://codeclimate.com/github/el-sonny/ctbook-front)
[![Test Coverage](https://codeclimate.com/github/el-sonny/ctbook-front/badges/coverage.svg)](https://codeclimate.com/github/el-sonny/ctbook-front/coverage)
[![GitHub issues](https://img.shields.io/github/issues/el-sonny/ctbook-front.svg)](https://github.com/el-sonny/ctbook-front/issues)
[![Dependency Status](https://gemnasium.com/el-sonny/ctbook-front.svg)](https://gemnasium.com/el-sonny/ctbook-front)

# ctbook-front

Single page application (SPA) made with Yeoman-angular that connects to ctbook-api

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run unit and end to end tests

Running `grunt karma` will run unit tests with karma.

Running `grunt protractor` will run unit tests with protractor. Server must be running on port 9000

## Deployment

Proyect includes configuration for deployment with [divshot](divshot.io) you can change the app name in `divshot.json` and use `divshot push` to deploy your own copy.