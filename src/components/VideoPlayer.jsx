import { useState } from 'react';
import YouTube from 'react-youtube';
import { Box, Heading } from '@chakra-ui/react';

export default function VideoPlayer({ videoId, playerRef }) {
  // State variable to store video title
  const [videoTitle, setVideoTitle] = useState('');

  // Function to handle player ready event
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    // Set video title once the player is ready
    setVideoTitle(playerRef.current?.getVideoData()?.title || '');
  };

  // Function to calculate responsive width and height based on window dimensions
  const calculateDimensions = () => {
    const viewportWidth = window.innerWidth;
    const aspectRatio = 16 / 9; // Standard aspect ratio for videos
    const height = Math.floor(viewportWidth / aspectRatio);
    return { width: viewportWidth, height };
  };

  // Initial dimensions based on window size
  const initialDimensions = calculateDimensions();

  // Options for YouTube player
  const opts = {
    height: initialDimensions.height.toString(),
    width: initialDimensions.width.toString(),
    playerVars: {
      autoplay: 1,
      iv_load_policy: 3, // To remove annotations
      rel: 0, // To remove recommended videos
    },
  };

  // Event listener for window resize to handle responsiveness
  window.addEventListener('resize', () => {
    // Recalculate dimensions
    const { width, height } = calculateDimensions();
    // Set new size using player's setSize method
    playerRef.current.setSize(width?.toString(), height.toString());
  });

  return (
    <Box mb={8} overflow="hidden" mx={5}>
      {/* YouTube player component */}
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      {/* Display video title */}
      {videoTitle && (
        <Heading mt="2rem" fontSize={{ base: '20px', md: '24px', lg: '24px' }}>
          {videoTitle}
        </Heading>
      )}
    </Box>
  );
}
