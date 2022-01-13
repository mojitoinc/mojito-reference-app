This is the Mojito Reference App for marketplaces.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

Configuration values can be found in `src/constants/general.constants.ts`, where values are taken from `.env` file. A sample env file is included as `.env.sample`. A JWT issuer domain is needed, and also organization ID and marketplace ID, which are retrieved from the Manager UI.

## Add Content

Content must be added in `content.json` following the sample lot object in `lots` array.
* `lotId` is the number shown for every lot. It should start at `1` and be in increasing order.
* `mojitoId` is obtained from the Manager UI for every lot. It corresponds to the id of the item in the Mojito API.
* `format` can take one of the values `image` or `video`, depending on the type of multimedia the lot has. If it is `image`, then the lot object must have an `image` property; if it is `video`, then it must have a `video` property.
* `preview` contains an image for both cases. 

## Customize App

App theme can be edited in `src/theme/theme.ts`. In there, several aspects can be edited, such as grid background, border radiuses, borders, colors, fonts, text decoration for links, breakpoints... Also dimensions for grid view can also be edited by updating the `UNIT` and `MAX_CONTENT_WIDTH` constants used in the theme. In order to change the font families, the new font files must be added to `public/fonts` folder and `@font-face` specification must be included in `src/theme/GlobalStyles.ts`, the same way as for existing ones.

Copy (including site title) is set in `src/constants/strings.ts` file and can be modified there, and also the images (favicon, logo, default avatar, close icon, profile icon...), in `src/constants/images.ts`. 

Add link to terms and conditions in `TERMS_AND_CONDITIONS_LINK` constant, in `src/constants/general.constants.ts` file.
