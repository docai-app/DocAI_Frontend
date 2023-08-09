import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // baseUrl:'http://localhost:1234',
        setupNodeEvents(on, config) {
            // implement node event listeners here

            // code coverage
            require('@cypress/code-coverage/task')(on, config)
            // include any other plugin code...
      
            // It's IMPORTANT to return the config object
            // with any changed environment variables
            return config

        }
    }
});
