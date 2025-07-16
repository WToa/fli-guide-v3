export interface BiS {
   id: number;
   label: string;
   group: string;
}

export const bis: BiS[] = [
   { id: 1, label: "Accessories", group: "General" },
   { id: 8, label: "Shields", group: "General" },
   { id: 9, label: "Specs", group: "General" },
   { id: 7, label: "Crafting Tools", group: "Tools" },
   { id: 6, label: "Gathering Tools", group: "Tools" },
   { id: 2, label: "Attack+", group: "Armor" },
   { id: 3, label: "Drop Rate+", group: "Armor" },
   { id: 4, label: "Gathering", group: "Armor" },
   { id: 5, label: "Crafting", group: "Armor" },
   { id: 10, label: "True Time", group: "Weapons" },
   { id: 11, label: "Light", group: "Weapons" },
];

export default bis;