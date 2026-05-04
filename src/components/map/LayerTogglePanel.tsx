import type { MapLayerConfig } from "../../types";

interface LayerTogglePanelProps {
  layers: MapLayerConfig[];
  onToggle: (layerId: MapLayerConfig["id"]) => void;
}

export const LayerTogglePanel = ({ layers, onToggle }: LayerTogglePanelProps) => (
  <div className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="font-display text-lg font-semibold text-ink">Map layers</h3>
      <span className="rounded-full bg-harbor/10 px-3 py-1 text-xs font-semibold text-harbor">Local GeoJSON</span>
    </div>
    <div className="mt-4 space-y-3">
      {layers.map((layer) => (
        <label key={layer.id} className="flex cursor-pointer items-center justify-between rounded-2xl border border-ink/10 bg-paper/60 p-3">
          <span className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: layer.color }} />
            <span className="text-sm font-semibold text-ink">{layer.label}</span>
          </span>
          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => onToggle(layer.id)}
            className="h-5 w-5 accent-harbor"
          />
        </label>
      ))}
    </div>
  </div>
);
