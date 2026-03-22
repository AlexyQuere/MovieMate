# Movie Mate

A website that helps users choose a movie based on your preferences. It works by selecting favorite films, then an algorithm automatically suggests other movies that might be of interest. The recommendation system takes into account several factors such as the director, genre, cast, and release date.

## Prerequisites

- Node.js (version 14 or higher)
- Python (version 3.7 or higher)
- npm (comes with Node.js)

## Backend

### Project setup

```
cd backend
npm install
pip install -r requirements.txt
cp .env.example .env
```

### Run database migrations

```
npm run migration:run
```

### Populate database (optional)

```
node populatedatabase.js
```

### Start and auto-reload for development

```
npm run dev
```

### Start for production

```
npm run start
```

### Lint and fix files

```
npm run lint
```

## Frontend

### Project setup

```
cd frontend
npm install
```

### Compile and hot-reload for development

```
npm run dev
```

### Compile and minify for production

```
npm run build
```

### Lint and fix files

```
npm run lint
```

## Running the Full Application

1. Start the backend server:

   ```
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:8000`

2. In a new terminal, start the frontend:

   ```
   cd frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or similar, check the console)

3. Open your browser and navigate to the frontend URL to use the application.

## Project Structure

- `backend/`: Node.js server with Express, database migrations, and Python recommendation script
- `frontend/`: React application built with Vite
- `database.sqlite3`: SQLite database (not included in repo, created via migrations)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
