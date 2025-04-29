import RevenueChart from "../dashboardcomponents/RevenueChart";
import SalesChart from "../dashboardcomponents/SalesChart";
import Stats from "../dashboardcomponents/Stats";

export default function Dashboard() {
  return (
    <div className="space-y-6 pe-0 md:pe-20 overflow-y-auto scrollbar-hide h-full">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <Stats />
      <SalesChart />
      <RevenueChart />
    </div>
  );
}
