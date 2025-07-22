export type ProjectStatus = "In Development" | "Planned" | "Completed";

export interface ProjectItem {
   title: string;
   updateSize: "Major Update" | "Minor Update";
   description: string;
   status: ProjectStatus;
}

export const plannedProjects: ProjectItem[] = [
   {
      title: "Interactive Map",
      updateSize: "Major Update",
      description:
         "An interactable map of each zone and sub-zone with additional features like resource, monster, leafe, and strangeling locations, quest objectives, zone rank support, chests, travelling merchant paths, vendor locations, and more.",
      status: "Planned",
   },
   {
      title: "Quest Tracker",
      updateSize: "Major Update",
      description:
         "Comprehensive tracker for both Main and Side Quests, including rewards and requirements.",
      status: "In Development",
   },
   {
      title: "Life Guides",
      updateSize: "Major Update",
      description:
         "Detailed guides for each Life, covering gear, abilities, and rank requirements.",
      status: "Planned",
   },
   {
      title: "Calculator Presets",
      updateSize: "Minor Update",
      description: "Adding presets that generate a list of all items needed to fulfill crafting rank requirements. This project has been expanded to include presets for BiS gear, upgrading Marco's Shop, and being able to search for recipes by material.",
      status: "Completed",
   },
   {
      title: "Island Planner",
      updateSize: "Major Update",
      description: "An interactive tool to plan and design your island before committing to in-game changes.",
      status: "In Development",
   },
   {
      title: "House Designer",
      updateSize: "Major Update",
      description: "Similar to the Island Planner, this will help you design your home before making changes in-game.",
      status: "Planned",
   },
      {
      title: "Recipe Tracker",
      updateSize: "Major Update",
      description: " A tool to track all recipes in the game.",
      status: "In Development",
   },
      {
      title: "Strangeling Guide",
      updateSize: "Major Update",
      description: "A guide to helping you become best friends with Strangelings, including tips on gifts, quests, interactions, and where to find ones outside of the Main Questline.",
      status: "Planned",
   }
];
