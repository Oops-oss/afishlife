/**
 * 恋爱属性测试 - 测试数据
 * 包含12道恋爱场景题、8种结果类型、评分维度定义
 */

// 12道测试题目
const questions = [
  {
    id: 1, text: "你和一个刚认识的人聊天，发现对方特别有魅力，你会？",
    options: [
      { text: "主动要联系方式，制造下一次见面的机会", weights: { passion: 3, dependence: 0, rationality: 0, romance: 0, independence: 0 } },
      { text: "心里小鹿乱撞，但表面装作若无其事", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "先观察一阵子，看看对方是不是真的有趣", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "觉得有意思但不急，缘分到了自然会再见", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  },
  {
    id: 2, text: "你的伴侣答应周末陪你，但临时说要加班，你会？",
    options: [
      { text: "虽然失望但表示理解，自己找点事做", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } },
      { text: "表面说没关系，但心里已经上演了一百集连续剧", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "问清楚是不是真的加班，如果是就送杯咖啡过去", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "正好！本来周末我也有自己的安排", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  },
  {
    id: 3, text: "你理想中的约会是？",
    options: [
      { text: "一起窝在沙发上看电影，什么都不做也很幸福", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "精心策划一场惊喜——烛光晚餐+手写情书", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "一起去逛书店或看展览，边走边聊有意思的话题", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "各做各的事，偶尔抬头相视一笑就够了", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  },
  {
    id: 4, text: "发现伴侣手机里有和异性的暧昧聊天记录，你会？",
    options: [
      { text: "直接摊牌，要么说清楚要么分手", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "忍着不说，但会偷偷观察后续发展", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "找机会旁敲侧击，先了解情况再决定", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "心碎了，但还是想给对方一次机会", weights: { passion: 3, dependence: 0, rationality: 0, romance: 0, independence: 0 } }
    ]
  },
  {
    id: 5, text: "你需要和伴侣异地三个月，你的第一反应是？",
    options: [
      { text: "每天视频通话到睡着，时差不是问题", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "制定详细的联络计划：每天早晚安、周末长聊", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "各自忙各自的，想对方了就打个电话", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } },
      { text: "三个月而已，又不是三年，平常心就好", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  },
  {
    id: 6, text: "吵架之后你的典型反应是？",
    options: [
      { text: "主动道歉求和，不管是谁的错", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "冷静下来分析问题出在哪，然后理性沟通", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "先各自冷静，等气消了再好好聊", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } },
      { text: "写一封长消息把所有感受都说出来", weights: { passion: 3, dependence: 0, rationality: 0, romance: 0, independence: 0 } }
    ]
  },
  {
    id: 7, text: "朋友给你介绍了一个条件很好但你没什么感觉的人，你会？",
    options: [
      { text: "先见一面再说，万一聊着聊着就心动了呢", weights: { passion: 3, dependence: 0, rationality: 0, romance: 0, independence: 0 } },
      { text: "没感觉就是没感觉，不想浪费彼此时间", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } },
      { text: "条件好很重要啊！先了解看看适不适合", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "算了，我相信缘分而不是条件匹配", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } }
    ]
  },
  {
    id: 8, text: "你对「恋爱中的仪式感」怎么看？",
    options: [
      { text: "超级重要！每个纪念日都要认真过", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "会认真对待每个纪念日，因为那是我们共同的回忆", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "比起仪式感，我更在意日常相处舒不舒服", weights: { passion: 3, dependence: 0, rationality: 0, romance: 0, independence: 0 } },
      { text: "偶尔来一次就够了，天天搞仪式太累了", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  },
  {
    id: 9, text: "你看到伴侣和别人走得很近，你会？",
    options: [
      { text: "表面无所谓，内心已经开始脑补各种剧情", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "直接问对方那个人是谁、什么关系", weights: { passion: 3, dependence: 0, rationality: 0, romance: 0, independence: 0 } },
      { text: "观察一下再判断，可能是普通朋友", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "完全不在意，信任是恋爱的基础", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  },
  {
    id: 10, text: "你觉得恋爱中最重要的是什么？",
    options: [
      { text: "心动的感觉——没有心跳加速那还叫恋爱吗", weights: { passion: 3, dependence: 0, rationality: 0, romance: 0, independence: 0 } },
      { text: "灵魂的共鸣——能懂我的人才值得我爱", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "舒适的相处——在一起不累才是真的好", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "彼此的成长——好的爱情是让双方都变更好", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } }
    ]
  },
  {
    id: 11, text: "如果暗恋的人突然向你表白，你的反应是？",
    options: [
      { text: "激动到说不出话，恨不得立刻官宣", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "开心但也很担心，怕自己不够好", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "有点慌……突然要开始恋爱了我准备好了吗？", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "嗯……让我想想我到底喜不喜欢TA", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  },
  {
    id: 12, text: "分手后你会怎么做？",
    options: [
      { text: "大哭一场然后删掉所有联系方式，绝不回头", weights: { passion: 0, dependence: 0, rationality: 0, romance: 3, independence: 0 } },
      { text: "表面上云淡风轻，其实每天都在偷偷看对方动态", weights: { passion: 0, dependence: 3, rationality: 0, romance: 0, independence: 0 } },
      { text: "冷静复盘这段感情的得失，总结经验教训", weights: { passion: 0, dependence: 0, rationality: 3, romance: 0, independence: 0 } },
      { text: "难过一阵子但很快调整好，生活还要继续", weights: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 3 } }
    ]
  }
];

// 8种结果类型
const results = [
  {
    id: "pure_love", name: "纯爱战士", emoji: "💕",
    tags: ["专一", "深情", "理想主义"],
    description: "你相信爱情最纯粹的模样，一旦认定一个人就会全心全意。在你的世界里，爱情不需要太多技巧，真心就是最好的武器。你愿意为爱等待，也愿意为爱付出，但你对背叛零容忍。",
    advice: "你的纯粹很珍贵，但也要学会保护自己。不是每个人都值得你的全心投入，慢慢观察再交付真心会更好。",
    rules: { passion: 5, dependence: 0, rationality: 0, romance: 5, independence: 0 }
  },
  {
    id: "love_brain", name: "恋爱脑本脑", emoji: "🧠",
    tags: ["奋不顾身", "奉献", "感性至上"],
    description: "恋爱就是你的人生主线任务！一旦陷入爱情，你的世界就会自动缩小到只有TA。你会记住每一个纪念日、每一句说过的话，也会因为对方一个已读不回而焦虑整晚。",
    advice: "爱一个人很好，但别把自己丢了。试着在恋爱之外也保留自己的朋友圈和爱好，这样你才不会在感情里迷失。",
    rules: { passion: 0, dependence: 7, rationality: 0, romance: 3, independence: 0 }
  },
  {
    id: "sober_player", name: "清醒海王", emoji: "🌊",
    tags: ["魅力", "游刃有余", "保持清醒"],
    description: "你自带吸引人的磁场，身边从不缺追求者。但和真正的海王不同，你心里其实有杆秤——你知道自己要什么，不会轻易被冲昏头脑。暧昧可以有，但真感情你只给值得的人。",
    advice: "你的清醒是一种能力，但别让它变成冷漠。偶尔放下心防，允许自己真正投入一次，可能会有意外收获。",
    rules: { passion: 4, dependence: 0, rationality: 4, romance: 0, independence: 4 }
  },
  {
    id: "sapiosexual", name: "智性恋者", emoji: "📚",
    tags: ["灵魂共鸣", "深度交流", "精神至上"],
    description: "比起脸和身材，你更在意对方的脑子。一段好的对话能让你心动，一个有趣的灵魂比任何甜言蜜语都撩人。你需要的是能和你聊到天亮、讨论人生意义的那种连接。",
    advice: "精神契合很重要，但也别忽视现实层面的相处。爱情不只是灵魂对话，也包括一起吃饭、散步、发呆这些小事。",
    rules: { passion: 0, dependence: 0, rationality: 8, romance: 2, independence: 0 }
  },
  {
    id: "sweet_hunter", name: "甜蜜猎手", emoji: "🎯",
    tags: ["经营高手", "主动出击", "懂得分寸"],
    description: "你是恋爱场上的战术大师！你知道什么时候该主动、什么时候该矜持，每一步都恰到好处。你不只是在谈恋爱，你是在经营一段高质量的关系。",
    advice: "你的恋爱技巧很厉害，但偶尔也可以放下策略，用笨拙但真诚的方式表达爱意，反而更打动人。",
    rules: { passion: 4, dependence: 0, rationality: 2, romance: 4, independence: 0 }
  },
  {
    id: "buddha", name: "佛系恋人", emoji: "🍃",
    tags: ["随缘", "平和", "不强求"],
    description: "恋爱对你来说是锦上添花，不是雪中送炭。有对象就好好珍惜，没有也能过得自在。你的人生信条是：是我的跑不掉，不是我的留不住。",
    advice: "佛系是你的优势，但别让它变成逃避。遇到心动的人，也值得你主动一次。",
    rules: { passion: 0, dependence: 0, rationality: 0, romance: 0, independence: 10 }
  },
  {
    id: "anxious", name: "患得患失型", emoji: "🎭",
    tags: ["敏感", "多疑", "越爱越怕"],
    description: "你爱得越深就越焦虑。对方晚回消息你会想是不是不在乎了，对方多看别人一眼你会心里打鼓。你的爱很满，但你的安全感很少。",
    advice: "你的敏感让你能感知爱的每一个细节，但也让你活得很累。试着相信对方的爱，也相信自己值得被爱。",
    rules: { passion: 4, dependence: 7, rationality: 0, romance: 3, independence: 0 }
  },
  {
    id: "insulator", name: "恋爱绝缘体", emoji: "⚡",
    tags: ["独立", "自我", "难以心动"],
    description: "不是不想恋爱，是真的很难心动。你习惯了一个人的生活，有自己的节奏和空间。你需要的不是一个恋人，而是一个真正懂你的灵魂伴侣——但这个人好像还没出现。",
    advice: "独立是好事，但别筑起太高的墙。允许别人走近你，也许那个对的人就在门外。",
    rules: { passion: 0, dependence: 0, rationality: 5, romance: 0, independence: 7 }
  }
];

// 全局导出
window.LOVE_TEST_DATA = {
  questions: questions,
  results: results,
  dimensions: ["passion", "dependence", "rationality", "romance", "independence"]
};
