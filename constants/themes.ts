const themes: Array<{
  desktop: string;
  mobile: string;
  title: string;
  view: "mobile" | "desktop";
}> = [
  {
    desktop: "classicLight.png",
    mobile: "classicLightM.png",
    title: "classicLight",
    view: "mobile",
  },
  {
    desktop: "classicDark.png",
    mobile: "classicDarkM.png",
    title: "classicDark",
    view: "mobile",
  },
  {
    desktop: "classicBrut.png",
    mobile: "classicBrutM.png",
    title: "classicBrut",
    view: "mobile",
  },
  {
    desktop: "bentoLight.png",
    mobile: "bentoLightM.png",
    title: "BentoLight",
    view: "desktop",
  },
  {
    desktop: "bentoDark.png",
    mobile: "bentoDarkM.png",
    title: "BentoDark",
    view: "desktop",
  },
];
export default themes;
