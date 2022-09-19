import {
  PaymentInfoMutationHandler,
  PaymentInfoQueryHandler,
} from "../routes/GqlPaymentInfoHandler";

//Mongo DB
export default {
  Query: {},
  Mutation: {
    addPaymentInfo: (_: any, args: any, context: any, info: any) => {
      if (!context._id || args.userId !== context._id.toString()) {
        //For authrization
        return {
          message: "Unauthorized",
          statusCode: 401,
        };
      }
      try {
        return PaymentInfoMutationHandler.addPaymentInfo(args);
      } catch (error) {
        console.log(`Error -------> ${error}`);
        return error;
      }
    },
    getPaymentInfoList: (_: any, args: any, context: any, info: any) => {
      if (!context._id || args.userId !== context._id.toString()) {
        //For authrization
        return {
          message: "Unauthorized",
          statusCode: 401,
        };
      }
      try {
        return PaymentInfoMutationHandler.getPaymentInfoList(args);
      } catch (error) {
        console.log(`Error -------> ${error}`);
        return error;
      }
    },
<<<<<<< HEAD

    editPaymentInfo: (_: any, args: any, context: any, info: any) => {
      if (!context._id || args.userId !== context._id.toString()) {
        //For authrization
        return {
          message: "Unauthorized",
          statusCode: 401,
        };
      }
      try {
        return PaymentInfoMutationHandler.editPaymentInfo(args);
      } catch (error) {
        console.log(`Error -------> ${error}`);
        return error;
      }
    },
=======
>>>>>>> 04bf28353fb2f2908b86955f0990e57191bec689
  },
};
