import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface UserIdiom {
  id: string; // If from DB, matches DB id. If custom, generated.
  word: string;
  pinyin?: string;
  definition?: string;
  addedAt: number;
  familiarity: "familiar" | "neutral" | "unfamiliar";
  tags: string[];
  isCustom?: boolean;
}

const STORAGE_KEY = "chengyu_app_collection";

export function useCollection() {
  const [items, setItems] = useState<UserIdiom[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (idiom: Partial<UserIdiom> & { word: string; id: string }) => {
    if (items.some(i => i.id === idiom.id || i.word === idiom.word)) {
      toast.error("该成语已在库中");
      return false;
    }
    const newItem: UserIdiom = {
      addedAt: Date.now(),
      familiarity: "unfamiliar",
      tags: [],
      ...idiom,
    };
    setItems(prev => [newItem, ...prev]);
    toast.success("已添加到个人库");
    return true;
  };

  const remove = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.success("已移除");
  };

  const update = (id: string, updates: Partial<UserIdiom>) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  return { items, add, remove, update };
}
