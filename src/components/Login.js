import React, {useState, useContext} from 'react'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import UserContext from "../userContext";
import {
  useNavigate
} from "react-router-dom";
import {apiProvider} from '../services/provider';
import "./Login.css";
function Login() {
  const context = useContext(UserContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await localStorage.removeItem('user');
    setError(null);
    const response =  await apiProvider.post('login', {email, password});
    if(response.error){
      setError("Invalid username or password");
      return
		}
    if(response && response.token){
      await localStorage.setItem('user', JSON.stringify(response));
      navigate("/", { replace: true });
    }
  }

  return (
    <React.Fragment>
      <div>
        <Container>
          <Row className="justify-content-center " style={{height:'100vh'}}>
            <Col md="12" style={{display:'grid', placeItems:'center'}}>
              <CardGroup>
              
                <Card className="p-4" style={{ backgroundColor: "#d8d8d8" }}>
                  <CardBody>
                    <Form
                      onSubmit={handleSubmit}
                    >
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                      
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          required
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button>
                            Sign In
                          </Button>
                        </Col>
                      
                        <Col xs="6">
                          <Button onClick={()=> navigate('/register', {replace:true})}>
                            Register
                          </Button>
                        </Col>
                      
                      </Row>
                      {error}
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login
