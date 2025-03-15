import { useState, useMemo } from 'react';
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
} from '@chakra-ui/react';
import AlumniCard from './AlumniCard';

const AlumniGrid = ({ alumni = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const filteredAndSortedAlumni = useMemo(() => {
    return alumni
      .filter(alum => {
        const searchString = `${alum.name} ${alum.university} ${alum.major} ${alum.currentField}`.toLowerCase();
        return searchString.includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rank':
            return (a.rank || Infinity) - (b.rank || Infinity);
          case 'votes':
            return b.votes - a.votes;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'university':
            return a.university.localeCompare(b.university);
          default:
            return 0;
        }
      });
  }, [alumni, searchQuery, sortBy]);

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
            <HStack spacing={4} width="100%">
              <Input
                placeholder="Search alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="gray.50"
                borderColor="gray.300"
                _focus={{ borderColor: 'celebration.gold', boxShadow: '0 0 0 1px var(--chakra-colors-celebration-gold)' }}
              />
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                bg="gray.50"
                borderColor="gray.300"
                _focus={{ borderColor: 'celebration.gold', boxShadow: '0 0 0 1px var(--chakra-colors-celebration-gold)' }}
              >
                <option value="rank">Rank</option>
                <option value="votes">Most Votes</option>
                <option value="name">Name</option>
                <option value="university">University</option>
              </Select>
            </HStack>
          </VStack>
        </Box>

        {filteredAndSortedAlumni.length === 0 ? (
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
            {filteredAndSortedAlumni.map((alum) => (
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