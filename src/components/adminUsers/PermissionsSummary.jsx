import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

const COLORS = ["#2563eb", "#7c3aed", "#16a34a", "#f97316", "#64748b"];

const categories = [
  { label: "User Management", value: 8 },
  { label: "Content Management", value: 7 },
  { label: "System Settings", value: 6 },
  { label: "Reports & Analytics", value: 5 },
  { label: "Other Permissions", value: 6 },
];
const totalPerms = categories.reduce((s, c) => s + c.value, 0);

export default function PermissionsSummary({ onViewPermissions }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const outerR = Math.min(w, h) / 2 - 8;
    const innerR = outerR * 0.55;

    ctx.clearRect(0, 0, w, h);
    let startAngle = -Math.PI / 2;
    categories.forEach((cat, i) => {
      const slice = (cat.value / totalPerms) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, startAngle, startAngle + slice);
      ctx.arc(cx, cy, innerR, startAngle + slice, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      startAngle += slice;
    });

    // center hole text
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 20px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(totalPerms.toString(), cx, cy - 6);
    ctx.fillStyle = "#64748b";
    ctx.font = "10px Inter, sans-serif";
    ctx.fillText("Total Permissions", cx, cy + 16);
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Role Permissions Summary</h3>
      <div className="flex justify-center">
        <canvas ref={canvasRef} width={180} height={160} className="max-w-full" />
      </div>
      <div className="mt-3 space-y-1.5">
        {categories.map((cat, i) => (
          <div key={cat.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-slate-600">{cat.label}</span>
            </div>
            <span className="font-semibold text-slate-800">({cat.value})</span>
          </div>
        ))}
      </div>
      <button onClick={onViewPermissions} className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
        View Permissions Matrix <ChevronRight size={15} />
      </button>
    </div>
  );
}
