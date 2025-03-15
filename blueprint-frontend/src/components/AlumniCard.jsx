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
} from '@chakra-ui/react';
import { StarIcon, ChevronUpIcon, ExternalLinkIcon } from '@chakra-ui/icons';

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
      bg={schoolColors.bg}
      boxShadow="xl"
      transition="transform 0.3s"
      _hover={{ transform: 'translateY(-4px)' }}
      borderColor="celebration.gold"
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
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
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
          <Text fontWeight="semibold" color="gray.700">Key Achievements:</Text>
          {achievements.map((achievement, index) => (
            <HStack key={index} spacing={2}>
              <Icon as={StarIcon} color="celebration.gold" boxSize={4} />
              <Text fontSize="sm">{achievement}</Text>
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
      </VStack>
    </Box>
  );
};

export default AlumniCard; 