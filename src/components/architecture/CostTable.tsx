const costs = [
  { service: "Azure Static Web Apps", tier: "Free tier", note: "Enough for early stakeholder demos and preview links." },
  { service: "Azure Functions", tier: "Consumption", note: "Pay per execution for API and export workflows." },
  { service: "Azure Cosmos DB", tier: "Free tier", note: "Small mock-style datasets can start with the free capacity envelope." },
  { service: "Azure Blob Storage", tier: "Minimal usage", note: "Low-cost document and GeoJSON export storage." },
  { service: "Azure Maps", tier: "Low-volume API calls", note: "Production-grade mapping can be introduced when tile usage is known." },
  { service: "Azure SignalR", tier: "Free tier", note: "Enough to demonstrate live collaboration patterns." },
  { service: "Application Insights", tier: "Pay as you go", note: "Start with conservative retention and sampling." },
];

export const CostTable = () => (
  <div className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white/84">
    <table className="min-w-full divide-y divide-ink/10 text-sm">
      <thead className="bg-ink text-white">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">Service</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">Low-cost starting point</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">PoC note</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-ink/10">
        {costs.map((item) => (
          <tr key={item.service}>
            <td className="px-4 py-4 font-semibold text-ink">{item.service}</td>
            <td className="px-4 py-4 text-harbor">{item.tier}</td>
            <td className="px-4 py-4 text-ink/64">{item.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
