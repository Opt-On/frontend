import { Answer } from "./Question";

export enum OptionEnum {
  COMPENGOPT = "Computer Engineering",
  MSCIOPT = "Management Science",
  BIOMECHOPT = "Biomechanics",
  SWENGOPT = "Software Engineering",
  ENTROPT = "Entrepreneurship",
  AIENGOPT = "Artificial Intelligence",
  COMPUOPT = "Computing",
  STATOPT = "Statistics",
  MECTROPT = "Mechatronics",
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
        label: "AI & Robotics breakthroughs 🧠🤖",
        points: { [OptionEnum.AIENGOPT]: 2, [OptionEnum.MECTROPT]: 1 },
      },
      {
        label: "Medical innovations & human enhancement 🦾🔬",
        points: { [OptionEnum.BIOMECHOPT]: 2 },
      },
      {
        label: "Digital security & hardware architecture 🔐💻",
        points: { [OptionEnum.COMPENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Software development & tech startups 👨‍💻🚀",
        points: {
          [OptionEnum.SWENGOPT]: 2,
          [OptionEnum.COMPUOPT]: 1,
          [OptionEnum.ENTROPT]: 1,
        },
      },
      {
        label: "Business analytics & financial strategies 📊💰",
        points: { [OptionEnum.MSCIOPT]: 2, [OptionEnum.STATOPT]: 1, [OptionEnum.ENTROPT]: 1 },
      },
      {
        label: "Engineering innovations & automation systems 🔧⚙️",
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.COMPENGOPT]: 1 },
      },
    ],
  },
  {
    question: "You get the chance to work on a cutting-edge project. Which one do you choose?",
    answers: [
      {
        label: "Developing next-gen AI & autonomous systems 🤖🧠",
        points: { [OptionEnum.AIENGOPT]: 2, [OptionEnum.MECTROPT]: 1 },
      },
      {
        label: "Designing bionic enhancements & medical devices 🦿🫀",
        points: { [OptionEnum.BIOMECHOPT]: 2 },
      },
      {
        label: "Building advanced computing architecture 🖥️⚡",
        points: { [OptionEnum.COMPENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Creating breakthrough software solutions 💻✨",
        points: { [OptionEnum.SWENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Launching a tech startup & securing investments 🚀💼",
        points: { [OptionEnum.ENTROPT]: 2, [OptionEnum.MSCIOPT]: 1, [OptionEnum.STATOPT]: 1 },
      },
      {
        label: "Designing smart robotic systems 🦾⚙️",
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.AIENGOPT]: 1 },
      },
    ],
  },
  {
    question: "Your dream job involves...",
    answers: [
      {
        label: "Training machines to think & act intelligently 🧠🤖",
        points: { [OptionEnum.AIENGOPT]: 2, [OptionEnum.MECTROPT]: 1 },
      },
      {
        label: "Advancing human performance & medical tech 🏃‍♂️🔬",
        points: { [OptionEnum.BIOMECHOPT]: 2 },
      },
      {
        label: "Designing hardware systems & computing infrastructure 🔌💾",
        points: { [OptionEnum.COMPENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Building elegant code & innovative applications 👨‍💻🔧",
        points: { [OptionEnum.SWENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Analyzing data & optimizing business decisions 📈⚖️",
        points: { [OptionEnum.MSCIOPT]: 2, [OptionEnum.STATOPT]: 1, [OptionEnum.ENTROPT]: 1 },
      },
      {
        label: "Creating automated systems & smart machines ⚙️🔄",
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.COMPENGOPT]: 1 },
      },
    ],
  },
  {
    question: "You have to pick a superpower. What do you choose?",
    answers: [
      {
        label: "Mind control & telepathy 🧠✨",
        points: { [OptionEnum.AIENGOPT]: 2 },
      },
      {
        label: "Regenerative healing & superhuman strength 💪🔄",
        points: { [OptionEnum.BIOMECHOPT]: 2 },
      },
      {
        label: "Technopathy (ability to control electronics) 🖥️👋",
        points: { [OptionEnum.COMPENGOPT]: 2 },
      },
      {
        label: "Super speed & hyper-productivity ⚡👨‍💻",
        points: { [OptionEnum.SWENGOPT]: 2 },
      },
      {
        label: "Perfect precognition & strategic foresight 🔮📊",
        points: { [OptionEnum.MSCIOPT]: 2, [OptionEnum.STATOPT]: 1, [OptionEnum.ENTROPT]: 1 },
      },
      {
        label: "Ability to build anything from scrap materials 🛠️🔩",
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.COMPENGOPT]: 1 },
      },
    ],
  },
  {
    question: "Which fictional world would you thrive in?",
    answers: [
      {
        label: "Westworld 🤖🧬",
        points: { [OptionEnum.AIENGOPT]: 2, [OptionEnum.MECTROPT]: 1 },
      },
      { 
        label: "Altered Carbon 🧪🦾", 
        points: { [OptionEnum.BIOMECHOPT]: 2 } 
      },
      {
        label: "The Matrix 💻🕶️",
        points: { [OptionEnum.COMPENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Ready Player One 🚀🎮",
        points: {
          [OptionEnum.SWENGOPT]: 2,
          [OptionEnum.COMPUOPT]: 1,
          [OptionEnum.ENTROPT]: 1,
        },
      },
      {
        label: "Suits 💼💰",
        points: { [OptionEnum.ENTROPT]: 2, [OptionEnum.MSCIOPT]: 1, [OptionEnum.STATOPT]: 1 },
      },
      { 
        label: "Iron Man 🔧🦸‍♂️", 
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.COMPENGOPT]: 1 } 
      },
    ],
  },
  {
    question: "Pick a drink to fuel your ambitions.",
    answers: [
      { 
        label: "Precision-brewed espresso ☕⚙️", 
        points: { [OptionEnum.AIENGOPT]: 2 } 
      },
      {
        label: "Protein smoothie with nootropics 🥤🧠",
        points: { [OptionEnum.BIOMECHOPT]: 2 },
      },
      {
        label: "Black coffee, no interruptions ⚫☕",
        points: { [OptionEnum.COMPENGOPT]: 2 },
      },
      {
        label: "Energy drink with extra caffeine ⚡🥫",
        points: { [OptionEnum.SWENGOPT]: 2 },
      },
      {
        label: "Craft cocktail with exotic ingredients 🍹✨",
        points: { [OptionEnum.ENTROPT]: 2, [OptionEnum.MSCIOPT]: 1 },
      },
      {
        label: "Meticulously calculated electrolyte drink 🧪🔬",
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.STATOPT]: 1 },
      },
    ],
  },
  {
    question: "Which destination would you most like to visit?",
    answers: [
      { 
        label: "Tokyo's AI & robotics district 🇯🇵🤖", 
        points: { [OptionEnum.AIENGOPT]: 2, [OptionEnum.MECTROPT]: 1 } 
      },
      { 
        label: "Switzerland's medical innovation centers 🇨🇭🧬", 
        points: { [OptionEnum.BIOMECHOPT]: 2 } 
      },
      { 
        label: "Silicon Valley tech headquarters 🇺🇸💻", 
        points: { [OptionEnum.COMPENGOPT]: 2, [OptionEnum.SWENGOPT]: 1 } 
      },
      { 
        label: "Seattle's software development hub ☔👨‍💻", 
        points: { [OptionEnum.SWENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 } 
      },
      {
        label: "Wall Street & New York's financial district 🗽💹",
        points: { [OptionEnum.ENTROPT]: 2, [OptionEnum.MSCIOPT]: 1, [OptionEnum.STATOPT]: 1 },
      },
      { 
        label: "Germany's precision engineering factories 🇩🇪⚙️", 
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.COMPENGOPT]: 1 } 
      },
    ],
  },
  {
    question: "You're stranded on a deserted island. What's your first move?",
    answers: [
      {
        label: "Create an AI system to optimize survival strategy 🤖🏝️",
        points: { [OptionEnum.AIENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Analyze local plants for medicinal properties 🌿💊",
        points: { [OptionEnum.BIOMECHOPT]: 2 },
      },
      {
        label: "Build a communication device from salvaged parts 📡🔧",
        points: { [OptionEnum.COMPENGOPT]: 2, [OptionEnum.MECTROPT]: 1 },
      },
      {
        label: "Develop a systematic approach to resource management 📊🥥",
        points: { [OptionEnum.SWENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Create a detailed survival plan & task prioritization 📝⏱️",
        points: { [OptionEnum.MSCIOPT]: 2, [OptionEnum.ENTROPT]: 1, [OptionEnum.STATOPT]: 1 },
      },
      {
        label: "Build automated tools for gathering food & water 🔨🥃",
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.COMPENGOPT]: 1 },
      },
    ],
  },
  {
    question: "You can have dinner with one innovator. Who do you choose?",
    answers: [
      {
        label: "Geoffrey Hinton - The godfather of modern AI 🧠🔍",
        points: { [OptionEnum.AIENGOPT]: 2 },
      },
      {
        label: "Hugh Herr - Pioneering bionic limbs & human enhancement 🦿🧬",
        points: { [OptionEnum.BIOMECHOPT]: 2 },
      },
      {
        label: "Lisa Su - AMD CEO & computer engineering visionary 💻⚡",
        points: { [OptionEnum.COMPENGOPT]: 2 },
      },
      {
        label: "Linus Torvalds - Linux creator & software revolutionary 🐧👨‍💻",
        points: { [OptionEnum.SWENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Elon Musk - Serial entrepreneur & tech innovator 🚀💰",
        points: { [OptionEnum.ENTROPT]: 2, [OptionEnum.MECTROPT]: 1 },
      },
      {
        label: "Indra Nooyi - PepsiCo strategist & business legend 📊🌎",
        points: { [OptionEnum.MSCIOPT]: 2, [OptionEnum.STATOPT]: 1 },
      },
    ],
  },
  {
    question: "What's your ideal way to spend a free afternoon?",
    answers: [
      {
        label: "Training neural networks & experimenting with AI models 🧠💻",
        points: { [OptionEnum.AIENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Analyzing biomechanics during sports or exercise 🏃‍♀️📊",
        points: { [OptionEnum.BIOMECHOPT]: 2, [OptionEnum.STATOPT]: 1 },
      },
      {
        label: "Taking apart electronics to understand their components 🔌🔍",
        points: { [OptionEnum.COMPENGOPT]: 2, [OptionEnum.MECTROPT]: 1 },
      },
      {
        label: "Coding side projects & solving programming challenges 👨‍💻🧩",
        points: { [OptionEnum.SWENGOPT]: 2, [OptionEnum.COMPUOPT]: 1 },
      },
      {
        label: "Researching market trends & investment opportunities 📈💡",
        points: { [OptionEnum.MSCIOPT]: 2, [OptionEnum.ENTROPT]: 1, [OptionEnum.STATOPT]: 1 },
      },
      {
        label: "Building robots or automated gadgets from scratch 🤖🔧",
        points: { [OptionEnum.MECTROPT]: 2, [OptionEnum.COMPENGOPT]: 1 },
      },
    ],
  },
];