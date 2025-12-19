# AlgoVis Setup Guide

## Quick Start

### Option 1: Run Both Backend & Frontend Together

```bash
# From root directory
npm install
npm run dev
```

This will start:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:3000`

### Option 2: Run Individually

**Backend Only:**
```bash
cd backend
npm install
npm run dev
```

**Frontend Only:**
```bash
cd frontend
npm install
npm run dev
```

## Project Organization

```
AlgoVis/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── server.js          # Express server entry
│   │   ├── algorithms/        # Algorithm implementations
│   │   │   ├── sorting/
│   │   │   ├── searching/
│   │   │   ├── graph/
│   │   │   └── dynamic-programming/
│   │   ├── datasets/          # Dataset management
│   │   ├── ml/                # ML utilities & analytics
│   │   ├── api/               # API route handlers
│   │   └── utils/             # Shared utilities
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/                   # React UI
│   ├── src/
│   │   ├── main.jsx           # React entry point
│   │   ├── App.jsx            # Main app component
│   │   ├── components/        # React components
│   │   ├── utils/             # API client
│   │   └── styles/            # Tailwind + custom CSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── package.json               # Root workspace config
└── README.md
```

## Backend Structure

### Key Modules:

1. **Algorithms** (`backend/src/algorithms/`)
   - Sorting algorithms (6+)
   - Searching algorithms (4+)
   - Graph algorithms (7+)
   - Dynamic programming (6+)
   - Each with metadata: complexity, difficulty, etc.

2. **Datasets** (`backend/src/datasets/`)
   - Dataset generation utilities
   - Built-in dataset templates
   - Dataset manager class for caching

3. **ML** (`backend/src/ml/`)
   - `PerformanceAnalyzer`: Track metrics
   - `AlgorithmRecommender`: Suggest best algorithms
   - `ComplexityPredictor`: Predict execution time

4. **Utils** (`backend/src/utils/`)
   - Data structures: Queue, Stack, Graph, MinHeap
   - Visualization helpers
   - Operation tracking

## Frontend Structure

### Key Components:

- `Navbar` - Navigation bar
- `Hero` - Landing section
- `AlgorithmGrid` - Browse algorithms by category
- `AlgorithmCard` - Individual algorithm card
- `AlgorithmVisualizer` - Main visualization page
- `Footer` - Footer section

### API Client:
- `frontend/src/utils/api.js` - Axios configuration
- Health checks, algorithm fetching, execution

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Development Workflow

1. **Start both servers:**
   ```bash
   npm run dev
   ```

2. **Backend development:**
   - Auto-reloads with `--watch` flag
   - Check `http://localhost:5000/api/health`

3. **Frontend development:**
   - Hot module replacement enabled
   - Auto-opens at `http://localhost:3000`

4. **API Testing:**
   - Use Postman or similar tool
   - Base URL: `http://localhost:5000/api`

## Building for Production

### Backend:
```bash
# Node.js doesn't need building, just deploy the src/
cd backend
npm install --production
npm start
```

### Frontend:
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

## Future Expansion Points

### Adding New Algorithms:

1. Create file in `backend/src/algorithms/[category]/[algorithm].js`
2. Implement algorithm with `OperationTracker`
3. Export from category index
4. Add metadata to `[category]Index`

### Adding ML Features:

1. Create models in `backend/src/ml/models/`
2. Update `PerformanceAnalyzer` or create new analyzer
3. Expose via API endpoints

### Adding Datasets:

1. Create dataset generator in `backend/src/datasets/generators/`
2. Add to `builtinDatasets` list
3. Expose via datasets API

## Troubleshooting

### Backend won't start:
```bash
# Kill port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001 npm run dev
```

### Frontend can't connect to backend:
- Check backend is running on 5000
- Check `vite.config.js` proxy settings
- Check CORS in `backend/src/server.js`

### Module not found errors:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Next Steps

1. Implement algorithm functions in backend
2. Create API routes for algorithms
3. Connect frontend to backend endpoints
4. Add visualization step tracking
5. Implement real-time animations
6. Add dataset selection to UI

---

For more details, see README.md
