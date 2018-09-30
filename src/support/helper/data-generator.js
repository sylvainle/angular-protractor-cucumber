'use strict';

var faker = require('faker');

// TODO: Need to be tested

module.exports = function DataGeneratorHelper() {
    var memorized_strings = {};

    return {
        generate: function (category, type, mem) {
            if (memorized_strings[mem]) {
                return memorized_strings[mem];
            }

            return memorized_strings[mem] = faker[category][type]();
        }
    };
}();
