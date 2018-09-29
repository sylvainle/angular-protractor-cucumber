var context = require('./context');

module.exports = function Hooks() {

    this.registerHandler('BeforeFeature', function (feature, callback) {
        console.log('BeforeFeature');
        context.setCurrentFeature(feature);

        callback();
    });

    /**
     * Clear database if mocked with HttpBackend
     */
    this.registerHandler('AfterFeature', function (feature, callback) {
        console.log('AfterFeature');
        if (context.database) {
            context.database.clear();
            context.database = null;
        }

        callback();
    });

    this.registerHandler('BeforeScenario', function (scenario, callback) {
        console.log('BeforeScenario');
        context.setCurrentScenario(scenario);

        callback();
    });

    this.registerHandler('BeforeStep', function (step, callback) {
        console.log('BeforeStep');
        context.setCurrentStep(step);

        callback();
    });
};
