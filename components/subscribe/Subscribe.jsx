"use client";
import { SubscribeForm } from "./SubscribeForm";
import style from "./subscribe.module.css";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import toast, { Toaster } from "react-hot-toast";

function Subscribe() {
  const key = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
  const listId = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID;
  const postUrl = `https://townshipone.us8.list-manage.com/subscribe/post?u=${key}&id=${listId}`;

  return (
    <>
      <div className={style.subscribe_section}>
        <div className="container">
          <div className={style.inner_subscribe}>
            <div className="row">
              <div className="col-md-6">
                <div className={style.subscribe_left}>
                  <h3>Subscribe to our Mail</h3>
                  <p>
                    Stay updated with the freshest promotions, sales, discounts,
                    restaurant menu updates, events, and more! Simply enter your
                    email address below to receive the latest news firsthand.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <MailchimpSubscribe
                  url={postUrl}
                  render={({ subscribe, status, message }) => (
                    <>
                      <SubscribeForm
                        onValidated={(formData) => subscribe(formData)}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default Subscribe;
