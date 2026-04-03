spectre-frontend/
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
│
├── .env
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── api/
│   │   ├── index.ts          # API client wrapper
│   │   ├── auth.ts           # /auth/login, /auth/signup
│   │   ├── posts.ts          # /posts/create, /posts/list
│   │   ├── comments.ts       # /comments/create
│   │   ├── friends.ts        # /friends/add
│   │   ├── ads.ts            # /ads/list
│   │   └── devices.ts        # /devices/register
│   │
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── PostComposer.tsx
│   │   ├── CommentBox.tsx
│   │   ├── AddFriend.tsx
│   │   ├── AdsPanel.tsx
│   │   └── Navbar.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx          # Feed + ads + post composer
│   │   ├── Profile.tsx       # User profile page
│   │   ├── Friends.tsx       # Friend list + add friend
│   │   ├── PostDetail.tsx    # Post + comments
│   │   └── LoginPage.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx   # JWT + user session
│   │   └── UIContext.tsx     # Theme, modals, etc.
│   │
│   ├── hooks/
│   │   ├── useAuth.ts        # Auth helper hook
│   │   ├── useApi.ts         # Auto‑inject token into API calls
│   │   └── useAds.ts         # Ads fetching logic
│   │
│   ├── utils/
│   │   ├── response.ts       # Standardized error handling
│   │   ├── validators.ts     # Input validation
│   │   └── storage.ts        # LocalStorage helpers
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   │
│   └── assets/
│       ├── logo.svg
│       └── icons/
│
└── public/
    └── favicon.ico



npm create vite@latest spectre-frontend -- --template react-ts
cd spectre-frontend
npm install


npm install --save-dev @types/react @types/react-dom


npm run dev


http://localhost:5173


