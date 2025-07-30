import { SuccessMessage } from "./SuccessMessage";

export const PaymentFailed = () => {
  
  return (
    <>
      <div>
        <SuccessMessage
          heading="Failed !"
          message="Your transaction is  Failed, But You  have the Free Plan !"
        />
      </div>
    </>
  );
};
