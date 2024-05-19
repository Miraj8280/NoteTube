import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import Note from "./Note";

export default function NoteContainer({
  notes,
  editIndex,
  currentNote,
  handleTimestampClick,
  handleEditNote,
  handleSaveNote,
  handleDeleteNote,
  setCurrentNote,
  formatTimestamp,
  onOpen,
  playerRef,
}) {
  // Determine if the screen size is small
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  // Handle the click event for adding a new note
  const handleAddNoteClick = () => {
    // Ensure playerRef is defined and check if the video is playing before pausing
    if (playerRef?.current?.getPlayerState && playerRef.current.getPlayerState() === 1) {
      playerRef.current.pauseVideo();
    }
    onOpen();
  };

  return (
    <Card p={5} width="70%">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="sm">My Notes</Heading>
            <Text color="#475467" pt="2" fontSize="sm">
              All your notes in a single place. Click on any note to go to a
              specific timestamp in the video.
            </Text>
          </Box>
          {isSmallScreen ? (
            <PlusSquareIcon
              ml="1rem"
              fontSize="1.3rem"
              onClick={handleAddNoteClick}
            />
          ) : (
            <Button
              size="sm"
              leftIcon={<PlusSquareIcon />}
              variant="outline"
              onClick={handleAddNoteClick}
            >
              Add new note
            </Button>
          )}
        </Flex>
        <Divider mt={4} />
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <Note
                key={index}
                note={note}
                index={index}
                editIndex={editIndex}
                currentNote={currentNote}
                handleTimestampClick={handleTimestampClick}
                handleEditNote={handleEditNote}
                handleSaveNote={handleSaveNote}
                handleDeleteNote={handleDeleteNote}
                setCurrentNote={setCurrentNote}
                formatTimestamp={formatTimestamp}
              />
            ))
          ) : (
            <Text>No notes available. Add some notes to get started!</Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
