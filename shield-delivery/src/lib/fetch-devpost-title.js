'use strict';

const axios = require('axios');

const { getDevpostTitle } = require('../util/html-parsing');
const { DEVPOST_PROJECT_BASE_URL } = require('../../constants.json');


const UserAgent = require('user-agents');
const userAgent = new UserAgent();


async function fetchDevpostTitle(projectId) {
  let res;
  try {
    res = await axios.get(`${DEVPOST_PROJECT_BASE_URL}/${projectId}`, {
      headers: {
        'User-Agent': userAgent.toString()
      }
    });
  } catch (err) {
    console.log(err)
    throw new Error("Unable to fetch the devpost project name. Double check that the project exists and is publicly visible.");
  }

  const projectName = getDevpostTitle(res.data);
  // forbidden access to project
  if (projectName === 'Devpost - The home for hackathons')
    throw new Error("The project associated with the link is restricted! Make sure you've publisly copied its link properly.");
  else {
    return projectName;
  }
}

module.exports = fetchDevpostTitle;
