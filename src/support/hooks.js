var { After, Before, AfterAll, BeforeAll, setDefinitionFunctionWrapper } = require('cucumber');
var context = require('./context');

// TODO: If we add anothers hooks After/Before/AfterAll/BeforeAll,
//       setDefinitionFunctionWrapper functions may fail

// Before each scenario
// ! DO NOT DELETE or COMMENT OUT !
Before(function (scenario, callback) {
  //context.something();

  callback();
});

// After each scenario
// ! DO NOT DELETE or COMMENT OUT !
After(function (scenario, callback) {
  //context.something();

  callback();
});

// Before all scenario (no world so no this !)
// ! DO NOT DELETE or COMMENT OUT !
BeforeAll(function (callback) {
  //context.something();

  callback();
});

// After all scenario (no world so no this !)
// ! DO NOT DELETE or COMMENT OUT !
AfterAll(function (callback) {
  //context.something();

  callback();
});

// Before each scenario (another way)
// Before each step
// After each step
// After each scenario (another way)
function isFunction(objectToCheck) {
  return objectToCheck && {}.toString.call(objectToCheck) === '[object Function]';
};
function isABeforeScenarioEvent(objectToCheck) {
  return objectToCheck &&
        !isFunction(objectToCheck) &&
        typeof objectToCheck.pickle !== 'undefined' && objectToCheck.pickle !== null &&
       (typeof objectToCheck.result === 'undefined' || objectToCheck.result === null);
};
function isAnAfterScenarioEvent(objectToCheck) {
  return objectToCheck &&
        !isFunction(objectToCheck) &&
        typeof objectToCheck.pickle !== 'undefined' && objectToCheck.pickle !== null &&
        typeof objectToCheck.result !== 'undefined' && objectToCheck.result !== null;
};
function isABeforeStepEvent() {
  return context.currentStepNum >= -1 && context.currentStepNum < context.currentScenario.pickle.steps.length;
};
function isAnAfterStepEvent() {
  return context.currentStepNum >= 0 && context.currentStepNum < context.currentScenario.pickle.steps.length;
};
setDefinitionFunctionWrapper(function(fn, opts) {
  var _fn = fn;

  if (opts && opts.noWrap) {
    return fn;
  } else {
    return function(...args) {
      var incrementCurrentStepNum = false;
      try {
        /* ***** AFTER EACH STEP ***** */
        if (isAnAfterScenarioEvent(args[0]) ||
            isAnAfterStepEvent()) {
          incrementCurrentStepNum = true;
          console.log('After step : ' + context.currentScenario.pickle.steps[context.currentStepNum].text);
          // Add actions here
        }

        /* ***** AFTER EACH SCENARIO ***** */
        if (isAnAfterScenarioEvent(args[0])) {
          var pickle = args[0].pickle;
          var result = args[0].result;
          console.log('After scenario : ' + pickle.name + ' ( ' + (context.currentStepNum+1) + ' steps)');
          console.log(result);
          console.log();
          // Add actions here
        }

        /* ***** BEFORE EACH SCENARIO ***** */
        if (isABeforeScenarioEvent(args[0])) {
          var pickle = args[0].pickle;
          var result = args[0].result;
          context.currentStepNum = -1;
          context.setCurrentScenario(args[0]);
          console.log('Before scenario : ' + pickle.name);
          // Add actions here
        }

        /* ***** BEFORE EACH STEP ***** */
        if (!isABeforeScenarioEvent(args[0]) &&
            !isAnAfterScenarioEvent(args[0]) &&
             isABeforeStepEvent()) {
          incrementCurrentStepNum = true;
          context.setCurrentStep(context.currentScenario.pickle.steps[context.currentStepNum+1]);
          console.log('Before step : ' + context.currentScenario.pickle.steps[context.currentStepNum+1].text);
          // Add actions here
        }
      } catch (e) {
        console.log('ERREUR : ' + e);
        console.log(args);
      } finally {
        if (incrementCurrentStepNum) context.currentStepNum++;
        return _fn.apply(this, args);
      }
    }
  }
});


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

    this.registerHandler('BeforeStep', function (step, callback) {
        console.log('BeforeStep');
        context.setCurrentStep(step);

        callback();
    });
};
