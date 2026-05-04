import type { Zone } from "../../types";

interface ZoningTableProps {
  zones: Zone[];
  selectedZoneId?: string;
  onSelectZone: (zoneId: string) => void;
}

export const ZoningTable = ({ zones, selectedZoneId, onSelectZone }: ZoningTableProps) => (
  <div className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white/84">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-ink/10 text-sm">
        <thead className="bg-ink text-white">
          <tr>
            {["Zone ID", "Name", "Type", "Allowed use", "Max height", "FAR", "Status", "Last updated"].map((header) => (
              <th key={header} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">
          {zones.map((zone) => (
            <tr
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className={`cursor-pointer transition hover:bg-harbor/10 ${selectedZoneId === zone.id ? "bg-harbor/12" : "bg-white"}`}
            >
              <td className="px-4 py-4 font-semibold text-harbor">{zone.id}</td>
              <td className="px-4 py-4 font-semibold text-ink">{zone.name}</td>
              <td className="px-4 py-4 text-ink/70">{zone.type}</td>
              <td className="max-w-xs px-4 py-4 text-ink/65">{zone.allowedUse}</td>
              <td className="px-4 py-4">{zone.maxHeightM} m</td>
              <td className="px-4 py-4">{zone.far}</td>
              <td className="px-4 py-4">
                <span className="rounded-full bg-moss/12 px-3 py-1 text-xs font-semibold text-moss">{zone.status}</span>
              </td>
              <td className="px-4 py-4 text-ink/55">{zone.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
