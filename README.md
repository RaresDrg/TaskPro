<h1>TaskPro - FullStack App</h1>
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="35" alt="html5 logo"  />
  <img width="10" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="35" alt="css3 logo"  />
  <img width="10" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="35" alt="javascript logo"  />
  <img width="10" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="35" alt="typescript logo"  />
  <img width="10" />
  <img src="https://cdn.simpleicons.org/react/61DAFB" height="35" alt="react logo"  />
  <img width="10" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height="35" alt="redux logo"  />
  <img width="10" />
  <img src="https://skillicons.dev/icons?i=styledcomponents" height="35" alt="styledcomponents logo"  />
  <img width="10" />
  <img src="https://cdn.simpleicons.org/nodedotjs/339933" height="35" alt="nodejs logo"  />
  <img width="10" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height="35" alt="express logo"  />
  <img width="10" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" height="35" alt="mongodb logo"  />
  <img width="10" />
  <img src="https://skillicons.dev/icons?i=vite" height="35" alt="vite logo"  />
  <img width="10" />
  <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge" height="35" alt="vercel logo"  />
</div>

<h2>Project Links</h2>
<ul>
  <li><a href="https://taskpro-beryl.vercel.app">Live App</a></li>
  <li><a href="https://www.figma.com/design/fJF13s2UlxPIwTMcPVrSiz/TaskPro">Figma Design</a></li>
  <li><a href="https://taskpro-server-delta.vercel.app/api-docs/">API Documentation</a></li>
</ul>

<h2>Description</h2>
<p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>TaskPro</b> is an intuitive Kanban board application designed to help users organize and manage their projects and tasks efficiently. Inspired by tools like Trello or Jira, TaskPro offers a seamless experience for tracking progress and staying productive, ensuring that deadlines are never missed.
</p>

<h2>Features</h2>
<ul>
  <li><b>User Authentication</b>: securely create an account and log in, or use Google authentication for quick access to your personal workspace.</li>
  <li><b>Password Recovery</b>: easily reset the account password by entering your email and receiving a reset link directly to your inbox.</li>
  <li><b>Customer Support</b>: get in touch with our support team by filling out a form with your comment and sending it directly for prompt assistance.</li>
  <li><b>Edit Profile</b>: customize your profile by updating your name, email, and optionally adding a profile picture.</li>
  <li><b>Select Theme</b>: choose from three available themes: light, dark, or violet, to personalize your application's appearance.</li>
  <li><b>Project Management</b>: create, update, and delete boards, which will be organized in a list for easy selection.</li>
  <li><b>Column Management</b>: configure each board by creating, updating, and deleting columns for optimal structure and making it easier to organize tasks into different categories.</li>
  <li><b>Card Management</b>: create, update, and delete cards within columns to represent tasks that include essential information such as name, description, priority, and deadline.</li>
  <li><b>Filtering</b>: select the priority level to display only those cards that match the chosen priority, making it easier to focus on the desired tasks.</li>
</ul>

<h2>Frontend</h2>
<ul>
  <li><b>Technologies</b>: React, TypeScript, Redux, Styled-components</li>
  <li><b>Project Setup</b>:
    <ul>
      <li><b>Vite Template</b>: for a swift and efficient build process.</li>
      <li><b>Deploy</b>: Vercel.</li>
      <li><b>Type Safety</b>: ensured by TypeScript for strict type-checking and an enhanced development experience.</li>
      <li><b>Linting</b>: enforcing ESLint configuration for a clean and robust codebase.</li>
    </ul>
  </li>
  <li><b>Code Organization:</b>: 
    <ul>
      <li><b>Module Type</b>: ECMAScript Modules (ESM).</li>
      <li><b>Components Type</b>: reusable functional components.</li> 
      <li><b>Custom Hooks:</b>: developed to encapsulate and reuse logic across different components, enhancing code maintainability.</li> 
      <li><b>Utils:</b>: helper functions implemented to perform common tasks, improving code readability and avoiding duplication.</li> 
    </ul>
  </li> 
  <li><b>State Management</b>:
    <ul>
      <li><b>Redux</b>: used for centralized state management in the application.</li>
      <li><b>Redux Toolkit</b>: integrated to simplify Redux configuration, by utilizing slices to modularize state logic, creating actions and reducers more efficiently, and streamlining the setup process for improved code readability and maintenance.</li>
      <li><b>Redux Persist</b>: implemented to persist the application state across sessions, ensuring data consistency and improving the user experience by retaining state even after page reloads.</li>
    </ul>
  </li>
  <li><b>API Client</b>: 
    <ul>
      <li>Created a custom <b>"Axios"</b> instance to encapsulate the configuration and logic, ensuring consistency and reusability across the application.</li>
      <li>Configured to handle HTTP requests to the server, with a base URL and credentials included.</li>
      <li>Implemented <b>response interceptors</b> to manage authentication errors, initiating a forced logout for user reauthentication when a <b>401 Unauthorized</b> response occurs.</li>
    </ul>
  </li>
  <li><b>Routing </b>:
    <ul>
      <li>Depending on the user's <b>authentication status</b>, the application routes are accessible as follows: 
        <ul>
          <li><b>Restricted Routes</b>: can only be accessed when the user is not authenticated.</li>
          <li><b>Protected Routes</b>: can only be accessed when the user is authenticated.</li>
        </ul>
      </li>
      <li><b>Not Found Page</b>: the application handles non-existent routes by displaying this page with a <b>404</b> error message.</li>
      <li><b>Shared Layout</b>: used this approach to handle shared components in one place, reducing code repetition, simplifying maintenance, and improving page load times.</li>
      <li><b>Route-centric</b>: this process splits the code based on the application's routes, using <b>lazy</b> and <b>Suspense</b> to load each route's code only when needed, thus optimizing initial load times and improving overall performance.</li>
    </ul>
  </li>
  <li><b>Styling</b>: 
    <ul>
      <li><b>Styled-components</b>: used for writing isolated styles for each component, ensuring clean and maintainable code, including automatic prefixing for cross-browser compatibility, theming management, dynamic styling through props, and nested syntax.</li>
      <li><b>Cross-Browser Compatibility</b>: ensured through the use of <i>"modern-normalize"</i> and custom reset properties, providing consistent rendering across different browsers.</li>    
      <li><b>Responsive Design</b>:
        <ul>
          <li>Applied through a <b>mobile-first approach</b>, ensuring the application is optimized for mobile devices first.</li>
          <li>Using media queries and flexible layouts to adapt the design effectively to various devices and screen dimensions.</li>
          <li>Using <i>"react-responsive"</i> library, which conditionally renders components based on the size of the viewport.</li>
          <li>Utilized responsive images and backgrounds, with dimensions and versions tailored to ensure optimal visual experience across different screen sizes and pixel densities - <b>Retina display support</b>.</li>
        </ul>
      </li>
      <li><b>Sprite Technique</b>: consolidated all vector icons into a single sprite file, enhancing performance by reducing server requests and improving page load times, while making icon access and management easier.</li>      
      <li><b>Themes</b>: the application supports three distinct themes: dark, light, and violet, allowing users to choose their preferred visual appearance.</li>
      <li><b>Transitions</b>: implemented to provide smooth effects during user interactions and particularly when changing themes, maintaining consistency across various elements.</li>
      <li><b>Animations</b>: incorporated custom animations and animations from the <i>"animate.css"</i> library to enrich the visual appeal and create an engaging user experience.</li>
    </ul>
  </li>
  <li><b>User Experience (UX)</b>: 
    <ul>
      <li><b>Navigation</b>: designed to be intuitive, guiding users and clearly indicating their current location within the application.</li>
      <li><b>Loading Screen</b>: used for the login and logout processes, providing visual feedback and improving the user's interaction with the application.</li>
      <li><b>Loading Spinner</b>: displayed at key moments in the application, notably when awaiting server responses, providing users with real-time feedback.</li>
      <li><b>Modal Closure Options</b>: when a modal is open, it can be closed in multiple ways: by clicking the <b>"X"</b> button, by pressing the <b>"Esc"</b> key, by performing a mouse down action outside the modal, or automatically upon submitting the form within the modal and receiving a positive response from the server.</li>
      <li><b>Form Feedback</b>:
        <ul>
          <li><b>Placeholders</b>: implemented to indicate the necessary data for each field, guiding users in completing the forms correctly.</li>
          <li><b>Error Indicators</b>: added visual effects, such as red borders and error messages, to alert users when a field is required or contains invalid data.</li>
          <li><b>Submit Button</b>: becomes disabled if any errors are detected, preventing the submission of incorrect data to the server.</li>
          <li><b>Password Visibility Toggle</b>: included a show icon for password fields, allowing users to toggle the visibility of their password, enhancing usability.</li>
        </ul>
      </li>
      <li><b>Notifications</b>: utilized <i>"react-toastify"</i> library to display different types of notifications, including success, error, and warning messages, particularly when a response is received from a server request, providing immediate feedback to users.</li>
      <li><b>Forced Logout</b>: implemented a mechanism that, upon receiving a 401 response from the server (indicating the user is not authorized), forces a logout, requiring the user to reauthenticate.</li>
      <li><b>Drag & Drop</b>: this feature allows users to easily move and organize cards within the application, enhancing usability and interaction efficiency.</li>
      <li><b>Ellipsis Tooltip</b>: using the <i>"tippy.js"</i> library to handle visually long elements by truncating them and displaying an ellipsis, which reveals the full text when users hover over it, enhancing readability.</li>
    </ul>
  </li>
  <li><b>Other Details</b>: 
    <ul>
      <li><b>Forms</b>: utilizing the <b>Formik</b> library to build forms, ensuring efficient handling and a user-friendly form management experience.</li>
      <li><b>Data Validation</b>: using <b>Yup</b> as a complementary library to Formik forms, ensuring robust data validation and form reliability.</li>
      <li><b>Cloud-Based Assets</b>: used <b>Cloudinary</b> to store and manage application assets like background images, enhancing performance and load times via cloud services.</li>
    </ul>
  </li>
</ul>

<h2>Backend</h2>
<ul>
  <li><b>Technologies</b>: Node.js, Express, TypeScript</li>
  <li><b>Database</b>: MongoDB</li>
  <li><b>Object Data Modeling</b>: Mongoose</li>
  <li><b>Tools</b>: Postman, MongoDB Atlas, MongoDB Compass, Google Cloud Platform, Cloudinary</li>
  <li><b>REST API</b></li>
  <li><b>Project Setup</b>: 
    <ul>
      <li><b>Module Type</b>: ECMAScript Modules (ESM)</li>
      <li><b>Deploy</b>: Vercel</li>
      <li><b>Type Safety</b>: ensured by TypeScript for a more reliable and maintainable codebase.</li>
      <li><b>Linting</b>: ESLint Configuration for a clean and robust codebase.</li>
      <li><b>Environment Variables</b>: managed using <b>Dotenv</b> for secure configuration of sensitive information.</li>
      <li><b>Nodemon</b>: automatically restarts the server upon detecting changes in source files, enhancing development experience.</li>
    </ul>
  </li>
  <li><b>Authentication</b>:
    <ul>   
      <li><b>Methods</b>:
        <ol type="1">
          <li><b>Register / Login</b>: using user credentials</li>
          <li><b>Google OAuth</b>: using user Google account</li>
        </ol>
      </li>
      <li><b>Upon successful authentication</b>:
        <ul>
          <li><b>Token pair generation</b>:
            <ul>
              <li><b>Access Token</b>: JSON Web Token (JWT) with a lifespan of 15 minutes</li>
              <li><b>Refresh Token</b>: Random bytes token, created using crypto, securely stored in the database</li>
            </ul>
          </li>
          <li><b>Server-Side Cookies Response</b>: 
            <ul>
              <li><b>accessToken Cookie</b>: valid for 15 minutes</li>
              <li><b>refreshToken Cookie</b>: valid for 24 hours</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li><b>Authorization</b>: in order to access protected routes and private resources, requests must pass through an <b>authorization layer</b> represented by the jwtAuthMiddleware.</li>
  <li><b>Middleware</b>:
    <ul>
      <li><b>jwtAuthMiddleware</b>: 
        <ul>
          <li>Uses the <b>"passport-jwt strategy"</b> to decode the JSON Web Token (JWT) from the accessToken Cookie and search for the user in the database.</li>
          <li>If the accessToken is expired, the middleware attempts to use the refreshToken from the refreshToken Cookie, to find the user.</li>
          <li>If the user is found using the refreshToken, the token pair is regenerated, and access to the route is granted.</li>
          <li>If neither accessToken nor refreshToken are valid, access to the route is denied, and a <b>401</b> response is sent.</li>
        </ul>
      </li>
      <li><b>googleAuthMiddleware</b>: 
        <ul>
          <li>Uses the <b>"passport-google-oauth20 strategy"</b> to handle user authentication through Google.</li>
          <li>Searches for the user in the database based on the information received from Google.</li>
          <li>If the user doesn't exist, it creates a new user with the provided details.</li>
        </ul>
      </li>
      <li><b>cookieParserMiddleware</b>: uses the "cookie-parser" library to parse cookies from client requests.</li>    
      <li><b>validateTokenMiddleware</b>: checks the validation token, which can be used in two scenarios: Google authentication process and password reset procedure.</li>
      <li><b>multipartMiddleware</b>: uses the "multer" library to manage multipart/form-data.</li>
      <li><b>corsMiddleware</b>: uses the "cors" library to allow secure cross-origin requests exclusively from the client's application.</li>
      <li><b>loggerMiddleware</b>: uses the "morgan" library to provide logging for HTTP requests and responses, enhancing debugging and monitoring processes.</li>
      <li><b>missingRouteMiddleware</b>: handles missing routes by sending a <b>404</b> response with a "API route not found" message.</li>
      <li><b>errorMiddleware</b>: captures all errors from the code and sends appropriate responses based on the error type.</li>
    </ul>
  </li>
  <li><b>Other Details</b>:
    <ul>
      <li><b>Bcrypt</b>: provides secure hashing of passwords to protect user credentials.</li>
      <li><b>Cloudinary</b>: ensures the secure upload and storage of user profile pictures in the cloud, generating a link to the resource.</li>
      <li><b>Nodemailer</b>: sends confirmation emails to users after receiving support inquiries and handles sending password reset links.</li>
      <li><b>Swagger</b>: used to document and test the API endpoints interactively.</li>
      <li><b>Data Validation</b>:
        <ul>
          <li><b>Request Validation</b>: uses <b>Joi</b> library as the first layer to validate received data, ensuring it meets the required format and constraints.</li>
          <li><b>Database Validation</b>: Uses Mongoose Schema validation as the second layer to enforce data integrity and constraints when storing data in MongoDB.</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<br>
<div align="center">
   <a align="center" href="https://taskpro-beryl.vercel.app/">
    <img height="40" src="https://res.cloudinary.com/db73szjbz/image/upload/v1741641782/TaskPro/assets/logo/vuyvdwiaxcoaj9po4uv8.png"  />
  </a>
</div>
