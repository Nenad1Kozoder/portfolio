"use client";
import { useEffect, useState } from "react";
import { data } from "@/data/projects";
import ThreeScene from "./ThreeScene";
import { DeviceType } from "./ThreeScene";
import styles from "./projects.module.scss";

export default function Project() {
  const [selectedEntry, setSelectedEntry] = useState(data[0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState<DeviceType>("phone");

  // Provera da li entry ima company-level info
  const hasCompanyInfo = (entry: any) =>
    entry.jobTitle || entry.description || entry.tenure;

  let effectiveUrl = selectedProject?.url
    ? selectedProject.url
    : !selectedProject && selectedEntry.url
    ? selectedEntry.url
    : null;

  const selectedEntryHandler = (entry: any) => {
    setSelectedEntry(entry);
    setActiveTab("phone");
  };

  // Kada se promeni kompanija
  useEffect(() => {
    if (!hasCompanyInfo(selectedEntry) && selectedEntry.projects?.length) {
      // automatski selektuj prvi projekat ako nema company-level info
      setSelectedProject(selectedEntry.projects[0]);
    } else {
      setSelectedProject(null); // ručno se bira projekat
    }
  }, [selectedEntry]);

  return (
    <section className={styles.projectsSection} id="work">
      <h2 className={styles.title}>My Projects</h2>

      <div className={styles.projectsHolder}>
        {/* Leva navigacija */}
        <div className={styles.projectNav}>
          <ul className={styles.list}>
            {data.map((entry, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    selectedEntryHandler(entry);
                    window.history.replaceState(null, "");
                  }}
                  className={`${styles.projectsButton} ${
                    selectedEntry.company === entry.company && styles.isActive
                  }`}
                >
                  {entry.company}
                </button>
              </li>
            ))}
          </ul>

          {/* Select ispod liste, samo ako firma ima projekte */}
          {selectedEntry?.projects?.length > 0 && (
            <select
              id="selectProject"
              className={styles.select}
              onChange={(e) => {
                const project = selectedEntry.projects.find(
                  (p) => p.name === e.target.value
                );
                setSelectedProject(project);
                setActiveTab("phone");
                window.history.replaceState(null, "");
              }}
              value={selectedProject?.name || ""}
            >
              <option value="" disabled>
                - Select project -
              </option>
              {selectedEntry.projects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          )}
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
                      onClick={() => {
                        setActiveTab(device);
                        window.history.replaceState(null, "");
                      }}
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
              <div className="">
                <ThreeScene
                  url={selectedProject?.url || selectedEntry.url || ""}
                  device={activeTab}
                  key={`${
                    selectedProject?.url || selectedEntry.url
                  }-${activeTab}`}
                />
              </div>
            </>
          ) : (
            <div className={styles.linkHolder}>
              <a
                className={styles.projectsButton}
                href={selectedProject?.link || selectedEntry.link || ""}
                target="_blank"
              >
                Open webSite url in new tab
              </a>
              <span>Iframe is blocked by CSP*</span>
            </div>
          )}
          {/* Info: projekat ili company */}
          {selectedProject ? (
            <div className={styles.projectData}>
              <h2 className={styles.projectTitle}>{selectedProject.name}</h2>
              {selectedProject?.url && (
                <p className={styles.siteUrl}>
                  <span>Url:</span>{" "}
                  <a href={selectedProject.url} target="_blank">
                    {selectedProject.url}
                  </a>
                </p>
              )}
              <p className={styles.projectDescription}>
                {selectedProject.description}
              </p>
              <p className={styles.projectTechnologies}>
                <span>Technologies:</span> {selectedProject.technologies}
              </p>
            </div>
          ) : hasCompanyInfo(selectedEntry) ? (
            <div className={styles.projectData}>
              <h2 className={styles.projectTitle}>{selectedEntry.jobTitle}</h2>
              <p className={styles.tenure}>
                <span>Tenure:</span> {selectedEntry.tenure}
              </p>
              {selectedEntry.url && (
                <p className={styles.siteUrl}>
                  <span>Url:</span>{" "}
                  <a href={selectedEntry.url} target="_blank">
                    {selectedEntry?.url}
                  </a>
                </p>
              )}
              <p className={styles.projectDescription}>
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
