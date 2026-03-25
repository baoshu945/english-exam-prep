import type { ExamPaper, SingleChoiceQuestion, TranslationQuestion, WritingQuestion } from '@/lib/types';

// ============================================================
// 2025 同等学力英语全国统考 预测模拟卷（一）
// Focus Lab Nordic Design — Question Bank
// ============================================================

const oralQuestions: SingleChoiceQuestion[] = [
  {
    id: 'p1-oral-1', type: 'oral_communication', difficulty: 'easy',
    tags: ['greeting', 'daily'],
    stem: 'A: I haven\'t seen you for ages. You look fine.\nB: ______. You look well, too.',
    options: [
      { label: 'A', text: 'Great' },
      { label: 'B', text: 'Thanks' },
      { label: 'C', text: 'Oh, no' },
      { label: 'D', text: 'Not at all' },
    ],
    answer: 'B',
    explanation: '当别人夸赞你时，英语中通常用Thanks来回应，表示感谢对方的赞美。',
  },
  {
    id: 'p1-oral-2', type: 'oral_communication', difficulty: 'easy',
    tags: ['apology', 'daily'],
    stem: 'A: I\'m terribly sorry. I broke your glass.\nB: ______.',
    options: [
      { label: 'A', text: 'That\'s right' },
      { label: 'B', text: 'Bad luck' },
      { label: 'C', text: 'Oh, never mind' },
      { label: 'D', text: 'Don\'t be sorry' },
    ],
    answer: 'C',
    explanation: '当别人为打碎东西道歉时，Oh, never mind表示没关系，是最得体的回应。',
  },
  {
    id: 'p1-oral-3', type: 'oral_communication', difficulty: 'medium',
    tags: ['suggestion', 'daily'],
    stem: 'A: Shall we go to the movies tonight?\nB: ______.',
    options: [
      { label: 'A', text: 'No, I think it\'s boring' },
      { label: 'B', text: 'Why not? Let\'s go' },
      { label: 'C', text: 'I don\'t think so' },
      { label: 'D', text: 'Never mind' },
    ],
    answer: 'B',
    explanation: 'Why not? Let\'s go 表示赞同对方的建议，语气积极友好。',
  },
  {
    id: 'p1-oral-4', type: 'oral_communication', difficulty: 'medium',
    tags: ['request', 'daily'],
    stem: 'A: Would you mind if I opened the window?\nB: ______. It\'s so hot in here.',
    options: [
      { label: 'A', text: 'Yes, please' },
      { label: 'B', text: 'Of course not' },
      { label: 'C', text: 'I\'d rather you didn\'t' },
      { label: 'D', text: 'Why not' },
    ],
    answer: 'B',
    explanation: 'Would you mind...的否定回答用Of course not/Not at all，表示不介意。后面说It\'s so hot说明同意开窗。',
  },
  {
    id: 'p1-oral-5', type: 'oral_communication', difficulty: 'easy',
    tags: ['thanks', 'daily'],
    stem: 'A: Thank you so much for helping me move.\nB: ______. That\'s what friends are for.',
    options: [
      { label: 'A', text: 'With pleasure' },
      { label: 'B', text: 'Don\'t mention it' },
      { label: 'C', text: 'Quite right' },
      { label: 'D', text: 'I think so' },
    ],
    answer: 'B',
    explanation: 'Don\'t mention it是回应感谢的常用语，意为不用谢、别客气。',
  },
  {
    id: 'p1-oral-6', type: 'oral_communication', difficulty: 'medium',
    tags: ['opinion', 'daily'],
    stem: 'A: What do you think of the new policy?\nB: ______.',
    options: [
      { label: 'A', text: 'I think it makes sense overall' },
      { label: 'B', text: 'I don\'t think' },
      { label: 'C', text: 'It\'s not my business' },
      { label: 'D', text: 'I have no idea what you said' },
    ],
    answer: 'A',
    explanation: '当被问及对某事的看法时，I think it makes sense overall给出了有礼貌的正面评价。',
  },
  {
    id: 'p1-oral-7', type: 'oral_communication', difficulty: 'medium',
    tags: ['invitation', 'daily'],
    stem: 'A: We\'re having a party this Saturday. Would you like to come?\nB: ______.',
    options: [
      { label: 'A', text: 'Oh, that\'s too bad' },
      { label: 'B', text: 'I\'d love to, thanks' },
      { label: 'C', text: 'I don\'t want to' },
      { label: 'D', text: 'What for' },
    ],
    answer: 'B',
    explanation: 'I\'d love to, thanks是接受邀请的礼貌回应。',
  },
  {
    id: 'p1-oral-8', type: 'oral_communication', difficulty: 'hard',
    tags: ['telephone', 'daily'],
    stem: 'A: Hello, may I speak to Dr. Smith?\nB: ______. I\'ll put you through.',
    options: [
      { label: 'A', text: 'Who are you' },
      { label: 'B', text: 'Hold on, please' },
      { label: 'C', text: 'He\'s not in' },
      { label: 'D', text: 'I don\'t know' },
    ],
    answer: 'B',
    explanation: 'Hold on, please是电话用语，意为请稍等。后面说I\'ll put you through（我帮你转接）说明对方在。',
  },
  {
    id: 'p1-oral-9', type: 'oral_communication', difficulty: 'easy',
    tags: ['farewell', 'daily'],
    stem: 'A: I\'m afraid I must be going now.\nB: ______.',
    options: [
      { label: 'A', text: 'That\'s all right' },
      { label: 'B', text: 'You\'re welcome' },
      { label: 'C', text: 'OK. See you later' },
      { label: 'D', text: 'I\'m sorry to hear that' },
    ],
    answer: 'C',
    explanation: '当对方说要走了，OK. See you later是自然的告别回应。',
  },
  {
    id: 'p1-oral-10', type: 'oral_communication', difficulty: 'medium',
    tags: ['compliment', 'daily'],
    stem: 'A: Your English is really improving.\nB: ______.',
    options: [
      { label: 'A', text: 'I think so' },
      { label: 'B', text: 'Not at all' },
      { label: 'C', text: 'You think so? Thanks' },
      { label: 'D', text: 'No, my English is poor' },
    ],
    answer: 'C',
    explanation: 'You think so? Thanks既表示谦虚又表示感谢，是得体的回应赞美方式。',
  },
];

const vocabQuestions: SingleChoiceQuestion[] = [
  {
    id: 'p1-vocab-1', type: 'vocabulary', difficulty: 'medium',
    tags: ['verb', 'collocation'],
    stem: 'The government has ______ new measures to control pollution.',
    options: [
      { label: 'A', text: 'adopted' },
      { label: 'B', text: 'adapted' },
      { label: 'C', text: 'adjusted' },
      { label: 'D', text: 'addressed' },
    ],
    answer: 'A',
    explanation: 'adopt measures意为采取措施，是固定搭配。adapt是适应，adjust是调整，address是处理/解决。',
  },
  {
    id: 'p1-vocab-2', type: 'vocabulary', difficulty: 'medium',
    tags: ['adjective', 'context'],
    stem: 'The instructions were so ______ that no one could understand them.',
    options: [
      { label: 'A', text: 'ambitious' },
      { label: 'B', text: 'ambiguous' },
      { label: 'C', text: 'abundant' },
      { label: 'D', text: 'absurd' },
    ],
    answer: 'B',
    explanation: 'ambiguous意为模糊的、含糊不清的，与后面no one could understand对应。ambitious有野心的，abundant丰富的，absurd荒谬的。',
  },
  {
    id: 'p1-vocab-3', type: 'vocabulary', difficulty: 'hard',
    tags: ['phrase', 'collocation'],
    stem: 'The project was completed well ahead of ______.',
    options: [
      { label: 'A', text: 'timetable' },
      { label: 'B', text: 'deadline' },
      { label: 'C', text: 'schedule' },
      { label: 'D', text: 'plan' },
    ],
    answer: 'C',
    explanation: 'ahead of schedule是固定短语，意为提前完成。虽然deadline也表示截止日期，但ahead of schedule是标准搭配。',
  },
  {
    id: 'p1-vocab-4', type: 'vocabulary', difficulty: 'medium',
    tags: ['verb', 'meaning'],
    stem: 'We need to ______ the differences between the two proposals before making a decision.',
    options: [
      { label: 'A', text: 'identify' },
      { label: 'B', text: 'ignore' },
      { label: 'C', text: 'illustrate' },
      { label: 'D', text: 'imagine' },
    ],
    answer: 'A',
    explanation: 'identify the differences意为识别差异。ignore忽视，illustrate说明，imagine想象，都不符合语境。',
  },
  {
    id: 'p1-vocab-5', type: 'vocabulary', difficulty: 'hard',
    tags: ['noun', 'academic'],
    stem: 'There is a growing ______ that climate change is caused by human activities.',
    options: [
      { label: 'A', text: 'consensus' },
      { label: 'B', text: 'contract' },
      { label: 'C', text: 'conflict' },
      { label: 'D', text: 'context' },
    ],
    answer: 'A',
    explanation: 'consensus意为共识。growing consensus表示越来越多的共识。contract合同，conflict冲突，context语境。',
  },
  {
    id: 'p1-vocab-6', type: 'vocabulary', difficulty: 'medium',
    tags: ['adjective', 'collocation'],
    stem: 'She made a ______ contribution to the success of the project.',
    options: [
      { label: 'A', text: 'considerable' },
      { label: 'B', text: 'considerate' },
      { label: 'C', text: 'conservative' },
      { label: 'D', text: 'consistent' },
    ],
    answer: 'A',
    explanation: 'considerable contribution意为相当大的贡献。considerate体贴的，conservative保守的，consistent一致的。',
  },
  {
    id: 'p1-vocab-7', type: 'vocabulary', difficulty: 'medium',
    tags: ['verb', 'grammar'],
    stem: 'The manager ______ that all employees should attend the meeting.',
    options: [
      { label: 'A', text: 'insisted' },
      { label: 'B', text: 'persisted' },
      { label: 'C', text: 'consisted' },
      { label: 'D', text: 'resisted' },
    ],
    answer: 'A',
    explanation: 'insist that...坚持要求...。persist坚持（做某事），consist组成，resist抵抗。insist后接that从句表示坚持要求。',
  },
  {
    id: 'p1-vocab-8', type: 'vocabulary', difficulty: 'hard',
    tags: ['phrase', 'idiom'],
    stem: 'The new regulation will come into ______ next month.',
    options: [
      { label: 'A', text: 'effect' },
      { label: 'B', text: 'effort' },
      { label: 'C', text: 'force' },
      { label: 'D', text: 'practice' },
    ],
    answer: 'A',
    explanation: 'come into effect意为生效，是固定搭配。come into force也可以表示生效，但come into effect更常用于法规。',
  },
  {
    id: 'p1-vocab-9', type: 'vocabulary', difficulty: 'easy',
    tags: ['preposition', 'collocation'],
    stem: 'The success of the experiment was largely ______ to the efforts of the whole team.',
    options: [
      { label: 'A', text: 'owed' },
      { label: 'B', text: 'due' },
      { label: 'C', text: 'referred' },
      { label: 'D', text: 'related' },
    ],
    answer: 'B',
    explanation: 'be due to意为归因于，是固定搭配。owe to也有类似意思但语法不同，refer to提到，relate to与...有关。',
  },
  {
    id: 'p1-vocab-10', type: 'vocabulary', difficulty: 'medium',
    tags: ['verb', 'meaning'],
    stem: 'The company decided to ______ its operations to Southeast Asia.',
    options: [
      { label: 'A', text: 'expand' },
      { label: 'B', text: 'expose' },
      { label: 'C', text: 'exploit' },
      { label: 'D', text: 'export' },
    ],
    answer: 'A',
    explanation: 'expand operations意为扩展业务。expose暴露，exploit开发/利用，export出口。',
  },
];

const readingPassage1: SingleChoiceQuestion[] = [
  {
    id: 'p1-read-1-1', type: 'reading_comprehension', difficulty: 'medium',
    tags: ['main-idea', 'passage-1'],
    passageTitle: 'Passage 1: The Future of Remote Work',
    passage: `The COVID-19 pandemic has fundamentally altered the way we work. What was once considered a temporary arrangement has now become a permanent fixture in many organizations. A recent survey by McKinsey found that 58% of Americans have the opportunity to work from home at least one day a week, and 35% can work from home full-time.

However, the shift to remote work has not been without challenges. Many employees report feeling isolated and disconnected from their colleagues. The lack of face-to-face interaction can lead to misunderstandings and reduced collaboration. Moreover, the boundaries between work and personal life have become increasingly blurred, leading to burnout for some workers.

Despite these challenges, many companies are embracing hybrid work models that combine the flexibility of remote work with the benefits of in-person collaboration. Companies like Google and Microsoft have redesigned their offices to serve as collaboration hubs rather than places for individual work. This approach allows employees to work from home for focused tasks while coming to the office for team meetings and creative sessions.

The future of work is likely to be a blend of remote and in-person arrangements, with companies offering greater flexibility to attract and retain talent. As technology continues to improve, the tools for remote collaboration will become more sophisticated, potentially addressing many of the current challenges associated with working from home.`,
    stem: 'What is the main idea of the passage?',
    options: [
      { label: 'A', text: 'Remote work has completely replaced office work.' },
      { label: 'B', text: 'The pandemic has led to lasting changes in work arrangements, with hybrid models emerging.' },
      { label: 'C', text: 'All companies should adopt full-time remote work policies.' },
      { label: 'D', text: 'Remote work is harmful to employee well-being.' },
    ],
    answer: 'B',
    explanation: '文章主旨是疫情导致了工作方式的持久变化，混合办公模式正在兴起。A过于绝对，C不是文章观点，D只是提到了挑战但不是主旨。',
  },
  {
    id: 'p1-read-1-2', type: 'reading_comprehension', difficulty: 'easy',
    tags: ['detail', 'passage-1'],
    passageTitle: 'Passage 1: The Future of Remote Work',
    stem: 'According to the McKinsey survey, what percentage of Americans can work from home full-time?',
    options: [
      { label: 'A', text: '58%' },
      { label: 'B', text: '35%' },
      { label: 'C', text: '45%' },
      { label: 'D', text: '25%' },
    ],
    answer: 'B',
    explanation: '文章第一段明确提到35% can work from home full-time。58%是至少一天在家工作的比例。',
  },
  {
    id: 'p1-read-1-3', type: 'reading_comprehension', difficulty: 'medium',
    tags: ['detail', 'passage-1'],
    passageTitle: 'Passage 1: The Future of Remote Work',
    stem: 'What challenge of remote work is NOT mentioned in the passage?',
    options: [
      { label: 'A', text: 'Feeling isolated from colleagues' },
      { label: 'B', text: 'Blurred boundaries between work and personal life' },
      { label: 'C', text: 'Increased costs for home office equipment' },
      { label: 'D', text: 'Reduced collaboration' },
    ],
    answer: 'C',
    explanation: '文章提到了孤立感(A)、工作生活界限模糊(B)和协作减少(D)，但没有提到家庭办公设备成本增加(C)。',
  },
  {
    id: 'p1-read-1-4', type: 'reading_comprehension', difficulty: 'medium',
    tags: ['inference', 'passage-1'],
    passageTitle: 'Passage 1: The Future of Remote Work',
    stem: 'How have companies like Google and Microsoft adapted their offices?',
    options: [
      { label: 'A', text: 'They have closed all their offices.' },
      { label: 'B', text: 'They have made offices smaller.' },
      { label: 'C', text: 'They have redesigned offices as collaboration hubs.' },
      { label: 'D', text: 'They have required all employees to return to the office.' },
    ],
    answer: 'C',
    explanation: '文章第三段提到Google和Microsoft have redesigned their offices to serve as collaboration hubs。',
  },
  {
    id: 'p1-read-1-5', type: 'reading_comprehension', difficulty: 'hard',
    tags: ['inference', 'passage-1'],
    passageTitle: 'Passage 1: The Future of Remote Work',
    stem: 'What can be inferred about the future of work from the passage?',
    options: [
      { label: 'A', text: 'Everyone will work from home permanently.' },
      { label: 'B', text: 'Technology will play a key role in improving remote collaboration.' },
      { label: 'C', text: 'Office work will become obsolete.' },
      { label: 'D', text: 'Companies will stop offering remote work options.' },
    ],
    answer: 'B',
    explanation: '文章最后一段提到As technology continues to improve, the tools for remote collaboration will become more sophisticated，可以推断技术将在改善远程协作中发挥关键作用。',
  },
];

const readingPassage2: SingleChoiceQuestion[] = [
  {
    id: 'p1-read-2-1', type: 'reading_comprehension', difficulty: 'medium',
    tags: ['main-idea', 'passage-2'],
    passageTitle: 'Passage 2: Artificial Intelligence in Education',
    passage: `Artificial intelligence is transforming education in ways that were unimaginable just a decade ago. From personalized learning platforms to automated grading systems, AI is reshaping how students learn and how teachers teach.

One of the most promising applications of AI in education is personalized learning. AI-powered platforms can analyze a student's learning patterns, identify areas of weakness, and tailor content accordingly. This means that each student can learn at their own pace, receiving additional support where needed and advancing quickly through material they have already mastered.

AI is also being used to automate administrative tasks that consume a significant portion of teachers' time. Grading assignments, tracking attendance, and generating progress reports can all be handled by AI systems, freeing teachers to focus on what they do best: teaching and mentoring students.

However, the integration of AI in education raises important ethical questions. There are concerns about data privacy, as AI systems collect vast amounts of information about students. There is also the risk that over-reliance on technology could reduce human interaction in the classroom, which is essential for developing social skills and emotional intelligence.

Despite these concerns, the potential benefits of AI in education are enormous. When implemented thoughtfully, AI can help create a more equitable and effective education system that meets the needs of every student.`,
    stem: 'What is the primary focus of this passage?',
    options: [
      { label: 'A', text: 'The dangers of AI in education' },
      { label: 'B', text: 'How AI is changing education with both benefits and concerns' },
      { label: 'C', text: 'Why teachers should be replaced by AI' },
      { label: 'D', text: 'The history of technology in education' },
    ],
    answer: 'B',
    explanation: '文章全面讨论了AI在教育中的应用，包括好处（个性化学习、自动化管理）和担忧（隐私、人际互动减少），B最准确。',
  },
  {
    id: 'p1-read-2-2', type: 'reading_comprehension', difficulty: 'easy',
    tags: ['detail', 'passage-2'],
    passageTitle: 'Passage 2: Artificial Intelligence in Education',
    stem: 'According to the passage, what can AI-powered learning platforms do?',
    options: [
      { label: 'A', text: 'Replace teachers entirely' },
      { label: 'B', text: 'Analyze learning patterns and personalize content' },
      { label: 'C', text: 'Teach students social skills' },
      { label: 'D', text: 'Eliminate the need for homework' },
    ],
    answer: 'B',
    explanation: '第二段明确说AI-powered platforms can analyze a student\'s learning patterns, identify areas of weakness, and tailor content accordingly。',
  },
  {
    id: 'p1-read-2-3', type: 'reading_comprehension', difficulty: 'medium',
    tags: ['detail', 'passage-2'],
    passageTitle: 'Passage 2: Artificial Intelligence in Education',
    stem: 'What ethical concern about AI in education is mentioned in the passage?',
    options: [
      { label: 'A', text: 'AI systems are too expensive for schools.' },
      { label: 'B', text: 'Students might become addicted to technology.' },
      { label: 'C', text: 'Data privacy and reduced human interaction.' },
      { label: 'D', text: 'AI cannot understand different languages.' },
    ],
    answer: 'C',
    explanation: '第四段提到了data privacy和over-reliance on technology could reduce human interaction两个伦理问题。',
  },
  {
    id: 'p1-read-2-4', type: 'reading_comprehension', difficulty: 'medium',
    tags: ['vocabulary-in-context', 'passage-2'],
    passageTitle: 'Passage 2: Artificial Intelligence in Education',
    stem: 'The word "equitable" in the last paragraph is closest in meaning to:',
    options: [
      { label: 'A', text: 'expensive' },
      { label: 'B', text: 'fair and equal' },
      { label: 'C', text: 'technological' },
      { label: 'D', text: 'traditional' },
    ],
    answer: 'B',
    explanation: 'equitable意为公平的、公正的，与fair and equal意思最接近。',
  },
  {
    id: 'p1-read-2-5', type: 'reading_comprehension', difficulty: 'hard',
    tags: ['inference', 'passage-2'],
    passageTitle: 'Passage 2: Artificial Intelligence in Education',
    stem: 'What is the author\'s attitude toward AI in education?',
    options: [
      { label: 'A', text: 'Completely opposed' },
      { label: 'B', text: 'Cautiously optimistic' },
      { label: 'C', text: 'Indifferent' },
      { label: 'D', text: 'Unconditionally supportive' },
    ],
    answer: 'B',
    explanation: '作者既肯定了AI的巨大潜力，也指出了伦理问题，最后说When implemented thoughtfully表示需要谨慎实施，态度是谨慎乐观的。',
  },
];

const clozeQuestions: SingleChoiceQuestion[] = [
  {
    id: 'p1-cloze-1', type: 'cloze', difficulty: 'medium',
    tags: ['cloze', 'grammar'],
    passage: `Learning a foreign language is one of the most rewarding experiences a person can have. It opens doors to new cultures, enhances career opportunities, and even improves cognitive function. However, many people (1)______ that learning a new language is too difficult or that they are too old to start.

Research has shown that while children may have a natural (2)______ for language acquisition, adults can also become proficient in a new language with the right approach. The key is (3)______ practice and exposure. Studies suggest that immersing yourself in the language — through reading, listening, and speaking — is far more (4)______ than simply memorizing vocabulary lists.

One common mistake language learners make is being afraid of making (5)______. In reality, mistakes are an essential part of the learning process. Every error provides an opportunity to learn and improve. The most successful language learners are those who are willing to (6)______ risks and practice speaking, even when they are not yet fluent.

Technology has made language learning more (7)______ than ever before. Apps, online courses, and language exchange platforms provide learners with tools to practice anytime and anywhere. (8)______, nothing can fully replace the experience of conversing with native speakers in real-life situations.

In conclusion, learning a foreign language (9)______ dedication and patience, but the rewards are well worth the effort. Whether you are learning for personal enrichment or professional (10)______, the journey of language learning is one that will enrich your life in countless ways.`,
    stem: '(1)',
    options: [
      { label: 'A', text: 'believe' },
      { label: 'B', text: 'doubt' },
      { label: 'C', text: 'deny' },
      { label: 'D', text: 'suspect' },
    ],
    answer: 'A',
    explanation: 'believe that...认为...。这里表示很多人认为学新语言太难了。doubt怀疑，deny否认，suspect怀疑，都不符合语境。',
  },
  {
    id: 'p1-cloze-2', type: 'cloze', difficulty: 'medium',
    tags: ['cloze', 'vocabulary'],
    stem: '(2)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'talent' },
      { label: 'B', text: 'ability' },
      { label: 'C', text: 'advantage' },
      { label: 'D', text: 'skill' },
    ],
    answer: 'C',
    explanation: 'have a natural advantage for意为在...方面有天然优势。talent天赋，ability能力，skill技能，虽然意思相近但advantage更强调相对优势。',
  },
  {
    id: 'p1-cloze-3', type: 'cloze', difficulty: 'easy',
    tags: ['cloze', 'adjective'],
    stem: '(3)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'consistent' },
      { label: 'B', text: 'constant' },
      { label: 'C', text: 'continuous' },
      { label: 'D', text: 'considerable' },
    ],
    answer: 'A',
    explanation: 'consistent practice意为持续一致的练习。constant不断的，continuous连续的，considerable相当大的。consistent强调坚持不懈。',
  },
  {
    id: 'p1-cloze-4', type: 'cloze', difficulty: 'medium',
    tags: ['cloze', 'adjective'],
    stem: '(4)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'effective' },
      { label: 'B', text: 'efficient' },
      { label: 'C', text: 'sufficient' },
      { label: 'D', text: 'proficient' },
    ],
    answer: 'A',
    explanation: 'effective意为有效的，far more effective than表示比...有效得多。efficient高效的，sufficient足够的，proficient熟练的。',
  },
  {
    id: 'p1-cloze-5', type: 'cloze', difficulty: 'easy',
    tags: ['cloze', 'noun'],
    stem: '(5)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'errors' },
      { label: 'B', text: 'mistakes' },
      { label: 'C', text: 'faults' },
      { label: 'D', text: 'defects' },
    ],
    answer: 'B',
    explanation: 'making mistakes是固定搭配，意为犯错误。后面也用了mistakes are an essential part来呼应。',
  },
  {
    id: 'p1-cloze-6', type: 'cloze', difficulty: 'medium',
    tags: ['cloze', 'verb'],
    stem: '(6)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'make' },
      { label: 'B', text: 'take' },
      { label: 'C', text: 'run' },
      { label: 'D', text: 'have' },
    ],
    answer: 'B',
    explanation: 'take risks是固定搭配，意为冒险。不说make risks或run risks。',
  },
  {
    id: 'p1-cloze-7', type: 'cloze', difficulty: 'easy',
    tags: ['cloze', 'adjective'],
    stem: '(7)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'accessible' },
      { label: 'B', text: 'acceptable' },
      { label: 'C', text: 'available' },
      { label: 'D', text: 'affordable' },
    ],
    answer: 'A',
    explanation: 'accessible意为可获得的、易接近的。科技让语言学习更容易获得。acceptable可接受的，available可用的，affordable负担得起的。',
  },
  {
    id: 'p1-cloze-8', type: 'cloze', difficulty: 'medium',
    tags: ['cloze', 'conjunction'],
    stem: '(8)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'Therefore' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'Moreover' },
      { label: 'D', text: 'Meanwhile' },
    ],
    answer: 'B',
    explanation: 'However表示转折。前面说技术使学习更便捷，后面说nothing can fully replace...表示转折关系。',
  },
  {
    id: 'p1-cloze-9', type: 'cloze', difficulty: 'easy',
    tags: ['cloze', 'verb'],
    stem: '(9)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'requires' },
      { label: 'B', text: 'acquires' },
      { label: 'C', text: 'inquires' },
      { label: 'D', text: 'desires' },
    ],
    answer: 'A',
    explanation: 'requires dedication and patience意为需要奉献和耐心。acquire获得，inquire询问，desire渴望。',
  },
  {
    id: 'p1-cloze-10', type: 'cloze', difficulty: 'medium',
    tags: ['cloze', 'noun'],
    stem: '(10)',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'development' },
      { label: 'B', text: 'improvement' },
      { label: 'C', text: 'advancement' },
      { label: 'D', text: 'achievement' },
    ],
    answer: 'C',
    explanation: 'professional advancement意为职业发展/晋升。development发展，improvement改善，achievement成就，但advancement最常与professional搭配。',
  },
];

const textCompletionQuestions: SingleChoiceQuestion[] = [
  {
    id: 'p1-tc-1', type: 'text_completion', difficulty: 'hard',
    tags: ['text-completion', 'logic'],
    passage: `The concept of emotional intelligence (EI) has gained significant attention in both academic and business circles. (1)______ Unlike traditional intelligence, which is measured by IQ tests, emotional intelligence refers to the ability to recognize, understand, and manage our own emotions, as well as the emotions of others.

Research has shown that people with high emotional intelligence tend to be more successful in both their personal and professional lives. (2)______ They are better at building relationships, resolving conflicts, and adapting to change.

One of the key components of emotional intelligence is self-awareness. (3)______ This understanding allows them to make better decisions and respond more effectively to challenging situations.

Another important aspect is empathy — the ability to understand and share the feelings of others. (4)______ Leaders who demonstrate empathy are often more effective because they can connect with their team members on a deeper level.

The good news is that emotional intelligence can be developed and improved over time. (5)______ By practicing mindfulness, seeking feedback, and reflecting on our interactions with others, we can enhance our emotional intelligence and improve our overall quality of life.`,
    stem: 'Choose the best sentence to fill in blank (1):',
    options: [
      { label: 'A', text: 'But what exactly is emotional intelligence?' },
      { label: 'B', text: 'Emotional intelligence is not important.' },
      { label: 'C', text: 'IQ is the only measure of intelligence.' },
      { label: 'D', text: 'Everyone has the same level of emotional intelligence.' },
    ],
    answer: 'A',
    explanation: '前面提到情商概念受到关注，后面解释什么是情商，所以(1)应该是一个过渡性问题But what exactly is emotional intelligence?',
  },
  {
    id: 'p1-tc-2', type: 'text_completion', difficulty: 'hard',
    tags: ['text-completion', 'logic'],
    stem: 'Choose the best sentence to fill in blank (2):',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'However, this success comes at a cost.' },
      { label: 'B', text: 'This is because they can navigate social situations more effectively.' },
      { label: 'C', text: 'Unfortunately, most people lack emotional intelligence.' },
      { label: 'D', text: 'IQ is still more important than EI.' },
    ],
    answer: 'B',
    explanation: '前面说高情商的人更成功，后面说他们更擅长建立关系等，(2)应该解释原因：This is because they can navigate social situations more effectively。',
  },
  {
    id: 'p1-tc-3', type: 'text_completion', difficulty: 'medium',
    tags: ['text-completion', 'logic'],
    stem: 'Choose the best sentence to fill in blank (3):',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'Self-aware people are always happy.' },
      { label: 'B', text: 'People who are self-aware have a clear understanding of their strengths, weaknesses, and emotional triggers.' },
      { label: 'C', text: 'Self-awareness is not related to emotional intelligence.' },
      { label: 'D', text: 'Most people are naturally self-aware.' },
    ],
    answer: 'B',
    explanation: '前面提到自我意识是情商的关键组成部分，后面说This understanding allows them to...，所以(3)应该描述自我意识的具体含义。',
  },
  {
    id: 'p1-tc-4', type: 'text_completion', difficulty: 'medium',
    tags: ['text-completion', 'logic'],
    stem: 'Choose the best sentence to fill in blank (4):',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'Empathy is a weakness in the workplace.' },
      { label: 'B', text: 'Empathy has no practical applications.' },
      { label: 'C', text: 'In the workplace, empathy is particularly valuable for leadership.' },
      { label: 'D', text: 'Empathy cannot be learned.' },
    ],
    answer: 'C',
    explanation: '后面紧接着说Leaders who demonstrate empathy are often more effective，所以(4)应该引入职场中同理心对领导力的价值。',
  },
  {
    id: 'p1-tc-5', type: 'text_completion', difficulty: 'medium',
    tags: ['text-completion', 'logic'],
    stem: 'Choose the best sentence to fill in blank (5):',
    passage: '(Same passage as above)',
    options: [
      { label: 'A', text: 'But it requires effort and commitment.' },
      { label: 'B', text: 'It is impossible to change.' },
      { label: 'C', text: 'Only children can develop emotional intelligence.' },
      { label: 'D', text: 'Unlike IQ, it is fixed at birth.' },
    ],
    answer: 'A',
    explanation: '前面说情商可以发展和提高，后面说通过练习正念等方式可以提升，(5)应该是过渡句表示需要努力：But it requires effort and commitment。',
  },
];

const translationQuestion: TranslationQuestion = {
  id: 'p1-trans-1',
  type: 'translation',
  difficulty: 'hard',
  tags: ['translation', 'english-to-chinese'],
  sourceText: `The development of artificial intelligence has raised important questions about the future of work. While some experts predict that AI will create more jobs than it eliminates, others warn that millions of workers could be displaced by automation. What is clear is that the nature of work is changing rapidly, and both individuals and governments need to prepare for this transformation. Education systems must adapt to teach skills that complement rather than compete with AI, such as critical thinking, creativity, and emotional intelligence. At the same time, social safety nets may need to be strengthened to support workers during the transition period.`,
  referenceAnswer: `人工智能的发展引发了关于未来工作的重要问题。虽然一些专家预测人工智能创造的就业岗位将多于其消除的岗位，但也有人警告说，数百万工人可能会被自动化所取代。显而易见的是，工作的性质正在迅速变化，个人和政府都需要为这一转变做好准备。教育体系必须进行调整，教授那些与人工智能互补而非竞争的技能，如批判性思维、创造力和情商。与此同时，社会保障网可能需要加强，以在过渡期间为工人提供支持。`,
  scoringCriteria: [
    '准确理解原文含义（4分）',
    '中文表达流畅自然（3分）',
    '关键术语翻译准确（2分）',
    '无重大遗漏或误译（1分）',
  ],
  selfCheckList: [
    '是否准确翻译了所有关键概念（AI, automation, critical thinking等）？',
    '是否正确处理了转折关系（While...others...）？',
    '中文表达是否通顺自然，没有翻译腔？',
    '是否有遗漏的句子或信息？',
    '专业术语是否使用了规范的中文表达？',
  ],
};

const writingQuestion: WritingQuestion = {
  id: 'p1-writing-1',
  type: 'writing',
  difficulty: 'hard',
  tags: ['writing', 'argumentative'],
  prompt: 'Directions: Write an essay of about 150 words on the following topic: "Should universities require all students to take courses in artificial intelligence?"',
  requirements: [
    '字数要求：约150词',
    '文体：议论文',
    '需要明确表达观点',
    '需要给出支持观点的理由',
    '结构完整：引言、正文、结论',
  ],
  referenceOutline: `1. Introduction: State your position (agree/disagree)
2. Body Paragraph 1: First reason supporting your position
   - AI is transforming every industry
   - Students need basic AI literacy regardless of major
3. Body Paragraph 2: Second reason
   - Understanding AI helps students make informed decisions
   - Ethical implications of AI affect everyone
4. Body Paragraph 3: Acknowledge counterargument
   - Some may argue it's not relevant to all fields
   - But basic understanding is different from specialization
5. Conclusion: Restate position and call to action`,
  referenceAnswer: `In today's rapidly evolving technological landscape, I firmly believe that universities should require all students to take courses in artificial intelligence.

First and foremost, AI is transforming virtually every industry, from healthcare to education, from finance to the arts. Regardless of their chosen field of study, students will inevitably encounter AI in their future careers. Having a basic understanding of how AI works will enable them to adapt more effectively to these changes.

Furthermore, as AI becomes increasingly integrated into our daily lives, it is essential that all citizens understand its implications. Issues such as data privacy, algorithmic bias, and the ethical use of AI affect everyone, not just computer scientists. By requiring AI courses, universities can help create a more informed and responsible society.

While some may argue that AI courses are irrelevant to certain disciplines, I would contend that basic AI literacy is different from technical specialization. Just as we expect all students to have basic writing and mathematical skills, a fundamental understanding of AI should be considered an essential part of modern education.

In conclusion, requiring AI courses for all university students is a forward-thinking approach that will better prepare graduates for the challenges and opportunities of the 21st century.`,
  scoringCriteria: [
    '内容相关性和充分性（5分）',
    '组织结构和逻辑性（4分）',
    '语言准确性（语法、词汇）（4分）',
    '语言多样性和流畅性（2分）',
  ],
  selfCheckList: [
    '是否明确表达了自己的观点？',
    '是否提供了至少两个支持理由？',
    '文章结构是否完整（引言-正文-结论）？',
    '是否有严重的语法错误？',
    '词汇使用是否多样化？',
    '字数是否达到要求（约150词）？',
    '是否考虑了反方观点？',
  ],
};

export const paper1: ExamPaper = {
  id: 'paper-1',
  title: '2025年同等学力英语全国统考',
  subtitle: '预测模拟卷（一）',
  totalTimeMinutes: 150,
  parts: [
    {
      id: 'part-1',
      title: '口语交际',
      titleEn: 'Oral Communication',
      type: 'oral_communication',
      description: '本部分共10题，每题1分。在每题给出的四个选项中，选出最佳答案。',
      timeMinutes: 15,
      questions: oralQuestions,
    },
    {
      id: 'part-2',
      title: '词汇',
      titleEn: 'Vocabulary',
      type: 'vocabulary',
      description: '本部分共10题，每题1分。选择最佳答案填入空白处。',
      timeMinutes: 15,
      questions: vocabQuestions,
    },
    {
      id: 'part-3',
      title: '阅读理解',
      titleEn: 'Reading Comprehension',
      type: 'reading_comprehension',
      description: '本部分共10题，每题2分。阅读下列短文，从每题给出的四个选项中选出最佳答案。',
      timeMinutes: 40,
      questions: [...readingPassage1, ...readingPassage2],
    },
    {
      id: 'part-4',
      title: '完形填空',
      titleEn: 'Cloze',
      type: 'cloze',
      description: '本部分共10题，每题1分。阅读下面短文，从每题给出的四个选项中选出最佳答案。',
      timeMinutes: 15,
      questions: clozeQuestions,
    },
    {
      id: 'part-5',
      title: '短文完成',
      titleEn: 'Text Completion',
      type: 'text_completion',
      description: '本部分共5题，每题2分。阅读短文，选择最佳句子填入空白处。',
      timeMinutes: 15,
      questions: textCompletionQuestions,
    },
    {
      id: 'part-6',
      title: '英译汉',
      titleEn: 'Translation (E→C)',
      type: 'translation',
      description: '将下列英文段落翻译成中文，共10分。',
      timeMinutes: 20,
      questions: [translationQuestion],
    },
    {
      id: 'part-7',
      title: '写作',
      titleEn: 'Writing',
      type: 'writing',
      description: '根据题目要求写一篇约150词的短文，共15分。',
      timeMinutes: 30,
      questions: [writingQuestion],
    },
  ],
};
