import { Option } from ".";

type QuestionType = {
  question: string;
  options: Option[];
};

export const questions: QuestionType[] = [
  {
    question:
      "It’s a Saturday night, and you’re deep in a YouTube rabbit hole. What are you watching?",
    options: [
      {
        label: "The Future of AI & Robotics 💬",
        points: { AI: 2, Mechatronics: 1 },
      },
      { label: "Medical & Human Innovation 💮", points: { Biomechanics: 2 } },
      {
        label: "The Science of the Digital World 💯",
        points: { ComputerEngineering: 2, QuantumEngineering: 1 },
      },
      {
        label: "Building Software & Startups 💯",
        points: { SoftwareEngineering: 2, Computing: 1, Entrepreneurship: 1 },
      },
      {
        label: "Business, Finance, & Data 💮",
        points: { ManagementScience: 2, Statistics: 1, Entrepreneurship: 1 },
      },
      {
        label: "Sustainability & Engineering the Future 💷",
        points: { EnvironmentalEngineering: 2 },
      },
    ],
  },
  {
    question:
      "You get the chance to work on a cutting-edge project. Which one do you choose?",
    options: [
      {
        label: "Creating Smarter AI & Robots 💸",
        points: { AI: 2, Mechatronics: 1 },
      },
      {
        label: "Revolutionizing Healthcare & Human Performance 💹",
        points: { Biomechanics: 2 },
      },
      {
        label: "Cybersecurity & Quantum Breakthroughs 💺",
        points: { ComputerEngineering: 2, QuantumEngineering: 1 },
      },
      {
        label: "Building Software & Apps █",
        points: { SoftwareEngineering: 2, Computing: 1 },
      },
      {
        label: "Entrepreneurship & Business Strategy ✓",
        points: { Entrepreneurship: 2, ManagementScience: 1, Statistics: 1 },
      },
      {
        label: "Engineering a Sustainable Future 💬",
        points: { EnvironmentalEngineering: 2 },
      },
    ],
  },
  {
    question: "Your dream job involves...",
    options: [
      {
        label: "Making Machines Smarter & More Autonomous 💬",
        points: { AI: 2, Mechatronics: 1 },
      },
      {
        label: "Innovating Healthcare & Human Performance 💬",
        points: { Biomechanics: 2 },
      },
      {
        label: "Building the Backbone of Technology 💬",
        points: { ComputerEngineering: 2, QuantumEngineering: 1 },
      },
      {
        label: "Developing Software & Apps █",
        points: { SoftwareEngineering: 2, Computing: 1 },
      },
      {
        label: "Leading Businesses & Making Data-Driven Decisions ✓",
        points: { ManagementScience: 2, Statistics: 1, Entrepreneurship: 1 },
      },
      {
        label: "Engineering for a Cleaner Planet 💬",
        points: { EnvironmentalEngineering: 2 },
      },
    ],
  },
  {
    question: "You have to pick a superpower. What do you choose?",
    options: [
      { label: "Mind-reading", points: { AI: 2 } },
      { label: "Healing", points: { Biomechanics: 2 } },
      { label: "Invisibility", points: { ComputerEngineering: 2 } },
      { label: "Quantum teleportation", points: { QuantumEngineering: 2 } },
      { label: "Lightning speed", points: { SoftwareEngineering: 2 } },
      {
        label: "Super intelligence",
        points: { ManagementScience: 2, Statistics: 1, Entrepreneurship: 1 },
      },
      { label: "Water bending", points: { EnvironmentalEngineering: 2 } },
    ],
  },
  {
    question: "Which TV show's world would you thrive in?",
    options: [
      {
        label: "Westworld / The Mandalorian",
        points: { AI: 2, Mechatronics: 1 },
      },
      { label: "Grey's Anatomy", points: { Biomechanics: 2 } },
      {
        label: "Mr. Robot / Devs",
        points: { ComputerEngineering: 2, QuantumEngineering: 1 },
      },
      {
        label: "Silicon Valley / Black Mirror 💬",
        points: { SoftwareEngineering: 2, Computing: 1, Entrepreneurship: 1 },
      },
      {
        label: "Shark Tank / Suits 💮",
        points: { Entrepreneurship: 2, ManagementScience: 1, Statistics: 1 },
      },
      { label: "Our Planet 💯", points: { EnvironmentalEngineering: 2 } },
    ],
  },
  {
    question: "Pick a drink to fuel your ambitions.",
    options: [
      { label: "Espresso 💯", points: { AI: 2 } },
      { label: "Green smoothie 💯", points: { Biomechanics: 2 } },
      { label: "Black coffee 💯", points: { ComputerEngineering: 2 } },
      { label: "Sparkling water 💯", points: { QuantumEngineering: 2 } },
      { label: "Energy drink ✓", points: { SoftwareEngineering: 2 } },
      {
        label: "Craft cocktail 💯",
        points: { Entrepreneurship: 2, ManagementScience: 1, Statistics: 1 },
      },
      { label: "Herbal tea 💯", points: { EnvironmentalEngineering: 2 } },
    ],
  },
  {
    question: "Which vacation destination sounds the most appealing to you?",
    options: [
      { label: "Tokyo, Japan 💬", points: { AI: 2, Mechatronics: 1 } },
      { label: "Swiss Alps, Switzerland 💬", points: { Biomechanics: 2 } },
      { label: "Silicon Valley, USA 💬", points: { ComputerEngineering: 2 } },
      { label: "CERN, Switzerland 💬", points: { QuantumEngineering: 2 } },
      { label: "San Francisco, USA 💬", points: { SoftwareEngineering: 2 } },
      {
        label: "New York City, USA 💬",
        points: { Entrepreneurship: 2, ManagementScience: 1, Statistics: 1 },
      },
      { label: "Costa Rica 💬", points: { EnvironmentalEngineering: 2 } },
    ],
  },
  {
    question:
      "You're stranded on a deserted island. What's the first thing you do? 💬",
    options: [
      {
        label: "Build an AI-powered assistant to help strategize a way out 💬",
        points: { AI: 2, Mechatronics: 1 },
      },
      {
        label: "Engineer a way to monitor my vitals and optimize survival 💬",
        points: { Biomechanics: 2 },
      },
      {
        label: "Encrypt messages and find a way to communicate securely",
        points: { ComputerEngineering: 2 },
      },
      {
        label: "Experiment with quantum mechanics to teleport off the island",
        points: { QuantumEngineering: 2 },
      },
      {
        label: "Build an automated system to alert rescuers",
        points: { SoftwareEngineering: 2 },
      },
      {
        label: "Create a water filtration system to ensure safe drinking water",
        points: { EnvironmentalEngineering: 2 },
      },
      {
        label: "Create an efficient survival plan and delegate tasks",
        points: { ManagementScience: 2, Entrepreneurship: 1, Statistics: 1 },
      },
    ],
  },
  {
    question:
      "You can have dinner with one of these famous figures. Who do you pick?",
    options: [
      {
        label: "Elon Musk – AI, self-driving cars, and Mars colonization",
        points: { AI: 2, Mechatronics: 1 },
      },
      {
        label: "Marie Curie – Medical breakthroughs and scientific discovery",
        points: { Biomechanics: 2 },
      },
      {
        label: "Edward Snowden – Cybersecurity, hacking, and digital privacy",
        points: { ComputerEngineering: 2 },
      },
      {
        label: "Richard Feynman – Quantum physics and scientific curiosity",
        points: { QuantumEngineering: 2 },
      },
      {
        label:
          "Linus Torvalds – The creator of Linux and an open-source legend",
        points: { SoftwareEngineering: 2 },
      },
      {
        label: "Mark Cuban – A billionaire investor and entrepreneur",
        points: { Entrepreneurship: 2, ManagementScience: 1 },
      },
      {
        label: "Greta Thunberg – Climate change activism and sustainability 😊",
        points: { EnvironmentalEngineering: 2 },
      },
      {
        label:
          "Warren Buffett – Mastering data, strategy, and financial decision-making 💬️",
        points: { ManagementScience: 2, Statistics: 1 },
      },
    ],
  },
  {
    question: "What’s your ideal way to spend a free afternoon? 😉",
    options: [
      {
        label: "Tinkering with AI models and watching them learn 😊",
        points: { AI: 2, Mechatronics: 1 },
      },
      {
        label:
          "Going for a run or hitting the gym to study biomechanics in action 😊",
        points: { Biomechanics: 2 },
      },
      {
        label: "Solving cybersecurity challenges or cracking a puzzle 😊",
        points: { ComputerEngineering: 2 },
      },
      {
        label:
          "Watching a physics documentary or experimenting with quantum simulations 😊",
        points: { QuantumEngineering: 2 },
      },
      {
        label: "Fixing bugs in your code or optimizing an algorithm 👍",
        points: { SoftwareEngineering: 2 },
      },
      {
        label:
          "Networking at a startup event and brainstorming business ideas 😊",
        points: { Entrepreneurship: 2, ManagementScience: 1 },
      },
      {
        label: "Volunteering for an environmental cause or exploring nature 😊",
        points: { EnvironmentalEngineering: 2 },
      },
      {
        label: "Analyzing sports stats or predicting trends with data 💬️",
        points: { Statistics: 2, ManagementScience: 1 },
      },
    ],
  },
];
