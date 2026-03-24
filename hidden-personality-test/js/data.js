/**
 * 测测你的隐藏人格 - 测试数据
 * 包含12道测试题目、12种人格类型、评分规则
 */

// 12道测试题目
const questions = [
    {
        id: 1,
        text: "深夜独自走在森林里，你看到远处有一双眼睛盯着你，你会？",
        options: [
            { text: "主动靠近看个清楚", weights: { brave: 2, curious: 1, cautious: -1 } },
            { text: "悄悄绕路离开", weights: { cautious: 2, observe: 1, brave: -2 } }
        ]
    },
    {
        id: 2,
        text: "如果你能拥有一项超能力，你选择？",
        options: [
            { text: "隐身术", weights: { hidden: 3, observe: 2, control: -1 } },
            { text: "读心术", weights: { control: 3, insight: 2, hidden: -1 } }
        ]
    },
    {
        id: 3,
        text: "朋友对你撒谎被揭穿，你会？",
        options: [
            { text: "当面质问清楚", weights: { direct: 3, outburst: 2, restrain: -2 } },
            { text: "假装不知道", weights: { restrain: 3, complex: 2, direct: -1 } }
        ]
    },
    {
        id: 4,
        text: "你更喜欢哪种音乐？",
        options: [
            { text: "激烈澎湃的摇滚", weights: { outward: 3, enthusiasm: 2, inward: -1 } },
            { text: "安静舒缓的钢琴", weights: { inward: 3, calm: 2, outward: -1 } }
        ]
    },
    {
        id: 5,
        text: "如果你的人生是一部电影，它会是什么类型？",
        options: [
            { text: "悬疑惊悚片", weights: { complex: 3, madness: 2, calm: -1 } },
            { text: "文艺爱情片", weights: { romantic: 3, persistent: 2, complex: -1 } }
        ]
    },
    {
        id: 6,
        text: "在陌生聚会中，你通常？",
        options: [
            { text: "主动认识新朋友", weights: { extrovert: 3, active: 2, observe: -1 } },
            { text: "观察一会儿再行动", weights: { observe: 3, cautious: 2, extrovert: -1 } }
        ]
    },
    {
        id: 7,
        text: "你最不想被别人发现的一面是？",
        options: [
            { text: "内心的脆弱", weights: { sensitive: 3, soft: 2, disguise: -1 } },
            { text: "隐藏的野心", weights: { control: 3, disguise: 2, sensitive: -1 } }
        ]
    },
    {
        id: 8,
        text: "当你独自一人时，最常做的事是？",
        options: [
            { text: "思考人生意义", weights: { thinking: 3, introspect: 2, action: -1 } },
            { text: "沉浸在兴趣爱好中", weights: { focus: 3, create: 2, thinking: -1 } }
        ]
    },
    {
        id: 9,
        text: "如果可以穿越到过去，你会选择？",
        options: [
            { text: "改变某个重要决定", weights: { change: 3, action: 2, observe: -1 } },
            { text: "见证某个历史时刻", weights: { observe: 3, rational: 2, change: -1 } }
        ]
    },
    {
        id: 10,
        text: "你最害怕失去的是什么？",
        options: [
            { text: "亲人的爱", weights: { dependence: 3, emotion: 2, independent: -1 } },
            { text: "自我认同", weights: { independent: 3, self: 2, dependence: -1 } }
        ]
    },
    {
        id: 11,
        text: "面对巨大的压力时，你会？",
        options: [
            { text: "爆发出来", weights: { outward: 3, madness: 2, restrain: -1 } },
            { text: "默默承受", weights: { restrain: 3, resilient: 2, outward: -1 } }
        ]
    },
    {
        id: 12,
        text: "如果生命只剩最后一天，你会？",
        options: [
            { text: "和最重要的人在一起", weights: { dependence: 3, emotion: 2, independent: -1 } },
            { text: "独自完成最后的心愿", weights: { independent: 3, decisive: 2, dependence: -1 } }
        ]
    }
];

// 12种人格类型
const personalities = [
    {
        id: "loner",
        name: "深渊独行侠",
        tags: ["神秘", "内向", "深刻"],
        description: "表面高冷，实则内心戏超多。喜欢独处思考人生，但偶尔也会孤独想找人陪。典型的「社恐但渴望被理解」。你习惯在黑暗中寻找答案，对人性有深刻的洞察，却选择保持距离。不是冷漠，而是看透后的释然。"
    },
    {
        id: "chill",
        name: "微笑摆烂王",
        tags: ["有趣", "复杂", "佛系"],
        description: "永远笑嘻嘻，实则内心OS超多。看透一切但选择不说，「都可以」是你的人生信条。善于察言观色，在不同人面前展现不同面貌。这不是虚伪，而是生存的智慧。"
    },
    {
        id: "yandere",
        name: "暗夜病娇",
        tags: ["危险", "偏执", "深情"],
        description: "安静时是小天使，发病时超级偏执。占有欲强但不说，喜欢一个人能喜欢到发疯。你的喜欢可以很热烈，讨厌也表现明显。温和的外表下潜伏着原始的力量与冲动。"
    },
    {
        id: "awake",
        name: "人间清醒",
        tags: ["理性", "通透", "冷静"],
        description: "看透一切规则，活得特别明白。不是冷漠，是通透。知道很多事但选择看破不说破。理性如星辰，洞察如明镜。善于分析事物本质，能看穿谎言与伪装。"
    },
    {
        id: "crazy",
        name: "疯批美人",
        tags: ["魅力", "极端", "热烈"],
        description: "美丽且疯狂，做事极端但吸引人。你的喜欢可以很热烈，讨厌也表现明显。不是没有脾气，只是在等待恰当的时机。一旦被激怒，那将是最炽烈的爆发。"
    },
    {
        id: "sensitive",
        name: "高敏玻璃心",
        tags: ["敏感", "共情", "细腻"],
        description: "共情能力超强，一句话能脑补出一部剧。表面没事，内心早已翻江倒海。你比谁都敏感，比谁都在乎。总是先考虑别人的感受，却常常忽略自己。"
    },
    {
        id: "rebel",
        name: "反卷达人",
        tags: ["独立", "佛系", "清醒"],
        description: "最烦鸡汤和鸡血，凡事差不多就行。但关键时刻比谁都靠谱，是真正的佛系大佬。表面平静，实则有自己的节奏。不被外界影响，按照自己的方式生活。"
    },
    {
        id: "drama",
        name: "戏精本精",
        tags: ["多变", "适应", "迷惑"],
        description: "一人分饰多角，在不同人面前不同面孔。有时候自己都分不清哪个是真正的你。这是天赋，也是诅咒。如镜子般善于模仿和适应，环境适应性超强。"
    },
    {
        id: "controller",
        name: "掌控欲怪",
        tags: ["强势", "主导", "规划"],
        description: "表面温柔体贴，实则想把一切都掌握在手里。喜欢规划一切，讨厌突发情况。如深海般平静的外表下蕴藏着无法撼动的力量。善于等待时机，一旦决定出手便不会有任何犹豫。"
    },
    {
        id: "romantic",
        name: "纯爱战士",
        tags: ["执着", "深情", "专一"],
        description: "相信爱情但要求极高，一旦喜欢就是全部。可以在原地等很久，也可以瞬间下头。爱得热烈，分得果断。内心深处依然相信真爱的存在。"
    },
    {
        id: "lonely",
        name: "孤独患者",
        tags: ["疏离", "渴望", "矛盾"],
        description: "渴望被爱又害怕受伤，习惯先推开别人。内心戏丰富但不说，等着别人主动。看得最清楚，却说得最少。沉默不是因为无话可说，而是看透不说透。"
    },
    {
        id: "phoenix",
        name: "觉醒者",
        tags: ["成长", "蜕变", "强大"],
        description: "经历过低谷然后重生，看透很多事。变得温柔且强大，不再较真但依然热爱。拥有浴火重生的力量，每一次跌倒都是下一次腾飞的准备。"
    }
];

// 人格特征阈值判定表
const personalityRules = [
    { id: "loner", features: { introvert: 2, thinking: 1 } },
    { id: "chill", features: { complex: 2, calm: 1 } },
    { id: "yandere", features: { madness: 2, sensitive: 1 } },
    { id: "awake", features: { calm: 2, thinking: 2 } },
    { id: "crazy", features: { madness: 2, outward: 1 } },
    { id: "sensitive", features: { sensitive: 3 } },
    { id: "rebel", features: { independent: 2, calm: 1 } },
    { id: "drama", features: { complex: 2, outward: 1 } },
    { id: "controller", features: { control: 3 } },
    { id: "romantic", features: { dependence: 2, sensitive: 1 } },
    { id: "lonely", features: { introvert: 2, sensitive: 1 } },
    { id: "phoenix", features: { independent: 2, thinking: 2 } }
];

// 特征到人格的映射（用于没有匹配规则时的兜底）
const featureToPersonality = {
    introvert: 'loner',
    outward: 'drama',
    sensitive: 'sensitive',
    complex: 'chill',
    madness: 'yandere',
    calm: 'awake',
    control: 'controller',
    dependence: 'romantic',
    independent: 'rebel',
    thinking: 'phoenix',
    observe: 'lonely',
    romantic: 'romantic'
};

// 导出数据（兼容浏览器和模块环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions, personalities, personalityRules, featureToPersonality };
}
