const {
  sampleHandler,
} = require("../allRouteFile/routeshandler/sampleHandler");
const { userHandler } = require("../allRouteFile/routeshandler/userHandler");

const routs = {
  // when any user is hit on sample route then it call the sample handler functions
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routs;
