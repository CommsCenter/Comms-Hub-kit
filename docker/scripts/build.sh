# short-lived (from host) "comms-hub build"
# long-lived (from container) "sh /var/www/build.sh"
# long-lived (from container) "hub-build"

# first discover, then rebuild all, one by one

webpack --config=/var/www/webpack.config.js \
--env SHARE_TYPE=$1 \
--env SHARE_VENDOR=$2 \
--env SHARE=$3 \
--env WD=$4 \
&& echo "$1 $2 $3 successfully built in $4"
