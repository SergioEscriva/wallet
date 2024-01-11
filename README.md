# Wallet

Esta aplicación pretende servir para llevar las cuentas de viaje y realizar pagos por varias personas. Al finalizar el viaje, se obtendrá ajuste de cuentas indicando quién debe dinero y a quién se le debe.

~~# Instalar [FastAPI](https://fastapi.tiangolo.com/es/)~~

~~`pip3 install "fastapi[all]`~~
# Install requirements

`pip install -r requirements.tt`

# Ejecutar aplicación

## Backend

En la carpeta `wallet_app` ejecutar el comando `uvicorn app:app --reload`

(la API se sirve en 127.0.0.1:8000)

## Frontend

En la carpeta `wallet_app/public` ejecutar el comando `python3 -m http.server --bind 127.0.0.1 9000`

(la aplicación se sirve en 127.0.0.1:9000)


