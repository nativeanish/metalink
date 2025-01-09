import { _state } from "../../store/useData";

interface QuickStatsProps {
  links: _state;
}

export function QuickStats({ links }: QuickStatsProps) {
  const totalViews = calculateTotalViews(links);
  const totalClicks = calculateTotalClicks(links);

  return (
    <div className="bg-white border-4 border-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Quick Stats</h2>
      <p className="text-gray-600 mb-4">Overview of your {links.name} page</p>
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
        <div>
          <p className="text-gray-500">Total Views</p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {totalViews}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Total Clicks</p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {totalClicks}
          </p>
        </div>
      </div>
      <div className="h-20 bg-teal-500 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 mt-6" />
    </div>
  );
}
export const calculateTotalViews = (state: _state): number => {
  return state.views.length;
};

export const calculateTotalClicks = (state: _state): number => {
  return state.views.reduce((total, view) => total + view.clicks.length, 0);
};
