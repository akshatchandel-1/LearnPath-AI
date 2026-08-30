const LearningPath = require('../../models/LearningPath');
const Resource = require('../../models/Resource');
const User = require('../../models/User');
const { ROLE_TEMPLATES } = require('./roleTemplates');

class AdaptivePathService {
  matchTemplateForGoal(goal = '') {
    const g = (goal || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (g.includes('businessanalyst') || g.includes('businessanalytics')) {
      return ROLE_TEMPLATES.businessanalyst;
    }
    if (g.includes('researchengineer') || g.includes('airesearch') || g.includes('researcher')) {
      return ROLE_TEMPLATES.researchengineer;
    }
    if (g.includes('frontend') || g.includes('react') || g.includes('vue') || g.includes('angular') || g.includes('ui')) {
      return ROLE_TEMPLATES.frontend;
    }
    if (g.includes('backend') || g.includes('nodejs') || g.includes('express') || g.includes('api') || g.includes('microservice')) {
      return ROLE_TEMPLATES.backend;
    }
    if (g.includes('datascientist') || g.includes('datascience')) {
      return ROLE_TEMPLATES.datascientist;
    }
    if (g.includes('ai') || g.includes('machinelearning') || g.includes('ml') || g.includes('deeplearning') || g.includes('nlp')) {
      return ROLE_TEMPLATES.aiengineer;
    }
    if (g.includes('cloud') || g.includes('aws') || g.includes('azure') || g.includes('gcp') || g.includes('architect')) {
      return ROLE_TEMPLATES.cloud;
    }
    if (g.includes('devops') || g.includes('sre') || g.includes('reliability') || g.includes('cicd')) {
      return ROLE_TEMPLATES.devops;
    }
    if (g.includes('dataanalyst') || g.includes('dataanalytics') || g.includes('bi') || g.includes('tableau') || g.includes('powerbi')) {
      return ROLE_TEMPLATES.dataanalyst;
    }
    if (g.includes('cyber') || g.includes('security') || g.includes('ethical') || g.includes('infosec')) {
      return ROLE_TEMPLATES.cybersecurity;
    }
    if (g.includes('softwareengineer') || g.includes('algorithms') || g.includes('systemdesign')) {
      return ROLE_TEMPLATES.softwareengineer;
    }
    return ROLE_TEMPLATES.fullstack;
  }

  async generateLearningPath(userId, targetRole) {
    const user = await User.findById(userId);
    const effectiveGoal = targetRole || user?.careerGoal || 'Full Stack MERN Developer';
    const template = this.matchTemplateForGoal(effectiveGoal);

    const allCourses = await Resource.find({}).lean();

    const phases = template.phases.map((tmplPhase, idx) => {
      const matchedCourses = allCourses.filter(c => {
        const titleLower = c.title.toLowerCase();
        const catLower = (c.category || '').toLowerCase();
        return tmplPhase.requiredSkillNames.some(sk => 
          titleLower.includes(sk.toLowerCase()) || catLower.includes(sk.toLowerCase())
        );
      });

      const resources = matchedCourses.length > 0
        ? matchedCourses.slice(0, 3).map(c => ({
            course: c._id,
            title: c.title,
            completed: false,
            estimatedHours: c.durationHours || 4,
          }))
        : tmplPhase.requiredSkillNames.map(sk => ({
            title: `Mastery Module: ${sk}`,
            completed: false,
            estimatedHours: 4,
          }));

      return {
        phaseNumber: tmplPhase.phaseNumber,
        title: tmplPhase.title,
        description: tmplPhase.description,
        status: idx === 0 ? 'in-progress' : 'locked',
        completionPercentage: 0,
        estimatedWeeks: tmplPhase.estimatedWeeks,
        resources,
        milestone: {
          title: tmplPhase.milestone.title,
          description: tmplPhase.milestone.description,
          completed: false,
          requiredResourcesCompleted: 0,
          totalResourcesRequired: resources.length,
        },
      };
    });

    await LearningPath.updateMany({ user: userId }, { active: false });

    const learningPath = await LearningPath.create({
      user: userId,
      goal: effectiveGoal,
      title: `${effectiveGoal} Master Roadmap`,
      phases,
      currentPhase: 1,
      overallProgress: 0,
      active: true,
      adaptationHistory: [
        {
          timestamp: new Date(),
          reason: `Personalized curriculum calibrated for ${effectiveGoal}`,
          changesMade: `Generated ${phases.length} structured phases starting from Phase 1`,
        },
      ],
    });

    return learningPath;
  }

  async adaptLearningPath(userId, reason) {
    const user = await User.findById(userId);
    const incomingGoal = typeof reason === 'object' ? (reason?.goal || reason?.targetRole) : null;
    const targetGoal = incomingGoal || user?.targetRole || user?.careerGoal || 'Full Stack MERN Developer';

    if (incomingGoal && user) {
      user.careerGoal = incomingGoal;
      user.targetRole = incomingGoal;
      await user.save();
    }

    return await this.generateLearningPath(userId, targetGoal);
  }
}

const adaptivePathService = new AdaptivePathService();
module.exports = adaptivePathService;
