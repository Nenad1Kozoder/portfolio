"use client";
import { useState } from "react";
import { data } from "@/data/projects"; // tvoj exportovani data niz
import ThreeScene from "./ThreeScene"; // tvoj 3D prikaz
import { DeviceType } from "./ThreeScene";
import styles from "./projects.module.scss";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState<DeviceType>("phone"); // default tab

  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.title}>My Projects</h2>
      {/* Leva navigacija */}
      <div className={styles.projectsHolder}>
        <div className={styles.projectNav}>
          <ul className="space-y-2">
            {data.map((entry, index) => (
              <li key={index}>
                {entry.url ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {entry.company}
                  </a>
                ) : (
                  <span className="font-semibold">{entry.company}</span>
                )}
                {entry.projects && (
                  <ul className="ml-4 mt-1 space-y-1 text-gray-700">
                    {entry.projects.map((project) => (
                      <li
                        key={project.id}
                        onClick={() => {
                          setSelectedProject(project);
                          console.log(project);
                          setActiveTab("phone"); // resetuj na mobile kad promeniš projekat
                        }}
                        className="cursor-pointer hover:text-black"
                      >
                        {project.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desna sekcija */}
        <div className={styles.projectContent}>
          {selectedProject ? (
            <>
              {/* Tabs */}
              <div className={styles.projectTabs}>
                {(["phone", "tablet", "desktop"] as DeviceType[]).map(
                  (device) => (
                    <button
                      key={device}
                      onClick={() => setActiveTab(device)}
                      className={`${styles.tabButton} ${
                        activeTab === device && styles.tabButtonActive
                      }`}
                    >
                      {device}
                    </button>
                  )
                )}
              </div>

              {/* Three.js prikaz */}
              <div className="w-full h-[500px] mb-4 border">
                <ThreeScene url={selectedProject.url} device={activeTab} />
              </div>

              {/* Opis */}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {selectedProject.name}
                </h2>
                <p className="text-gray-700">{selectedProject.description}</p>
                <p className="mt-2 text-sm text-gray-500 italic">
                  Technologies: {selectedProject.technologies}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Select a project to preview.</p>
          )}
        </div>
      </div>
    </section>
  );
}
