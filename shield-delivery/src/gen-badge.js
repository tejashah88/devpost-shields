'use strict';

const { BadgeFactory } = require('gh-badges');

const randId = () => Math.random().toString(36).substring(2);
const bf = new BadgeFactory();

const { getLogoSync } = require('./get-logo');

const { LOGO_FILES, DEVPOST_THEME, BADGE_TYPES, BADGE_STYLES } = require('./constants.json');

const errors = {
  MISSING_PARAMS: 'You must specify the project name, badge type and badge style in order to generate a valid badge.',
  INVALID_TYPE: "The given badge type doesn't match any known types.",
  INVALID_STYLE: "The given badge type doesn't match any known styles.",
  POPOUT_STYLE_REQUIRES_LOGO: 'All popout-related badges must use a logo.'
};

const smallLogo = getLogoSync(LOGO_FILES.SMALL, true);
const bigLogo = getLogoSync(LOGO_FILES.BIG, true);

function generateBadge({
  projectName,
  projectLink,
  projectId,
  badgeType,
  badgeStyle,
  unique
}) {
  if (!projectName || !badgeType || !badgeStyle)
    throw new Error(errors.MISSING_PARAMS);

  if (!BADGE_TYPES.includes(badgeType))
    throw new Error(errors.INVALID_TYPE);

  if (!BADGE_STYLES.includes(badgeStyle))
    throw new Error(errors.INVALID_STYLE);

  if (projectId && !projectLink)
    projectLink = `https://devpost.com/software/${projectId}`;

  const badgeOpts = {};

  // any popout related badges should require a logo in order to properly 'popout' the logo
  // thus, an error will be returned if a popout style doesn't have an associated logo
  if (['basic', 'custom-color'].includes(badgeType) && badgeStyle.includes('popout'))
    throw new Error(errors.POPOUT_STYLE_REQUIRES_LOGO);

  // color field
  if (badgeType === 'basic')
    badgeOpts.colorscheme = 'blue';
  else {
    badgeOpts.colorA = DEVPOST_THEME.PRIMARY;
    badgeOpts.colorB = DEVPOST_THEME.SECONDARY;
  }

  // logo field
  if (badgeType.includes('small-logo'))
    badgeOpts.logo = 'data:image/png;base64,' + smallLogo;

  if (badgeType.includes('big-logo'))
    badgeOpts.logo = 'data:image/png;base64,' + bigLogo;

  // text field
  switch (badgeType) {
    case 'basic':
    case 'custom-color':
    case 'small-logo-left-text-full':
      badgeOpts.text = ['Devpost', projectName];
      break;
    case 'small-logo-left-text-none':
    case 'big-logo':
      badgeOpts.text = ['', projectName];
      break;
    case 'small-logo-left-text-blend':
      badgeOpts.text = ['evpost', projectName];
      break;
  }

  // logo width field
  if (badgeType === 'big-logo')
    badgeOpts.logoWidth = 65; // 65 / 14 ~= 4000 / 850

  // template field
  badgeOpts.template = badgeStyle;

  // links field
  if (projectLink)
    badgeOpts.links = [projectLink, projectLink];

  let svg = bf.create(badgeOpts);

  if (unique) {
    const newIdA = randId();
    const newIdB = randId();
    svg = svg
      .replace('id="a"', `id="${newIdA}"`)
      .replace('url(#a)', `url(#${newIdA})`)
      .replace('id="b"', `id="${newIdB}"`)
      .replace('url(#b)', `url(#${newIdB})`);
  }

  return svg;
}

module.exports = generateBadge;