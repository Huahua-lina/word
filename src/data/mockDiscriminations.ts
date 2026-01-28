export interface DiscriminationGroup {
  id: string;
  idiomIds: [string, string];
  title: string;
  dimensions: {
    label: string;
    itemA: string; // corresponds to idiomIds[0]
    itemB: string; // corresponds to idiomIds[1]
  }[];
  summary: string;
}

export const MOCK_DISCRIMINATIONS: DiscriminationGroup[] = [
  {
    id: "diff_001",
    idiomIds: ["cy_009", "cy_010"], // 不以为然 vs 不以为意
    title: "不以为然 vs 不以为意",
    dimensions: [
      {
        label: "核心字义",
        itemA: "然：对，正确",
        itemB: "意：心意，介意"
      },
      {
        label: "语义侧重",
        itemA: "侧重于【观点不同】，表示否定",
        itemB: "侧重于【态度轻慢】，表示不放在心上"
      },
      {
        label: "使用场景",
        itemA: "用于反驳对方的意见、建议",
        itemB: "用于描述对人或事物的忽视、冷漠"
      }
    ],
    summary: "“然”是不对（反对观点），“意”是不在乎（忽视态度）。"
  },
  {
    id: "diff_002",
    idiomIds: ["cy_003", "cy_004"], // 空穴来风 vs 无稽之谈
    title: "空穴来风 vs 无稽之谈",
    dimensions: [
      {
        label: "语义真伪",
        itemA: "有洞才来风 → 事出有因（未必是假）",
        itemB: "无法查考 → 完全没有根据（纯属假话）"
      },
      {
        label: "感情色彩",
        itemA: "中性（或偏贬义，视语境）",
        itemB: "贬义"
      },
      {
        label: "常见误区",
        itemA: "常被误用为“毫无根据”",
        itemB: "无"
      }
    ],
    summary: "空穴来风必有因，无稽之谈全是假。"
  }
];
