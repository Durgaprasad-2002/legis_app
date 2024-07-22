import React from "react";
import "./index.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <Navbar />
      <div className="outer-terms">
        <div className="inner-terms">
          <div className="info-terms">
            <div className="bar-1"></div>
            <div>
              <span className="info-terms-span">Know More</span>
            </div>
            <div className="bar-1"></div>
          </div>
          <h2 className="title-terms">Terms And Conditions</h2>
          <ul className="li-first">
            <li className="li-first-child">
              <h6>Acceptance of Terms</h6>
              <p>
                By accessing and using the LegisDoc website, you agree to be
                bound by these Terms and Conditions.
              </p>
            </li>
            <li className="li-first-child">
              <h6>LegisCode Registration</h6>
              <p>
                LegisDoc is registered under LegisCode, and users are expected
                to comply with LegisCode regulations while using our services.
              </p>
            </li>
            <li className="li-first-child">
              <h6>User Registration</h6>
              <p>
                Users must register with unique email addresses and passwords.
                Access is personal and non-transferable. Non-compliance may
                result in the cancellation of access.
              </p>
            </li>
            <li className="li-first-child">
              <h6>Copyright and Trademarks</h6>
              <p>
                All material on LegisDoc is owned by Legis Code and is protected
                under Indian laws. Any infringement will be vigorously defended.
              </p>
            </li>
            <li className="li-first-child">
              <h6>Access and Use</h6>
              <p>
                Users must comply with the terms outlined. LegisDoc reserves the
                right to change terms with notice. Limited use of site content
                for personal, non-commercial purposes. Prohibited behavior is
                outlined to maintain a respectful and lawful environment.
              </p>
            </li>
            <li className="li-first-child">
              <h6>E-Mail Services</h6>
              <p>
                Users agree not to upload or transmit harmful or objectionable
                content. Prohibited actions in using the service are outlined.
              </p>
            </li>
            <li className="li-first-child">
              <h6>Disclaimer of Liability</h6>
              <p>
                LegisDoc disclaims responsibility for statements on the site. No
                warranties are given for material information. Disclaimer of
                liability for various types of losses or damages.
              </p>
            </li>
            <li className="li-first-child">
              <h6> Minors</h6>
              <p>
                Permission is required for minors to participate in discussions.
                Caution against revealing personal information.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Content</h6>
              <p>
                Site content is for general information, not advice. Information
                is provided on an "as is" basis. LegisDoc is not liable for
                damages arising from site use.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Charges</h6>
              <p>
                LegisDoc reserves the right to charge subscription and/or
                membership fees upon reasonable prior notice.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Third Party Material</h6>
              <p>
                Advertisers are solely responsible for submitted advertising
                material. LegisDoc accepts no responsibility for the content of
                third-party material.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Text Submission to the Site</h6>
              <p>
                Users can submit material for publication. Terms and conditions
                for submission are outlined.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Submission of Graphic Material</h6>
              <p>
                Users can submit graphical material with specified conditions.
                Terms for submission and publication are outlined.
              </p>
            </li>

            <li className="li-first-child">
              <h6>General</h6>
              <p>Terms may vary, and users are bound by updated terms.</p>
            </li>

            <li className="li-first-child">
              <h6>Governing Law and Jurisdiction</h6>
              <p>
                Governing law is the laws of India, with jurisdiction in
                [City/Area].
              </p>
            </li>

            <li className="li-first-child">
              <h6>Force Majeure</h6>
              <p>
                LegisDoc does not guarantee uninterrupted access and disclaims
                responsibility for interruptions or delays.
              </p>
            </li>
          </ul>
          <br />
          <hr />
          <br />
          <div className="info-terms">
            <div className="bar-1"></div>
            <div>
              <span className="info-terms-span">Know More</span>
            </div>
            <div className="bar-1"></div>
          </div>
          <h2 className="title-terms">Privacy Policy</h2>
          <ul className="li-first">
            <li className="li-first-child">
              <h6>Information Collection</h6>
              <p>
                LegisDoc may collect personal information for user registration
                and [specific purposes - e.g., newsletters].
              </p>
            </li>

            <li className="li-first-child">
              <h6>LegisCode Compliance</h6>
              <p>
                Our data collection and processing comply with LegisCode
                regulations.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Security Measures</h6>
              <p>
                LegisDoc implements security measures to protect user
                information from unauthorized access or disclosure.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Cookies</h6>
              <p>
                LegisDoc uses cookies to enhance user experience. Users may
                choose to disable cookies in their browser settings.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Third-Party Disclosure</h6>
              <p>
                LegisDoc does not sell or share personal information with third
                parties without user consent.
              </p>
            </li>

            <li className="li-first-child">
              <h6>Changes to Privacy Policy</h6>
              <p>
                LegisDoc reserves the right to update or modify the Privacy
                Policy. Users are encouraged to review this policy regularly.
              </p>

              <ul className="li-second">
                <li className="li-second-child">
                  <h6>Lawful Use</h6>
                  <p>
                    Users must use LegisDoc for lawful purposes and comply with
                    all applicable laws and regulations.
                  </p>
                </li>

                <li className="li-second-child">
                  <h6>Prohibited Activities</h6>
                  <p>
                    Users are prohibited from engaging in activities that may
                    disrupt or harm the website, violate the rights of others,
                    or breach any laws.
                  </p>
                </li>

                <li className="li-second-child">
                  <h6>LegisCode Compliance</h6>
                  <p>
                    Users must adhere to LegisCode regulations while using
                    LegisDoc.
                  </p>
                </li>

                <li className="li-second-child">
                  <h6>Reporting Violations</h6>
                  <p>
                    Users are encouraged to report any violations of our
                    Acceptable Use policy.
                  </p>
                </li>

                <li className="li-second-child">
                  <h6>Consequences of Violation</h6>
                  <p>
                    Violations of this policy may result in account
                    suspension or termination.
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
