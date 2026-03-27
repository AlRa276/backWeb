import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import imageRoutes from './routers/imageRoutes.js';


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use('/api/imagenes', imageRoutes);
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡API de Ñam Ñam conectada y funcionando! 🚀');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});