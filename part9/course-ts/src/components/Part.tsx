// part.tsx

import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart; 
}

export function Part({ part }: PartProps) {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>Description: {part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
         <p><b>{part.name} {part.exerciseCount}</b></p>

          <p>Group Project Count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
     
          <p>Background Material: {part.backgroundMaterial}</p>
          <p>Description: {part.description}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled kind: ${value}`);
}
