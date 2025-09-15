import { AssessmentSection } from "@/types/assessment";

export const assessmentSections: AssessmentSection[] = [
  {
    id: "core_values",
    title: "Core Values Discovery",
    objective: "Identify and prioritize core personal values and resolve internal value conflicts",
    completed: false,
    questions: [
      {
        id: "values_pair_1",
        type: "paired-comparison",
        question: "Which is more important to you?",
        options: ["Having the freedom to choose how to do your work", "Having clear structure and predictable routines"],
        category: "autonomy_vs_structure"
      },
      {
        id: "values_pair_2", 
        type: "paired-comparison",
        question: "If you had to choose between these two tradeoffs, which would you accept?",
        options: ["Sacrificing some personal autonomy for a greater impact on society", "Sacrificing social impact to ensure financial stability"],
        category: "impact_vs_security"
      },
      {
        id: "values_ranking",
        type: "ranking",
        question: "Rank your top 5 values from this list:",
        options: ["Autonomy", "Impact", "Stability", "Creativity", "Growth", "Service", "Status", "Recognition", "Collaboration", "Independence", "Security", "Learning"],
        category: "core_values"
      }
    ]
  },
  {
    id: "purpose_archetypes",
    title: "Purpose Archetype Identification", 
    objective: "Reveal dominant life purpose archetypes that drive motivation and career meaning",
    completed: false,
    questions: [
      {
        id: "archetype_creator",
        type: "likert",
        question: "I feel most fulfilled when I create something original that expresses my unique ideas.",
        scale: { min: 1, max: 5 },
        category: "creator"
      },
      {
        id: "archetype_healer",
        type: "likert", 
        question: "Helping others heal and grow gives my life meaning.",
        scale: { min: 1, max: 5 },
        category: "healer"
      },
      {
        id: "archetype_builder",
        type: "likert",
        question: "I am driven by the desire to build something lasting and tangible.",
        scale: { min: 1, max: 5 },
        category: "builder"
      },
      {
        id: "archetype_seeker",
        type: "likert",
        question: "I seek to explore new ideas and expand my horizons constantly.",
        scale: { min: 1, max: 5 },
        category: "seeker"
      },
      {
        id: "archetype_justice",
        type: "likert",
        question: "I stand up for fairness and advocate for those without a voice.",
        scale: { min: 1, max: 5 },
        category: "justice_seeker"
      },
      {
        id: "archetype_guide",
        type: "likert",
        question: "Guiding and mentoring others is a core part of who I am.",
        scale: { min: 1, max: 5 },
        category: "guide"
      }
    ]
  },
  {
    id: "meaning_fulfillment",
    title: "Meaning & Fulfillment Factors",
    objective: "Assess energy sources, drains, impact preferences, reward systems, and definitions of meaningful work",
    completed: false,
    questions: [
      {
        id: "energy_ranking",
        type: "ranking", 
        question: "Rank these activities by what energizes you most at work:",
        options: ["Creative problem solving", "Collaborating with others", "Working independently", "Teaching/mentoring", "Making a visible impact", "Learning new skills", "Leading teams", "Analyzing data"],
        category: "energy_sources"
      },
      {
        id: "repetitive_drain",
        type: "rating-scale",
        question: "How much do you feel drained by repetitive tasks?",
        scale: { min: 1, max: 10, labels: { 1: "Energizing", 5: "Neutral", 10: "Extremely Draining" } },
        category: "energy_drains"
      },
      {
        id: "impact_level",
        type: "multiple-choice",
        question: "Select your ideal impact level:",
        options: ["Individual", "Team", "Organization", "Society", "Global"],
        category: "impact_preference"
      },
      {
        id: "reward_motivation",
        type: "ranking",
        question: "Which rewards motivate you most? Choose your top 3:",
        options: ["Recognition", "Mastery", "Autonomy", "Financial compensation", "Social connection", "Purpose", "Growth opportunities", "Status"],
        category: "reward_systems"
      }
    ]
  },
  {
    id: "pact_framework", 
    title: "PACT Framework Assessment",
    objective: "Measure real-world alignment potential along Purpose, Authenticity, Congruence, and Trajectory dimensions",
    completed: false,
    questions: [
      {
        id: "pact_purpose",
        type: "rating-scale",
        question: "My current role allows me to express my deepest motivations and passions.",
        scale: { min: 1, max: 10, labels: { 1: "Not at all", 5: "Somewhat", 10: "Completely" } },
        category: "purpose"
      },
      {
        id: "pact_authenticity", 
        type: "rating-scale",
        question: "I feel my work reflects who I truly am, not just what others expect.",
        scale: { min: 1, max: 10, labels: { 1: "Not at all", 5: "Somewhat", 10: "Completely" } },
        category: "authenticity"
      },
      {
        id: "pact_congruence",
        type: "rating-scale", 
        question: "My daily tasks align well with my core values and long-term goals.",
        scale: { min: 1, max: 10, labels: { 1: "Not at all", 5: "Somewhat", 10: "Completely" } },
        category: "congruence"
      },
      {
        id: "pact_trajectory",
        type: "rating-scale",
        question: "I believe my current career path will lead me to a fulfilling future aligned with my vision.",
        scale: { min: 1, max: 10, labels: { 1: "Not at all", 5: "Somewhat", 10: "Completely" } },
        category: "trajectory"
      }
    ]
  },
  {
    id: "career_environment",
    title: "Career Environment & Role Alignment", 
    objective: "Map personal profiles to industries, cultures, and roles suited to values and purpose",
    completed: false,
    questions: [
      {
        id: "work_culture", 
        type: "multiple-choice",
        question: "Which work culture feels most comfortable?",
        options: ["Startup (fast-paced, flexible)", "NGO (mission-driven, collaborative)", "Academia (research-focused, autonomous)", "Enterprise (structured, stable)", "Freelance (independent, varied)"],
        category: "culture_preference"
      },
      {
        id: "work_type",
        type: "multiple-choice", 
        question: "Select the work type you prefer most:",
        options: ["Creative (design, innovation)", "Analytical (research, data)", "Interpersonal (coaching, sales)", "Executional (operations, delivery)", "Strategic (planning, leadership)"],
        category: "work_type"
      }
    ]
  }
];