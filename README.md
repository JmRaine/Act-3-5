# ShowCase Product Gallery

Code copied from the activity PDF. The active frontend now uses the database app and connects to the Render API. Six sample products with embedded PNG images have been saved to MongoDB and persist after refresh.

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

- `client/src/App.jsx`: active database-connected app.
- `client/src/App.local.jsx`: original local app; refresh clears products in this version.
- `client/public/product-images/`: six original AI-generated clay-style product PNGs, each under 1MB.
- `scripts/products.json`: custom product names, prices, and descriptions.
- `docs/product-image-provenance.md`: image-generation method and prompts.
- `client/src/components/`: Navbar, ProductCard, ProductGrid, ImageUpload, ProductForm.
- `client/src/pages/`: GalleryPage and ManagePage.
- `client/src/App.database.jsx`: Activity 3 replacement app that connects to the API.
- `client/src/api.js`: API calls.
- `server/`: Express API, database connection, model, controller, and routes.

The gallery and footer display Justin Raine Justiza, section INF239.

## Frontend environment

The active app requires `client/.env` with:

```env
VITE_API_URL=https://act-3-5.onrender.com
```

This file is excluded from Git. `client/.env.example` provides the same template. Restart the dev server after changing it. The code adds `/api/products` automatically.

## Deploy the frontend on Vercel

Import `JmRaine/Act-3-5`, set Root Directory to `client`, Framework Preset to `Vite`, and add the environment variable `VITE_API_URL` with value `https://act-3-5.onrender.com`. Deploy and check that the products remain after refresh. The Vercel website uses the same MongoDB products as localhost.

## Sample products and submission

Six products with PNG images were added through the Render API. The PNG files in `client/public/product-images/` are also available for manual uploads through Manage. `node scripts/seed-products.mjs` adds missing sample names and skips existing ones; it does not delete products. The current catalog uses different products, original generated artwork, and custom names and descriptions rather than the PDF examples. `node scripts/replace-sample-products.mjs` replaces matching old sample products while preserving other products and saving a local backup.

For **Activity 1**, Vercel is not required. Submit the cover page with screenshots of the gallery containing your products, Manage while editing a product, and the VS Code sidebar with `components` and `pages` expanded. Local gallery/edit screenshots are saved in `output/screenshots/`. Add/edit/delete, image preview, the 1MB limit, and refresh persistence have been checked in the browser.

For hosting, submit the GitHub repository, Render showing Live, Thunder Client showing status 201, the live Vercel website with 5+ products, and a photo of the website on your phone. Localhost screenshots alone do not satisfy the hosting requirements.

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

The frontend already uses the database app. Set the same `VITE_API_URL` environment variable in Vercel when deploying it.
