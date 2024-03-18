// content.tsx
import React from 'react';
import { CoursePart } from "../types";
import { Part } from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

export const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index}>
          <Part part={part} /> {/* Pass individual part to Part component */}
        </div>
      ))}
    </div>
  );
};
