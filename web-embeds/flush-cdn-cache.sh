curl -X POST \
  https://purge.jsdelivr.net/ \
  -H 'content-type: application/json' \
  -d '{
        "path": [
          "/npm/@apollosproject/apollos-embeds@latest/widget/index.js",
          "/npm/@apollosproject/apollos-embeds@latest/widget/index.css",
          "/npm/@apollosproject/apollos-embeds"
        ]
      }'
