/**
 * LearnPath AI - Role-Course Mapping & Tag Indexes
 * Fast lookup indexes mapping roles and skills to high-relevance courses.
 */

const { COURSES_CATALOG } = require('./coursesData');
const { normalizeSkillName } = require('../../skill-gap/data/skillsTaxonomy');

/**
 * Builds an inverted index mapping skill name -> courses addressing that skill.
 */
function buildSkillToCoursesIndex() {
  const index = new Map();

  COURSES_CATALOG.forEach(course => {
    (course.skills || []).forEach(skill => {
      const normalized = normalizeSkillName(skill);
      if (!index.has(normalized)) {
        index.set(normalized, []);
      }
      index.get(normalized).push(course);
    });
  });

  return index;
}

/**
 * Retrieves all courses addressing any of the specified target skills.
 * @param {string[]} targetSkills
 * @returns {object[]} Array of unique course objects
 */
function getCoursesForSkills(targetSkills = []) {
  const index = buildSkillToCoursesIndex();
  const matchedSet = new Set();
  const results = [];

  targetSkills.forEach(skill => {
    const normalized = normalizeSkillName(skill);
    const courses = index.get(normalized) || [];
    courses.forEach(c => {
      if (!matchedSet.has(c.id)) {
        matchedSet.add(c.id);
        results.push(c);
      }
    });
  });

  return results;
}

module.exports = {
  buildSkillToCoursesIndex,
  getCoursesForSkills,
};
