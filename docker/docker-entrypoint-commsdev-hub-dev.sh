#!/bin/bash
set -e

# ls -la /var/www/
# ls -la /var/www/html/

if test ! $1
then

  echo "Running bash"
  bash

elif test $1 = 'serve'
then

  echo "Running serve"

  # no params
  sh /var/www/serve.sh
  exit 0

elif test $1 = 'preview'
then

  echo "Running preview"

  # no params
  sh /var/www/preview.sh
  exit 0

elif test $1 = 'build'
then

  echo "Running build"
  # vendor type share
  sh /var/www/build.sh $2 $3 $4 $5
  exit 0

else

  echo "Invalid command"
  echo $1
  exit 1

fi
