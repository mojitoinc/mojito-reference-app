import Content from "../../content.json";
export interface CMSData {
  format: "image" | "video";
  lotNumber: string;
  image?: string;
  preview?: string;
  video?: string;
  about: string;
  author: {
    name: string;
    title: string;
    slug: string;
    about: string;
    avatar: {
      url: string;
    };
  };
}

export const cmsItems: { [key: string]: CMSData } = {};

for (const item of Content.items) {
  cmsItems[item.mojitoId] = item as CMSData;
}
