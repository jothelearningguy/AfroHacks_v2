/**
 * AlumniCard Component
 * 
 * A card component that displays detailed information about an individual alumnus.
 * Features include:
 * - Profile image with university badge
 * - Personal and academic information
 * - Achievement highlights
 * - Interactive elements (voting, sharing)
 * - Responsive design
 */

import { useState } from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  Tooltip,
  Heading,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon, ChevronUpIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FaGraduationCap, FaBriefcase, FaTrophy } from "react-icons/fa";

const AlumniCard = ({ 
  name = "John Doe",
  university = "Duke",
  graduationYear = "2020",
  major = "Computer Science",
  currentField = "Technology",
  achievements = [],
  votes = 0,
  image = "https://via.placeholder.com/150",
  rank,
  quote,
  impact,
  philanthropyScore,
  leadershipScore,
}) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);

  const isUNC = university === 'UNC';
  const schoolColors = {
    bg: isUNC ? 'unc.white' : 'duke.white',
    accent: isUNC ? 'unc.carolinaBlue' : 'duke.dukeBlue',
    badge: isUNC ? 'blue' : 'purple',
    button: isUNC ? 'unc' : 'duke',
  };

  // Dynamic theme colors
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // University-specific styling
  const universityColor = university === "UNC" ? "unc.carolinaBlue" : "duke.dukeBlue";

  const handleVote = () => {
    if (!hasVoted) {
      setVoteCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg={cardBg}
      boxShadow="xl"
      transition="transform 0.3s"
      _hover={{ transform: 'translateY(-4px)' }}
      borderColor={borderColor}
    >
      {/* Rank Badge */}
      {rank && (
        <Badge
          position="absolute"
          top={4}
          left={4}
          zIndex={2}
          variant="celebration"
          fontSize="xl"
          px={4}
          py={2}
        >
          #{rank}
        </Badge>
      )}

      <Box position="relative">
        <Image 
          src={image} 
          alt={name} 
          height="300px" 
          width="100%" 
          objectFit="cover" 
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="blackAlpha.700"
          p={4}
        >
          <Badge
            variant={isUNC ? "unc" : "duke"}
            fontSize="sm"
            mb={2}
          >
            {university}
          </Badge>
          <Heading 
            size="md" 
            color="white" 
            noOfLines={1}
            mb={1}
          >
            {name}
          </Heading>
          <Text color="gray.200" fontSize="sm">
            Class of {graduationYear}
          </Text>
        </Box>
      </Box>

      <VStack p={6} spacing={4} align="stretch">
        <VStack align="start" spacing={2}>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            {major}
          </Text>
          <Badge colorScheme="teal" px={3} py={1} borderRadius="full">
            {currentField}
          </Badge>
        </VStack>

        {quote && (
          <Box bg="gray.50" p={4} borderRadius="md" fontStyle="italic">
            <Text fontSize="sm" color="gray.600">"{quote}"</Text>
          </Box>
        )}

        <VStack align="start" spacing={2}>
          <Text fontWeight="semibold" color={textColor}>Key Achievements:</Text>
          {achievements.map((achievement, index) => (
            <HStack key={index} spacing={2}>
              <Icon as={FaTrophy} color="celebration.gold" boxSize={4} />
              <Text fontSize="sm" color={textColor}>{achievement}</Text>
            </HStack>
          ))}
        </VStack>

        {impact && (
          <Box>
            <Text fontWeight="semibold" color="gray.700" mb={2}>Impact:</Text>
            <Text fontSize="sm" color="gray.600">{impact}</Text>
          </Box>
        )}

        <Box pt={2}>
          <Tooltip
            label={hasVoted ? "You've already voted" : "Vote for this alumni"}
            aria-label="Vote tooltip"
          >
            <Button
              leftIcon={<ChevronUpIcon />}
              variant={hasVoted ? "outline" : "celebration"}
              width="full"
              onClick={handleVote}
              isDisabled={hasVoted}
            >
              {voteCount} Votes
            </Button>
          </Tooltip>
        </Box>

        <HStack justify="space-between" pt={2}>
          <Badge colorScheme="purple">
            Leadership: {leadershipScore}
          </Badge>
          <Badge colorScheme="green">
            Philanthropy: {philanthropyScore}
          </Badge>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AlumniCard; 