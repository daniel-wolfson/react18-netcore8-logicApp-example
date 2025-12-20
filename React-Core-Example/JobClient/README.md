# Getting Started with App

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

# API Configuration Guide

## 🔧 Mock Data vs Real API

This application can run in two modes:

### 1. **Mock Data Mode (Default)** ✅

Perfect for development and testing without a backend.

-   Edit `.env` file:
    ```env
    REACT_APP_USE_MOCK_DATA=true
    ```
-   Mock data is located in `src/middleware/mockData.ts`
-   Chart displays sample job views and predictions

### 2. **Real API Mode** 🌐

Connect to your actual backend server.

-   Edit `.env` file:
    ```env
    REACT_APP_USE_MOCK_DATA=false
    REACT_APP_API_URL=http://localhost:5000
    ```
-   Ensure your backend is running at the specified URL
-   API endpoints expected:
    -   `GET /api/JobApi/Jobs/GetJobs`
    -   `GET /api/JobApi/Jobs/GetJobViews`

---

## 🚀 Getting Started

### Running with Mock Data (No Backend Required)

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Ensure `.env` has mock mode enabled:**

    ```env
    REACT_APP_USE_MOCK_DATA=true
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

4. **Open browser:**
    - Navigate to http://localhost:3000
    - You should see a chart with sample data

### Running with Real Backend

1. **Start your backend server:**

    - Ensure it's running at `http://localhost:5000` (or update `.env`)
    - Verify these endpoints are accessible:
        ```
        http://localhost:5000/api/JobApi/Jobs/GetJobs
        http://localhost:5000/api/JobApi/Jobs/GetJobViews
        ```

2. **Update `.env`:**

    ```env
    REACT_APP_USE_MOCK_DATA=false
    REACT_APP_API_URL=http://localhost:5000
    ```

3. **Restart the React app:**
    ```bash
    npm start
    ```

---

## 🐛 Troubleshooting

### Error: "Network Error" or "AxiosError"

**Problem**: Backend API is not running or not accessible.

**Solutions**:

1. **Switch to mock data mode** (quick fix):

    - Set `REACT_APP_USE_MOCK_DATA=true` in `.env`
    - Restart the app with `npm start`

2. **Check your backend**:

    - Is the server running?
    - Is it accessible at the URL in `.env`?
    - Check CORS settings if running on different ports

3. **Verify API endpoints**:
    - Test in browser or Postman:
        ```
        http://localhost:5000/api/JobApi/Jobs/GetJobs
        http://localhost:5000/api/JobApi/Jobs/GetJobViews
        ```

### CORS Issues

If you get CORS errors, your backend needs to allow requests from `http://localhost:3000`:

**C# .NET Example:**

```csharp
app.UseCors(builder => builder
    .WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader());
```

**Node.js Express Example:**

```javascript
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
```

---

## 📝 Expected Data Formats

### Jobs Response

```json
[
    {
        "id": 1,
        "title": "Software Engineer",
        "company": "Tech Corp",
        "location": "San Francisco, CA",
        "status": "active",
        "postedDate": "2025-12-01T00:00:00Z"
    }
]
```

### Job Views Response

```json
[
    {
        "viewDate": "2025-12-01T00:00:00Z",
        "activeJobs": 45,
        "views": 1200,
        "viewsPredicted": 1150
    }
]
```

---

## 🔄 Customizing Mock Data

Edit `src/middleware/mockData.ts` to change the sample data:

```typescript
export const mockJobViews = [
    {
        viewDate: '2025-12-01T00:00:00Z',
        activeJobs: 45,
        views: 1200,
        viewsPredicted: 1150,
    },
    // Add more entries...
];
```

After editing, restart the development server.

---

## 🌍 Environment Variables

| Variable                  | Default                 | Description                   |
| ------------------------- | ----------------------- | ----------------------------- |
| `REACT_APP_USE_MOCK_DATA` | `true`                  | Enable/disable mock data mode |
| `REACT_APP_API_URL`       | `http://localhost:5000` | Backend API base URL          |

**Note**: Changes to `.env` require restarting the development server.

---

## ✅ Quick Test

1. **With mock data** (should always work):

    ```bash
    npm start
    ```

    → Chart displays with sample data

2. **With real API** (requires backend):
    - Start backend at http://localhost:5000
    - Set `REACT_APP_USE_MOCK_DATA=false`
    - `npm start`
      → Chart displays with live data

---

**Need help?** Check the console for detailed error messages or refer to `UPGRADE_COMPLETED.md` for general troubleshooting.
