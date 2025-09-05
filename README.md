# ChefClaude

ChefClaude is a full-stack AI-powered recipe generator. It allows users to input ingredients and receive creative recipe suggestions. The project is built with:

- **Frontend**: React + Vite (client folder)  
- **Backend**: Node.js + Express (server folder)  
- **AI Integration**: Hugging Face model (via HF_API_KEY environment variable)

---

##  Features

- Dynamically add ingredients on the frontend
- Submit to backend API for recipe generation using Hugging Face
- Receive and display formatted recipe output
- Uses environment variables for secure key management

---

##  Tech Stack

- **Client**: React, Vite, React Markdown, React Loading, FontAwesome  
- **Server**: Node.js, Express, dotenv  
- **AI**: Hugging Face API (access via `HF_API_KEY`)  
- **Bundler**: Vite for frontend development

---

##  Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/jayendrasai/ChefClaude.git
cd ChefClaude

# Install dependencies
npm install              # installs server dependencies
cd client
npm install              # installs client dependencies
cd ..
