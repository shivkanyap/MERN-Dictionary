const express=require('express')
const router=express.Router()
const {dicRouter} = require('../app/controllers/dicController')
// const {usersRouter}=require('../app/controllers/UserController')
// const {reservationsRouter}=require('../app/controllers/ReservationController')

router.use('/word',dicRouter)
// router.use('/reservation',reservationsRouter)

module.exports={
    routes:router
}