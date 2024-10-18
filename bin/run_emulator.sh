export GOOGLE_APPLICATION_CREDENTIALS="~/.cache/downloads/x-test-firebase-emulator-firebases.json"
if [ $GOOGLE_APPLICATION_CREDENTIALS ];
  unset GOOGLE_APPLICATION_CREDENTIALS
then

IMPORT_DIR=/tmp/firebase/emulators/import/firebase-app-x-x-x
[ ! -d $IMPORT_DIR ] && mkdir -p $IMPORT_DIR
firebase emulators:start --import=$IMPORT_DIR --export-on-exit