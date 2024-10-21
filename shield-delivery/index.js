'use strict';

const api = require('lambda-api')();

const generateBadge = require('./src/lib/gen-badge');
const { CACHE_MAX_AGE, BADGE_TYPES, BADGE_STYLES } = require('./constants.json');

api.use((req, res, next) => {
  res.cors();
  next();
});

api.options('/*', (req, res) => {
  return res.status(200).json({});
});

// We ain't serving any favicons anytime soon
api.use((req, res, next) => {
  if (req.path == '/favicon.ico')
    return res.type('ico').status(404).send();
  next();
});

api.get('/get-badge', (req, res) => {
  console.log(req.query);
  console.log(`hasName? ${!!req.query.name}`);
  console.log(`hasId? ${!!req.query.id}`);
  console.log(`hasType? ${!!req.query.type}`);
  console.log(`hasStyle? ${!!req.query.style}`);

  const { name, id, type, style } = req.query;

  return res
    .cache(CACHE_MAX_AGE)
    .type('svg')
    .send(
      generateBadge({
        projectName: name,
        projectId: id,
        badgeType: type,
        badgeStyle: style,
        unique: true
      })
    );
});


api.get('/get-badge-table', async (req, res) => {
  console.log(req.query);
  console.log(`hasName? ${!!req.query.name}`);
  console.log(`hasId? ${!!req.query.id}`);

  const { name, id } = req.query;

  const badges = {};
  const errors = {};

  for (const type of BADGE_TYPES) {
    for (const style of BADGE_STYLES) {
      const config = `${type}/${style}`;

      try {
        badges[config] = generateBadge({
          projectName: name,
          projectId: id,
          badgeType: type,
          badgeStyle: style,
          unique: true
        });
      } catch (err) {
        const errMsg = err.message;
        if (!errors[errMsg])
          errors[errMsg] = [];

        errors[errMsg].push(config);
        badges[config] = '<p>Badge not available!</p>';
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    // we couldn't process some badges
    console.log('Errors enountered:');
    for (const errMsg of Object.keys(errors)) {
      console.log(`  - ${errMsg}`);
      for (const config of errors[errMsg])
        console.log(`    - ${config}`);
    }
  }

  return res
    .cache(CACHE_MAX_AGE)
    .json({
      projectId: req.query.id,
      projectName: name,
      badges: badges,
    });
});

api.use((err, req, res, next) => {
  // do something with the error
  res.error(400, err.message);
  next();
});

exports.handler = async (event, context) => await api.run(event, context);
