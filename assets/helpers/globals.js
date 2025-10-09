let GLOBAL;
if (process.env.NODE_ENV === 'production') {
    GLOBAL = {
        server: 'https://api.example.com/XX3PROJECT',
    }
} else {
    GLOBAL = {
        server: 'http://localhost:23000/XX3PROJECT',
    }
}