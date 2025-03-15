import { extendTheme } from '@chakra-ui/react';

// UNC Colors
const uncColors = {
  carolinaBlue: '#4B9CD3',
  navyBlue: '#13294B',
  white: '#FFFFFF',
  gold: '#F4C92F',
  lightBlue: '#7BAFD4',
  accent: '#00B2A9',
};

// Duke Colors
const dukeColors = {
  dukeBlue: '#012169',
  dukeNavy: '#001A57',
  white: '#FFFFFF',
  gold: '#C1A875',
  lightBlue: '#418FDE',
  accent: '#A1B70D',
};

// Celebration Colors
const celebrationColors = {
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  black: '#000000',
  cream: '#FFFDF5',
  blendedBlue: '#264B8C', // Custom blend of UNC and Duke blues
};

// Custom gradients
const gradients = {
  uncToDuke: 'linear(to-r, unc.carolinaBlue, duke.dukeBlue)',
  goldToSilver: 'linear(to-r, celebration.gold, celebration.silver)',
  blendedAccent: 'linear(to-r, unc.accent, duke.accent)',
};

const theme = extendTheme({
  colors: {
    unc: uncColors,
    duke: dukeColors,
    celebration: celebrationColors,
  },
  styles: {
    global: {
      body: {
        bg: 'celebration.cream',
        color: 'gray.800',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: '"Playfair Display", serif',
        letterSpacing: 'wide',
      },
      variants: {
        'section-title': {
          fontSize: ['2xl', '3xl'],
          fontWeight: 'bold',
          letterSpacing: 'wide',
          color: 'celebration.blendedBlue',
          mb: 6,
        },
        'celebration': {
          fontSize: ['3xl', '4xl'],
          fontWeight: 'bold',
          bgGradient: gradients.goldToSilver,
          bgClip: 'text',
          letterSpacing: 'wider',
        }
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'xl',
          p: 6,
          transition: 'all 0.3s ease',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '2xl',
          },
          position: 'relative',
          overflow: 'hidden',
          _before: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            bgGradient: gradients.uncToDuke,
          },
        },
      },
    },
    Button: {
      variants: {
        unc: {
          bg: 'unc.carolinaBlue',
          color: 'white',
          _hover: {
            bg: 'unc.navyBlue',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
        duke: {
          bg: 'duke.dukeBlue',
          color: 'white',
          _hover: {
            bg: 'duke.dukeNavy',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
        celebration: {
          bg: 'celebration.blendedBlue',
          color: 'white',
          fontWeight: 'bold',
          _hover: {
            bg: 'celebration.gold',
            color: 'black',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
      },
    },
    Badge: {
      variants: {
        unc: {
          bg: 'unc.carolinaBlue',
          color: 'white',
        },
        duke: {
          bg: 'duke.dukeBlue',
          color: 'white',
        },
        celebration: {
          bg: 'celebration.gold',
          color: 'black',
          px: 3,
          py: 1,
          borderRadius: 'full',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          boxShadow: 'md',
        },
      },
    },
  },
});

export default theme; 