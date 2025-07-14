"use client";
import { useEffect, useState } from "react";
import { data } from "@/data/projects";
import ThreeScene from "./ThreeScene";
import { DeviceType } from "./ThreeScene";
import styles from "./projects.module.scss";
import { a } from "framer-motion/dist/types.d-B50aGbjN";

export default function Project() {
  const [selectedEntry, setSelectedEntry] = useState(data[0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState<DeviceType>("phone");

  // Provera da li entry ima company-level info
  const hasCompanyInfo = (entry) =>
    entry.jobTitle || entry.description || entry.tenure;

  // Kada se promeni kompanija
  useEffect(() => {
    if (!hasCompanyInfo(selectedEntry) && selectedEntry.projects?.length) {
      // automatski selektuj prvi projekat ako nema company-level info
      setSelectedProject(selectedEntry.projects[0]);
    } else {
      setSelectedProject(null); // ručno se bira projekat
    }
  }, [selectedEntry]);

  const effectiveUrl =
    selectedProject && selectedProject.url
      ? selectedProject.url
      : !selectedProject && selectedEntry.url
      ? selectedEntry.url
      : null;

  const selectedEntryHandler = (entry: any) => {
    setSelectedEntry(entry);
    setSelectedProject(null);
  };

  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.title}>My Projects</h2>

      <div className={styles.projectsHolder}>
        {/* Leva navigacija */}
        <div className={styles.projectNav}>
          <ul className="space-y-4">
            {data.map((entry, index) => (
              <li key={index}>
                <button
                  onClick={() => selectedEntryHandler(entry)}
                  className={`font-semibold ${
                    selectedEntry.company === entry.company
                      ? "text-blue-600 underline"
                      : "hover:text-blue-600"
                  }`}
                >
                  {entry.company}
                </button>

                {/* Uvek prikazuj select ako ima projekata */}
                {entry.projects?.length > 0 &&
                  selectedEntry.company === entry.company && (
                    <select
                      className="mt-2 block border rounded px-2 py-1"
                      onChange={(e) => {
                        const project = entry.projects.find(
                          (p) => p.name === e.target.value
                        );
                        setSelectedProject(project);
                        setActiveTab("phone");
                      }}
                      value={selectedProject?.name || ""}
                    >
                      <option value="" disabled>
                        -- Select project --
                      </option>
                      {entry.projects.map((project) => (
                        <option key={project.id} value={project.name}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desna strana */}
        <div className={styles.projectContent}>
          {/* Tabs */}
          {effectiveUrl ? (
            <>
              <div className={styles.projectTabs}>
                {(["phone", "tablet", "desktop"] as DeviceType[]).map(
                  (device) => (
                    <button
                      key={device}
                      onClick={() => setActiveTab(device)}
                      className={`${styles.tabButton} ${
                        activeTab === device ? styles.tabButtonActive : ""
                      }`}
                    >
                      {device}
                    </button>
                  )
                )}
              </div>

              {/* Three.js prikaz */}
              <div className="w-full h-[500px] mb-4 border">
                <ThreeScene
                  url={selectedProject?.url || selectedEntry.url || ""}
                  device={activeTab}
                />
              </div>
            </>
          ) : (
            <div>
              <a
                href={selectedProject?.link || selectedEntry.link || ""}
                target="_blank"
              >
                Open url in new tab
              </a>
              <span>Iframe is blocked by CSP*</span>
            </div>
          )}
          {/* Info: projekat ili company */}
          {selectedProject ? (
            <div className={styles.projectData}>
              <h2 className="text-xl font-bold mb-2">{selectedProject.name}</h2>
              <p className="text-gray-700">{selectedProject.description}</p>
              <p className="mt-2 text-sm text-gray-500 italic">
                Technologies: {selectedProject.technologies}
              </p>
            </div>
          ) : hasCompanyInfo(selectedEntry) ? (
            <div className={styles.projectData}>
              <h2 className="text-xl font-bold mb-2">
                {selectedEntry.jobTitle}
              </h2>
              <p className="text-sm text-gray-500 mb-2 italic">
                {selectedEntry.tenure}
              </p>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedEntry.description}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No information available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
