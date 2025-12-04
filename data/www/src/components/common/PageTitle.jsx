import React from 'react';
import '../../styles/PageTitle.css';
export default function PageTitle({ title, description }) {
  return (
    <section className="PageTitle">
        <h1>{title}</h1>
        <p>{description}</p>
    </section>
  );
}