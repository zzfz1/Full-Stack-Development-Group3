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
        color: "#FDFDFD",
      },
    },
  },
  // Website color scheme
  colors: {
    ...chakraTheme.colors,
    //the numbers identify the color scheme from lighter to darker. the main primary is 500
    primary: { 500: "#3BA87E", 600: "#33918a", 700: "#2d7a5c" },
    brown: "#6D2100",
    yellow: "#C5A502",
    white: "#FDFDFD",
    black: "#0B0B0B",
  },
  // Global font family
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
});

export default theme;
