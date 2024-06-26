import { Box, Container, Heading, Text } from '@radix-ui/themes';
import { Metadata } from 'next';
import { Suspense } from 'react';

import BlurImage from '@components/BlurImage';
import SearchResult from '@components/SearchResult';
import heroBg from 'public/images/search_hero.jpeg';
import { Input } from './input';
import { Loading } from './skeleton';

export const metadata: Metadata = {
  title: 'Gameigo | Search',
  description:
    'Gameigo is a free and open source application backed by a huge database of video games provided by ROG. Explore and search for games and everything you need in one place.',
};

export default function SearchPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { page = '', query = '' } = searchParams;

  return (
    <Box position="relative">
      {/* Background Image */}
      <Box height={{ initial: '200px', sm: '300px' }} overflow="hidden" position="relative">
        <BlurImage alt="" fill style={{ objectPosition: 'top' }} showBg src={heroBg} />
      </Box>

      {/* Intro Text */}
      <Box className="text-white" left="0" position="absolute" px="4" top={{ initial: '6', sm: '9' }} width="100%">
        <Heading align="center" as="h1" size="8">
          Search Gameigo
        </Heading>
        <Text align="center" as="p" mt={{ initial: '1', sm: '4' }} size={{ initial: '3', sm: '4' }} weight="medium">
          Choose from 30,000+ games with new addition every few weeks.
        </Text>
      </Box>

      {/* Search Input */}
      <Container className="-translate-y-6 px-4 mx-auto" size="2">
        <Input />
      </Container>

      {/* Search Results */}
      {query ? (
        <Container mt="6" px="4">
          <Suspense fallback={<Loading />} key={query + page}>
            <SearchResult page={Number(page || 1)} query={query} />
          </Suspense>
        </Container>
      ) : null}
    </Box>
  );
}
