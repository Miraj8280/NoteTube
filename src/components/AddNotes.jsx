import { useCallback, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import Editor from "./Editor";

export default function AddNotes({
  isOpen,
  onClose,
  handleAddNote,
  playerRef,
}) {
  const [noteContent, setNoteContent] = useState("");
  const [formatting, setFormatting] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
  });

  const handleNoteContentChange = useCallback((content, format) => {
    setNoteContent(content);
    setFormatting(format);
  }, []);

  const handleSaveNote = () => {
    handleAddNote(noteContent, formatting);
    if (
      playerRef &&
      playerRef.current &&
      playerRef.current.getPlayerState() !== 1
    ) {
      playerRef.current.playVideo();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Editor onChange={handleNoteContentChange} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSaveNote}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
