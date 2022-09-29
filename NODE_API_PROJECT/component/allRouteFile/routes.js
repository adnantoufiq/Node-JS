const {
  sampleHandler,
} = require("../allRouteFile/routeshandler/sampleHandler");

const routs = {
  // when any user is hit on sample route then it call the sample handler functions
  sample: sampleHandler,
};

module.exports = routs;
