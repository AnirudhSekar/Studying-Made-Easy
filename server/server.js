const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const {spawn} = require("child_process")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors({origin:"*"}))

const executePython = async (script, args)=> {
  const arguments = args.map(arg => arg.toString())
  const py = spawn("python", [script, ...arguments])
  const result = await new Promise((resolve, reject) => {
    let output;
    py.stdout.on("data", (data) => {
      output = data.toString()
    })
    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured: ${data}`)
      reject(`Error occured in ${script}`)
    })
    py.on("exit", (code) => {
      console.log(`Child process exited with code ${code}`)
      resolve(output)
    })
  })
  return result
}
app.post("/llm", async (req,res) => {
  try {
    console.log(req.body)
    const result = await executePython("python/llm.py", ["Hey", "Nothing"])
    res.json({"result":result})
  } catch (error) {
    res.status(500).json(error)
  }
})

app.listen(4242, () => console.log('Running on port 4242'));