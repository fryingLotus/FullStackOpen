import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";
import { CoursePart } from "./types";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const App = () => {
  const courseName: string = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];
  courseParts.forEach(part => {
    switch (part.kind) {
      case "basic":
        console.log(part.name,part.description,part.exerciseCount);
        break;
      case "group":
        console.log(part.name,part.groupProjectCount,part.exerciseCount);
        break;
      case "background":
        console.log(part.backgroundMaterial,part.description,part.name,part.exerciseCount);
        break;
      default:
        return assertNever(part);
        
    }
  });
  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
