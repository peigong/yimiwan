'use strict';

/** @type Egg.EggPlugin */

exports.cors = {
  enable: true,
  package: 'egg-cors'
};

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus'
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.logrotator = {
  enable: true,
  package: 'egg-logrotator',
};
