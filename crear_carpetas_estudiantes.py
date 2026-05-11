import os
import unicodedata

# Lista de estudiantes actualizada desde el CSV
estudiantes = [
    {"last": "Lizarazo Antia", "first": "Camila"},
    {"last": "Murcia Ramirez", "first": "Camila Andrea"},
    {"last": "Rodriguez Rojas", "first": "Daniela Lucia"},
    {"last": "Martinez Rojas", "first": "David Santiago"},
    {"last": "Claros Polania", "first": "Eyder Alejandro"},
    {"last": "Roa Moreno", "first": "Gabriela"},
    {"last": "Sabogal Prado", "first": "Gabriela"},
    {"last": "Monsalve Sanchez", "first": "Juan David"},
    {"last": "Rojas Bejarano", "first": "Juliana"},
    {"last": "Polania Cubillos", "first": "Maria Alejandra"},
    {"last": "Pedroza Rusinque", "first": "Maria Jose"},
    {"last": "Amin Campo", "first": "Maria Sofia"},
    {"last": "Alzate Perez", "first": "Mariana"},
    {"last": "Leon Perdomo", "first": "Mariana Lucia"},
    {"last": "Verdugo Rios", "first": "Pablo Alejandro"},
    {"last": "Giraldo Giraldo", "first": "Santiago"},
    {"last": "Jaimes Arias", "first": "Sara Lucia"},
    {"last": "Tibaduiza", "first": "Sara Milena"},
    {"last": "Bustamante Peñaranda", "first": "Sara Valeria"},
    {"last": "Ramos Silva", "first": "Sofia"}
]

# Función para normalizar texto
def normalizar(texto):
    texto = unicodedata.normalize('NFD', texto)
    texto = texto.encode('ascii', 'ignore').decode('utf-8')  # elimina tildes
    texto = texto.replace('ñ', 'n')  # reemplaza ñ
    texto = texto.lower().replace(' ', '-')  # minúsculas y guiones
    return texto

# Crear carpeta principal 'estudiantes'
base_dir = 'estudiantes'
os.makedirs(base_dir, exist_ok=True)

# Crear carpetas para cada estudiante
for est in estudiantes:
    folder_name = f"{normalizar(est['last'])}-{normalizar(est['first'])}"
    path = os.path.join(base_dir, folder_name)
    os.makedirs(path, exist_ok=True)

print(f"Se han creado {len(estudiantes)} carpetas dentro de '{base_dir}'.")