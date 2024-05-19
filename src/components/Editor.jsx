import { useState, useEffect } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';

export default function Editor({ onChange }) {
  // State variables to manage content and text formatting
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Effect to trigger onChange callback when content or formatting changes
  useEffect(() => {
    onChange(content, { isBold, isItalic, isUnderline });
  }, [content, isBold, isItalic, isUnderline, onChange]);

  // Toggle functions for text formatting
  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    setIsUnderline(!isUnderline);
  };

  // Dynamically generate inline styles based on text formatting
  const generateStyle = () => {
    let style = {};
    if (isBold) style.fontWeight = 'bold';
    if (isItalic) style.fontStyle = 'italic';
    if (isUnderline) style.textDecoration = 'underline';
    return style;
  };

  // Handler for text content change
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <Box>
      {/* Textarea for input content */}
      <Textarea
        value={content}
        onChange={handleContentChange}
        mt={4}
        p={2}
        resize="none"
        border="1px solid #ccc"
        borderRadius="md"
        mb="1rem"
        {...generateStyle()} // Apply dynamic styles
      />
      {/* Formatting buttons */}
      <Box textAlign="right">
        <Button onClick={handleBoldClick} variant={isBold ? 'solid' : 'outline'} mr={2}>
          B
        </Button>
        <Button onClick={handleItalicClick} variant={isItalic ? 'solid' : 'outline'} mr={2}>
          I
        </Button>
        <Button onClick={handleUnderlineClick} variant={isUnderline ? 'solid' : 'outline'}>
          U
        </Button>
      </Box>
    </Box>
  );
}