/**
 * AlumniGrid Component
 * 
 * A responsive grid layout displaying alumni cards with search and filter functionality.
 * Features include:
 * - Search by name, university, or field
 * - Filter by graduation year and achievements
 * - Sort by various metrics
 * - Responsive grid layout
 */

import { useState, useMemo, useEffect } from 'react';
import {
  SimpleGrid,
  Input,
  Select,
  Box,
  VStack,
  HStack,
  Text,
  Container,
  Heading,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import AlumniCard from './AlumniCard';
import { SearchIcon } from '@chakra-ui/icons';

// Sample alumni data for development
const sampleAlumni = [
  // ... (keep existing sample data)
];

const AlumniGrid = ({ alumni = [] }) => {
  // State management for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filteredAlumni, setFilteredAlumni] = useState(alumni);

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // Search and filter functionality
  useEffect(() => {
    const filtered = alumni.filter(alum => {
      const searchString = `${alum.name} ${alum.university} ${alum.major} ${alum.currentField}`.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'year':
          return b.graduationYear - a.graduationYear;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredAlumni(sorted);
  }, [searchQuery, sortBy, alumni]);

  // Dynamic color values based on theme
  const inputBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="8xl" py={8}>
      <VStack spacing={8} width="100%">
        <Box 
          width="100%" 
          bg="white" 
          p={6} 
          borderRadius="xl" 
          boxShadow="base"
          borderWidth="1px"
          borderColor="celebration.gold"
        >
          <VStack spacing={4}>
            <Heading size="md" color="gray.700">
              Search and Filter Alumni
            </Heading>
            <Flex 
              direction={{ base: "column", md: "row" }} 
              gap={4} 
              mb={8}
              align="center"
            >
              <InputGroup maxW={{ base: "100%", md: "400px" }}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search alumni by name, university, or field..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg={inputBg}
                  borderColor={borderColor}
                />
              </InputGroup>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                maxW={{ base: "100%", md: "200px" }}
                bg={inputBg}
                borderColor={borderColor}
              >
                <option value="name">Sort by Name</option>
                <option value="votes">Sort by Votes</option>
                <option value="year">Sort by Graduation Year</option>
              </Select>
            </Flex>
          </VStack>
        </Box>

        {filteredAlumni.length === 0 ? (
          <Box 
            width="100%" 
            textAlign="center" 
            p={8} 
            bg="white" 
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text fontSize="lg" color="gray.600">
              No alumni found matching your search criteria
            </Text>
          </Box>
        ) : (
          <SimpleGrid 
            columns={columns} 
            spacing={8} 
            width="100%"
          >
            {filteredAlumni.map((alum) => (
              <AlumniCard
                key={alum.id}
                {...alum}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default AlumniGrid; 