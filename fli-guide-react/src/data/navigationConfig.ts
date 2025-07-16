// These are to be rendered, in order, for the navigation bar.
// This is just an arbitrary object type that I made for this, and can easily be changed if it's deemed unnecessary. -K
export const navbarURLs = [
   {
      type: "item",
      title: "Home",
      url: "/",
   },
   {
      type: "item",
      title: "World of FLi - WIP",
      url: "/world-of-fli",
   },
   {
      type: "item",
      title: "Quests - WIP",
      url: "#",
   },
   {
      type: "dropdown",
      title: "Life Guides - WIP",
      url: "/life-guides",
      dropdownLinks: [
         { name: "Alchemist", url: "/life-guides/alchemist" },
         { name: "Angler", url: "/life-guides/angler" },
         { name: "Artist", url: "/life-guides/artist" },
         { name: "Blacksmith", url: "/life-guides/blacksmith" },
         { name: "Carpenter", url: "/life-guides/carpenter" },
         { name: "Cook", url: "/life-guides/cook" },
         { name: "Farmer", url: "/life-guides/farmer" },
         { name: "Hunter", url: "/life-guides/hunter" },
         { name: "Magician", url: "/life-guides/magician" },
         { name: "Mercenary", url: "/life-guides/mercenary" },
         { name: "Miner", url: "/life-guides/miner" },
         { name: "Paladin", url: "/life-guides/paladin" },
         { name: "Tailor", url: "/life-guides/tailor" },
         { name: "Woodcutter", url: "/life-guides/woodcutter" },
      ],
   },
   {
      type: "dropdown",
      title: "Collections",
      url: "#",
      dropdownLinks: [
         { name: "Encyclopedia", url: "#" },
         { name: "Strangeling Tracker", url: "#" },
      ],
   },
   {
      type: "dropdown",
      title: "FLi Tools",
      url: "#",
      dropdownLinks: [
         { name: "House Designer", url: "#" },
         { name: "Island Planner", url: "#" },
         { name: "Recipe Calculator", url: "/recipe-calculator" },
      ],
   },
];

export const sidebarLinks = [
   {
      heading: "Official",
      links: [
         { name: "Fantasy Life i Home Page", url: "https://www.fantasylife.jp/fli/en/" },
         {
            name: "L5 Workshop Devlog",
            url: "https://www.level5.co.jp/blog/en/",
         },
         { name: "X - English", url: "https://x.com/FANTASYLIFE_EN" },
         { name: "YouTube Channel", url: "https://www.youtube.com/@LEVEL5ch" },
      ],
   },
   {
      heading: "Community",
      links: [
         {
            name: "Discord",
            url: "https://discord.gg/fantasylife-133342059787452416",
         },
         { name: "Reddit", url: "https://www.reddit.com/r/fantasylife/" },
         {
            name: "Wiki",
            url: "https://fantasylife.wiki.gg/wiki/Fantasy_Life_Wiki",
         },
      ],
   },
   {
      heading: "Dev Corner",
      links: [
         { name: "Discord", url: "https://discord.gg/Xfqb5DXWPS" },
         { name: "Special Thanks", url: "#" },
         { name: "Support FLi Guide", url: "https://ko-fi.com/mittoa_gaming" },
      ],
   },
];
