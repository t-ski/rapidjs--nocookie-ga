# ga (Cookie-less Google Analytics)

<a href="https://rapidjs.org"><img src="https://rapidjs.org/assets/readme-plugin-badge.svg" height="75"></a>

Providing a mechanism for cookie-less integration of Google Analytics into web documents by implicitly generating a unique, secure client ID for each user.

---

```
npm install @t-ski/rapidjs--nocookie-ga
```

---

## Concept

The plug-in uses a server-side mechanism for creating a hashed client ID for each user to be identified that is passed to the Google Analytics implementation interface. This way Analytics functionality can be used without having Google to set Cookies.

---

## Tracking ID

Define the Analytics account individual tracking ID to the property `trackingId` on the plug-in specific configuration file section.

``` js
"@t-ski/rapidjs--ga"."trackingId": <tracking-id>
```

## Calling the ga() method

To induce the outlined behavior, the plug-in implicitly calls the `ga()` method for the keys `"create"`, `"set"` and `"send"`. Any other key may explicitly be used from the public method `call()`:

#### Syntax

``` js
rapidJS["@t-ski/rapidjs--ga"].call(key, value, options = undefined)
```

#### Parameter

| Name  			     | Type			    | Description |
| ---------------------- | ---------------- | ----------- |
| **key**                | `String`         | *Key* |
| **value** `optional`   | `String, Number` | *Value* |
| **options** `optional` | `String, Number` | *Options object* |