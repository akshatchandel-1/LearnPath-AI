const llmService = require('./llmService');
const Quiz = require('../../models/Quiz');

const QUESTION_BANK = {
  javascript: [
    {
      question: 'What is the primary output order of `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`?',
      options: ['1, 4, 3, 2', '1, 2, 3, 4', '1, 4, 2, 3', '1, 3, 4, 2'],
      correctAnswerIndex: 0,
      explanation: 'Microtasks (Promises) execute before macrotasks (setTimeout) after the synchronous execution stack empties, resulting in 1, 4, 3, 2.',
      skillSubtopic: 'Event Loop & Microtasks',
    },
    {
      question: 'How does `Object.freeze()` differ from `Object.seal()` in JavaScript?',
      options: [
        'freeze makes all existing properties read-only, whereas seal permits modifying existing writable property values',
        'seal prevents adding new properties while freeze allows adding new properties',
        'freeze is for arrays only while seal is for objects only',
        'There is no functional difference between them'
      ],
      correctAnswerIndex: 0,
      explanation: 'Object.freeze() sets configurable and writable to false. Object.seal() sets configurable to false but retains existing writability.',
      skillSubtopic: 'Object Mutability',
    },
    {
      question: 'Which method should be used to abort an active `fetch()` request when a component unmounts?',
      options: ['AbortController.abort()', 'fetch.cancel()', 'window.stopFetch()', 'Promise.reject()'],
      correctAnswerIndex: 0,
      explanation: 'AbortController generates a signal passed to fetch() that cancels active network requests upon calling abort().',
      skillSubtopic: 'Asynchronous Control',
    },
    {
      question: 'What is the consequence of creating a closure over a large outer scope variable inside an event listener that is never removed?',
      options: [
        'Potential memory leak as the garbage collector cannot reclaim the referenced memory',
        'Immediate syntax error at compilation time',
        'The variable is automatically garbage collected after 5 seconds',
        'Browser tab crashes synchronously on startup'
      ],
      correctAnswerIndex: 0,
      explanation: 'Retaining references in persistent event listeners creates memory leaks because the garbage collector cannot free active reachability chains.',
      skillSubtopic: 'Memory Lifecycle & Closures',
    },
    {
      question: 'Which array method executes a reducer function on each element without mutating the original array?',
      options: ['reduce()', 'splice()', 'reverse()', 'sort()'],
      correctAnswerIndex: 0,
      explanation: 'Array.prototype.reduce() accumulates array values into a single return value without mutating the source array.',
      skillSubtopic: 'Functional Array Pipelines',
    },
    {
      question: 'In ES Modules (ESM), how does static `import` differ from dynamic `import()`?',
      options: [
        'Static imports are resolved at compile/parse time, whereas dynamic import() returns a Promise resolved at runtime',
        'Static imports only work in Node.js while dynamic imports only work in the browser',
        'Dynamic import() can only load JSON files',
        'Static imports are always asynchronous'
      ],
      correctAnswerIndex: 0,
      explanation: 'Static import statements enable tree-shaking by resolving at parse time, while import() loads modules on-demand at runtime.',
      skillSubtopic: 'ES Modules & Dynamic Loading',
    },
    {
      question: 'What happens when `Promise.all([p1, p2, p3])` encounters a rejection on `p2` while `p1` is still pending?',
      options: [
        'The returned Promise immediately rejects with the reason from p2 (fail-fast behavior)',
        'It waits for p1 and p3 to finish before rejecting',
        'It ignores p2 and returns the fulfilled results of p1 and p3',
        'It converts the rejection into an empty array'
      ],
      correctAnswerIndex: 0,
      explanation: 'Promise.all rejects immediately upon the first rejection. To wait for all settlements, use Promise.allSettled().',
      skillSubtopic: 'Promise Concurrency',
    },
    {
      question: 'What does the `WeakMap` data structure prevent in long-running JavaScript applications?',
      options: [
        'Memory leaks by allowing object keys to be garbage collected when no other references exist',
        'Concurrent thread execution conflicts',
        'Type coercion errors during arithmetic operations',
        'Uncaught JSON parsing exceptions'
      ],
      correctAnswerIndex: 0,
      explanation: 'WeakMap holds weak references to key objects, allowing the garbage collector to reclaim them when unreachable elsewhere.',
      skillSubtopic: 'Data Structures & Garbage Collection',
    },
  ],

  react: [
    {
      question: 'What is the primary purpose of the `useCallback` hook in React?',
      options: [
        'To memoize a callback function instance between renders to prevent unnecessary child re-renders',
        'To execute asynchronous side-effects on initial component mount',
        'To create a mutable ref that persists across render cycles',
        'To dynamically manage browser URL query parameters'
      ],
      correctAnswerIndex: 0,
      explanation: 'useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed.',
      skillSubtopic: 'Hooks & Optimization',
    },
    {
      question: 'What problem occurs when a `useEffect` hook relies on a state variable that is omitted from its dependency array?',
      options: [
        'Stale closure bug where the effect accesses outdated state values from previous renders',
        'Fatal syntax error during compilation',
        'Component permanently unmounts immediately',
        'State is reset to null automatically'
      ],
      correctAnswerIndex: 0,
      explanation: 'Omitting dependencies captures stale variables in the closure from the render cycle where the effect was initialized.',
      skillSubtopic: 'useEffect Dependency Management',
    },
    {
      question: 'Why should keys in React lists be stable and unique identifiers instead of array indices?',
      options: [
        'Using array indices causes DOM state bugs and inefficient re-renders when items are reordered or filtered',
        'React throws a compile-time fatal error if an index is used',
        'Indices prevent Tailwind CSS styles from rendering',
        'Indices consume 10x more browser RAM'
      ],
      correctAnswerIndex: 0,
      explanation: 'Stable keys allow React reconciliation to identify which items have changed, been added, or removed correctly.',
      skillSubtopic: 'Virtual DOM & Reconciliation',
    },
    {
      question: 'How does React 18 Concurrent Mode improve user experience during heavy state updates?',
      options: [
        'By allowing React to interrupt, pause, and resume rendering to keep the browser main thread responsive for user input',
        'By running multiple JavaScript threads inside web workers automatically',
        'By caching all HTTP responses on disk',
        'By disabling CSS animations during data fetching'
      ],
      correctAnswerIndex: 0,
      explanation: 'Concurrent rendering lets React yield execution back to the browser event loop during urgent interactions like typing.',
      skillSubtopic: 'Concurrent Rendering',
    },
    {
      question: 'What is the role of `useMemo` compared to `useCallback`?',
      options: [
        'useMemo caches the calculated return value of a function, while useCallback caches the function definition itself',
        'useMemo is for components and useCallback is for HTML elements',
        'useMemo runs synchronously on server while useCallback runs on client',
        'There is no distinction between them'
      ],
      correctAnswerIndex: 0,
      explanation: 'useMemo(() => computeValue(a, b), [a, b]) caches the result, while useCallback(fn, deps) caches the function reference.',
      skillSubtopic: 'Performance Memoization',
    },
  ],

  node: [
    {
      question: 'How does Node.js achieve high concurrency despite having a single-threaded JavaScript execution engine?',
      options: [
        'Via the Libuv event loop and thread pool for asynchronous non-blocking I/O operations',
        'By compiling all JavaScript into multithreaded C++ binaries',
        'By launching a new OS process for each incoming HTTP request',
        'By using synchronous blocking socket calls'
      ],
      correctAnswerIndex: 0,
      explanation: 'Node.js delegates I/O tasks to the Libuv event loop and worker pool, executing callbacks asynchronously upon completion.',
      skillSubtopic: 'Libuv Architecture',
    },
    {
      question: 'What is the correct way to handle stream backpressure in Node.js?',
      options: [
        'Use `readable.pipe(writable)` or `stream.pipeline()` which manage buffer draining automatically',
        'Increase Node.js buffer memory allocation to 16GB',
        'Call process.exit() if write() returns false',
        'Disable stream chunking and load entire files into RAM'
      ],
      correctAnswerIndex: 0,
      explanation: 'stream.pipeline() properly forwards backpressure signals and cleans up file descriptors upon stream completion or error.',
      skillSubtopic: 'Streams & Backpressure',
    },
    {
      question: 'In Express.js, what must be called in custom error-handling middleware?',
      options: [
        'A middleware function signature with 4 parameters: `(err, req, res, next)`',
        'A middleware function with only 2 parameters: `(req, res)`',
        'An explicit call to process.crash()',
        'A global try/catch block inside package.json'
      ],
      correctAnswerIndex: 0,
      explanation: 'Express identifies error-handling middleware specifically by having 4 arguments: (err, req, res, next).',
      skillSubtopic: 'Express Middleware',
    },
    {
      question: 'What is the difference between `process.nextTick()` and `setImmediate()` in Node.js?',
      options: [
        'process.nextTick() fires immediately after current operation completes before the next event loop phase; setImmediate() runs in the check phase',
        'setImmediate() runs before process.nextTick()',
        'process.nextTick() only runs in worker threads',
        'There is no execution phase difference'
      ],
      correctAnswerIndex: 0,
      explanation: 'nextTick queue is processed immediately after the current tick completes, whereas setImmediate fires in the Check phase.',
      skillSubtopic: 'Event Loop Phases',
    },
  ],

  database: [
    {
      question: 'In MongoDB, which command allows you to inspect query execution plan and verify whether an index is used?',
      options: ['cursor.explain("executionStats")', 'db.profile()', 'db.indexScan()', 'db.verifyQuery()'],
      correctAnswerIndex: 0,
      explanation: 'explain("executionStats") details whether a COLLSCAN (slow collection scan) or IXSCAN (fast index scan) occurred.',
      skillSubtopic: 'MongoDB Index Profiling',
    },
    {
      question: 'What is the primary benefit of compound indexes with Equality, Sort, Range (ESR) ordering in MongoDB?',
      options: [
        'It maximizes query efficiency by filtering exact matches, avoiding in-memory sorts, and applying range filters last',
        'It reduces document storage size by 50%',
        'It enables automatic database sharding across multiple clouds',
        'It forces all collections to reside in browser cache'
      ],
      correctAnswerIndex: 0,
      explanation: 'The ESR rule places Equality fields first, Sort fields second, and Range fields third for optimal index coverage.',
      skillSubtopic: 'Index Optimization (ESR)',
    },
    {
      question: 'Which aggregation pipeline stage is used to deconstruct an array field in documents into separate documents?',
      options: ['$unwind', '$group', '$project', '$lookup'],
      correctAnswerIndex: 0,
      explanation: '$unwind outputs one document for each element in the specified array field.',
      skillSubtopic: 'Aggregation Framework',
    },
  ],

  python: [
    {
      question: 'In Python, what is the key performance advantage of a generator expression over a list comprehension?',
      options: [
        'Generators evaluate items lazily on-demand using constant memory (O(1) space complexity)',
        'Generators execute 100x faster by compiling to machine bytecode',
        'Generators bypass the Global Interpreter Lock (GIL)',
        'Generators can only hold integer values'
      ],
      correctAnswerIndex: 0,
      explanation: 'Generators yield values one at a time, avoiding memory overhead for massive datasets.',
      skillSubtopic: 'Generators & Memory Efficiency',
    },
    {
      question: 'In Pandas, why is vectorized column manipulation preferred over iterating with `for` loops or `.iterrows()`?',
      options: [
        'Vectorized operations execute in optimized C code via NumPy SIMD instructions without Python interpreter overhead',
        'Vectorization automatically encrypts data frames on disk',
        'iterrows() is deprecated in all Python versions',
        'Vectorization produces smaller SVG charts'
      ],
      correctAnswerIndex: 0,
      explanation: 'Vectorized Pandas operations delegate calculations to precompiled C/Fortran array operations for 100x-1000x speedup.',
      skillSubtopic: 'Pandas Vectorization',
    },
    {
      question: 'What is the purpose of Python decorators using the `@` syntax?',
      options: [
        'To wrap another function to extend its behavior without permanently modifying its source code',
        'To declare a class variable as immutable',
        'To automatically write docstrings to markdown files',
        'To run the decorated function on a remote GPU cluster'
      ],
      correctAnswerIndex: 0,
      explanation: 'Decorators are higher-order functions that take a function, augment its execution (e.g. logging, auth), and return it.',
      skillSubtopic: 'Functional Decorators',
    },
  ],
};

class QuizGenerator {
  shuffleQuestion(q) {
    const originalCorrect = q.options[q.correctAnswerIndex];
    const optionsWithIndex = q.options.map((opt, idx) => ({ opt, isCorrect: idx === q.correctAnswerIndex }));
    // Shuffle
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
    const s = skillName.toLowerCase();
    if (s.includes('react')) return QUESTION_BANK.react;
    if (s.includes('node') || s.includes('express')) return QUESTION_BANK.node;
    if (s.includes('mongo') || s.includes('data') || s.includes('sql') || s.includes('database')) return QUESTION_BANK.database;
    if (s.includes('python') || s.includes('pandas') || s.includes('ml') || s.includes('machine learning')) return QUESTION_BANK.python;
    return QUESTION_BANK.javascript;
  }

  async generateQuizForSkill(skillName, difficulty = 'Intermediate', count = null) {
    const questionCount = count || 3;

    // Try LLM if configured
    const prompt = `Generate an exact ${questionCount}-question technical quiz for the skill "${skillName}" at "${difficulty}" level.
Output strictly valid JSON with this format:
{
  "title": "${skillName} Checkpoint",
  "skill": "${skillName}",
  "difficulty": "${difficulty}",
  "passingScore": 70,
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswerIndex": number (0-3),
      "explanation": "string",
      "skillSubtopic": "string"
    }
  ]
}`;

    const raw = await llmService.generateContent(prompt);
    if (raw) {
      try {
        const cleaned = raw.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.questions && parsed.questions.length >= 1) {
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
      } catch (e) {}
    }

    // Dynamic Randomized Question Selection from Bank
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
