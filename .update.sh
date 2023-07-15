#!/bin/bash

# Setup permision
cd .. && chown -R worldsite.worldsite TeamMatchGame && cd TeamMatchGame

git config --global --add safe.directory /home/worldsite/public_html/TeamMatchGame

# Commits Local Server Production
git config pull.rebase true
git add .
git commit  -m "Server"

# Actualizar el repositorio git desde la rama en posición
git pull

# Mostrar mensaje de finalización
echo "El script se ha completado correctamente ✅"
