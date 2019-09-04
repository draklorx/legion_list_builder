# Legion List Builder

A list builder/point calculator for Star Wars Legion from Fantasy Flight Games.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Install [NodeJS 10.16.3 or latest LTS build](http://www.nodejs.org)

Install [NativeScript](https://docs.nativescript.org/start/quick-setup#full-setup)

Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

```

### Installing

A step by step series of examples that tell you how to get a development env running

Install the above pre-requisites.

```
Follow download/installation guides above for installing pre-reqs
```

Clone the repository.

```
git clone https://github.com/draklorx/legion_list_builder.git
```

Install other pre-reqs using npm.

```
npm install
```

Install NativeScript CLI

```
npm install -g nativescript
```

If you use the full setup scripts from NativeScript you should be good to go, if not you should manually install Android SDK

```
IF NECESSARY: (see above) download and install Android SDK: https://developer.android.com/studio
```

Either run an emulator or hook up your dev enabled android phone via USB:

```
Setup [emulator](https://docs.expo.io/versions/latest/workflow/android-studio-emulator/)
OR
Enable [developer options/debugging on device](https://developer.android.com/studio/debug/dev-options)
```

Setup environment variables. Email kierheyl@gmail.com for an API key.

```
copy src/environments/environment.default.ts src/environment.ts
edit environment.ts to setup API keys
```

Run the application in debug mode using the native script cli. NOTE: The first compilation of the code can take 10 minutes or longer.

```
tns debug android
```

## TODO Running the tests

Explain how to run the automated tests for this system

### TODO Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

To validate code is up to standards run:

```
npm run ci.tslint
```

To beautify code using prettier run:

```
npm run prettier
```

## TODO Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [NativeScript](http://www.nativescript.org/) - The android/iOS transpiler/framework
* [Angular 8](http://www.angular.io) - The framework to build the application
* [NPM](https://nodejs.org/) - Dependency Management
* [FontAwesome](https://fontawesome.com) - Icons
* [Contentful](https://www.contentful.com/) - External data API

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## TODO Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Kier Heyl** - *Initial work* - [draklorx](https://github.com/draklorx)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## TODO License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Font from Derek Vogelpohl of [ShyFoundry](https://www.shyfoundry.com/).
