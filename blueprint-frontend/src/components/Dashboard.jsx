/**
 * Dashboard Component
 * 
 * A comprehensive analytics dashboard that displays key statistics and metrics
 * about the alumni community. Features include:
 * - Statistical cards showing key metrics
 * - Interactive charts and graphs
 * - Real-time data visualization
 */

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Select,
  Heading,
  Container,
  VStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Badge,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaGraduationCap, FaBriefcase, FaTrophy, FaHandshake } from 'react-icons/fa';

// StatCard Component - Displays individual statistics with icons
const StatCard = ({ label, value, helpText, icon, accentColor }) => {
  // Dynamic color values based on theme
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="xl"
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
        bg: accentColor
      }}
    >
      <Stat>
        <StatLabel color={textColor} fontSize="lg">{label}</StatLabel>
        <StatNumber fontSize="3xl" color={accentColor}>{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
      <Icon
        as={icon}
        position="absolute"
        top={4}
        right={4}
        boxSize={6}
        color={accentColor}
      />
    </Box>
  );
};

const Dashboard = ({ alumni = [] }) => {
  const [filterCriteria, setFilterCriteria] = useState({
    university: '',
    graduationYear: '',
    major: '',
    field: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalAlumni: 0,
    avgGradYear: 0,
    uniqueFields: 0,
    totalAchievements: 0,
  });

  const COLORS = {
    UNC: ['#4B9CD3', '#13294B', '#ffffff'],
    Duke: ['#012169', '#001A57', '#ffffff']
  };

  // Process data for charts
  const processChartData = () => {
    const fieldData = alumni.reduce((acc, curr) => {
      acc[curr.currentField] = (acc[curr.currentField] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(fieldData).map(([field, count]) => ({
      name: field,
      value: count
    }));
  };

  useEffect(() => {
    const calculateStats = () => {
      const totalAlumni = alumni.length;
      
      const sumGradYears = alumni.reduce((sum, alum) => sum + parseInt(alum.graduationYear), 0);
      const avgGradYear = Math.round(sumGradYears / totalAlumni);
      
      const uniqueFields = new Set(alumni.map(alum => alum.currentField)).size;
      
      const totalAchievements = alumni.reduce((sum, alum) => sum + (alum.achievements?.length || 0), 0);

      setStats({
        totalAlumni,
        avgGradYear,
        uniqueFields,
        totalAchievements,
      });
    };

    calculateStats();
  }, [alumni]);

  return (
    <Container maxW="8xl" py={8}>
      <VStack spacing={8} width="100%">
        <Box
          width="100%"
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          borderWidth="1px"
          borderColor="celebration.gold"
          textAlign="center"
        >
          <Heading
            as="h1"
            size="xl"
            mb={4}
            bgGradient="linear(to-r, celebration.gold, celebration.bronze)"
            bgClip="text"
          >
            The Blueprint: First Edition
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
            Celebrating the remarkable achievements and lasting impact of African American alumni
            from UNC and Duke who have shaped their fields and communities.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} width="100%">
          <StatCard
            label="Featured Alumni"
            value={stats.totalAlumni}
            helpText="Distinguished graduates"
            icon={FaGraduationCap}
            accentColor="blue"
          />
          <StatCard
            label="Average Class Year"
            value={stats.avgGradYear}
            helpText="Years of excellence"
            icon={FaTrophy}
            accentColor="purple"
          />
          <StatCard
            label="Career Fields"
            value={stats.uniqueFields}
            helpText="Areas of impact"
            icon={FaBriefcase}
            accentColor="green"
          />
          <StatCard
            label="Notable Achievements"
            value={stats.totalAchievements}
            helpText="Combined accomplishments"
            icon={FaHandshake}
            accentColor="orange"
          />
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Dashboard; 