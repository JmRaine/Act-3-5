# ShowCase Product Gallery

Code copied from the activity PDF. The default app is Activity 1 (local React state). No database or account is required for this version. Products disappear when you refresh, as described in the PDF.

## Run the website

Open this folder in VS Code and open a terminal:

```powershell
cd "C:\Users\jason\OneDrive\Desktop\Act3-5"
npm.cmd start
```

Open the local URL printed in the terminal, normally http://127.0.0.1:5173. Click **Manage** to add products with your own images (maximum 1MB), then use **Gallery**, **Edit**, and **Delete**. Press Ctrl+C to stop.

If dependencies have not been installed yet, run these first from the project folder:

```powershell
npm.cmd --prefix client install
npm.cmd --prefix server install
```

Use `npm.cmd` in PowerShell to avoid problems with the `npm.ps1` execution policy.

## Where the code is

- `client/src/App.jsx`: Activity 1 app, ready for local use.
- `client/src/components/`: Navbar, ProductCard, ProductGrid, ImageUpload, ProductForm.
- `client/src/pages/`: GalleryPage and ManagePage.
- `client/src/App.database.jsx`: Activity 3 replacement app that connects to the API.
- `client/src/api.js`: API calls.
- `server/`: Express API, database connection, model, controller, and routes.
- `Activity-3-5-codes-and-instructions.md`: all 42 PDF steps, code, rubrics, and submission requirements.

Replace `[Your Name]` in GalleryPage.jsx and App.jsx, and `[Section]` in App.jsx with your own details.

## Later: run with MongoDB

Follow the MongoDB setup steps in the transcribed instructions first. Then, from the project folder:

```powershell
Copy-Item .\server\.env.example .\server\.env
Copy-Item .\client\.env.example .\client\.env
```

Edit `server/.env` and replace the placeholder with your MongoDB Atlas connection string. For a local backend, edit `client/.env` to contain:

```text
VITE_API_URL=http://localhost:5000
```

Switch to the database app (back up the local version first):

```powershell
Copy-Item .\client\src\App.jsx .\client\src\App.local.jsx
Copy-Item .\client\src\App.database.jsx .\client\src\App.jsx
npm.cmd run server
```

Keep that terminal running. In a second terminal in the project folder:

```powershell
npm.cmd start
```

You can restore the local app with `Copy-Item .\client\src\App.local.jsx .\client\src\App.jsx`.

## Build

```powershell
npm.cmd run build
```

The database backend needs your own MongoDB configuration before it can run. Hosting and account setup have not been performed.

## Deploy the backend on Render

Create a Web Service connected to `JmRaine/Act-3-5` and use:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Root Directory | `server` |
| Build Command | `npm ci` |
| Start Command | `npm start` |
| Environment variable | `MONGO_URI` = your MongoDB Atlas connection string |

After deployment, open `/api/products` on your Render URL. An empty database returns `[]`.

The frontend currently uses the local Activity 1 app. To connect it to Render, follow the database-app switch above and set `VITE_API_URL` to your Render URL instead of `http://localhost:5000`.
