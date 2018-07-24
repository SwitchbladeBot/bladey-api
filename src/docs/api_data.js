define({ "api": [
  {
    "type": "get",
    "url": "/contributors",
    "title": "Request all Switchblade contributors",
    "name": "GetContributors",
    "group": "Contributors",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "roles",
            "description": "<p>Contributor roles and all members that are in them, ordered from top to bottom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"roles\": [\n    \"id\": \"445204054168174602\",\n    \"name\": \"Back-end Developers\",\n    \"members\": [\n      (...)\n    ]\n  ], [\n    (...)\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/contributors.js",
    "groupTitle": "Contributors"
  },
  {
    "type": "get",
    "url": "/guilds/members/:guildId",
    "title": "Request guild member count",
    "name": "GetGuildMemberCount",
    "group": "Guilds",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guildId",
            "description": "<p>Guild ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Guild Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>Guild Icon URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "members",
            "description": "<p>Current members that guild has</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Guild Name\",\n  \"icon\": \"Guild Icon URL\",\n  \"members\": 350\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GuildNotFound",
            "description": "<p>Guild not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Guild not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/guilds.js",
    "groupTitle": "Guilds"
  }
] });
