DROP DATABASE IF EXISTS imagen_nam_nam;
CREATE DATABASE imagenes_recetasimagen_nam_nam;
USE imagen_nam_nam;

CREATE TABLE imagenes_recetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_recipe_id VARCHAR(255) NOT NULL,
    imagen_base64 LONGTEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_firebase_id (firebase_recipe_id)
);