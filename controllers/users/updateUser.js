const createHttpError = require('http-errors');
const User = require('../../models/User.js');


async function updateUser(body, user) {


        console.log({ user }, { body });
        // const allowedFeilds = ["firstName", "lastName", "age", "phoneNumber"];
        // const updates = {};
        // allowedFeilds.forEach((feild) => {
        //     // console.log(body[feild]);
        //     if (body[feild] !== undefined) {
        //         updates[feild] = body[feild];
        //     }
        // })
        // console.log({ updates })
        // if (Object.keys(updates).length === 0) {
        //     throw new createHttpError(422, "No feilds to be updated is provided in the request body");
        // }
        const updatedUser = await User.findByIdAndUpdate(user._id, { $set: body }, { new: true, runValidators: true });
        console.log(updatedUser);
        return updatedUser;
 
}
module.exports = updateUser;

