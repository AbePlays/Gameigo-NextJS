import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { useColorMode, Link, Stack, Text } from '@chakra-ui/react';

import AboutCard from '@/components/AboutCard';
import Page from '@/containers/Page';

const About: FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Page title="About">
      <Stack maxW="container.xl" mx="auto" textAlign="center" spacing="12">
        <AboutCard heading="Small and Crafty">
          <Text maxW="container.md" mx="auto">
            Gameigo is a video game discovery platform where you can keep all
            your games in one unified profile and create your exclusive
            collection. The application is powered by a public API provided by
            RAWG which houses more than 350,000 games across half a hundred
            platforms.
          </Text>
        </AboutCard>
        <AboutCard heading="Creator">
          <Text maxW="container.md" mx="auto">
            Hi there, I&apos;m Abhishek - aka Abe 👋 I am a self learner trying
            to get hands on new technologies and producing exciting products
            that are as smart, as they are effective. Wanna talk about Computer
            Sciency things? Drop a message : )
          </Text>
        </AboutCard>
        <AboutCard heading="Contact">
          <Stack isInline spacing="2" justifyContent="center">
            <NextLink href="https://www.linkedin.com/in/abe10/" passHref>
              <Link
                bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
                color={isDarkMode ? 'dark-text' : 'light-text'}
                px="4"
                py="2"
                rounded="md"
                target="_blank"
                _hover={{
                  transform: 'translateY(-2px)',
                }}
              >
                LinkedIn
              </Link>
            </NextLink>
            <NextLink href="mailto:abhi.rawat456@gmail.com" passHref>
              <Link
                bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
                color={isDarkMode ? 'dark-text' : 'light-text'}
                px="4"
                py="2"
                rounded="md"
                _hover={{
                  transform: 'translateY(-2px)',
                }}
              >
                Mail
              </Link>
            </NextLink>
            <NextLink href="https://github.com/AbePlays" passHref>
              <Link
                bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
                color={isDarkMode ? 'dark-text' : 'light-text'}
                px="4"
                py="2"
                rounded="md"
                target="_blank"
                _hover={{
                  transform: 'translateY(-2px)',
                }}
              >
                Github
              </Link>
            </NextLink>
          </Stack>
        </AboutCard>
      </Stack>
    </Page>
  );
};

export default About;
