var { After, Before, AfterAll, BeforeAll, setDefinitionFunctionWrapper } = require('cucumber');
var context = require('./context');

// Before each scenario
Before(function (scenario, callback) {
  try {
    context.setCurrentScenario(scenario);
    if (context.debug) console.log('Classic Before each scenario : ' + scenario.pickle.name);
  } finally {
    callback();
  }
});

// After each scenario
After(function (scenario, callback) {
  try {
    if (context.debug) console.log('Classic After each scenario : ' + scenario.pickle.name + ' - duration (s) : ' + scenario.result.duration + ' - status ' + scenario.result.status);
    if (context.debug) console.log();
    // Cleanup
    /*if (context.database) {
        context.database.clear();
        context.database = null;
    }*/
  } finally {
    callback();
  }
});

// Before all feature files (no world so no this !)
BeforeAll(function (callback) {
  try {
    if (context.debug) console.log('Classic BeforeAll features files');
  } finally {
    callback();
  }
});

// After all feature files (no world so no this !)
AfterAll(function (callback) {
  if (context.debug) console.log('Classic AfterAll features files');
  //context.something();

  callback();
});

// Wrapped
function isFunction(objectToCheck) {
  return objectToCheck && {}.toString.call(objectToCheck) === '[object Function]';
};
function isABeforeScenarioEvent(objectToCheck) {
  return objectToCheck &&
        !isFunction(objectToCheck) &&
        context.currentScenario === null &&
        typeof objectToCheck.pickle !== 'undefined' && objectToCheck.pickle !== null &&
       (typeof objectToCheck.result === 'undefined' || objectToCheck.result === null);
};
function isAnAfterScenarioEvent(objectToCheck) {
  return objectToCheck &&
        !isFunction(objectToCheck) &&
        typeof objectToCheck.pickle !== 'undefined' && objectToCheck.pickle !== null &&
        typeof objectToCheck.result !== 'undefined' && objectToCheck.result !== null &&
        (context.currentStepNum+1) === context.currentScenario.pickle.steps.length;
};
function isABeforeStepEvent(objectToCheck) {
  return typeof objectToCheck !== 'undefined' && objectToCheck !== null &&
         typeof objectToCheck.pickle !== 'undefined' && objectToCheck.pickle !== null &&
         typeof objectToCheck.pickle.steps !== 'undefined' && objectToCheck.pickle.steps !== null &&
         (typeof objectToCheck.result === 'undefined' || objectToCheck.result === null) &&
         context.currentStepNum >= 0 &&
         context.currentStepNum < objectToCheck.pickle.steps.length;
};
function isAnAfterStepEvent(objectToCheck) {
  return objectToCheck &&
        !isFunction(objectToCheck) &&
        typeof objectToCheck.pickle !== 'undefined' && objectToCheck.pickle !== null &&
        typeof objectToCheck.result !== 'undefined' && objectToCheck.result !== null &&
        context.currentStepNum < context.currentScenario.pickle.steps.length;
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
        if (isABeforeScenarioEvent(args[0]) &&
            context.getCurrentFeature() !== args[0]) {

          context.setCurrentFeature(args[0]);
          context.setCurrentScenario(null);
          context.setCurrentStep(null);
          if (context.debug) console.log('Wrapped Before each feature file : ' + args[0].sourceLocation.uri);
        }

        /* ***** BEFORE EACH STEP ***** */
        /* if (isABeforeStepEvent(args[0])) {
          //if (context.debug) console.log('Wrapped Before each step (step num : ' + context.currentStepNum + ') :');
        }*/

        /* ***** AFTER EACH STEP ***** */
        if (isAnAfterStepEvent(args[0])) {
          if (context.debug) console.log('Wrapped After each step - duration (s) : ' + args[0].result.duration + ' - status ' + args[0].result.status);
          //if (context.debug) console.log(args[0]);
        }

        /* ***** AFTER EACH SCENARIO ***** */
        /*if (isAnAfterScenarioEvent(args[0])) {
          if (context.debug) console.log('Wrapped After each scenario : ' + pickle.name + ' ( ' + (context.currentStepNum+1) + ' steps)');
        }*/

        /* ***** BEFORE EACH SCENARIO ***** */
        /*if (isABeforeScenarioEvent(args[0])) {
          if (context.debug) console.log('Wrapped Before each scenario : ' + pickle.name);
        }*/

      } catch (e) {
        console.log('!!! ERREUR : ' + e);
        console.log('! currentFeature : ');
        console.log(context.currentFeature);
        console.log('! currentScenario : ');
        console.log(context.currentScenario);
        console.log('! currentStep : ');
        console.log(context.currentStep);
        console.log('! currentStepNum : ' + context.currentStepNum);
        console.log(e);
        console.log(args);
        console.log();
      } finally {
        /*if (incrementCurrentStepNum) {
          context.currentStepNum++;
        }*/
        return _fn.apply(this, args);
      }
    }
  }
});
