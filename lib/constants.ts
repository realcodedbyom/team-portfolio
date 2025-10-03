export const THEME_COLORS = {
  primary: "#FF2E63",
  secondary: "#00D2FF",
  accent: "#FF9A3C",
  background: {
    primary: "#0A0A0A",
    secondary: "#0F0F0F",
    card: "#151515",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#D1D5DB",
    muted: "#9CA3AF",
  },
} as const

export const TEAM_ROLES = ["All", "Designer", "Developer", "Marketing", "Project Manager"] as const

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/members", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

export const SOCIAL_LINKS = {
  github: "https://github.com/teamxox",
  twitter: "https://twitter.com/teamxox",
  linkedin: "https://linkedin.com/company/teamxox",
} as const
