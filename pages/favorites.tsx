import { FunctionComponent } from 'react';
import { useColorMode, useToast, Heading } from '@chakra-ui/react';
import useSWR from 'swr';

import Loader from '@components/Loader';
import GameCard from '@components/GameCard';
import NoData from '@components/NoData';
import Page from '@containers/Page';
import ProtectedRoute from '@containers/Protected';
import { useAuth } from '@lib/auth';
import { FadeUpAnimation } from '@utils/animations';
import fetcher from '@utils/fetcher';
import { MotionBox } from '@utils/MotionElements';
import { Descriptions } from 'seo';

const Favorites: FunctionComponent = () => {
  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';
  const token = user?.token;

  const { data, error } = useSWR(['/api/favorites', token], fetcher);

  if (error) {
    toast({
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      status: 'error',
      title: 'Search Failed.',
      variant: isDarkMode ? 'solid' : 'subtle',
    });
  }

  return (
    <ProtectedRoute>
      <Page title="Favorites" description={Descriptions.Favorites}>
        <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
          Favorites
        </Heading>
        {data ? (
          Array.isArray(data) && data.length > 0 ? (
            <MotionBox
              className="grid"
              animate="show"
              initial="hidden"
              variants={FadeUpAnimation.parent}
            >
              {data.map((game: Game) => (
                <GameCard game={game} key={game.id} />
              ))}
            </MotionBox>
          ) : (
            <NoData title="Please add games to your collection." />
          )
        ) : (
          <Loader />
        )}
      </Page>
    </ProtectedRoute>
  );
};

export default Favorites;
