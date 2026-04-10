import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

// resolves camelcase icon name string to fontawersome icon object
function resolveIcon(iconName) {
  if (typeof iconName !== "string") return "faGear";

  // Convert camelCase "faLaptopCode" → kebab-case "laptop-code"
  const kebab = iconName
    .replace(/^fa/, "")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  return findIconDefinition({ prefix: "fas", iconName: kebab });
}

export default resolveIcon;
