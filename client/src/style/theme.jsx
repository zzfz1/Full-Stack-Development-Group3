import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

const theme = extendTheme({
  ...chakraTheme,
  //unable the default box shadow in the button comp
  //check out:https://github.com/chakra-ui/chakra-ui/issues/708#issuecomment-774478731
  components: {
    Button: { baseStyle: { _focus: { boxShadow: "none" } } },
    Link: {
      baseStyle: {
        _hover: { textDecoration: "none", color: "inherit" },
        _active: {
          textDecoration: "none",
          border: "none",
          color: "inherit",
          boxShadow: "none",
        },
        _focus: { textDecoration: "none", color: "inherit", boxShadow: "none" },
      },
    },
  },

  styles: {
    // global styles
    global: {
      // Style for body of page
      body: {
        bg: "#FFF",
        color: "#1A202C",
      },
    },
  },
  // Website color scheme
  colors: {
    ...chakraTheme.colors,
    //the numbers identify the color scheme from lighter to darker. the main primary is 500
    primary: { 500: "#3182CE", 600: "#2B6CB0", 700: "#2C5282" }, //blue color fro button and call to action elements
    red: "##FF0404", // cancel button
    green: "#009700", // order  and buy button
    white: "#FDFDFD", // text color for title or text
    black: "#0B0B0B",
    gray: "#1A202C", // text color for text
  },
  // Global font family
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
});

export default theme;
