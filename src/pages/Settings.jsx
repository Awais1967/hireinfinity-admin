import { useState, useCallback, useMemo } from "react";
import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsTabs from "../components/settings/SettingsTabs";
import GeneralSettings from "../components/settings/GeneralSettings";
import SystemPreferences from "../components/settings/SystemPreferences";
import ProfileSettings from "../components/settings/ProfileSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import IntegrationSettings from "../components/settings/IntegrationSettings";
import BillingSettings from "../components/settings/BillingSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import AdvancedSettings from "../components/settings/AdvancedSettings";
import SystemInformation from "../components/settings/SystemInformation";
import SettingsQuickActions from "../components/settings/SettingsQuickActions";
import ApiKeysModal from "../components/settings/ApiKeysModal";
import Toast from "../components/settings/Toast";
import {
  defaultGeneral, defaultPreferences, defaultProfile, defaultNotifications,
  defaultSecurity, defaultIntegrations, defaultBilling, defaultAppearance, defaultAdvanced, apiKeys as defaultApiKeys,
} from "../data/settingsData";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("General");
  const [general, setGeneral] = useState(defaultGeneral);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [profile, setProfile] = useState(defaultProfile);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [security, setSecurity] = useState(defaultSecurity);
  const [integrations, setIntegrations] = useState(defaultIntegrations);
  const [billing, setBilling] = useState(defaultBilling);
  const [appearance, setAppearance] = useState(defaultAppearance);
  const [advanced, setAdvanced] = useState(defaultAdvanced);
  const [apiKeys, setApiKeys] = useState(defaultApiKeys);
  const [savedVersion, setSavedVersion] = useState({ general, preferences, profile, notifications, security, integrations, billing, appearance, advanced });
  const [showApiModal, setShowApiModal] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const current = useMemo(() => ({ general, preferences, profile, notifications, security, integrations, billing, appearance, advanced }), [general, preferences, profile, notifications, security, integrations, billing, appearance, advanced]);
  const hasChanges = JSON.stringify(current) !== JSON.stringify(savedVersion);

  const showToast = (msg) => setToast({ visible: true, message: msg });
  const hideToast = () => setToast({ visible: false, message: "" });

  const handleSave = () => {
    setSavedVersion({ general, preferences, profile, notifications, security, integrations, billing, appearance, advanced });
    showToast("Settings saved successfully.");
  };

  const handleQuickAction = useCallback((action) => {
    if (action === "cache") showToast("Cache cleared successfully.");
    if (action === "logs") {
      const blob = new Blob(["System log file content\n[INFO] Server started\n[INFO] User login\n[OK] All services running"], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "system_logs.txt"; a.click(); URL.revokeObjectURL(url);
    }
    if (action === "backup") {
      const blob = new Blob([JSON.stringify(current, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "database_backup.json"; a.click(); URL.revokeObjectURL(url);
    }
    if (action === "apikeys") setShowApiModal(true);
    if (action === "reset") {
      if (window.confirm("Reset all preferences to default values?")) {
        setGeneral(defaultGeneral); setPreferences(defaultPreferences); setProfile(defaultProfile);
        setNotifications(defaultNotifications); setSecurity(defaultSecurity); setIntegrations(defaultIntegrations);
        setBilling(defaultBilling); setAppearance(defaultAppearance); setAdvanced(defaultAdvanced);
        showToast("Preferences reset to defaults.");
      }
    }
  }, [current]);

  const handleRegenerateKey = (label) => {
    const fake = `sk_${label.toLowerCase().replace(/\s/g, "_")}_${Math.random().toString(36).slice(2, 10)}`;
    if (label === "Public API Key") setApiKeys((p) => ({ ...p, publicKey: fake }));
    else if (label === "Secret API Key") setApiKeys((p) => ({ ...p, secretKey: fake }));
    else setApiKeys((p) => ({ ...p, webhookSecret: fake }));
  };

  const handleIntegrationToggle = (name) => {
    setIntegrations((prev) => prev.map((i) => i.name === name ? { ...i, status: i.status === "Connected" ? "Disconnected" : "Connected" } : i));
  };

  const handleResetSystem = () => {
    if (window.confirm("Reset the entire system to default? This cannot be undone.")) {
      setGeneral(defaultGeneral); setPreferences(defaultPreferences); setProfile(defaultProfile);
      setNotifications(defaultNotifications); setSecurity(defaultSecurity); setIntegrations(defaultIntegrations);
      setBilling(defaultBilling); setAppearance(defaultAppearance); setAdvanced(defaultAdvanced);
      showToast("System reset to defaults.");
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "General": return <GeneralSettings settings={general} onChange={(k, v) => setGeneral((p) => ({ ...p, [k]: v }))} />;
      case "Profile": return <ProfileSettings settings={profile} onChange={(k, v) => setProfile((p) => ({ ...p, [k]: v }))} />;
      case "Notifications": return <NotificationSettings settings={notifications} onChange={(k, v) => setNotifications((p) => ({ ...p, [k]: v }))} />;
      case "Security": return <SecuritySettings settings={security} onChange={(k, v) => setSecurity((p) => ({ ...p, [k]: v }))} />;
      case "Integrations": return <IntegrationSettings integrations={integrations} onToggle={handleIntegrationToggle} />;
      case "Billing": return <BillingSettings settings={billing} onChange={(k, v) => setBilling((p) => ({ ...p, [k]: v }))} />;
      case "Appearance": return <AppearanceSettings settings={appearance} onChange={(k, v) => setAppearance((p) => ({ ...p, [k]: v }))} />;
      case "Advanced": return <AdvancedSettings settings={advanced} onChange={(k, v) => setAdvanced((p) => ({ ...p, [k]: v }))} onResetSystem={handleResetSystem} />;
      default: return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <SettingsHeader onSave={handleSave} hasChanges={hasChanges} />
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {activeTab === "General" ? (
            <>
              <GeneralSettings settings={general} onChange={(k, v) => setGeneral((p) => ({ ...p, [k]: v }))} />
              <SystemPreferences settings={preferences} onChange={(k, v) => setPreferences((p) => ({ ...p, [k]: v }))} />
            </>
          ) : (
            renderTab()
          )}
        </div>
        <div className="space-y-4">
          <SystemInformation />
          <SettingsQuickActions onAction={handleQuickAction} />
        </div>
      </div>

      {showApiModal && (
        <ApiKeysModal keys={apiKeys} onClose={() => setShowApiModal(false)} onRegenerate={handleRegenerateKey} />
      )}

      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
    </div>
  );
}
