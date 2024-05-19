import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Box, Heading } from '@chakra-ui/react';

export default function VideoPlayer({ videoId, playerRef }) {
  const [videoTitle, setVideoTitle] = useState('');

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setVideoTitle(playerRef.current?.getVideoData()?.title || '');
  };

  const calculateDimensions = () => {
    const viewportWidth = window.innerWidth;
    const aspectRatio = 16 / 9;
    const height = Math.floor(viewportWidth / aspectRatio * 0.7);
    return { height };
  };

  const [dimensions, setDimensions] = useState(calculateDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(calculateDimensions());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const opts = {
    height: dimensions.height.toString(),
    width: "100%",
    playerVars: {
      autoplay: 1,
      iv_load_policy: 3,
      rel: 0,
    },
  };

  return (
    <Box mb={8} overflow="hidden" borderRadius="md" boxShadow="md" width="70%">
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      {videoTitle && (
        <Box p={4} borderBottomRadius="md" >
          <Heading fontSize={{ base: '16px', md: '18px', lg: '20px' }}>
            {videoTitle}
          </Heading>
        </Box>
      )}
    </Box>
  );
}
