#!/bin/bash

# To make it possible to read our TextMate grammar we replace {NAME} with the full Dylan
# NAME regular expression with this script.

# Note that & is escaped to prevent sed from treating it specially.
dir=$(dirname $0)
cat ${dir}/dylan.tmLanguage.template.json \
    | sed 's,NAME,(?i:[a-z]|[0-9]+[a-z][a-z]|[!\&*<>|^$%@_]+[a-z])[-+~?/=!\&*<>|^$%@_a-z0-9]*,g' \
          > ${dir}/dylan.tmLanguage.json
