interface Update {
  update: String,
  payload: {}
}

interface Result {
  status: boolean,
  update?: Update,
  msg?: String,
  error?: unknown,
}

export default Result
