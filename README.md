```
meteor create --bare <directoryName>
meteor npm install --save vue
meteor add static-html akryum:vue-component akryum:vue-router2
meteor npm install --save vue-meteor-tracker
meteor add akryum:vue-sass vue-pug
meteor add aldeed:collection2@3.0.0
meteor npm install --save simpl-schema
```

follow https://github.com/NitroBAY/meteor-service-worker


# For accounts
```
meteor add accounts-base
meteor add accounts-password
meteor npm install --save bcrypt

meteor shell
Accounts.createUser(options, [callback])
```
