var Generator = require('../../common/generator');

const { prompt } = require('../../common/helpers');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.steps = [
      {name:'basics', label:'Basics'},
      {name:'febe', label: 'Frontend + Backend'},
      {name: 'db', label: 'Databases'},
      {name: 'devops', label: 'Devops'}
    ];
  }

  initializing() {

  }

  async prompting() {

    await this.question({
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?'
    });

    await this.question({
      type: 'list',
      name: 'git',
      message: 'Pick a code repository that you will use.',
      choices: [
        { name:'Gitlab', value:'gitlab'},
        { name:'Github', value:'github'},
        { name:'other git repository', value:'git'},
        { name:'no git repository (not recommended)', value:'no'}
      ]
    });

    if (this.answers.git) {
      await this.question({
        type: 'list',
        name: 'repositoryPattern',
        message: 'Pick a repository pattern.',
        choices: [
          { name:'Monorepo (recommended)', value:'monorepo'},
          { name:'Multirepo', value:'multirepo'}
        ]
      });
    }

    this.setStep('febe');

    await this.question({
      type: 'list',
      name: 'feFramework',
      message: 'Pick a frontend framework that you will use.',
      choices: ['React', 'Angular', 'Vuejs', 'other', 'no frontend']
    });

    await this.question({
      type: 'input',
      name: 'backendServicesCount',
      message: 'How many backend services will you use?',
      validate: (value) => {
        if (!value.match(/^[0-9]$/i)) {
          return 'Please input a number between 0-9.';
        }
        return true;
      },
      modifier: parseInt
    });


    const backends = [];

    for (let beCount = 0; beCount < this.answers.backendServicesCount; beCount++) {
      const backend = await prompt({
        type: 'list',
        name: 'backend',
        message: `Pick a backend technology that you will use for service n. ${beCount + 1}`,
        choices: ['Node.js', 'Java', 'Go', 'other']
      });

      backends.push(backend);
    }

    this.storeAnswer({ backends });

    await this.question({
      type: 'list',
      name: 'proxy',
      message: 'Pick a proxy that you will use',
      choices: [
        { name:'nginx', value:'nginx'},
        { name:'Reactive interaction gateway', value:'rig'},
        { name:'other proxy', value:'other'},
        { name:'no proxy (not recommended)', value:''}
      ]
    });

    this.setStep('db');

    await this.question({
      type: 'checkbox',
      name: 'db',
      message: 'Pick databases that you will use',
      choices: [
        { name:'PostgresSQL', value:'postgressql'},
        { name:'Cockroach', value:'cockroachsql'},
        { name:'MySQL', value:'mysql'},
        { name:'SQL server', value:'sqlserver'},
        { name:'MongoDB', value:'mongodb'},
        { name:'DynamoDB', value:'dynamodb'},
        { name:'Redis', value:'redis'},
        { name:'Memcache', value:'mem'}
      ]
    });

    this.setStep('devops');

    await this.question({
      type: 'confirm',
      message: 'Will you be using docker?',
      name: 'docker',
      default: true
    });

    await this.question({
      type: 'confirm',
      message: 'Will you be using kubernetes?',
      name: 'kubernetes',
      default: true
    });

    await this.question({
      type: 'list',
      name: 'cloud',
      message: 'Pick a cloud provider that you will use',
      choices: [
        { name:'AWS', value:'aws'},
        { name:'Azure', value:'azure'},
        { name:'Google cloud', value:'google'},
        { name:'Other', value:'other'},
        { name:'no cloud', value:''}
      ]
    });

    await this.question({
      type: 'list',
      name: 'cloud',
      message: 'Pick a CI/CD that you will use',
      choices: [
        { name:'Gitlab', value:'gitlab'},
        { name:'Jenkins', value:'jenkins'},
        { name:'no CI/CD', value:''}
      ]
    });

    this.log(this.answers);

  }

  subGenerators() {
    if (this.answers.feFramework) {
      this.composeWith('jumpstarter:frontend', { answers: this.answers });
    }
  }

  install() {

  }

  end() {

  }
};
