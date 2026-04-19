import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <Container>
        <p className="mb-0 text-center">
          CommercePulse — Final MVP prototype built with React, React Router, React Bootstrap, and Recharts.
        </p>
      </Container>
    </footer>
  )
}