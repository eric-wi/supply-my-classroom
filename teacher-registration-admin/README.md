# Teacher Registration Admin

This project is a web application for managing teacher registrations. It consists of a client-side application built with React and a server-side application built with Node.js and Express.

## Project Structure

The project is organized into two main directories: `client` and `server`.

### Client

- **`client/src`**: Contains the source code for the React application.
  - **`main.tsx`**: Entry point for the React application.
  - **`App.tsx`**: Main application component that sets up routing.
  - **`pages`**: Contains components for different pages.
    - **`Dashboard.tsx`**: Displays an overview of teacher registrations.
    - **`Teachers.tsx`**: Lists all registered teachers and allows modifications.
  - **`components`**: Reusable components.
    - **`TeacherList.tsx`**: Displays a list of teachers.
    - **`TeacherForm.tsx`**: Form for adding or editing teacher details.
    - **`Modal.tsx`**: Component for displaying dialogs or confirmation messages.
  - **`services/api.ts`**: Functions for making API calls to the backend.
  - **`hooks/useTeachers.ts`**: Custom hook for managing teacher data.
  - **`types/index.ts`**: TypeScript types and interfaces.

### Server

- **`server/src`**: Contains the source code for the server application.
  - **`index.ts`**: Entry point for the server, sets up Express.
  - **`controllers`**: Contains controllers for handling requests.
    - **`teachersController.ts`**: Handles requests related to teacher registrations.
  - **`routes`**: Defines API routes.
    - **`teachers.ts`**: Routes for teacher-related API endpoints.
  - **`services`**: Contains services for managing data.
    - **`teacherService.ts`**: Functions for CRUD operations on teacher data.
  - **`models`**: Defines data models.
    - **`teacherModel.ts`**: Structure of teacher data in the database.
  - **`db/migrations`**: Contains database migration files.
  - **`types/index.ts`**: TypeScript types and interfaces.

## Getting Started

1. Clone the repository.
2. Navigate to the `client` directory and run `npm install` to install client dependencies.
3. Navigate to the `server` directory and run `npm install` to install server dependencies.
4. Set up environment variables by copying `.env.example` to `.env` and modifying as needed.
5. Start the server and client applications.

## Features

- View a list of registered teachers.
- Add new teachers or edit existing teacher details.
- Responsive design for better usability.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.