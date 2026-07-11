import {
  createReservation,
  cancelReservation,
  getCapacityData,
  getMyReservations,
} from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  try {
    const data = await createReservation(req.user, req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {

    try {

        const result = await cancelReservation(
            req.user,
            req.params.id
        );

        res.json(result);

    }
    catch(error){

        res.status(400).json({
            message:error.message
        })

    }

}

export const getCapacity = async (req,res)=>{

    try{

        const data=await getCapacityData();

        res.json(data);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        })

    }

}

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await getMyReservations(req.user);

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};