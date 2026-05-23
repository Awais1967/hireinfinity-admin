import { kpiData } from "../data/dashboardData";
import StatCard from "../components/dashboard/StatCard";
import RequestsChart from "../components/dashboard/RequestsChart";
import SpecialtiesChart from "../components/dashboard/SpecialtiesChart";
import PricingInterest from "../components/dashboard/PricingInterest";
import LeadSources from "../components/dashboard/LeadSources";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your platform performance and key metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpiData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RequestsChart />
        <SpecialtiesChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <PricingInterest />
        <LeadSources />
        <div />
      </div>

      <QuickActions />
    </div>
  );
}
