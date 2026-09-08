const graphics = {
  six: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/6_graphic.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/6_graphic_dark.webp"
  },
  three: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/3_graphic.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/3_graphic_dark.webp"
  },
  timeline: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/timeline.png",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/timeline_dark.png"
  },
  key_users: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/key_users.png",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/key_users_dark.png"
  },
  notes: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/notes_graphic.png",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/notes_graphic_dark.png"
  },
  comp_analysis: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/comp_analysis.png",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/comp_analysis_dark.png"
  },
  requirements: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/requirements.png",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/requirements_dark.png"
  },
  sitemap: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/sitemap.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/sitemap_dark.webp"
  },
  user_persona_analysis: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/user_persona_analysis.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/user_persona_analysis_dark.webp"
  },
  gaps: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/gaps.png",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/gaps_dark.png"
  },
  survey_insights: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/survey_insights.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/survey_insights_dark.webp"
  },
  hifis: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/hifis.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/hifis_dark.webp"
  },
  reflections: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/reflections.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/reflections_dark.webp"
  },
  group_reflections: {
    light: "https://cdn.lucasmcallister.com/gator-gaming/group_reflections.webp",
    dark: "https://cdn.lucasmcallister.com/gator-gaming/group_reflections_dark.webp"
  },
  atrium_objectives: {
    light: "https://cdn.lucasmcallister.com/atrium/atrium_objectives.webp",
    dark: "https://cdn.lucasmcallister.com/atrium/atrium_objectives_dark.webp"
  },
  atrium_colors: {
    light: "/atrium_colors.avif",
    dark: "/atrium_colors_dark.avif"
  },
  atrium_brand: {
    light: "https://cdn.lucasmcallister.com/atrium/atrium_brand.webp",
    dark: "https://cdn.lucasmcallister.com/atrium/atrium_brand_dark.webp"
  },
  atrium_reflections: {
    light: "https://cdn.lucasmcallister.com/atrium/atrium_reflections.webp",
    dark: "https://cdn.lucasmcallister.com/atrium/atrium_reflections_dark.webp"
  },
  user_flows: {
    light: "https://cdn.lucasmcallister.com/carulla/user_flows.avif",
    dark: "https://cdn.lucasmcallister.com/carulla/user_flows_dark.avif"
  },
  situations: {
    light: "https://cdn.lucasmcallister.com/trajectory/situations_light.avif",
    dark: "https://cdn.lucasmcallister.com/trajectory/situations_dark.avif"
  },
  differentiation: {
    light: "https://cdn.lucasmcallister.com/trajectory/differentiation_light.avif",
    dark: "https://cdn.lucasmcallister.com/trajectory/differentiation_dark.avif"
  }
};

export const getGraphic = (isDark) => {
  return (key) => {
    return isDark ? graphics[key].dark : graphics[key].light;
  };
};
