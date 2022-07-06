module.exports = app => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log("\x1b[33m%s\x1b[0m", `[Started]`, "\x1b[0m", `http://localhost:${port}`)
    })
}