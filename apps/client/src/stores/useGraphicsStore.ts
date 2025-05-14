import { create } from "zustand";
import Graphic from "@arcgis/core/Graphic";

type GraphicsStore = {
  graphicsMap: Map<string, Graphic>;
  setGraphic: (id: string, graphic: Graphic) => void;
  getGraphic: (id: string) => Graphic | undefined;
  removeGraphic: (id: string) => void;
  clear: () => void;
};

export const useGraphicsStore = create<GraphicsStore>((set, get) => ({
  graphicsMap: new Map(),

  setGraphic: (id, graphic) => {
    const newMap = new Map(get().graphicsMap);
    newMap.set(id, graphic);
    set({ graphicsMap: newMap });
  },

  getGraphic: (id) => {
    return get().graphicsMap.get(id);
  },

  removeGraphic: (id) => {
    const oldMap = get().graphicsMap;
    const newMap = new Map(oldMap);
    newMap.delete(id);
    set({ graphicsMap: newMap });
  },

  clear: () => {
    set({ graphicsMap: new Map() });
  },
}));
