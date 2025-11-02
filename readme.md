# GM Screen (All-in-One)

A lightweight, single-file Game Master (GM) utility tool designed for fast, offline-first use, with an optional Node.js backend to enable AI-powered content generation using the **Gemini API**. The application client is fully contained in a single HTML file, storing all data locally in the browser's `localStorage`.

***

## ✨ Features

The application provides a comprehensive set of tools for running a tabletop RPG session:

* **AI Content Generators (✨):** Utilizes the backend server (`server.js`) and the Gemini API to dynamically create **NPCs**, **Locations**, and **Monster Descriptions**.
* **Initiative Tracker (⚔️):** A complete system for managing combat turns, rounds, and tracking combatant HP and AC.
* **Dice Roller (🎲):** Supports complex roll formulas (e.g., `4d6kh3+2`) and maintains a chronological Session Log of all rolls and events.
* **Campaign Management:** Dedicated boards for the **Party**, **Notes**, **Loot**, **Magic Items**, **Bestiary** (Monsters), **NPC Roster**, and **Saved Locations**.
* **Reference Tools:** Built-in cheat sheets for **Conditions**, Combat **Actions**, and **Cover** rules.
* **Data Management:** Functionality to **Export** and **Import** all application data as a single JSON file for backup and migration.

***

## 💻 Setup and Installation

The project is split into a frontend application (`screen.html`) and a required AI backend server (`server.js`) for the generative features.

### 1. AI Server Setup

The Node.js server is responsible for making API calls to Google's Gemini service securely.

1.  **Install Dependencies:** Navigate to the server directory and install required packages.

    ```bash
    # Dependencies required: dotenv, express, node-fetch
    npm install
    ```
    *(Dependencies listed in `package.json`: `dotenv`, `express`, `node-fetch`)*

2.  **Configure API Key:**
    Create a file named **`.env`** in the server's root directory to store your API key.

    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```
    *(The server loads this key using `dotenv`)*

3.  **Start the Server:**
    ```bash
    node server.js
    ```
    The server will start on port `3000`: `✅ Server is running at http://localhost:3000`.

### 2. Frontend Usage

1.  Open the **`screen.html`** file directly in your preferred web browser.
2.  The application will automatically attempt to connect to the server at `http://localhost:3000` for AI generation features.
3.  All non-AI data is saved locally and instantly accessible.