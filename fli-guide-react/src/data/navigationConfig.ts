export const navbarURLs = [
   {
      type: "item",
      title: "Home",
      url: "/",
   },
   {
      type: "item",
      title: "Interactive Map - WIP",
      url: "#",
   },
   {
      type: "dropdown",
      title: "Guides - WIP",
      url: "/life-guides",
      dropdownLinks: [
         { name: "Lifes", url: "#" },
         { name: "Strangelings", url: "#" },
      ],
   },
   {
      type: "dropdown",
      title: "Trackers - WIP",
      url: "#",
      dropdownLinks: [
         { name: "Quests", url: "#" },
         { name: "Recipes", url: "#"}
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
         {
            name: "Fantasy Life i Home Page",
            url: "https://www.fantasylife.jp/fli/en/",
         },
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
         {
            name: "Pimez's Compendium & Guide Portal",
            url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3484233912",
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
         { name: "GitHub", url: "https://github.com/TiaMarieG/fli-guide-v3" },
         { name: "Special Thanks", url: "#" },
         { name: "Support FLi Guide", url: "https://ko-fi.com/mittoa_gaming" },
      ],
   },
];
