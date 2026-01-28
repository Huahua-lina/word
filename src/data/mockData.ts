export interface Idiom {
  id: string;
  word: string;
  pinyin: string;
  definition: string;
  source?: string;
  emotion: "commendatory" | "derogatory" | "neutral"; // 褒义 | 贬义 | 中性
  usage: string;
  misuse_warning?: string; // 常见误用提示
  examples: {
    correct: string[];
    incorrect?: string[];
  };
  tags: string[];
}

export const MOCK_IDIOMS: Idiom[] = [
  {
    id: "cy_001",
    word: "首当其冲",
    pinyin: "shǒu dāng qí chōng",
    definition: "比喻最先受到攻击或遭到灾难。",
    source: "《汉书·五行志下》",
    emotion: "neutral",
    usage: "只能用于遭遇灾难、攻击等不幸的情况。不能用于表示'排在第一位'或'首先'。",
    misuse_warning: "常被误用为'首先'、'首要'或'排名第一'。",
    examples: {
      correct: ["洪水袭来，住在河边的居民首当其冲。", "在全球经济危机中，出口型企业首当其冲。"],
      incorrect: ["这次比赛，他首当其冲拿了冠军。", "解决环境问题，减少排放首当其冲。"]
    },
    tags: ["高频误用", "易混淆"]
  },
  {
    id: "cy_002",
    word: "首屈一指",
    pinyin: "shǒu qū yī zhǐ",
    definition: "扳指头计算，首先弯下大拇指，表示第一。指居第一位。引申为最好的。",
    emotion: "commendatory",
    usage: "用于形容技术高超、品质优良，处于第一位。",
    examples: {
      correct: ["他的医术在全省都是首屈一指的。", "这家餐厅的服务在业内首屈一指。"],
    },
    tags: ["常用", "褒义"]
  },
  {
    id: "cy_003",
    word: "空穴来风",
    pinyin: "kōng xué lái fēng",
    definition: "有了洞穴才进风。比喻消息和谣言的传播不是完全没有原因的。",
    source: "战国·楚·宋玉《风赋》",
    emotion: "neutral",
    usage: "强调'事出有因'。现代汉语中也常被误用为'没有根据'（即完全反义），但在规范考试中应取原意，或注意语境。*注：现行部分词典已收录'无稽之谈'的义项，但在严谨辨析中仍需注意区别。本平台取'事出有因'之意进行辨析。",
    misuse_warning: "极易与'无稽之谈'混淆。原意为'有根据'，常被误用为'毫无根据'。",
    examples: {
      correct: ["虽然是流言，但空穴来风，未必无因，我们还是小心为妙。"],
      incorrect: ["这纯粹是空穴来风的谣言，完全不可信。（注：日常口语常用，但严谨语境需慎用）"]
    },
    tags: ["高频误用", "古今异义"]
  },
  {
    id: "cy_004",
    word: "无稽之谈",
    pinyin: "wú jī zhī tán",
    definition: "没有根据的说法。",
    emotion: "derogatory",
    usage: "指完全没有依据的胡说八道。",
    examples: {
      correct: ["关于世界末日的说法纯属无稽之谈。"],
    },
    tags: ["常用", "贬义"]
  },
  {
    id: "cy_005",
    word: "美轮美奂",
    pinyin: "měi lún měi huàn",
    definition: "形容新屋高大美观，也形容装饰、布置等美好漂亮。",
    source: "《礼记·檀弓下》",
    emotion: "commendatory",
    usage: "适用对象严格限制为'建筑物'或'房屋'。不能形容表演、舞蹈、风景等。",
    misuse_warning: "常被误用于形容舞蹈、晚会精彩。",
    examples: {
      correct: ["这座新落成的剧院美轮美奂，气势恢宏。"],
      incorrect: ["今晚的舞蹈表演美轮美奂。", "这幅山水画画得美轮美奂。"]
    },
    tags: ["高频误用", "对象限制"]
  },
  {
    id: "cy_006",
    word: "金碧辉煌",
    pinyin: "jīn bì huī huáng",
    definition: "形容建筑物装饰华丽，光彩夺目。",
    emotion: "commendatory",
    usage: "侧重于色彩华丽、光彩夺目。多形容宫殿、庙宇等。",
    examples: {
      correct: ["大厅装饰得金碧辉煌，十分气派。"],
    },
    tags: ["常用"]
  },
  {
    id: "cy_007",
    word: "各行其是",
    pinyin: "gè xíng qí shì",
    definition: "各自按照自己以为对的去做。比喻各搞一套。",
    emotion: "derogatory",
    usage: "侧重于'是'（认为正确），含贬义，指不顾整体，只按自己的意愿行事。",
    misuse_warning: "常与'各行其事'（非成语，属生造词或误写）混淆。",
    examples: {
      correct: ["如果大家各行其是，团队就无法形成合力。"],
    },
    tags: ["易混淆", "字形"]
  },
  {
    id: "cy_008",
    word: "各行其事",
    pinyin: "gè xíng qí shì",
    definition: "各自做自己的事情。（注：严格来说不是成语，但在日常中常与各行其是混用）",
    emotion: "neutral",
    usage: "侧重于'事'（事情）。通常建议使用'各行其是'（含贬义）或'各自为政'。在成语辨析中，'各行其是'是规范成语。",
    misuse_warning: "往往是'各行其是'的误写。",
    examples: {
      correct: ["（一般建议用'各司其职'或'各做各的事'替代）"],
    },
    tags: ["易混淆"]
  },
  {
    id: "cy_009",
    word: "不以为然",
    pinyin: "bù yǐ wéi rán",
    definition: "不认为是对的。表示不同意或否定。",
    emotion: "neutral",
    usage: "侧重于'观点不同'。然：对，正确。",
    misuse_warning: "常与'不以为意'混淆。",
    examples: {
      correct: ["对于他的提议，我深不以为然。", "他嘴上不说，心里却不以为然。"],
      incorrect: ["老师批评他，他却不以为然，依然我行我素。（应用不以为意）"]
    },
    tags: ["易混淆"]
  },
  {
    id: "cy_010",
    word: "不以为意",
    pinyin: "bù yǐ wéi yì",
    definition: "不把它放在心上。表示不重视，不介意。",
    emotion: "neutral",
    usage: "侧重于'态度轻慢'或'不放在心上'。意：心意，介意。",
    misuse_warning: "常与'不以为然'混淆。",
    examples: {
      correct: ["他对这些流言蜚语毫不知情，或者说不以为意。", "受点小伤，他根本不以为意。"],
    },
    tags: ["易混淆"]
  }
];
