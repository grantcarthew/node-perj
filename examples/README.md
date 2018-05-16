# `perj` Example Directory

Find example files here that can get you started using the [perj](https://github.com/grantcarthew/node-perj) logger within your project.

* [File Namimg Standard](#file-naming-standard)
  * [env](#env)
  * [type](#type)
  * [platform](#platform)
  * [target](#target)
  * [detail](#detail)
* [File List](#file-list)

## File Naming Standard

The files within the `examples` directory follow this naming standard:

[env]-[type]-[platform]-[target]-[detail]

### env

* dev: Development Environment.
  * May be used in production however there are probably better options.
* prod: Production Environment.
* both: Can be used for both development and production environments.

### type

* inprocess: Logging is running within the application process.
* stdin: Logging data is passed from stdout to stdin.
* util: A utility file for tooling.

### platform

* node: Node.js only.
* browser: Browser client only.
* both: Both Node.js and Browser.

### target

The example will output JSON messages to:

* console: The JavaScript console.
* file: A local log file.
* gcp: The Google Cloud Platform.
* aws: Amazon Web Services.
* azure: Microsoft Azure.

### detail

Any extra notes or labels to explain the use of the example.

### File Name Example

dev-inprocess-both-console-slim.js

Development environment that supplies a `write` function to `perj` so that the messages can be processed in the application. It supports both the browser and Node.js and outputs to the console. It described as a slim output.

## File List




