==========================================================================
SOLHYDRA — CLEAN TRI-HYBRID COMMERCIAL MOBILITY PLATFORM
Created by Ishan Yadav
==========================================================================

ARCHITECTURE:
This project is structured as a full multi-page corporate website:
- index.html        : Clean Home with hero, value thesis, and interactive fleet calculator
- technology.html   : Technical specifications, redesigned 3D energy flowchart, 6 core subsystems, and comparison table
- about.html        : Founder Ishan Yadav, core engineering principles, project roadmap, and contact card
- contact.html      : Commercial inquiries, direct contact to Ishan Yadav, and 5-item technical FAQ accordion
- style.css         : Clean light corporate design system (White / Light Gray / Classic Navy / Charcoal)
- script.js         : Interactive fleet calculator, working contact form (dual email + Formspree), modal, and FAQ accordion
- start-server.bat  : 1-click Windows script to start a local server and launch the site

CONTACT DETAILS:
- Founder: Ishan Yadav
- Emails: ishanyadav2909@gmail.com, ishanyadavactive@gmail.com
- Mobile: +91-9457606742

HOW TO RUN LOCALLY:
Option A (Easiest - 1 Click):
Double-click `start-server.bat` in this folder. It will launch the local server and open http://localhost:8000 automatically.

Option B (Terminal via Python):
1. Open PowerShell or Command Prompt in this folder.
2. Run: python -m http.server 8000
3. Open http://localhost:8000 in your browser.

Option C (Terminal via Node.js):
1. Run: npx serve .
2. Open the URL shown in terminal (usually http://localhost:3000).

Option D (VS Code):
Right-click index.html -> "Open with Live Server".
