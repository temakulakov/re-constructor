#!/bin/bash

sendMessage(){
    curl -F chat_id="${1}" \
     -F parse_mode="Markdown" \
     -F disable_web_page_preview="true" \
     -F text="#constructor *${JS_VERSION}*
    Author: ${GITLAB_USER_EMAIL}
    URL: ${APP_URL}
    Branch: ${CI_COMMIT_BRANCH}
    Message: ${CI_COMMIT_MESSAGE}" \
    https://api.telegram.org/${REPORT_BOT_ID}/sendMessage
}

for chat_id in "$@"; do
    sendMessage $chat_id
done

