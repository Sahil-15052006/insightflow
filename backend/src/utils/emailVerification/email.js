const {Resend} = require('resend')
const Email = require('../../models/emailModel')
const argon = require('argon2')
const Users = require('../../models/userModel')
require('dotenv').config()

const sendOTP = async(email,verificationId) =>{
  try{
    const otp = Math.floor(100000 + Math.random() * 900000)
    // console.log(otp)
    const hashedOTP = await argon.hash(otp.toString())
    // console.log(hashedOTP)
    const isEmailExist = await Email.findOne({email})
    // console.log(isEmailExist)
    if(isEmailExist){
      await Email.findOneAndDelete({email})
    }

    const {newEmail,Error} = await Email.insertOne({
      verificationId:verificationId,
      email:email,
      otp:hashedOTP,
      expiresAt:new Date(Date.now() + 10 * 60 * 1000)
    })

    // console.log(newEmail)

    const resend = new Resend(process.env.RESEND_API)
    // console.log(resend)
    
    const {data,error} = await resend.emails.send({
      from:'Insightflow <otp@sahilsawant.tech>',
      to: email,
      subject: 'OTP for Insightflow Email Verification',
      html: `<p>Please verify your email to activate your Insightflow account./n<strong>OTP : </strong> ${otp}</p>`
    })

    // console.log(data)
    if(error){
      console.log(error)
    }

    return true
  } catch(err){
    return err
  }

}

const verifyOTP = async(verificationId,otp)=>{
  const user = await Users.findOne({verificationId:verificationId})
  if (!user) return ('User not registerd')
  const emailDoc = await Email.findOne({verificationId:verificationId})
  if (Date.now()>emailDoc.expiresAt.getTime()) return ("OTP Expired")
  const isOTPvalid = await argon.verify(emailDoc.otp,otp)
  if (isOTPvalid) {
    const updateUserIsVerifiedStatus =  await Users.findOneAndUpdate(
      {verificationId},
      {isVerified : isOTPvalid},
      {
        returnDocument:'after'
      }
    )
    await Email.findOneAndDelete({verificationId : verificationId})
  }
  return isOTPvalid
}

module.exports = {sendOTP,verifyOTP}
