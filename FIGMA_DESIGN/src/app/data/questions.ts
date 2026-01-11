export interface Question {
  id: number;
  type: 'choice' | 'text';
  question: string;
  choices?: string[];
  bobAnswer: string;
  photoUrl?: string;
}

export const questions: Question[] = [
  // Questions 1-6 - Getting to Know Each Other
  {
    id: 1,
    type: 'choice',
    question: '我们第一次见面的地点是？',
    choices: ['咖啡店', '公园', '朋友聚会', '图书馆'],
    bobAnswer: '朋友聚会',
    photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800'
  },
  {
    id: 2,
    type: 'choice',
    question: '我最喜欢的颜色是？',
    choices: ['蓝色', '粉色', '绿色', '紫色'],
    bobAnswer: '蓝色'
  },
  {
    id: 3,
    type: 'text',
    question: '我最喜欢吃的食物是什么？',
    bobAnswer: '火锅'
  },
  {
    id: 4,
    type: 'choice',
    question: '我理想的约会是？',
    choices: ['看电影', '逛街购物', '户外野餐', '在家做饭'],
    bobAnswer: '户外野餐'
  },
  {
    id: 5,
    type: 'choice',
    question: '我最害怕的动物是？',
    choices: ['蜘蛛', '蛇', '老鼠', '蟑螂'],
    bobAnswer: '蟑螂'
  },
  {
    id: 6,
    type: 'text',
    question: '我小时候的梦想职业是什么？',
    bobAnswer: '宇航员',
    photoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
  },
  
  // Questions 7-12 - Preferences & Habits
  {
    id: 7,
    type: 'choice',
    question: '我更喜欢的季节是？',
    choices: ['春天', '夏天', '秋天', '冬天'],
    bobAnswer: '秋天'
  },
  {
    id: 8,
    type: 'choice',
    question: '周末我更愿意？',
    choices: ['宅在家', '外出游玩', '运动健身', '学习充电'],
    bobAnswer: '外出游玩'
  },
  {
    id: 9,
    type: 'text',
    question: '我最喜欢的电影类型是什么？',
    bobAnswer: '科幻片'
  },
  {
    id: 10,
    type: 'choice',
    question: '我喝咖啡的习惯是？',
    choices: ['不喝咖啡', '偶尔喝', '每天一杯', '每天多杯'],
    bobAnswer: '每天一杯',
    photoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'
  },
  {
    id: 11,
    type: 'choice',
    question: '我的睡眠习惯是？',
    choices: ['早睡早起', '晚睡早起', '早睡晚起', '晚睡晚起'],
    bobAnswer: '晚睡晚起'
  },
  {
    id: 12,
    type: 'text',
    question: '我最喜欢的运动是什么？',
    bobAnswer: '篮球'
  },
  
  // Questions 13-18 - Deep Questions
  {
    id: 13,
    type: 'choice',
    question: '对我来说最重要的是？',
    choices: ['事业成功', '家庭幸福', '健康平安', '自我实现'],
    bobAnswer: '家庭幸福',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800'
  },
  {
    id: 14,
    type: 'text',
    question: '我最大的优点是什么？',
    bobAnswer: '有耐心'
  },
  {
    id: 15,
    type: 'text',
    question: '我最想改掉的缺点是什么？',
    bobAnswer: '拖延症'
  },
  {
    id: 16,
    type: 'choice',
    question: '我处理压力的方式是？',
    choices: ['找人倾诉', '独自思考', '运动发泄', '吃吃喝喝'],
    bobAnswer: '运动发泄'
  },
  {
    id: 17,
    type: 'choice',
    question: '我更看重的是？',
    choices: ['计划性', '灵活性', '效率', '创意'],
    bobAnswer: '灵活性'
  },
  {
    id: 18,
    type: 'text',
    question: '我最欣赏你的地方是什么？',
    bobAnswer: '你的笑容总能让我开心',
    photoUrl: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800'
  },
  
  // Questions 19-24 - Fun & Memories
  {
    id: 19,
    type: 'choice',
    question: '我们一起最难忘的经历是？',
    choices: ['第一次旅行', '第一次吵架后和好', '一起庆祝生日', '一起看日出'],
    bobAnswer: '第一次旅行'
  },
  {
    id: 20,
    type: 'text',
    question: '我最想和你一起做的事情是什么？',
    bobAnswer: '环游世界'
  },
  {
    id: 21,
    type: 'choice',
    question: '我最喜欢的音乐类型是？',
    choices: ['流行', '摇滚', '古典', '民谣'],
    bobAnswer: '民谣',
    photoUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800'
  },
  {
    id: 22,
    type: 'choice',
    question: '我理想的宠物是？',
    choices: ['猫', '狗', '鸟', '不想养宠物'],
    bobAnswer: '狗'
  },
  {
    id: 23,
    type: 'text',
    question: '我最想去的旅游目的地是哪里？',
    bobAnswer: '冰岛'
  },
  {
    id: 24,
    type: 'choice',
    question: '我最喜欢的节日是？',
    choices: ['春节', '情人节', '圣诞节', '生日'],
    bobAnswer: '春节',
    photoUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800'
  },
  
  // Questions 25-30 - Future & Dreams
  {
    id: 25,
    type: 'choice',
    question: '五年后，我希望我们？',
    choices: ['结婚生子', '事业有成', '环游世界', '买房定居'],
    bobAnswer: '结婚生子'
  },
  {
    id: 26,
    type: 'text',
    question: '我对我们未来的期待是什么？',
    bobAnswer: '永远在一起，互相支持'
  },
  {
    id: 27,
    type: 'choice',
    question: '我理想的居住地是？',
    choices: ['大城市', '小城市', '乡村', '海边'],
    bobAnswer: '海边',
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
  },
  {
    id: 28,
    type: 'text',
    question: '我最想对你说的一句话是什么？',
    bobAnswer: '遇见你是我最幸运的事'
  },
  {
    id: 29,
    type: 'choice',
    question: '如果可以拥有一项超能力，我会选择？',
    choices: ['隐身', '飞行', '读心术', '时间旅行'],
    bobAnswer: '时间旅行'
  },
  {
    id: 30,
    type: 'text',
    question: '我认为爱情最重要的是什么？',
    bobAnswer: '信任和理解',
    photoUrl: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800'
  }
];
