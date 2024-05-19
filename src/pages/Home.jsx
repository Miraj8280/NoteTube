import { useState, useEffect, useRef } from 'react';
import { Box, Input, FormLabel, useDisclosure } from '@chakra-ui/react';
import VideoPlayer from '../components/VideoPlayer';
import NoteContainer from '../components/NoteContainer';
import AddNotes from '../components/AddNotes';

export default function Home() {
  const [videoId, setVideoId] = useState('1H_3akZopkg');
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const playerRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Load notes from local storage when the videoId changes
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    setNotes(storedNotes);
  }, [videoId]);

  // Add or edit a note and update local storage
  const handleAddNote = (note, formatting) => {
    const currentTime = playerRef.current.getCurrentTime();
    const newNote = {
      timestamp: currentTime,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      content: note,
      formatting
    };
    
    const updatedNotes = editIndex !== null
      ? notes.map((n, index) => (index === editIndex ? newNote : n))
      : [...notes, newNote];
    
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    resetNoteState();
  };

  // Delete a note and update local storage
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  // Prepare a note for editing
  const handleEditNote = (index) => {
    setCurrentNote(notes[index].content);
    setEditIndex(index);
  };

  // Save the edited note and update local storage
  const handleSaveNote = (index) => {
    const updatedNotes = notes.map((note, i) => (i === index ? { ...note, content: currentNote } : note));
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    resetNoteState();
  };

  // Handle video ID change
  const handleVideoChange = (e) => {
    setVideoId(e.target.value);
  };

  // Seek to the timestamp of the note in the video
  const handleTimestampClick = (timestamp) => {
    playerRef.current.seekTo(timestamp);
  };

  // Format the timestamp for display
  const formatTimestamp = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')} min ${String(secs).padStart(2, '0')} sec`;
  };

  // Reset the note state after adding or editing a note
  const resetNoteState = () => {
    setCurrentNote('');
    setEditIndex(null);
    onClose();
  };

  return (
    <Box p={5}>
      <FormLabel>
        Enter YouTube video ID:
        <Input
          placeholder="Enter YouTube video ID"
          value={videoId}
          onChange={handleVideoChange}
          mb={4}
        />
      </FormLabel>

      {/* Video player component */}
      <VideoPlayer videoId={videoId} playerRef={playerRef} />

      {/* NoteContainer component */}
      <NoteContainer
        notes={notes}
        editIndex={editIndex}
        currentNote={currentNote}
        handleTimestampClick={handleTimestampClick}
        handleEditNote={handleEditNote}
        handleSaveNote={handleSaveNote}
        handleDeleteNote={handleDeleteNote}
        setCurrentNote={setCurrentNote}
        formatTimestamp={formatTimestamp}
        onOpen={onOpen}
      />

      {/* Add notes component */}
      <AddNotes
        isOpen={isOpen}
        onClose={onClose}
        onNoteChange={setCurrentNote}
        handleAddNote={handleAddNote}
      />
    </Box>
  );
}
