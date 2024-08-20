#!/bin/bash

source "$(pwd)/.env.prod"

forge script "script/Hypertents.s.sol:DeployScript" -vvvv --sender="$ADMIN" --broadcast --multi --verify