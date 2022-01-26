# No-Cookie Google Analytics

<a href="https://rapidjs.org"><img src="https://rapidjs.org/assets/readme-plugin-badge.svg" height="75"></a>

Cookie-less Google Analytics integration with automatic tag injection.

```
npm install @t-ski/rapidjs--nocookie-ga
```

## Concept

The Plug-in implements an automatic integration of Google Analytics (via tag) given an indivudal Tracking-ID and custom events.

## Integration

Google Analytics is automatically integrated into the Plug-in effective web pages (any by default). 

## Tracking ID

In order to associate the Analytics with an individual account, the respective Tracking-ID must be provided to the Plug-in config `trackingId` property:

``` js
"@t-ski/rapidjs--nocookie-ga"."trackingId": <tracking-id>
```

## Custom events

Usually the Analytics interface can be used from the manually assigned method `ga()`. Using the Plug-in the interface is moved to its scope.

### Scripted

To emit a custom event from a script, simply use the Plug-in scope default method mediating the normal call:

#### Syntax

``` js
rapidJS["@t-ski/rapidjs--nocookie-ga"](event, key, value = null)
```

#### Parameter

| Name  	           | Type     | Description |
| -------------------- | -------- | ----------- |
| **event**            | `String` | *Event* |
| **key**              | `String` | *Key* |
| **value** `optional` | `Any`    | *Value* |

### Configured/Serialized

Static, generelly effective events can also be configured in the Plug-in configuration file giving an event call objects array:

``` js
"@t-ski/rapidjs--nocookie-ga"."serializedEvents": [
    {
        event: "<event>",
        key: "<key>",
        value?: "<value>"
    }
]
```