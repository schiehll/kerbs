const address = require('address')
const url = require('url')
const chalk = require('chalk')
const clearConsole = require('react-dev-utils/clearConsole')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')

const isInteractive = process.stdout.isTTY

function prepareUrls(protocol, host, port) {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '/'
    })
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname: '/'
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'
  let prettyHost, lanUrlForConfig, lanUrlForTerminal
  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip()
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig
          )
        ) {
          // Address is private, format it for later use
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost)
  const localUrlForBrowser = formatUrl(prettyHost)
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser
  }
}

function printInstructions(urls) {
  console.log()
  console.log(`You can now go write some docs.`)
  console.log()

  if (urls.lanUrlForTerminal) {
    console.log(
      `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`
    )
    console.log(
      `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`
    )
  } else {
    console.log(`  ${urls.localUrlForTerminal}`)
  }
}

function createCompiler({ config, devSocket, urls, webpack }) {
  let compiler
  try {
    compiler = webpack(config)
  } catch (err) {
    console.log(chalk.red('Failed to compile.'))
    console.log()
    console.log(err.message || err)
    console.log()
    process.exit(1)
  }

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole()
    }
    console.log('Compiling...')
  })

  let isFirstCompile = true
  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.hooks.done.tap('done', async stats => {
    if (isInteractive) {
      clearConsole()
    }

    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true
    })

    const messages = formatWebpackMessages(statsData)
    const isSuccessful = !messages.errors.length && !messages.warnings.length
    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'))
    }
    if (isSuccessful && (isInteractive || isFirstCompile)) {
      printInstructions(urls)
    }
    isFirstCompile = false

    // If errors exist, only show errors.
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1
      }
      console.log(chalk.red('Failed to compile.\n'))
      console.log(messages.errors.join('\n\n'))
      return
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'))
      console.log(messages.warnings.join('\n\n'))
    }
  })

  return compiler
}

module.exports = {
  createCompiler,
  prepareUrls
}
