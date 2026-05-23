import { useState } from "react";
import PricingHeader from "../components/pricing/PricingHeader";
import PricingTabs from "../components/pricing/PricingTabs";
import PricingTable from "../components/pricing/PricingTable";
import PricingInfoBox from "../components/pricing/PricingInfoBox";
import PricingEditModal from "../components/pricing/PricingEditModal";
import { monthlyRates, hourlyRates, teamPods, tabs } from "../data/pricingData";

export default function PricingPlans() {
  const [activeTab, setActiveTab] = useState("monthly");
  const [monthly, setMonthly] = useState(monthlyRates);
  const [hourly, setHourly] = useState(hourlyRates);
  const [pods, setPods] = useState(teamPods);
  const [showModal, setShowModal] = useState(false);

  const dataMap = { monthly, hourly, pods };

  const handleSave = (rows) => {
    const updater = { monthly: setMonthly, hourly: setHourly, pods: setPods };
    updater[activeTab]((prev) => ({ ...prev, rows }));
  };

  const currentData = dataMap[activeTab];

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <PricingHeader onEdit={() => setShowModal(true)} />

      <PricingTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      <PricingTable activeTab={activeTab} data={currentData} />

      <PricingInfoBox message={currentData.info} />

      {showModal && (
        <PricingEditModal
          activeTab={activeTab}
          data={currentData}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
