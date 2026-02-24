const graphics = {
  six: {
    light: "/6_graphic.webp",
    dark: "/6_graphic_dark.webp"
  },
  timeline: {
    light: "/timeline.png",
    dark: "/timeline_dark.png"
  },
  key_users: {
    light: "/key_users.png",
    dark: "/key_users_dark.png"
  },
  notes: {
    light: "/notes_graphic.png",
    dark: "/notes_graphic_dark.png"
  },
  comp_analysis: {
    light: "/comp_analysis.png",
    dark: "/comp_analysis_dark.png"
  },
  requirements: {
    light: "/requirements.png",
    dark: "/requirements_dark.png"
  },
  sitemap: {
    light: "/sitemap.webp",
    dark: "/sitemap_dark.webp"
  },
  user_persona_analysis: {
    light: "/user_persona_analysis.webp",
    dark: "/user_persona_analysis_dark.webp"
  },
  gaps: {
    light: "/gaps.png",
    dark: "/gaps_dark.png"
  },
  survey_insights: {
    light: "/survey_insights.webp",
    dark: "/survey_insights_dark.webp"
  },
  hifis: {
    light: "/hifis.webp",
    dark: "/hifis_dark.webp"
  },
  reflections: {
    light: "/reflections.webp",
    dark: "/reflections_dark.webp"
  },
  group_reflections: {
    light: "/group_reflections.webp",
    dark: "/group_reflections_dark.webp"
  }
};

export const getGraphic = (isDark) => {
  return (key) => {
    return isDark ? graphics[key].dark : graphics[key].light;
  };
};
