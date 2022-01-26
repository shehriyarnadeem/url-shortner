import React, {useState, useEffect} from 'react'
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
import {
  useNavigate
} from "react-router-dom";
import {apiProvider} from '../services/provider';
import "./Login.css";
function Register() {
  let navigate = useNavigate();

	useEffect(() => {
    const token = localStorage.getItem('user');
    if(token){
    navigate("/", { replace: true });
    }
  }, [])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfrim, setPasswordConfirm] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await localStorage.removeItem('user');
    setError(null);
    const response =  await apiProvider.post('register', {name, email, password, password_confirmation:passwordConfrim });
    if(response.errors){
      setError(Object.values(response.errors).map(message=> message));
      return
		}
    if(response && response.token){
      await localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response));
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
                          placeholder="Full name"
                          onChange={(e) => setName(e.currentTarget.value)}
                          required
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                      
                        <Input
                          type="text"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          required
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        
                        <Input
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        
                        <Input
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button>
                            Sign In
                          </Button>
                        </Col>
                        <Col xs="6">
                          <Button onClick={()=> navigate('/login', {replace: true})}>
                            Login
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

export default Register
