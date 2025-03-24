import { Answer } from "./Question";

export enum OptionEnum {
  SOFTWARE = "Software Engineering",
  COMPUTING = "Computing",
  COMPUTER_ENGINEERING = "Computer Engineering",
  AI = "Artificial Intelligence",
  QUANTUM = "Quantum Engineering",
  ENTREPRENEURSHIP = "Entrepreneurship",
  MSCI = "Management Science",
  ENVIRO = "Environmental Engineering",
  BIOMECHANICS = "Biomechanics",
  TRON = "Mechatronics",
  STATS = "Statistics",
}

type QuestionType = {
  question: string;
  answers: Answer[];
};

export const questions: QuestionType[] = [
  {
    question:
      "It's a Saturday night, and you're deep in a YouTube rabbit hole. What are you watching?",
    answers: [
      {
        label: "The Future of AI & Robotics 🤖",
        points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 },
      },
      {
        label: "Medical & Human Innovation 🏥",
        points: { [OptionEnum.BIOMECHANICS]: 2 },
      },
      {
        label: "The Science of the Digital World 🔐",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2, [OptionEnum.QUANTUM]: 1 },
      },
      {
        label: "Building Software & Startups 💻",
        points: {
          [OptionEnum.SOFTWARE]: 2,
          [OptionEnum.COMPUTING]: 1,
          [OptionEnum.ENTREPRENEURSHIP]: 1,
        },
      },
      {
        label: "Business, Finance, & Data 📊",
        points: { [OptionEnum.MSCI]: 2, [OptionEnum.STATS]: 1, [OptionEnum.ENTREPRENEURSHIP]: 1 },
      },
      {
        label: "Sustainability & Engineering the Future 🌱",
        points: { [OptionEnum.ENVIRO]: 2 },
      },
    ],
  },
  {
    question: "You get the chance to work on a cutting-edge project. Which one do you choose?",
    answers: [
      {
        label: "Creating Smarter AI & Robots 🤖",
        points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 },
      },
      {
        label: "Revolutionizing Healthcare & Human Performance 🏥",
        points: { [OptionEnum.BIOMECHANICS]: 2 },
      },
      {
        label: "Cybersecurity & Quantum Breakthroughs 🔐",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2, [OptionEnum.QUANTUM]: 1 },
      },
      {
        label: "Building Software & Apps 💻",
        points: { [OptionEnum.SOFTWARE]: 2, [OptionEnum.COMPUTING]: 1 },
      },
      {
        label: "Entrepreneurship & Business Strategy 📈",
        points: { [OptionEnum.ENTREPRENEURSHIP]: 2, [OptionEnum.MSCI]: 1, [OptionEnum.STATS]: 1 },
      },
      {
        label: "Engineering a Sustainable Future 🌍",
        points: { [OptionEnum.ENVIRO]: 2 },
      },
    ],
  },
  {
    question: "Your dream job involves...",
    answers: [
      {
        label: "Making Machines Smarter & More Autonomous 🤖",
        points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 },
      },
      {
        label: "Innovating Healthcare & Human Performance 🏥",
        points: { [OptionEnum.BIOMECHANICS]: 2 },
      },
      {
        label: "Building the Backbone of Technology 🔐",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2, [OptionEnum.QUANTUM]: 1 },
      },
      {
        label: "Developing Software & Apps 💻",
        points: { [OptionEnum.SOFTWARE]: 2, [OptionEnum.COMPUTING]: 1 },
      },
      {
        label: "Leading Businesses & Making Data-Driven Decisions 📈",
        points: { [OptionEnum.MSCI]: 2, [OptionEnum.STATS]: 1, [OptionEnum.ENTREPRENEURSHIP]: 1 },
      },
      {
        label: "Engineering for a Cleaner Planet 🌱",
        points: { [OptionEnum.ENVIRO]: 2 },
      },
    ],
  },
  {
    question: "You have to pick a superpower. What do you choose?",
    answers: [
      {
        label: "Mind Reading 🧠",
        points: { [OptionEnum.AI]: 2 },
      },
      {
        label: "Healing 🏥",
        points: { [OptionEnum.BIOMECHANICS]: 2, [OptionEnum.ENVIRO]: 1 },
      },
      {
        label: "Invisibility 👁️",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2 },
      },
      {
        label: "Teleportation ⚛️",
        points: { [OptionEnum.QUANTUM]: 2 },
      },
      {
        label: "Super Speed ⚡",
        points: { [OptionEnum.SOFTWARE]: 2 },
      },
      {
        label: "Super Intelligence 📊",
        points: { [OptionEnum.MSCI]: 2, [OptionEnum.STATS]: 1, [OptionEnum.ENTREPRENEURSHIP]: 1 },
      },
    ],
  },
  {
    question: "Which TV show's world would you thrive in?",
    answers: [
      {
        label: "Westworld / The Mandalorian 🤖",
        points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 },
      },
      { label: "Grey's Anatomy 🏥", points: { [OptionEnum.BIOMECHANICS]: 2 } },
      {
        label: "Mr. Robot / Devs 🔐",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2, [OptionEnum.QUANTUM]: 1 },
      },
      {
        label: "Silicon Valley / Black Mirror 💻",
        points: {
          [OptionEnum.SOFTWARE]: 2,
          [OptionEnum.COMPUTING]: 1,
          [OptionEnum.ENTREPRENEURSHIP]: 1,
        },
      },
      {
        label: "Shark Tank / Suits 💼",
        points: { [OptionEnum.ENTREPRENEURSHIP]: 2, [OptionEnum.MSCI]: 1, [OptionEnum.STATS]: 1 },
      },
      { label: "Our Planet 🌍", points: { [OptionEnum.ENVIRO]: 2 } },
    ],
  },
  {
    question: "Pick a drink to fuel your ambitions.",
    answers: [
      { label: "Espresso ☕", points: { [OptionEnum.AI]: 2 } },
      {
        label: "Black Coffee",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2 },
      },
      {
        label: "Sparkling Water 🌊",
        points: { [OptionEnum.QUANTUM]: 2 },
      },
      {
        label: "Energy Drink ⚡️",
        points: { [OptionEnum.SOFTWARE]: 2 },
      },
      {
        label: "Craft Cocktail 🍹",
        points: { [OptionEnum.ENTREPRENEURSHIP]: 2, [OptionEnum.MSCI]: 1, [OptionEnum.STATS]: 1 },
      },
      {
        label: "Herbal Tea 🍃",
        points: { [OptionEnum.ENVIRO]: 2, [OptionEnum.BIOMECHANICS]: 1 },
      },
    ],
  },
  {
    question: "Which vacation destination sounds the most appealing to you?",
    answers: [
      { label: "Tokyo, Japan", points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 } },
      { label: "Swiss Alps, Switzerland", points: { [OptionEnum.BIOMECHANICS]: 2 } },
      { label: "Silicon Valley, USA", points: { [OptionEnum.COMPUTER_ENGINEERING]: 2 } },
      { label: "CERN, Switzerland", points: { [OptionEnum.QUANTUM]: 2 } },
      { label: "San Francisco, USA", points: { [OptionEnum.SOFTWARE]: 2 } },
      {
        label: "New York City, USA",
        points: { [OptionEnum.ENTREPRENEURSHIP]: 2, [OptionEnum.MSCI]: 1, [OptionEnum.STATS]: 1 },
      },
      { label: "Costa Rica", points: { [OptionEnum.ENVIRO]: 2 } },
    ],
  },
  {
    question: "You're stranded on a deserted island. What's the first thing you do?",
    answers: [
      {
        label: "Build an AI-powered assistant to help strategize a way out",
        points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 },
      },
      {
        label: "Engineer a way to monitor my vitals and optimize survival",
        points: { [OptionEnum.BIOMECHANICS]: 2 },
      },
      {
        label: "Encrypt messages and find a way to communicate securely",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2 },
      },
      {
        label: "Experiment with quantum mechanics to teleport off the island",
        points: { [OptionEnum.QUANTUM]: 2 },
      },
      {
        label: "Build an automated system to alert rescuers",
        points: { [OptionEnum.SOFTWARE]: 2 },
      },
      {
        label: "Create a water filtration system to ensure safe drinking water",
        points: { [OptionEnum.ENVIRO]: 2 },
      },
      {
        label: "Create an efficient survival plan and delegate tasks",
        points: { [OptionEnum.MSCI]: 2, [OptionEnum.ENTREPRENEURSHIP]: 1, [OptionEnum.STATS]: 1 },
      },
    ],
  },
  {
    question: "You can have dinner with one of these famous figures. Who do you pick?",
    answers: [
      {
        label: "Elon Musk - AI, self-driving cars, and Mars colonization",
        points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 },
      },
      {
        label: "Marie Curie - Medical breakthroughs and scientific discovery",
        points: { [OptionEnum.BIOMECHANICS]: 2 },
      },
      {
        label: "Edward Snowden - Cybersecurity, hacking, and digital privacy",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2 },
      },
      {
        label: "Richard Feynman - Quantum physics and scientific curiosity",
        points: { [OptionEnum.QUANTUM]: 2 },
      },
      {
        label: "Linus Torvalds - The creator of Linux and an open-source legend",
        points: { [OptionEnum.SOFTWARE]: 2 },
      },
      {
        label: "Mark Cuban - A billionaire investor and entrepreneur",
        points: { [OptionEnum.ENTREPRENEURSHIP]: 2, [OptionEnum.MSCI]: 1 },
      },
      {
        label: "Greta Thunberg - Climate change activism and sustainability",
        points: { [OptionEnum.ENVIRO]: 2 },
      },
      {
        label: "Warren Buffett - Mastering data, strategy, and financial decision-making",
        points: { [OptionEnum.MSCI]: 2, [OptionEnum.STATS]: 1 },
      },
    ],
  },
  {
    question: "What's your ideal way to spend a free afternoon?",
    answers: [
      {
        label: "Tinkering with AI models and watching them learn",
        points: { [OptionEnum.AI]: 2, [OptionEnum.TRON]: 1 },
      },
      {
        label: "Going for a run or hitting the gym to study biomechanics in action",
        points: { [OptionEnum.BIOMECHANICS]: 2 },
      },
      {
        label: "Solving cybersecurity challenges or cracking a puzzle",
        points: { [OptionEnum.COMPUTER_ENGINEERING]: 2 },
      },
      {
        label: "Watching a physics documentary or experimenting with quantum simulations",
        points: { [OptionEnum.QUANTUM]: 2 },
      },
      {
        label: "Fixing bugs in your code or optimizing an algorithm",
        points: { [OptionEnum.SOFTWARE]: 2 },
      },
      {
        label: "Networking at a startup event and brainstorming business ideas",
        points: { [OptionEnum.ENTREPRENEURSHIP]: 2, [OptionEnum.MSCI]: 1 },
      },
      {
        label: "Volunteering for an environmental cause or exploring nature",
        points: { [OptionEnum.ENVIRO]: 2 },
      },
      {
        label: "Analyzing sports stats or predicting trends with data",
        points: { [OptionEnum.STATS]: 2, [OptionEnum.MSCI]: 1 },
      },
    ],
  },
];
