var Generator = require('../../common/generator');
const { DB } = require('../../common/constains');
const { prompt } = require('../../common/helpers');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.subgenerator = 'backend';
    this.opts = opts;
    this.rootAnswers = opts.answers;
    this.log()

  }

  initializing() {
    this.log('Backend setup');
  }

  async prompting() {
    this.clear();

    const backendsDetails = [];
    for (let beCount = 0; beCount < this.rootAnswers.backends.length; beCount++) {
      let backend = {};
      const technology = this.rootAnswers.backends[beCount].backend;
      backend = { ...backend, ...await prompt({
        type: 'input',
        name: 'folderName',
        message: `What is folder name for backend n. ${beCount + 1} based on ${technology}?`
      })};

      if (technology === 'Node.js') {
        backend = { ...backend, ...await prompt({
          type: 'confirm',
          message: 'Would you like to use typescript?',
          name: 'typescript',
          default: true
        })};

        backend = { ...backend, ...await prompt({
          type: 'list',
          name: 'framework',
          message: 'What framework do you want to use?',
          choices: [
            { name:'Express', value:'express'},
            { name:'Fastify', value:'fastify'},
            { name:'Other', value:'other'},
          ]
        })};

        backend = { ...backend, ...await prompt({
          type: 'confirm',
          message: 'Do you want to use recommended settings regarding eslint, prettier, etc.?',
          name: 'codeStyleDefaults',
          default: true
        })};

        if (this.rootAnswers.db && (this.rootAnswers.db.includes(DB.POSTGRES) || this.rootAnswers.db.includes(DB.MYSQL) || this.rootAnswers.db.includes(DB.SQLSERVER))) {
          backend = { ...backend, ...await prompt({
            type: 'confirm',
            message: 'Will you be using DB migrations?',
            name: 'codeStyleDefaults',
            default: true
          })};
        }

      }

      backendsDetails.push(backend);
    }

    this.storeAnswer({ backendsDetails });
  }

  async writingConfigFile() {
    const mainPath = `${this.destinationRoot()}/`;
    this.fs.extendJSON(`${mainPath}generator.config.json`, this.answers);
  }

  async writing() {
    // looping throu backends
    for (let backendDetail of this.answers.backendsDetails) {
      const mainPath = `${this.destinationRoot()}/${backendDetail.folderName}/`;
      this.fs.write(`${mainPath}test.js`, backendDetail.folderName);
    }

  }

};
