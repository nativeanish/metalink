import { create } from "zustand";
export type _click = {
  name: string;
  id: string;
  date: string;
};

export const get_links = (
  state: _state
): Array<{ date: string; id: string; name: string; viewId: string }> => {
  const links: Array<{
    date: string;
    id: string;
    name: string;
    viewId: string;
  }> = [];

  state.views.forEach((view) => {
    view.clicks.forEach((click) => {
      links.push({
        date: click.date,
        id: click.id,
        name: click.name,
        viewId: view.id,
      });
    });
  });

  return links;
};
export type _view = {
  browser: string;
  date: string;
  id: string;
  ip: string;
  loadtime: string;
  name: string;
  os: string;
  timezone: string;
  wallet: string;
  originalId: string;
  clicks: Array<_click>;
};
export type _state = {
  data: string;
  design: string;
  id: string;
  name: string;
  views: Array<_view>;
};
interface State {
  state: Array<_state>;
  setState: (e: _state) => void;
  setView: (state_id: string, e: _view) => void;
  setClick: (state_id: string, view_id: string, e: _click) => void;
  clear: () => void;
  onRemove: (e: string) => void;
}
const useData = create<State>((set) => ({
  state: [],
  setState: (e) =>
    set((state) => {
      if (!state.state.find((item) => item.id === e.id)) {
        return { state: [...state.state, e] };
      }
      return state;
    }),
  setView: (id, e) => {
    set((state) => {
      const temp_state = state.state.find((item) => item.id === id);
      if (temp_state) {
        if (!temp_state.views.find((view) => view.id === e.id)) {
          temp_state.views.push(e);
        }
      }
      return { state: [...state.state] };
    });
  },
  setClick: (state_id, view_id, e) => {
    set((state) => {
      const temp_state = state.state.find((item) => item.id === state_id);
      if (temp_state) {
        const temp_view = temp_state.views.find((view) => view.id === view_id);
        if (temp_view) {
          if (!temp_view.clicks.find((click) => click.id === e.id)) {
            temp_view.clicks.push(e);
          }
        }
      }
      return { state: [...state.state] };
    });
  },
  clear: () => {
    set({ state: [] });
  },
  onRemove(e) {
    set((state) => ({
      state: state.state.filter((item) => item.id !== e),
    }));
  },
}));

export default useData;

export const getLinkPerformanceDataByDate = (
  state: _state
): Array<{ date: string; views: number; clicks: number }> => {
  const performanceData: { [key: string]: { views: number; clicks: number } } =
    {};
  if (state) {
    state.views.forEach((view) => {
      const date = new Date(parseInt(view.date)).toISOString().split("T")[0];
      if (!performanceData[date]) {
        performanceData[date] = { views: 0, clicks: 0 };
      }
      performanceData[date].views += 1;
      performanceData[date].clicks += view.clicks.length;
    });
    return Object.keys(performanceData)
      .sort()
      .map((date) => ({
        date,
        views: performanceData[date].views,
        clicks: performanceData[date].clicks,
      }));
  }
  return [];
};
