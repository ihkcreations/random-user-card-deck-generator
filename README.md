# Random User Card Deck Generator

This application generates a randomized deck of user profile cards that can be searched and exported.

## Quick start

Open `index.html` in a browser. No install or build step.

## What it does

- Generates random user profile cards with unique details
- Filters the generated deck using a search input
- Exports the active card deck to a json file
- Displays card counts and system status metrics

## Under the hood

The application picks random names and roles from internal arrays to build profile objects. JavaScript renders these objects into structured cards and filters them based on user input. Exporting serializes the current state into a downloadable json file.
