// module.scaffholding

const environment = {};

environment.staging = {
  port: 3000,
  envName: "staging",
};

environment.production = {
  port: 5000,
  envName: "production",
};

// which environments was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

const environmentToExport =
  typeof environment[currentEnvironment] === "object"
    ? environment[currentEnvironment]
    : environment.staging;

module.exports = environment;
