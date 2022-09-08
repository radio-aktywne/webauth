#!/bin/sh

until [ -f /etc/certs/ca.pem ]; do
  echo "Waiting for certificates..."
  sleep 1
done

cat /etc/certs/ca.pem >>/etc/ssl/certs/ca-certificates.crt

export NODE_EXTRA_CA_CERTS=/etc/certs/ca.pem

node server.js
