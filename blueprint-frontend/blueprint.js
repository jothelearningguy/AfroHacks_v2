// =========================================
// App.jsx - Main Application Component
// =========================================
import { Box, VStack, Heading, Text, Badge, Container, Image, Flex, Grid } from '@chakra-ui/react'
import Dashboard from './components/Dashboard'
import AlumniGrid from './components/AlumniGrid'
import "./App.css"

// Sample alumni data structure
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
  // ... more alumni data
];

// Main App Component
function App() {
  return (
    <Box minH="100vh" bg="celebration.cream">
      {/* Hero Section */}
      <Box position="relative" height="70vh" overflow="hidden" bg="gray.900">
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
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-r, rgba(19, 41, 75, 0.8), rgba(1, 33, 105, 0.8))"
        />
        {/* Hero Content */}
        <Container maxW="container.xl" position="relative" height="100%">
          <VStack position="absolute" bottom="10%" left={0} right={0} spacing={6} align="center">
            <Badge variant="celebration" fontSize="xl" px={6} py={2}>First Edition</Badge>
            <Heading fontSize={["4xl", "5xl", "7xl"]} color="white" textAlign="center">
              The Blueprint
            </Heading>
            <Text fontSize={["lg", "xl", "2xl"]} color="white" textAlign="center" maxW="3xl">
              Celebrating Excellence: Top 50 African American Alumni from UNC and Duke
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
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
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
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
                  and achievement within our African American alumni community.
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" color="gray.700" lineHeight="tall">
                  Each featured alumnus represents the pinnacle of achievement, leadership, and 
                  community service. Their stories inspire future generations.
                </Text>
              </Box>
            </Grid>
          </Box>
          <Dashboard />
          <AlumniGrid />
        </VStack>
      </Container>
    </Box>
  )
}

// =========================================
// theme.js - Custom Theme Configuration
// =========================================
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    unc: {
      carolinaBlue: '#4B9CD3',
      navy: '#13294B',
    },
    duke: {
      dukeBlue: '#012169',
      navy: '#001A57',
    },
    celebration: {
      gold: '#FFD700',
      cream: '#FFF8E7',
      accent: '#FF6B6B',
    },
  },
  components: {
    Badge: {
      variants: {
        celebration: {
          bg: 'celebration.gold',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: 'full',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: 'xl',
          },
        },
      },
    },
  },
})

// =========================================
// AlumniCard.jsx - Alumni Card Component
// =========================================
import { Box, Image, Text, VStack, Badge, HStack } from '@chakra-ui/react'

function AlumniCard({ alumni }) {
  const { name, university, major, currentField, achievements, image } = alumni
  
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={university === "UNC" ? "unc.carolinaBlue" : "duke.dukeBlue"}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
    >
      <VStack spacing={4} align="stretch">
        <Image
          src={image}
          alt={name}
          borderRadius="full"
          boxSize="150px"
          mx="auto"
          objectFit="cover"
        />
        <VStack spacing={2} align="center">
          <Text fontSize="xl" fontWeight="bold">{name}</Text>
          <Badge colorScheme={university === "UNC" ? "blue" : "purple"}>
            {university}
          </Badge>
          <Text color="gray.600">{major}</Text>
          <Text color="gray.500">{currentField}</Text>
        </VStack>
        <Box>
          <Text fontWeight="semibold" mb={2}>Achievements:</Text>
          {achievements.map((achievement, index) => (
            <Text key={index} fontSize="sm" color="gray.600">
              • {achievement}
            </Text>
          ))}
        </Box>
      </VStack>
    </Box>
  )
}

// =========================================
// AlumniGrid.jsx - Alumni Grid Component
// =========================================
import { SimpleGrid, Input, Select, Box } from '@chakra-ui/react'
import { useState, useMemo } from 'react'

function AlumniGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredAlumni = useMemo(() => {
    return sampleAlumni
      .filter(alumni => {
        const searchStr = searchQuery.toLowerCase()
        return (
          alumni.name.toLowerCase().includes(searchStr) ||
          alumni.university.toLowerCase().includes(searchStr) ||
          alumni.major.toLowerCase().includes(searchStr) ||
          alumni.currentField.toLowerCase().includes(searchStr)
        )
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "votes":
            return b.votes - a.votes
          case "university":
            return a.university.localeCompare(b.university)
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [searchQuery, sortBy])

  return (
    <Box>
      <Box mb={6}>
        <Input
          placeholder="Search alumni..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
          borderColor="celebration.gold"
        />
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          borderColor="celebration.gold"
        >
          <option value="name">Sort by Name</option>
          <option value="votes">Sort by Votes</option>
          <option value="university">Sort by University</option>
        </Select>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredAlumni.map(alumni => (
          <AlumniCard key={alumni.id} alumni={alumni} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

// =========================================
// Dashboard.jsx - Dashboard Component
// =========================================
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Icon } from '@chakra-ui/react'
import { FaGraduationCap, FaBriefcase, FaTrophy, FaHandshake } from 'react-icons/fa'

const StatCard = ({ label, value, helpText, icon, accentColor }) => (
  <Box
    bg="white"
    p={6}
    borderRadius="xl"
    boxShadow="lg"
    border="1px"
    borderColor={accentColor}
    position="relative"
    _before={{
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      bg: accentColor,
    }}
  >
    <Icon as={icon} boxSize={8} color={accentColor} mb={4} />
    <Stat>
      <StatLabel fontSize="lg">{label}</StatLabel>
      <StatNumber fontSize="3xl">{value}</StatNumber>
      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  </Box>
)

function Dashboard() {
  const stats = [
    {
      label: "Total Alumni",
      value: "50",
      helpText: "From UNC and Duke",
      icon: FaGraduationCap,
      accentColor: "unc.carolinaBlue"
    },
    {
      label: "Fields",
      value: "12+",
      helpText: "Different industries",
      icon: FaBriefcase,
      accentColor: "duke.dukeBlue"
    },
    {
      label: "Achievements",
      value: "200+",
      helpText: "Major accomplishments",
      icon: FaTrophy,
      accentColor: "celebration.gold"
    },
    {
      label: "Impact",
      value: "1M+",
      helpText: "Lives influenced",
      icon: FaHandshake,
      accentColor: "celebration.accent"
    }
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </SimpleGrid>
  )
}

export { App, theme, AlumniCard, AlumniGrid, Dashboard } 