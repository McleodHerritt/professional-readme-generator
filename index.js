//packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// a helper method for getting the URL of the license badge
const getBadgeURL = (license) => {
  switch (license) {
    case "MIT License":
      return "https://img.shields.io/badge/License-MIT-yellow.svg";
    case "GNU General Public License (GPL)":
      return "https://img.shields.io/badge/License-GPL-blue.svg";
    case "GNU Lesser GPL":
      return "https://img.shields.io/badge/License-LGPL-lightblue.svg";
    case "Apache License 2.0":
      return "https://img.shields.io/badge/License-Apache%202.0-green.svg";
    case "BSD License":
      return "https://img.shields.io/badge/License-BSD-orange.svg";
    case "ISC":
      return "https://img.shields.io/badge/License-ISC-lightgrey.svg";
    case "Mozilla Public License":
      return "https://img.shields.io/badge/License-MPL-red.svg";
    case "Unlicense":
      return "https://img.shields.io/badge/License-Unlicense-black.svg";
    default:
      return "";
  }
};

// a function to generated a professional, formatted Readme file
const generateREADME = ({
  title,
  description,
  installation,
  usage,
  license,
  contributing,
  tests,
  github,
  email,
}) => {
  const badgeURL = getBadgeURL(license);
  return `
  ${badgeURL ? `![License Badge](${badgeURL})` : ""} 
  
  # ${title}
  
  ## Description
  ${description}
  
  ## Table of Contents
  [Installation](#installation)
  [Usage](#usage)
  [License](#license)
  [Contributing](#contributing)
  [Tests](#tests)
  [Questions](#questions)
  
  ## Installation
  ${installation}
  
  ## Usage
  ${usage}
  
  ## License
  This application is covered under the following license: ${license}
  
  ## Contributing
  ${contributing}
  
  ## Tests
  ${tests}
  
  ## Questions
  
  [GitHub](https://github.com/${github})
  
  [For questions, email me!](mailto:${email})
  
  `;
};
//the 'inquirer' library prompts the user with a series of questions related to a project or application.
//The responses to these prompts are used to auto-generate the README file
inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is your title?",
    },
    {
      type: "input",
      name: "description",
      message: "What is a brief description?",
    },
    {
      type: "input",
      name: "installation",
      message: "what are the step-by-step installation instructions?.",
    },
    {
      type: "input",
      name: "usage",
      message: "How do I use this application?",
    },
    {
      type: "input",
      name: "license",
      message:
        "What is your license information? ex: \nMIT License\nGNU General Public License (GPL)\nGNU Lesser GPL\nApache License 2.0\nBSD License\nISC\nMozilla Public License\nUnlicense",
    },
    {
      type: "input",
      name: "contributing",
      message: "Who can contributed and how do they contribute?",
    },
    {
      type: "input",
      name: "tests",
      message: "How do I run tests?",
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
  ])

  //After receiving user input from the inquirer prompts, this function processes the answers.
  .then((answers) => {
    const readMeContent = generateREADME(answers);

    fs.writeFile("./generated/README.md", readMeContent, (err) =>
      err ? console.log(err) : console.log("Successfully created README.md!")
    );
  });
