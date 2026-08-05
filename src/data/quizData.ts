import { QuizQuestion, PersonalityResult } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '约会前问 TA“吃什么”，TA通常会：',
    options: [
      { label: 'A', text: '都行，你决定', personalityIndex: 0 },
      { label: 'B', text: '发来一份三页餐厅攻略', personalityIndex: 1 },
      { label: 'C', text: '嘴上说不饿，最后吃最多', personalityIndex: 2 },
      { label: 'D', text: '直接带你去那家老店', personalityIndex: 3 },
    ],
  },
  {
    id: 2,
    question: '桌上只剩最后一块肉，TA会：',
    options: [
      { label: 'A', text: '夹给你，但眼神一直盯着', personalityIndex: 4 },
      { label: 'B', text: '一人一半，精确分配', personalityIndex: 5 },
      { label: 'C', text: '趁你不注意迅速拿下', personalityIndex: 0 },
      { label: 'D', text: '再加一份，拒绝内耗', personalityIndex: 1 },
    ],
  },
  {
    id: 3,
    question: '深夜十一点，你说有点饿，TA会：',
    options: [
      { label: 'A', text: '“忍忍，明天吃”', personalityIndex: 2 },
      { label: 'B', text: '“烧烤还是炸鸡？”', personalityIndex: 3 },
      { label: 'C', text: '已经打开外卖软件', personalityIndex: 4 },
      { label: 'D', text: '从厨房端出一碗面', personalityIndex: 5 },
    ],
  },
  {
    id: 4,
    question: 'TA拍照时，食物已经凉了，你会：',
    options: [
      { label: 'A', text: '爱能包容一切', personalityIndex: 0 },
      { label: 'B', text: '偷偷先吃边角', personalityIndex: 1 },
      { label: 'C', text: '催促：“拍完了吗？”', personalityIndex: 2 },
      { label: 'D', text: '直接进入食物保卫战', personalityIndex: 3 },
    ],
  },
  {
    id: 5,
    question: 'TA突然说：“我去一下洗手间。”你会：',
    options: [
      { label: 'A', text: '顺手帮TA整理一下桌面、餐具摆放整齐', personalityIndex: 4 },
      { label: 'B', text: '趁这几分钟看看菜单，再偷偷帮TA点甜品', personalityIndex: 5 },
      { label: 'C', text: '赶紧夹两口自己最想吃的😂', personalityIndex: 0 },
      { label: 'D', text: '拿起手机开始刷视频等TA回来', personalityIndex: 1 },
    ],
  },
  {
    id: 6,
    question: '吃完准备离开时，TA突然说：“下次还一起吃吗？”你会回答：',
    options: [
      { label: 'A', text: '“当然，已经想好下一家了。”', personalityIndex: 2 },
      { label: 'B', text: '“可以呀，你决定就好。”', personalityIndex: 3 },
      { label: 'C', text: '“先看看有没有更好吃的。”', personalityIndex: 4 },
      { label: 'D', text: '“以后还有机会。”', personalityIndex: 5 },
    ],
  },
];

export const PERSONALITY_RESULTS: PersonalityResult[] = [
  {
    id: 0,
    title: '🍟 薯条外交官',
    emoji: '🍟',
    name: '薯条外交官',
    tagline: '「吵架可以，薯条一人一半。」',
    description: `你是恋爱里的缓冲剂。
你很少喜欢硬碰硬。
比起争输赢，你更希望两个人还能坐下来好好吃一顿饭。
遇到矛盾时，你总会主动找台阶。
一句：
“要不要去吃点东西？”
往往就是你的和好方式。

你的爱情观很简单：
没有什么是一顿饭解决不了的，如果有，就再加份薯条。`,
    taView: ['很会照顾情绪', '不喜欢冷战', '吵架以后最先服软', '喜欢制造轻松的氛围'],
    colorAccent: '#FF6321',
    bgAccent: '#FFF1E8',
  },
  {
    id: 1,
    title: '🍜 火锅气氛组',
    emoji: '🍜',
    name: '火锅气氛组',
    tagline: '「约会可以没计划，火锅必须热热闹闹。」',
    description: `你最怕恋爱变得没有烟火气。
你喜欢聊天。
喜欢一起笑。
喜欢把普通的一顿饭吃成聚会。
有你在的地方，很少会冷场。

别人恋爱像偶像剧。
你恋爱更像综艺节目。
热闹，就是你的浪漫。`,
    taView: ['社交天花板', '快乐制造机', '永远有话题', '情绪感染力很强'],
    colorAccent: '#E65100',
    bgAccent: '#FFE082',
  },
  {
    id: 2,
    title: '🥟 饺子和平使者',
    emoji: '🥟',
    name: '饺子和平使者',
    tagline: '「嘴硬三分钟，心软一整天。」',
    description: `每次吵架。
你都会假装生气。
可只要对方一句：
“吃饭了吗？”
你的气就消了一半。

你不是不会生气。
只是舍不得把喜欢的人推远。

你的爱情，
永远比你的脾气更大一点。`,
    taView: ['心特别软', '嘴硬心软', '很容易哄好', '不记仇'],
    colorAccent: '#F57C00',
    bgAccent: '#FFF9C4',
  },
  {
    id: 3,
    title: '🍗 最后一块肉守护神',
    emoji: '🍗',
    name: '最后一块肉守护神',
    tagline: '「最后一块肉，是爱情的最终解释权。」',
    description: `每次吃饭。
你都会偷偷观察：
TA是不是还想吃。

如果是。
最后一块一定会出现在TA碗里。

别人觉得这是礼貌。
但只有你懂：
真正喜欢一个人。
就是会下意识把最好的留给TA。

你不会天天说：
“我爱你。”
但你会说：
“这个你吃。”`,
    taView: ['偏爱感拉满', '很会照顾人', '安全感爆棚', '行动派恋人'],
    colorAccent: '#D84315',
    bgAccent: '#FFCCBC',
  },
  {
    id: 4,
    title: '🧋 奶茶续命体',
    emoji: '🧋',
    name: '奶茶续命体',
    tagline: '「恋爱没有奶茶，也要有一点甜。」',
    description: `你特别擅长制造小惊喜。
可能是一杯奶茶。
一块蛋糕。
一句晚安。
一个突然出现的小礼物。

别人觉得这些都是小事。
但你知道：
爱情不是靠惊天动地。
而是靠每天一点点甜。`,
    taView: ['仪式感担当', '很浪漫', '很会制造惊喜', '喜欢表达爱意'],
    colorAccent: '#EF6C00',
    bgAccent: '#FFE0B2',
  },
  {
    id: 5,
    title: '🍚 白米饭稳定器',
    emoji: '🍚',
    name: '白米饭稳定器',
    tagline: '「别人负责心动，你负责长久。」',
    description: `你不是最轰轰烈烈的人。
却是最适合过日子的人。

你不会每天制造惊喜。
但会记住对方的口味。
会提前订好餐厅。
会下雨时带伞。
会提醒按时吃饭。

你的爱情，
就像一碗白米饭。
平时不会特别注意。
却是每一顿饭都离不开的存在。`,
    taView: ['超级靠谱', '情绪稳定', '安全感来源', '适合长期恋爱'],
    colorAccent: '#FB8C00',
    bgAccent: '#FFF3E0',
  },
];

/**
 * 根据用户的 6 题计分情况计算最终的人格结果
 * - 统计选择次数最高的人格
 * - 如果出现最高分相同：随机选择其中一个最高人格
 */
export function calculatePersonalityResult(scores: number[]): PersonalityResult {
  if (!scores || scores.length !== 6) {
    return PERSONALITY_RESULTS[0];
  }

  let maxScore = -1;
  scores.forEach((s) => {
    if (s > maxScore) {
      maxScore = s;
    }
  });

  const winners: number[] = [];
  scores.forEach((s, idx) => {
    if (s === maxScore) {
      winners.push(idx);
    }
  });

  if (winners.length === 0) {
    return PERSONALITY_RESULTS[0];
  }

  // 随机选择其中一个最高分人格
  const randomIndex = winners[Math.floor(Math.random() * winners.length)];
  return PERSONALITY_RESULTS[randomIndex];
}
