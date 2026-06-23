## Frontend

*Install bun on your system*
```
# MacOS/Linux
curl -fsSL https://bun.com/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1|iex"
```

*Go to frontend folder*
```
cd frontend/app/
```

*Install dependencies*
```
bun install
```

*Run local development server*
```
bun run dev
```

## Backend

*Install [pyenv](https://github.com/pyenv/pyenv) (for ease of mind to managing local python version)*
```
# MacOS/Linux
curl -fsSL https://pyenv.run | bash

# Windows
*Read docs about windows install*
```

*Go to backend folder*
```
cd backend/
```

*Set local pyenv*
```
pyenv local 3.12.0
```

*Create venv folder*
```
python3 -m venv env
```

*Activate venv (don't install packages unless your venv is activated)*
```
source env/bin/activate
```

*Install the requirements.txt*
```
pip install -r requirements.txt
```

*Start backend server*
```
uvicorn app.main:app --reload
```