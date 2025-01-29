import tracer from "dd-trace";

tracer.init({
  service: process.env.DD_SERVICE || "products-postgres",
  env: process.env.DD_ENV || "development",
  version: process.env.APP_VERSION || "1.0.0",
  logInjection: true,
  runtimeMetrics: true,
  sampleRate: 1.0,
  profiling: true,
});

export default tracer;