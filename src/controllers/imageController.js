import pool from '../config/db.js';

//GUARDAR IMAGEN
export const saveImage = async (req, res) => {
    try {
        const { firebase_recipe_id, imagen_base64 } = req.body;

       
        if (!firebase_recipe_id || !imagen_base64) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        const query = 'INSERT INTO imagenes_recetas (firebase_recipe_id, imagen_base64) VALUES (?, ?)';
        

        const [result] = await pool.query(query, [firebase_recipe_id, imagen_base64]);

        res.status(201).json({ 
            message: 'Imagen guardada con éxito en MySQL', 
            id: result.insertId 
        });

    } catch (error) {
        console.error('Error al guardar la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// VER IMAGEN
export const getImage = async (req, res) => {
    try {
       
        const { firebaseId } = req.params;

        const query = 'SELECT imagen_base64 FROM imagenes_recetas WHERE firebase_recipe_id = ?';
        const [rows] = await pool.query(query, [firebaseId]);

       
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }

        res.status(200).json({ imagen_base64: rows[0].imagen_base64 });

    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// ACTUALIZAR 
export const updateImage = async (req, res) => {
    try {
        const { firebaseId } = req.params;     // Obtenemos el ID de la URL
        const { imagen_base64 } = req.body;    // Obtenemos la nueva imagen del cuerpo

        if (!imagen_base64) {
            return res.status(400).json({ error: 'Falta la nueva imagen' });
        }

        const queryUpdate = 'UPDATE imagenes_recetas SET imagen_base64 = ? WHERE firebase_recipe_id = ?';
        const [result] = await pool.query(queryUpdate, [imagen_base64, firebaseId]);

        // Si affectedRows es 0, significa que la receta no tenía imagen previa en MySQL
        if (result.affectedRows === 0) {
            const queryInsert = 'INSERT INTO imagenes_recetas (firebase_recipe_id, imagen_base64) VALUES (?, ?)';
            await pool.query(queryInsert, [firebaseId, imagen_base64]);
            return res.status(201).json({ message: 'Imagen insertada (no existía previamente)' });
        }

        res.status(200).json({ message: 'Imagen actualizada con éxito' });

    } catch (error) {
        console.error('Error al actualizar la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

//BORRAR IMAGEN
export const deleteImage = async (req, res) => {
    try {
        const { firebaseId } = req.params;

        const query = 'DELETE FROM imagenes_recetas WHERE firebase_recipe_id = ?';
        const [result] = await pool.query(query, [firebaseId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No se encontró la imagen para borrar' });
        }

        res.status(200).json({ message: 'Imagen eliminada correctamente de MySQL' });

    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};