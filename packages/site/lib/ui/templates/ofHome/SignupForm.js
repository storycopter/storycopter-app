import {} from "prop-types";
import React from "react";

import { Helmet, Layout } from "ui/partials";

const SignupForm = props => {
  return (
    <>
      <form
        action="https://storycopter.us20.list-manage.com/subscribe/post?u=5ebc4c99bea21505d9e8e506f&amp;id=7b7e05f45f"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll">
          <label htmlFor="mce-EMAIL">Email </label>
          <input
            type="email"
            value=""
            name="EMAIL"
            className="required email"
            id="mce-EMAIL"
          />

          <label htmlFor="mce-NAME">Name </label>
          <input type="text" value="" name="NAME" className="" id="mce-NAME" />

          <label>Marketing Permissions</label>
          <p>
            Please select all the ways you would like to hear from Storycopter:
          </p>
          <fieldset
            className="mc_fieldset gdprRequired mc-field-group"
            name="interestgroup_field"
          >
            <label className="checkbox subfield" htmlFor="gdpr_8591">
              <input
                type="checkbox"
                id="gdpr_8591"
                name="gdpr[8591]"
                value="Y"
                className="av-checkbox "
              />
              <span>Email</span>{" "}
            </label>
          </fieldset>
          <p>
            You can unsubscribe at any time by clicking the link in the footer
            of our emails. For information about our privacy practices, please
            visit our website.
          </p>
          <p>
            We use Mailchimp as our marketing platform. By clicking below to
            subscribe, you acknowledge that your information will be transferred
            to Mailchimp for processing.{" "}
            <a href="https://mailchimp.com/legal/" target="_blank">
              Learn more about Mailchimp's privacy practices here.
            </a>
          </p>
          <div
            className="response"
            id="mce-error-response"
            style="display:none"
          />
          <div
            className="response"
            id="mce-success-response"
            style="display:none"
          />
          <div style="position: absolute; left: -5000px;" aria-hidden="true">
            <input
              type="text"
              name="b_5ebc4c99bea21505d9e8e506f_7b7e05f45f"
              tabIndex="-1"
              value=""
            />
          </div>
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="button"
          />
        </div>
      </form>
    </>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
