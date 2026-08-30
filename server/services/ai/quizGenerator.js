const llmService = require('./llmService');
const Quiz = require('../../models/Quiz');

const QUESTION_BANK = {
  javascript: [
    {
      question: 'What is the primary output order of console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4); in JavaScript?',
      options: ['1, 4, 3, 2', '1, 2, 3, 4', '1, 4, 2, 3', '1, 3, 4, 2'],
      correctAnswerIndex: 0,
      explanation: 'Microtasks (Promises) execute before macrotasks (setTimeout) after synchronous execution completes.',
      skillSubtopic: 'Event Loop & Microtasks',
    },
    {
      question: 'How does Object.freeze() differ from Object.seal() in JavaScript?',
      options: [
        'freeze makes existing properties read-only, whereas seal allows modifying existing writable properties',
        'seal prevents adding properties while freeze allows adding new properties',
        'freeze is for arrays only while seal is for objects only',
        'There is no functional difference between them',
      ],
      correctAnswerIndex: 0,
      explanation: 'Object.freeze() sets writable to false, whereas Object.seal() retains existing writability.',
      skillSubtopic: 'Object Mutability',
    },
    {
      question: 'Which web API should be used to cancel an active fetch() request?',
      options: ['AbortController', 'fetch.cancel()', 'window.stopFetch()', 'Promise.reject()'],
      correctAnswerIndex: 0,
      explanation: 'AbortController generates an AbortSignal passed into fetch to cancel active network connections.',
      skillSubtopic: 'Asynchronous Control Flow',
    },
    {
      question: 'What happens when a closure references a large object inside an event listener that is never removed?',
      options: [
        'It can cause a memory leak because the garbage collector retains reachable references',
        'It triggers an immediate syntax error',
        'The object is automatically garbage collected after 5 seconds',
        'The browser halts JavaScript execution',
      ],
      correctAnswerIndex: 0,
      explanation: 'Reachable references prevent garbage collection, leading to persistent memory retention.',
      skillSubtopic: 'Memory Lifecycle & Closures',
    },
    {
      question: 'What is the return value of typeof NaN in JavaScript?',
      options: ['"number"', '"NaN"', '"undefined"', '"object"'],
      correctAnswerIndex: 0,
      explanation: 'In JavaScript, NaN represents Not-a-Number but its primitive data type is number.',
      skillSubtopic: 'Data Types',
    },
    {
      question: 'How does the nullish coalescing operator (??) differ from the logical OR operator (||)?',
      options: [
        '?? only falls back on null or undefined, while || falls back on all falsy values like 0 or empty string',
        '?? works only with numbers while || works only with booleans',
        '?? executes asynchronously while || is synchronous',
        'There is no operational difference',
      ],
      correctAnswerIndex: 0,
      explanation: 'Nullish coalescing strictly checks for nullish values (null and undefined) rather than falsy values.',
      skillSubtopic: 'Operators & Expressions',
    },
  ],

  react: [
    {
      question: 'When does the cleanup callback returned by useEffect execute?',
      options: [
        'Before the component unmounts and before re-running the effect on dependency change',
        'Only when the entire browser tab closes',
        'Synchronously before the initial render starts',
        'Immediately when state is declared',
      ],
      correctAnswerIndex: 0,
      explanation: 'React executes cleanup before unmounting and before applying new effect cycles.',
      skillSubtopic: 'Hooks Lifecycle',
    },
    {
      question: 'What is the primary purpose of the useCallback hook in React?',
      options: [
        'To return a memoized callback function instance preventing unnecessary re-renders in memoized child components',
        'To run synchronous calculations on the background thread',
        'To fetch data from backend servers automatically',
        'To replace useState with global state',
      ],
      correctAnswerIndex: 0,
      explanation: 'useCallback caches function definitions between renders based on dependency array changes.',
      skillSubtopic: 'Memoization & Performance',
    },
    {
      question: 'Why should state never be mutated directly in React (e.g. state.count = 5)?',
      options: [
        'Direct mutations bypass React shallow comparison and fail to schedule a re-render',
        'Direct mutations trigger a fatal compilation error',
        'Direct mutations slow down the JavaScript engine',
        'Direct mutations are only allowed inside class components',
      ],
      correctAnswerIndex: 0,
      explanation: 'React relies on immutability to detect state changes and trigger virtual DOM reconciliation.',
      skillSubtopic: 'State Immutability',
    },
    {
      question: 'What does the useMemo hook return?',
      options: [
        'A memoized calculated value from an expensive computation',
        'A callback function that runs on every tick',
        'A DOM element reference',
        'A global store reducer',
      ],
      correctAnswerIndex: 0,
      explanation: 'useMemo caches the result of an expensive calculation until dependencies change.',
      skillSubtopic: 'React Optimization',
    },
  ],

  node: [
    {
      question: 'What signature identifies custom error-handling middleware in Express.js?',
      options: [
        'A middleware function with 4 arguments: (err, req, res, next)',
        'A middleware function with 2 arguments: (req, res)',
        'An explicit call to process.exit(1)',
        'A try-catch block wrapping express()',
      ],
      correctAnswerIndex: 0,
      explanation: 'Express identifies error-handling middleware specifically by having 4 arguments: (err, req, res, next).',
      skillSubtopic: 'Express Middleware',
    },
    {
      question: 'What is the difference between process.nextTick() and setImmediate() in Node.js?',
      options: [
        'process.nextTick() fires immediately after the current operation finishes; setImmediate() runs in the Check phase',
        'setImmediate() runs before process.nextTick() in all phases',
        'process.nextTick() only operates in cluster worker threads',
        'There is no difference in execution timing',
      ],
      correctAnswerIndex: 0,
      explanation: 'nextTick queue is processed immediately after current tick completes, whereas setImmediate runs in Check phase.',
      skillSubtopic: 'Event Loop Phases',
    },
    {
      question: 'Why are Node.js Streams preferred over fs.readFile() for processing large files?',
      options: [
        'Streams process data in chunks without buffering the entire file into memory',
        'Streams automatically compress files to zip format',
        'fs.readFile is deprecated in modern Node.js',
        'Streams run natively on the GPU',
      ],
      correctAnswerIndex: 0,
      explanation: 'Streams maintain constant low memory usage by reading and transferring chunks incrementally.',
      skillSubtopic: 'Node.js Streams & I/O',
    },
  ],

  database: [
    {
      question: 'In MongoDB, which command inspects query execution plan and verifies index usage?',
      options: ['cursor.explain("executionStats")', 'db.profile()', 'db.indexScan()', 'db.verifyQuery()'],
      correctAnswerIndex: 0,
      explanation: 'explain("executionStats") details whether a COLLSCAN (collection scan) or IXSCAN (index scan) occurred.',
      skillSubtopic: 'MongoDB Index Profiling',
    },
    {
      question: 'What is the Equality, Sort, Range (ESR) rule for compound index design in databases?',
      options: [
        'Place equality fields first, sort fields second, and range filters last for optimal index coverage',
        'Sort data before inserting into tables',
        'Limit database queries to 3 conditions maximum',
        'Encrypt all index columns on disk',
      ],
      correctAnswerIndex: 0,
      explanation: 'The ESR rule maximizes index efficiency by filtering exact matches, avoiding in-memory sort, and applying range filters.',
      skillSubtopic: 'Compound Indexing',
    },
    {
      question: 'Which MongoDB aggregation stage is used to deconstruct an array field into individual documents?',
      options: ['$unwind', '$group', '$project', '$lookup'],
      correctAnswerIndex: 0,
      explanation: '$unwind outputs one document for each element in the specified array field.',
      skillSubtopic: 'Aggregation Pipelines',
    },
    {
      question: 'In relational SQL, what is the difference between WHERE and HAVING clauses?',
      options: [
        'WHERE filters rows before aggregation; HAVING filters aggregated groups after GROUP BY',
        'WHERE only works with numbers; HAVING works with text',
        'HAVING is used exclusively for table creation',
        'WHERE is executed after HAVING',
      ],
      correctAnswerIndex: 0,
      explanation: 'WHERE filters individual table rows prior to aggregation, while HAVING filters group results.',
      skillSubtopic: 'SQL Query Optimization',
    },
  ],

  python: [
    {
      question: 'In Python, what is the memory advantage of a generator expression over a list comprehension?',
      options: [
        'Generators yield items lazily on-demand with O(1) space complexity instead of storing all items in memory',
        'Generators compile directly to machine bytecode',
        'Generators run on multi-threaded background workers',
        'Generators only store integer primitives',
      ],
      correctAnswerIndex: 0,
      explanation: 'Generators evaluate values lazily, maintaining minimal memory footprint for large datasets.',
      skillSubtopic: 'Generators & Iterators',
    },
    {
      question: 'In Pandas, why are vectorized operations preferred over row iteration (for loops / .iterrows())?',
      options: [
        'Vectorized operations run in compiled C/SIMD instructions without Python interpreter loop overhead',
        'Vectorization automatically writes data to SQL databases',
        'iterrows() cannot handle numerical columns',
        'Vectorization reduces disk storage requirements',
      ],
      correctAnswerIndex: 0,
      explanation: 'Vectorized Pandas/NumPy operations delegate computation to precompiled C routines for high performance.',
      skillSubtopic: 'Pandas Performance',
    },
    {
      question: 'What is the function of Python decorators with the @ syntax?',
      options: [
        'To wrap a function and augment its behavior without permanently altering its core code',
        'To declare a variable as thread-safe',
        'To automatically generate unit tests',
        'To export functions to C++ shared libraries',
      ],
      correctAnswerIndex: 0,
      explanation: 'Decorators are higher-order functions that modify or extend function execution dynamically.',
      skillSubtopic: 'Functional Decorators',
    },
  ],

  machinelearning: [
    {
      question: 'How does L1 regularization (Lasso) differ from L2 regularization (Ridge) in linear models?',
      options: [
        'L1 penalizes absolute weights driving coefficients to exact zero; L2 penalizes squared weights',
        'L1 is only for classification; L2 is only for regression',
        'L2 eliminates features completely while L1 keeps all features',
        'L1 cannot be used with gradient descent',
      ],
      correctAnswerIndex: 0,
      explanation: 'L1 regularization produces sparse feature sets by driving non-critical coefficients to zero.',
      skillSubtopic: 'Model Regularization',
    },
    {
      question: 'When evaluating a classification model on an imbalanced dataset, why is AUC-ROC / PR-AUC preferred over raw Accuracy?',
      options: [
        'Accuracy can be deceptively high by simply predicting the majority class, masking poor minority detection',
        'Accuracy cannot be calculated on numerical data',
        'AUC-ROC requires fewer computation cycles',
        'PR-AUC only applies to clustering tasks',
      ],
      correctAnswerIndex: 0,
      explanation: 'Accuracy ignores class distribution, whereas Precision-Recall and ROC curves evaluate discriminative thresholds.',
      skillSubtopic: 'Model Evaluation Metrics',
    },
    {
      question: 'What is the purpose of Cross-Validation (e.g. 5-Fold CV) in Machine Learning?',
      options: [
        'To evaluate model generalization performance and detect overfitting across multiple data splits',
        'To reduce dataset size before training',
        'To convert continuous variables into discrete labels',
        'To deploy models directly to Kubernetes',
      ],
      correctAnswerIndex: 0,
      explanation: 'Cross-validation splits data into folds to validate that performance is stable across different subsets.',
      skillSubtopic: 'Cross Validation & Generalization',
    },
  ],

  devops: [
    {
      question: 'What is the difference between Docker CMD and ENTRYPOINT in a Dockerfile?',
      options: [
        'ENTRYPOINT sets the default executable, while CMD provides default parameters that can be overridden at runtime',
        'CMD runs during build time while ENTRYPOINT runs during container startup',
        'ENTRYPOINT can only run shell scripts; CMD runs binary files',
        'There is no difference in execution',
      ],
      correctAnswerIndex: 0,
      explanation: 'ENTRYPOINT configures the primary binary to execute, and CMD provides default arguments.',
      skillSubtopic: 'Containerization & Docker',
    },
    {
      question: 'In Kubernetes, what is the role of a Pod compared to a Deployment?',
      options: [
        'A Pod is the smallest deployable compute unit (one or more containers); a Deployment manages replica sets, scaling, and rolling updates',
        'A Deployment runs on developer laptops while a Pod runs only in production',
        'A Pod stores persistent volumes while a Deployment only stores network routes',
        'A Pod is a physical server while a Deployment is a virtual machine',
      ],
      correctAnswerIndex: 0,
      explanation: 'Pods encapsulate container instances, whereas Deployments declare desired state, scaling, and update policies.',
      skillSubtopic: 'Kubernetes Orchestration',
    },
    {
      question: 'What is the core principle of Infrastructure as Code (IaC) with tools like Terraform?',
      options: [
        'Declaring cloud infrastructure state in version-controlled configuration files for repeatable, automated provisioning',
        'Writing manual shell commands inside production servers',
        'Replacing all databases with flat JSON files',
        'Preventing developers from writing unit tests',
      ],
      correctAnswerIndex: 0,
      explanation: 'IaC manages infrastructure declaratively with version control, state drift detection, and automated provisioning.',
      skillSubtopic: 'Infrastructure as Code',
    },
  ],

  businessanalyst: [
    {
      question: 'What is the primary difference between a Business Requirements Document (BRD) and a Functional Requirements Document (FRD)?',
      options: [
        'A BRD describes high-level business goals and problem statements; an FRD details exact system behavior, inputs, outputs, and workflows',
        'A BRD is written by software developers; an FRD is written by sales teams',
        'A BRD is only used in Waterfall; an FRD is only used in Scrum',
        'There is no functional distinction',
      ],
      correctAnswerIndex: 0,
      explanation: 'The BRD outlines business objectives and ROI, whereas the FRD specifies technical requirements and system capabilities.',
      skillSubtopic: 'Requirements Engineering',
    },
    {
      question: 'In Excel data modeling, why is INDEX-MATCH or XLOOKUP preferred over traditional VLOOKUP?',
      options: [
        'They do not break when columns are inserted/rearranged and can perform flexible left-lookups',
        'They only work with binary datasets',
        'VLOOKUP is not compatible with modern spreadsheet software',
        'They automatically format cells with colors',
      ],
      correctAnswerIndex: 0,
      explanation: 'INDEX-MATCH and XLOOKUP reference columns independently, providing robustness against structural spreadsheet changes.',
      skillSubtopic: 'Advanced Excel Analytics',
    },
    {
      question: 'What is a Star Schema in Data Warehousing and Business Intelligence?',
      options: [
        'A dimensional model with a central Fact table surrounded by Denormalized Dimension tables for fast BI querying',
        'A network topology connecting 5 client computers to a server',
        'A database that only stores user passwords',
        'A software testing methodology',
      ],
      correctAnswerIndex: 0,
      explanation: 'A Star Schema simplifies analytical queries by connecting metric Fact tables directly to descriptive Dimension tables.',
      skillSubtopic: 'BI & Data Warehousing',
    },
  ],
};

class QuizGenerator {
  shuffleQuestion(q) {
    const originalCorrect = q.options[q.correctAnswerIndex];
    const optionsWithIndex = q.options.map((opt, idx) => ({ opt, isCorrect: idx === q.correctAnswerIndex }));
    
    for (let i = optionsWithIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
    }
    const shuffledOptions = optionsWithIndex.map(o => o.opt);
    const newCorrectIndex = optionsWithIndex.findIndex(o => o.isCorrect);

    return {
      question: q.question,
      options: shuffledOptions,
      correctAnswerIndex: newCorrectIndex,
      explanation: q.explanation,
      skillSubtopic: q.skillSubtopic,
    };
  }

  getBankForSkill(skillName = '') {
    const s = (skillName || '').toLowerCase();
    if (s.includes('react')) return QUESTION_BANK.react;
    if (s.includes('node') || s.includes('express') || s.includes('api')) return QUESTION_BANK.node;
    if (s.includes('mongo') || s.includes('sql') || s.includes('database') || s.includes('postgres')) return QUESTION_BANK.database;
    if (s.includes('ml') || s.includes('machine learning') || s.includes('deep learning') || s.includes('ai')) return QUESTION_BANK.machinelearning;
    if (s.includes('python') || s.includes('pandas') || s.includes('numpy') || s.includes('data science')) return QUESTION_BANK.python;
    if (s.includes('docker') || s.includes('kubernetes') || s.includes('devops') || s.includes('ci') || s.includes('linux') || s.includes('terraform')) return QUESTION_BANK.devops;
    if (s.includes('business') || s.includes('excel') || s.includes('power bi') || s.includes('tableau') || s.includes('requirements') || s.includes('analysis')) return QUESTION_BANK.businessanalyst;
    return QUESTION_BANK.javascript;
  }

  async generateQuizForSkill(skillName, difficulty = 'Intermediate', count = null) {
    const questionCount = count ? Math.min(10, Math.max(1, count)) : 3;

    const prompt = `Generate exactly ${questionCount} technical multiple-choice questions for the skill "${skillName}" at "${difficulty}" level.
Output valid JSON only matching this format:
{
  "title": "${skillName} Checkpoint",
  "skill": "${skillName}",
  "difficulty": "${difficulty}",
  "passingScore": 70,
  "questions": [
    {
      "question": "question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "concise explanation",
      "skillSubtopic": "topic name"
    }
  ]
}`;

    const raw = await llmService.generateContent(prompt, { temperature: 0.3 });
    if (raw) {
      try {
        const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length >= 1) {
          const slicedQuestions = parsed.questions.slice(0, questionCount).map(q => this.shuffleQuestion(q));
          return await Quiz.create({
            title: parsed.title || `${skillName} ${questionCount}-Question Checkpoint`,
            skill: skillName,
            category: 'Technical Assessment',
            difficulty,
            questions: slicedQuestions,
            createdBy: 'AI_Generator',
          });
        }
      } catch (e) {
        // Fall back to localized bank if JSON parse fails
      }
    }

    const bank = this.getBankForSkill(skillName);
    const shuffledBank = [...bank].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledBank.slice(0, Math.min(questionCount, shuffledBank.length)).map(q => this.shuffleQuestion(q));

    return await Quiz.create({
      title: `${skillName} ${selectedQuestions.length}-Question Checkpoint`,
      skill: skillName,
      category: 'Assessment',
      difficulty,
      questions: selectedQuestions,
      createdBy: 'System',
    });
  }
}

const quizGenerator = new QuizGenerator();
module.exports = quizGenerator;
