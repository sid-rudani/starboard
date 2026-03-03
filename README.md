# STARBOARD

This project displays a list of tiles with upvotes and persists data to Supabase.

## Supabase Setup
1. Create a table named `items` with columns:
   - `id` (bigint or serial primary key)
   - `text` (text)
   - `votes` (integer, default 0)
2. Obtain your **Supabase URL** and **anon/public API key** from your Supabase project.
3. Create a `.env` file in the project root with:

   ```dotenv
   REACT_APP_SUPABASE_URL=https://xyzcompany.supabase.co
   REACT_APP_SUPABASE_KEY=your-public-anon-key
   ```

   or, when the app runs with no credentials it will display a small form at the top of the list where you can paste the URL and key; the values are saved to `localStorage` so they persist across reloads.

4. Restart the development server (`npm start`) after adding the environment variables (or simply fill in the form).

Once configured the app will automatically fetch and update the list.


A simple React app that displays a list of items with upvote buttons.
The UI uses a dark theme with orange highlights and the data persists
using Supabase. You can configure your Supabase credentials via
environment variables (see below).

## Supabase Setup

1. Create a new project at https://supabase.com and add a table named `items` with columns:
   - `id` (bigint, primary key, auto increment)
   - `text` (text)
   - `votes` (integer, default 0)
2. Obtain your project URL and anon/public key.
3. In the project root create a `.env` file containing:

   ```env
   REACT_APP_SUPABASE_URL=your-project-url
   REACT_APP_SUPABASE_KEY=your-anon-key
   ```

4. Restart the development server to pick up the variables.

The app will automatically load, add, and upvote items through Supabase.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
