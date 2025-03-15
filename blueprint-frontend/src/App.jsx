import { Box, VStack, Heading, Text, Badge, Container, Image, Flex, Grid } from '@chakra-ui/react'
import Dashboard from './components/Dashboard'
import AlumniGrid from './components/AlumniGrid'
import "./App.css"

// Sample alumni data for development and testing
// This will be replaced with actual API data later
const sampleAlumni = [
  {
    id: 1,
    name: "Sarah Ahmed",
    university: "UNC",
    graduationYear: 2022,
    major: "Computer Science",
    currentField: "Technology",
    achievements: ["Founded Tech Startup", "Forbes 30 Under 30"],
    votes: 150,
    philanthropyScore: 8.5,
    leadershipScore: 9.0,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Mohammed Al-Mansoori",
    university: "Duke",
    graduationYear: 2021,
    major: "Business Administration",
    currentField: "Finance",
    achievements: ["Investment Banking VP", "Community Leadership Award"],
    votes: 120,
    philanthropyScore: 9.0,
    leadershipScore: 8.5,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Fatima Al-Hashimi",
    university: "UNC",
    graduationYear: 2023,
    major: "Biomedical Engineering",
    currentField: "Healthcare",
    achievements: ["Medical Device Patent", "Research Excellence Award"],
    votes: 180,
    philanthropyScore: 7.5,
    leadershipScore: 8.0,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Ahmed Al-Qasimi",
    university: "Duke",
    graduationYear: 2020,
    major: "Computer Science",
    currentField: "Technology",
    achievements: ["AI Research Lead", "Tech Innovation Award"],
    votes: 200,
    philanthropyScore: 8.0,
    leadershipScore: 9.5,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    name: "Noura Al-Suwaidi",
    university: "UNC",
    graduationYear: 2022,
    major: "Finance",
    currentField: "Finance",
    achievements: ["FinTech Innovator", "Young Leader Award"],
    votes: 160,
    philanthropyScore: 9.5,
    leadershipScore: 8.8,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 6,
    name: "Khalid Al-Falasi",
    university: "Duke",
    graduationYear: 2021,
    major: "Mechanical Engineering",
    currentField: "Energy",
    achievements: ["Renewable Energy Patent", "Sustainability Award"],
    votes: 140,
    philanthropyScore: 8.8,
    leadershipScore: 7.5,
    image: "https://via.placeholder.com/150"
  }
];

function App() {
  return (
    // Main container with minimum height and background color
    <Box minH="100vh" bg="celebration.cream">
      {/* Hero Section featuring Michael Jordan */}
      <Box 
        position="relative"
        height="70vh"
        overflow="hidden"
        bg="gray.900" // Fallback background color
      >
        {/* Hero Background Image */}
        <Image
          src="https://cdn.nba.com/manage/2021/08/michael-jordan-looks.jpg"
          alt="Michael Jordan at UNC"
          objectFit="cover"
          objectPosition="center"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          opacity="0.9"
        />
        {/* Gradient Overlay - Blends UNC and Duke colors */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-r, rgba(19, 41, 75, 0.8), rgba(1, 33, 105, 0.8))"
        />
        {/* Hero Content Container */}
        <Container 
          maxW="container.xl" 
          position="relative" 
          height="100%"
        >
          {/* Hero Text Stack */}
          <VStack
            position="absolute"
            bottom="10%"
            left={0}
            right={0}
            spacing={6}
            align="center"
          >
            {/* First Edition Badge */}
            <Badge 
              variant="celebration"
              fontSize="xl"
              px={6}
              py={2}
            >
              First Edition
            </Badge>
            {/* Main Title */}
            <Heading
              fontSize={["4xl", "5xl", "7xl"]}
              color="white"
              textAlign="center"
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
            >
              The Blueprint
            </Heading>
            {/* Subtitle */}
            <Text
              fontSize={["lg", "xl", "2xl"]}
              color="white"
              textAlign="center"
              maxW="3xl"
              textShadow="1px 1px 2px rgba(0,0,0,0.4)"
            >
              Celebrating Excellence: Top 50 African American Alumni from UNC and Duke
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8} align="stretch">
          {/* About Section */}
          <Box 
            bg="white" 
            p={8} 
            borderRadius="xl" 
            boxShadow="xl"
            border="1px"
            borderColor="celebration.gold"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              bgGradient: "linear(to-r, unc.carolinaBlue, duke.dukeBlue)"
            }}
          >
            {/* Two-Column Grid for About Content */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
              {/* Left Column */}
              <Box>
                <Heading 
                  as="h2" 
                  size="lg"
                  bgGradient="linear(to-r, unc.carolinaBlue, duke.dukeBlue)"
                  bgClip="text"
                  mb={4}
                >
                  About The Blueprint
                </Heading>
                <Text fontSize="lg" color="gray.700" lineHeight="tall">
                  Welcome to the inaugural edition of The Blueprint, a celebration of excellence 
                  and achievement within our African American alumni community. This platform 
                  showcases the remarkable accomplishments of 50 distinguished graduates from 
                  UNC and Duke who have made significant impacts in their fields and communities.
                </Text>
              </Box>
              {/* Right Column */}
              <Box>
                <Text fontSize="lg" color="gray.700" lineHeight="tall" mb={4}>
                  Each featured alumnus represents the pinnacle of achievement, leadership, and 
                  community service. Their stories inspire future generations and demonstrate the 
                  profound impact of our universities in shaping leaders who transform society.
                </Text>
                <Text fontSize="lg" color="gray.700" lineHeight="tall">
                  From pioneers like Michael Jordan to contemporary trailblazers, these alumni 
                  embody the spirit of excellence that defines both institutions.
                </Text>
              </Box>
            </Grid>
          </Box>

          {/* Dashboard Component - Displays statistics and analytics */}
          <Dashboard />
          {/* AlumniGrid Component - Displays alumni cards in a grid layout */}
          <AlumniGrid />
        </VStack>
      </Container>
    </Box>
  )
}

export default App
