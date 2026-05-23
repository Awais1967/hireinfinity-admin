export default function PricingTable({ activeTab, data }) {
  const isPods = activeTab === "pods";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-6 pt-5 pb-3">
        <h2 className="text-lg font-semibold text-slate-900">{data.title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{data.subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-y border-gray-100 bg-slate-50/80">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {isPods ? "Pod Type" : "Specialty Sector"}
              </th>
              {data.columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider ${col.color}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 transition-colors hover:bg-slate-50/50">
                <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                  {row.sector || row.podType}
                </td>
                {isPods ? (
                  <>
                    <td className="px-4 py-4 text-slate-700">{row.composition}</td>
                    <td className="px-4 py-4 font-semibold text-blue-600 whitespace-nowrap">{row.price}</td>
                    <td className="px-4 py-4 text-slate-600">{row.bestFor}</td>
                  </>
                ) : (
                  data.columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-4 font-semibold whitespace-nowrap ${col.color}`}
                    >
                      {row[col.key]}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
