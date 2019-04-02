import {} from "prop-types";
import React from "react";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";

import { color, font } from "@storycopter/styleguide/src/config";
import { setSpace, setType } from "@storycopter/styleguide/src/mixins";
import {
  Button,
  Checkbox,
  Form,
  FormItem,
  Input,
  Label
} from "@storycopter/styleguide";

import { Helmet, Layout } from "ofTemplates";

const SignupPitch = styled.div`
  .hackhide {
    left: -5000px;
    position: absolute;
  }
  & > h1 {
    ${setType("xh")};
    font-family: ${font.serif};
    font-weight: 800;
  }
  & > h2 {
    ${setType("h")};
  }
  & > p {
    ${setSpace("mts")};
    ${setType("h")};
    font-weight: 300;
  }
  p.Footnotes {
    ${setSpace("mvl")};
    ${setType("x")};
    font-weight: 300;
    color: ${color.mono600};
  }
  ${Form} {
    ${setSpace("mvh")};
    ${setType("s")};
  }
`;

const HomeTpl = props => {
  return (
    <>
      <Helmet {...props} title="Preparing for take off" />
      <Layout {...props}>
        <SignupPitch>
          <h1>Storycopter</h1>
          <h2>
            A new interactive documentary production suite for the Web is
            preparing for take off. Sign up to ensure it never drops off your
            radar.
          </h2>
          <p />
          <Form
            action="https://storycopter.us20.list-manage.com/subscribe/post?u=5ebc4c99bea21505d9e8e506f&amp;id=7b7e05f45f"
            id="mc-embedded-subscribe-form"
            method="post"
            name="mc-embedded-subscribe-form"
            noValidate
          >
            <Grid container>
              <Grid item xs={12} sm={6}>
                <FormItem>
                  <Label htmlFor="mce-NAME">Name:</Label>
                  <Input id="mce-NAME" name="NAME" type="text" />
                </FormItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormItem>
                  <Label htmlFor="mce-EMAIL">Email:</Label>
                  <Input id="mce-EMAIL" name="EMAIL" required type="email" />
                </FormItem>
              </Grid>
            </Grid>
            <Label htmlFor="gdpr_8591">
              <Checkbox id="gdpr_8591" name="gdpr[8591]" value="Y" />
              <span>Yes, I want to track Storycopter</span>
            </Label>
            <p className="Footnotes">
              By signing up you agree to occassionaly hear abour Storycopter via
              email. You will be able to manage your subscription and
              unsubscribe at any time. We use Mailchimp as our marketing
              platform. By clicking below to subscribe, you acknowledge that
              your information will be transferred to Mailchimp for processing.
              Learn more about Mailchimp’s privacy practices{" "}
              <a href="https://mailchimp.com/legal/" target="_blank">
                here
              </a>
              .
            </p>
            <input
              ariahidden
              className="hackhide"
              name="b_5ebc4c99bea21505d9e8e506f_7b7e05f45f"
              tabIndex="-1"
              type="text"
            />
            <Button as="input" name="subscribe" type="submit" value="Roger!" />
          </Form>
        </SignupPitch>
      </Layout>
    </>
  );
};

HomeTpl.propTypes = {};

export default HomeTpl;
