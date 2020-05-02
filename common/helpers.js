const inquirer = require('inquirer');

const formatAnswer = (answerObject, modifierFunction) => {
  Object.keys(answerObject).forEach((answerKey) => {
    if (modifierFunction) {
      answerObject[answerKey] = modifierFunction(answerObject[answerKey]);
    }

    // empty string to blank
    if (answerObject[answerKey] === '') {
      answerObject[answerKey] = null;
    }
  });

  return answerObject;
};

const prompt = async (options) => {
  const modifier = options.modifier;
  if (modifier) delete options.modifier;

  return formatAnswer(await inquirer.prompt(options), modifier);
};


module.exports = {
  prompt
}
