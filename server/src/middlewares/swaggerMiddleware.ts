import { Request, Response, NextFunction } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import { getBoardOptions } from "../utils/utils.js";

const { bgOptions, iconsOptions, priorityOptions } = getBoardOptions();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiDocsDir = path.join(__dirname, "..", "routes", "swaggerDocs");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskPro API",
      version: "1.0.0",
      description:
        "<hr></hr><strong>Description:</strong> TaskPro is an intuitive Kanban board application designed to help users organize and manage their projects and tasks efficiently. Inspired by tools like Trello or Jira, TaskPro offers a seamless experience for tracking progress and staying productive. <br></br> <strong>Important:</strong> When it comes to logging into the app, users have two choices: either the traditional login/password or the Google authentication method. Once the user has successfully logged in using one of the two methods, they will depend on the token pair (accessToken, refreshToken) received in response to authentication to access <strong>protected endpoints</strong>. These tokens are sent as <strong>server-side cookies</strong>, so credentials must be included in the requests. <br></br><strong>Base URL:</strong> => <a href='https://taskproserver.vercel.app'>https://taskproserver.vercel.app<a/>",
    },
    tags: [
      { name: "User" },
      { name: "Board" },
      { name: "Column" },
      { name: "Card" },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the user",
              minLength: 3,
              maxLength: 50,
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "A valid email address",
              format: "email",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              description:
                "The password must be at least 8 characters, including at least one uppercase, one lowercase, and one digit.",
              minLength: 8,
              pattern: "^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}$",
              example: "Password123",
            },
            profilePhoto: {
              typs: "string",
              description: "User's profile photo (optional)",
              format: "binary",
            },
            theme: {
              type: "string",
              description: "User's theme preference",
              enum: ["light", "dark", "violet"],
              example: "light",
              default: "violet",
            },
            isGoogleUser: {
              type: "boolean",
              description:
                "User type: true => google account, false => login/password account",
              example: false,
            },
            comment: {
              type: "string",
              description: "The comment to send to customer support",
              minLength: 10,
              maxLength: 400,
              example: "I have a problem with my account.",
            },
            accessToken: {
              type: "string",
              description:
                "It's a JSON Web Token (JWT) used for authentication strategy. Expiry time: 15 min",
            },
            refreshToken: {
              type: "string",
              description:
                "It's a token used for authentication strategy: it refreshes the access token when it expires. Expiry time: 1 day",
            },
            validationToken: {
              type: "string",
              description:
                "It's a token used for two purposes: Google authentication and password reset. Expiry time: 15 minutes.",
            },
          },
          required: ["name", "email", "password"],
        },
        Board: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the board",
              minLength: 3,
              maxLength: 50,
              example: "Project One",
            },
            icon: {
              type: "string",
              description: "The icon of the board",
              enum: iconsOptions,
              example: "icon-project",
            },
            background: {
              type: "string",
              description: "The background of the board",
              enum: bgOptions,
              example: "bg-1",
            },
          },
          required: ["title", "icon", "background"],
        },
        Column: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the column",
              minLength: 3,
              maxLength: 50,
              example: "Column X",
            },
          },
          required: ["title"],
        },
        Card: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the card",
              minLength: 3,
              maxLength: 50,
              example: "Card One",
            },
            description: {
              type: "string",
              description: "The description of the card",
              minLength: 5,
              maxLength: 400,
              example: "This is card one.",
            },
            priority: {
              type: "string",
              description: "The priority of the card",
              enum: priorityOptions,
              example: "low",
            },
            deadline: {
              type: "string",
              description:
                "The deadline of the card. It should be today's date or a future date",
              example: "Dec 25 2025",
            },
          },
          required: ["title", "description", "priority", "deadline"],
        },
      },
    },
  },
  apis: [`${apiDocsDir}/*.js`],
});

const serveSwagger = swaggerUi.serve;
const setupSwagger = (req: Request, res: Response, next: NextFunction) => {
  swaggerUi.setup(swaggerSpec)(req, res, next);
};

export { serveSwagger, setupSwagger };
