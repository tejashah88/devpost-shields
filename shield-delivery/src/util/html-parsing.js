'use strict';

function getWebsiteTitle(html) {
  const titleTagRegExp = /<title>(.*?)<\/title>/i;
  if (!html && typeof html !== 'string')
    return null;

  const match = html.match(titleTagRegExp);
  return match ? match[1] : null;
}


function getDevpostTitle(html) {
  const websiteTitle = getWebsiteTitle(html);
  if (!websiteTitle)
    return null;

  return websiteTitle.split('|')[0].trim();
}

module.exports = {
  getWebsiteTitle,
  getDevpostTitle,
};
