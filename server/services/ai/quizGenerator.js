const llmService = require('./llmService');
const Quiz = require('../../models/Quiz');

class QuizGenerator {
  async generateQuizForSkill(skillName, difficulty = 'Intermediate', count = null) {
    const questionCount = count || 5;
    const prompt = `Generate a ${questionCount}-question technical quiz for the skill "${skillName}" at "${difficulty}" level.
Output strictly valid JSON with this format:
{
  "title": "${skillName} Concept Checkpoint",
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
          const slicedQuestions = count ? parsed.questions.slice(0, count) : parsed.questions;
          const quizDoc = await Quiz.create({
            title: parsed.title || `${skillName} Mastery Assessment`,
            skill: skillName,
            category: 'Technical Assessment',
            difficulty,
            questions: slicedQuestions,
            createdBy: 'AI_Generator',
          });
          return quizDoc;
        }
      } catch (e) {
        // Fallback
      }
    }

    // Check DB for existing quizzes matching skill
    const allMatches = await Quiz.find({ skill: new RegExp(`^${skillName}$`, 'i') });
    if (allMatches.length > 0) {
      if (count) {
        const matchWithCount = allMatches.find(q => q.questions && q.questions.length === count);
        if (matchWithCount) return matchWithCount;

        const baseQuiz = allMatches[0];
        const sliced = baseQuiz.questions.slice(0, count);
        return await Quiz.create({
          title: `${skillName} ${count}-Question Checkpoint`,
          skill: skillName,
          category: baseQuiz.category || 'Assessment',
          difficulty: baseQuiz.difficulty || difficulty,
          questions: sliced,
          createdBy: 'AI_Generator',
        });
      }
      return allMatches[0];
    }

    // Accurate fallback questions bank
    let questions = this.getFallbackQuestions(skillName, difficulty);
    if (count && questions.length > count) {
      questions = questions.slice(0, count);
    }
    return await Quiz.create({
      title: `${skillName} Core Checkpoint`,
      skill: skillName,
      category: 'Assessment',
      difficulty,
      questions,
      createdBy: 'System',
    });
  }

  getFallbackQuestions(skillName, difficulty) {
    const s = (skillName || '').toLowerCase();

    // 1. REST APIs & HTTP
    if (s.includes('rest') || s.includes('api') || s.includes('http')) {
      return [
        {
          question: 'Which HTTP method should be used for an idempotent operation that updates a complete existing resource?',
          options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
          correctAnswerIndex: 1,
          explanation: '`PUT` is defined as idempotent according to HTTP specifications; replacing a resource multiple times with identical payload leaves the server state unchanged.',
          skillSubtopic: 'HTTP Methods',
        },
        {
          question: 'What is the primary difference between HTTP status code 401 Unauthorized and 403 Forbidden?',
          options: [
            '401 indicates missing or invalid authentication credentials, while 403 indicates the user is authenticated but lacks required permission',
            '401 is a server error, while 403 is a client browser error',
            '401 is only used in HTTPS, while 403 is for plain HTTP',
            '401 automatically redirects the user to the home page',
          ],
          correctAnswerIndex: 0,
          explanation: 'HTTP 401 means "Unauthenticated" (who are you?), while HTTP 403 means "Forbidden / Unauthorized" (I know who you are, but you cannot access this).',
          skillSubtopic: 'Status Codes',
        },
        {
          question: 'What architectural constraint of REST ensures that every client request contains all the information needed to service it?',
          options: ['Client-Server', 'Statelessness', 'Cacheability', 'Layered System'],
          correctAnswerIndex: 1,
          explanation: 'The Statelessness constraint requires that session state is kept entirely on the client, so each request to the server is independent.',
          skillSubtopic: 'REST Principles',
        },
        {
          question: 'When implementing API pagination for large datasets, why is cursor-based pagination preferred over offset-based (skip/limit) pagination?',
          options: [
            'Offset pagination cannot handle strings',
            'Cursor pagination prevents duplicate or missing items when records are inserted or deleted during traversal and maintains consistent O(1) query time',
            'Cursor pagination is supported only in SQL databases',
            'Offset pagination consumes 10x more network bandwidth',
          ],
          correctAnswerIndex: 1,
          explanation: 'Offset pagination suffers from performance degradation on large offsets (O(N) skip) and pagination drift if items are added while browsing.',
          skillSubtopic: 'Pagination & Performance',
        },
        {
          question: 'What is the purpose of the HTTP `Content-Type: application/json` header in API requests?',
          options: [
            'To encrypt the payload with RSA',
            'To indicate the media type of the request body so the server parser knows how to deserialize it',
            'To bypass CORS security validation',
            'To force the server to respond synchronously',
          ],
          correctAnswerIndex: 1,
          explanation: '`Content-Type` tells the receiving server or client what format the incoming payload data is encoded in.',
          skillSubtopic: 'HTTP Headers',
        },
      ];
    }

    // 2. Authentication & Security
    if (s.includes('auth') || s.includes('security') || s.includes('jwt')) {
      return [
        {
          question: 'What are the three parts of a JSON Web Token (JWT) separated by dots?',
          options: [
            'Header, Payload, Signature',
            'Username, Password, Expiration',
            'Issuer, Hash, Salt',
            'Domain, Cookie, SessionID',
          ],
          correctAnswerIndex: 0,
          explanation: 'A JWT consists of Header (algorithm & token type), Payload (claims & user ID), and Signature (cryptographic hash validating integrity).',
          skillSubtopic: 'JWT Structure',
        },
        {
          question: 'Why should sensitive JWT tokens be stored in HTTP-Only cookies instead of browser LocalStorage?',
          options: [
            'HTTP-Only cookies cannot be accessed or stolen via malicious client-side JavaScript (mitigating XSS attacks)',
            'LocalStorage is deleted whenever the browser reloads',
            'Cookies automatically encrypt the database',
            'LocalStorage cannot hold more than 10 bytes',
          ],
          correctAnswerIndex: 0,
          explanation: 'Storing auth tokens in HTTP-Only cookies protects them from Cross-Site Scripting (XSS) attacks because JavaScript `document.cookie` cannot read them.',
          skillSubtopic: 'XSS & Cookie Security',
        },
        {
          question: 'What is the primary role of "salt" when hashing passwords with bcrypt?',
          options: [
            'To speed up CPU hashing performance',
            'To ensure identical passwords generate completely different hashes, defending against precomputed Rainbow Table attacks',
            'To compress password strings into 8-bit characters',
            'To decrypt passwords on the backend',
          ],
          correctAnswerIndex: 1,
          explanation: 'Salt is random data added to a password before hashing, ensuring two users with identical passwords have unique hash values.',
          skillSubtopic: 'Password Hashing',
        },
        {
          question: 'What is Cross-Origin Resource Sharing (CORS)?',
          options: [
            'A database replication protocol',
            'A browser security mechanism that restricts cross-origin HTTP requests unless the server explicitly permits them via headers',
            'A CSS layout module for responsive grids',
            'A compression algorithm for JSON',
          ],
          correctAnswerIndex: 1,
          explanation: 'CORS is a browser security feature enforced by browsers that uses HTTP headers to tell browsers whether a web app can access resources from a different origin.',
          skillSubtopic: 'CORS Security',
        },
        {
          question: 'What does Role-Based Access Control (RBAC) middleware verify before executing a protected controller action?',
          options: [
            'That the user has the required assigned permission or role (e.g. admin vs student) to perform the action',
            'That the user is using Google Chrome',
            'That the database has zero empty records',
            'That the client IP address is from a specific country',
          ],
          correctAnswerIndex: 0,
          explanation: 'RBAC checks the authenticated user\'s role against authorized roles required to access specific endpoints.',
          skillSubtopic: 'Authorization & RBAC',
        },
      ];
    }

    // 3. React.js
    if (s.includes('react')) {
      return [
        {
          question: 'What is the primary purpose of the `useEffect` hook in React?',
          options: [
            'To directly modify the browser DOM',
            'To perform side effects such as data fetching, subscriptions, or timer setups',
            'To declare mutable component state',
            'To replace all CSS stylesheets',
          ],
          correctAnswerIndex: 1,
          explanation: '`useEffect` lets you synchronize a component with external systems and run side effects after rendering.',
          skillSubtopic: 'Hooks & Lifecycle',
        },
        {
          question: 'Why should state in React be treated as immutable?',
          options: [
            'Because JavaScript objects cannot be modified',
            'To ensure React can detect state changes via shallow comparison and trigger proper re-renders',
            'To prevent any memory garbage collection',
            'To automatically export data to local storage',
          ],
          correctAnswerIndex: 1,
          explanation: 'React compares state references to decide if UI needs updating. Direct mutations bypass this comparison.',
          skillSubtopic: 'State Management',
        },
        {
          question: 'Which of the following is true regarding React keys in lists?',
          options: [
            'Keys must be globally unique across the entire application',
            'Keys help React identify which items have changed, been added, or removed',
            'Using array index as a key is always recommended for dynamic sorting',
            'Keys are accessible as `props.key` inside child components',
          ],
          correctAnswerIndex: 1,
          explanation: 'Keys give elements a stable identity across renders, allowing React to optimize reconciliation.',
          skillSubtopic: 'List Reconciliation',
        },
        {
          question: 'What problem does the Context API primarily solve in React applications?',
          options: [
            'Prop drilling across deeply nested component hierarchies',
            'Replacing backend REST API calls',
            'Accelerating bundle compilation times in Vite',
            'Creating database schema validations',
          ],
          correctAnswerIndex: 0,
          explanation: 'Context provides a way to pass data through the component tree without manually passing props down at every level.',
          skillSubtopic: 'Context API',
        },
        {
          question: 'What does React.memo do when wrapping a functional component?',
          options: [
            'It stores state in browser sessionStorage',
            'It memoizes the rendered output and skips re-rendering if props have not changed',
            'It forces the component to re-render on every global event',
            'It converts the component to a Web Worker',
          ],
          correctAnswerIndex: 1,
          explanation: 'React.memo is a higher order component that prevents unnecessary re-renders when props are shallowly equal.',
          skillSubtopic: 'Performance Optimization',
        },
      ];
    }

    // 4. Node.js & Express
    if (s.includes('node') || s.includes('express')) {
      return [
        {
          question: 'What is the Node.js Event Loop primarily responsible for?',
          options: [
            'Compiling JavaScript code to C++ binary',
            'Managing non-blocking, asynchronous I/O operations on a single execution thread',
            'Executing multi-threaded mathematical matrix multiplications',
            'Managing database transactions directly',
          ],
          correctAnswerIndex: 1,
          explanation: 'The event loop offloads operations to the system kernel whenever possible, allowing Node.js to handle high concurrency with single-threaded event-driven execution.',
          skillSubtopic: 'Architecture & Event Loop',
        },
        {
          question: 'In Express.js, what does calling `next()` inside a custom middleware function do?',
          options: [
            'Restarts the HTTP server',
            'Passes execution control to the next middleware or route handler in the pipeline stack',
            'Immediately closes the client TCP connection',
            'Rolls back database transactions',
          ],
          correctAnswerIndex: 1,
          explanation: '`next()` invokes the subsequent middleware function in the request-response cycle.',
          skillSubtopic: 'Middleware Pipeline',
        },
        {
          question: 'Why should password hashes (e.g. using bcrypt) be computed asynchronously in Node.js HTTP request handlers?',
          options: [
            'Because synchronous hashing would block the single-threaded Event Loop and stall all concurrent users',
            'Because bcrypt only runs on client browsers',
            'Because async functions use less storage on disk',
            'To encrypt the payload for DNS lookup',
          ],
          correctAnswerIndex: 0,
          explanation: 'Heavy CPU-bound operations executed synchronously block the Node.js event loop, preventing any other incoming requests from being processed.',
          skillSubtopic: 'Security & Concurrency',
        },
        {
          question: 'Which HTTP status code is most appropriate when a client request fails due to missing or invalid JWT authentication credentials?',
          options: ['200 OK', '401 Unauthorized', '404 Not Found', '500 Internal Server Error'],
          correctAnswerIndex: 1,
          explanation: 'HTTP 401 Unauthorized indicates that the request requires valid user authentication credentials.',
          skillSubtopic: 'REST & Authentication',
        },
        {
          question: 'What is the purpose of `process.env` in a Node.js application?',
          options: [
            'To access runtime environment variables and configuration secrets',
            'To modify operating system kernel drivers',
            'To store temporary user sessions in RAM',
            'To automate git commits',
          ],
          correctAnswerIndex: 0,
          explanation: '`process.env` exposes system environment variables such as database connection strings, ports, and API keys.',
          skillSubtopic: 'Environment Configuration',
        },
      ];
    }

    // 5. MongoDB & Databases
    if (s.includes('mongo') || s.includes('database') || s.includes('sql')) {
      return [
        {
          question: 'What is an Index in MongoDB and why is it used?',
          options: [
            'A backup copy of the entire collection stored on AWS S3',
            'A specialized data structure (typically B-Tree) that holds a small portion of the data set in an easy-to-traverse form to drastically speed up query execution',
            'A list of all users who have access to the database',
            'A tool to encrypt passwords in BSON format',
          ],
          correctAnswerIndex: 1,
          explanation: 'Indexes prevent full collection scans (COLLSCAN), allowing MongoDB to locate documents in logarithmic time (IXSCAN).',
          skillSubtopic: 'Indexing',
        },
        {
          question: 'Which aggregation pipeline stage is used in MongoDB to join documents from another collection (similar to SQL LEFT JOIN)?',
          options: ['$match', '$group', '$lookup', '$unwind'],
          correctAnswerIndex: 2,
          explanation: '`$lookup` performs a left outer join to an unsharded collection in the same database to filter in documents from the joined collection.',
          skillSubtopic: 'Aggregation Framework',
        },
        {
          question: 'When is Embedding documents preferred over Referencing in MongoDB data modeling?',
          options: [
            'When data has a 1-to-few relationship and related data is frequently read together with the parent document',
            'When the child documents grow unboundedly to millions of records',
            'When data needs to be accessed independently by unrelated services',
            'Embedding is strictly deprecated in MongoDB',
          ],
          correctAnswerIndex: 0,
          explanation: 'Embedding is ideal for 1-to-few relationships with strong containment, avoiding costly joins and ensuring atomic document updates.',
          skillSubtopic: 'Data Modeling',
        },
        {
          question: 'What does the `$unwind` stage do in a MongoDB aggregation pipeline?',
          options: [
            'Reverses the order of documents in the collection',
            'Deconstructs an array field from the input documents to output a document for each element in the array',
            'Deletes all empty documents from the database',
            'Encrypts string fields in BSON',
          ],
          correctAnswerIndex: 1,
          explanation: '`$unwind` splits an array into individual documents for each array item, allowing downstream grouping and filtering on array elements.',
          skillSubtopic: 'Aggregation Operators',
        },
        {
          question: 'What is the maximum BSON document size limit in MongoDB?',
          options: ['2 MB', '16 MB', '64 MB', '1 GB'],
          correctAnswerIndex: 1,
          explanation: 'The maximum BSON document size is 16 megabytes, ensuring single documents cannot consume excessive RAM during query execution.',
          skillSubtopic: 'BSON Storage Limits',
        },
      ];
    }

    // 6. Docker & Deployment
    if (s.includes('docker') || s.includes('devops') || s.includes('deploy') || s.includes('ci/cd')) {
      return [
        {
          question: 'What is the fundamental difference between a Docker Container and a Virtual Machine (VM)?',
          options: [
            'Containers share the host OS kernel and isolate user spaces, making them lightweight and fast, while VMs run full guest operating systems on a hypervisor',
            'Containers require specialized hardware CPUs',
            'VMs cannot run Linux distributions',
            'Containers can only run Python applications',
          ],
          correctAnswerIndex: 0,
          explanation: 'Containers virtualize at the OS kernel level, while VMs virtualize at the hardware level with a full guest OS.',
          skillSubtopic: 'Containerization Basics',
        },
        {
          question: 'In a Dockerfile, what is the difference between `RUN` and `CMD` instructions?',
          options: [
            '`RUN` executes commands during image build time to commit layers, while `CMD` specifies default execution commands when container launches',
            '`CMD` runs before the build starts',
            '`RUN` is used only for deleting files',
            '`CMD` can only be used once per image layer',
          ],
          correctAnswerIndex: 0,
          explanation: '`RUN` runs at build time and creates image layers; `CMD` provides defaults for an executing container.',
          skillSubtopic: 'Dockerfile Directives',
        },
        {
          question: 'What does the `docker-compose.yml` file primarily facilitate?',
          options: [
            'Compiling TypeScript code into binary',
            'Defining and running multi-container Docker applications with shared networks and volumes',
            'Automating domain name registration',
            'Encrypting SSL certificates',
          ],
          correctAnswerIndex: 1,
          explanation: 'Docker Compose allows you to orchestrate multiple services (e.g. Web App + API + MongoDB + Redis) with a single command (`docker compose up`).',
          skillSubtopic: 'Multi-Container Orchestration',
        },
        {
          question: 'Why are Multi-Stage Builds used in production Dockerfiles for Node/React apps?',
          options: [
            'To keep production images small by discarding heavy build dependencies (node_modules, SDKs) in the final runtime stage',
            'To force Docker to download three operating systems',
            'To run unit tests in browser window',
            'To convert JavaScript into C++',
          ],
          correctAnswerIndex: 0,
          explanation: 'Multi-stage builds separate the build environment from the minimal runtime image, reducing image size from 1GB+ down to ~50MB.',
          skillSubtopic: 'Image Optimization',
        },
        {
          question: 'In Continuous Integration / Continuous Deployment (CI/CD), what is the purpose of automated pipeline linting and unit testing?',
          options: [
            'To catch regressions and bugs before code merges to the main branch or deploys to production',
            'To format CSS colors automatically',
            'To generate user passwords',
            'To increase deployment time intentionally',
          ],
          correctAnswerIndex: 0,
          explanation: 'CI pipelines test every commit automatically to verify quality and prevent broken code from reaching staging/production environments.',
          skillSubtopic: 'CI/CD Best Practices',
        },
      ];
    }

    // 7. General JavaScript Checkpoint
    return [
      {
        question: 'Which of the following describes closure in JavaScript?',
        options: [
          'A method to close browser tabs programmatically',
          'A function bundled together with references to its surrounding lexical state (scope)',
          'A syntax error that halts script execution',
          'A feature only available in TypeScript',
        ],
        correctAnswerIndex: 1,
        explanation: 'A closure gives a function access to its outer scope even after the outer function has finished executing.',
        skillSubtopic: 'Lexical Scope',
      },
      {
        question: 'What is the difference between `==` and `===` in JavaScript?',
        options: [
          '`==` performs type coercion before comparison, whereas `===` checks both value and type strictly',
          '`===` converts both operands to strings before comparison',
          'There is no difference in modern ES6',
          '`==` is only used for numbers',
        ],
        correctAnswerIndex: 0,
        explanation: 'Strict equality (`===`) checks for identical type and value without performing implicit type coercion.',
        skillSubtopic: 'Type Coercion',
      },
      {
        question: 'What does a Promise represent in JavaScript asynchronous programming?',
        options: [
          'A variable that cannot be reassigned',
          'An eventual completion or failure of an asynchronous operation and its resulting value',
          'A direct memory pointer to the database',
          'A background daemon thread running outside the browser',
        ],
        correctAnswerIndex: 1,
        explanation: 'A Promise is a proxy for a value not necessarily known when the promise is created.',
        skillSubtopic: 'Asynchronous JavaScript',
      },
      {
        question: 'Which array method creates a new array populated with the results of calling a provided function on every element?',
        options: ['forEach()', 'map()', 'filter()', 'reduce()'],
        correctAnswerIndex: 1,
        explanation: '`Array.prototype.map()` transforms every element and returns a new array with the transformed items.',
        skillSubtopic: 'Array Methods',
      },
      {
        question: 'What is the purpose of the `async/await` syntax in modern JavaScript?',
        options: [
          'To convert single-threaded JS into multi-threaded assembly code',
          'To write asynchronous promise-based code with clean, synchronous-looking readability',
          'To prevent any errors from ever being thrown',
          'To compress network JSON payloads',
        ],
        correctAnswerIndex: 1,
        explanation: '`async/await` is syntactic sugar over Promises, making asynchronous code cleaner and easier to read and maintain.',
        skillSubtopic: 'Async Control Flow',
      },
    ];
  }
}

const quizGenerator = new QuizGenerator();
module.exports = quizGenerator;
