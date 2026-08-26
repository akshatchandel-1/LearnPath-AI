/**
 * Topological Sorting Prerequisite Graph using Kahn's Algorithm.
 * Guarantees foundational skills are sequenced strictly before downstream dependencies.
 */

class PrerequisiteGraph {
  constructor() {
    this.adjacencyList = new Map(); // node -> array of dependent nodes
    this.inDegree = new Map();      // node -> count of incoming prerequisite edges
    this.nodes = new Set();
  }

  addNode(node) {
    if (!this.nodes.has(node)) {
      this.nodes.add(node);
      this.adjacencyList.set(node, []);
      this.inDegree.set(node, 0);
    }
  }

  addDependency(prerequisite, target) {
    this.addNode(prerequisite);
    this.addNode(target);

    this.adjacencyList.get(prerequisite).push(target);
    this.inDegree.set(target, (this.inDegree.get(target) || 0) + 1);
  }

  buildGraph(skillDefinitions = []) {
    skillDefinitions.forEach((skill) => {
      this.addNode(skill.name);
      if (Array.isArray(skill.prerequisites)) {
        skill.prerequisites.forEach((prereq) => {
          this.addDependency(prereq, skill.name);
        });
      }
    });
  }

  /**
   * Kahn's Algorithm for Topological Sort
   * Returns topologically ordered list of skills.
   */
  topologicalSort() {
    const queue = [];
    const inDegreeCopy = new Map(this.inDegree);
    const sortedOrder = [];

    inDegreeCopy.forEach((deg, node) => {
      if (deg === 0) {
        queue.push(node);
      }
    });

    while (queue.length > 0) {
      const current = queue.shift();
      sortedOrder.push(current);

      const neighbors = this.adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        inDegreeCopy.set(neighbor, inDegreeCopy.get(neighbor) - 1);
        if (inDegreeCopy.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    // Check for circular dependencies
    if (sortedOrder.length !== this.nodes.size) {
      console.warn('Prerequisite graph contains cycles. Returning partial topological order with remaining nodes.');
      this.nodes.forEach(node => {
        if (!sortedOrder.includes(node)) {
          sortedOrder.push(node);
        }
      });
    }

    return sortedOrder;
  }

  getUnsatisfiedPrerequisites(targetSkill, userMasteredSkills = []) {
    const mastered = new Set(userMasteredSkills.map(s => s.toLowerCase()));
    const prereqs = [];

    // Reverse lookup of incoming edges
    this.adjacencyList.forEach((dependents, node) => {
      if (dependents.includes(targetSkill) && !mastered.has(node.toLowerCase())) {
        prereqs.push(node);
      }
    });

    return prereqs;
  }
}

module.exports = PrerequisiteGraph;
