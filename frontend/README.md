```
shacl-validator-frontend/
│
├── public/
│   ├── index.html           # Main HTML file
│   └── assets/              # Folder for static assets (images, etc.)
│
├── src/
│   ├── App.js               # Main application component
│   ├── App.css              # Styles for the application
│   ├── index.js             # Entry point for the React application
│   ├── components/          # Folder containing all reusable components
│   │   ├── NavBar.js        # Navigation bar component
│   │   ├── Validator.js      # File upload and validation component
│   │   ├── FileUpload.js     # Component for uploading files
│   │   ├── FileResponse.js    # Component for displaying validation responses
│   │   ├── ReportDashboard.js  # Component for displaying validation reports
│   │   ├── ErrorGrid.js       # Component for displaying validation errors in a grid
│   │   └── DropZone.js        # Drag-and-drop file upload component
│   │
│   ├── context/              # Context API for managing global state
│   │   └── FileContext.js    # Context for file uploads and validation state
│   │
│   └── assets/               # Folder for other assets like images
│       └── rdf-grapher.png    # Sample image used in the application
│
├── package.json              # Project dependencies and scripts
└── README.md                 # This README file
```