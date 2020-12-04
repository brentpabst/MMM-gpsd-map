# MMM-gpsd-map

Magic Mirror module that displays GPS information on a map by listening to MMM-gpsd notifications.

_Note: Requires your Magic Mirror to already have [MMM-gpsd](https://github.com/brentpabst/MMM-gpsd) installed._

## Screenshot

...

## Install

1. In your terminal, change to your Magic Mirror module directory

`cd ~/MagicMirror/modules`

2. Clone the repo

`git clone https://github.com/brentpabst/MMM-gpsd-map.git`

3. Make changes to MagicMirror `config.js` file

## Configuration

As with other Magic Mirror modules, load the module using a standard configuration array object.

```
modules:[
  {
    module: 'MMM-gpsd-map',
    position: "top_left",
      config: {
        //See 'Configuration options' for more information.
        ...
      }
  },
]
```

### Options

| Option          | Description                                             | Default                                              |
| --------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| `header`        | The header text to display                              | `GPS Details`                                        |
| `width`         | The width of the map displayed                          | `150px`                                              |
| `height`        | The height of the map displayed                         | `100px`                                              |
| `tileServerUrl` | The tile server to use when rendering the map           | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` |
| `maxZoom`       | The maximum map zoom to use when following the position | `15`                                                 |
| `dynamicZoom`   | The map will zoom in/out based on speed                 | `true`                                               |
