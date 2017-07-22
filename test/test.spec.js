// During the test the env variable is set to test

if (process.env.NODE_ENV !== 'test') {
  console.error('\nWarning! You are attempting to run test using non-test ENV. Set your NODE_ENV to test')
} else {
  require('./models/advice.spec')
  require('./controllers/main.controller.spec')
}
