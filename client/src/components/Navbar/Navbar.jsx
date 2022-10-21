import logo from '../../logo.svg';
import { Navbar as Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// CSS Styles
const onStyle = {
	marginRight: "20px"
}
const addrStyle = {
	marginRight: "15px",
	color: "white"
}

const Navbar = (props) => {
	const ethereum = window.ethereum;

	// Functions
	const connect = async () => {
			try{
					const tx = await ethereum.request({ method: 'eth_requestAccounts' })
			 		props.setUser([true, tx[0]]);
          ethereum.on('accountsChanged', function (accounts) {
             props.setUser([true,accounts[0]]);
          });
			} catch (e) {
					console.log("Error: conection to metamask failed");
			} 
  }

	const disconnect = async () => {
			try{
			 		props.setUser([false, null]);
			} catch (e) {
					console.log("Error: Desconection to metamask failed");
			} 
	}

  return (
    <Nav bg="dark" variant="dark">
      <Container>
        <Nav.Brand href="#home">
        <img
          alt="logo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        React Bootstrap
        </Nav.Brand>
      </Container>
			{ !props.user[0] ? (
      <Button onClick={connect} style={onStyle} variant="primary">Connect</Button>
			)	: (
			<div>
				<span style={addrStyle}>{props.user[1].slice(0,4)}...{props.user[1].slice(38,42)}</span>
        <Button onClick={disconnect} style={onStyle} variant="secondary">Disconnect</Button>
			</div>
			)}
    </Nav>
  );
};

export default Navbar;
