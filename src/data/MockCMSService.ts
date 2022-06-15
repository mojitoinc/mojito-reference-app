import Content from "../../content.json";
import faker from "@faker-js/faker";
import { parse } from "uuid";

export const cmsItems: { [key: string]: CMSData } = {};

for (const item of Content.items) {
  cmsItems[item.mojitoId] = item as CMSData;
}

export interface CMSData {
  format: "image" | "video";
  lotNumber: number;
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

export class MockCMSService {
  constructor() {}

  public getData(itemId: string): CMSData | undefined {
    if (cmsItems[itemId]) {
      return cmsItems[itemId];
    }
    return this.mockData(itemId);
  }

  private mockData(itemId: string): CMSData {
    const itemIdHex = itemId.replace(/-/g, '');
    const itemIdNum = parseInt(itemIdHex, 16);
    faker.seed(itemIdNum);
    console.log({ itemId, itemIdHex, itemIdNum });

    const cmsData: CMSData = {
      lotNumber: 1,
      format: "image",
      about: faker.lorem.paragraph(),
      image: faker.image.imageUrl(400, 400, "animals", true, true),
      author: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: "Rick Ross",
        slug: "rick-ross",
        about: faker.lorem.paragraph(2),
        avatar: {
          url: faker.image.avatar(),
        },
      },
    };
    return cmsData;
  }
}
