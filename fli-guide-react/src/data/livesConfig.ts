import alchemistIcon from "../assets/images/life-icons/alchemist_icon.png";
import anglerIcon from "../assets/images/life-icons/angler_icon.png";
import artistIcon from "../assets/images/life-icons/artist_icon.png";
import blacksmithIcon from "../assets/images/life-icons/blacksmith_icon.png";
import carpenterIcon from "../assets/images/life-icons/carpenter_icon.png";
import cookIcon from "../assets/images/life-icons/cook_icon.png";
import farmerIcon from "../assets/images/life-icons/farmer_icon.png";
import hunterIcon from "../assets/images/life-icons/hunter_icon.png";
import magicianIcon from "../assets/images/life-icons/magician_icon.png";
import mercenaryIcon from "../assets/images/life-icons/mercenary_icon.png";
import minerIcon from "../assets/images/life-icons/miner_icon.png";
import paladinIcon from "../assets/images/life-icons/paladin_icon.png";
import tailorIcon from "../assets/images/life-icons/tailor_icon.png";
import woodcutterIcon from "../assets/images/life-icons/woodcutter_icon.png";

export interface Life {
   id: string;
   label: string;
   type: string;
   icon: string;
   quests: boolean;
}

export const lives: Life[] = [
   {
      id: "alchemist",
      label: "Alchemist",
      type: "crafting",
      icon: alchemistIcon,
      quests: true
   },
   {
      id: "angler",
      label: "Angler",
      type: "gathering",
      icon: anglerIcon,
      quests: false
   },
   {
      id: "artist",
      label: "Artist",
      type: "crafting",
      icon: artistIcon,
      quests: true
   },
   {
      id: "blacksmith",
      label: "Blacksmith",
      type: "crafting",
      icon: blacksmithIcon,
      quests: true
   },
   {
      id: "carpenter",
      label: "Carpenter",
      type: "crafting",
      icon: carpenterIcon,
      quests: true
   },
   {
      id: "cook",
      label: "Cook",
      type: "crafting",
      icon: cookIcon,
      quests: true
   },
   {
      id: "farmer",
      label: "Farmer",
      type: "gathering",
      icon: farmerIcon,
      quests: false
   },
   {
      id: "hunter",
      label: "Hunter",
      type: "combat",
      icon: hunterIcon,
      quests: false
   },
   {
      id: "magician",
      label: "Magician",
      type: "combat",
      icon: magicianIcon,
      quests: false
   },
   {
      id: "mercenary",
      label: "Mercenary",
      type: "combat",
      icon: mercenaryIcon,
      quests: false
   },
   {
      id: "miner",
      label: "Miner",
      type: "gathering",
      icon: minerIcon,
      quests: false
   },
   {
      id: "paladin",
      label: "Paladin",
      type: "combat",
      icon: paladinIcon,
      quests: false
   },
   {
      id: "tailor",
      label: "Tailor",
      type: "crafting",
      icon: tailorIcon,
      quests: true
   },
   {
      id: "woodcutter",
      label: "Woodcutter",
      type: "gathering",
      icon: woodcutterIcon,
      quests: false
   },
];

export default lives;
