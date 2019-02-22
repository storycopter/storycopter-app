import {} from "prop-types";
import React, { useState } from "react";

import {
  Action,
  Checkbox,
  Form,
  FormItem,
  Input,
  Label
} from "@storycopter/styleguide";

const SignupForm = props => {
  const [email, setEmail] = useState("");

  const formData = {
    email: "",
    gdpr: false
  };

  return (
    <Form
      action="https://storycopter.us20.list-manage.com/subscribe/post?u=5ebc4c99bea21505d9e8e506f&amp;id=7b7e05f45f"
      id="mc-embedded-subscribe-form"
      method="post"
      name="mc-embedded-subscribe-form"
      noValidate
      target="_blank"
    >
      <FormItem>
        <Label htmlFor="mce-EMAIL">Email</Label>
        <Input
          id="mce-EMAIL"
          name="EMAIL"
          onChange={e => setEmail(e.target.value)}
          required
          type="email"
        />
      </FormItem>

      <FormItem>
        <Label htmlFor="mce-NAME">Name</Label>
        <Input id="mce-NAME" name="NAME" type="text" />
      </FormItem>

      <Label>Marketing Permissions</Label>
      <p>Please select all the ways you would like to hear from Storycopter:</p>
      <fieldset name="interestgroup_field">
        <Label htmlFor="gdpr_8591">
          <Checkbox id="gdpr_8591" name="gdpr[8591]" value="Y" />
          <span>Email</span>
        </Label>
      </fieldset>
      <p>
        You can unsubscribe at any time by clicking the link in the footer of
        our emails. For information about our privacy practices, please visit
        our website.
      </p>
      <p>
        We use Mailchimp as our marketing platform. By clicking below to
        subscribe, you acknowledge that your information will be transferred to
        Mailchimp for processing.{" "}
        <a href="https://mailchimp.com/legal/" target="_blank">
          Learn more about Mailchimp’s privacy practices here.
        </a>
      </p>
      <input
        name="b_5ebc4c99bea21505d9e8e506f_7b7e05f45f"
        style={{
          position: "absolute",
          left: "-5000px",
          ariaHidden: "true"
        }}
        tabIndex="-1"
        type="text"
      />
      <Action as="input" name="subscribe" type="submit" value="Subscribe" />
    </Form>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
