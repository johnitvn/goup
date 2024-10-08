echo "======================================"
echo "=             GOUP DEVCONTAINER       ="
echo "======================================"
echo "Container started!"

#!/bin/sh
echo "Starting docker daemon"

# Start Docker daemon
dockerd&

# Wait until Docker socket is available
while [ ! -S /var/run/docker.sock ]; do
  sleep 1
done


# Now execute any additional commands
exec "$@"
