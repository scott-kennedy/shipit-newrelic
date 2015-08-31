# shipit-newrelic

[Shipit](https://github.com/shipitjs/shipit) plugin for notifying [New Relic](http://newrelic.com/) about your deploy.  Defaults to using [shipit-deploy](https://github.com/shipitjs/shipit-deploy) events.

**Features:**

- Basic announce to New Relic

## Install

```
No install yet, sorry.
```

## Usage

### Example `shipitfile.js`

```js
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: '/tmp/deploy_to',
      repositoryUrl: 'https://github.com/user/repo.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '/path/to/key',
      shallowClone: true
    },
    staging: {
      servers: 'user@myserver.com'
      newrelic: {
        applicationId: '<my_new_relic_application_id>',
        apiKey: '<my_new_relic_api_key>'
      }
    }
  });
};
```

To deploy on staging, you must use the following command :

```
shipit staging deploy
```

You can rollback to the previous releases with the command :

```
shipit staging rollback
```

## Options

### applicationId

Type: `String`
(Either applicationId or applicationName is required)

Your New Relic application id.

### applicationName 

Type: `String`
(Either applicationId or applicationName is required)

New Relic application name

### apiKey

Type: `String`

New Relic API Key

## Dependencies

### Local

- git 1.7.8+

## License

MIT