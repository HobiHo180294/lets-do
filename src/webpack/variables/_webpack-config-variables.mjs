// Mode variables
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const prodMode = !devMode;

export { mode, devMode, target, devtool, prodMode };
