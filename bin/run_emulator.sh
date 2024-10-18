export GOOGLE_APPLICATION_CREDENTIALS="~/.cache/downloads/x-test-firebase-emulator-firebases.json"

IMPORT_DIR=/tmp/firebase/emulators/import/x-test-firebase-emulator
[ ! -d $IMPORT_DIR ] && mkdir -p $IMPORT_DIR
firebase emulators:start --import=$IMPORT_DIR --export-on-exit