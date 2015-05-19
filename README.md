# Markus Greystone Code Test #

Proof of concept application to showcase the skills of Markus Greystone. Front-end web application that will allow users to perform basic operations with Stack Exchange. 

Non authenticated users can
- Search for questions
- Sort questions (with tabs)
- View question answers
- View tags
- Authenticate

Authenticated users can
- View own profile
- View own badges (on profile)
- View own favorites (on profile)
- View own answers (on profile)
- Upvote, downvote, & favorite answers & questions
- Log out

## Technical Notes ##

The application is an entirely client-side application. The UI layer is built in [React](https://facebook.github.io/react/) while the data layer is built with [Reflux](https://github.com/spoike/refluxjs).

Application only supports ES5 & CORS enabled browsers. IE9 and below are not supported.

## Build Notes ##

### Prerequisites ###

- [node](https://nodejs.org/)
- [gulp](http://gulpjs.com/)

### Build Steps ###

1. Clone this repository
2. Install all packages

  ```
  npm install
  ```

3. Build

  ```
  gulp build
  ```

## Legal ##

All non-open source images & other assets are the property of Blizzard Entertainment.
