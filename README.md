# NoteTube

NoteTube is a responsive video player application built with React.js using Vite as the build tool. It allows users to play any YouTube video and add notes linked to specific timestamps in the video. The application utilizes local storage to save notes, ensuring that notes are tied to the corresponding video ID even when the video is changed.

![Screenshot](./public/notetube-screenshot.png)

### [Live Preview](https://notetube.vercel.app/)


## Features

### 1. Video Player
- Embed a YouTube video player that can play any YouTube video.
- The video can be changed based on a provided video ID.

### 2. Notes Functionality
- Users can add notes linked to specific timestamps in the video.
- Each note includes:
    - A timestamp (clickable to jump to that point in the video).
    - The date the note was created.
    - The note content.
- Users can edit and delete notes.

### 3. Local Storage
- Save notes in the local storage.
- Notes are tied to the video ID, so changing the video displays the corresponding notes for the new video ID.

### 4. HTML Editor
- Provides an HTML editor to add notes with options to make the text bold, italics, underlined, etc.

## Tech Stack
- React.js
- Vite
- Tailwind CSS
- React-youtube
- Chakra UI

## Installation

1. Clone the repository:
`git clone https://github.com/Miraj8280/NoteTube.git`

2. Navigate to the project directory:
`cd notetube`

3. Install dependencies:
`npm install`

4. Start the development server:
`npm run dev`


## Usage

Once the development server is running, open your browser and navigate to `http://localhost:5173/` to access NoteTube. You can then provide a YouTube video ID, play the video, add notes, edit notes, and delete notes as needed.

Happy coding! 🎨✨
