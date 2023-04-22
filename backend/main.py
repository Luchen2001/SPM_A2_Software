import subprocess
import sys

def main():
    #fastapi_server = subprocess.Popen(["uvicorn", "fastapi_server:app", "--reload"])
    fastapi_server = subprocess.Popen(["uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8000", "--reload"])

    try:
        fastapi_server.wait()
    except KeyboardInterrupt:
        fastapi_server.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()