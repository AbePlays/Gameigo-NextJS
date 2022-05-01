import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LinkIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  useToast,
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
  ListItem,
} from '@chakra-ui/react';

import BoxWithDivider from '@components/BoxWithDivider';
import CustomLink from '@components/CustomLink';
import GameContent from '@components/GameContent';
import Store from '@components/Store';
import Page from '@containers/Page';
import { IconArrowBack, IconHeartFilled, IconHeartOutline } from '@icons';
import { useAuth } from '@lib/auth';
import { addGame, checkGame, deleteGame } from '@lib/db';
import { formatDate } from '@utils/date';
import { convertToGame } from '@utils/game';
import BlurImage from '@components/BlurImage';

interface Props {
  game: GameInfo;
  screenshots: Screenshots;
}

const CustomDivider = () => {
  return (
    <Box
      alignSelf="center"
      bg="white"
      display={['none', 'none', 'block']}
      flexShrink={0}
      height="10"
      width="1"
      mx="2"
      rounded="lg"
    />
  );
};

const GameDetail: FunctionComponent<Props> = ({ game, screenshots }) => {
  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [isFav, setIsFav] = useState<boolean>(false);
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        duration: 2000,
        isClosable: false,
        position: 'top-right',
        status: 'success',
        title: 'Copied to Clipboard.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = async () => {
    try {
      if (isFav) {
        await deleteGame(user.uid, game.id);
        toast({
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
          title: 'Collection Updated.',
          variant: isDarkMode ? 'solid' : 'subtle',
        });
        setIsFav(false);
      } else {
        await addGame(user.uid, convertToGame(game));
        toast({
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
          title: 'Collection Updated.',
          variant: isDarkMode ? 'solid' : 'subtle',
        });
        setIsFav(true);
      }
    } catch (e) {
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
        title: 'Update Failed.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      console.log(e);
    }
  };

  const clickHandler = () => router.back();

  const renderReleasedandPlaytime = () => {
    return (
      <Wrap direction={['column', 'row']} spacing={[2, 4]}>
        <WrapItem
          bg="white"
          borderRadius="lg"
          color="black"
          px="2"
          py="0.5"
          w="fit-content"
        >
          {game.released ? formatDate(game.released) : 'TBA'}
        </WrapItem>
        {game.playtime > 0 && (
          <WrapItem
            alignItems="center"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            Average Playtime: {game.playtime} Hours
          </WrapItem>
        )}
      </Wrap>
    );
  };

  const renderTriContentBox = () => {
    return (
      <Stack direction={['column', 'column', 'row']} py="4" textAlign="center">
        <Box w="full">
          <Heading as="h2" fontSize={['2xl', '3xl']}>
            Platforms
          </Heading>
          <Wrap
            justify="center"
            spacing="0"
            mt="2"
            w={['full', 'full', 4 / 5]}
            mx="auto"
          >
            {game.parent_platforms.map((item, index) => (
              <WrapItem key={item.platform.id}>
                <BoxWithDivider id={index} title={item.platform.name} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <CustomDivider />
        <Box w="full">
          <Heading as="h2" fontSize={['2xl', '3xl']}>
            Metacritic Score
          </Heading>
          <Text mt="2">{game.metacritic || '-'}</Text>
        </Box>
        <CustomDivider />
        <Box w="full">
          <Heading as="h2" fontSize={['2xl', '3xl']}>
            Genres
          </Heading>
          <Wrap
            justify="center"
            spacing="0"
            mt="2"
            w={['full', 'full', 4 / 5]}
            mx="auto"
          >
            {game.genres.map((item, index) => {
              return (
                <WrapItem key={item.id}>
                  <BoxWithDivider id={index} title={item.name} />
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </Stack>
    );
  };

  useEffect(() => {
    if (user) {
      checkGame(user.uid, game.id).then((res) => setIsFav(res));
    }
  }, [game.id, user]);

  return (
    <Box bg="black" color="white" position="relative">
      <Box position="absolute" top={['4', '4', '12']} w="full" zIndex="1">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="1120px"
          mx="auto"
          px="4"
        >
          <Box
            aria-label="Go Back"
            as="button"
            onClick={clickHandler}
            w={['6', '8']}
          >
            <IconArrowBack />
          </Box>
          <Flex alignItems="center" justifyContent="center">
            {user ? (
              <Box
                aria-label={`${isFav ? 'UnFavorite' : 'Favorite'}`}
                as="button"
                w={['6', '7']}
                onClick={onClickHandler}
                mr="2"
              >
                {isFav ? <IconHeartFilled /> : <IconHeartOutline />}
              </Box>
            ) : null}
            <IconButton
              aria-label="Share"
              fontSize={['xl', '2xl']}
              icon={<LinkIcon />}
              onClick={copyLink}
              variant="unstyled"
            />
          </Flex>
        </Flex>
      </Box>
      <Box display={['none', 'none', 'block']} pos="absolute" inset="0">
        <Box
          w="100%"
          h="calc(100vh - 64px)"
          position="fixed"
          filter="brightness(40%)"
        >
          <BlurImage
            src={game.background_image}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            alt="game background"
          />
        </Box>
      </Box>
      <Box display={['block', 'block', 'none']} h="300px" position="relative">
        <BlurImage
          src={game.background_image}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="game background"
        />
      </Box>
      <Box position="relative">
        <Page
          description={game.description_raw}
          imageUrl={game.background_image}
          pt={['0', '0', '24']}
          siteLink={`/game/${game.slug}`}
          title={game.name}
        >
          <Stack spacing="4" mt="4">
            <Heading as="h1" fontSize={['3xl', '5xl']}>
              {game.name}
            </Heading>
            {renderReleasedandPlaytime()}
            {renderTriContentBox()}
            {game.description && (
              <GameContent heading="About">
                <Box
                  dangerouslySetInnerHTML={{ __html: game.description }}
                  lineHeight="1.8"
                ></Box>
              </GameContent>
            )}
            {game.publishers.length > 0 && (
              <GameContent heading="Publishers">
                <Wrap spacing="0">
                  {game.publishers.map((item, index) => {
                    return (
                      <WrapItem key={item.id}>
                        <BoxWithDivider id={index} title={item.name} />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </GameContent>
            )}
            {game.website && (
              <GameContent heading="Website">
                <CustomLink link={game.website} title={game.website} />
              </GameContent>
            )}
            {Array.isArray(game.stores) && game.stores.length > 0 && (
              <GameContent heading="Where to buy">
                <Wrap>
                  {game.stores.map((item) => {
                    return (
                      <WrapItem key={item.id}>
                        <Store name={item.store.name} url={item.store.domain} />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </GameContent>
            )}
            {screenshots.count > 0 && (
              <GameContent heading="Screenshots">
                <UnorderedList
                  className="no-scrollbar"
                  display="flex"
                  gap="6"
                  marginInline="2"
                  style={{ scrollSnapType: 'x mandatory' }}
                  overflowX="auto"
                >
                  {screenshots.results.map((item) => {
                    return (
                      <ListItem
                        flexShrink={0}
                        key={item.id}
                        listStyleType="none"
                        style={{ scrollSnapAlign: 'start' }}
                      >
                        <Flex rounded="sm" overflow="hidden">
                          <BlurImage
                            alt={`game-screenshot-${item.id}`}
                            height="180px"
                            objectFit="cover"
                            src={item.image}
                            width="320px"
                          />
                        </Flex>
                      </ListItem>
                    );
                  })}
                </UnorderedList>
              </GameContent>
            )}
          </Stack>
        </Page>
      </Box>
    </Box>
  );
};

export default GameDetail;
