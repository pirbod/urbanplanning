import { CircleMarker, GeoJSON, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import type { Feature, Geometry } from "geojson";
import type { Layer } from "leaflet";
import type { EnvironmentalArea, MapLayerConfig, Project, PublicComment, SelectedMapFeature, Zone } from "../../types";
import { mobilityCorridors } from "../../utils/geojson";

interface PlanningMapProps {
  zones: Zone[];
  projects: Project[];
  environmentalAreas: EnvironmentalArea[];
  publicComments: PublicComment[];
  layers: MapLayerConfig[];
  onSelectFeature: (feature: SelectedMapFeature) => void;
}

const isVisible = (layers: MapLayerConfig[], id: MapLayerConfig["id"]) =>
  layers.find((layer) => layer.id === id)?.visible ?? false;

const featureProperties = (feature: Feature<Geometry>) =>
  (feature.properties ?? {}) as Record<string, string | number>;

export const PlanningMap = ({
  zones,
  projects,
  environmentalAreas,
  publicComments,
  layers,
  onSelectFeature,
}: PlanningMapProps) => {
  const projectAreas = projects.flatMap((project) =>
    project.geometry ? [{ project, geometry: project.geometry }] : [],
  );

  const selectGeoJsonFeature = (
    feature: Feature<Geometry>,
    layer: Layer,
    selected: SelectedMapFeature,
  ) => {
    layer.on("click", () => onSelectFeature({ ...selected, geometry: feature.geometry }));
  };

  return (
    <div className="map-grid h-[72vh] min-h-[560px] rounded-[1.6rem] border border-white/80 bg-fog p-2 shadow-command">
      <MapContainer center={[52.515, 13.425]} zoom={12} scrollWheelZoom className="z-0 h-full">
        <TileLayer
          attribution="Map data: OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {isVisible(layers, "zone")
          ? zones.map((zone) => (
              <GeoJSON
                key={zone.id}
                data={zone.geometry}
                style={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.28, weight: 2 }}
                onEachFeature={(feature, layer) =>
                  selectGeoJsonFeature(feature as Feature<Geometry>, layer, {
                    id: zone.id,
                    kind: "zone",
                    title: zone.name,
                    subtitle: `${zone.type}, ${zone.district}`,
                    properties: {
                      "Allowed use": zone.allowedUse,
                      "Max height": `${zone.maxHeightM} m`,
                      FAR: zone.far,
                      Status: zone.status,
                      "Last updated": zone.lastUpdated,
                    },
                  })
                }
              />
            ))
          : null}

        {isVisible(layers, "environment")
          ? environmentalAreas.map((area) => (
              <GeoJSON
                key={area.id}
                data={area.geometry}
                style={{ color: area.color, fillColor: area.color, fillOpacity: 0.22, weight: 2, dashArray: "6 6" }}
                onEachFeature={(feature, layer) =>
                  selectGeoJsonFeature(feature as Feature<Geometry>, layer, {
                    id: area.id,
                    kind: "environment",
                    title: area.name,
                    subtitle: `${area.type}, ${area.district}`,
                    properties: {
                      Score: area.score,
                      Severity: area.severity,
                      Status: area.assessmentStatus,
                      "Linked projects": area.linkedProjectIds.length,
                    },
                  })
                }
              />
            ))
          : null}

        {isVisible(layers, "project")
          ? projects.map((project) => (
              <CircleMarker
                key={project.id}
                center={project.location}
                radius={10}
                pathOptions={{
                  color: project.riskLevel === "High" ? "#a85032" : "#0f4c5c",
                  fillColor: project.riskLevel === "High" ? "#a85032" : "#0f4c5c",
                  fillOpacity: 0.86,
                }}
                eventHandlers={{
                  click: () =>
                    onSelectFeature({
                      id: project.id,
                      kind: "project",
                      title: project.name,
                      subtitle: `${project.type}, ${project.district}`,
                      properties: {
                        Status: project.status,
                        Budget: project.budgetEstimate,
                        Team: project.responsibleTeam,
                        "Approval progress": `${project.approvalProgress}%`,
                        Risk: project.riskLevel,
                      },
                    }),
                }}
              >
                <Tooltip>{project.name}</Tooltip>
              </CircleMarker>
            ))
          : null}

        {isVisible(layers, "project")
          ? projectAreas
              .map(({ project, geometry }) => (
                <GeoJSON
                  key={`${project.id}-polygon`}
                  data={geometry}
                  style={{ color: "#13201c", fillColor: "#f59e0b", fillOpacity: 0.24, weight: 2 }}
                  onEachFeature={(feature, layer) =>
                    selectGeoJsonFeature(feature as Feature<Geometry>, layer, {
                      id: project.id,
                      kind: "project",
                      title: project.name,
                      subtitle: `${project.type}, ${project.district}`,
                      properties: {
                        Status: project.status,
                        Budget: project.budgetEstimate,
                        "Approval progress": `${project.approvalProgress}%`,
                        Risk: project.riskLevel,
                      },
                    })
                  }
                />
              ))
          : null}

        {isVisible(layers, "comment")
          ? publicComments.map((comment) => (
              <CircleMarker
                key={comment.id}
                center={comment.location}
                radius={7}
                pathOptions={{
                  color: comment.sentiment === "concern" ? "#dc2626" : comment.sentiment === "support" ? "#16a34a" : "#64748b",
                  fillColor: comment.sentiment === "concern" ? "#dc2626" : comment.sentiment === "support" ? "#16a34a" : "#64748b",
                  fillOpacity: 0.78,
                }}
                eventHandlers={{
                  click: () =>
                    onSelectFeature({
                      id: comment.id,
                      kind: "comment",
                      title: comment.anonymous ? "Anonymous feedback" : comment.name,
                      subtitle: `${comment.category}, ${comment.status}`,
                      properties: {
                        Sentiment: comment.sentiment,
                        Status: comment.status,
                        Project: comment.projectId,
                        Comment: comment.comment,
                      },
                    }),
                }}
              >
                <Tooltip>{comment.category}</Tooltip>
              </CircleMarker>
            ))
          : null}

        {isVisible(layers, "mobility")
          ? mobilityCorridors.map((corridor) => {
              const props = featureProperties(corridor as Feature<Geometry>);
              return (
                <GeoJSON
                  key={String(props.id)}
                  data={corridor}
                  style={{ color: "#2563eb", weight: 5, opacity: 0.82 }}
                  onEachFeature={(feature, layer) =>
                    selectGeoJsonFeature(feature as Feature<Geometry>, layer, {
                      id: String(props.id),
                      kind: "mobility",
                      title: String(props.name),
                      subtitle: String(props.corridorType),
                      properties: {
                        Status: String(props.status),
                        "Azure target": "Azure Maps line layer",
                      },
                    })
                  }
                />
              );
            })
          : null}
      </MapContainer>
    </div>
  );
};
