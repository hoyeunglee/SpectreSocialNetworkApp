spectre-backend/
  package.json
  /db
    aurora.js
    neptune.js
  /handlers
    auth.js
    posts.js
    comments.js
    friends.js
    ads.js
    graph-sync.js
    devices.js
  /utils
    jwt.js
    response.js


npm init -y
npm install aws-sdk pg gremlin bcryptjs jsonwebtoken uuid


LAMBDA ENVIRONMENT VARIABLES

AURORA_HOST=
AURORA_USER=
AURORA_PASSWORD=
AURORA_DB=

NEPTUNE_ENDPOINT=wss://your-neptune-endpoint:8182/gremlin

JWT_SECRET=