const api = require("../api")

module.exports = (app) => {
  console.log("\x1b[36m%s\x1b[0m", `[loading api]`, "\x1b[0m", `${api}`)
  api.forEach((router) => {
    app.use("/api", require(`../api/${router}`))
  })
}
