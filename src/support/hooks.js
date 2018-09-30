var { After, Before, AfterAll, BeforeAll, setDefinitionFunctionWrapper } = require('cucumber');
var context = require('./context');

// TODO: If we add anothers hooks After/Before/AfterAll/BeforeAll,
//       setDefinitionFunctionWrapper functions may fail

// Before each scenario
// ! DO NOT DELETE or COMMENT OUT !
Before(function (scenario, callback) {
  if (context.debug) console.log('Before (before each scenario)');

  //context.something();

  callback();
});

// After each scenario
// ! DO NOT DELETE or COMMENT OUT !
After(function (scenario, callback) {
  if (context.debug) console.log('After (after each scenario)');

  //context.something();

  callback();
});

// Before all feature files (no world so no this !)
// ! DO NOT DELETE or COMMENT OUT !
BeforeAll(function (callback) {
  if (context.debug) console.log('BeforeAll (before all features files)');

  //context.something();

  callback();
});

// After all feature files (no world so no this !)
// ! DO NOT DELETE or COMMENT OUT !
AfterAll(function (callback) {
  if (context.debug) console.log('AfterAll (after all features files)');

  //context.something();

  callback();
});

// Before each feature file
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
        // TODO: Bad triggering of a before/after event (trapped)

        /* ******* BEFORE EACH FEATURE (file) ******** */
        if (isABeforeScenarioEvent(args[0]) && context.getCurrentFeature() !== args[0]) {
          var uri = args[0].sourceLocation.uri;
          if (context.debug) console.log('Wrapped Before each feature file : ' + uri);
          context.setCurrentFeature(args[0]);

          // Cleanup
          if (context.database) {
              context.database.clear();
              context.database = null;
          }

          // Add actions here
        }

        /* ***** AFTER EACH STEP ***** */
        if (isAnAfterScenarioEvent(args[0]) ||
            isAnAfterStepEvent()) {
          incrementCurrentStepNum = true;
          if (context.debug) console.log('Wrapped After each step : ' + context.currentScenario.pickle.steps[context.currentStepNum].text);

          // Add actions here
        }

        /* ***** AFTER EACH SCENARIO ***** */
        if (isAnAfterScenarioEvent(args[0])) {
          var pickle = args[0].pickle;
          var result = args[0].result;
          if (context.debug) console.log('Wrapped After each scenario : ' + pickle.name + ' ( ' + (context.currentStepNum+1) + ' steps)');
          if (context.debug) console.log(result);
          if (context.debug) console.log();

          // Add actions here
        }

        /* ***** BEFORE EACH SCENARIO ***** */
        if (isABeforeScenarioEvent(args[0])) {
          var pickle = args[0].pickle;
          var result = args[0].result;
          context.currentStepNum = -1;
          context.setCurrentScenario(args[0]);
          if (context.debug) console.log('Wrapped Before each scenario : ' + pickle.name);

          // Add actions here
        }

        /* ***** BEFORE EACH STEP ***** */
        if (!isABeforeScenarioEvent(args[0]) &&
            !isAnAfterScenarioEvent(args[0]) &&
             isABeforeStepEvent()) {
          incrementCurrentStepNum = true;
          context.setCurrentStep(context.currentScenario.pickle.steps[context.currentStepNum+1]);
          if (context.debug) console.log('Wrapped Before each step : ' + context.currentScenario.pickle.steps[context.currentStepNum+1].text);

          // Add actions here
        }
      } catch (e) {
        console.log('ERREUR : ' + e);
        console.log('currentFeature : ' + context.currentFeature);
        console.log('currentScenario : ' + context.currentScenario);
        console.log('currentStep : ' + context.currentStep);
        console.log('currentStepNum : ' + context.currentStepNum);
        console.log(e);
        console.log(args);
      } finally {
        if (incrementCurrentStepNum) context.currentStepNum++;
        return _fn.apply(this, args);
      }
    }
  }
});
