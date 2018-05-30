# `perj` Example Directory

Find examples here that can get you started using the [perj](https://github.com/grantcarthew/node-perj) logger within your project.

## Important Notes

* These are not best practise. Use them as suggestions on how to get started.
* Documentation for each example is in the header of the `js` files.
* Files titled `stdin` do not use `perj` and expect you to pipe logs into the process.
* The `app` directory expects you to pipe `stdout` into a `stdin` module.
* Customize these in your project.


## File List

### [app Directory](/examples/app/README.md)

This example shows how you could integrate `perj` into a simple web application running on [express.js](https://expressjs.com/).

### [browser-simple.js](/examples/browser-console-full.js)

A great starting place for client side console logging.

### [node-colourful.js](/examples/node-colourful.js)

A full detail console log output including colourful properties and formatted data.

### [node-file.js](/examples/node-file.js)

A full detail console log output including formatted data. Raw JSON log data is sent to file.

### [node-simple.js](/examples/node-simple.js)

A full detail console log output including formatted data.

### [node-stdin-file.js](/examples/node-stdin-file.js)

Saves `standard input` to a rotating log file.

### [node-stdin-gcp.js](/examples/node-stdin-gcp.js)

Saves `standard input` to a rotating log file and uploads the completed file to a Google Cloud Platform Cloud Storage bucket.

### [util-log-generator.js](/examples/util-log-generator.js)

This is a utility module to generate log data.



