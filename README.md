# ParkPassPOC

This program is a proof of concept that uses Django for backend (Python), and React.js for the front end, built in a virtual environment. The database used is SQLLite, but the project can be easily adjusted to any other database, like Oracle, SQL Server, etc.

The purpose of the program is to recreate a booking program, where companies can book sessions for a park.

Each park has the following information: ID, Name, Location, Season of Operation, Hours open, Capacity, Availability of parking, and Cost.
Each visitor has the following information: ID, Name, Date of Reservation, Number of Guests, Physical photo Id, Email, Phone number, and their selected park.

The booking webpage has a user-friendly UI using React.js. The Navigation Menu on the main page takes the user to different pages that can be browsed through. When viewing the current visitors/parks, all of the information is shown, retrieved from the DB tables. Using RestAPI requests, parks and visitors can either be Added, Updated, or Deleted.

When a visitor request is sent to book a park, the backend checks whether the new/updated visitor does not exceed the capacity of the park for the day. If it does, the operation cannot be completed and a detailed error message appears including the number of the available places remained. The created booking records can be updated or deleted later.

The UI of this program is versatile, as it handles photos, dates, etc.
