import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import { Button, message } from 'antd'
import { countryList as profileCountryList } from '../../../helpers/dataset/countryList'
import { useActions } from '../../hooks/useActions'
import useFormInput from '../../hooks/useFormInput'
import { useSelector } from 'react-redux'

const EditProfile = ({ setEditProfile }) => {
  const { runPassword, updateProfile: editProfile } = useActions()
  const [profileDetails, handleProfileDetails] = useFormInput({
    yourName: '',
    yourEmailAddress: '',
    userCountry: 'asdds',
    yourLanguage: '',
    yourCurrency: '',
    yourPassword: '',
    yourPasswordConfirm: '',
    userLevel: '',
  })

  const {
    yourName,
    yourEmailAddress,
    userCountry,
    yourLanguage,
    yourCurrency,
    yourPassword,
    yourPasswordConfirm,
    userLevel,
  } = profileDetails

  const { error } = useSelector((state) => state.profile)
  const { user } = useSelector((state) => state.auth)

  const handleRunPassword = () => {
    if (yourPassword !== yourPasswordConfirm) {
      message.error('Password must match')
    } else if (error) {
      message.error('Problems updating profile')
    } else {
      runPassword({
        id: user._id,
        password: yourPassword,
        name: yourName,
        email: yourEmailAddress,
        phoneNumber: user.phoneNumber,
      })
    }
  }

  const handleEditProfile = () => {
    handleRunPassword()

    if (error) {
      message.error('problems updating profile')
    } else {
      editProfile({
        id: user._id,
        name: yourName,
        language: yourLanguage,
        country: userCountry,
        currency: yourCurrency,
        setRole: userLevel,
      })

      message.success('Profile was successfully updated')
    }
  }
  return (
    <div className="withdraw-modal personal-modal">
      <div className="header">Edit Profile</div>
      <div className="dash-row">
        <div className="content">
          <div className="billing-form text-left">
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    name="yourName"
                    id="yourName"
                    defaultValue={yourName}
                    onChange={handleProfileDetails}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Your Email Address"
                    name="yourEmailAddress"
                    id="yourEmailAddress"
                    defaultValue={yourEmailAddress}
                    onChange={handleProfileDetails}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Control
                as="select"
                name="userCountry"
                value={userCountry}
                onChange={handleProfileDetails}
              >
                {profileCountryList.map((country) => (
                  <option>{country}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    id={'language'}
                    name="yourLanguage"
                    value={yourLanguage}
                    onChange={handleProfileDetails}
                  >
                    <option>Select Language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="yourCurrency"
                    defaultValue={yourCurrency}
                    onChange={handleProfileDetails}
                  >
                    <option value="$">Select Currency</option>

                    <option value="$">USD</option>
                    <option value="€">EUR</option>
                    <option value="£">GBP</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    name="yourPassword"
                    value={yourPassword}
                    onChange={handleProfileDetails}
                    type="password"
                    placeholder="Your New Password"
                    id="yourPassword"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    name="yourPasswordConfirm"
                    value={yourPasswordConfirm}
                    onChange={handleProfileDetails}
                    type="password"
                    placeholder="Repeat New Password"
                    id="yourPasswordConfirm"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="exampleForm.ControlSelect5">
              <Form.Control
                as="select"
                name="userLevel"
                value={userLevel}
                onChange={handleProfileDetails}
              >
                <option value="none">Select User Level</option>
                <option value="none">Standard User</option>
                <option value="isManager">Manager</option>
                <option value="isAdmin">Admin User</option>
              </Form.Control>
            </Form.Group>
            <div className="text-right">
              <Button
                type={'dashed'}
                // style={{ background: web.yourMainColor }}
                onClick={handleEditProfile}
                variant="primary"
                className="mb-4"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <span className="close" onClick={() => setEditProfile(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>cross</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>{' '}
    </div>
  )
}

EditProfile.propTypes = {
  setEditProfile: PropTypes.func.isRequired,
}

export default EditProfile
