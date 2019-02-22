import { lead, fsize } from "@storycopter/styleguide/src/config";
import fluidify from "./of/fluidify";

export const setType = size => {
  switch (size) {
    case "h":
      return `${fluidify("font-size", fsize.h[0], fsize.h[1])}line-height: ${
        lead.m
      }`;
    case "l":
      return `${fluidify("font-size", fsize.l[0], fsize.l[1])}line-height: ${
        lead.m
      }`;
    case "s":
      return `${fluidify("font-size", fsize.s[0], fsize.s[1])}line-height: ${
        lead.l
      }`;
    case "x":
      return `${fluidify("font-size", fsize.x[0], fsize.x[1])}line-height: ${
        lead.l
      }`;
    case "m":
    default:
      return `${fluidify("font-size", fsize.m[0], fsize.m[1])}line-height: ${
        lead.l
      }`;
  }
};
