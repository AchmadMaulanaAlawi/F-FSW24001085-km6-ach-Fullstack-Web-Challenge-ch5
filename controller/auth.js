const { register, login, googleLogin } = require("../usecase/auth")

exports.register = async (req, res, next) => {
  try {
    // get the body
    const { email, password, name } = req?.body

    // get the photo
    const photo = req?.files?.photo

    if (email == "" || !email) {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      })
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      })
    }
    if (name == "" || !name) {
      return next({
        message: "Name must be filled!",
        statusCode: 400,
      })
    }

    const data = await register({
      email,
      password,
      name,
      photo,
      role: "admin",
    })

    res.status(200).json({
      message: "Success",
      data,
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    // get the body
    const { email, password } = req.body

    if (email == "" || !email) {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      })
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      })
    }

    const data = await login(email, password)

    res.status(200).json({
      message: "Login success",
      data,
    })
  } catch (error) {
    next(error)
  }
}

exports.googleLogin = async (req, res, next) => {
  try {
    // get the body
    const { access_token } = req.body

    if (!access_token) {
      return next({
        statusCode: 400,
        message: "Access token must be provided!",
      })
    }

    // login with google logic
    const data = await googleLogin(access_token)

    res.status(200).json({
      message: "Success",
      data,
    })
  } catch (error) {
    next(error)
  }
}

exports.profile = async (req, res, next) => {
  try {
    // get user by id
    const data = req.user

    res.status(200).json({
      message: "Success",
      data,
    })
  } catch (error) {
    next(error)
  }
}
