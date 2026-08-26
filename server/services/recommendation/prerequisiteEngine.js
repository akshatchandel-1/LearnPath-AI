const PrerequisiteGraph = require('../../ml/prerequisiteGraph');
const Skill = require('../../models/Skill');

class PrerequisiteEngine {
  constructor() {
    this.graph = new PrerequisiteGraph();
    this.isInitialized = false;
  }

  async initialize() {
    try {
      const skills = await Skill.find({});
      if (skills.length > 0) {
        this.graph.buildGraph(skills);
        this.isInitialized = true;
      }
    } catch (err) {
      console.warn('PrerequisiteEngine initialization deferred:', err.message);
    }
  }

  getTopologicalOrder() {
    return this.graph.topologicalSort();
  }

  checkPrerequisites(targetSkill, userSkills = []) {
    const mastered = userSkills
      .filter(s => (s.level || 0) >= 50)
      .map(s => s.name);

    return this.graph.getUnsatisfiedPrerequisites(targetSkill, mastered);
  }
}

const prerequisiteEngine = new PrerequisiteEngine();
module.exports = prerequisiteEngine;
