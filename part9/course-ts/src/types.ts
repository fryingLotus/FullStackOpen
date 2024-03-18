
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

 interface CoursePartBasic extends CoursePartExtended {

    kind: "basic"
  }
  
 interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
   interface CoursePartBackground extends CoursePartExtended {

    backgroundMaterial: string;
    kind: "background"
  }
  interface CoursePartExtended extends CoursePartBase {
    description: string;
  }
  

 export  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;