"use client";
import classes from "./contact.module.scss";

import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
} from "react-icons/fa";

const contacts = [
  {
    icon: <FaEnvelope />,
    label: "kozodern@gmail.com",
    href: "mailto:kozodern@gmail.com",
  },
  {
    icon: <FaPhone />,
    label: "+381(0)64/23-84-204",
    href: "tel:+381642384204",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nenad-kozoder/",
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    href: "https://github.com/Nenad1Kozoder",
  },
  { icon: <FaMapMarkerAlt />, label: "Kragujevac, Serbia", href: null },
];

const Contact = () => {
  return (
    <section className={classes.contact} id="contact">
      <h2 className={classes.title}>My Contacts</h2>
      <div className={classes.container}>
        <ul className={classes.list}>
          {contacts.map(({ icon, label, href }) => (
            <li key={label} className={classes.item}>
              <span className={classes.icon}>{icon}</span>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {label}
                </a>
              ) : (
                <span>{label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
