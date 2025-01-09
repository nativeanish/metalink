import ReactDOMServer from "react-dom/server";
import ClassicLight from "../theme/ClassicLight";
import useProfile from "../store/useProfile";
import themes from "../constants/themes";
import BentoDark from "../theme/BentoDark";
import ClassicDark from "../theme/ClassicDark";
import ClassicBrut from "../theme/ClassicBrut";
import BentoLight from "../theme/BentoLight";
import useArns from "../store/useArns";
export function generatePage(_theme: string) {
  const name = useProfile.getState().name;
  const description = useProfile.getState().description;
  const image = useProfile.getState().image;
  const links = useProfile.getState().links;
  const theme = themes.find((t) => t.title === _theme);
  if (!theme) {
    return null;
  }
  const data = ReactDOMServer.renderToString(
    theme.title === "classicLight" ? (
      <ClassicLight
        name={name}
        description={description}
        image={image}
        links={links}
      />
    ) : theme.title === "classicDark" ? (
      <ClassicDark
        name={name}
        description={description}
        image={image}
        links={links}
      />
    ) : theme.title === "classicBrut" ? (
      <ClassicBrut
        name={name}
        description={description}
        image={image}
        links={links}
      />
    ) : theme.title === "BentoLight" ? (
      <BentoLight
        name={name}
        description={description}
        image={image}
        links={links}
      />
    ) : theme.title === "BentoDark" ? (
      <BentoDark
        name={name}
        description={description}
        image={image}
        links={links}
      />
    ) : null
  );
  return data;
}
export function generateMetaTags({ uuid }: { uuid: string }) {
  const arns_name = useArns.getState().arns;
  const title = useProfile.getState().name;
  const description = useProfile.getState().description;
  const imageUrl = useProfile.getState().image;
  const robots = "index, follow";
  const twitterCard = "summary_large_image";
  const metaTags: string[] = [];
  const url = `https://${arns_name}.arweave.net`;
  const link = useProfile.getState().links;
  const keywords = link.map((l) => l.iconName);
  keywords.push(arns_name);
  keywords.push(`${arns_name}.arweave.net`);
  keywords.push(title);
  metaTags.push(`<title>${title}</title>`);
  // Viewport meta tag for mobile optimization
  metaTags.push(
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
  );

  // Basic meta tags
  metaTags.push(`<meta name="description" content="${description}" />`);
  if (keywords) {
    metaTags.push(`<meta name="keywords" content="${keywords.join(", ")}" />`);
  }
  metaTags.push(`<meta name="robots" content="${robots}" />`);
  metaTags.push(`<meta charset="UTF-8" />`);

  // Open Graph meta tags
  metaTags.push(`<meta property="og:title" content="${title}" />`);
  metaTags.push(`<meta property="og:description" content="${description}" />`);
  if (imageUrl) {
    metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
  }
  metaTags.push(`<meta property="og:url" content="${url}" />`);

  // Twitter Card meta tags
  metaTags.push(`<meta name="twitter:card" content="${twitterCard}" />`);
  metaTags.push(`<meta name="twitter:title" content="${title}" />`);
  metaTags.push(`<meta name="twitter:description" content="${description}" />`);
  if (imageUrl) {
    metaTags.push(`<meta name="twitter:image" content="${imageUrl}" />`);
  }

  // Additional custom meta tags (uuid and arns_name)
  if (uuid) {
    metaTags.push(`<meta name="uuid" content="${uuid}" />`);
  }
  if (arns_name) {
    metaTags.push(`<meta name="arns_name" content="${arns_name}" />`);
  }

  // Canonical URL to avoid duplicate content
  metaTags.push(`<link rel="canonical" href="${url}" />`);
  metaTags.push(`<link rel="icon" href="${imageUrl}" />`);
  metaTags.push(`<script src="https://cdn.tailwindcss.com"></script>`);
  metaTags.push(
    `<script src="https://cdn.jsdelivr.net/gh/nativeanish/browser/dist/index.js"></script>`
  );

  return metaTags.join("\n");
}
