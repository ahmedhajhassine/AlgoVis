# AlgoVis Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  UI Layer                                           │  │
│  │  • Navbar, Hero, AlgorithmGrid                     │  │
│  │  • AlgorithmVisualizer, AlgorithmCard             │  │
│  │  • Responsive Design with Tailwind                │  │
│  └─────────────────────────────────────────────────────┘  │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  API Client (axios)                                │  │
│  │  • Health checks                                   │  │
│  │  • Algorithm fetching & execution                 │  │
│  │  • Dataset management                             │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │ HTTP
                           │ REST API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Node.js + Express)                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  API Layer                                          │  │
│  │  • Express Routes & Controllers                    │  │
│  │  • Error handling & middleware                     │  │
│  │  • CORS & request validation                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                           │                                 │
│  ┌──────────────┬─────────────────┬────────────┬───────┐  │
│  │              │                 │            │       │  │
│  ▼              ▼                 ▼            ▼       ▼  │
│ ┌────────┐  ┌────────┐  ┌──────────────┐  ┌──────┐ ┌────┐
│ │Sorting │  │Searching│ │Graph Algorithms
│ │        │  │        │  │              │  │  DP  │ │ ML │
│ ├────────┤  ├────────┤  ├──────────────┤  ├──────┤ ├────┤
│ │- Bubble│  │- Binary│  │- BFS         │  │- Fib │ │Perf│
│ │- Quick │  │- Linear│  │- Dijkstra    │  │- LCS │ │Rec │
│ │- Merge │  │- Jump  │  │- A*          │  │- DP  │ │Comp│
│ │- Heap  │  │- etc   │  │- Prim/Kruskal   │- etc │ │-  │
│ └────────┘  └────────┘  └──────────────┘  └──────┘ └────┘
│  Algorithms Module      │            Datasets Module
│                         │
│  ┌──────────────────────┴────────────────────────────────┐
│  │  Utils Layer                                          │
│  │  • Data Structures (Queue, Stack, Graph, Heap)      │
│  │  • OperationTracker (metrics)                        │
│  │  • Visualization helpers                            │
│  └───────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Visualization Flow:
```
User selects algorithm
         │
         ▼
Frontend fetches algorithm metadata
         │
         ▼
User configures: size, speed, input
         │
         ▼
Frontend sends: POST /api/algorithms/:id/run
         │
         ▼
Backend executes algorithm with OperationTracker
         │
         ▼
Backend returns steps, metrics, operations
         │
         ▼
Frontend animates visualization with Framer Motion
```

### Dataset Flow:
```
User requests dataset
         │
         ▼
Frontend calls: GET /api/datasets
         │
         ▼
Backend checks cache, generates if needed
         │
         ▼
Returns dataset with metadata
         │
         ▼
Frontend uses for algorithm execution
```

### ML/Analytics Flow:
```
Algorithm execution completes
         │
         ▼
Backend records metrics via PerformanceAnalyzer
         │
         ▼
User views performance statistics
         │
         ▼
Frontend calls: GET /api/ml/performance
         │
         ▼
Backend returns comparisons & recommendations
```

## Module Responsibilities

### Backend Modules

#### Algorithms
- **Purpose**: Implement and manage all algorithm logic
- **Exports**: Algorithm functions, metadata indexes
- **Features**: 
  - Complexity analysis
  - Difficulty levels
  - Stability information
  - Best/worst case scenarios

#### Datasets
- **Purpose**: Generate and manage test data
- **Exports**: DatasetManager, generators, built-in datasets
- **Features**:
  - Random generation
  - Sorted/reversed arrays
  - Nearly-sorted data
  - Data with duplicates
  - Graph structures

#### ML Module
- **Purpose**: Analytics and recommendations
- **Exports**: PerformanceAnalyzer, AlgorithmRecommender, ComplexityPredictor
- **Features**:
  - Execution tracking
  - Performance comparison
  - Algorithm recommendations
  - Time complexity prediction

#### Utils
- **Purpose**: Shared utilities and data structures
- **Exports**: Queue, Stack, Graph, MinHeap, OperationTracker
- **Features**:
  - Efficient data structures
  - Operation counting
  - Visualization tracking

### Frontend Components

#### Layout Components
- **Navbar**: Top navigation
- **Hero**: Landing section
- **Footer**: Bottom section

#### Content Components
- **AlgorithmGrid**: Browse by category
- **AlgorithmCard**: Individual algorithm preview
- **AlgorithmVisualizer**: Main visualization interface

#### Utilities
- **API Client**: Axios wrapper with error handling
- **Animation Hooks**: Framer Motion integration
- **State Management**: React hooks for UI state

## Complexity Tracking

### OperationTracker
Tracks:
- Comparisons (key operations)
- Swaps (data movement)
- Assignments (variable updates)
- Accesses (data reads)
- Elapsed time

### PerformanceAnalyzer
Analyzes:
- Average, min, max execution times
- Average comparisons per size
- Historical data trends
- Algorithm comparisons

## API Contract

### Request/Response Examples

#### Execute Algorithm
```
POST /api/algorithms/bubble-sort/run
{
  "data": [5, 2, 8, 1, 9],
  "speed": 50
}

Response:
{
  "steps": [...],
  "metrics": {
    "comparisons": 10,
    "swaps": 4,
    "total_operations": 14,
    "execution_time": 2.34
  }
}
```

#### Get Recommendations
```
POST /api/ml/recommend
{
  "dataSize": 10000,
  "memory": "limited",
  "speed": "critical",
  "stability": "required"
}

Response:
[
  {
    "algorithm": "Merge Sort",
    "reason": "Stable sort with O(n log n)",
    "score": 0.95
  }
]
```

## Scalability Considerations

### Caching
- Cache dataset generations
- Memoize algorithm metadata
- Cache performance statistics

### Performance
- Use efficient data structures
- Minimize API calls
- Lazy load components

### Future
- Implement WebSocket for real-time
- Add database for persistent analytics
- Integrate actual ML models
- Horizontal scaling for backend

## Testing Strategy

### Backend
- Unit tests for algorithm correctness
- Performance benchmarks
- API endpoint testing
- Edge case handling

### Frontend
- Component unit tests
- Integration tests
- E2E visualization tests
- Responsive design testing

## Deployment

### Backend
```bash
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
npm run build
# Deploy dist/ folder to CDN/static server
```

### Docker (Future)
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
# ...

# Frontend Dockerfile  
FROM node:18-alpine as build
# ... build steps
FROM nginx:alpine
# ... serve dist/
```

---

See SETUP.md for development instructions.
