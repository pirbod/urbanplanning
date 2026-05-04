import { useState } from "react";
import { FeatureDetailPanel } from "../components/map/FeatureDetailPanel";
import { LayerTogglePanel } from "../components/map/LayerTogglePanel";
import { PlanningMap } from "../components/map/PlanningMap";
import { PageShell } from "../components/layout/PageShell";
import type { EnvironmentalArea, MapLayerConfig, Project, PublicComment, Role, SelectedMapFeature, Zone } from "../types";
import { buildExportGeoJson, describeQgisExport, downloadGeoJson } from "../utils/geojson";

interface MapPageProps {
  role: Role;
  zones: Zone[];
  projects: Project[];
  environmentalAreas: EnvironmentalArea[];
  comments: PublicComment[];
  notify: (message: string) => void;
}

const initialLayers: MapLayerConfig[] = [
  { id: "zone", label: "Zoning districts", color: "#d97706", visible: true },
  { id: "project", label: "Infrastructure projects", color: "#0f4c5c", visible: true },
  { id: "environment", label: "Environmental risk areas", color: "#dc2626", visible: true },
  { id: "comment", label: "Public comments", color: "#16a34a", visible: true },
  { id: "mobility", label: "Mobility corridors", color: "#2563eb", visible: true },
];

export const MapPage = ({ role, zones, projects, environmentalAreas, comments, notify }: MapPageProps) => {
  const [layers, setLayers] = useState(initialLayers);
  const [selectedFeature, setSelectedFeature] = useState<SelectedMapFeature | undefined>();

  const toggleLayer = (layerId: MapLayerConfig["id"]) => {
    setLayers((current) => current.map((layer) => (layer.id === layerId ? { ...layer, visible: !layer.visible } : layer)));
  };

  const exportGeoJson = () => {
    downloadGeoJson(buildExportGeoJson(zones, projects, environmentalAreas, comments), "urbantwin-demo-export.geojson");
    notify("GeoJSON export created for QGIS-friendly import.");
  };

  return (
    <PageShell
      eyebrow="Core PoC"
      title="Interactive planning map"
      description="A Leaflet-powered local map with zoning, project, environmental, feedback, and mobility layers. Click map objects to inspect details and trigger simulated planning actions."
      aside={
        <div className="space-y-4">
          <LayerTogglePanel layers={layers} onToggle={toggleLayer} />
          <FeatureDetailPanel
            selectedFeature={selectedFeature}
            role={role}
            onRunAi={() => notify("Mock AI impact analysis queued for the selected map feature.")}
            onExport={exportGeoJson}
            onCreateNote={() => notify("Planning note created in local mock state.")}
            onStakeholderUpdate={() => notify("Stakeholder update simulated through the local notification stream.")}
          />
          <div className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-4 text-sm leading-6 text-ink/62">
            <p className="font-semibold text-ink">QGIS concept</p>
            <p className="mt-1">{describeQgisExport()}</p>
          </div>
        </div>
      }
    >
      <PlanningMap
        zones={zones}
        projects={projects}
        environmentalAreas={environmentalAreas}
        publicComments={comments}
        layers={layers}
        onSelectFeature={setSelectedFeature}
      />
    </PageShell>
  );
};
